import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function GET(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const user = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          message: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
          users: true,
        },
      },
    },
  })

  return NextResponse.json(user)
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: body.senderId,
            },
          },
        },
        {
          users: {
            some: {
              id: body.receiverId,
            },
          },
        },
      ],
    },
  })

  if (conversation) {
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id,
        },
      })

      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.json(error)
    }
  } else {
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [{ id: body.senderId }, { id: body.receiverId }],
        },
      },
    })

    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          conversationId: newConversation.id,
          senderId: body.senderId,
          receiverId: body.receiverId,
        },
      })
      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
