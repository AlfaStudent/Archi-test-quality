import { NotFoundException } from "@nestjs/common";
import { int } from "aws-sdk/clients/datapipeline";
import { Product } from "src/product/domain/entity/product.entity";
//import  { ItemDetailCommand } from "src/order/domain/entity/product.entity";
import { ItemDetailCommand } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

export class CreateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}
  
    async execute(productId: string, itemDetailCommand: ItemDetailCommand ): Promise<Product> {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new NotFoundException('Pas de produit');
      }

  
      return await this.productRepository.save(product);
    }
  }