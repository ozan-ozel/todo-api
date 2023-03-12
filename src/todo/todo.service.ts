import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private todoRepository: Repository<Todo>
	) {}

	create(createTodoDto: CreateTodoDto, userId: string) {
		return this.todoRepository.save({
      ...createTodoDto,
      user: {
        id: userId
      }
    });
	}

  find(userId: string, isCompleted: boolean) {
    return this.todoRepository.find({
      where: {
        user: {
          id: userId,
        },
        isCompleted
      }
    });
  }

	update(id: number, userId: string, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update({
      id,
      user: {
        id: userId
      }
    }, updateTodoDto);
	}

	remove(id: number, userId: string) {
		return this.todoRepository.delete({
      id,
      user: {
        id: userId
      }
    });
	}
}
