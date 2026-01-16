import { describe, it, expect } from 'vitest'
import type {
  VideoSource,
  InteractiveQuestion,
  VideoProgress,
  VideoPlayerConfig,
  VideoMarker,
  VideoPlayerProps,
} from './video'

describe('video types', () => {
  describe('VideoSource', () => {
    it('should allow valid mp4 source', () => {
      const source: VideoSource = {
        src: 'https://example.com/video.mp4',
        type: 'mp4',
      }
      expect(source.type).toBe('mp4')
      expect(source.src).toBeDefined()
    })

    it('should allow valid hls source', () => {
      const source: VideoSource = {
        src: 'https://example.com/video.m3u8',
        type: 'hls',
        quality: '1080p',
      }
      expect(source.type).toBe('hls')
      expect(source.quality).toBe('1080p')
    })

    it('should allow valid dash source', () => {
      const source: VideoSource = {
        src: 'https://example.com/video.mpd',
        type: 'dash',
        quality: '720p',
      }
      expect(source.type).toBe('dash')
    })

    it('should allow all quality options', () => {
      const qualities: Array<'360p' | '480p' | '720p' | '1080p'> = ['360p', '480p', '720p', '1080p']
      qualities.forEach((quality) => {
        const source: VideoSource = {
          src: 'https://example.com/video.mp4',
          type: 'mp4',
          quality,
        }
        expect(source.quality).toBe(quality)
      })
    })
  })

  describe('InteractiveQuestion', () => {
    it('should create valid question with all fields', () => {
      const question: InteractiveQuestion = {
        id: 'q1',
        timestamp: 30,
        question: 'What is 2+2?',
        options: ['3', '4', '5', '6'],
        correctIndex: 1,
        xpReward: 10,
      }
      expect(question.id).toBe('q1')
      expect(question.timestamp).toBe(30)
      expect(question.options).toHaveLength(4)
      expect(question.correctIndex).toBe(1)
      expect(question.xpReward).toBe(10)
    })

    it('should allow question without xpReward', () => {
      const question: InteractiveQuestion = {
        id: 'q2',
        timestamp: 60,
        question: 'Test question',
        options: ['A', 'B'],
        correctIndex: 0,
      }
      expect(question.xpReward).toBeUndefined()
    })
  })

  describe('VideoProgress', () => {
    it('should create valid progress object', () => {
      const progress: VideoProgress = {
        lessonId: 'lesson-1',
        watchedSeconds: [0, 1, 2, 3, 4],
        totalDuration: 100,
        completionPercentage: 5,
        lastPosition: 4.5,
        completedQuestions: ['q1'],
      }
      expect(progress.lessonId).toBe('lesson-1')
      expect(progress.watchedSeconds).toHaveLength(5)
      expect(progress.completionPercentage).toBe(5)
      expect(progress.completedQuestions).toContain('q1')
    })

    it('should allow empty arrays', () => {
      const progress: VideoProgress = {
        lessonId: 'lesson-2',
        watchedSeconds: [],
        totalDuration: 0,
        completionPercentage: 0,
        lastPosition: 0,
        completedQuestions: [],
      }
      expect(progress.watchedSeconds).toHaveLength(0)
      expect(progress.completedQuestions).toHaveLength(0)
    })
  })

  describe('VideoPlayerConfig', () => {
    it('should create config with all optional fields', () => {
      const config: VideoPlayerConfig = {
        autoplay: true,
        defaultVolume: 0.8,
        defaultPlaybackRate: 1.5,
        showControls: true,
        allowDownload: false,
        markers: [],
      }
      expect(config.autoplay).toBe(true)
      expect(config.defaultVolume).toBe(0.8)
      expect(config.defaultPlaybackRate).toBe(1.5)
    })

    it('should allow empty config', () => {
      const config: VideoPlayerConfig = {}
      expect(config.autoplay).toBeUndefined()
      expect(config.markers).toBeUndefined()
    })

    it('should allow config with markers', () => {
      const markers: VideoMarker[] = [
        { time: 10, label: 'Chapter 1', color: '#ff0000' },
        { time: 60, label: 'Chapter 2', color: '#00ff00' },
      ]
      const config: VideoPlayerConfig = { markers }
      expect(config.markers).toHaveLength(2)
      expect(config.markers![0].label).toBe('Chapter 1')
    })
  })

  describe('VideoMarker', () => {
    it('should create valid marker', () => {
      const marker: VideoMarker = {
        time: 120,
        label: 'Important moment',
        color: '#2563EB',
      }
      expect(marker.time).toBe(120)
      expect(marker.label).toBe('Important moment')
      expect(marker.color).toBe('#2563EB')
    })
  })

  describe('VideoPlayerProps', () => {
    it('should create props with required fields only', () => {
      const props: VideoPlayerProps = {
        src: 'https://example.com/video.mp4',
        lessonId: 'lesson-1',
      }
      expect(props.src).toBeDefined()
      expect(props.lessonId).toBeDefined()
      expect(props.title).toBeUndefined()
      expect(props.questions).toBeUndefined()
    })

    it('should create props with all fields', () => {
      const onComplete = () => {}
      const onQuestionAnswered = () => {}
      const questions: InteractiveQuestion[] = [
        {
          id: 'q1',
          timestamp: 10,
          question: 'Test?',
          options: ['A', 'B'],
          correctIndex: 0,
        },
      ]

      const props: VideoPlayerProps = {
        src: 'https://example.com/video.mp4',
        lessonId: 'lesson-1',
        title: 'My Video',
        onComplete,
        questions,
        onQuestionAnswered,
      }

      expect(props.title).toBe('My Video')
      expect(props.questions).toHaveLength(1)
      expect(props.onComplete).toBeDefined()
      expect(props.onQuestionAnswered).toBeDefined()
    })
  })
})
