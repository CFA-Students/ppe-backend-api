import {
  IsOptional,
  IsString,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsAscii,
  IsEmail,
} from 'class-validator';

export class BaseUserDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsAscii()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @IsMobilePhone()
  @IsNotEmpty()
  readonly phone: string;
}
