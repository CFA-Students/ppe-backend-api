import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Travel {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDate() readonly createdAt: string;
  @IsDate() readonly updatedAt: string;
  @IsString() readonly agency: string;
  @IsString() readonly destination: string;
  @IsNumber() readonly priceHt: number;
  @IsNumber() readonly price: number;
  @IsString() readonly description: string;
  @IsString() readonly image: string;
}
