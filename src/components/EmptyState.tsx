'use client'
import Heading from './Heading'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset,
}) => {
  const router = useRouter()

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading center title={title || ''} subtitle={subtitle || ''} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='모든 필터 제거'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export { EmptyState }
