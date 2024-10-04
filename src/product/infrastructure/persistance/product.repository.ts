import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import { Product } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from 'src/product/domain/port/persistance/product.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class ProductRepositoryTypeOrm
  extends Repository<Product>
  implements ProductRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Product | null> { 
    const queryBuilder = this.createQueryBuilder('product');


    queryBuilder.where('order.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    return queryBuilder.getMany();
  }

  async findByCustomerName(customerName: string): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.customerName = :customerName', { customerName });

    return queryBuilder.getMany();
  }

  async deleteProduct(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('order.id = :id', { id });

    await queryBuilder.delete().execute();
  }

  async findProductWithOrder(id: string): Promise<Product[] | null> {
   return;
  }

  async findProductwithActive(): Promise<Product[] | null> {
    return;
  }
}
