'use client'

import Link from 'next/link'

export const NavItem = ({ mobile }: { mobile?: boolean }) => {
  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 
      ${mobile ? 'flex-col bg-orange-500 h-full' : ''}`}
    >
      <li className='py-2 text-center border-b-4 cusor-pointer'>
        <Link href={'/admin'}>Admin</Link>
      </li>
      <li className='py-2 text-center border-b-4 cusor-pointer'>
        <Link href={'/user'}>User</Link>
      </li>
      <li className='py-2 text-center border-b-4 cusor-pointer'>
        <Link href={'/signIn'}>signIn</Link>
      </li>
      <li className='py-2 text-center border-b-4 cusor-pointer'>
        <Link href={'/signOut'}>signOut</Link>
      </li>
    </ul>
  )
}
