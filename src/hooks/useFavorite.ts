'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

interface IUseFavorite {
  productId: string
  currentUser?: User | null
}

export const useFavorite = ({ productId, currentUser }: IUseFavorite) => {
  const router = useRouter()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritedIds || []
    return list.includes(productId)
  }, [currentUser, productId])

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) {
      toast.error('로그인이 필요합니다.')
      return
    }

    try {
      let request
      if (hasFavorited) {
        request = axios.delete(`/api/favorites/${productId}`)
      } else {
        request = axios.post(`/api/favorites/${productId}`)
      }
      await request
      router.refresh()
      toast.success('성공적으로 처리되었습니다.')
    } catch (err) {}
    toast.error('문제가 발생했습니다.')
  }

  return {
    hasFavorited,
    toggleFavorite,
  }
}
