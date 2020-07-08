import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        
        if(user && user.password == password) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { id: user.id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
