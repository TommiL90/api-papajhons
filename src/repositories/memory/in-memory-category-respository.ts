import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { CategoryRepository } from '../category-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/errors/AppError'

export class InMemoryCategoryRepository implements CategoryRepository {
  public items: Category[] = []

  async create(data: CreateCategory) {
    const createCategory: Category = {
      id: randomUUID().toString(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(createCategory)
    return Promise.resolve(createCategory) as Promise<Category>
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async findAll() {
    return this.items
  }

  async update(id: string, data: UpdateCategory) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) {
      throw new AppError('Product Not Found')
    }

    const item = (this.items[itemIndex] = {
      ...this.items[itemIndex],
      name: data.name ? data.name : this.items[itemIndex].name,
    })

    return item
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
