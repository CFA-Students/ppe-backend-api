// import { IsAscii, IsBoolean, IsNotEmpty } from 'class-validator';
// import {
//   Entity,
//   Column,
//   OneToOne,
//   JoinColumn,
//   BaseEntity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity()
// export class Client extends BaseEntity {
//   @PrimaryGeneratedColumn({ name: 'client_id' })
//   clientId: number;

//   @Column({ name: 'is_male', type: 'bool', nullable: false })
//   @IsBoolean()
//   @IsNotEmpty()
//   isMale!: boolean;

//   @Column({ type: 'text', nullable: false })
//   @IsAscii()
//   @IsNotEmpty()
//   address!: string;

//   // @ManyToOne(() => User, (user) => user.id, { primary: true })
//   // user: User;

//   // @BeforeInsert()
//   // beforeInsertActions() {
//   //   this.isActive = false;
//   // }
// }
