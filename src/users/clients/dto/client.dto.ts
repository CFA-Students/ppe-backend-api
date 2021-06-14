import { IsBoolean, IsNotEmpty, IsAscii } from 'class-validator';

export class ClientDto {
  @IsBoolean()
  @IsNotEmpty()
  isMale: boolean;

  @IsAscii()
  @IsNotEmpty()
  address: string;
}
