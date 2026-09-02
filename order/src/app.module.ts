import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { OrdersModule } from "./modules/orders/orders.module.js";
import { RabbitMQModule } from "./modules/rabbitmq/rabbitmq.module.js";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		OrdersModule,
		RabbitMQModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
