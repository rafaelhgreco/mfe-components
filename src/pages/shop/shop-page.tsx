import styled from "@emotion/styled";
import { useState } from "react";
import type { OrderItem } from "../../bff/types/order.types";
import { useOrder } from "../../hooks";

const Container = styled.div`
	max-width: 600px;
	margin: 40px auto;
	padding: 24px;
`;

const Title = styled.h1`
	color: #333;
	margin-bottom: 24px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Input = styled.input`
	padding: 12px;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: #007bff;
	}
`;

const Button = styled.button`
	padding: 12px 24px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const Message = styled.div<{ type: "success" | "error" }>`
	padding: 12px;
	border-radius: 8px;
	background-color: ${(props) => (props.type === "success" ? "#d4edda" : "#f8d7da")};
	color: ${(props) => (props.type === "success" ? "#155724" : "#721c24")};
	border: 1px solid
		${(props) => (props.type === "success" ? "#c3e6cb" : "#f5c6cb")};
`;

export function ShopPage() {
	const { loading, error, success, orderResponse, placeOrder, placeAbandonedOrder, reset } =
		useOrder();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");

	const _handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Produtos mockados para exemplo
		const items: OrderItem[] = [
			{
				id: "sku-123",
				name: "Camiseta",
				quantity: 2,
				price: 49.9,
				size: "M",
				color: "preto",
			},
		];

		await placeOrder({
			name,
			telephoneNumber: phone,
			city,
			address,
			items,
		});

	};

    const handleAbandonCart = async () => {
        // Produtos mockados para exemplo
		const items: OrderItem[] = [
			{
				id: "sku-123",
				name: "Camiseta",
				quantity: 2,
				price: 49.9,
				size: "M",
				color: "preto",
			},
		];

        await placeAbandonedOrder({
			name,
			telephoneNumber: phone,
			city,
            abandonedCart: true,
			items,
		});

	};
	const handleReset = () => {
		reset();
		setName("");
		setPhone("");
		setCity("");
		setAddress("");
	};

	return (
		<Container>
			<Title>Criar Pedido - Aurora Store</Title>

			{success && orderResponse && (
				<Message type="success">
					✅ Pedido criado com sucesso! <br />
					<strong>ID:</strong> {orderResponse.orderId} <br />
					<strong>Status:</strong> {orderResponse.status}
					<br />
					<Button onClick={handleReset} style={{ marginTop: "12px" }}>
						Novo Pedido
					</Button>
				</Message>
			)}

			{error && (
				<Message type="error">
					❌ Erro ao criar pedido: {error.message}
					<br />
					<Button onClick={handleReset} style={{ marginTop: "12px" }}>
						Tentar Novamente
					</Button>
				</Message>
			)}

			{!success && (
				<Form onSubmit={_handleSubmit}>
					<Input
						type="text"
						placeholder="Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>

					<Input
						type="tel"
						placeholder="Telefone (+5511999999999)"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>

					<Input
						type="text"
						placeholder="Cidade"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>

					<Input
						type="text"
						placeholder="Endereço completo"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>

					<Button type="submit" disabled={loading}>
						{loading ? "Criando pedido..." : "Criar Pedido"}
					</Button>

					{/* Botão para testar endpoint de pedido abandonado sem submeter o formulário */}
					<Button
						type="button"
						onClick={handleAbandonCart}
						disabled={loading}
						style={{ marginTop: 8 }}
					>
						{loading ? "Enviando..." : "Enviar Pedido Abandonado"}
					</Button>
				</Form>
			)}
		</Container>
	);
}
