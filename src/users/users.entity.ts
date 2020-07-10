import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({
    
})
export class User {
    @ObjectIdColumn()
    _id?: ObjectID;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    isActive?: boolean;

    @Column()
    fullname: string;
}