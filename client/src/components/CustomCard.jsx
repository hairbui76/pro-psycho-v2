import { useState } from "react";
import { Space, Card } from "antd";
import { LikeFilled, EyeFilled, MessageFilled } from "@ant-design/icons";
import { Document, Page, pdfjs } from "react-pdf";

const { Meta } = Card;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CustomCard = ({ title, imageLink, pdfLink }) => {
	console.log(imageLink);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<Card bordered hoverable style={{ width: 300, margin: 10 }}>
			<div style={{ height: 250, overflowY: "auto", overflowX: "auto" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						overflow: "hidden",
					}}
				>
					<Document
						file={pdfLink}
						noWarn={true}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} width={200} />
					</Document>
				</div>
				{/* {pdfLink && (
					<Document
						file={pdfLink}
						noWarn={true}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} width={200} />
					</Document>
				)} */}
			</div>

			<div style={{ position: "sticky", bottom: 0, backgroundColor: "white" }}>
				<Space
					direction="vertical"
					align="center"
					style={{ display: "flex", alignItems: "center" }}
				>
					<Meta title={title}></Meta>
					<Space style={{ display: "flex", alignItems: "center" }}>
						<LikeFilled />
						<EyeFilled />
						<MessageFilled />
					</Space>
					{pdfLink && (
						<div style={{ display: "flex", alignItems: "center" }}>
							<button
								disabled={pageNumber <= 1}
								onClick={() => setPageNumber(pageNumber - 1)}
							>
								Prev
							</button>
							<span style={{ flex: "1", textAlign: "center" }}>
								Page {pageNumber} of {numPages}
							</span>
							<button
								disabled={pageNumber >= numPages}
								onClick={() => setPageNumber(pageNumber + 1)}
							>
								Next
							</button>
						</div>
					)}
				</Space>
			</div>
		</Card>
	);
};

export default CustomCard;
