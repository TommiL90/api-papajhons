import { AppError } from '@/errors/AppError'
import {
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { CategoryRepository } from '@/repositories/category-repository'

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  create = async (createCategory: CreateCategory) => {
    const newCategory = await this.categoryRepository.create(createCategory)
    return newCategory
  }

  findAll = async () => {
    return await this.categoryRepository.findAll()
  }

  findById = async (id: string) => {
    const retrieveCategory = await this.categoryRepository.findById(id)

    if (!retrieveCategory) {
      throw new AppError('Category not Found', 400)
    }

    return retrieveCategory
  }

  update = async (id: string, updateCategory: UpdateCategory) => {
    await this.findById(id)

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategory,
    )

    return updatedCategory
  }

  delete = async (id: string) => {
    await this.findById(id)
    await this.categoryRepository.delete(id)
  }
}
