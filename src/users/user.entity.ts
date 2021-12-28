import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  //Logging

  @AfterInsert() //Hook
  logInset() {
    console.log('Inserted User ID: ' + this.id);
  }
}
