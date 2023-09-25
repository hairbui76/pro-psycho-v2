const redisClient = require("./redis");

/* abstract */ class SessionStore {
	findSession(_id) {}
	saveSession(_id, _session) {}
	findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
	constructor() {
		super();
		this.sessions = new Map();
	}

	findSession(id) {
		return this.sessions.get(id);
	}

	saveSession(id, session) {
		this.sessions.set(id, session);
	}

	findAllSessions() {
		return [...this.sessions.values()];
	}
}

const SESSION_TTL = 24 * 60 * 60;
const mapSession = ([userID, username, connected]) =>
	userID
		? { id: userID, username, connected: connected === "true" }
		: undefined;

class RedisSessionStore extends SessionStore {
	constructor(redisClient) {
		super();
		this.redisClient = redisClient;
	}

	findSession(id) {
		return this.redisClient
			.hmget(`session:${id}`, "userID", "username", "connected")
			.then(mapSession);
	}

	saveSession(sessionID, { id, username, connected }) {
		this.redisClient
			.multi()
			.hset(
				`session:${sessionID}`,
				"userID",
				id,
				"username",
				username,
				"connected",
				connected
			)
			.expire(`session:${sessionID}`, SESSION_TTL)
			.exec();
	}

	async findAllSessions() {
		const keys = new Set();
		let nextIndex = 0;
		do {
			const [nextIndexAsStr, results] = await this.redisClient.scan(
				nextIndex,
				"MATCH",
				"session:*",
				"COUNT",
				"100"
			);
			nextIndex = parseInt(nextIndexAsStr, 10);
			results.forEach((s) => keys.add(s));
		} while (nextIndex !== 0);
		const commands = [];
		keys.forEach((key) => {
			commands.push(["hmget", key, "userID", "username", "connected"]);
		});
		return this.redisClient
			.multi(commands)
			.exec()
			.then((results) => {
				return results
					.map(([err, session]) => (err ? undefined : mapSession(session)))
					.filter((v) => !!v);
			});
	}
}
const sessionStore = new RedisSessionStore(redisClient);

module.exports = {
	InMemorySessionStore,
	RedisSessionStore,
	sessionStore,
};
