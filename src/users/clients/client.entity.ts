import { IsAscii, IsBoolean, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user.entity';
import { Reservation } from '../../reservations/reservation.entity';

@Entity()
export class Client extends BaseEntity {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    nullable: false,
    primary: true,
  })
  id: number;

  @Column({
    name: 'is_male',
    type: 'boolean',
    width: 1,
    default: true,
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isMale!: boolean;

  @Column({ type: 'text', nullable: false })
  @IsAscii()
  @IsNotEmpty()
  address!: string;

  @ManyToOne(() => User, (user) => user.clients, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToMany(() => Reservation, (reservation) => reservation.clients)
  @JoinTable({
    name: 'perform_reservation',
    joinColumn: {
      name: 'id_client',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_reservation',
      referencedColumnName: 'id',
    },
  })
  reservations: Reservation[];

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.isActive = false;
  // }
}
