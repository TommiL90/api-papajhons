import { AppError } from '@/errors/AppError'
import {
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { CategoryRepository } from '@/repositories/category-repository'

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategory: CreateCategory) {
    const newCategory = await this.categoryRepository.create(createCategory)

    return newCategory
  }

  async findAll() {
    return await this.categoryRepository.findAll()
  }

  async findOne(id: string) {
    const retrieveCategory = await this.categoryRepository.findById(id)

    return retrieveCategory
  }

  async update(id: string, updateCategory: UpdateCategory) {
    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategory,
    )

    return updatedCategory
  }

  async remove(id: string) {
    const deleteCategory = await this.categoryRepository.findById(id)
    if (!deleteCategory) {
      throw new AppError('Category not found')
    }
    await this.categoryRepository.delete(id)
  }
}
