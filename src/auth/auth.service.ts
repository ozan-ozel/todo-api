import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

		if(!user) {
			return null;
		}

		const passwordComparison = await bcrypt.compare(password, user.password);

		if(!passwordComparison) {
			return null;
		}

		const {password: pass, ...result} = user;

		return result;
	}

	async getToken(user: any) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload, {
				secret: process.env.SECRET,
			}),
		};
	}
}
