import { PRODUCTS_PER_PAGE } from '@/constants'
import prisma from '@/libs/prismadb'

export interface IProductsParams {
  latitude: number
  longitude: number
  category: string
  skip?: number
  page?: number
}

export default async function getProducts(params: IProductsParams) {
  try {
    const { latitude, longitude, category, skip, page } = params
    const query: any = {}

    if (category) query.category = category
    if (latitude)
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      }
    if (longitude)
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      }

    /**
     * https://www.prisma.io/docs/orm/prisma-client/queries/pagination
     */
    const totalItems = await prisma.product.count({ where: query })
    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      ...{ take: PRODUCTS_PER_PAGE },
      ...(skip && { skip: Number(skip) }),
    })

    return {
      data: products,
      totalItems,
    }
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}
