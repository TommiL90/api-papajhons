import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
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

export const ProductsListSchema = ProductSchema.array()
