import { useEffect, useState } from "react";
import { Input, Modal, Upload, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import config from "@/configs/config";
const { TextArea } = Input;
import { MODAL_PURPOSE_ADD, MODAL_PURPOSE_UPDATE } from "./constants";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export default function PostModal(props) {
	const [postData, setPostData] = useState({ fileList: [] });
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [messageApi, contextHolder] = message.useMessage();

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
	const handleUploadChange = ({ fileList: newFileList }) => {
		setPostData({ ...postData, fileList: newFileList });
	};
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	useEffect(() => {
		setPostData({
			...postData,
			title: props.modalData.defaultContent.title,
			content: props.modalData.defaultContent.content,
			fileList: props.modalData.defaultContent.imgUrl
				? [
						{
							uid: "-1",
							name: "image.png",
							status: "done",
							url: props.modalData.defaultContent.imgUrl,
						},
				  ]
				: [],
		});
	}, [props.modalData.defaultContent]);

	const createPost = async () => {
		let formData = new FormData();
		formData.append("title", postData.title);
		formData.append("content", postData.content);
		if (postData.fileList.length != 0) {
			formData.append("image", postData.fileList[0].originFileObj);
		}
		console.log([...formData.values()]);
		const res = await fetch(`${config.API_ENDPOINT}/forum/posts`, {
			method: "POST",
			credentials: "include",
			body: formData,
		});
		const response = await res.json();
		let { data, message } = response;
		messageApi.open({
			type: "success",
			content: message,
		});
		data = { ...data, comments: [], reactions: [] };
		props.addPost(data);
	};

	const updatePost = async () => {
		let formData = new FormData();
		formData.append("title", postData.title);
		formData.append("content", postData.content);
		if (
			postData.fileList.length != 0 &&
			postData.fileList[0].url != props.modalData.defaultContent.imgUrl
		) {
			formData.append("image", postData.fileList[0].originFileObj);
		}
		const res = await fetch(
			`${config.API_ENDPOINT}/forum/posts/${props.modalData.id}`,
			{
				method: "PUT",
				credentials: "include",
				body: formData,
			}
		);
		const response = await res.json();
		let { data, message } = response;
		messageApi.open({
			type: "success",
			content: message,
		});
		props.updatePost(data);
	};

	const handleOk = () => {
		if (props.modalData.purpose == MODAL_PURPOSE_ADD) {
			createPost();
		} else if (props.modalData.purpose == MODAL_PURPOSE_UPDATE) {
			updatePost();
		}
		setPostData({ fileList: [] });
		props.setModalData({
			...props.modalData,
			purpose: null,
			isOpen: false,
			id: null,
			defaultContent: {},
		});
	};

	const handleCancel = () => {
		setPostData({ fileList: [] });
		props.setModalData({
			...props.modalData,
			purpose: null,
			isOpen: false,
			id: null,
			defaultContent: {},
		});
	};

	const handleChange = (e) => {
		setPostData({ ...postData, [e.target.name]: e.target.value });
	};

	return (
		<Modal
			title={
				props.modalData.purpose == MODAL_PURPOSE_ADD
					? "Create New Post"
					: "Update Post"
			}
			open={props.modalData.isOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			{contextHolder}
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handlePreviewCancel}
			>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>

			<Space
				direction="vertical"
				size="middle"
				style={{
					display: "flex",
				}}
			>
				<Upload
					accept=".jpg,.jpeg"
					listType="picture-card"
					fileList={postData.fileList}
					beforeUpload={() => false}
					onPreview={handlePreview}
					onChange={handleUploadChange}
				>
					{postData.fileList
						? postData.fileList.length == 0
							? uploadButton
							: null
						: uploadButton}
				</Upload>

				<Input
					size="large"
					placeholder="Title"
					value={postData.title}
					onChange={handleChange}
					name="title"
				/>

				<TextArea
					rows={20}
					placeholder="Content"
					value={postData.content}
					onChange={handleChange}
					name="content"
				/>
			</Space>
		</Modal>
	);
}
