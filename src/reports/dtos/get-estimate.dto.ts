import { IReport } from '../report_interfaces';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto implements Partial<IReport> {
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @IsString()
  make: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  mileage: number;
  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
}
