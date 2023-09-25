import { Row, Button, Typography, Divider, Modal, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { CustomCard, CustomUpload } from "@/components";
import * as fake from "@/constants/fakeResources";

const Books = () => {
	const [data, setData] = useState([]);
	const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [fileList, setFileList] = useState([]);
	const handleUpload = async () => {};

	useEffect(() => setData(fake.FAKE_BOOKS));
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				padding: "20px",
			}}
		>
			<Modal
				open={isUploadFormOpen}
				onOk={handleUpload}
				maskClosable={false}
				onCancel={() => setIsUploadFormOpen(false)}
			>
				<Typography.Title>Upload new resource</Typography.Title>
				<Divider />
				<Space direction="vertical" style={{ width: "100%" }}>
					<Input
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<CustomUpload fileList={fileList} setFileList={setFileList} />
				</Space>
			</Modal>
			<div>
				<Button type="primary" onClick={() => setIsUploadFormOpen(true)}>
					Upload Resource
				</Button>
			</div>
			<div>
				<h2>Bestselling</h2>
			</div>
			<Row>
				{data.slice(0, 5).map((item) => (
					<CustomCard
						key={item.id}
						title={item.title}
						imageLink={item.imageLink}
						pdfLink={item.pdfLink}
					/>
				))}
			</Row>
			<div>
				<h2>Most Popular</h2>
			</div>
			<Row>
				{data.slice(5, 11).map((item) => (
					<CustomCard
						key={item.id}
						title={item.title}
						imageLink={item.imageLink}
						pdfLink={item.pdfLink}
					/>
				))}
			</Row>
		</div>
	);
};

export default Books;
