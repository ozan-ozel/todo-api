import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '60s' },
		}),
		UsersModule,
	],
	providers: [AuthService, JwtService, JwtStrategy, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
