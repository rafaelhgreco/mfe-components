import { defineConfig } from "@rspack/cli";
import { rspack, type SwcLoaderOptions } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
	entry: {
		main: "./src/main.tsx",
	},
	devServer: {
		port: 8081,
		hot: true,
		proxy: [
			{
				context: ["/orders"],
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
			},
		],
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset",
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev,
									},
								},
							},
							env: { targets },
						} satisfies SwcLoaderOptions,
					},
				],
			},
		],
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./index.html",
		}),
		new rspack.DefinePlugin({
			__NODE_ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
			__API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL || ""),
			__API_TIMEOUT__: JSON.stringify(process.env.VITE_API_TIMEOUT || "10000"),
			__API_VERSION__: JSON.stringify(process.env.VITE_API_VERSION || "v1"),
			__ENV__: JSON.stringify(process.env.VITE_ENV || "development"),
		}),
		isDev ? new ReactRefreshRspackPlugin() : null,
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets },
			}),
		],
	},
	experiments: {
		css: true,
	},
});
