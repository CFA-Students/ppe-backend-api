import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNumber() @IsOptional() readonly id: number;
  @IsString() readonly name: string;
  @IsString() readonly email: string;
  @IsDate() readonly emailVerifiedAt: string;
  @IsString() readonly password: string;
  @IsDate() readonly createdAt: string;
  @IsDate() readonly updatedAt: string;
  @IsBoolean() readonly isOnline: boolean;
}
