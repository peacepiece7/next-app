import { TUserWithChat } from '@/types'
import { Input } from '@/components/chat/Input'
import { ChatHeader } from './ChatHeader'
import { Message } from './Message'
import { useEffect, useRef } from 'react'

interface IChatProps {
  receiver: {
    receiverId: string
    receiverName: string
    receiverImage: string
  }
  currentUser: TUserWithChat
  setLayout: (layout: boolean) => void
}

export const Chat = ({ receiver, currentUser, setLayout }: IChatProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [])
  if (!receiver || !currentUser) return <div className='w-full h-full'></div>

  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  )

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='w-full'>
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.message
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>
      <div className='flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]'>
        {conversation &&
          conversation.message.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === currentUser.id}
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser.image}
                time={message.createdAt}
              />
            )
          })}
        <div ref={messageEndRef} />
      </div>
      <div className='flex items-center p-3'>
        <Input
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  )
}
