import { Form, Input, Button, Typography, Divider } from "antd";

const { Title } = Typography;

const onFinish = (values) => {
	console.log(values);
};

const PasswordForm = () => {
	return (
		<Form layout="vertical" onFinish={onFinish} style={{ padding: "3rem" }}>
			<Title level={3}>Password & Security</Title>
			<Divider />
			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error("The two passwords that you entered do not match!")
							);
						},
					}),
				]}
			>
				<Input.Password />
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
	);
};

export default PasswordForm;
