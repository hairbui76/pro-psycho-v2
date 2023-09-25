import { Card, Space, Typography, Row, Col } from "antd";
const { Title, Text } = Typography;

const data = [
	{
		key: "1",
		firstName: "Van A",
		lastName: "Nguyen",
		dateOfBirth: "01/01/1996",
		email: "nguyenvana@gmail.com",
		phone: "0987654321",
		address: "11 ABC Street Ha Noi City",
	},
];

const ProfileForm = () => {
	return (
		<Space direction="vertical" size="small" style={{ display: "flex" }}>
			<Title level={3}>My profile</Title>
			{data.map((user) => (
				<Card size="default" key={user.key}>
					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>
								FirstName
							</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.firstName}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />

					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>
								SurName
							</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.lastName}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />

					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>
								Date of Birth
							</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.dateOfBirth}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />

					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>
								Phone Number
							</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.phone}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />

					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>Email</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.email}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />

					<Row gutter={16} style={{ padding: "15px 0 15px 0" }}>
						<Col className="gutter-row" span={6}>
							<Text style={{ fontSize: "16px", color: "#4F4F4F" }}>
								Address
							</Text>
						</Col>
						<Col className="gutter-row" span={18}>
							<Text style={{ fontSize: "16px", color: "#757575" }}>
								{user.address}
							</Text>
						</Col>
					</Row>
					<hr style={{ color: "#dfdfdf" }} />
				</Card>
			))}
		</Space>
	);
};

export default ProfileForm;
