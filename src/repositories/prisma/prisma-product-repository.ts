import prisma from '@/lib/prisma'
import { ProductsRepository } from '../product-repository'
import {
  CreateProduct,
  FetchProducts,
  SearchProductsParams,
} from '@/interfaces/product-interfaces'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: CreateProduct) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async findAll(params: SearchProductsParams): Promise<FetchProducts> {
    const url = 'URL'
    const { categoryId, query, pageNumber, pageSize } = params
    const page = pageNumber || 1
    const take = pageSize || 20
    const skip = (page - 1) * take
    const options = {
      categoryId,
      OR: [
        { title: query ? { contains: query } : undefined },
        { description: query ? { contains: query } : undefined },
        { brand: query ? { contains: query } : undefined },
      ],
    }

    const productsPromise = await prisma.product.findMany({
      where: options,
      skip,
      take,
    })

    const totalPromise = await prisma.product.count({
      where: options,
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

  findOneBySku(sku: number): Promise<{
    id: string
    title: string
    description: string
    price: Decimal
    stock: number
    sku: number
    categoryId: string
    imgUrl: string | null
    createdAt: Date
    updatedAt: Date
    brand: string
  } | null> {
    throw new Error('Method not implemented.')
  }

  findOneById(id: string): Promise<{
    id: string
    title: string
    description: string
    price: Decimal
    stock: number
    sku: number
    categoryId: string
    imgUrl: string | null
    createdAt: Date
    updatedAt: Date
    brand: string
  } | null> {
    throw new Error('Method not implemented.')
  }

  update(
    id: string,
    updateProductDto: {
      title?: string | undefined
      description?: string | undefined
      price?: Decimal | undefined
      stock?: number | undefined
      sku?: number | undefined
      categoryId?: string | undefined
      imgUrl?: string | null | undefined
      brand?: string | undefined
    },
  ): Promise<{
    id: string
    title: string
    description: string
    price: Decimal
    stock: number
    sku: number
    categoryId: string
    imgUrl: string | null
    createdAt: Date
    updatedAt: Date
    brand: string
  }> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
