// import { IsAlphanumeric, IsAscii, IsNotEmpty } from 'class-validator';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   BaseEntity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { User } from '../user.entity';

// @Entity()
// export class Supplier extends BaseEntity {
//   @PrimaryGeneratedColumn({ name: 'supplier_id' })
//   supplierId: number;

//   @Column({
//     name: 'id_company',
//     type: 'varchar',
//     length: 150,
//     nullable: false,
//   })
//   @IsNotEmpty()
//   @IsAlphanumeric()
//   idCompany!: string;

//   @Column({
//     name: 'supplier_name',
//     type: 'varchar',
//     length: 255,
//     nullable: false,
//   })
//   @IsNotEmpty()
//   @IsAscii()
//   supplierName!: string;

//   // @ManyToOne(() => User, (user) => user.id, { primary: true })
//   // user: User;
// }
