'use client'
import { Chat } from '@/components/chat/Chat'
import { Contacts } from '@/components/chat/Contacts'
import { TUserWithChat } from '@/types'
import { User } from '@prisma/client'
import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'

interface IChatClientProps {
  currentUser?: User | null
}

export const ChatClient = ({ currentUser }: IChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  })
  const [layout, setLayout] = useState(false)

  const fetcher = (url: string) => axios.get(url).then((res) => res.data)

  const {
    data: users,
    error,
    isLoading,
  } = useSWR('/api/chat', fetcher, {
    refreshInterval: 5000,
  })

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[3--px_1fr] '>
        <section className={`md:flex ${layout && 'hidden'} `}>
          {/* Contact Component */}
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>
        <section className={`md:flex ${!layout && 'hidden'}`}>
          {/* Chat  Component */}
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  )
}
