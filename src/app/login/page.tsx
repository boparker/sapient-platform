'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('Check your email for a magic link to log in!')
        // In development, show the link
        if (data.debug?.url) {
          console.log('Magic link:', data.debug.url)
        }
      } else {
        setMessage(data.error || 'Something went wrong')
      }
    } catch (err) {
      setMessage('Failed to send magic link')
    } finally {
      setIsLoading(false)
    }
  }

  const errorMessages: Record<string, string> = {
    missing_token: 'Login link is missing',
    invalid_token: 'Invalid login link',
    token_used: 'This login link has already been used',
    token_expired: 'This login link has expired',
    verification_failed: 'Failed to verify login',
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-forest mb-2">
              Welcome Back
            </h1>
            <p className="text-charcoal">
              Enter your email to receive a magic link
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errorMessages[error] || 'An error occurred'}
            </div>
          )}

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
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sage hover:text-forest transition-colors text-sm"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-charcoal mt-6">
          Don't have an account?{' '}
          <Link href="/pricing" className="text-burgundy hover:underline">
            Get started
          </Link>
        </p>
      </div>
    </main>
  )
}