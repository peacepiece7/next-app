'use client'

import { TUser } from '@/types'
import { User } from '@prisma/client'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

interface NavItemProps {
  mobile?: boolean
  currentUser?: TUser | null
}

export const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  const handleSignout = () => signOut()
  const handleSignin = () => signIn()

  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 
      ${mobile ? 'flex-col bg-orange-500 h-full' : ''}`}
    >
      <li>{currentUser?.name || 'Guest'}</li>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href={'/admin'}>Admin</Link>
      </li>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href={'/user'}>User</Link>
      </li>
      {currentUser ? (
        <li className='py-2 text-center border-b-4 cursor-pointer'>
          <button onClick={handleSignout}>signOut</button>
        </li>
      ) : (
        <li className='py-2 text-center border-b-4 cursor-pointer'>
          <button onClick={handleSignin}>signIn</button>
        </li>
      )}
    </ul>
  )
}
