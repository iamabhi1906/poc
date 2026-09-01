import { Controller } from "@nestjs/common";
import { NotificationsService } from "./notifications.service.js";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@EventPattern("order.created")
	async handleOrderCreated(@Payload() order: any) {
		console.log("Order created:", order);

		await this.sendOrderConfirmation(order);
	}

	private async sendOrderConfirmation(order: any) {
		console.log(`Sending notification for order ${order.productId}`);
	}
}
