'use client'

import { useState } from 'react'
import { NavItem } from './NavItem'

export const NavBar = () => {
  const [menu, setMenu] = useState(false)

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav className='relative z-10 w-full text-white bg-orange-500'>
      <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
        {/* logo */}
        <a href='/' className='flex items-center text-2xl font-bold'>
          Logo
        </a>

        {/* menu */}
        <div>
          {menu === false ? (
            <button onClick={handleMenu}>+</button>
          ) : (
            <button onClick={handleMenu}>-</button>
          )}
        </div>

        {/* nav-items large screen */}
        <div className='hidden sm:block'>
          <NavItem />
        </div>

        {/* nav-items mobile */}
        <div className={'block sm:hidden'}>
          {menu === false ? null : <NavItem />}
        </div>
      </div>
    </nav>
  )
}
