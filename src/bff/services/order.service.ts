import type { AxiosResponse } from "axios";
import apiClient from "../config/axios.config";
import type {
	PlaceAbandonedOrderRequest,
	PlaceOrderRequest,
	PlaceOrderResponse,
} from "../types/order.types";

/**
 * Serviço para gerenciar pedidos - Aurora Store Backend
 * Endpoints:
 * - POST /orders - Criar pedido
 * - POST /orders/abandoned - Criar pedido abandonado
 */
export class OrderService {
	private readonly basePath = "/orders";

	/**
	 * Cria um novo pedido
	 * @param data Dados do pedido (name, telephoneNumber, city, address, items)
	 * @returns Resposta com orderId, status, createdAt, message
	 */
	async placeOrder(data: PlaceOrderRequest): Promise<PlaceOrderResponse> {
		try {
			const response: AxiosResponse<PlaceOrderResponse> =
				await apiClient.post(this.basePath, data);
			return response.data;
		} catch (error) {
			console.error("Erro ao criar pedido:", error);
			throw error;
		}
	}

	/**
	 * Cria um pedido abandonado (carrinho abandonado)
	 * @param data Dados do pedido abandonado (name, telephoneNumber, city, items, abandonedCart=true)
	 * @returns Resposta com orderId, status, createdAt, message
	 */
	async placeAbandonedOrder(
		data: PlaceAbandonedOrderRequest,
	): Promise<PlaceOrderResponse> {
		try {
			const response: AxiosResponse<PlaceOrderResponse> =
				await apiClient.post(`${this.basePath}/abandoned`, data);
			return response.data;
		} catch (error) {
			console.error("Erro ao criar pedido abandonado:", error);
			throw error;
		}
	}
}

// Exportar instância singleton
export const orderService = new OrderService();
