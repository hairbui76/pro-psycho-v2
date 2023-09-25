import { Button } from "antd";
import { MODAL_PURPOSE_ADD } from "./constants";

export default function NewPostButton(props) {
	const handleClick = () => {
		props.setModalData({
			...props.modalData,
			isOpen: true,
			purpose: MODAL_PURPOSE_ADD,
		});
	};
	return (
		<div style={{ textAlign: "right" }}>
			<Button type="primary" onClick={handleClick}>
				New Post
			</Button>
		</div>
	);
}
