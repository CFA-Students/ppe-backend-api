import { IsDateString, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  email: string;

  @Column({
    name: 'email_verified_at',
    type: 'timestamp',
    default: null,
  })
  @IsNotEmpty()
  @IsDateString()
  emailVerifiedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  password: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @Column({ name: 'is_online', type: 'bool', default: 0 })
  @IsNotEmpty()
  isOnline: boolean;
}
