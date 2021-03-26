import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CategoryDto {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDateString() readonly createdAt: Date;
  @IsDateString() readonly updatedAt: Date;
  @IsString() readonly name: string;
}
