import { useState, useContext } from "react";
import { Launcher } from "@mryasuo/react-chat-window-ui";
import "@mryasuo/react-chat-window-ui/dist/style.css";
import "./Chat.css";
import { AppContext } from "@/contexts";

const ChatWindow = () => {
	const { user } = useContext(AppContext);
	const [messageList, setMessageList] = useState([]);
	const _onMessageWasSent = (message) => {
		console.log(message);
		setMessageList([...messageList, message]);
	};

	return (
		<>
			{user && (
				<Launcher
					agentProfile={{
						teamName: user.username,
						imageUrl: user.avatarUrl,
					}}
					onMessageWasSent={_onMessageWasSent}
					messageList={messageList}
					showEmoji
				/>
			)}
		</>
	);
};

export default ChatWindow;
