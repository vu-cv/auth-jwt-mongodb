import { Controller, Get, Post, Patch, Param, Delete, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
        if(user) {
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
    getAll():Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    create(): Promise<User> {

        return this.usersService.create({
            username: 'chuvanvu',
            password: 'chuvanvu',
            isActive: true,
            fullname: 'chu van vu'
        })
    }

    @Patch(':id')
    async update(@Param() id: string): Promise<void> {
        console.log(id);
        
        await this.usersService.update(id, {fullname: 'Chu Vụ'})
    }
    
    @Delete(':id')
    async destroy(@Param() id: string): Promise<void> {
        console.log(id);
        
        return await this.usersService.remove(id);
    }

}
