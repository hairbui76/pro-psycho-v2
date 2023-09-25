import { Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import CustomAvatar from "./CustomAvatar";

const MyAccount = () => {
	return (
		<Row gutter={[16, 16]}>
			<Col xs={24}>
				<CustomAvatar />
			</Col>
			<Col xs={24}>
				<Outlet />
			</Col>
		</Row>
	);
};

export default MyAccount;
