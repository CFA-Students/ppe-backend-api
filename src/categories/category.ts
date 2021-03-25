import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Category {
  @IsNumber() @IsOptional() readonly id: number;
  @IsDate() readonly created_at: string;
  @IsDate() readonly updated_at: string;
  @IsString() readonly name: string;
  @IsBoolean() readonly is_online: boolean;
}
