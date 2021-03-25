import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Category {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDate() readonly createdAt: string;
  @IsDate() readonly updatedAt: string;
  @IsString() readonly name: string;
  @IsBoolean() readonly isOnline: boolean;
}
