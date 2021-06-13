import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Vehicle } from '../vehicle/vehicle.entity';

@Entity({ name: 'vehicle_category' })
export class VehicleCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'category_name', type: 'varchar', nullable: false })
  categoryName: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleCategory)
  vehicles: Vehicle[];
}
