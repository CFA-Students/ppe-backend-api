import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Reservation } from '../reservations/reservation.entity';
import { VehicleCategory } from 'src/vehicle-categories/vehicle-category.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    name: 'seats_count',
    type: 'smallint',
    unsigned: true,
    nullable: false,
  })
  seatsCount: number;

  @Column({
    name: 'id_reservation',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  idReservation: number;

  @Column({
    name: 'id_vehicle_category',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  idVehicleCategory: number;

  @ManyToOne(
    (type) => Reservation,
    (reservation) => reservation.vehicles,
    {
      orphanedRowAction: 'delete',
    }
  )
  @JoinColumn({ name: 'id_reservation' })
  reservation: Reservation;

  @ManyToOne(
    (type) => VehicleCategory,
    (vehicleCategory) => vehicleCategory.vehicles,
    {
      orphanedRowAction: 'delete',
    }
  )
  @JoinColumn({ name: 'id_vehicle_category' })
  vehicleCategory: VehicleCategory;
}
