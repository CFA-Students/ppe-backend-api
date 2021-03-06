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
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Client } from './clients/client.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Admin } from './admins/admin.entity';

@Entity()
@Index('credentials_unique', ['username', 'email', 'password'], {
  unique: true,
})
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

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Admin, (admin) => admin.user)
  admins: Admin[];

  @OneToMany(() => Supplier, (supplier) => supplier.user)
  suppliers: Supplier[];
}
