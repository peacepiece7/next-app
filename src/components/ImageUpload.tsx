'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const uploadPreset = 'oimvse4k'
export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='relative flex flex-col items-center justify-center gap-4 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600'
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className='relative w-32 h-32'>
                <Image
                  fill
                  src={value}
                  style={{ objectFit: 'cover' }}
                  alt='product image'
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
