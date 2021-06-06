import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientUser {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Column({ name: 'is_male', type: 'bool', nullable: false })
  @IsBoolean()
  @IsNotEmpty()
  isMale!: boolean;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty()
  address!: string;

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.isActive = false;
  // }
}
