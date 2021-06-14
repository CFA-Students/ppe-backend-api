import { IsNotEmpty } from 'class-validator';
import { Reservation } from '../reservation/reservation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({
    name: 'price_ht',
    type: 'double',
    precision: 8,
    scale: 2,
    nullable: false,
  })
  @IsNotEmpty()
  priceHt: number;

  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    nullable: false,
  })
  @IsNotEmpty()
  price: number;

  @ManyToMany(
    (type) => Reservation,
    (reservation) => reservation.payments
  )
  reservations: Reservation[];
}
