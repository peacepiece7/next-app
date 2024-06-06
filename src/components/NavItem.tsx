'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback } from 'react'

export const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession()
  // const router = useRouter()
  const handleSignout = () => signOut()
  const handleSignin = () => signIn()

  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 
      ${mobile ? 'flex-col bg-orange-500 h-full' : ''}`}
    >
      <li>{session ? session?.user?.name : 'Guest'}</li>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href={'/admin'}>Admin</Link>
      </li>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href={'/user'}>User</Link>
      </li>
      {session?.user ? (
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
