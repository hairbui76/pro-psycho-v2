import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import config from "@/configs/config";
import {
	LikeOutlined,
	CommentOutlined,
	SendOutlined,
	LikeFilled,
} from "@ant-design/icons";
import { Image, Input, message } from "antd";
import Comments from "./Comments";
import { AppContext } from "@/contexts";
const { TextArea } = Input;

const formatDate = (string) => {
	const d = new Date(string);
	return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

function ForumPost() {
	const { postId } = useParams();
	const [postData, setPostData] = useState({});
	const [commentData, setCommentData] = useState("");
	const [reactionData, setReactionData] = useState(undefined);
	const [messageApi, contextHolder] = message.useMessage();
	const { user } = useContext(AppContext);
	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${config.API_ENDPOINT}/forum/posts/${postId}`);
				const response = await res.json();
				const { data, message } = response;
				messageApi.open({
					type: "success",
					content: message,
				});
				setPostData(data[0]);
				if (data[0].reactions) {
					for (let i = 0; i < data[0].reactions.length; i++) {
						if (data[0].reactions[i].createdBy[0].username === user.username) {
							setReactionData(data[0].reactions[i]);
							break;
						}
					}
				}
			} catch (error) {
				console.error(error);
				messageApi.error(error.message);
			}
		})();
	}, []);

	const handleCommentChange = (e) => {
		setCommentData(e.target.value);
	};

	const handleLikeClick = async () => {
		if (reactionData) {
			const res = await fetch(
				`${config.API_ENDPOINT}/forum/posts/${postId}/reaction/${reactionData.id}`,
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
			deleteReaction(reactionData.id);
			setReactionData(undefined);
		} else if (!reactionData) {
			const res = await fetch(
				`${config.API_ENDPOINT}/forum/posts/${postId}/reaction`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						type: "like",
					}),
				}
			);
			const response = await res.json();
			let { data, message } = response;
			messageApi.open({
				type: "success",
				content: message,
			});
			setPostData({ ...postData, reactions: [...postData.reactions, data] });
			setReactionData(data);
		}
	};

	const handleCommentClick = () => {
		document.getElementById("commentArea").focus();
	};

	const handleSendClick = () => {
		createComment();
		setCommentData("");
	};

	const createComment = async () => {
		try {
			if (user !== null) {
				const res = await fetch(
					`${config.API_ENDPOINT}/forum/posts/${postId}/comment`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({
							content: commentData,
						}),
					}
				);
				const { data, message } = await res.json();
				if (res.status === 202) {
					messageApi.success(message);
					data.createdBy = [
						{
							username: user.username,
							firstName: user.firstName,
							surName: user.surName,
						},
					];
					setPostData({ ...postData, comments: [...postData.comments, data] });
				} else {
					messageApi.error(message);
				}
			} else {
				messageApi.info("Please login!");
			}
		} catch (error) {
			console.error(error);
			messageApi.error(error.message);
		}
	};

	const deleteComment = (id) => {
		setPostData({
			...postData,
			comments: postData.comments.filter((comment) => comment.id !== id),
		});
	};

	const deleteReaction = (id) => {
		setPostData({
			...postData,
			reactions: postData.reactions.filter((reaction) => reaction.id !== id),
		});
	};

	return (
		<div>
			{contextHolder}
			{postData.title !== undefined && (
				<div
					className="post"
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						maxWidth: 850,
						width: "70%",
					}}
				>
					<h1
						style={{
							fontSize: 30,
							marginTop: 50,
						}}
					>
						{postData.title}
					</h1>
					<div
						style={{
							fontStyle: "italic",
							marginTop: 10,
							fontSize: 14,
							marginBottom: 75,
						}}
					>
						{`Created at: ${formatDate(
							postData.createdAt
						)}, updated at: ${formatDate(postData.updatedAt)}`}
						<br />
						{`Created by: ${postData.createdBy.firstName} ${postData.createdBy.surName}`}
					</div>

					<div
						style={{
							marginLeft: "auto",
							marginRight: "auto",
							display: "block",
							width: 300,
							marginBottom: 50,
						}}
					>
						<Image width={300} src={postData.imgUrl} />
					</div>

					<div>{postData.content}</div>

					<div className="button" onClick={handleLikeClick}>
						{reactionData ? (
							<LikeFilled
								id="likeButton"
								style={{ fontSize: 20, marginRight: 5 }}
							/>
						) : (
							<LikeOutlined
								id="likeButton"
								style={{ fontSize: 20, marginRight: 5 }}
							/>
						)}
						<span>{postData.reactions.length}</span>
					</div>

					<div className="button comment" onClick={handleCommentClick}>
						<CommentOutlined
							style={{ fontSize: 20, marginRight: 5, marginLeft: 50 }}
						/>
						<span>{postData.comments.length}</span>
					</div>

					<div style={{ marginTop: 20 }}>
						<Comments
							postId={postId}
							comments={postData.comments}
							deleteComment={deleteComment}
						/>
					</div>

					<div style={{ marginTop: 20 }}>
						<TextArea
							id="commentArea"
							rows={4}
							placeholder="Comment here..."
							name="commentArea"
							value={commentData}
							onChange={handleCommentChange}
						/>
					</div>
					<div
						className="button"
						style={{ float: "right", marginTop: 10, fontSize: 20 }}
						onClick={handleSendClick}
					>
						<SendOutlined />
					</div>
				</div>
			)}
		</div>
	);
}

export default ForumPost;
