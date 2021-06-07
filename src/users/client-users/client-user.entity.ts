import { IsAscii, IsBoolean, IsNotEmpty } from 'class-validator';
import { ChildEntity, Column } from 'typeorm';

import { User } from '../user.entity';

@ChildEntity({ name: 'client' })
export class ClientUser extends User {
  @Column({ name: 'is_male', type: 'bool', nullable: false })
  @IsBoolean()
  @IsNotEmpty()
  isMale!: boolean;

  @Column({ type: 'text', nullable: false })
  @IsAscii()
  @IsNotEmpty()
  address!: string;

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.isActive = false;
  // }
}
