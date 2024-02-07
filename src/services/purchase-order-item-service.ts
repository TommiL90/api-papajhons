import {
  CreatePurchaseOrderItem,
  PurchaseOrderItem,
} from '@/interfaces/purchase-order-item-interfaces'
import { PurchaseOrderItemRepository } from '@/repositories/purchase-order-item-repository'
import { PurchaseOrdersService } from './purchase-orders-service'
import { OrdersStatus } from '@prisma/client'
import { AppError } from '@/errors/AppError'

export class PurchaseOrderItemService {
  constructor(
    private purchaseOrderRepository: PurchaseOrderItemRepository,
    private purchaseOrdersService: PurchaseOrdersService,
  ) {}

  createPurchaseOrderItem = async (
    createPurchaseOrderItem: CreatePurchaseOrderItem,
  ): Promise<PurchaseOrderItem> => {
    const orders = await this.purchaseOrdersService.findAllByUserId(
      createPurchaseOrderItem.purchaseOrderId,
    )

    const foundOrder = orders.find(
      (order) => order.status === OrdersStatus.CREATED,
    )

    if (!foundOrder) {
      throw new AppError('Purchase order available does not exist', 404)
    }

    const newPurchaseOrderItem = await this.purchaseOrderRepository.create(
      createPurchaseOrderItem,
    )
    return newPurchaseOrderItem
  }
}
