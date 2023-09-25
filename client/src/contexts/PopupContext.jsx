import { createContext, useState } from "react";

const PopupContext = createContext();

const PopupContextProvider = ({ children }) => {
	const [isLoginForm, setIsLoginForm] = useState(false);
	const [isRegisterForm, setIsRegisterForm] = useState(false);

	return (
		<PopupContext.Provider
			value={{
				isLoginForm,
				setIsLoginForm,
				isRegisterForm,
				setIsRegisterForm,
			}}
		>
			{children}
		</PopupContext.Provider>
	);
};

export default PopupContext;
export { PopupContextProvider };
