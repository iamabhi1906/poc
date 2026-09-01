import { Body, Controller, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service.js";
import CreateOrderDTO from "./dto/create-order.dto.js";

@Controller("orders")
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
		return await this.ordersService.createOrder(createOrderDTO);
	}
}
