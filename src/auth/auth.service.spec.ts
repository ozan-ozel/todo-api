import { ModuleMetadata } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const metaData: ModuleMetadata = {
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'some secret key',
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [
		AuthService,
		UserService,
		{
			provide: getRepositoryToken(User),
			useValue: {
				find: jest.fn().mockResolvedValue([]),
				findOne: jest.fn().mockResolvedValue({
					id: '8ce48cab-b7a5-4d39-9242-028f3fe390fa',
					email: 'example1@example.com',
					password:
						'$2b$10$HrEZe.9uI5UFhcTuKtKjFOhX/Y86XGg5ERbh/u46BvC/gRbaL./DW', // this is an example of hashed password of value '123456'
				}),
				findOneOrFail: jest.fn().mockResolvedValue({
					id: '8ce48cab-b7a5-4d39-9242-028f3fe390fa',
					email: 'example1@example.com',
					password:
						'$2b$10$HrEZe.9uI5UFhcTuKtKjFOhX/Y86XGg5ERbh/u46BvC/gRbaL./DW',
				}),
				create: jest.fn().mockReturnValue({}),
				save: jest.fn(),
				update: jest.fn().mockResolvedValue(true),
				delete: jest.fn().mockResolvedValue(true),
			},
		},
	],
};

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule(
			metaData
		).compile();

		service = moduleRef.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

describe('validateUser', () => {
	let service: AuthService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule(
			metaData
		).compile();

		service = moduleRef.get<AuthService>(AuthService);
	});

	it('should return a user object when credentials are valid', async () => {
		const res = await service.validateUser('example1@example.com', '123456');
		expect(res.id).toEqual('8ce48cab-b7a5-4d39-9242-028f3fe390fa');
	});

	it('should return null when credentials are invalid', async () => {
		const res = await service.validateUser('xxx', 'xxx');
		expect(res).toBeNull();
	});
});

describe('validateLogin', () => {
	let service: AuthService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule(
			metaData
		).compile();

		service = moduleRef.get<AuthService>(AuthService);
	});

	it('should return JWT object when credentials are valid', async () => {
		const res = await service.getToken({
			email: 'example1@example.com',
			id: '8ce48cab-b7a5-4d39-9242-028f3fe390fa',
		});
		expect(res.access_token).toBeDefined();
	});
});
