import { Upload, Button, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import config from "@/configs/config";

const UploadComponent = ({ fileList, setFileList }) => {
	const handleUpload = async () => {
		// console.clear();
		const formData = new FormData();
		formData.append("type", "book");
		formData.append("title", "testbook");
		formData.append("description", "This is a test book");
		// formData.append("file",'D:\CNPM\Final5.pdf');

		formData.append("file", fileList[0].originFileObj);

		console.log(fileList);

		try {
			const response = await fetch(`${config.API_ENDPOINT}/resource/upload`, {
				method: "POST",
				credentials: "include",
				body: formData,
			});

			const data = await response.json();
			const message = data.message;
			console.log(message);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Upload
				fileList={fileList}
				onChange={(info) => {
					setFileList(info.fileList);
				}}
				beforeUpload={() => false}
				multiple={false}
				maxCount={1}
			>
				<Space>
					<Button icon={<UploadOutlined />}>Upload</Button>
					<Button onClick={handleUpload} style={{ backgroundColor: "#1890ff" }}>
						Submit
					</Button>
				</Space>
			</Upload>
		</>
	);
};

export default UploadComponent;
