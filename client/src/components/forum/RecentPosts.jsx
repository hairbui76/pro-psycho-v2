import { Col, Row } from "antd";
import PostCard from "./PostCard";

function RecentPosts(props) {
	const posts = props.postArray;
	return (
		<div>
			<h2>Recent Post</h2>
			<Row gutter={[24, 24]}>
				{posts.map((post) => {
					return (
						<Col xl={6} key={post.id} md={12}>
							<PostCard
								post={post}
								setModalData={props.setModalData}
								modalData={props.modalData}
								deletePost={props.deletePost}
							/>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}
export default RecentPosts;
