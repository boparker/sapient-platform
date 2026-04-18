import Link from 'next/link'
import { PlayCircle, CheckCircle, Clock, Lock, ChevronLeft } from 'lucide-react'
import { VideoPlayer } from '@/components/VideoPlayer'

// Mock data - will be replaced with real data from database
const courseData = {
  id: '1',
  title: 'Sexual Foundations for Women',
  description: 'A comprehensive 3-part mini-course on understanding your body, desire, and pleasure. This course covers the fundamentals of female anatomy, arousal patterns, and communication skills.',
  thumbnail: '/placeholder-course.jpg',
  tierRequired: 'Depth Seeker',
  tierLevel: 10,
  totalDuration: '75 min',
  lessons: [
    {
      id: '1-1',
      title: 'Lesson 1: Body Literacy',
      description: 'Understanding your anatomy and how pleasure works in your body. We\'ll explore the full structure of female genitalia, debunk common myths, and learn about arousal patterns.',
      duration: '25 min',
      youtubeUrl: 'https://youtube.com/embed/placeholder1',
      completed: true,
      resources: [
        { name: 'Body Literacy Workbook', type: 'pdf', url: '#' },
        { name: 'Anatomy Diagram', type: 'image', url: '#' },
      ],
    },
    {
      id: '1-2',
      title: 'Lesson 2: Desire & Arousal',
      description: 'Exploring responsive vs spontaneous desire, and understanding your unique arousal patterns.',
      duration: '30 min',
      youtubeUrl: 'https://youtube.com/embed/placeholder2',
      completed: false,
      resources: [
        { name: 'Desire Styles Quiz', type: 'pdf', url: '#' },
      ],
    },
    {
      id: '1-3',
      title: 'Lesson 3: Communication',
      description: 'How to talk about your needs and desires with partners.',
      duration: '20 min',
      youtubeUrl: 'https://youtube.com/embed/placeholder3',
      completed: false,
      resources: [
        { name: 'Communication Scripts', type: 'pdf', url: '#' },
      ],
    },
  ],
}

// Mock current user
const currentUser = {
  tier: 'Depth Seeker',
  tierLevel: 10,
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params
  
  // In production, fetch from database:
  // const course = await prisma.collection.findUnique({ where: { id } })
  const course = courseData
  
  const isLocked = currentUser.tierLevel < course.tierLevel
  const completedLessons = course.lessons.filter(l => l.completed).length
  const progress = Math.round((completedLessons / course.lessons.length) * 100)

  if (isLocked) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Lock className="w-16 h-16 text-burgundy mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-forest mb-4">Content Locked</h1>
          <p className="text-charcoal mb-6">
            This course requires a {course.tierRequired} membership.
          </p>
          <Link
            href="/pricing"
            className="bg-burgundy text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest transition-colors inline-block"
          >
            Upgrade Now
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/courses"
            className="text-gold hover:text-white transition-colors flex items-center gap-2 mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <h1 className="text-2xl font-serif italic">{course.title}</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Current Lesson Video */}
            <div className="mb-8">
              <VideoPlayer
                youtubeUrl={course.lessons[0].youtubeUrl}
                contentId={course.lessons[0].id}
                onProgress={(progress) => {
                  console.log('Progress:', progress)
                  // TODO: Save to database
                }}
              />
            </div>

            {/* Lesson Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-serif text-forest mb-2">
                {course.lessons[0].title}
              </h2>
              <p className="text-charcoal mb-4">
                {course.lessons[0].description}
              </p>

              {/* Resources */}
              {course.lessons[0].resources.length > 0 && (
                <div className="border-t border-sage/20 pt-4">
                  <h3 className="font-semibold text-forest mb-3">Resources</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.lessons[0].resources.map((resource) => (
                      <a
                        key={resource.name}
                        href={resource.url}
                        className="bg-sage/10 text-forest px-3 py-1 rounded-full text-sm hover:bg-sage/20 transition-colors"
                      >
                        {resource.name} ({resource.type.toUpperCase()})
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-forest">Course Progress</h3>
                <span className="text-sm text-charcoal">{progress}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-sage/20 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-sage rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      index === 0
                        ? 'bg-burgundy/10 border border-burgundy/30'
                        : 'hover:bg-cream/50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-sage" />
                      ) : index === 0 ? (
                        <PlayCircle className="w-5 h-5 text-burgundy" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-charcoal/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${
                        index === 0 ? 'text-burgundy' : 'text-forest'
                      }`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-charcoal flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-sage/20">
                <div className="flex items-center justify-between text-sm text-charcoal">
                  <span>Total Duration</span>
                  <span>{course.totalDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}