import { createContext, useState } from "react";

const SignupContext = createContext("");

const SignupContextProvider = ({ children }) => {
	const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

	return (
		<SignupContext.Provider
			value={{ isRegisterFormOpen, setIsRegisterFormOpen }}
		>
			{children}
		</SignupContext.Provider>
	);
};

export default SignupContext;
export { SignupContextProvider };
