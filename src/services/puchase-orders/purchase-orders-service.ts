import { PurchaseOrdersRepository } from '@/repositories/purchase-orders-repository'
import { UsersRepository } from '@/repositories/user-repository'
import {
  CreatePurchaseOrders,
  PurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'
import { AppError } from '@/errors/AppError'

export class PurchaseOrdersService {
  constructor(
    private purchaseOrdersRepository: PurchaseOrdersRepository,
    private useRepository: UsersRepository,
  ) {}

  async createPurchaseOrders(
    createPurchaseOrders: CreatePurchaseOrders,
  ): Promise<PurchaseOrders> {
    await this.checkUser(createPurchaseOrders.userId)

    return await this.purchaseOrdersRepository.create(createPurchaseOrders)
  }

  async findAll(): Promise<PurchaseOrders[]> {
    return await this.purchaseOrdersRepository.findAll()
  }

  async findById(id: string): Promise<PurchaseOrders> {
    const order = await this.purchaseOrdersRepository.findById(id)
    if (!order) {
      throw new AppError(`Order with ID ${id} not found`)
    }
    return order
  }

  async update(
    id: string,
    updatePurchaseOrder: UpdatePurchaseOrder,
  ): Promise<PurchaseOrders> {
    await this.findById(id)
    return await this.purchaseOrdersRepository.update(id, updatePurchaseOrder)
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    return await this.purchaseOrdersRepository.delete(id)
  }

  async checkUser(userId: string): Promise<void> {
    const foundUser = await this.useRepository.findById(userId)
    if (!foundUser) {
      throw new AppError(`User with ID ${userId} not found`)
    }
  }
}
