import {
  IsNotEmpty,
  IsEmail,
  IsAlpha,
  IsInt,
  IsMobilePhone,
  IsAscii,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class BaseUser {
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsNotEmpty()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsAscii()
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsAlpha()
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsAlpha()
  surname!: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  @IsNotEmpty()
  @IsMobilePhone()
  phone!: string;
}
