'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier') || 'free'

  const tierInfo: Record<string, { name: string; price: string; description: string }> = {
    free: {
      name: 'Free',
      price: '$0',
      description: 'Get started with free content and lead magnet',
    },
    depth_seeker: {
      name: 'Depth Seeker',
      price: '$15/month',
      description: 'All mini-courses, workshops, and resources',
    },
    active_learner: {
      name: 'Active Learner',
      price: '$75/month',
      description: 'Everything plus live monthly coaching calls',
    },
  }

  const selectedTier = tierInfo[tier] || tierInfo.free

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      if (tier === 'free') {
        // Free tier - just create account and send magic link
        const res = await fetch('/api/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await res.json()

        if (data.success) {
          setMessage('Check your email to complete your registration!')
        } else {
          setMessage(data.error || 'Something went wrong')
        }
      } else {
        // Paid tier - redirect to checkout (Stripe stub for now)
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tierId: tier, email }),
        })

        const data = await res.json()

        if (data.url) {
          // In production, redirect to Stripe Checkout
          // window.location.href = data.url
          
          // For now, show mock message
          setMessage(`Stripe integration pending. Mock checkout for ${selectedTier.name}. In production, this would redirect to Stripe.`)
          console.log('Mock checkout URL:', data.url)
        } else {
          setMessage(data.error || 'Failed to create checkout')
        }
      }
    } catch (err) {
      setMessage('Failed to process signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-forest mb-2">
              Join {selectedTier.name}
            </h1>
            <p className="text-charcoal">
              {selectedTier.description}
            </p>
            {tier !== 'free' && (
              <div className="mt-4 text-2xl font-bold text-burgundy">
                {selectedTier.price}
              </div>
            )}
          </div>

          {message && (
            <div className="bg-sage/20 border border-sage text-forest px-4 py-3 rounded-lg mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-forest mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sage rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-burgundy text-white py-3 rounded-lg font-semibold hover:bg-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? 'Processing...'
                : tier === 'free'
                ? 'Create Free Account'
                : 'Continue to Checkout'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sage hover:text-forest transition-colors text-sm"
            >
              ← Choose a different plan
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-charcoal mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-burgundy hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}