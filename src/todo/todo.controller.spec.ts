import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LocalTestingModule } from '../../test/local.testing.module';
import {
	createTodoSeeds,
	createUserSeeds,
} from '../../test/local.testing.seeds';
import { User } from '../user/user.entity';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';

describe('TodoController', () => {
	let controller: TodoController;

	let userRepository: Repository<User>;
	let todoRepository: Repository<Todo>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			...LocalTestingModule,
			controllers: [TodoController],
		}).compile();

		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
		todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));

		await createUserSeeds(userRepository);
		await createTodoSeeds(todoRepository);

		controller = module.get<TodoController>(TodoController);
	});

	afterEach(() => {
		todoRepository.clear();
		userRepository.clear();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create todo for registered user', async () => {
		const res = await controller.create(
			{ title: 'example title' },
			{ user: { id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba' } }
		);

		expect(res).toBeDefined();
		expect(res.id).toBeDefined();
		expect(res.isCompleted).toBe(false);
		expect(res.title).toBe('example title');
		expect(res.user.id).toBe('dd3face9-644d-441f-8c4e-931c4c9ca5ba');
	});

	it('should find and retrieve all todos of the user', async () => {
		const res = await controller.find({
			user: { id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba' },
		});

		expect(res).toBeDefined();
		expect(res?.length).toBe(2);
	});

	it('should find and retrieve complete todos of the user', async () => {
		const res = await controller.find(
			{ user: { id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba' } },
			true
		);

		expect(res).toBeDefined();
		expect(res?.length).toBe(1);
	});

	it('should find and retrieve incomplete todos of the user', async () => {
		const res = await controller.find(
			{ user: { id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba' } },
			false
		);

		expect(res).toBeDefined();
		expect(res?.length).toBe(1);
	});

	it('should make the todo of the user incomplete', async () => {
		await controller.update(
			'3',
			{
				isCompleted: false,
			},
			{ user: { id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d' } }
		);

    const res = await todoRepository.findOneBy({id: 3});

    expect(res).toBeDefined();
    expect(res.isCompleted).toBe(false);
	});

  it('should make the todo of the user complete', async () => {
		await controller.update(
			'3',
			{
				isCompleted: true,
			},
			{ user: { id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d' } }
		);

    const res = await todoRepository.findOneBy({id: 3});

    expect(res).toBeDefined();
    expect(res.isCompleted).toBe(true);
	});

  it('should change the title of the todo', async () => {
		await controller.update(
			'3',
			{
				title: 'test title',
			},
			{ user: { id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d' } }
		);

    const res = await todoRepository.findOneBy({id: 3});

    expect(res).toBeDefined();
    expect(res.title).toBe('test title');
	});

  it('should fail to update the todo of another user', async () => {
		try {
      await controller.update(
        '1',
        {
          isCompleted: false,
        },
        { user: { id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d' } }
      );

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Not allowed or non existing resources.');
		}
	});

  it('should remove the todo of the authenticated user', async () => {
		await controller.remove(
			'3',
      {user: {id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d'}}
		);

    const res = await todoRepository.findOneBy({id: 3});

    expect(res).toBeNull();
	});

  it('should fail to remove the todo of the another user', async () => {
		try {
      await controller.remove(
        '1',
        {user: {id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d'}}
      );

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Not allowed or non existing resources.');
		}
	});
});
