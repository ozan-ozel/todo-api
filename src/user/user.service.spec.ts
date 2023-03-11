import * as bcrypt from 'bcrypt';

import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

const metaData: ModuleMetadata = {
	providers: [
		UserService,
		{
			provide: getRepositoryToken(User),
			useValue: {
				find: jest.fn().mockResolvedValue([]),
				findOne: jest.fn().mockResolvedValue({
					id: '8ce48cab-b7a5-4d39-9242-028f3fe390fa',
					email: 'test@test.com',
					password:
						'$2b$10$HrEZe.9uI5UFhcTuKtKjFOhX/Y86XGg5ERbh/u46BvC/gRbaL./DW', // this is an example hashed
				}),
				findOneOrFail: jest.fn().mockResolvedValue({
					id: '8ce48cab-b7a5-4d39-9242-028f3fe390fa',
					email: 'test@test.com',
					password:
						'$2b$10$HrEZe.9uI5UFhcTuKtKjFOhX/Y86XGg5ERbh/u46BvC/gRbaL./DW',
				}),
				create: jest.fn().mockReturnValue({}),
				save: jest.fn().mockImplementation(({ email, password }) => {
					if (email !== 'test@test.com') {
						return null;
					}

					const user = new User();

					user.email = email;
					user.password = password;
					user.isActive = true;

					return user;
				}),
				update: jest.fn().mockResolvedValue(true),
				delete: jest.fn().mockResolvedValue(true),
			},
		},
	],
};

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule(
			metaData
		).compile();

		service = moduleRef.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

describe('create user', () => {
	jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashed password');

	let service: UserService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule(
			metaData
		).compile();

		service = moduleRef.get<UserService>(UserService);
	});

	it('should create a user successfully', async () => {
		const res = await service.create({
			email: 'test@test.com',
			password: '123456',
		});

		expect(res).toBeInstanceOf(User);
		expect(res.email).toBe('test@test.com');
		expect(res.password).toBe('hashed password');
	});

	it('should fail to create a user as it already exists', async () => {
		const res = await service.create({
			email: 'not_registered@test.com',
			password: '123456',
		});

		expect(res).toBeNull();
	});
});
