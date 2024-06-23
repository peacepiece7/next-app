import axios from 'axios'

export const uploadImage = async (image: File) => {
  const url = 'https://api.cloudinary.com/v1_1/dpca4811o/image/upload'
  const formData = new FormData()
  formData.append('file', image)
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  )

  const response = await axios(url, {
    method: 'POST',
    data: formData,
  })

  return response.data.url
}
