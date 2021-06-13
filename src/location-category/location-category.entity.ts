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

@Entity()
export class LocationCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'category_name', type: 'varchar', nullable: false })
  categoryName: string;

  // @OneToMany(() => Location, (location) => location.locationCategory)
  // reservations: Location[];
}
