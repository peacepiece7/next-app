'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HeartButton } from './HeartButton'
import { fromNow } from '@/helpers/dayjs'
import { User, Product } from '@prisma/client'

interface ProductCardProps {
  product: Product
  currentUser: User
}

const ProductCard: React.FC<ProductCardProps> = ({ product, currentUser }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col w-full gap-2'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          <Image
            fill
            sizes='auto'
            className='object-cover w-full h-full transition group-hover:scale-110'
            src={product.imageSrc}
            alt='Listing'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton productId={product.id} currentUser={currentUser} />
          </div>
          <div className='text-lg font-semibold'>{product.title}</div>
          <div className='font-light text-neutral-500'>{product.category}</div>
          <div className='flex flex-row items-center justify-between gap-1'>
            <div className='font-semibold'>
              {product.price}
              <span className='font-light'>원</span>
            </div>
            <div>{fromNow(product.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductCard }
