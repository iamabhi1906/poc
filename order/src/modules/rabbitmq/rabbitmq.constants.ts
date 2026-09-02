export const RABBITMQ_EXCHANGE = "orders.exchange";

export const RABBITMQ_QUEUES = {
	ORDERS: "orders.queue",
	ORDERS_DLQ: "orders.dlq",
};

export const RABBITMQ_ROUTING_KEYS = {
	ORDER_CREATED: "order.created",
};
