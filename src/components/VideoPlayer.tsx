'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

interface VideoPlayerProps {
  youtubeUrl: string
  contentId: string
  onProgress?: (progress: { watchedSeconds: number; totalSeconds: number; completed: boolean }) => void
}

export function VideoPlayer({ youtubeUrl, contentId, onProgress }: VideoPlayerProps) {
  const playerRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [watchedSeconds, setWatchedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout>(null)

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match?.[1] || ''
  }

  const videoId = getVideoId(youtubeUrl)

  useEffect(() => {
    // Load YouTube iframe API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
    // Start progress tracking
    progressInterval.current = setInterval(() => {
      setWatchedSeconds((prev) => {
        const newValue = prev + 1
        const newProgress = duration > 0 ? (newValue / duration) * 100 : 0
        setProgress(newProgress)
        
        // Report progress every 5 seconds
        if (newValue % 5 === 0 && onProgress) {
          onProgress({
            watchedSeconds: newValue,
            totalSeconds: duration,
            completed: newProgress >= 90,
          })
        }
        
        return newValue
      })
    }, 1000)
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
  }

  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
      {videoId ? (
        <iframe
          ref={playerRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          <p>Video not available</p>
        </div>
      )}
      
      {/* Custom controls overlay (optional enhancement) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-burgundy transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-2">
            <span>{formatTime(watchedSeconds)}</span>
            <span className="text-white/60">/</span>
            <span className="text-white/60">{formatTime(duration)}</span>
          </div>
          
          {progress >= 90 && (
            <span className="bg-sage text-white text-xs px-2 py-1 rounded">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}