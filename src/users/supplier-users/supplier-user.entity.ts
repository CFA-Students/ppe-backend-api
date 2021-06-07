import { IsAlphanumeric, IsAscii, IsNotEmpty } from 'class-validator';
import { Column, ChildEntity } from 'typeorm';

import { User } from '../user.entity';

@ChildEntity({ name: 'supplier' })
export class SupplierUser extends User {
  @Column({
    name: 'id_company',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  idCompany!: string;

  @Column({
    name: 'supplier_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsNotEmpty()
  @IsAscii()
  supplierName!: string;
}
