import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import { Product } from 'src/product/domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/product/domain/port/persistance/product.repository.interface';

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  public async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Pas de produit');
    }

    const products: Product[]  = await this.productRepository.findProductWithOrder(productId);
    if (products.length > 0) {
      throw new NotFoundException('Produit lié à une commande');
    }
    
    this.productRepository.deleteProduct(product.id);

    return;
  }
}
