import {
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsAlphanumeric,
  IsAscii,
} from 'class-validator';

export class SupplierDto {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @IsAlphanumeric()
  @IsNotEmpty()
  idCompany!: string;

  @IsAscii()
  @IsNotEmpty()
  supplierName!: string;
}
