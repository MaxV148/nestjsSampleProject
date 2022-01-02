import { IReport } from '../report_interfaces';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto implements Partial<IReport> {
  @IsLatitude()
  lat: number;
  @IsLongitude()
  lng: number;
  @IsString()
  make: string;
  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  mileage: number;
  @IsString()
  model: string;
  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  price: number;
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
}
