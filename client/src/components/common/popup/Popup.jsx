import { message } from "antd";
import Login from "./Login";
import Register from "./Signup";
import { useContext } from "react";
import { PopupContext } from "@/contexts";

const Popup = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const { isLoginForm, isRegisterForm } = useContext(PopupContext);
	return (
		<>
			{contextHolder}
			{isLoginForm && <Login messageApi={messageApi} />}
			{isRegisterForm && <Register messageApi={messageApi} />}
		</>
	);
};

export default Popup;
