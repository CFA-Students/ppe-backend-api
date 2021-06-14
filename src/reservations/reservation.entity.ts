import { IsNotEmpty, IsDateString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocationSpot } from '../locations-spots/location-spot.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Payment } from '../payments/payment.entity';
import { Client } from '../users/clients/client.entity';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @CreateDateColumn({
    name: 'start_at',
    type: 'timestamp',
    nullable: false,
    default: (): string => 'CURRENT_TIMESTAMP(6)',
  })
  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @CreateDateColumn({
    name: 'end_at',
    type: 'timestamp',
    nullable: false,
    default: (): string => 'CURRENT_TIMESTAMP(6)',
  })
  @IsDateString()
  @IsNotEmpty()
  endAt: string;

  @Column({
    name: 'id_location_spot_start',
    unsigned: true,
    nullable: false,
  })
  idLocationSpotStart: number;

  @Column({
    name: 'id_location_spot_end',
    unsigned: true,
    nullable: false,
  })
  idLocationSpotEnd: number;

  @ManyToOne(
    () => LocationSpot,
    (idLocationSpotStart) => idLocationSpotStart.reservationsStart,
    {
      orphanedRowAction: 'delete',
    }
  )
  @JoinColumn({ name: 'id_location_spot_start' })
  locationSpotStart: LocationSpot;

  @ManyToOne(
    () => LocationSpot,
    (idLocationSpotEnd) => idLocationSpotEnd.reservationsEnd,
    {
      orphanedRowAction: 'delete',
    }
  )
  @JoinColumn({ name: 'id_location_spot_end' })
  locationSpotEnd: LocationSpot;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.reservation)
  vehicles: Vehicle[];

  @ManyToMany(() => Client, (client) => client.reservations)
  clients: Client[];

  @ManyToMany(() => Payment, (payment) => payment.reservations)
  @JoinTable({
    name: 'execute_payment',
    joinColumn: {
      name: 'id_reservation',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_payment',
      referencedColumnName: 'id',
    },
  })
  payments: Payment[];
}
