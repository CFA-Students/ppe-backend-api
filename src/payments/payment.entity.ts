import { IsNotEmpty } from 'class-validator';
import { Reservation } from '../reservations/reservation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
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
    () => Reservation,
    (reservation) => reservation.payments,
    {
      cascade: true,
    }
  )
  @JoinTable({
    name: 'execute_payment',
    joinColumn: {
      name: 'id_payment',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_reservation',
      referencedColumnName: 'id',
    },
  })
  reservations: Reservation[];
}
