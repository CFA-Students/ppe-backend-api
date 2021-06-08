import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsAscii,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsAscii()
  @IsNotEmpty()
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  // @OneToMany(() => Client, (client) => client.clientId)
  // clients: Client[];
  // @OneToMany(() => Admin, (admin) => admin.user)
  // admins: Admin[];
  // @OneToMany(() => Supplier, (supplier) => supplier.supplierId)
  // suppliers: Supplier[];
}
