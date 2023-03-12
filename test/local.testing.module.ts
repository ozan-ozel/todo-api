import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../src/user/user.service';
import { User } from '../src/user/user.entity';
import { Todo } from '../src/todo/todo.entity';
import { TodoService } from '../src/todo/todo.service';

export const LocalTestingModule = {
	imports: [
		TypeOrmModule.forRoot({
			type: 'better-sqlite3',
			database: ':memory:',
			dropSchema: true,
			entities: [ User, Todo ],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([ User, Todo ]),
	],
	providers: [ UserService, TodoService ],
};
