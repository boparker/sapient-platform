import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-6">
            Reclaim your pleasure.<br />
            Deepen your connection.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gold">
            Holistic sex education for midlife intimacy and perimenopause
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-forest transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/about"
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold hover:bg-gold hover:text-forest transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-forest text-center mb-16">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-forest mb-3">Mini-Courses</h3>
              <p className="text-charcoal">
                Bite-sized lessons on sexual foundations, pleasure mapping, and communication.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-forest mb-3">Workshop Recordings</h3>
              <p className="text-charcoal">
                Replay access to live workshops including the popular multi-orgasm class.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-forest mb-3">Guided Practices</h3>
              <p className="text-charcoal">
                Breathwork, meditations, and downloadable workbooks for deeper exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sage py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-forest mb-6">
            Ready to feel more alive?
          </h2>
          <p className="text-xl text-charcoal mb-8">
            Join thousands of women reclaiming their pleasure and deepening their connections.
          </p>
          <Link
            href="/pricing"
            className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-forest transition-colors inline-block"
          >
            View Membership Options
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-cream py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Andrea Bertoli</h4>
            <p className="text-sm text-gold">Sex Educator & Holistic Pleasure Coach</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="hover:text-gold">Courses</Link></li>
              <li><Link href="/about" className="hover:text-gold">About</Link></li>
              <li><Link href="/pricing" className="hover:text-gold">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gold">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-gold">A Sapient Practice</p>
          </div>
        </div>
      </footer>
    </main>
  )
}