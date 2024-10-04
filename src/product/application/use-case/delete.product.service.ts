import { NotFoundException } from '@nestjs/common';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { Product } from 'src/product/domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/product/domain/port/persistance/product.repository.interface';

export class DeleteProductService {

  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly orderRepository: OrderRepositoryInterface
) {}


  public async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Pas de produit');
    }

    const ordersContainingProduct = await this.orderRepository.findOrdersContainingProduct(productId);
    if (ordersContainingProduct.length > 0) {
      throw new NotFoundException('Produit lié à une commande');
    }

    this.productRepository.deleteProduct(product.id);
    

    return;
  }
}
