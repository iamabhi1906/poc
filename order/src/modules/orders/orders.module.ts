import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service.js";
import { OrdersController } from "./orders.controller.js";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
	imports: [
		ClientsModule.register([
			{
				name: "ORDER_EVENTS",
				transport: Transport.RMQ,
				options: {
					urls: [
						{
							protocol: "amqp",
							hostname: "rabbitmq",
							port: 5672,
							username: "user",
							password: "root",
						},
					],

					queue: "order-publisher",
					queueOptions: { durable: true },
					exchange: "order.events",
					exchangeType: "topic",
					routingKey: "order.created",
					wildcards: true,
				},
			},
		]),
	],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
