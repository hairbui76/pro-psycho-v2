import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Route, Routes, Outlet } from "react-router-dom";
import {
	Footer as AppFooter,
	Header as AppHeader,
	Sider as AppSider,
	Popup,
} from "@/components/common";
import { ForumHome, ForumPost } from "@/components/forum";
import * as resource from "@/components/resource";
import {
	EditProfileForm,
	PasswordForm,
	ProfileForm,
	MyAccount,
} from "@/components/account";
import { AppointmentHome } from "@/components/appointment";
import "./App.css";
import { ChatWindow } from "@/components/chat";

const { Header, Content } = Layout;

const MyContent = () => {
	return (
		<Layout>
			<AppSider />
			<Popup />

			<Layout>
				<Header style={{ padding: 0, background: "#ffffff" }}>
					<AppHeader />
				</Header>

				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 800,
						background: "#ffffff",
					}}
				>
					<Outlet />
					<ChatWindow />
				</Content>

				<Footer>
					<AppFooter />
				</Footer>
			</Layout>
		</Layout>
	);
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<MyContent />}>
				<Route index element={<ForumHome />} />
				<Route path="forum">
					<Route index element={<ForumHome />} />
					<Route path="posts/:postId" element={<ForumPost />} />
				</Route>
				<Route path="appointments" element={<AppointmentHome />} />
				<Route path="resources">
					<Route index element={<resource.Books />} />
					<Route path="books" element={<resource.Books />} />
					<Route path="magazines" element={<resource.Magazines />} />
					<Route path="podcasts" element={<resource.Podcasts />} />
					<Route path="musics" element={<resource.Musics />} />
					<Route path="documents" element={<resource.Documents />} />
				</Route>
				<Route path="account" element={<MyAccount />}>
					<Route index element={<ProfileForm />} />
					<Route path="profile" element={<ProfileForm />} />
					<Route path="edit" element={<EditProfileForm />} />
					<Route path="password" element={<PasswordForm />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
