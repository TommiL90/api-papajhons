import prisma from '@/lib/prisma'
import { ProductsRepository } from '../product-repository'
import {
  CreateProduct,
  FetchProducts,
  SearchProductsParams,
  UpdateProduct,
} from '@/interfaces/product-interfaces'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: CreateProduct) {
    const product = await prisma.product.create({
      data,
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
    const url = 'URL'
    const { categoryId, query, pageNumber, pageSize } = params
    const page = pageNumber || 1
    const take = pageSize || 20
    const skip = (page - 1) * take
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

    const pages: number = Math.ceil(total / take)

    const prevPage: string | null =
      page === 1 ? null : `${url}?pageNumber=${page! - 1}&pageSize=${take}`
    const nextPage: string | null =
      page! + 1 > pages
        ? null
        : `${url}?pageNumber=${page! + 1}&pageSize=${take}`

    return {
      nextPage,
      prevPage,
      items: total,
      pages,
      data: products,
    }
  }

  async update(id: string, updateProduct: UpdateProduct) {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateProduct,
    })

    return updatedProduct
  }

  async delete(id: string) {
    await prisma.product.delete({ where: { id } })
  }
}
