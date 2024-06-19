import { DefaultSession } from 'next-auth'
import { TUser } from './types'

declare module 'next-auth' {
  interface Session {
    user: TUser
  }
}
