import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './UserInterfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  //Logging
  @AfterInsert() //Hook TypORM
  logInset() {
    console.log('Inserted User ID: ' + this.id);
  }
}
