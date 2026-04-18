'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Upload, Link as LinkIcon } from 'lucide-react'

export default function NewContentPage() {
  const [contentType, setContentType] = useState('mini_course')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [tier, setTier] = useState('depth_seeker')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Submit to API
    console.log({
      contentType,
      title,
      description,
      youtubeUrl,
      tier,
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    
    // Redirect to content list
    // router.push('/admin/content')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-forest text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/admin/content"
            className="text-gold hover:text-white transition-colors flex items-center gap-2 mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Content
          </Link>
          <h1 className="text-2xl font-serif">Add New Content</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          {/* Content Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'mini_course', label: 'Mini Course' },
                { value: 'workshop', label: 'Workshop' },
                { value: 'workbook', label: 'Workbook' },
                { value: 'meditation', label: 'Meditation' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setContentType(type.value)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    contentType === type.value
                      ? 'border-burgundy bg-burgundy/10 text-burgundy'
                      : 'border-gray-200 hover:border-sage'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
              placeholder="e.g., Lesson 1: Body Literacy"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
              placeholder="Describe what this content covers..."
            />
          </div>

          {/* Tier Access */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
            >
              <option value="free">Free</option>
              <option value="depth_seeker">Depth Seeker ($15/mo)</option>
              <option value="active_learner">Active Learner ($75/mo)</option>
              <option value="flagship">Flagship Program Only</option>
            </select>
          </div>

          {/* Video URL (for video content) */}
          {(contentType === 'mini_course' || contentType === 'workshop' || contentType === 'meditation') && (
            <div className="mb-6">
              <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Use unlisted YouTube videos for private content
              </p>
            </div>
          )}

          {/* File Upload (for workbooks/templates) */}
          {(contentType === 'workbook' || contentType === 'template') && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-sage transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOCX, or ZIP files up to 50MB
                </p>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-burgundy focus:ring-burgundy" />
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-burgundy focus:ring-burgundy" />
                <span className="text-sm text-gray-700">Send notification to members</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-burgundy focus:ring-burgundy" />
                <span className="text-sm text-gray-700">Featured content</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/admin/content"
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !title}
              className="bg-burgundy text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Content'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}