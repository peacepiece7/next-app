import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  productId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    return NextResponse.error()
  }

  let favoritedIds = [...(currentUser.favoritedIds || [])]
  favoritedIds.push(productId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritedIds,
    },
  })

  return NextResponse.json(user)
}
