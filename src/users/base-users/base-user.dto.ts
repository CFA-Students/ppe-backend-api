import {
  IsOptional,
  IsString,
  IsInt,
  IsEmail,
} from 'class-validator';

export class BaseUserDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString()
  readonly phone: string;
}
