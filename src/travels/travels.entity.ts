import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  createdAt: string;

  @Column('date')
  updatedAt: string;

  @Column({ type: 'varchar', length: 255 })
  agency: string;

  @Column({ type: 'varchar', length: 255 })
  destination: string;

  @Column()
  priceHt: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ type: 'varchar', length: 255 })
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
