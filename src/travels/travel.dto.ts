import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TravelDto {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDateString() readonly createdAt: Date;
  @IsDateString() readonly updatedAt: Date;
  @IsString() readonly agency: string;
  @IsString() readonly destination: string;
  @Type(() => Number) @IsNumber() readonly priceHt: number;
  @Type(() => Number) @IsNumber() readonly price: number;
  @IsString() readonly description: string;
  @IsString() readonly mainPhoto: string;
}
