import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'

export abstract class CategoryRepository {
  abstract create(category: CreateCategory): Promise<Category>

  abstract findAll(): Promise<Category[]>

  abstract findOne(id: string): Promise<Category | undefined>

  abstract findByName(name: string): Promise<Category | undefined>

  abstract update(id: string, category: UpdateCategory): Promise<Category>

  abstract remove(id: string): Promise<void>
}
