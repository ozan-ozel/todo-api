import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column('text')
	password: string;

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
