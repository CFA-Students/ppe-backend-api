import { IsAlphanumeric, IsAscii, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from '../user.entity';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    nullable: false,
    primary: true,
  })
  id: number;

  @Column({
    name: 'id_company',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  idCompany: string;

  @Column({
    name: 'supplier_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsNotEmpty()
  @IsAscii()
  supplierName: string;

  @ManyToOne(() => User, (user) => user.suppliers, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'id' })
  user: User;
}
