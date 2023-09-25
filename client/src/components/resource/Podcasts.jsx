import { Row } from "antd";
import { useEffect, useState } from "react";
import { CustomCard, CustomUpload } from "@/components";
import * as fake from "@/constants/fakeResources";

const Podcasts = () => {
	const [data, setData] = useState([]);
	useEffect(() => setData(fake.FAKE_PODCASTS));
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				padding: "20px",
			}}
		>
			<div>
				<CustomUpload></CustomUpload>
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

export default Podcasts;
