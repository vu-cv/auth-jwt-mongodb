import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RolesController } from './roles/roles.controller';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: 'mongodb://127.0.0.1:27017/nestjs_jwt',
    synchronize: true,
    entities: [User],
  }), UsersModule, AuthModule],
  controllers: [AppController, UsersController, RolesController],
  providers: [AppService],
})
export class AppModule {

}
