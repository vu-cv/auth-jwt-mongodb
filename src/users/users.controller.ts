import { Controller, Get, Post, Patch, Param, Delete, UnauthorizedException, Request, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from 'src/roles/roles.decorator';
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {

    }

    @Post('login')
    async login() {
        let user = await this.authService.validateUser('chuvanvu', 'chuvanvu');
        if (user) {
            return this.authService.login(user);
        } else {
            throw new UnauthorizedException('haha 1', 'haha 2');
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    profile(@Request() req) {
        return req.user
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    create(): Promise<User> {

        return this.usersService.create({
            username: 'chuvanvu1',
            password: 'chuvanvu1',
            // isActive: true,
            fullname: 'chu van v1'
        })
    }

    @Patch(':id')
    @Roles('admin')
    async update(@Param() id: string): Promise<any> {
        console.log(id);

        let result = await this.usersService.update(id, { fullname: 'Chu Vụ' });
        console.log(result);
        return result;

    }

    @Delete(':id')
    async destroy(@Param() id: string): Promise<void> {
        console.log(id);

        return await this.usersService.remove(id);
    }

}
