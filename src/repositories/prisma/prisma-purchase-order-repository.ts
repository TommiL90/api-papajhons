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
      include: {
        purchaseOrderItems: true,
      },
    })
  }

  async findCreatedStatusByUserId(userId: string, ordersStatus: OrdersStatus) {
    return await prisma.purchaseOrders.findFirst({
      where: { userId, status: ordersStatus },
    })
  }

  async findById(id: string) {
    const item = await prisma.purchaseOrders.findUnique({
      where: { id },
      include: {
        purchaseOrderItems: {
          include: {
            product: true,
          },
        },
      },
    })
    return item
  }

  async updateStatus(id: string, PurchaseOrder: UpdatePurchaseOrder) {
    return await prisma.purchaseOrders.update({
      where: { id },
      data: {
        ...PurchaseOrder,
      },
    })
  }
}
