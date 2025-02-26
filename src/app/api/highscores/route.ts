import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const highScores = await prisma.highScore.findMany({
      orderBy: {
        score: 'desc'
      },
      take: 10
    })
    return NextResponse.json(highScores)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch high scores' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, score } = await request.json()
    const highScore = await prisma.highScore.create({
      data: {
        name,
        score
      }
    })
    return NextResponse.json(highScore)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
  }
}