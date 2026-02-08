// Para Webpack/Rspack: variáveis injetadas pelo DefinePlugin
// Declarações globais estão em src/vite-env.d.ts

// Debug: Log das variáveis de ambiente
console.log("🔍 ENV DEBUG:", {
	API_BASE_URL: __API_BASE_URL__,
	NODE_ENV: __NODE_ENV__,
});

export const envConfig = {
	apiBaseUrl: __API_BASE_URL__ || "", // Proxy do DevServer
	apiTimeout: Number.parseInt(__API_TIMEOUT__ || "10000", 10),
	apiVersion: __API_VERSION__ || "v1",
	env: __ENV__ || __NODE_ENV__ || "development",
	isDevelopment: __NODE_ENV__ === "development",
	isProduction: __NODE_ENV__ === "production",
};

console.log("⚙️ Config carregado:", envConfig);
