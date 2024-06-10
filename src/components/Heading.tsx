'use client'
interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

export default function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
      <h1>{title}</h1>
      {subtitle && <h2 className='mt-2 text-neutral-500'>{subtitle}</h2>}
    </div>
  )
}
