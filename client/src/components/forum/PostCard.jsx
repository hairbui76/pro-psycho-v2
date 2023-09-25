import { Card } from "antd";
import {
	LikeOutlined,
	CommentOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { MODAL_PURPOSE_UPDATE } from "./constants";
const { Meta } = Card;
import { message, Popconfirm } from "antd";
import config from "@/configs/config";

export default function PostCard(props) {
	const myMessage = message;

	const deletePost = async () => {
		const res = await fetch(
			`${config.API_ENDPOINT}/forum/posts/${props.post.id}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		const response = await res.json();
		const { message } = response;
		myMessage.success(message);
		props.deletePost(props.post.id);
	};

	const post = props.post;
	const handleEditClick = () => {
		props.setModalData({
			...props.modalData,
			purpose: MODAL_PURPOSE_UPDATE,
			isOpen: true,
			defaultContent: {
				title: post.title,
				content: post.content,
				imgUrl: post.imgUrl,
			},
			id: props.post.id,
		});
	};
	const handleDeleteClick = () => {};
	return (
		<div>
			<Popconfirm
				title="Delete the post"
				description="Are you sure to delete this post?"
				onConfirm={deletePost}
				okText="Yes"
				cancelText="No"
			>
				<div
					onClick={handleDeleteClick}
					style={{
						float: "right",
						display: "inline-block",
						marginTop: 0,
						cursor: "pointer",
					}}
				>
					<DeleteOutlined
						style={{ fontSize: 20, marginRight: 5, color: "red" }}
					/>
				</div>
			</Popconfirm>

			<div
				onClick={handleEditClick}
				style={{
					float: "right",
					display: "inline-block",
					marginTop: 0,
					cursor: "pointer",
				}}
			>
				<EditOutlined
					style={{ fontSize: 20, marginRight: 5, color: "#1677ff" }}
				/>
			</div>

			<NavLink to={`/forum/posts/${props.post.id}`}>
				<Card
					hoverable
					style={{ width: 250, display: "inline-block", margin: 10 }}
					cover={
						<img style={{ height: 300 }} alt="cover" src={props.post.imgUrl} />
					}
				>
					<Meta title={post.title} />
					<div
						style={{
							display: "inline-block",
							marginTop: 10,
						}}
					>
						<LikeOutlined style={{ fontSize: 20, marginRight: 5 }} />
						<span>{post.reactions.length}</span>
					</div>
					<div
						style={{
							marginLeft: 10,
							display: "inline-block",
							marginTop: 10,
						}}
					>
						<CommentOutlined style={{ fontSize: 20, marginRight: 5 }} />
						<span>{post.comments.length}</span>
					</div>
				</Card>
			</NavLink>
		</div>
	);
}
