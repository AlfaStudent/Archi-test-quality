import { Product } from "src/product/domain/entity/product.entity";
//import  { ItemDetailCommand } from "src/order/domain/entity/product.entity";
import { ItemDetailCommand } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

const INCREMENT_STOCK = 1;

export class CreateProductService {
    constructor(private readonly productRepositorypository: ProductRepositoryInterface) {}
  
    async execute(itemDetailCommand: ItemDetailCommand): Promise<Product> {
      const product = new Product(itemDetailCommand);
      product.incrementStock(INCREMENT_STOCK);
  
      return await this.productRepositorypository.save(product);
    }
  }