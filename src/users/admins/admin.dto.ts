import {
  IsOptional,
  IsInt,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class AdminUserDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isSuperAdmin: boolean;
}
