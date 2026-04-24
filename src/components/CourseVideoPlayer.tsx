'use client'

import { VideoPlayer } from './VideoPlayer'

interface CourseVideoPlayerProps {
  youtubeUrl: string
  contentId: string
}

export function CourseVideoPlayer({ youtubeUrl, contentId }: CourseVideoPlayerProps) {
  return (
    <VideoPlayer
      youtubeUrl={youtubeUrl}
      contentId={contentId}
      onProgress={(progress) => {
        console.log('Progress:', progress)
      }}
    />
  )
}
