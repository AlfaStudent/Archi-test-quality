import { Order } from 'src/order/domain/entity/order.entity';
import { Product } from 'src/product/domain/entity/product.entity';

export interface OrderRepositoryInterface {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByCustomerName(customerName: string): Promise<Order[]>;
  deleteOrder(id: string): Promise<void>;
  findOrdersContainingProduct(product: Product): Promise<Order[]>;
}
