// Tipos baseados no MVP do Aurora Store Backend
// Alinhados com a API real documentada em api.http

/**
 * Item do pedido conforme esperado pela API
 */
export interface OrderItem {
	id: string; // SKU do produto
	name: string;
	quantity: number;
	price: number;
	size?: string; // Ex: "M", "G", "GG"
	color?: string; // Ex: "preto", "azul"
}

/**
 * Requisição para criar um pedido (POST /orders)
 */
export interface PlaceOrderRequest {
	name: string; // Nome do cliente
	telephoneNumber: string; // Ex: "+5511999999999"
	city: string; // Cidade do cliente
	address: string; // Endereço completo
	items: OrderItem[];
}

/**
 * Requisição para criar pedido abandonado (POST /orders/abandoned)
 */
export interface PlaceAbandonedOrderRequest {
	name: string;
	telephoneNumber: string;
	city: string;
	abandonedCart: boolean; // Deve ser true
	items: OrderItem[];
}

/**
 * Resposta da API ao criar pedido
 * (estrutura inferida - ajustar conforme resposta real)
 */
export interface PlaceOrderResponse {
	orderId: string;
	status: "pending" | "confirmed" | "abandoned";
	createdAt: string;
	message: string;
}
