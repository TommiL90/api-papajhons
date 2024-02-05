import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository'
import { UsersRepository } from '@/repositories/user-repository'
import {
  CreatePurchaseOrders,
  PurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'
import { AppError } from '@/errors/AppError'
import { OrdersStatus } from '@prisma/client'
import { PurchaseOrderItemRepository } from '@/repositories/purchase-order-item-repository'
import {
  CreatePurchaseOrderItem,
  PurchaseOrderItem,
} from '@/interfaces/purchase-order-item-interfaces'

export class PurchaseOrdersService {
  constructor(
    private purchaseOrdersRepository: PurchaseOrdersRepository,
    private purchaseOrderItemRepository: PurchaseOrderItemRepository,
    private useRepository: UsersRepository,
  ) {}

  async createPurchaseOrders(
    createPurchaseOrders: Omit<CreatePurchaseOrders, 'status'>,
  ): Promise<PurchaseOrders> {
    const createPurchaseOrderComplete: CreatePurchaseOrders = {
      ...createPurchaseOrders,
      status: OrdersStatus.CREATED,
    }
    await this.checkUser(createPurchaseOrders.userId)
    const order = await this.findCreatedStatusByUserId(
      createPurchaseOrders.userId,
    )

    if (order) {
      return order
    }

    return await this.purchaseOrdersRepository.create(
      createPurchaseOrderComplete,
    )
  }

  async findAll(): Promise<PurchaseOrders[]> {
    return await this.purchaseOrdersRepository.findAll()
  }

  async findAllByUserId(userId: string): Promise<PurchaseOrders[]> {
    return await this.purchaseOrdersRepository.findAllByUserId(userId)
  }

  async findById(id: string): Promise<PurchaseOrders> {
    const order = await this.purchaseOrdersRepository.findById(id)
    if (!order) {
      throw new AppError(`Order with ID ${id} not found`)
    }
    return order
  }

  async payPurchaseOrder(idPurchaseOrder: string): Promise<PurchaseOrders> {
    const updatePurchaseOrder: UpdatePurchaseOrder = {
      paid: true,
    }
    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  async sendPurchaseOrder(
    idPurchaseOrder: string,
    createPurchaseOrdersItems: Omit<CreatePurchaseOrderItem, 'orderId'>[],
  ): Promise<PurchaseOrders> {
    await Promise.all(
      createPurchaseOrdersItems.map((item) => {
        return this.createPurchaseOrderItem({
          ...item,
          purchaseOrderId: idPurchaseOrder,
        })
      }),
    )
    const updatePurchaseOrder: UpdatePurchaseOrder = {
      status: OrdersStatus.RUNNING,
    }
    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  async deliveredPurchaseOrder(
    idPurchaseOrder: string,
  ): Promise<PurchaseOrders> {
    const order = await this.findById(idPurchaseOrder)

    if (order.status === OrdersStatus.FAILURE) {
      throw new AppError(`Order with ID ${idPurchaseOrder} is failed`)
    }

    const updatePurchaseOrder: UpdatePurchaseOrder = {
      status: OrdersStatus.DONE,
    }
    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  async failureSendPurchaseOrder(
    idPurchaseOrder: string,
  ): Promise<PurchaseOrders> {
    const updatePurchaseOrder: UpdatePurchaseOrder = {
      status: OrdersStatus.FAILURE,
    }
    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  private async checkUser(userId: string): Promise<void> {
    const foundUser = await this.useRepository.findById(userId)
    if (!foundUser) {
      throw new AppError(`User with ID ${userId} not found`)
    }
  }

  private async findCreatedStatusByUserId(
    userId: string,
  ): Promise<PurchaseOrders | null> {
    const status: OrdersStatus = OrdersStatus.CREATED
    return await this.purchaseOrdersRepository.findCreatedStatusByUserId(
      userId,
      status,
    )
  }

  private async createPurchaseOrderItem(
    createPurchaseOrderItem: CreatePurchaseOrderItem,
  ): Promise<PurchaseOrderItem> {
    const order = await this.findById(createPurchaseOrderItem.purchaseOrderId)
    if (order.paid === false) {
      throw new AppError('Order not paid')
    }
    const newOrderProduct = await this.purchaseOrderItemRepository.create(
      createPurchaseOrderItem,
    )

    return newOrderProduct
  }
}
