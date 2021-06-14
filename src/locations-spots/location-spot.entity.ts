import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Reservation } from '../reservations/reservation.entity';
import { LocationCategory } from '../location-categories/location-category.entity';

@Entity({ name: 'location_spot' })
export class LocationSpot extends BaseEntity {
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

  @Column({
    type: 'int',
    name: 'id_location_category',
    unsigned: true,
    nullable: false,
  })
  idLocationCategory: number;

  @ManyToOne(
    (type) => LocationCategory,
    (locationCategory) => locationCategory.locationSpots,
    {
      orphanedRowAction: 'delete',
    }
  )
  @JoinColumn({ name: 'id_location_category' })
  locationCategory: LocationCategory;

  @OneToMany(
    () => Reservation,
    (reservation) => reservation.locationSpotStart
  )
  reservationsStart: Reservation[];

  @OneToMany(
    () => Reservation,
    (reservation) => reservation.locationSpotEnd
  )
  reservationsEnd: Reservation[];
}
