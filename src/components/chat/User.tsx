'use client'
import { fromNow } from '@/helpers/dayjs'
import { TUserWithChat } from '@/types'
import { Avatar } from '../Avatar'

interface IUserProps {
  user: TUserWithChat
  currentUserId: string
}

export const User = ({ user, currentUserId }: IUserProps) => {
  const messagesWithCurrentUser = user.conversations.find((conversation) => {
    return conversation.users.find((user) => user.id === currentUserId)
  })

  const latestMessage = messagesWithCurrentUser?.message?.slice(-1)[0]

  return (
    <div className='grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border--b-[1px] hover:cursor-pointer hover:bg-orange-500'>
      <div className='w-10 h-10 overflow-hidden bg-white rounded-full'>
        {/* <img src={user.image || ''} alt='user profile' /> */}
        <Avatar src={user.image} />
      </div>
      <div>
        <h3 className='overflow-hidden text-base font-medium'>{user.name}</h3>
        {latestMessage && (
          <p className='overflow-hidden text-base font-medium'>
            {latestMessage.text}
          </p>
        )}
        {latestMessage && latestMessage.image && (
          <p className='text-xs font-medium text-gray-600'>[이미지]</p>
        )}
      </div>
      <div className='flex justify-end text-xs text-gray-500'>
        {latestMessage && <p>{fromNow(latestMessage?.createdAt)}</p>}
      </div>
    </div>
  )
}
