import {
  CreateProduct,
  SearchProductsParams,
} from '@/interfaces/product-interfaces'
import { redis } from '@/lib/redis'
import { makeCreateProduct } from '@/services/factories/make-create-product'
import { makeDeleteProduct } from '@/services/factories/make-delete-product'
import { makeListProduct } from '@/services/factories/make-list-products'
import { makeRetrieveProduct } from '@/services/factories/make-retrieve-product'
import { makeUpdateProduct } from '@/services/factories/make-update-product'
import { Request, Response } from 'express'

export class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const data: CreateProduct = req.body

    const createProduct = makeCreateProduct()

    const newProduct = await createProduct(data)

    return res.status(201).json(newProduct)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params

    const listProducts = makeRetrieveProduct()

    const products = await listProducts(id)

    return res.status(200).json(products)
  }

  findAll = async (req: Request, res: Response) => {
    const body: SearchProductsParams = req.query

    const productsFromCache = await redis.get(
      `products-${body.query ? body.query : ''}-${
        body.categoryId ? body.categoryId : ''
      }-${body.pageNumber ? body.pageNumber : ''}-${
        body.pageSize ? body.pageSize : ''
      }`,
    )

    if (productsFromCache) {
      return res.status(200).json(JSON.parse(productsFromCache))
    }

    const makeListProducts = makeListProduct()

    const products = await makeListProducts(body)

    await redis.set(
      `products-${body.query ? body.query : ''}-${
        body.categoryId ? body.categoryId : ''
      }-${body.pageNumber ? body.pageNumber : ''}-${
        body.pageSize ? body.pageSize : ''
      }`,
      JSON.stringify(products),
      'EX',
      600,
    )

    return res.status(200).json(products)
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateProduct = makeUpdateProduct()

    const updatedProduct = await updateProduct(id, req.body)

    return res.status(200).json(updatedProduct)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleteProduct = makeDeleteProduct()

    await deleteProduct(id)

    return res.status(200).send()
  }
}
