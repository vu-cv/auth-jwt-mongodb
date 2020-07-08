import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: 'dmmmm',
        signOptions: {
            expiresIn: '60000s'
        }
    })],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {

}
