import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Channel, ChannelModel, connect } from "amqplib";
import { RABBITMQ_QUEUES } from "./rabbitmq.constants.js";

@Injectable()
export default class RabbitMQService implements OnModuleInit {
	private connection: ChannelModel;
	private channel: Channel;
	private logger = new Logger(RabbitMQService.name);
	constructor(private config: ConfigService) {}
	async onModuleInit() {
		this.connection = await connect(this.config.get<string>("RABBITMQ_URL")!);
		this.logger.debug("Connected to RabbitMQ..!!");
		this.channel = await this.connection.createChannel();
		this.logger.debug("Channel created..!!");
		await this.consume();
	}

	async consume() {
		this.channel.consume(RABBITMQ_QUEUES.ORDERS, (message) => {
			if (!message) return;
			const content = message.content.toString();
			this.logger.debug(`Received message: ${content}`);
			this.channel.ack(message);
		});
	}
}
