import { IsAlphanumeric, IsAscii, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplierUser {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id!: number;

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
