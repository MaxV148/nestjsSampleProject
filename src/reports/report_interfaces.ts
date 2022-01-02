import { CreateReportDto } from './dtos/create-report.dto';
import { IUser } from '../users/UserInterfaces';
import { User } from '../users/user.entity';

export interface IReport {
  id: number;
  price: number;
  make: string;
  model: string;
  year: number;
  lng: number;
  lat: number;
  mileage: number;
  user: IUser;
}

export interface IReportService {
  create(body: CreateReportDto, user: User);
  changeApproval(id: string, approved: boolean);
}
