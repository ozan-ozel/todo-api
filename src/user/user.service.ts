import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User();
		user.email = createUserDto.email;

		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS ?? 10));
		user.password = await bcrypt.hash(createUserDto.password, salt);

		return this.userRepository.save(user);
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		});
	}

	findOne(id: string): Promise<User> {
		return this.userRepository.findOneBy({ id });
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.save({
			id,
			isActive: false,
		});
	}
}
