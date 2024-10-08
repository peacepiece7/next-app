'use client'

import { fromNow } from '@/helpers/dayjs'
import { Avatar } from '../Avatar'

interface IMessage {
  isSender: boolean
  messageText: string | null
  messageImage: string | null
  receiverName: string | null
  receiverImage: string | null
  senderImage: string | null
  time: Date
}

export const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: IMessage) => {
  return (
    <div
      className={`grid w-full grid-cols-[40px_1fr] gap-3 mx-auto`}
      style={{ direction: `${isSender ? 'rtl' : 'ltr'}` }}
    >
      <div className='w-10 h-10 mt-2 overflow-hidden bg-gray-300 rounded-full'>
        <Avatar src={senderImage && isSender ? senderImage : receiverImage} />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div className='flex items-center gap-2 mb-2 text-sm'>
          <span className='font-medium'>{isSender ? 'You' : receiverName}</span>
          <span className='text-xs text-gray-500 opacity-80'>
            {fromNow(time)}
          </span>
        </div>
        {messageText && (
          <div
            className={`p-2 break-all text-white rounded-lg ${
              isSender
                ? 'bg-orange-500 rounded-tr-none'
                : 'bg-gray-400 rounded-tl-none'
            }`}
          >
            <p>{messageText}</p>
          </div>
        )}
        {messageImage && (
          <div className='w-52 h-52 mt-2 overflow-hidden'>
            <img src={messageImage} alt='' />
          </div>
        )}
      </div>
    </div>
  )
}
