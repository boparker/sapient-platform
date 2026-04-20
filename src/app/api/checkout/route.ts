export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Stripe will be imported here when keys are available
// import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { tierId, email } = await req.json()

    if (!tierId || !email) {
      return NextResponse.json(
        { error: 'Tier ID and email required' },
        { status: 400 }
      )
    }

    // Get tier details
    const tier = await prisma.tier.findUnique({
      where: { id: tierId },
      include: { tenant: true },
    })

    if (!tier) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // TODO: Implement Stripe Checkout when keys are available
    // For now, return mock checkout URL
    
    // When Stripe is ready, uncomment this:
    /*
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: tier.stripePriceId, quantity: 1 }],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        tierId: tier.id,
        tenantId: tier.tenantId,
      },
    })
    
    return NextResponse.json({ url: session.url })
    */

    // Mock response for now
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signup?tier=${tier.slug}&email=${encodeURIComponent(email)}&mock=true`,
      message: 'Stripe integration pending - using mock checkout',
      tier: {
        name: tier.name,
        price: tier.price,
      },
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}