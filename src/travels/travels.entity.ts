import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: null,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  agency: string;

  @Column({ type: 'varchar', length: 255 })
  destination: string;

  @Column({
    name: 'price_ht',
    type: 'double',
    precision: 2,
    scale: 2,
  })
  @IsNotEmpty()
  priceHt: number;

  @Column({ type: 'double precision', precision: 2, scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  description: string;

  @Column({ name: 'main_photo', type: 'varchar', length: 255 })
  @IsNotEmpty()
  mainPhoto: string;
}
