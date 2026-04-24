import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-24 px-4">
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
              className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/courses"
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold hover:bg-gold hover:text-forest transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Discover — Now Clickable */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-forest text-center mb-16">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/courses" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-forest mb-3 group-hover:text-burgundy transition-colors">Mini-Courses</h3>
              <p className="text-charcoal">
                Bite-sized lessons on sexual foundations, pleasure mapping, and communication.
              </p>
              <span className="text-sage text-sm font-semibold mt-4 inline-block">Explore courses →</span>
            </Link>
            
            <Link href="/courses" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-forest mb-3 group-hover:text-burgundy transition-colors">Workshop Recordings</h3>
              <p className="text-charcoal">
                Replay access to live workshops including the popular multi-orgasm class.
              </p>
              <span className="text-sage text-sm font-semibold mt-4 inline-block">Watch workshops →</span>
            </Link>
            
            <Link href="/courses" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-forest mb-3 group-hover:text-burgundy transition-colors">Guided Practices</h3>
              <p className="text-charcoal">
                Breathwork, meditations, workbooks, and templates for deeper exploration.
              </p>
              <span className="text-sage text-sm font-semibold mt-4 inline-block">View resources →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-forest text-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-forest/50 border border-gold/30 rounded-xl p-6">
              <p className="text-gold text-sm mb-4">★★★★★</p>
              <p className="text-cream/90 italic mb-4">
                &ldquo;My partner and I had a session with Andrea and it was everything we could&apos;ve hoped for—and more. Her approach to connection is lighthearted and playful, yet deeply insightful.&rdquo;
              </p>
              <p className="text-gold text-sm font-semibold">— Lauren Meyer</p>
            </div>
            <div className="bg-forest/50 border border-gold/30 rounded-xl p-6">
              <p className="text-gold text-sm mb-4">★★★★★</p>
              <p className="text-cream/90 italic mb-4">
                &ldquo;The advice you gave me has opened me up in ways I couldn&apos;t ever imagine. Thank you for asking provocative questions.&rdquo;
              </p>
              <p className="text-gold text-sm font-semibold">— David</p>
            </div>
            <div className="bg-forest/50 border border-gold/30 rounded-xl p-6">
              <p className="text-gold text-sm mb-4">★★★★★</p>
              <p className="text-cream/90 italic mb-4">
                &ldquo;I had a sincere desire to work on these things on my own, but I&apos;m finding it makes a huge difference to have a coach. Thanks for your empathy and professionalism.&rdquo;
              </p>
              <p className="text-gold text-sm font-semibold">— Daniel</p>
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
            Start free, go deeper when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors inline-block"
            >
              View Membership Options
            </Link>
            <Link
              href="/signup?tier=free"
              className="bg-white text-forest px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors inline-block border border-sage"
            >
              Try Free First
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
