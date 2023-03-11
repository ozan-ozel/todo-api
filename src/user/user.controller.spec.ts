import { createRequest, createResponse } from 'node-mocks-http';

import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let userController: UserController;

	const req = createRequest();
	req.res = createResponse();

	const mockUserService = {
		create: jest.fn(),
	};

	const mockAuthService = {
		getToken: jest.fn().mockReturnValue({ accessToken: 'test access token' }),
	};

	// create fake module
	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				{ provide: UserService, useValue: mockUserService },
				{
					provide: JwtAuthGuard,
					useValue: jest.fn().mockImplementation(() => true),
				},
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		userController = moduleRef.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(userController).toBeDefined();
	});

	it('should create a user', async () => {
		await userController.create({
			email: 'test@test.com',
			password: 'test',
		});

		expect(mockUserService.create).toHaveBeenCalled();
	});

	it('should login as a registered user', async () => {
		const res = await userController.login({
			email: 'test@test.com',
			password: 'test',
		});

		expect(mockAuthService.getToken).toHaveBeenCalled();
		expect(res).toStrictEqual({ accessToken: 'test access token' });
	});
});
