import { DefaultSession } from 'next-auth'
import { TUser } from './types'
import { Prisma } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: Prisma.User
  }
}
