'use client'
import { Button } from '@/components/Button'
import { categories } from '@/components/categories/Categories'
import { CategoryInput } from '@/components/categories/CategoryInput'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import { Input } from '@/components/Input'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false })

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 0,
    },
  })

  const imageSrc = watch('imageSrc')
  const category = watch('category')
  const latitude = watch('latitude')
  const longitude = watch('longitude')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value)
  }

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8' onSubmit={() => {}}>
          <Heading title='Product Upload' subtitle='upload your product' />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />

          <hr />
          <Input
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='price'
            label='Price'
            type='number'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <div className='grid gird-cols-1 md:gird-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {/* Category */}
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          <KakaoMap
            latitude={latitude}
            longitude={longitude}
            setCustomValue={setCustomValue}
          />
          <Button label='상품 생성하기' />
        </form>
      </div>
    </Container>
  )
}
