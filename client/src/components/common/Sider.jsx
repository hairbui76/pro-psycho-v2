// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Divider, Layout, Menu } from "antd";
import { useContext } from "react";
import { AppContext } from "@/contexts";
import * as btn from "@/constants/buttons";

const { Sider } = Layout;
const getItem = (label, key, type = null, children = null) => {
	return {
		label,
		key,
		type,
		children,
	};
};

const AppSider = () => {
	const { collapsed, menuKey, setMenuKey } = useContext(AppContext);
	const menuItems = [
		getItem(btn.CustomButtonLink(btn.MENU_BUTTONS["home"]), "home"),
		getItem(
			collapsed ? <Divider style={{ margin: "5px 0" }} /> : "MENU",
			"menu",
			"group",
			Object.entries(btn.MENU_BUTTONS)
				.filter(([key, _value]) => key !== "home")
				.map(([key, value]) => ({
					label: btn.CustomButtonLink(value),
					key,
				}))
		),
	];
	const categoryItems = [
		getItem(
			collapsed ? (
				<Divider style={{ margin: 0 }} />
			) : (
				btn.MENU_BUTTONS[menuKey]["children"]?.label
			),
			"category",
			"group",
			btn.MENU_BUTTONS[menuKey]["children"]?.items.map(({ key, ...args }) => ({
				label: btn.CustomButtonLink(args),
				key,
			}))
		),
	];
	return (
		<Sider
			collapsible
			trigger={null}
			collapsed={collapsed}
			className="custom-sider"
		>
			<Menu
				theme="dark"
				defaultSelectedKeys={[menuKey]}
				onClick={(e) => setMenuKey(e.key)}
				style={{ padding: "1rem", paddingBottom: 0 }}
				mode="inline"
				items={menuItems}
			/>
			<Menu
				theme="dark"
				style={{ padding: "0 1rem" }}
				mode="inline"
				items={categoryItems}
			/>
		</Sider>
	);
};

export default AppSider;
