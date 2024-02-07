import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string().max(30),
  description: z.string(),
  price: z
    .instanceof(Prisma.Decimal)
    .refine((price) => price.gte('0.01') && price.lt('9999999999.99')),
  stock: z.number(),
  sku: z.number(),
  categoryId: z.string(),
  imgUrl: z.string().nullable(),
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),

  brand: z.string(),
})

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateProductSchema = CreateProductSchema.partial()

export const ProducstSearchParamsSchema = z.object({
  pageNumber: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  categoryId: z.string().uuid().optional(),
  query: z.string().optional(),
})

export const FetchProductsSchema = {
  nextPage: z.string().nullable(),
  prevPage: z.string().nullable(),
  pages: z.number(),
  count: z.number(),
  data: ProductSchema.array(),
}
