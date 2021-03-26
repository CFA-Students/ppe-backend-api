/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;
}
