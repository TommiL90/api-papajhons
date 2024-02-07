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
  price: true,
}).extend({
  price: z
    .string()
    .refine(
      (price) => {
        const regex = /^\d{1,10}\.\d{2}$/
        return regex.test(price)
      },
      {
        message:
          'The price must be a valid decimal number with exactly two decimal places and maximum 10 digits before the decimal point.',
        path: ['price'],
      },
    )
    .refine(
      (price) => {
        const numericPrice = parseFloat(price)
        return (
          !isNaN(numericPrice) &&
          numericPrice >= 0.01 &&
          numericPrice < 1000000.0
        )
      },
      {
        message:
          'The price must be a valid decimal number in the range of 0.01 to 999999.99',
        path: ['price'],
      },
    ),
})

export const PurchaseOrderItemsInOrder = z.array(
  CreatePurchaseOrderItemSchema.omit({
    purchaseOrderId: true,
  }),
)
