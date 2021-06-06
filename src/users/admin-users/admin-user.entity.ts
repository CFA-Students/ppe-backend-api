import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id!: number;

  @Column({
    name: 'is_super_admin',
    type: 'bool',
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isSuperAdmin!: boolean;
}
