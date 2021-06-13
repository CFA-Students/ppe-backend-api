import { IsNotEmpty, IsJWT } from 'class-validator';

export class JwtTokenDto {
  @IsJWT({ always: true })
  @IsNotEmpty({ always: true })
  readonly accessToken: string;
}
