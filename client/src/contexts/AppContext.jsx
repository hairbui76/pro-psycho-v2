import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "@/configs/config";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [menuKey, setMenuKey] = useState(
		location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "home"
	);
	const [user, setUser] = useState(null);
	useEffect(() => {
		(async () => {
			const res = await fetch(`${config.API_ENDPOINT}/auth`, {
				credentials: "include",
			});
			const response = await res.json();
			if (res.status === 202) {
				setUser(response.user);
			}
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{ collapsed, setCollapsed, menuKey, setMenuKey, user, setUser }}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;

export { AppContextProvider };
