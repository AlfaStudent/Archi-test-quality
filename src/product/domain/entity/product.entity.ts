import { Order } from '../../../order/domain/entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export interface ItemDetailCommand {
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

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  constructor(itemCommand: ItemDetailCommand) {
    if (!itemCommand) {
      return;
    }
    if (itemCommand.productName || itemCommand.price || itemCommand.description) {
      throw new Error(
        'Le nom, le prix et la description sont obligatoire. ',
      );
    }
    this.stock = itemCommand.stock != null ? itemCommand.stock : 0;
    this.productName = itemCommand.productName;
    this.price = itemCommand.price;
    this.description = itemCommand.description;
    this.stock = itemCommand.stock;
    this.isActive = itemCommand.isActive;

  }

  public updateProduct(itemCommand: ItemDetailCommand): void {
    if (itemCommand.productName || itemCommand.price || itemCommand.description) {
      throw new Error(
        'Le nom, le prix et la description sont obligatoire. ',
      );
    }
    this.stock = itemCommand.stock != null ? itemCommand.stock : 0;
    this.productName = itemCommand.productName;
    this.price = itemCommand.price;
    this.description = itemCommand.description;
    this.stock = itemCommand.stock;
    itemCommand.isActive? this.isActive = itemCommand.isActive : this.isActive;}
}
