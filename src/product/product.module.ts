import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from 'src/order/infrastructure/presentation/order.controller';
import { OrderItem } from 'src/order/domain/entity/order-item.entity';
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { CancelOrderService } from 'src/order/application/use-case/cancel-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { GenerateInvoiceService } from 'src/order/application/use-case/generate-invoice.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import ProductRepositoryTypeOrm from '../product/infrastructure/persistance/product.repository';
import { ProductRepositoryInterface } from './domain/port/persistance/product.repository.interface';
import { CreateProductService } from './application/use-case/create-product.service';
import { Order } from 'src/order/domain/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,
    ProductRepositoryTypeOrm,

    {
      provide: GenerateInvoiceService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGeneratorService: PdfGeneratorServiceInterface,
      ) => {
        return new GenerateInvoiceService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    // pour pouvoir gérer l'inversion de dépendance
    // du service CreateProductService
    // j'utilise le système de useFactory de nest
    {
      // quand j'enregistre la classe CreateOrderService
      provide: CreateProductService,
      // je demande à Nest Js de créer une instance de cette classe
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new CreateProductService(productRepository);
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [ProductRepositoryTypeOrm],
    },
  ],
})
export class OrderModule {}
