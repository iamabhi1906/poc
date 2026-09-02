import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service.js";
import { OrdersController } from "./orders.controller.js";
import { RabbitMQModule } from "../rabbitmq/rabbitmq.module.js";
@Module({
	imports: [RabbitMQModule],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
