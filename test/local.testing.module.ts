import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../src/user/user.service';
import { User } from '../src/user/user.entity';

export const LocalTestingModule = {
	imports: [
		TypeOrmModule.forRoot({
			type: 'better-sqlite3',
			database: ':memory:',
			dropSchema: true,
			entities: [ User ],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([ User ]),
	],
	providers: [ UserService ],
};
