import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // várias orders podem ter um customer (um cliente pode fazer vários pedidos)
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' }) // o campo customer_id fará o relacionamento com a tabela Customer
  customer: Customer;

  // um pedido pode ter vários order_products
  // um pedido pode ter vários produtos
  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true, // salva automaticamente os produtos na tabela 'orders_products'
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
