import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PurchaseOrdersService } from '../purchase-orders-service'
import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-repository'

export const makePayPurchaseOrder = () => {
  const purchaseOrderRepository = new PrismaPurchaseOrdersRepository()
  const userRepository = new PrismaUserRepository()

  const purchaseService = new PurchaseOrdersService(
    purchaseOrderRepository,
    userRepository,
  )

  return purchaseService.payPurchaseOrder
}
