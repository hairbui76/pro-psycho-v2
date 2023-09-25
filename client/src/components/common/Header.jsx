import { Input, Button, Row, Col, Typography, message } from "antd";
import {
	SearchOutlined,
	MailFilled,
	BellFilled,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AppContext, PopupContext } from "@/contexts";
import config from "@/configs/config";

function AppHeader() {
	const { collapsed, setCollapsed, user, setUser } = useContext(AppContext);
	const { setIsLoginForm, setIsRegisterForm } = useContext(PopupContext);
	const [messageApi, contextHolder] = message.useMessage();
	const handleLogout = async () => {
		const res = await fetch(`${config.API_ENDPOINT}/auth/logout`, {
			credentials: "include",
		});
		const { message } = await res.json();
		messageApi.success(message);
		setUser(null);
	};
	return (
		<Row gutter={16} style={{ width: "100%", padding: "0 1rem" }}>
			{contextHolder}
			<Col>
				<Button
					type="text"
					size="large"
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</Col>
			<Col style={{ flex: 1 }}>
				<Input
					size="large"
					placeholder="Search for anything..."
					prefix={<SearchOutlined className="search-icon" />}
				/>
			</Col>
			<Col>
				<Button type="text">
					<MailFilled />
				</Button>
			</Col>
			<Col>
				<Button type="text">
					<BellFilled />
				</Button>
			</Col>
			{user ? (
				<>
					<Col style={{ display: "flex", alignItems: "center" }}>
						<Typography.Title level={5} style={{ margin: 0 }}>
							Hello, {user.firstName + user.surName}
						</Typography.Title>
					</Col>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							danger
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Col>
				</>
			) : (
				<>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							onClick={() => setIsLoginForm(true)}
						>
							Login
						</Button>
					</Col>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							onClick={() => setIsRegisterForm(true)}
						>
							Sign Up
						</Button>
					</Col>
				</>
			)}
		</Row>
	);
}

export default AppHeader;
