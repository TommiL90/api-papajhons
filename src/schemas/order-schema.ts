import { z } from 'zod'
import { OrdersStatus } from '@prisma/client'

export const OrdersStatusSchema = z
  .enum([
    OrdersStatus.CREATED,
    OrdersStatus.RUNNING,
    OrdersStatus.DONE,
    OrdersStatus.FAILURE,
  ])
  .default(OrdersStatus.CREATED)

export const OrderSchema = z.object({
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

  totalPrice: z.number(),
  userId: z.string(),
})
