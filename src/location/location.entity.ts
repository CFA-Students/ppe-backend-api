import { IsNotEmpty, IsDateString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Reservation } from './../reservation/reservation.entity';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    name: 'street_address',
    type: 'varchar',
    nullable: false,
  })
  streetAddress: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  postalCode: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  // @OneToMany(() => Reservation, (reservation) => reservation.location)
  // reservations: Reservation[];

  // @ManyToOne(
  //   (type) => LocationCategory,
  //   (locationCategory) => locationCategory.location,
  //   {
  //     orphanedRowAction: 'delete',
  //   }
  // )
  // @JoinColumn({ name: 'id_location_category' })
  // locationCategory: LocationCategory;
}
