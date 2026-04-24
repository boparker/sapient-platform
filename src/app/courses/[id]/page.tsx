import Link from 'next/link'
import { PlayCircle, CheckCircle, Clock, Lock, ChevronLeft } from 'lucide-react'
import { CourseVideoPlayer } from '@/components/CourseVideoPlayer'

// Course data — will be replaced with DB data once seeded
const allCourses: Record<string, {
  id: string
  title: string
  description: string
  tierRequired: string
  tierLevel: number
  totalDuration: string
  lessons: {
    id: string
    title: string
    description: string
    duration: string
    youtubeUrl: string
    resources: { name: string; type: string; url: string }[]
  }[]
}> = {
  '1': {
    id: '1',
    title: 'Sexual Foundations for Women',
    description: 'A comprehensive 3-part mini-course on understanding your body, desire, and pleasure. This course covers the fundamentals of female anatomy, arousal patterns, and communication skills.',
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
        resources: [
          { name: 'Body Literacy Workbook', type: 'PDF', url: '#' },
          { name: 'Anatomy Diagram', type: 'Image', url: '#' },
        ],
      },
      {
        id: '1-2',
        title: 'Lesson 2: Desire & Arousal',
        description: 'Exploring responsive vs spontaneous desire, and understanding your unique arousal patterns.',
        duration: '30 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder2',
        resources: [
          { name: 'Desire Styles Quiz', type: 'PDF', url: '#' },
        ],
      },
      {
        id: '1-3',
        title: 'Lesson 3: Communication',
        description: 'How to talk about your needs and desires with partners.',
        duration: '20 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder3',
        resources: [
          { name: 'Communication Scripts', type: 'PDF', url: '#' },
        ],
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Pleasure Mapping Workshop',
    description: 'An interactive workshop on discovering your unique pleasure landscape. Learn to map your body\'s pleasure zones and develop a personalized practice.',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    totalDuration: '90 min',
    lessons: [
      {
        id: '2-1',
        title: 'Full Workshop Recording',
        description: 'The complete pleasure mapping workshop recording with guided exercises and discussion.',
        duration: '90 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder4',
        resources: [
          { name: 'Pleasure Mapping Workbook', type: 'PDF', url: '#' },
        ],
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Multi-Orgasmic Techniques',
    description: 'Advanced techniques for experiencing multiple orgasms. Covers breathwork, energy work, solo and partnered practices.',
    tierRequired: 'Active Learner',
    tierLevel: 20,
    totalDuration: '120 min',
    lessons: [
      {
        id: '3-1',
        title: 'Introduction',
        description: 'Overview of multi-orgasmic potential and the science behind it.',
        duration: '15 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder5',
        resources: [],
      },
      {
        id: '3-2',
        title: 'Breathwork & Energy',
        description: 'Core breathwork techniques for moving sexual energy through the body.',
        duration: '35 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder6',
        resources: [
          { name: 'Breathwork Audio Guide', type: 'Audio', url: '#' },
        ],
      },
      {
        id: '3-3',
        title: 'Solo Practice',
        description: 'Step-by-step solo practice techniques for building multi-orgasmic capacity.',
        duration: '40 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder7',
        resources: [
          { name: 'Practice Journal Template', type: 'PDF', url: '#' },
        ],
      },
      {
        id: '3-4',
        title: 'Partnered Practice',
        description: 'How to incorporate these techniques into partnered intimacy.',
        duration: '30 min',
        youtubeUrl: 'https://youtube.com/embed/placeholder8',
        resources: [
          { name: 'Partner Communication Guide', type: 'PDF', url: '#' },
        ],
      },
    ],
  },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params
  const course = allCourses[id]

  if (!course) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif text-forest mb-4">Course Not Found</h1>
          <p className="text-charcoal mb-6">This course doesn&apos;t exist or has been moved.</p>
          <Link
            href="/courses"
            className="bg-burgundy text-white px-8 py-3 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors inline-block"
          >
            Browse All Courses
          </Link>
        </div>
      </main>
    )
  }

  const isLocked = course.tierLevel >= 20

  if (isLocked) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Lock className="w-16 h-16 text-burgundy mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-forest mb-4">Content Locked</h1>
          <p className="text-charcoal mb-2">
            This course requires a {course.tierRequired} membership.
          </p>
          <p className="text-charcoal/70 text-sm mb-6">{course.description}</p>
          <Link
            href="/pricing"
            className="bg-burgundy text-white px-8 py-3 rounded-lg font-semibold hover:bg-burgundy/80 transition-colors inline-block"
          >
            Upgrade Now
          </Link>
        </div>
      </main>
    )
  }

  const currentLesson = course.lessons[0]
  const totalLessons = course.lessons.length

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/courses"
            className="text-gold hover:text-white transition-colors flex items-center gap-2 mb-2 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <h1 className="text-2xl font-serif italic">{course.title}</h1>
          <p className="text-gold text-sm mt-1">{totalLessons} lessons · {course.totalDuration}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Current Lesson Video */}
            <div className="mb-8">
              <CourseVideoPlayer
                youtubeUrl={currentLesson.youtubeUrl}
                contentId={currentLesson.id}
              />
            </div>

            {/* Lesson Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-serif text-forest mb-2">
                {currentLesson.title}
              </h2>
              <p className="text-charcoal mb-4">
                {currentLesson.description}
              </p>

              {/* Resources */}
              {currentLesson.resources.length > 0 && (
                <div className="border-t border-sage/20 pt-4">
                  <h3 className="font-semibold text-forest mb-3">Resources</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.resources.map((resource) => (
                      <a
                        key={resource.name}
                        href={resource.url}
                        className="bg-sage/10 text-forest px-3 py-1.5 rounded-full text-sm hover:bg-sage/20 transition-colors"
                      >
                        {resource.name} ({resource.type})
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
              <h3 className="font-serif text-forest mb-4">Course Lessons</h3>

              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      index === 0
                        ? 'bg-burgundy/10 border border-burgundy/30'
                        : 'hover:bg-cream'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {index === 0 ? (
                        <PlayCircle className="w-5 h-5 text-burgundy" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-charcoal/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate text-sm ${
                        index === 0 ? 'text-burgundy' : 'text-forest'
                      }`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-charcoal/60 flex items-center gap-1">
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
