import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const PurchaseOrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  purchaseOrderId: z.string().uuid(),
  price: z
    .instanceof(Prisma.Decimal)
    .refine((price) => price.gte('0.01') && price.lt('9999999999.99')),
  quantity: z.number(),
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
})

export const CreatePurchaseOrderItemSchema = PurchaseOrderItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
