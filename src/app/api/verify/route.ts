export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { signIn } from 'next-auth/react'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', req.url))
  }
  
  try {
    // Verify token
    const magicLink = await getPrisma().magicLink.findUnique({
      where: { token },
      include: { user: true },
    })
    
    if (!magicLink) {
      return NextResponse.redirect(new URL('/login?error=invalid_token', req.url))
    }
    
    if (magicLink.usedAt) {
      return NextResponse.redirect(new URL('/login?error=token_used', req.url))
    }
    
    if (magicLink.expiresAt < new Date()) {
      return NextResponse.redirect(new URL('/login?error=token_expired', req.url))
    }
    
    // Mark token as used
    await getPrisma().magicLink.update({
      where: { id: magicLink.id },
      data: { usedAt: new Date() },
    })
    
    // Redirect to dashboard with session
    // In production, this would set a session cookie
    return NextResponse.redirect(new URL('/dashboard', req.url))
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/login?error=verification_failed', req.url))
  }
}