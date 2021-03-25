import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TravelDto {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDate() readonly createdAt: Date;
  @IsDate() readonly updatedAt: Date;
  @IsString() readonly agency: string;
  @IsString() readonly destination: string;
  @IsNumber() readonly priceHt: number;
  @IsNumber() readonly price: number;
  @IsString() readonly description: string;
  @IsString() readonly image: string;
}
