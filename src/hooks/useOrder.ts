import { useCallback, useState } from "react";
import { orderService } from "../bff";
import type {
	PlaceAbandonedOrderRequest,
	PlaceOrderRequest,
	PlaceOrderResponse,
} from "../bff/types/order.types";

interface UseOrderState {
	loading: boolean;
	error: Error | null;
	success: boolean;
	orderResponse: PlaceOrderResponse | null;
}

interface UseOrderActions {
	placeOrder: (data: PlaceOrderRequest) => Promise<void>;
	placeAbandonedOrder: (data: PlaceAbandonedOrderRequest) => Promise<void>;
	reset: () => void;
}

export const useOrder = (): UseOrderState & UseOrderActions => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [success, setSuccess] = useState(false);
	const [orderResponse, setOrderResponse] =
		useState<PlaceOrderResponse | null>(null);

	const placeOrder = useCallback(async (data: PlaceOrderRequest) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);
			const response = await orderService.placeOrder(data);
			setOrderResponse(response);
			setSuccess(true);
		} catch (err) {
			setError(err as Error);
			setSuccess(false);
			console.error("Erro ao criar pedido:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	const placeAbandonedOrder = useCallback(
		async (data: PlaceAbandonedOrderRequest) => {
			try {
				setLoading(true);
				setError(null);
				setSuccess(false);
				const response = await orderService.placeAbandonedOrder(data);
				setOrderResponse(response);
				setSuccess(true);
			} catch (err) {
				setError(err as Error);
				setSuccess(false);
				console.error("Erro ao criar pedido abandonado:", err);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const reset = useCallback(() => {
		setLoading(false);
		setError(null);
		setSuccess(false);
		setOrderResponse(null);
	}, []);

	return {
		loading,
		error,
		success,
		orderResponse,
		placeOrder,
		placeAbandonedOrder,
		reset,
	};
};
