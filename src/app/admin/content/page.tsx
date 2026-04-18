'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Eye, Trash2, Search, Filter } from 'lucide-react'

// Mock data - admin view of all content
const contentItems = [
  {
    id: '1',
    title: 'Lesson 1: Body Literacy',
    type: 'mini_course',
    collection: 'Sexual Foundations for Women',
    tier: 'Depth Seeker',
    published: true,
    views: 234,
    completions: 189,
  },
  {
    id: '2',
    title: 'Lesson 2: Desire & Arousal',
    type: 'mini_course',
    collection: 'Sexual Foundations for Women',
    tier: 'Depth Seeker',
    published: true,
    views: 198,
    completions: 156,
  },
  {
    id: '3',
    title: 'Multi-Orgasmic Workshop',
    type: 'workshop',
    collection: 'Workshop Recordings',
    tier: 'Active Learner',
    published: true,
    views: 567,
    completions: 423,
  },
  {
    id: '4',
    title: 'Body Literacy Workbook',
    type: 'workbook',
    collection: 'Resource Library',
    tier: 'Depth Seeker',
    published: true,
    views: 445,
    completions: 0,
  },
  {
    id: '5',
    title: 'Perimenopausal Pivot - Week 1',
    type: 'flagship_program',
    collection: 'Perimenopausal Pivot',
    tier: 'Flagship',
    published: false,
    views: 0,
    completions: 0,
  },
]

const typeColors: Record<string, string> = {
  mini_course: 'bg-blue-100 text-blue-800',
  workshop: 'bg-purple-100 text-purple-800',
  workbook: 'bg-green-100 text-green-800',
  meditation: 'bg-yellow-100 text-yellow-800',
  flagship_program: 'bg-burgundy/20 text-burgundy',
}

export default function AdminContentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-forest text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Content Management</h1>
            <p className="text-gold text-sm">Manage courses, workshops, and resources</p>
          </div>
          <Link
            href="/admin/content/new"
            className="bg-burgundy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-burgundy/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Content
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              <option value="mini_course">Mini Courses</option>
              <option value="workshop">Workshops</option>
              <option value="workbook">Workbooks</option>
              <option value="meditation">Meditations</option>
              <option value="flagship_program">Flagship Programs</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Collection</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Stats</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-forest">{item.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[item.type] || 'bg-gray-100 text-gray-800'}`}>
                      {item.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.collection}</td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-charcoal">{item.tier}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">
                      <div>{item.views} views</div>
                      {item.completions > 0 && (
                        <div>{item.completions} completed</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/content/${item.id}/edit`}
                        className="p-2 text-gray-600 hover:text-burgundy hover:bg-burgundy/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/courses/lesson/${item.id}`}
                        className="p-2 text-gray-600 hover:text-sage hover:bg-sage/10 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No content found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-forest">{contentItems.length}</div>
            <div className="text-sm text-gray-600">Total Content Items</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-sage">
              {contentItems.filter(i => i.published).length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-gold">
              {contentItems.reduce((acc, i) => acc + i.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-burgundy">
              {contentItems.reduce((acc, i) => acc + i.completions, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Completions</div>
          </div>
        </div>
      </div>
    </main>
  )
}