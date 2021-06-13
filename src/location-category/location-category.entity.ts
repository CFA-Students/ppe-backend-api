import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocationSpot } from '../locations-spot/location-spot.entity';

@Entity({ name: 'location_category' })
export class LocationCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'category_name', type: 'varchar', nullable: false })
  categoryName: string;

  @OneToMany(
    () => LocationSpot,
    (locationSpot) => locationSpot.locationCategory
  )
  locationSpots: LocationSpot[];
}
