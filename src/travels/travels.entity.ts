import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  createdAt: string;

  @Column({ length: 255, nullable: true })
  updatedAt: string;

  @Column({ length: 255 })
  agency: string;

  @Column({ length: 255 })
  destination: string;

  @Column()
  priceHt: number;

  @Column()
  price: number;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  image: string;
}

// @IsNumber() @IsOptional() readonly id: number;
// @IsDate() readonly createdAt: string;
// @IsDate() readonly updatedAt: string;
// @IsString() readonly agency: string;
// @IsString() readonly destination: string;
// @IsNumber() readonly priceHt: number;
// @IsNumber() readonly price: number;
// @IsString() readonly description: string;
// @IsString() readonly image: string;
