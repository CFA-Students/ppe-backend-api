import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNumber() @IsOptional() readonly id: number;
  @IsString() readonly name: string;
  @IsString() readonly email: string;
  @IsDateString() readonly emailVerifiedAt: Date;
  @IsString() readonly password: string;
  @IsDateString() readonly createdAt: Date;
  @IsDateString() readonly updatedAt: Date;
  @IsBoolean() readonly isOnline: boolean;
}
