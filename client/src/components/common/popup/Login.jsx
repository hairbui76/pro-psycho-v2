import { useState, useContext } from "react";
import { Input, Space, Divider, Modal } from "antd";
import { PopupContext, AppContext } from "@/contexts";
import config from "@/configs/config";

const Login = ({ messageApi }) => {
	const [visible, setVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setIsLoginForm, isLoginForm } = useContext(PopupContext);
	const { setUser } = useContext(AppContext);

	const handleLogin = async () => {
		const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const { message, user } = await res.json();
		if (res.status === 202) {
			setUser(user);
			messageApi.success(message);
		} else messageApi.error(message);
		setIsLoginForm(false);
	};

	return (
		<Modal
			title="Login"
			open={isLoginForm}
			onCancel={() => setIsLoginForm(false)}
			maskClosable={false}
			onOk={handleLogin}
		>
			<Divider />
			<Space direction="vertical" style={{ width: "100%" }}>
				<Input
					addonBefore="Username"
					placeholder="Type your username"
					allowClear
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input.Password
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					allowClear
					addonBefore="Password"
					placeholder="Type your password"
					visibilityToggle={{
						visible,
						onVisibleChange: () => setVisible(!visible),
					}}
				/>
			</Space>
		</Modal>
	);
};

export default Login;
