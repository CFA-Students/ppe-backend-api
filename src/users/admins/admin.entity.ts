import { IsBoolean, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from '../user.entity';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    nullable: false,
    primary: true,
  })
  id: number;

  @Column({
    name: 'is_super_admin',
    type: 'bool',
    width: 1,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isSuperAdmin!: boolean;

  @ManyToOne((type) => User, (user) => user.clients, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'id' })
  user: User;
}
