// import { IsBoolean, IsNotEmpty } from 'class-validator';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   BaseEntity,
//   ManyToOne,
// } from 'typeorm';

// import { User } from '../user.entity';
// import { PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Admin extends BaseEntity {
//   @PrimaryGeneratedColumn({ name: 'admin_id' })
//   adminId: number;

//   @Column({
//     name: 'is_super_admin',
//     type: 'bool',
//     nullable: false,
//     default: false,
//   })
//   @IsBoolean()
//   @IsNotEmpty()
//   isSuperAdmin!: boolean;

//   // @ManyToOne(() => User, (user) => user.id, { primary: true })
//   // user: User;
// }
