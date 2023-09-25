import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import babelPluginMacros from "vite-plugin-babel-macros";
import path from "path";

export default defineConfig({
	plugins: [react(), babelPluginMacros()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
