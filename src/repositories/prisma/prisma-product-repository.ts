import prisma from '@/lib/prisma'
import { ProductsRepository } from '../product-repository'
import {
  CreateProduct,
  FetchProducts,
  SearchProductsParams,
  UpdateProduct,
} from '@/interfaces/product-interfaces'
import { Prisma } from '@prisma/client'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: CreateProduct) {
    const product = await prisma.product.create({
      data: { ...data, price: new Prisma.Decimal(data.price) },
    })

    return product
  }

  async findBySku(sku: number) {
    return await prisma.product.findUnique({ where: { sku } })
  }

  async findById(id: string) {
    return await prisma.product.findUnique({ where: { id } })
  }

  async findAll(params: SearchProductsParams): Promise<FetchProducts> {
    const { categoryId, query, pageNumber: page, pageSize: take } = params
    const skip = (page! - 1) * take!
    const where: any = {}
    if (categoryId !== undefined) {
      where.categoryId = categoryId
    }

    if (query !== undefined) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
      ]
    }
    const productsPromise = await prisma.product.findMany({
      where,
      skip,
      take,
    })

    const totalPromise = await prisma.product.count({
      where,
    })

    const [products, total] = await Promise.all([productsPromise, totalPromise])

    return {
      count: total,
      data: products,
    }
  }

  async update(id: string, updateProduct: UpdateProduct) {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...updateProduct,
        price: updateProduct.price
          ? new Prisma.Decimal(updateProduct.price)
          : undefined,
      },
    })

    return updatedProduct
  }

  async delete(id: string) {
    await prisma.product.delete({ where: { id } })
  }
}
