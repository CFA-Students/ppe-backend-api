import { IsAscii, IsBoolean, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user.entity';

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

  @ManyToOne((type) => User, (user) => user.clients, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'id' })
  user: User;

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.isActive = false;
  // }
}
