import axios from 'axios'
import { useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'
import useSWRMutation from 'swr/mutation'
import { uploadImage } from '@/helpers/uploadImage'
import { previewImage } from '@/helpers/previewImage'

interface TInputProps {
  receiverId: string
  currentUserId: string
}
interface SendRequestArg {
  text: string
  image: string
  receiverId: string
  senderId: string
}

async function sendRequest(url: string, { arg }: { arg: SendRequestArg }) {
  return axios(url, {
    method: 'POST',
    data: JSON.stringify(arg),
  }).then((res) => res.data)
}

export const Input = ({ receiverId, currentUserId }: TInputProps) => {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  const chooseImage = () => {
    imageRef.current?.click()
  }

  const removeImage = () => {
    setImagePreview(null)
    setImage(null)
  }

  const [message, setMessage] = useState('')
  const { trigger, isMutating } = useSWRMutation('/api/chat', sendRequest)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const imageUrl = image ? await uploadImage(image as File) : null
    if (message || imageUrl) {
      trigger({
        text: message,
        image: imageUrl,
        receiverId,
        senderId: currentUserId,
      })
    }
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-grey-300 rounded-md shadow-sm'
    >
      {imagePreview && (
        <div className='absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md'>
          <img src={imagePreview} alt='' />
          <span
            className='absolute flex items-center justify-center p-2 text-xl text-white bg-gray-900 cursor-pointer top-[0.4rem] rounded-full opacity-60 hover:opacity-100'
            onClick={removeImage}
          >
            <CgClose />
          </span>
        </div>
      )}
      <input
        className='w-full text-base outline-none'
        type='text'
        placeholder='메시지를 입력하세요'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className='hidden'
        type='file'
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
        ref={imageRef}
        accept='image/*'
        multiple={false}
      />
      <div
        onClick={chooseImage}
        className='text-2xl text-gray-200 cursor-pointer'
      >
        <IoImageOutline />
      </div>
      <button
        type='submit'
        className='flex items-center justify-center p-2 text-xl text-gray-900 bg-orange-500
      rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60'
      >
        <RiSendPlaneLine />
      </button>
    </form>
  )
}
