import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'

export abstract class CategoryRepository {
  abstract create(category: CreateCategory): Promise<Category>

  abstract update(id: string, updateCategory: UpdateCategory): Promise<Category>

  abstract findById(id: string): Promise<Category | null>

  abstract findAll(): Promise<Category[]>

  abstract delete(id: string): Promise<void>
}
