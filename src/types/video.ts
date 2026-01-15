export interface VideoSource {
  src: string
  type: 'mp4' | 'hls' | 'dash'
  quality?: '360p' | '480p' | '720p' | '1080p'
}

export interface InteractiveQuestion {
  id: string
  timestamp: number // секунда появления
  question: string
  options: string[]
  correctIndex: number
  xpReward?: number
}

export interface VideoProgress {
  lessonId: string
  watchedSeconds: number[]
  totalDuration: number
  completionPercentage: number
  lastPosition: number
  completedQuestions: string[]
}

export interface VideoPlayerConfig {
  autoplay?: boolean
  defaultVolume?: number
  defaultPlaybackRate?: number
  showControls?: boolean
  allowDownload?: boolean
  markers?: VideoMarker[]
}

export interface VideoMarker {
  time: number
  label: string
  color: string
}

export interface VideoPlayerProps {
  src: string
  lessonId: string
  title?: string
  onComplete?: () => void
  questions?: InteractiveQuestion[]
  onQuestionAnswered?: (questionId: string, isCorrect: boolean, xp: number) => void
}
