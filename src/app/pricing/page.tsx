import Link from 'next/link'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with our free content and lead magnet',
    features: [
      'Lead magnet bundle',
      'Free monthly live events',
      'Weekly Substack content',
      'Community access',
    ],
    cta: 'Get Started',
    href: '/signup?tier=free',
    popular: false,
  },
  {
    name: 'Depth Seeker',
    price: 15,
    description: 'All mini-courses, workshops, and resources',
    features: [
      'All mini-courses (10+ hours)',
      'Workshop recording library',
      'Downloadable workbooks & templates',
      'Guided meditations & breathwork',
      'Monthly new content drops',
      '10% discount on 1:1 coaching',
    ],
    cta: 'Become a Depth Seeker',
    href: '/signup?tier=depth_seeker',
    popular: true,
  },
  {
    name: 'Active Learner',
    price: 75,
    description: 'Everything plus live monthly coaching calls',
    features: [
      'Everything in Depth Seeker',
      'Monthly live group coaching calls',
      'Replay access to all Q&A sessions',
      'Direct Q&A submission (1/week)',
      'Webinar bundles (exclusive access)',
      '15% discount on 1:1 coaching',
      'Priority support & beta access',
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
            Start free, upgrade when you're ready to go deeper
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
                  tier.popular ? 'ring-4 ring-burgundy scale-105' : ''
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
                    {tier.price > 0 && (
                      <span className="text-charcoal ml-2">/month</span>
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
                        ? 'bg-burgundy text-white hover:bg-forest'
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
            Join the Perimenopausal Pivot — a 3-month cohort program for women navigating midlife intimacy and perimenopause.
          </p>
          <div className="text-2xl font-bold text-forest mb-6">
            $597–$797
            <span className="text-base font-normal text-charcoal ml-2">
              (member discounts apply)
            </span>
          </div>
          <Link
            href="/flagship-program"
            className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-forest transition-colors inline-block"
          >
            Learn About the Program
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-forest text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-forest mb-2">Can I cancel anytime?</h3>
              <p className="text-charcoal">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">What's included in the free tier?</h3>
              <p className="text-charcoal">Free members get access to our lead magnet bundle, monthly live events, and weekly Substack content.</p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">How do I access the content?</h3>
              <p className="text-charcoal">Once you sign up, you'll receive a magic link to log in. All content is available through your member dashboard.</p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">Do you offer refunds?</h3>
              <p className="text-charcoal">We offer a 7-day money-back guarantee for all paid memberships. No questions asked.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}