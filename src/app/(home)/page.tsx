import getCurrentUser from '@/actions/getCurrentUser'
import getProducts, { IProductsParams } from '@/actions/getProducts'
import { Categories } from '@/components/categories/Categories'
import Container from '@/components/Container'
import { EmptyState } from '@/components/EmptyState'
import { FloatingButton } from '@/components/FloatingButton'
import { ProductCard } from '@/components/ProductCard'
import { redirect } from 'next/navigation'

interface HomeProps {
  searchParams: IProductsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const products = await getProducts(searchParams)
  const curretUser = await getCurrentUser()

  if (!curretUser) redirect('/login')

  return (
    <Container>
      {/* categories */}
      <Categories />
      {products.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className='grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {products.data.map((product) => (
              <ProductCard
                currentUser={curretUser}
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Pagination */}

          {/* FloatingButton */}
          <FloatingButton href='/products/upload'>+</FloatingButton>
        </>
      )}
    </Container>
  )
}

export default Home
