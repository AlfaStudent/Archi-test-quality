import { Product } from "src/product/domain/entity/product.entity";
//import  { ItemDetailCommand } from "src/order/domain/entity/product.entity";
import { ItemDetailCommand } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

export class CreateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}
  
    async execute(): Promise<Product[]> {
      const product = await this.productRepository.findProductwithActive();
      return product;

    }
  }