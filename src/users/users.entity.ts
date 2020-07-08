import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Exclude } from 'class-transformer';
@Entity({
    
})
export class User {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @Column()
    fullname: string;
}