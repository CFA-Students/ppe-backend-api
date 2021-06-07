import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsAscii,
} from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'user' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class BaseUser {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
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

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;
}
