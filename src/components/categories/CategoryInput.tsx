'use client'

import { IconType } from 'react-icons'

interface CategoryBoxPropps {
  icon: IconType
  label: string
  selected?: boolean
  path: string
  onClick: (value: string) => void
}

export const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  path,
  onClick,
}: CategoryBoxPropps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-orange-500 transition cursor-pointer ${
        selected ? 'border-orange-500' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  )
}
