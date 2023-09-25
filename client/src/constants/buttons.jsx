import { Link } from "react-router-dom";
import { Button, Typography } from "antd";

import {
	HomeFilled,
	CalendarFilled,
	ReadFilled,
	YoutubeFilled,
	FileTextFilled,
	QuestionCircleFilled,
	TeamOutlined,
	BookFilled,
	LockFilled,
} from "@ant-design/icons";

import {
	NewspaperCustomIcon,
	DocumentCustomIcon,
	MusicCustomIcon,
	PodcastCustomIcon,
	UserCustomIcon,
	AccountEditCustomIcon,
} from "./icons";

const CustomButtonLink = ({ label, Icon, link }) => {
	return (
		<Link to={link}>
			<Button
				type="text"
				size="large"
				icon={<Icon />}
				style={{
					padding: 0,
					color: "white",
					display: "flex",
					alignItems: "center",
					opacity: "0.65",
				}}
			>
				<Typography.Text style={{ color: "white" }}>{label}</Typography.Text>
			</Button>
		</Link>
	);
};

const FORUM_BUTTONS = [
	{
		label: "Videos",
		key: "videos",
		Icon: YoutubeFilled,
		link: "/videos",
	},
	{
		label: "Articles",
		key: "articles",
		Icon: FileTextFilled,
		link: "/articles",
	},
	{
		label: "Asks",
		key: "asks",
		Icon: QuestionCircleFilled,
		link: "/asks",
	},
];

const RESOURCES_BUTTONS = [
	{
		label: "Books",
		key: "books",
		Icon: BookFilled,
		link: "/books",
	},
	{
		label: "Magazines",
		key: "magazines",
		Icon: NewspaperCustomIcon,
		link: "/magazines",
	},
	{
		label: "Podcasts",
		key: "podcasts",
		Icon: PodcastCustomIcon,
		link: "/podcasts",
	},
	{
		label: "Musics",
		key: "musics",
		Icon: MusicCustomIcon,
		link: "/musics",
	},
	{
		label: "Documents",
		key: "documents",
		Icon: DocumentCustomIcon,
		link: "/documents",
	},
];

const ACCOUNT_BUTTONS = [
	{
		label: "Profile",
		key: "profile",
		Icon: UserCustomIcon,
		link: "/profile",
	},
	{
		label: "Edit",
		key: "edit",
		Icon: AccountEditCustomIcon,
		link: "/edit",
	},
	{
		label: "Password",
		key: "password",
		Icon: LockFilled,
		link: "/password",
	},
];

const resolveLinkBtn = (buttonsList, parentLink) =>
	buttonsList.map((btn) => ({ ...btn, link: `${parentLink}${btn.link}` }));

const MENU_BUTTONS = {
	home: {
		label: "Home",
		Icon: HomeFilled,
		link: "/",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(FORUM_BUTTONS, "/"),
		},
	},
	forum: {
		label: "Forum",
		Icon: TeamOutlined,
		link: "/forum",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(FORUM_BUTTONS, "/forum"),
		},
	},
	appointments: {
		label: "Appointments",
		Icon: CalendarFilled,
		link: "/appointments",
	},
	resources: {
		label: "Resources",
		Icon: ReadFilled,
		link: "/resources",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(RESOURCES_BUTTONS, "/resources"),
		},
	},
	account: {
		label: "Account",
		Icon: UserCustomIcon,
		link: "/account",
		children: {
			label: "ACTIONS",
			items: resolveLinkBtn(ACCOUNT_BUTTONS, "/account"),
		},
	},
};

const homeBtn = ({ link }) => CustomButtonLink("Home", HomeFilled, link);
const forumBtn = ({ link }) => CustomButtonLink("Forum", TeamOutlined, link);
const appointmentsBtn = ({ link }) =>
	CustomButtonLink("Appointments", CalendarFilled, link);
const resourcesBtn = ({ link }) =>
	CustomButtonLink("Resources", ReadFilled, link);
const accountBtn = ({ link }) =>
	CustomButtonLink("Account", UserCustomIcon, link);

const videosBtn = ({ link }) => CustomButtonLink("Videos", YoutubeFilled, link);
const articlesBtn = ({ link }) =>
	CustomButtonLink("Articles", FileTextFilled, link);
const asksBtn = ({ link }) =>
	CustomButtonLink("Asks", QuestionCircleFilled, link);

const booksBtn = ({ link }) => CustomButtonLink("Books", BookFilled, link);
const magazinesBtn = ({ link }) =>
	CustomButtonLink("Magazines", NewspaperCustomIcon, link);
const podcastsBtn = ({ link }) =>
	CustomButtonLink("Podcasts", PodcastCustomIcon, link);
const musicsBtn = ({ link }) =>
	CustomButtonLink("Musics", MusicCustomIcon, link);
const documentsBtn = ({ link }) =>
	CustomButtonLink("Documents", DocumentCustomIcon, link);

const editAccountBtn = ({ link }) =>
	CustomButtonLink("Edit Account", AccountEditCustomIcon, link);

const ChangePasswordBtn = ({ link }) =>
	CustomButtonLink("Edit Password", LockFilled, link);

export {
	videosBtn,
	articlesBtn,
	asksBtn,
	booksBtn,
	magazinesBtn,
	podcastsBtn,
	musicsBtn,
	documentsBtn,
	homeBtn,
	forumBtn,
	appointmentsBtn,
	resourcesBtn,
	accountBtn,
	editAccountBtn,
	ChangePasswordBtn,
	MENU_BUTTONS,
	CustomButtonLink,
};
