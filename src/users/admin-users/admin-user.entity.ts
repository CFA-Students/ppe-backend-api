import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, ChildEntity } from 'typeorm';

import { User } from '../user.entity';

@ChildEntity({ name: 'admin' })
export class AdminUser extends User {
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
