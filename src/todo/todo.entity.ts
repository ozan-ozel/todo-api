import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { User } from '../user/user.entity';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@ManyToOne(() => User, (user) => user.todos)
	user: User;

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: false })
	isCompleted: boolean;
}
