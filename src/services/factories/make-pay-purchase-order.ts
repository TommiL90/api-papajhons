import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PurchaseOrdersService } from '../purchase-orders-service'
import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-repository'
import { PurchaseOrderItemService } from '../purchase-order-item-service'
import { PrismaPurchaseOrderItemRepository } from '@/repositories/prisma/prisma-purchase-order-item'

export const makePayPurchaseOrder = () => {
  const purchaseOrderRepository = new PrismaPurchaseOrdersRepository()
  const userRepository = new PrismaUserRepository()
  const purchaseOrderItemRepository = new PrismaPurchaseOrderItemRepository()
  const purchaseOrderItemService = new PurchaseOrderItemService(
    purchaseOrderItemRepository,
  )

  const purchaseService = new PurchaseOrdersService(
    purchaseOrderRepository,
    userRepository,
    purchaseOrderItemService,
  )

  return purchaseService.payPurchaseOrder
}
