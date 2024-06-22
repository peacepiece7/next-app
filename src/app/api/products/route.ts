import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  // const predicate = await withSession()
  // predicate(async (user) => {

  // })
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { title, description, imageSrc, category, latitude, longitude, price } =
    body

  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      NextResponse.error()
    }
  })

  const product = await prisma.product.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id,
    },
  })

  return NextResponse.json(product)
}

// 이거 타입 어디서 가져오지...??
// 타입 가져오면 로직 수정하자
async function withSession() {
  const currentUser = await getCurrentUser()
  return function (callback: (user: NonNullable<typeof currentUser>) => void) {
    if (!currentUser) {
      return NextResponse.error()
    }
    callback(currentUser)
  }
}
