import {
  IsOptional,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsAscii,
} from 'class-validator';

export class ClientDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsBoolean()
  @IsNotEmpty()
  isMale!: boolean;

  @IsAscii()
  @IsNotEmpty()
  address!: string;
}
