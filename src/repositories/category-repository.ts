import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'

export abstract class CategoryRepository {
  abstract create(category: CreateCategory): Promise<Category>

  abstract findAll(): Promise<Category[]>

  abstract findById(id: string): Promise<Category | null>

  abstract update(id: string, category: UpdateCategory): Promise<Category>

  abstract delete(id: string): Promise<void>
}
