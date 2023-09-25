import { useEffect, useState } from "react";
import CommonPosts from "./CommonPosts";
import PostModal from "./PostModal";
import RecentPosts from "./RecentPosts";
import { message } from "antd";
import NewPostButton from "./NewPostButton";
import config from "@/configs/config";

function ForumHome() {
	const [postArray, setPostArray] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [modalData, setModalData] = useState({
		isOpen: false,
		purpose: null,
		defaultContent: {},
		id: null,
	});

	useEffect(() => {
		(async () => {
			const res = await fetch(`${config.API_ENDPOINT}/forum/posts`);
			const response = await res.json();
			const { data, message } = response;
			messageApi.success(message);
			setPostArray(data);
		})();
	}, []);

	const addPost = (newPost) => {
		setPostArray([...postArray, newPost]);
	};

	const updatePost = (updatedPost) => {
		setPostArray((prevPosts) =>
			prevPosts.map((prevPost) => {
				if (prevPost.id === updatedPost.id) {
					return { ...prevPost, ...updatedPost };
				}
				return prevPost;
			})
		);
	};

	const deletePost = (id) => {
		setPostArray(postArray.filter((post) => post.id !== id));
	};

	return (
		<div>
			{contextHolder}
			<NewPostButton setModalData={setModalData} modalData={modalData} />
			<PostModal
				updatePost={updatePost}
				addPost={addPost}
				setModalData={setModalData}
				modalData={modalData}
			/>
			<RecentPosts
				postArray={postArray}
				setModalData={setModalData}
				modalData={modalData}
				deletePost={deletePost}
			/>
			<CommonPosts
				postArray={postArray}
				setModalData={setModalData}
				modalData={modalData}
				deletePost={deletePost}
			/>
		</div>
	);
}

export default ForumHome;
