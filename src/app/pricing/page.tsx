import Link from 'next/link'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: 0,
    period: '',
    description: 'Get started with free content and resources',
    features: [
      'Lead magnet bundle (breathwork, Yes/No/Maybe, pleasure mapping)',
      'Free monthly live events',
      'Weekly Substack content',
    ],
    cta: 'Get Started Free',
    href: '/signup?tier=free',
    popular: false,
  },
  {
    name: 'Depth Seeker',
    price: 15,
    period: '/month',
    description: 'All courses, workshops, and downloadable resources',
    features: [
      'All mini-courses (sexual foundations, pleasure mapping & more)',
      'Workshop recording library (multi-orgasm class & more)',
      'Downloadable workbooks & templates',
      'Guided meditations & breathwork audio',
      'Journal prompts & checklists',
      'Resource library with curated links & tools',
      'New content drops monthly',
      '10% discount on 1:1 coaching',
    ],
    cta: 'Become a Depth Seeker',
    href: '/signup?tier=depth_seeker',
    popular: true,
  },
  {
    name: 'Active Learner',
    price: 75,
    period: '/month',
    description: 'Everything plus live monthly group coaching with Andrea',
    features: [
      'Everything in Depth Seeker',
      'Monthly live group coaching calls',
      'Replay access to all Q&A sessions',
      'Direct Q&A submission (1/week)',
      'Email course campaigns',
      '15% discount on 1:1 coaching',
      'Priority access to new content',
    ],
    cta: 'Become an Active Learner',
    href: '/signup?tier=active_learner',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-forest text-cream py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-4">
            Choose Your Path
          </h1>
          <p className="text-xl text-gold">
            Start free, upgrade when you&apos;re ready to go deeper
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  tier.popular ? 'ring-4 ring-burgundy md:scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-burgundy text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${tier.popular ? 'pt-12' : ''}`}>
                  <h3 className="text-2xl font-serif text-forest mb-2">
                    {tier.name}
                  </h3>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-forest">
                      ${tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-charcoal ml-2">{tier.period}</span>
                    )}
                  </div>
                  
                  <p className="text-charcoal mb-6">
                    {tier.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-sage flex-shrink-0 mr-3 mt-0.5" />
                        <span className="text-charcoal text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={tier.href}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                      tier.popular
                        ? 'bg-burgundy text-white hover:bg-burgundy/80'
                        : 'bg-sage text-white hover:bg-forest'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Program CTA */}
      <section className="py-16 px-4 bg-sage">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-forest mb-4">
            Ready for Transformation?
          </h2>
          <p className="text-lg text-charcoal mb-6">
            The Perimenopausal Pivot — a 3-month cohort program for women navigating midlife intimacy and perimenopause. Weekly meetings, workbooks, and guided practice in a supportive group.
          </p>
          <div className="text-2xl font-bold text-forest mb-6">
            $597–$797
            <span className="text-base font-normal text-charcoal ml-2">
              (member discounts apply)
            </span>
          </div>
          <a
            href="https://andreabertoli.com/coaching"
            className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors inline-block"
          >
            Learn About the Program
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-forest text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <details className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="font-semibold text-forest cursor-pointer">Can I cancel anytime?</summary>
              <p className="text-charcoal mt-3">Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.</p>
            </details>
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-forest cursor-pointer">What&apos;s included in the free tier?</summary>
              <p className="text-charcoal mt-3">Free members get access to our lead magnet bundle, monthly live events, and weekly Substack content.</p>
            </details>
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-forest cursor-pointer">How do I access the content?</summary>
              <p className="text-charcoal mt-3">Once you sign up, you&apos;ll receive a magic link to log in. All content is available through your member dashboard.</p>
            </details>
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-forest cursor-pointer">Do you offer refunds?</summary>
              <p className="text-charcoal mt-3">We offer a 7-day money-back guarantee for all paid memberships. No questions asked.</p>
            </details>
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-forest cursor-pointer">Does content unlock all at once?</summary>
              <p className="text-charcoal mt-3">Content unlocks gradually — we want you to slow down and really integrate this work, not binge and forget.</p>
            </details>
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-forest cursor-pointer">Do paid members get coaching discounts?</summary>
              <p className="text-charcoal mt-3">Yes! Depth Seekers get 10% off 1:1 coaching, and Active Learners get 15% off.</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
