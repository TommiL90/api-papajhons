import {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@/interfaces/product-interfaces'
import { ProductsRepository } from '../product-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/errors/AppError'

export class InMemoryProductRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: CreateProduct) {
    const createProduct: Product = {
      id: randomUUID().toString(),
      name: data.name,
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

  async findOneById(id: string) {
    const Product = this.items.find((item) => item.id === id)

    if (!Product) {
      return null
    }

    return Product
  }

  async findOneBySku(sku: number) {
    const Product = this.items.find((item) => item.sku === sku)

    if (!Product) {
      return null
    }

    return Product
  }

  async findAll() {
    // console.log(this.items, 'aquiiiiiiii')
    return Promise.resolve(this.items) as Promise<Product[]>
  }

  async update(id: string, data: UpdateProduct) {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) {
      throw new AppError('Product Not Found')
    }

    const item = (this.items[itemIndex] = {
      ...this.items[itemIndex],
      name: data.name || this.items[itemIndex].name,
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