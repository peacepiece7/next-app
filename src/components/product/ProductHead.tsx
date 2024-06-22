import { User } from '@prisma/client'
import Heading from '../Heading'
import Image from 'next/image'
import { HeartButton } from '../HeartButton'

interface ProductHeadProps {
  title: string
  imageSrc: string
  id: string
  currentUser?: User | null
}

export const ProductHead: React.FC<ProductHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title} />

      <div className='w-fill h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          src={imageSrc}
          fill
          className='object-cover w-full'
          alt='Image'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
