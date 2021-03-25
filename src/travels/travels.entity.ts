import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  @IsNotEmpty()
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  @IsNotEmpty()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  agency: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
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
