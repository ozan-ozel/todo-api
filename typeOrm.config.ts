import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { CreateUserTodo1678534278890 } from './migrations/1678534278890-CreateUserTodo';
import { Todo } from './src/todo/todo.entity';
import { User } from './src/user/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('POSTGRES_DB_HOST'),
	port: configService.get('POSTGRES_DB_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [User, Todo],
	migrations: [CreateUserTodo1678534278890],
});
