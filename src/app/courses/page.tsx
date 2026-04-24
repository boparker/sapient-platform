import Link from 'next/link'
import { PlayCircle, Clock, Lock } from 'lucide-react'

// Course catalog — will be replaced with DB data once seeded
const collections = [
  {
    id: '1',
    slug: 'sexual-foundations',
    title: 'Sexual Foundations for Women',
    description: 'A 3-part mini-course on understanding your body, desire, and pleasure.',
    lessonCount: 3,
    totalDuration: '75 min',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    topics: ['Body Literacy', 'Desire & Arousal', 'Communication'],
  },
  {
    id: '2',
    slug: 'pleasure-mapping-workshop',
    title: 'Pleasure Mapping Workshop',
    description: 'Interactive workshop on discovering your unique pleasure landscape.',
    lessonCount: 1,
    totalDuration: '90 min',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    topics: ['Pleasure Mapping', 'Body Awareness'],
  },
  {
    id: '3',
    slug: 'multi-orgasmic-techniques',
    title: 'Multi-Orgasmic Techniques',
    description: 'Advanced techniques for experiencing multiple orgasms.',
    lessonCount: 4,
    totalDuration: '120 min',
    tierRequired: 'Active Learner',
    tierLevel: 20,
    topics: ['Breathwork & Energy', 'Solo Practice', 'Partnered Practice'],
  },
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif italic">All Courses</h1>
          <p className="text-gold mt-2">Explore our library of mini-courses and workshops</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => {
            const isLocked = collection.tierLevel >= 20

            return (
              <div
                key={collection.id}
                className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  isLocked ? 'opacity-80' : ''
                }`}
              >
                {/* Thumbnail Placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-sage/30 to-forest/20 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-12 h-12 text-forest/40 mx-auto" />
                    <p className="text-forest/40 text-xs mt-2">{collection.lessonCount} lessons · {collection.totalDuration}</p>
                  </div>
                  
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm font-semibold">{collection.tierRequired}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-serif text-forest mb-2">
                    {collection.title}
                  </h2>
                  <p className="text-charcoal text-sm mb-4">
                    {collection.description}
                  </p>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {collection.topics.map((topic) => (
                      <span key={topic} className="bg-sage/15 text-forest text-xs px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-charcoal/70 mb-4">
                    <span className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" />
                      {collection.lessonCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {collection.totalDuration}
                    </span>
                  </div>

                  {isLocked ? (
                    <Link
                      href="/pricing"
                      className="block w-full text-center bg-sage text-white py-2.5 rounded-lg font-semibold hover:bg-forest transition-colors"
                    >
                      Upgrade to Access
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${collection.id}`}
                      className="block w-full text-center bg-burgundy text-white py-2.5 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors"
                    >
                      Start Course
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-serif text-forest mb-4">More Coming Soon</h2>
          <p className="text-charcoal max-w-2xl mx-auto">
            We&apos;re constantly adding new mini-courses, workshops, and guided practices.
            Content unlocks gradually so you can integrate the work deeply.
          </p>
          <Link
            href="/pricing"
            className="inline-block mt-6 bg-sage text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest transition-colors"
          >
            See All Membership Options
          </Link>
        </div>
      </div>
    </main>
  )
}
