import { useContext, useState } from "react";
import {
	Modal,
	Input,
	Divider,
	Space,
	Row,
	Col,
	Form,
	DatePicker,
	Button,
	Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PopupContext } from "@/contexts";
import config from "@/configs/config";

const styles = {
	avatarContainer: {
		position: "absolute",
		top: "calc(100% - 24px - 75px)",
		left: "50%",
		transform: "translateX(-50%)",
		backgroundColor: "white",
		borderRadius: "50%",
		zIndex: 1,
	},
};

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
	},
};
const Signup = ({ messageApi }) => {
	const { isRegisterForm, setIsRegisterForm } = useContext(PopupContext);
	const [loading, setLoading] = useState(false);
	const [formvalue, setFormValue] = useState({ fileList: [] });
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [avatarFileList, setAvatarFileList] = useState([]);
	const [coverFileList, setCoverFileList] = useState([]);
	const handlePreviewCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};
	const handleAvatarChange = ({ fileList: newFileList }) =>
		setAvatarFileList(newFileList);
	const handleCoverChange = ({ fileList: newFileList }) =>
		setCoverFileList(newFileList);
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const onDateChange = (date) => {
		setDateOfBirth(date.toISOString());
	};
	const handleChange = (e) => {
		setFormValue({ ...formvalue, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		setIsRegisterForm(false);
	};

	const handleSubmit = async () => {
		setLoading(true);
		let formData = new FormData();
		formData.append("username", formvalue.username);
		formData.append("firstName", formvalue.firstName);
		formData.append("surName", formvalue.surName);
		formData.append("dOB", dateOfBirth);
		formData.append("phoneNumber", formvalue.phoneNumber);
		formData.append("email", formvalue.email);
		formData.append("address", formvalue.address);
		formData.append("password", formvalue.password);
		formData.append("avatar", avatarFileList[0].originFileObj);
		formData.append("thumbnail", coverFileList[0].originFileObj);
		console.log([...formData.values()]);

		const res = await fetch(`${config.API_ENDPOINT}/auth/register`, {
			method: "POST",
			body: formData,
		});

		const response = await res.json();
		console.log(response);
		let { message } = response;
		messageApi.open({
			type: "success",
			content: message,
		});

		setLoading(false);
		setIsRegisterForm(false);
	};

	return (
		<Modal
			title="Register Form"
			open={isRegisterForm}
			onCancel={() => setIsRegisterForm(false)}
			maskClosable={false}
			footer={[
				<Button
					form="myForm"
					key="submit"
					htmlType="submit"
					type="primary"
					loading={loading}
					onClick={handleSubmit}
				>
					Sign Up
				</Button>,
				<Button key="cancel" onClick={handleCancel}>
					Cancel
				</Button>,
			]}
		>
			<Divider />
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handlePreviewCancel}
			>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Form id="myForm" layout="vertical" validateMessages={validateMessages}>
					<Row>
						<Col
							span={24}
							className="thumbnail__container"
							style={{ width: "100%" }}
						>
							<Form.Item>
								<Upload
									fileList={coverFileList}
									onPreview={handlePreview}
									onChange={handleCoverChange}
									beforeUpload={() => false}
									accept=".jpg,.jpeg"
									listType="picture-card"
									style={{ width: "100%", minHeight: "calc(100px + 15vw)" }}
								>
									{coverFileList.length ? null : uploadButton}
								</Upload>
							</Form.Item>
						</Col>
						<Col
							className="gutter-row"
							span={12}
							style={styles.avatarContainer}
						>
							<Form.Item style={{ marginBottom: 0 }}>
								<Upload
									listType="picture-circle"
									fileList={avatarFileList}
									onPreview={handlePreview}
									onChange={handleAvatarChange}
									beforeUpload={() => false}
									accept=".jpg,.jpeg"
								>
									{avatarFileList.length ? null : uploadButton}
								</Upload>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="FirstName"
								label="FirstName"
								rules={[{ required: true }]}
							>
								<Input
									name="firstName"
									value={formvalue.firstName}
									onChange={handleChange}
								/>
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="surName"
								label="SurName"
								rules={[{ required: true }]}
							>
								<Input
									name="surName"
									value={formvalue.surName}
									onChange={handleChange}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="dateOfBirth"
								label="Date of Birth"
								rules={[{ required: true }]}
							>
								<DatePicker
									style={{ width: "100%" }}
									value={dateOfBirth}
									onChange={onDateChange}
								/>
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={12}>
							<Form.Item
								name="phoneNumber"
								label="Phone number"
								rules={[{ required: true }]}
							>
								<Input
									name="phoneNumber"
									value={formvalue.phoneNumber}
									onChange={handleChange}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, type: "email" }]}
					>
						<Input
							name="email"
							value={formvalue.email}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label="Address"
						rules={[{ required: true }]}
					>
						<Input
							name="address"
							value={formvalue.address}
							onChange={handleChange}
						/>
					</Form.Item>

					<Form.Item
						name="username"
						label="Username"
						rules={[{ required: true }]}
					>
						<Input
							name="username"
							value={formvalue.username}
							onChange={handleChange}
						/>
					</Form.Item>

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
						<Input.Password
							name="password"
							value={formvalue.password}
							onChange={handleChange}
						/>
					</Form.Item>

					<Form.Item
						name="confirmpassword"
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
										new Error(
											"The two passwords that you entered do not match!"
										)
									);
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
				</Form>
			</Space>
		</Modal>
	);
};

export default Signup;
