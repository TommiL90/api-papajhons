import { CategorySchema, CreateCategorySchema } from '@/schemas/category-schema'
import { z } from 'zod'

export type Category = z.infer<typeof CategorySchema>
export type CreateCategory = z.infer<typeof CreateCategorySchema>
export type UpdateCategory = Omit<Category, 'createdAt' | 'updatedAt'>
