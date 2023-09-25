import {
	MobileOutlined,
	MailOutlined,
	FacebookOutlined,
	TwitterOutlined,
	InstagramOutlined,
} from "@ant-design/icons";

function AppFooter() {
	return (
		<div className="footer">
			<div className="contactInfo">
				<ul>
					<li>
						<a href="tel:0966666666">
							<span>
								<MobileOutlined />
								0966666666
							</span>
						</a>
					</li>
					<li>
						<a href="mailto:bachbuonba@gmail.com">
							<span>
								<MailOutlined />
								bachbuonba@gmail.com
							</span>
						</a>
					</li>
				</ul>
			</div>
			<div className="otherInfo">
				<ul className="socialMedia">
					<li>
						<a href="https://www.facebook.com/">
							<FacebookOutlined style={{ fontSize: 30 }} />
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com/">
							<TwitterOutlined style={{ fontSize: 30 }} />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/">
							<InstagramOutlined style={{ fontSize: 30 }} />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default AppFooter;
