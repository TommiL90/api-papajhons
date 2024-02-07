import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository'
import { UsersRepository } from '@/repositories/user-repository'
import {
  CreatePurchaseOrders,
  PurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'
import { AppError } from '@/errors/AppError'
import { OrdersStatus } from '@prisma/client'
import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'

export class PurchaseOrdersService {
  constructor(
    private purchaseOrdersRepository: PurchaseOrdersRepository,
    private useRepository: UsersRepository,
  ) {}

  createPurchaseOrders = async (
    createPurchaseOrders: Omit<CreatePurchaseOrders, 'status' | 'paid'>,
  ): Promise<PurchaseOrders> => {
    const createPurchaseOrder: CreatePurchaseOrders = {
      ...createPurchaseOrders,
      paid: false,
      status: OrdersStatus.CREATED,
    }

    await this.checkUser(createPurchaseOrders.userId)

    const order = await this.findCreatedStatusByUserId(
      createPurchaseOrders.userId,
    )

    if (order) {
      return order
    }

    return await this.purchaseOrdersRepository.create(createPurchaseOrder)
  }

  findAll = async (): Promise<PurchaseOrders[]> => {
    return await this.purchaseOrdersRepository.findAll()
  }

  findAllByUserId = async (userId: string): Promise<PurchaseOrders[]> => {
    return await this.purchaseOrdersRepository.findAllByUserId(userId)
  }

  findById = async (id: string): Promise<PurchaseOrders> => {
    const order = await this.purchaseOrdersRepository.findById(id)
    if (!order) {
      throw new AppError(`Order with ID ${id} not found`)
    }
    return order
  }

  payPurchaseOrder = async (
    idPurchaseOrder: string,
  ): Promise<PurchaseOrders> => {
    const updatePurchaseOrder: UpdatePurchaseOrder = {
      paid: true,
    }

    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  sendPurchaseOrder = async (
    idPurchaseOrder: string,
    createPurchaseOrdersItems: Omit<CreatePurchaseOrderItem, 'orderId'>[],
  ): Promise<PurchaseOrders> => {
    const purchaseOrder = await this.findById(idPurchaseOrder)

    if (purchaseOrder.paid === false) {
      throw new AppError(`Order with ID ${idPurchaseOrder} is not paid`, 402)
    }

    if (
      purchaseOrder.status === OrdersStatus.DONE ||
      purchaseOrder.status === OrdersStatus.RUNNING ||
      purchaseOrder.status === OrdersStatus.FAILURE
    ) {
      throw new AppError(
        `Order with ID ${idPurchaseOrder} is unauthorized`,
        403,
      )
    }

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

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  deliveredPurchaseOrder = async (
    idPurchaseOrder: string,
  ): Promise<PurchaseOrders> => {
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

  failureSendPurchaseOrder = async (
    idPurchaseOrder: string,
  ): Promise<PurchaseOrders> => {
    const updatePurchaseOrder: UpdatePurchaseOrder = {
      status: OrdersStatus.FAILURE,
    }

    await this.findById(idPurchaseOrder)

    return await this.purchaseOrdersRepository.updateStatus(
      idPurchaseOrder,
      updatePurchaseOrder,
    )
  }

  private checkUser = async (userId: string): Promise<void> => {
    const foundUser = await this.useRepository.findById(userId)
    if (!foundUser) {
      throw new AppError(`User with ID ${userId} not found`)
    }
  }

  private findCreatedStatusByUserId = async (
    userId: string,
  ): Promise<PurchaseOrders | null> => {
    const status: OrdersStatus = OrdersStatus.CREATED
    return await this.purchaseOrdersRepository.findCreatedStatusByUserId(
      userId,
      status,
    )
  }

  // private createPurchaseOrderItem = async (
  //   createPurchaseOrderItem: CreatePurchaseOrderItem,
  // ): Promise<PurchaseOrderItem> => {
  //   const order = await this.findById(createPurchaseOrderItem.purchaseOrderId)
  //   if (order.paid === false) {
  //     throw new AppError('Order not paid')
  //   }

  //   const newOrderProduct = await this.purchaseOrderItemRepository.create(
  //     createPurchaseOrderItem,
  //   )

  //   return newOrderProduct
  // }
}
