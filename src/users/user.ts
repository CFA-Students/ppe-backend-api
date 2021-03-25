import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class User {
  @IsNumber() @IsOptional() readonly id: number;
  @IsString() readonly name: string;
  @IsString() readonly email: string;
  @IsDate() readonly emailVerifiedAt;
  @IsString() readonly password: string;
  @IsDate() readonly createdAt: string;
  @IsDate() readonly updatedAt: string;
}
