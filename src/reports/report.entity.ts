import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IReport } from './report_interfaces';
import { User } from '../users/user.entity';

@Entity()
export class Report implements IReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  make: string;

  @Column()
  mileage: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user: User) => user.reports)
  user: User;

  @Column({ default: false })
  approved: boolean;
}
