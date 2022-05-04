import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Constumer } from './constumer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'varchar', length: 255, unique: true })
  // name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; //encripted

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => Constumer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Constumer;
}
