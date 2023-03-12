import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => {
	let service: TodoService;
  let mockTodoRepository = {
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TodoService,
				{
					provide: getRepositoryToken(Todo),
					useValue: mockTodoRepository,
				},
			],
		}).compile();

		service = module.get<TodoService>(TodoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

  it('should call save', async () => {
    await service.create(new CreateTodoDto(), "test-user-id");

    expect(mockTodoRepository.save).toHaveBeenCalled();
  })

  it('should call find', async () => {
    await service.find("test-user-id", false);

    expect(mockTodoRepository.find).toHaveBeenCalled();
  });

  it('should call update', async () => {
    await service.update(1, "test-user-id", new UpdateTodoDto());

    expect(mockTodoRepository.update).toHaveBeenCalled();
  });

  it('should call delete', async () => {
    await service.remove(1, "test-user-id");

    expect(mockTodoRepository.delete).toHaveBeenCalled();
  });
});
