import Link from 'next/link'
import { PlayCircle, Clock, Lock } from 'lucide-react'

// Mock data - will be replaced with real data from database
const collections = [
  {
    id: '1',
    title: 'Sexual Foundations for Women',
    description: 'A 3-part mini-course on understanding your body, desire, and pleasure.',
    thumbnail: '/placeholder-course.jpg',
    lessonCount: 3,
    totalDuration: '75 min',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    lessons: [
      { id: '1-1', title: 'Lesson 1: Body Literacy', duration: '25 min', completed: true },
      { id: '1-2', title: 'Lesson 2: Desire & Arousal', duration: '30 min', completed: false },
      { id: '1-3', title: 'Lesson 3: Communication', duration: '20 min', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Pleasure Mapping Workshop',
    description: 'Interactive workshop on discovering your unique pleasure landscape.',
    thumbnail: '/placeholder-course.jpg',
    lessonCount: 1,
    totalDuration: '90 min',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    lessons: [
      { id: '2-1', title: 'Full Workshop Recording', duration: '90 min', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Multi-Orgasmic Techniques',
    description: 'Advanced techniques for experiencing multiple orgasms.',
    thumbnail: '/placeholder-course.jpg',
    lessonCount: 4,
    totalDuration: '120 min',
    tierRequired: 'Active Learner',
    tierLevel: 20,
    lessons: [
      { id: '3-1', title: 'Introduction', duration: '15 min', completed: false },
      { id: '3-2', title: 'Breathwork & Energy', duration: '35 min', completed: false },
      { id: '3-3', title: 'Solo Practice', duration: '40 min', completed: false },
      { id: '3-4', title: 'Partnered Practice', duration: '30 min', completed: false },
    ],
  },
]

// Mock current user tier
const currentUserTier = 10 // Depth Seeker

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif italic">All Courses</h1>
          <p className="text-gold mt-1">Explore our library of mini-courses and workshops</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => {
            const isLocked = currentUserTier < collection.tierLevel
            const progress = collection.lessons.filter(l => l.completed).length
            const totalLessons = collection.lessons.length
            
            return (
              <div
                key={collection.id}
                className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  isLocked ? 'opacity-75' : ''
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-forest/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-forest/50" />
                  </div>
                  
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm">{collection.tierRequired}</span>
                      </div>
                    </div>
                  )}
                  
                  {!isLocked && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 px-3">
                      {progress}/{totalLessons} completed
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-serif text-forest mb-2">
                    {collection.title}
                  </h2>
                  <p className="text-charcoal text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-charcoal mb-4">
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
                      className="block w-full text-center bg-sage text-white py-2 rounded-lg font-semibold hover:bg-forest transition-colors"
                    >
                      Upgrade to Access
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${collection.id}`}
                      className="block w-full text-center bg-burgundy text-white py-2 rounded-lg font-semibold hover:bg-forest transition-colors"
                    >
                      {progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-serif text-forest mb-4">More Coming Soon</h2>
          <p className="text-charcoal max-w-2xl mx-auto">
            We're constantly adding new mini-courses, workshops, and guided practices. 
            Active Learners get early access to all new content.
          </p>
        </div>
      </div>
    </main>
  )
}