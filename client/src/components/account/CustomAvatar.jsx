import { Modal, Upload, Typography, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./Account.css";

const { Text, Title } = Typography;

const styles = {
	avatarContainer: {
		position: "absolute",
		top: "-60px",
		left: "50%",
		transform: "translateX(-50%)",
		backgroundColor: "white",
		borderRadius: "50%",
	},
	onlineStatus: {
		position: "absolute",
		background: "#B3D9B3",
		width: "25px",
		height: "25px",
		bottom: 0,
		transform: "translateX(-100%)",
		borderRadius: "50%",
		border: "3px solid #fff",
	},
};

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const CustomAvatar = () => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [avatarFileList, setAvatarFileList] = useState([
		{
			uid: "-1",
			name: "avatar.png",
			status: "done",
			url: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
		},
	]);
	const [coverFileList, setCoverFileList] = useState([
		{
			uid: "-1",
			name: "cover.png",
			status: "done",
			url: "https://previews.123rf.com/images/peshkov/peshkov1903/peshkov190301435/119868636-hand-drawing-creative-eco-globe-sketch-on-white-background-eco-friendly-and-green-concept.jpg",
		},
	]);
	const handleCancel = () => setPreviewOpen(false);
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
	return (
		<Row>
			<Col xs={24}>
				<Modal
					open={previewOpen}
					title={previewTitle}
					footer={null}
					onCancel={handleCancel}
				>
					<img alt="example" style={{ width: "100%" }} src={previewImage} />
				</Modal>
			</Col>
			<Col xs={24} className="thumbnail__container" style={{ width: "100%" }}>
				<Upload
					fileList={coverFileList}
					onPreview={handlePreview}
					onChange={handleCoverChange}
					listType="picture-card"
					style={{ width: "100%", minHeight: "calc(100px + 15vw)" }}
					beforeUpload={() => false}
				>
					{coverFileList.length ? null : uploadButton}
				</Upload>
			</Col>
			<Col xs={24}>
				<Row style={styles.avatarContainer}>
					<Col>
						<Upload
							listType="picture-circle"
							fileList={avatarFileList}
							onPreview={handlePreview}
							onChange={handleAvatarChange}
							beforeUpload={() => false}
						>
							{avatarFileList.length ? null : uploadButton}
						</Upload>
					</Col>
					<Col>
						<span style={styles.onlineStatus}></span>
					</Col>
				</Row>
			</Col>
			<Col xs={24} style={{ marginTop: "3rem" }}>
				<Row>
					<Col xs={24}>
						<Title level={3} style={{ textAlign: "center" }}>
							User name
						</Title>
					</Col>
					<Col xs={24}>
						<div style={{ textAlign: "center" }}>
							<Text>Your account is ready, you can apply for advice</Text>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default CustomAvatar;
