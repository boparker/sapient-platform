import Link from 'next/link'
import { FileText, Headphones, BookOpen, Download, Lock } from 'lucide-react'

// Mock data - will be replaced with real data from database
const libraryItems = [
  {
    id: '1',
    title: 'Body Literacy Workbook',
    type: 'workbook',
    description: 'Comprehensive guide to understanding female anatomy and pleasure.',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Yes/No/Maybe List',
    type: 'template',
    description: 'Explore your boundaries and desires with this interactive checklist.',
    tierRequired: 'Free',
    tierLevel: 0,
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Morning Intimacy Meditation',
    type: 'meditation',
    description: '10-minute guided meditation for connecting with your body.',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    duration: '10 min',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'Pleasure Mapping Journal',
    type: 'workbook',
    description: '30-day journal prompts for discovering your pleasure landscape.',
    tierRequired: 'Active Learner',
    tierLevel: 20,
    downloadUrl: '#',
  },
  {
    id: '5',
    title: 'Communication Scripts',
    type: 'template',
    description: 'Ready-to-use scripts for difficult conversations about intimacy.',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    downloadUrl: '#',
  },
  {
    id: '6',
    title: 'Evening Wind-Down Meditation',
    type: 'meditation',
    description: '15-minute guided relaxation for better sleep and body awareness.',
    tierRequired: 'Depth Seeker',
    tierLevel: 10,
    duration: '15 min',
    downloadUrl: '#',
  },
]

const typeIcons: Record<string, React.ReactNode> = {
  workbook: <BookOpen className="w-6 h-6" />,
  template: <FileText className="w-6 h-6" />,
  meditation: <Headphones className="w-6 h-6" />,
}

const typeLabels: Record<string, string> = {
  workbook: 'Workbook',
  template: 'Template',
  meditation: 'Meditation',
}

// Mock current user tier
const currentUserTier = 10 // Depth Seeker

export default function LibraryPage() {
  const itemsByType = libraryItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {} as Record<string, typeof libraryItems>)

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif italic">Resource Library</h1>
          <p className="text-gold mt-1">Workbooks, templates, and guided practices</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Workbooks', 'Templates', 'Meditations'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'All'
                  ? 'bg-burgundy text-white'
                  : 'bg-white text-forest hover:bg-sage/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.map((item) => {
            const isLocked = currentUserTier < item.tierLevel

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                  isLocked ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-sage/10 rounded-lg text-forest">
                    {typeIcons[item.type]}
                  </div>
                  {isLocked && (
                    <span className="text-xs bg-charcoal/10 text-charcoal px-2 py-1 rounded-full">
                      {item.tierRequired}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif text-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-sage font-medium uppercase tracking-wide">
                    {typeLabels[item.type]}
                  </span>
                  
                  {isLocked ? (
                    <Link
                      href="/pricing"
                      className="flex items-center gap-1 text-sm text-burgundy hover:underline"
                    >
                      <Lock className="w-4 h-4" />
                      Upgrade
                    </Link>
                  ) : (
                    <a
                      href={item.downloadUrl}
                      className="flex items-center gap-1 text-sm text-burgundy hover:underline"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state for locked content */}
        {currentUserTier < 20 && (
          <div className="mt-12 bg-gradient-to-br from-forest to-sage rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-serif mb-2">Unlock More Resources</h2>
            <p className="text-cream/90 mb-4">
              Active Learners get access to exclusive workbooks, advanced templates, and premium meditations.
            </p>
            <Link
              href="/pricing"
              className="bg-burgundy text-white px-6 py-3 rounded-lg font-semibold hover:bg-burgundy/90 transition-colors inline-block"
            >
              Upgrade to Active Learner
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}