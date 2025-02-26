import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/messages - List all messages
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        likes: true
      }
    })
    return NextResponse.json(messages || [])
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}

// POST /api/messages - Create a new message
export async function POST(request: Request) {
  try {
    const { content, author } = await request.json()

    if (!content || !author) {
      return NextResponse.json(
        { error: 'Content and author are required' },
        { status: 400 }
      )
    }

    const message = await prisma.message.create({
      data: {
        content,
        author
      }
    })

    return NextResponse.json(message, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}