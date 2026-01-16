import { describe, it, expect } from 'vitest'
import { TEST_VIDEOS, DEMO_QUESTIONS, EGE_INTRO_QUESTIONS } from './testVideos'

describe('testVideos constants', () => {
  describe('TEST_VIDEOS', () => {
    describe('mp4 videos', () => {
      it('should have bigBuckBunny video URL', () => {
        expect(TEST_VIDEOS.mp4.bigBuckBunny).toBeDefined()
        expect(TEST_VIDEOS.mp4.bigBuckBunny).toContain('bigbuckbunny')
        expect(TEST_VIDEOS.mp4.bigBuckBunny).toMatch(/\.mp4$/)
      })

      it('should have sintel video URL', () => {
        expect(TEST_VIDEOS.mp4.sintel).toBeDefined()
        expect(TEST_VIDEOS.mp4.sintel).toContain('sintel')
        expect(TEST_VIDEOS.mp4.sintel).toMatch(/\.mp4$/)
      })

      it('should have elephantsDream video URL', () => {
        expect(TEST_VIDEOS.mp4.elephantsDream).toBeDefined()
        expect(TEST_VIDEOS.mp4.elephantsDream).toMatch(/\.mp4$/)
      })

      it('should have valid https URLs for all mp4 videos', () => {
        Object.values(TEST_VIDEOS.mp4).forEach((url) => {
          expect(url).toMatch(/^https:\/\//)
        })
      })
    })

    describe('hls videos', () => {
      it('should have apple HLS stream URL', () => {
        expect(TEST_VIDEOS.hls.apple).toBeDefined()
        expect(TEST_VIDEOS.hls.apple).toContain('apple.com')
        expect(TEST_VIDEOS.hls.apple).toMatch(/\.m3u8$/)
      })

      it('should have mux HLS stream URL', () => {
        expect(TEST_VIDEOS.hls.mux).toBeDefined()
        expect(TEST_VIDEOS.hls.mux).toContain('mux.com')
        expect(TEST_VIDEOS.hls.mux).toMatch(/\.m3u8$/)
      })

      it('should have live HLS stream URL', () => {
        expect(TEST_VIDEOS.hls.live).toBeDefined()
        expect(TEST_VIDEOS.hls.live).toMatch(/\.m3u8$/)
      })

      it('should have valid https URLs for all hls videos', () => {
        Object.values(TEST_VIDEOS.hls).forEach((url) => {
          expect(url).toMatch(/^https:\/\//)
        })
      })
    })

    it('should have both mp4 and hls categories', () => {
      expect(TEST_VIDEOS).toHaveProperty('mp4')
      expect(TEST_VIDEOS).toHaveProperty('hls')
    })
  })

  describe('DEMO_QUESTIONS', () => {
    it('should have at least 2 demo questions', () => {
      expect(DEMO_QUESTIONS.length).toBeGreaterThanOrEqual(2)
    })

    it('should have valid structure for each question', () => {
      DEMO_QUESTIONS.forEach((question) => {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('timestamp')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('options')
        expect(question).toHaveProperty('correctIndex')
      })
    })

    it('should have unique IDs for all questions', () => {
      const ids = DEMO_QUESTIONS.map((q) => q.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid correctIndex within options range', () => {
      DEMO_QUESTIONS.forEach((question) => {
        expect(question.correctIndex).toBeGreaterThanOrEqual(0)
        expect(question.correctIndex).toBeLessThan(question.options.length)
      })
    })

    it('should have non-negative timestamps', () => {
      DEMO_QUESTIONS.forEach((question) => {
        expect(question.timestamp).toBeGreaterThanOrEqual(0)
      })
    })

    it('should have xpReward defined', () => {
      DEMO_QUESTIONS.forEach((question) => {
        expect(question.xpReward).toBeDefined()
        expect(question.xpReward).toBeGreaterThan(0)
      })
    })

    it('first question should appear at 3 seconds', () => {
      expect(DEMO_QUESTIONS[0].timestamp).toBe(3)
    })

    it('second question should appear at 7 seconds', () => {
      expect(DEMO_QUESTIONS[1].timestamp).toBe(7)
    })

    it('should have at least 2 options for each question', () => {
      DEMO_QUESTIONS.forEach((question) => {
        expect(question.options.length).toBeGreaterThanOrEqual(2)
      })
    })
  })

  describe('EGE_INTRO_QUESTIONS', () => {
    it('should have at least 3 EGE questions', () => {
      expect(EGE_INTRO_QUESTIONS.length).toBeGreaterThanOrEqual(3)
    })

    it('should have valid structure for each question', () => {
      EGE_INTRO_QUESTIONS.forEach((question) => {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('timestamp')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('options')
        expect(question).toHaveProperty('correctIndex')
      })
    })

    it('should have unique IDs for all questions', () => {
      const ids = EGE_INTRO_QUESTIONS.map((q) => q.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have IDs prefixed with "ege-"', () => {
      EGE_INTRO_QUESTIONS.forEach((question) => {
        expect(question.id).toMatch(/^ege-/)
      })
    })

    it('should have valid correctIndex within options range', () => {
      EGE_INTRO_QUESTIONS.forEach((question) => {
        expect(question.correctIndex).toBeGreaterThanOrEqual(0)
        expect(question.correctIndex).toBeLessThan(question.options.length)
      })
    })

    it('should have timestamps in ascending order', () => {
      for (let i = 1; i < EGE_INTRO_QUESTIONS.length; i++) {
        expect(EGE_INTRO_QUESTIONS[i].timestamp).toBeGreaterThan(
          EGE_INTRO_QUESTIONS[i - 1].timestamp
        )
      }
    })

    it('should have educational content about EGE', () => {
      const allQuestions = EGE_INTRO_QUESTIONS.map((q) => q.question.toLowerCase()).join(' ')
      expect(allQuestions).toMatch(/егэ|предмет|балл|пересда/i)
    })

    it('first question should be about required subjects (answer: 2)', () => {
      const firstQuestion = EGE_INTRO_QUESTIONS[0]
      expect(firstQuestion.correctIndex).toBe(1) // "2" is at index 1
      expect(firstQuestion.options[firstQuestion.correctIndex]).toBe('2')
    })

    it('second question should be about max score (answer: 100)', () => {
      const secondQuestion = EGE_INTRO_QUESTIONS[1]
      expect(secondQuestion.correctIndex).toBe(2) // "100" is at index 2
      expect(secondQuestion.options[secondQuestion.correctIndex]).toBe('100')
    })

    it('should have xpReward for all questions', () => {
      EGE_INTRO_QUESTIONS.forEach((question) => {
        expect(question.xpReward).toBeDefined()
        expect(question.xpReward).toBeGreaterThanOrEqual(10)
      })
    })

    it('should have 4 options for each question', () => {
      EGE_INTRO_QUESTIONS.forEach((question) => {
        expect(question.options.length).toBe(4)
      })
    })
  })

  describe('cross-validation', () => {
    it('DEMO_QUESTIONS and EGE_INTRO_QUESTIONS should have no overlapping IDs', () => {
      const demoIds = DEMO_QUESTIONS.map((q) => q.id)
      const egeIds = EGE_INTRO_QUESTIONS.map((q) => q.id)

      const overlap = demoIds.filter((id) => egeIds.includes(id))
      expect(overlap).toHaveLength(0)
    })

    it('all question sets should follow InteractiveQuestion interface', () => {
      const allQuestions = [...DEMO_QUESTIONS, ...EGE_INTRO_QUESTIONS]

      allQuestions.forEach((question) => {
        expect(typeof question.id).toBe('string')
        expect(typeof question.timestamp).toBe('number')
        expect(typeof question.question).toBe('string')
        expect(Array.isArray(question.options)).toBe(true)
        expect(typeof question.correctIndex).toBe('number')
        if (question.xpReward !== undefined) {
          expect(typeof question.xpReward).toBe('number')
        }
      })
    })
  })
})
