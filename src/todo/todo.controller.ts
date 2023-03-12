import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@ApiBody({
		type: CreateTodoDto,
		description: 'Create todo method',
		examples: {
			a: {
				summary: 'Example todo',
				value: { title: 'example title' } as CreateTodoDto,
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
		return this.todoService.create(createTodoDto, req.user.id);
	}

	@ApiQuery({
		name: 'isCompleted',
		type: String,
		description: 'optional parameter to get completed or incompleted todos',
		required: false,
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	find(@Request() req, @Query('isCompleted') isCompleted?: boolean) {
		return this.todoService.find(req.user.id, isCompleted);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: string,
		@Body() updateTodoDto: UpdateTodoDto,
		@Request() req
	) {
		const res = await this.todoService.update(+id, req.user.id, updateTodoDto);

		if (!res?.affected) {
			throw new HttpException(
				'Not allowed or non existing resources.',
				HttpStatus.BAD_REQUEST
			);
		}

		return { status: 'ok' };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@HttpCode(200)
	async remove(@Param('id') id: string, @Request() req) {
		const res = await this.todoService.remove(+id, req.user.id);

		if (!res?.affected) {
			throw new HttpException(
				'Not allowed or non existing resources.',
				HttpStatus.BAD_REQUEST
			);
		}

		return { status: 'ok' };
	}
}
