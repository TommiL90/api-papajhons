import {
  CreateProduct,
  FetchProducts,
  Product,
  UpdateProduct,
} from '@/interfaces/product-interfaces'
import { ProductsRepository } from '../product-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/errors/AppError'
import { Decimal } from '@prisma/client/runtime'

export class InMemoryProductRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: CreateProduct) {
    const createProduct: Product = {
      id: randomUUID().toString(),
      title: data.title,
      brand: data.brand,
      categoryId: data.categoryId,
      description: data.description,
      imgUrl: null,
      price: data.price,
      sku: data.sku,
      stock: data.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(createProduct)
    return Promise.resolve(createProduct) as Promise<Product>
  }

  async findById(id: string) {
    const Product = this.items.find((item) => item.id === id)

    if (!Product) {
      return null
    }

    return Product
  }

  async findBySku(sku: number) {
    const Product = this.items.find((item) => item.sku === sku)

    if (!Product) {
      return null
    }

    return Product
  }

  findAll(params: {
    pageNumber?: number | undefined
    pageSize?: number | undefined
    categoryId?: string | undefined
    query?: string | undefined
  }): Promise<FetchProducts> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, data: UpdateProduct) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) {
      throw new AppError('Product Not Found')
    }

    const item = (this.items[itemIndex] = {
      ...this.items[itemIndex],
      title: data.title || this.items[itemIndex].title,
      brand: data.brand || this.items[itemIndex].brand,
      categoryId: data.categoryId || this.items[itemIndex].categoryId,
      description: data.description || this.items[itemIndex].description,
      imgUrl: data.imgUrl || this.items[itemIndex].imgUrl,
      price: data.price || this.items[itemIndex].price,
      sku: data.sku || this.items[itemIndex].sku,
      stock: data.stock || this.items[itemIndex].stock,
    })

    return item
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
