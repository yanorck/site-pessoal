import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const messageId = parseInt(params.messageId)

    // Check if message exists
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    })

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        ip,
        messageId
      }
    })

    if (existingLike) {
      // Remove like if it exists
      await prisma.like.delete({
        where: { id: existingLike.id }
      })
      return NextResponse.json({ action: 'unliked' })
    }

    // Create new like
    const like = await prisma.like.create({
      data: {
        ip,
        messageId,
      },
    })

    return NextResponse.json({ action: 'liked', like })
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 })
  }
}