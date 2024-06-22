'use client'
import { Button } from '@/components/Button'
import { CATEGORIES } from '@/components/categories/Categories'
import Container from '@/components/Container'
import { ProductHead } from '@/components/product/ProductHead'
import { ProductInfo } from '@/components/product/ProductInfo'
import { Product, User } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

interface ProductClientProps {
  product: Product & {
    user: User
  }
  currentUser?: User | null
}

export const ProductClient: React.FC<ProductClientProps> = ({
  product,
  currentUser,
}) => {
  const router = useRouter()

  const category = CATEGORIES.find((items) => items.path === product.category)

  const KakaoMap = dynamic(
    () => import('@/components/KakaoMap').then((mod) => mod.default),
    {
      ssr: false,
    }
  )

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10'>
            <ProductInfo
              user={product.user}
              category={category}
              createdAt={product.createdAt}
              description={product.description}
            />
          </div>
          <div>
            <KakaoMap
              detailPage
              latitude={product.latitude}
              longitude={product.longitude}
            />
          </div>
        </div>
        {currentUser?.id !== product?.user?.id && (
          <div>
            <Button
              onClick={() =>
                router.push(
                  `/chat/${product?.user?.id}&name=${product?.user?.name}&image=${product?.user?.image}`
                )
              }
              label='이 사람이랑 채팅하기'
            />
          </div>
        )}
      </div>
    </Container>
  )
}
