import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly isSuperAdmin: boolean;
}
