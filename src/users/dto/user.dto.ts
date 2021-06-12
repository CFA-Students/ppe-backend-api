import {
  IsOptional,
  IsString,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsAscii,
  IsEmail,
} from 'class-validator';

export class UserLoginDto {
  @IsEmail(
    { ignore_max_length: true, allow_utf8_local_part: false },
    { always: true }
  )
  @IsNotEmpty({ always: true })
  readonly email: string;

  @IsAscii({ always: true })
  @IsNotEmpty({ always: true })
  readonly password: string;
}

export class UserDto {
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
