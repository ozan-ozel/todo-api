import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Request,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject(forwardRef(() => AuthService))
		private authService: AuthService
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<void> {
		await this.userService.create(createUserDto);
	}

	@ApiBody({
		type: CreateUserDto,
		description: 'User login method',
		examples: {
			a: {
				summary: 'Example user',
				value: { email: 'example@example.com', password: '' } as CreateUserDto,
			},
		},
	})
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(200)
	async login(@Request() req): Promise<any> {
		return this.authService.getToken(req.user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string): Promise<User> {
		return this.userService.findOne(id);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.userService.remove(id);
	}
}
