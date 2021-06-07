import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, ChildEntity } from 'typeorm';

import { BaseUser } from '../base-users/base-user.entity';

@ChildEntity({ name: 'admin' })
export class AdminUser extends BaseUser {
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
