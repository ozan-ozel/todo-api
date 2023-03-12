import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '../auth/auth.service';
import { Todo } from '../todo/todo.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Todo])],
	providers: [UserService, AuthService, JwtService],
	controllers: [UserController],
	exports: [UserService],
})
export class UsersModule {}
