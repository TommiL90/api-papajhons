import {
  CreateProduct,
  FetchProducts,
  Product,
  SearchProductsParams,
  UpdateProduct,
} from '@/interfaces/product-interfaces'

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProduct): Promise<Product>

  abstract findAll(params: SearchProductsParams): Promise<FetchProducts>

  abstract findBySku(sku: number): Promise<Product | null>

  abstract findById(id: string): Promise<Product | null>

  abstract update(id: string, updateProductDto: UpdateProduct): Promise<Product>

  abstract delete(id: string): Promise<void>
}

// const productosExistentes = await prisma.producto.findMany({
//   where: {
//       nombre: { in: productos } // Verifica si el nombre del producto está en el array proporcionado
//   },
//   select: {
//       nombre: true // Selecciona solo el nombre del producto para comparar
//   }
// });

// const nombresProductosExistentes = productosExistentes.map(producto => producto.nombre);
// const productosNoEncontrados = productos.filter(producto => !nombresProductosExistentes.includes(producto));

// if (productosNoEncontrados.length > 0) {
//   throw new Error(`Los siguientes productos no existen: ${productosNoEncontrados.join(', ')}`);
// }
