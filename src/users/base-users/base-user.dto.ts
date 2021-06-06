import {
  IsOptional,
  IsString,
  IsInt,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsAlpha,
  IsAscii,
} from 'class-validator';

export class BaseUserDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsAscii()
  @IsNotEmpty()
  readonly password: string;

  @IsAlpha()
  @IsNotEmpty()
  readonly name: string;

  @IsAlpha()
  @IsNotEmpty()
  readonly surname: string;

  @IsNotEmpty()
  @IsMobilePhone()
  readonly phone: string;
}
