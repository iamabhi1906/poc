import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Channel, ChannelModel, connect } from "amqplib";
import { RABBITMQ_EXCHANGE, RABBITMQ_QUEUES, RABBITMQ_ROUTING_KEYS } from "./rabbitmq.constants.js";

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
		this.channel.assertExchange(RABBITMQ_EXCHANGE, "direct", { durable: true });
		this.logger.debug(`${RABBITMQ_EXCHANGE} asserted..!!`);
		this.channel.assertQueue(RABBITMQ_QUEUES.ORDERS, { durable: true });
		this.logger.debug(`${RABBITMQ_QUEUES.ORDERS} asserted..!!`);
		this.channel.assertQueue(RABBITMQ_QUEUES.ORDERS_DLQ, { durable: true });
		this.logger.debug(`${RABBITMQ_QUEUES.ORDERS_DLQ} asserted..!!`);
		this.channel.bindQueue(RABBITMQ_QUEUES.ORDERS, RABBITMQ_EXCHANGE, RABBITMQ_ROUTING_KEYS.ORDER_CREATED);
		this.logger.debug(
			`${RABBITMQ_QUEUES.ORDERS} bound to ${RABBITMQ_EXCHANGE} with routing key ${RABBITMQ_ROUTING_KEYS.ORDER_CREATED}..!!`,
		);
	}

	async publish(routingKey: string, message: unknown) {
		const content = Buffer.from(JSON.stringify(message));
		this.channel.publish(RABBITMQ_EXCHANGE, routingKey, content);
		this.logger.debug(`Message published to ${routingKey}..!!`);
	}
}
