import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Constumer } from './constumer.entity';
import { OrderItem } from './order-item.entity';

import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Constumer, (customer) => customer.orders)
  customer: Constumer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      // de acuerdo a la relación ver que exista
      return this.items
        .filter((item) => !!item) //filtramos que no haya un nulo
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        })); //se transforma el array pidiendo los productos y agregandoi cantidad
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItems = item.product.price * item.quantity;
          return total + totalItems;
        }, 0);
    }
    return 0;
  }
}
