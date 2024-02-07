import { z } from 'zod'
import { OrdersStatus } from '@prisma/client'
import { PurchaseOrderItemsInOrder } from './purchase-order-item-schema'

export const OrdersStatusSchema = z
  .enum([
    OrdersStatus.CREATED,
    OrdersStatus.RUNNING,
    OrdersStatus.DONE,
    OrdersStatus.FAILURE,
  ])
  .default(OrdersStatus.CREATED)

export const PurchaseOrdersSchema = z.object({
  id: z.string(),
  status: OrdersStatusSchema,
  paid: z.boolean(),
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  userId: z.string(),
})

export const CreatePurchaseOrdersSchema = PurchaseOrdersSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const CreatePurchaseOrderWithItemsSchema =
  CreatePurchaseOrdersSchema.omit({
    paid: true,
    status: true,
  }).extend({
    createOrderItems: PurchaseOrderItemsInOrder,
  })
