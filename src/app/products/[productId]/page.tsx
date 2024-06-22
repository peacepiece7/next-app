import getCurrentUser from '@/actions/getCurrentUser'
import getProductById from '@/actions/getProductById'
import { EmptyState } from '@/components/EmptyState'
import { ProductClient } from './ProductClient'

interface IParams {
  productId?: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const product = await getProductById(params)
  const currentUser = await getCurrentUser()

  if (!product) {
    return <EmptyState />
  }

  return <ProductClient product={product} currentUser={currentUser} />
}
