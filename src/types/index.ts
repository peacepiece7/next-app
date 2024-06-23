import { Message, User } from '@prisma/client'

export type TUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type TUserWithChat = User & {
  conversations: TConversation[]
}

export type TConversation = {
  id: string
  message: Message[]
  users: User[]
}
