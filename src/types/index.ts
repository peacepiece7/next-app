import { User } from '@prisma/client'

export type TUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
