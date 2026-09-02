import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
	async sendOrderConfirmation(order: any) {
		console.log(`Sending notification for order ${order.productId}`);
	}
}
