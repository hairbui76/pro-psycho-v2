const { randomUUID } = require("crypto");
const { sessionStore } = require("./sessionStore");
const { messageStore } = require("./messageStore");

const socket = (fastify, _opts, done) => {
	fastify.io.use(async (socket, next) => {
		const sessionID = socket.handshake.auth.sessionID;
		if (sessionID) {
			const session = await sessionStore.findSession(sessionID);
			if (session) {
				socket.sessionID = sessionID;
				socket.id = session.id;
				socket.username = session.username;
				return next();
			}
		}
		const username = socket.handshake.auth.username;
		if (!username) {
			return next(new Error("invalid username"));
		}
		// create new session
		socket.sessionID = randomUUID();
		socket.id = randomUUID();
		socket.username = username;
		next();
	});
	fastify.io.on("connection", async (socket) => {
		console.log(`User connected: ${socket.id}`);

		sessionStore.saveSession(socket.sessionID, {
			id: socket.id,
			username: socket.username,
			connected: true,
		});
		socket.emit("session", {
			sessionID: socket.sessionID,
			id: socket.id,
		});
		socket.join(socket.id);
		const users = [];
		const messagesPerUser = new Map();
		const [messages, sessions] = await Promise.all([
			messageStore.findMessagesForUser(socket.id),
			sessionStore.findAllSessions(),
		]);

		messages.forEach((message) => {
			const { from, to } = message;
			const otherUser = socket.id === from ? to : from;
			if (messagesPerUser.has(otherUser)) {
				messagesPerUser.get(otherUser).push(message);
			} else {
				messagesPerUser.set(otherUser, [message]);
			}
		});

		sessions.forEach((session) => {
			users.push({
				id: session.id,
				username: session.username,
				connected: session.connected,
				messages: messagesPerUser.get(session.id) || [],
			});
		});
		socket.emit("users", users);

		socket.broadcast.emit("user connected", {
			id: socket.id,
			username: socket.username,
			connected: true,
			hasNewMessage: false,
			messages: [],
		});

		socket.on("private message", ({ content, to }) => {
			console.log(`Private message from ${socket.id} to ${to}: ${content}`);
			const message = {
				content,
				from: socket.id,
				to,
			};
			socket.to(to).to(socket.id).emit("private message", message);
			messageStore.saveMessage(message);
		});

		socket.on("disconnect", async () => {
			const matchingSockets = await fastify.io.in(socket.id).allSockets();
			const isDisconnected = matchingSockets.size === 0;
			if (isDisconnected) {
				socket.broadcast.emit("user disconnected", socket.id);
				sessionStore.saveSession(socket.sessionID, {
					id: socket.id,
					username: socket.username,
					connected: false,
				});
			}
		});
	});

	done();
};

module.exports = socket;
