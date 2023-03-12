import { Todo } from '../src/todo/todo.entity';
import { Repository } from 'typeorm';

import { User } from '../src/user/user.entity';

export const createUserSeeds = (repository: Repository<User>) => {
	const users = [
    {
      id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba',
      email: 'example@example.com',
      password: '$2b$10$criEXebkH.FI9z60L6MGSuhnnD8etW1WFF/EZvDjk321ZaZ./YJc.',
    },
    {
      id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d',
      email: 'example1@example.com',
      password: '$2b$10$BQsAiB4O/UhAcom4a8fBEOE65y9mT7TAAhdIALdtD5Yxp.3ZDnIsC',
    },
  ];

	return repository.save(users);
};

export const createTodoSeeds = async (repository: Repository<Todo>) => {
  return repository.save([
    {
      id: 1,
      title: "todo 1",
      isCompleted: true, 
      user: {
        id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba'
      }
    },
    {
      id: 2,
      title: "todo 2",
      isCompleted: false,
      user: {
        id: 'dd3face9-644d-441f-8c4e-931c4c9ca5ba'
      }
    },
    {
      id: 3,
      title: "todo 3",
      isCompleted: false,
      user: {
        id: 'c4e4450a-0b64-4e50-9c4d-c4d714a36e6d'
      }
    },
  ]);
}
