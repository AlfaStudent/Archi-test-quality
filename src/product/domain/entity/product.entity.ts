import { OrderItem } from 'src/order/domain/entity/order-item.entity';
import { Order } from '../../../order/domain/entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { int } from 'aws-sdk/clients/datapipeline';

export interface ProductCommand {
  productName: string;
  price: number;
  stock: number;
  isActive: boolean;
  description: string;

}

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column({
    type: 'int',
  })
  stock: number;

  @Column({
    type: 'int',
  })
  price: number;

  @Column()
  isActive: boolean;

  @Column()
  description: string;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.product)
  order: Order;


  constructor(productCommand: ProductDetailCommand) {
    if (!productCommand) {
      return;
    }
    if (productCommand.productName || productCommand.price || productCommand.description) {
      throw new Error(
        'Le nom, le prix et la description sont obligatoire. ',
      );
    }
    this.stock = productCommand.stock != null ? productCommand.stock : 0;
    this.productName = productCommand.productName;
    this.price = productCommand.price;
    this.description = productCommand.description;
    this.stock = productCommand.stock;
    this.isActive = productCommand.isActive;

  }

  public updateProduct(productCommand: ProductCommand): void {
    if (productCommand.productName || productCommand.price || productCommand.description) {
      throw new Error(
        'Le nom, le prix et la description sont obligatoire. ',
      );
    }
    this.stock = productCommand.stock != null ? productCommand.stock : 0;
    this.productName = productCommand.productName;
    this.price = productCommand.price;
    this.description = productCommand.description;
    this.stock = productCommand.stock;
    productCommand.isActive? this.isActive = productCommand.isActive : this.isActive;
  }

  decrementStock(quantity: int): void {
    if (this.stock < quantity) {
      throw new Error('Stock insuffisant.');
    }
    this.stock -= quantity;
  }

  incrementStock(quantity: int): void {
    this.stock += quantity;
  }
}
