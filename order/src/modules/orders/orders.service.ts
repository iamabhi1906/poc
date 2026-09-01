import { Inject, Injectable } from "@nestjs/common";
import CreateOrderDTO from "./dto/create-order.dto.js";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class OrdersService {
	constructor(@Inject("ORDER_EVENTS") private readonly rabbitClient: ClientProxy) {}

	async createOrder(createOrderDTO: CreateOrderDTO) {
		this.rabbitClient.emit("order.created", createOrderDTO);
		console.log(createOrderDTO);
		return { message: "Order created successfully" };
	}
}
