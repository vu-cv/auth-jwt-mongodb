import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: MongoRepository<User>
    ) {
    }
    create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    update(id: string, user: Partial<User>) {
        return this.usersRepository.update(id, user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(username: string): Promise<User> {
        return this.usersRepository.findOne({
            username: username
        })
    }
    
    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
