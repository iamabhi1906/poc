import { Injectable } from "@nestjs/common";
import CreateOrderDTO from "./dto/create-order.dto.js";
import RabbitMQService from "../rabbitmq/rabbitmq.service.js";

@Injectable()
export class OrdersService {
	constructor(private readonly rabbitMQService: RabbitMQService) {}

	async createOrder(createOrderDTO: CreateOrderDTO) {
		this.rabbitMQService.publish("order.created", createOrderDTO);
		console.log(createOrderDTO);
		return { message: "Order created successfully" };
	}
}
