import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { User } from './src/user/user.entity';
import { CreateUser1678531939395 } from './migrations/1678531939395-CreateUser';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('POSTGRES_DB_HOST'),
	port: configService.get('POSTGRES_DB_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [User],
	migrations: [CreateUser1678531939395],
});
