import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from './UserInterfaces';
import { Report } from '../reports/report.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report: Report) => report.user)
  reports: Report[];

  //Logging
  @AfterInsert() //Hook TypORM
  logInset() {
    console.log('Inserted User ID: ' + this.id);
  }
}
