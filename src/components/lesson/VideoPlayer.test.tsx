import { describe, it, expect, vi, beforeEach } from 'vitest'

// Тестируем логику форматирования времени напрямую
describe('VideoPlayer utility functions', () => {
  // Копируем логику formatTime из компонента для тестирования
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  describe('formatTime', () => {
    it('should format 0 seconds as 0:00', () => {
      expect(formatTime(0)).toBe('0:00')
    })

    it('should format 59 seconds as 0:59', () => {
      expect(formatTime(59)).toBe('0:59')
    })

    it('should format 60 seconds as 1:00', () => {
      expect(formatTime(60)).toBe('1:00')
    })

    it('should format 90 seconds as 1:30', () => {
      expect(formatTime(90)).toBe('1:30')
    })

    it('should format 605 seconds as 10:05', () => {
      expect(formatTime(605)).toBe('10:05')
    })

    it('should format 3661 seconds as 61:01', () => {
      expect(formatTime(3661)).toBe('61:01')
    })

    it('should handle decimal seconds by flooring', () => {
      expect(formatTime(65.7)).toBe('1:05')
    })
  })
})

// Тестируем логику определения показа вопроса
describe('VideoPlayer question display logic', () => {
  interface Question {
    id: string
    timestamp: number
  }

  const shouldShowQuestion = (
    questions: Question[],
    currentTime: number,
    completedQuestions: string[],
    isPlaying: boolean
  ): Question | null => {
    if (!isPlaying) return null

    for (const q of questions) {
      if (
        currentTime >= q.timestamp &&
        currentTime < q.timestamp + 1 &&
        !completedQuestions.includes(q.id)
      ) {
        return q
      }
    }
    return null
  }

  it('should not show question when paused', () => {
    const questions = [{ id: 'q1', timestamp: 5 }]
    expect(shouldShowQuestion(questions, 5, [], false)).toBeNull()
  })

  it('should show question at exact timestamp when playing', () => {
    const questions = [{ id: 'q1', timestamp: 5 }]
    const result = shouldShowQuestion(questions, 5, [], true)
    expect(result).toEqual({ id: 'q1', timestamp: 5 })
  })

  it('should show question within 1 second window', () => {
    const questions = [{ id: 'q1', timestamp: 5 }]
    expect(shouldShowQuestion(questions, 5.5, [], true)).toEqual({ id: 'q1', timestamp: 5 })
  })

  it('should not show question after 1 second window', () => {
    const questions = [{ id: 'q1', timestamp: 5 }]
    expect(shouldShowQuestion(questions, 6, [], true)).toBeNull()
  })

  it('should not show completed question', () => {
    const questions = [{ id: 'q1', timestamp: 5 }]
    expect(shouldShowQuestion(questions, 5, ['q1'], true)).toBeNull()
  })

  it('should show first matching uncompleted question', () => {
    const questions = [
      { id: 'q1', timestamp: 5 },
      { id: 'q2', timestamp: 5 },
    ]
    expect(shouldShowQuestion(questions, 5, ['q1'], true)).toEqual({ id: 'q2', timestamp: 5 })
  })

  it('should handle empty questions array', () => {
    expect(shouldShowQuestion([], 5, [], true)).toBeNull()
  })
})

// Тестируем логику прогресса
describe('VideoPlayer progress calculation', () => {
  const calculateProgress = (watchedSeconds: number[], totalDuration: number): number => {
    if (totalDuration === 0) return 0
    const uniqueSeconds = new Set(watchedSeconds)
    return Math.round((uniqueSeconds.size / totalDuration) * 100)
  }

  it('should return 0 for zero duration', () => {
    expect(calculateProgress([1, 2, 3], 0)).toBe(0)
  })

  it('should return 0 for empty watched seconds', () => {
    expect(calculateProgress([], 100)).toBe(0)
  })

  it('should calculate correct percentage', () => {
    expect(calculateProgress([1, 2, 3, 4, 5], 100)).toBe(5)
  })

  it('should handle duplicate seconds', () => {
    expect(calculateProgress([1, 1, 2, 2, 3], 100)).toBe(3)
  })

  it('should round to nearest integer', () => {
    expect(calculateProgress([1, 2, 3], 7)).toBe(43) // 3/7 = 42.86 -> 43
  })

  it('should return 100 when all seconds watched', () => {
    expect(calculateProgress([0, 1, 2, 3, 4], 5)).toBe(100)
  })
})

// Тестируем логику seek
describe('VideoPlayer seek logic', () => {
  const calculateSeekTime = (
    currentTime: number,
    offset: number,
    duration: number
  ): number => {
    const newTime = currentTime + offset
    return Math.max(0, Math.min(newTime, duration))
  }

  it('should add positive offset', () => {
    expect(calculateSeekTime(10, 10, 100)).toBe(20)
  })

  it('should subtract negative offset', () => {
    expect(calculateSeekTime(20, -10, 100)).toBe(10)
  })

  it('should not go below 0', () => {
    expect(calculateSeekTime(5, -10, 100)).toBe(0)
  })

  it('should not exceed duration', () => {
    expect(calculateSeekTime(95, 10, 100)).toBe(100)
  })

  it('should handle zero duration', () => {
    expect(calculateSeekTime(0, 10, 0)).toBe(0)
  })
})

// Тестируем логику slider
describe('VideoPlayer slider logic', () => {
  const sliderValueToTime = (value: number, duration: number): number => {
    return (value / 100) * duration
  }

  const timeToSliderValue = (time: number, duration: number): number => {
    if (duration === 0) return 0
    return (time / duration) * 100
  }

  it('should convert 0% to 0 seconds', () => {
    expect(sliderValueToTime(0, 100)).toBe(0)
  })

  it('should convert 50% to half duration', () => {
    expect(sliderValueToTime(50, 100)).toBe(50)
  })

  it('should convert 100% to full duration', () => {
    expect(sliderValueToTime(100, 120)).toBe(120)
  })

  it('should convert time to slider value', () => {
    expect(timeToSliderValue(60, 120)).toBe(50)
  })

  it('should handle zero duration for slider value', () => {
    expect(timeToSliderValue(10, 0)).toBe(0)
  })
})

// Тестируем обработку ответов на вопросы
describe('VideoPlayer question answer logic', () => {
  interface Question {
    id: string
    correctIndex: number
    xpReward: number
  }

  const checkAnswer = (
    question: Question,
    selectedIndex: number
  ): { correct: boolean; xp: number } => {
    const isCorrect = selectedIndex === question.correctIndex
    return {
      correct: isCorrect,
      xp: isCorrect ? (question.xpReward || 10) : 0,
    }
  }

  it('should return correct=true and xp for correct answer', () => {
    const question = { id: 'q1', correctIndex: 1, xpReward: 15 }
    expect(checkAnswer(question, 1)).toEqual({ correct: true, xp: 15 })
  })

  it('should return correct=false and 0 xp for wrong answer', () => {
    const question = { id: 'q1', correctIndex: 1, xpReward: 15 }
    expect(checkAnswer(question, 2)).toEqual({ correct: false, xp: 0 })
  })

  it('should use default 10 xp when xpReward is 0', () => {
    const question = { id: 'q1', correctIndex: 0, xpReward: 0 }
    expect(checkAnswer(question, 0)).toEqual({ correct: true, xp: 10 })
  })

  it('should handle first option as correct', () => {
    const question = { id: 'q1', correctIndex: 0, xpReward: 5 }
    expect(checkAnswer(question, 0)).toEqual({ correct: true, xp: 5 })
  })

  it('should handle last option as correct', () => {
    const question = { id: 'q1', correctIndex: 3, xpReward: 20 }
    expect(checkAnswer(question, 3)).toEqual({ correct: true, xp: 20 })
  })
})
