import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Popconfirm, message } from "antd";
import config from "@/configs/config";
import { AppContext } from "@/contexts";
import { useContext } from "react";

const formatDate = (string) => {
	const d = new Date(string);
	return `${d.getHours()}:${d.getMinutes()},${d.getDate()}/${
		d.getMonth() + 1
	}/${d.getFullYear()}`;
};

export default function Comments(props) {
	const [messageApi, contextHolder] = message.useMessage();
	const { user } = useContext(AppContext);

	const isOwnComment = (commentId) => {
		for (let i = 0; i < props.comments.length; i++) {
			const element = props.comments[i];
			try {
				if (element.id === commentId) {
					return element.createdBy[0].username == user.username;
				}
			} catch (error) {
				console.error(error);
				messageApi.error(error.message);
			}
		}
		return false;
	};

	const handleEditClick = () => {};

	const deleteComment = async (commentId) => {
		try {
			if (isOwnComment(commentId)) {
				const res = await fetch(
					`${config.API_ENDPOINT}/forum/posts/${props.postId}/comment/${commentId}`,
					{
						method: "DELETE",
						credentials: "include",
					}
				);
				const response = await res.json();
				const { message } = response;
				messageApi.open({
					type: "success",
					content: message,
				});
				props.deleteComment(commentId);
			}
		} catch (error) {
			console.error(error);
			messageApi.error(error.message);
		}
	};

	return (
		<div>
			{contextHolder}
			<List
				itemLayout="horizontal"
				dataSource={props.comments}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={
								<Avatar
									src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`}
								/>
							}
							title={
								<a>
									{item.createdBy[0].firstName +
										" " +
										item.createdBy[0].surName}
								</a>
							}
							description={item.content}
						/>

						<span>
							<p style={{ fontSize: 12, color: "gray", marginRight: 10 }}>
								{formatDate(item.createdAt)}
							</p>
						</span>

						<span
							onClick={() => {
								handleEditClick(item.id);
							}}
							style={{ cursor: "pointer" }}
						>
							<EditOutlined
								style={{ fontSize: 20, marginRight: 5, color: "#1677ff" }}
							/>
						</span>

						<span style={{ cursor: "pointer" }}>
							<Popconfirm
								title="Delete the comment"
								description="Are you sure to delete this comment?"
								onConfirm={() => {
									deleteComment(item.id);
								}}
								okText="Yes"
								cancelText="No"
							>
								<span>
									<DeleteOutlined
										style={{ fontSize: 20, marginRight: 5, color: "red" }}
									/>
								</span>
							</Popconfirm>
						</span>
					</List.Item>
				)}
			/>
		</div>
	);
}
