import axios, { type AxiosError, type AxiosInstance } from "axios";
import { envConfig } from "./env.config";

console.log("🌐 Criando apiClient com baseURL:", envConfig.apiBaseUrl);

// Criar instância do axios
export const apiClient: AxiosInstance = axios.create({
	baseURL: envConfig.apiBaseUrl,
	timeout: envConfig.apiTimeout,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

console.log("✅ apiClient criado:", {
	baseURL: apiClient.defaults.baseURL,
	timeout: apiClient.defaults.timeout,
});

// Interceptor de Request
apiClient.interceptors.request.use(
	(config) => {
		// Você pode adicionar tokens de autenticação aqui
		// const token = localStorage.getItem('token');
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }

		if (envConfig.isDevelopment) {
			console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
		}

		return config;
	},
	(error) => {
		console.error("❌ Request Error:", error);
		return Promise.reject(error);
	},
);

// Interceptor de Response
apiClient.interceptors.response.use(
	(response) => {
		if (envConfig.isDevelopment) {
			console.log("✅ Response:", response.status, response.config.url);
		}
		return response;
	},
	(error: AxiosError) => {
		if (envConfig.isDevelopment) {
			console.error("❌ Response Error:", error.response?.status, error.message);
		}

		// Tratamento global de erros
		if (error.response) {
			// Erro da API (4xx, 5xx)
			switch (error.response.status) {
				case 401:
					console.error("Não autorizado - redirecionando para login");
					// window.location.href = '/login';
					break;
				case 403:
					console.error("Acesso negado");
					break;
				case 404:
					console.error("Recurso não encontrado");
					break;
				case 500:
					console.error("Erro interno do servidor");
					break;
				default:
					console.error("Erro na requisição");
			}
		} else if (error.request) {
			// Erro de rede (sem resposta)
			console.error("Erro de rede - sem resposta do servidor");
		} else {
			// Erro na configuração da requisição
			console.error("Erro ao configurar a requisição");
		}

		return Promise.reject(error);
	},
);

export default apiClient;
