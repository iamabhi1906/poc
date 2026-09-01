import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		forceCloseConnections: true,
	});
	app.enableShutdownHooks();
	app.connectMicroservice({
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
			queue: "notification-queue",
			queueOptions: {
				durable: true,
			},
			exchange: "order.events",
			exchangeType: "topic",
			wildcards: true,
			noAck: false,
		},
	});
	await app.startAllMicroservices();
	const port = Number(process.env.PORT ?? 3000);
	await app.listen(port, "0.0.0.0");
}

await bootstrap();
