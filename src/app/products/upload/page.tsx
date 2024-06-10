'use client'
import { Button } from '@/components/Button'
import Container from '@/components/Container'
import { Input } from '@/components/Input'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longtitude: 126.79581,
      imageSrc: '',
      price: 0,
    },
  })

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8' onSubmit={() => {}}>
          <h1></h1>
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
          </div>
          <hr />

          <Button label='상품 생성하기' />
        </form>
      </div>
    </Container>
  )
}
