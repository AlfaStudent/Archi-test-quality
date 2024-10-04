import { Order } from "src/order/domain/entity/order.entity";
import { Product } from "src/product/domain/entity/product.entity";

export interface ProductRepositoryInterface {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByCustomerName(customerName: string): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  findProductWithOrder(id: string): Promise<Product[] | null>;
  findProductwithActive(): Promise<Product[] | null>;
}
