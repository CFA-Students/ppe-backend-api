import { IsNotEmpty, IsAlphanumeric, IsAscii } from 'class-validator';

export class SupplierDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  idCompany!: string;

  @IsAscii()
  @IsNotEmpty()
  supplierName!: string;
}
