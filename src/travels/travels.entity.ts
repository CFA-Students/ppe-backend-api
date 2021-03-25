import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: null })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null })
  updatedAt: Date;

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
