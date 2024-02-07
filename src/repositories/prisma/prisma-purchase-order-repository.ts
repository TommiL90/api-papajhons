import {
  CreatePurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'
import { PurchaseOrdersRepository } from '../purchase-orders-repository'
import prisma from '@/lib/prisma'
import { OrdersStatus } from '@prisma/client'

export class PrismaPurchaseOrdersRepository
  implements PurchaseOrdersRepository
{
  async create(order: CreatePurchaseOrders) {
    return await prisma.purchaseOrders.create({
      data: order,
    })
  }

  async findAll() {
    return await prisma.purchaseOrders.findMany()
  }

  async findAllByUserId(userId: string) {
    return await prisma.purchaseOrders.findMany({
      where: { userId },
    })
  }

  async findCreatedStatusByUserId(userId: string, ordersStatus: OrdersStatus) {
    return await prisma.purchaseOrders.findFirst({
      where: { userId, status: ordersStatus },
    })
  }

  findById(id: string) {
    return prisma.purchaseOrders.findUnique({
      where: { id },
      include: {
        purchaseOrderItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  updateStatus(id: string, PurchaseOrder: UpdatePurchaseOrder) {
    return prisma.purchaseOrders.update({
      where: { id },
      data: {
        ...PurchaseOrder,
      },
    })
  }
}
