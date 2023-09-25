import { Col, Row } from "antd";
import PostCard from "./PostCard";

function CommonPosts(props) {
	const posts = props.postArray;
	return (
		<div>
			<h2 style={{ marginTop: 20 }}>Common Post</h2>
			<Row gutter={[24, 24]}>
				{posts.map((post) => {
					return (
						<Col lg={6} key={post.id}>
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
export default CommonPosts;
