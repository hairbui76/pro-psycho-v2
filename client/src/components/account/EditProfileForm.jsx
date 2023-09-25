import {
	Form,
	Input,
	Button,
	Col,
	Row,
	Typography,
	DatePicker,
	Divider,
} from "antd";

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
	},
};

const { Title } = Typography;

const onFinish = (values) => {
	console.log(values);
};

const EditProfileForm = () => {
	return (
		<Row style={{ width: "100%", padding: "3rem" }}>
			<Col style={{ flex: 1 }}>
				<Form
					layout="vertical"
					onFinish={onFinish}
					validateMessages={validateMessages}
				>
					<Title level={3}>Edit profile</Title>
					<Divider />
					<Row gutter={16}>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="FirstName"
								label="FirstName"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="SurName"
								label="SurName"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="Birthday"
								label="Date of Birth"
								rules={[{ required: true }]}
							>
								<DatePicker style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="PhoneNumber"
								label="Phone number"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						name="Email"
						label="Email"
						rules={[{ required: true, type: "email" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="Address"
						label="Address"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							style={{
								backgroundColor: "#B3D9B3",
								color: "#FFFFFF",
								width: "138px",
								borderRadius: "15px",
							}}
						>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default EditProfileForm;
