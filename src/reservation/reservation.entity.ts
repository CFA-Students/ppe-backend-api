import { IsNotEmpty, IsDateString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // @ManyToOne(
  //   (type) => Location,
  //   (locationStart) => locationStart.reservations,
  //   {
  //     orphanedRowAction: 'delete',
  //   }
  // )
  // @JoinColumn({ name: 'id_location_start' })
  // locationStart: Location;

  // @ManyToOne(
  //   (type) => Location,
  //   (locationEnd) => locationEnd.reservations,
  //   {
  //     orphanedRowAction: 'delete',
  //   }
  // )
  // @JoinColumn({ name: 'id_location_end' })
  // locationEnd: Location;
}
