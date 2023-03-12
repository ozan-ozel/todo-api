import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Todo } from '../todo/todo.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column('text')
	password: string;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
