import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplierUser {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  surname!: string;

  @Column({ type: 'varchar', length: 15 })
  @IsNotEmpty()
  phone!: string;
}
