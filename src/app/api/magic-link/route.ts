export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }
    
    // Find or create user
    let user = await getPrisma().user.findUnique({
      where: { email: email.toLowerCase() },
    })
    
    if (!user) {
      // Create user on first login attempt
      user = await getPrisma().user.create({
        data: {
          email: email.toLowerCase(),
        },
      })
    }
    
    // Generate magic link token
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 15) // 15 min expiry
    
    await getPrisma().magicLink.create({
      data: {
        token,
        email: user.email,
        expiresAt,
      },
    })
    
    // TODO: Send email with magic link
    // For now, just return the token (in production, email this)
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`
    
    // In production, send email here:
    // await sendMagicLinkEmail(user.email, magicLinkUrl)
    
    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
      // Only include these in development:
      debug: {
        token,
        url: magicLinkUrl,
      },
    })
  } catch (error) {
    console.error('Magic link error:', error)
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    )
  }
}