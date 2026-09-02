import { Module } from "@nestjs/common";
import RabbitMQService from "./rabbitmq.service.js";

@Module({
	imports: [],
	providers: [RabbitMQService],
	exports: [RabbitMQService],
})
export class RabbitMQModule {}
