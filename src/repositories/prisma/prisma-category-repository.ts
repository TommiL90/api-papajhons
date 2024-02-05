import {
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { CategoryRepository } from '../category-repository'
import prisma from '@/lib/prisma'

export class PrismaCategoryRepository implements CategoryRepository {
  async create(data: CreateCategory) {
    const newCategory = await prisma.category.create({
      data,
    })

    return newCategory
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    })

    return category
  }

  async findAll() {
    return await prisma.category.findMany()
  }

  async update(id: string, updateCategory: UpdateCategory) {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateCategory,
    })

    return updatedCategory
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    })
  }
}
