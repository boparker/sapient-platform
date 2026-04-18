import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PlayCircle, BookOpen, Calendar, Award } from 'lucide-react'

// Mock data - will be replaced with real data from database
const mockUser = {
  name: 'Andrea',
  tier: 'Depth Seeker',
  tierLevel: 10,
}

const mockStats = {
  totalContent: 24,
  completed: 3,
  inProgress: 2,
  hoursWatched: 4.5,
}

const mockContinueWatching = [
  {
    id: '1',
    title: 'Lesson 1: Body Literacy',
    collection: 'Sexual Foundations for Women',
    progress: 65,
    thumbnail: '/placeholder-video.jpg',
  },
]

const mockRecentContent = [
  {
    id: '2',
    title: 'Multi-Orgasmic Workshop',
    type: 'Workshop',
    duration: '90 min',
    isNew: true,
  },
  {
    id: '3',
    title: 'Pleasure Mapping Workbook',
    type: 'Workbook',
    isNew: false,
  },
]

export default function DashboardPage() {
  // TODO: Check auth session
  // const session = await getServerSession()
  // if (!session) redirect('/login')

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif italic">
              Welcome back, {mockUser.name}
            </h1>
            <p className="text-gold">
              {mockUser.tier} Member
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/dashboard" className="text-gold hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/courses" className="text-cream/70 hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/library" className="text-cream/70 hover:text-white transition-colors">
              Library
            </Link>
            <Link href="/account" className="text-cream/70 hover:text-white transition-colors">
              Account
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-forest">{mockStats.totalContent}</div>
            <div className="text-sm text-charcoal">Items Unlocked</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-sage">{mockStats.completed}</div>
            <div className="text-sm text-charcoal">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-gold">{mockStats.inProgress}</div>
            <div className="text-sm text-charcoal">In Progress</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-burgundy">{mockStats.hoursWatched}h</div>
            <div className="text-sm text-charcoal">Watched</div>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Continue Watching */}
            {mockContinueWatching.length > 0 && (
              <section>
                <h2 className="text-xl font-serif text-forest mb-4 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Continue Watching
                </h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  {mockContinueWatching.map((item) => (
                    <Link
                      key={item.id}
                      href={`/courses/lesson/${item.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-cream/50 transition-colors"
                    >
                      <div className="w-32 h-20 bg-forest/10 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-forest/50" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest">{item.title}</h3>
                        <p className="text-sm text-charcoal">{item.collection}</p>
                        <div className="mt-2">
                          <div className="h-2 bg-sage/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sage rounded-full"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-charcoal mt-1">{item.progress}% complete</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Content */}
            <section>
              <h2 className="text-xl font-serif text-forest mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recently Added
              </h2>
              <div className="grid gap-4">
                {mockRecentContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/${item.id}`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-forest">{item.title}</h3>
                        {item.isNew && (
                          <span className="bg-burgundy text-white text-xs px-2 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-charcoal">{item.type}</p>
                    </div>
                    {item.duration && (
                      <span className="text-sm text-charcoal">{item.duration}</span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-forest mb-4">Quick Links</h3>
              <nav className="space-y-3">
                <Link
                  href="/courses"
                  className="flex items-center gap-3 text-charcoal hover:text-forest transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse All Courses
                </Link>
                <Link
                  href="/live-calls"
                  className="flex items-center gap-3 text-charcoal hover:text-forest transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Upcoming Live Calls
                </Link>
                <Link
                  href="/certificates"
                  className="flex items-center gap-3 text-charcoal hover:text-forest transition-colors"
                >
                  <Award className="w-5 h-5" />
                  My Certificates
                </Link>
              </nav>
            </div>

            {/* Upgrade CTA */}
            {mockUser.tierLevel < 20 && (
              <div className="bg-gradient-to-br from-forest to-sage rounded-xl p-6 text-white">
                <h3 className="font-serif text-lg mb-2">Upgrade to Active Learner</h3>
                <p className="text-sm text-cream/90 mb-4">
                  Get live monthly coaching calls and direct Q&A access.
                </p>
                <Link
                  href="/pricing"
                  className="block w-full bg-burgundy text-white text-center py-2 rounded-lg font-semibold hover:bg-burgundy/90 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            )}

            {/* Support */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-forest mb-2">Need Help?</h3>
              <p className="text-sm text-charcoal mb-4">
                Have questions about your membership or content?
              </p>
              <Link
                href="/contact"
                className="text-burgundy hover:underline text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}