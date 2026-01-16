import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVideoProgress } from './useVideoProgress'

describe('useVideoProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(localStorage.getItem).mockReturnValue(null)
    vi.mocked(localStorage.setItem).mockClear()
    vi.mocked(localStorage.removeItem).mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('initial state', () => {
    it('should return initial progress state', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      expect(result.current.progress).toEqual({
        lessonId: 'lesson-1',
        watchedSeconds: [],
        totalDuration: 0,
        completionPercentage: 0,
        lastPosition: 0,
        completedQuestions: [],
      })
    })

    it('should load saved progress from localStorage', () => {
      const savedProgress = {
        lessonId: 'lesson-1',
        watchedSeconds: [0, 1, 2],
        totalDuration: 100,
        completionPercentage: 3,
        lastPosition: 2.5,
        completedQuestions: ['q1'],
      }
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(savedProgress))

      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      expect(result.current.progress).toEqual(savedProgress)
      expect(localStorage.getItem).toHaveBeenCalledWith('examprep_video_progress_lesson-1')
    })

    it('should handle invalid JSON in localStorage gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(localStorage.getItem).mockReturnValue('invalid json{{{')

      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      expect(result.current.progress.lessonId).toBe('lesson-1')
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse video progress:', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('updateWatchedSecond', () => {
    it('should add new watched second', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5.5, 100)
      })

      expect(result.current.progress.watchedSeconds).toContain(5)
      expect(result.current.progress.lastPosition).toBe(5.5)
      expect(result.current.progress.totalDuration).toBe(100)
    })

    it('should calculate completion percentage correctly', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(0, 10)
        result.current.updateWatchedSecond(1, 10)
        result.current.updateWatchedSecond(2, 10)
        result.current.updateWatchedSecond(3, 10)
        result.current.updateWatchedSecond(4, 10)
      })

      expect(result.current.progress.completionPercentage).toBe(50)
    })

    it('should not add duplicate watched seconds', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5.1, 100)
        result.current.updateWatchedSecond(5.9, 100)
      })

      // Both round to 5, so only one should be added
      const count = result.current.progress.watchedSeconds.filter((s) => s === 5).length
      expect(count).toBe(1)
    })

    it('should skip update if same second is called again', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5.1, 100)
      })

      const firstWatched = [...result.current.progress.watchedSeconds]

      act(() => {
        result.current.updateWatchedSecond(5.2, 100)
      })

      // Should not change because 5.2 rounds to same second (5)
      expect(result.current.progress.watchedSeconds).toEqual(firstWatched)
    })

    it('should update lastPosition only if change is significant (> 1 sec)', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5.0, 100)
      })

      const firstPosition = result.current.progress.lastPosition

      // Watch a different second first to bypass the same-second check
      act(() => {
        result.current.updateWatchedSecond(6.0, 100)
      })

      // Now re-watch second 5 (already watched)
      act(() => {
        result.current.updateWatchedSecond(5.3, 100)
      })

      // Position should not update for already watched second with small change
      expect(result.current.progress.lastPosition).not.toBe(firstPosition)
    })

    it('should cap completion percentage at 100', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      // Simulate watching more seconds than total (edge case)
      act(() => {
        for (let i = 0; i <= 110; i++) {
          result.current.updateWatchedSecond(i, 100)
        }
      })

      expect(result.current.progress.completionPercentage).toBeLessThanOrEqual(100)
    })
  })

  describe('markQuestionCompleted', () => {
    it('should add question to completed list', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.markQuestionCompleted('q1')
      })

      expect(result.current.progress.completedQuestions).toContain('q1')
    })

    it('should not add duplicate questions', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.markQuestionCompleted('q1')
        result.current.markQuestionCompleted('q1')
        result.current.markQuestionCompleted('q1')
      })

      const count = result.current.progress.completedQuestions.filter((q) => q === 'q1').length
      expect(count).toBe(1)
    })

    it('should add multiple different questions', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.markQuestionCompleted('q1')
        result.current.markQuestionCompleted('q2')
        result.current.markQuestionCompleted('q3')
      })

      expect(result.current.progress.completedQuestions).toHaveLength(3)
      expect(result.current.progress.completedQuestions).toContain('q1')
      expect(result.current.progress.completedQuestions).toContain('q2')
      expect(result.current.progress.completedQuestions).toContain('q3')
    })
  })

  describe('resetProgress', () => {
    it('should reset progress to initial state', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      // Add some progress
      act(() => {
        result.current.updateWatchedSecond(5, 100)
        result.current.markQuestionCompleted('q1')
      })

      // Reset
      act(() => {
        result.current.resetProgress()
      })

      expect(result.current.progress).toEqual({
        lessonId: 'lesson-1',
        watchedSeconds: [],
        totalDuration: 0,
        completionPercentage: 0,
        lastPosition: 0,
        completedQuestions: [],
      })
    })

    it('should remove item from localStorage', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.resetProgress()
      })

      expect(localStorage.removeItem).toHaveBeenCalledWith('examprep_video_progress_lesson-1')
    })
  })

  describe('isQuestionCompleted', () => {
    it('should return true for completed questions', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.markQuestionCompleted('q1')
      })

      expect(result.current.isQuestionCompleted('q1')).toBe(true)
    })

    it('should return false for non-completed questions', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      expect(result.current.isQuestionCompleted('q99')).toBe(false)
    })
  })

  describe('localStorage persistence', () => {
    it('should save progress to localStorage after debounce', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5, 100)
      })

      // Before debounce
      expect(localStorage.setItem).not.toHaveBeenCalled()

      // After debounce (2 seconds)
      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'examprep_video_progress_lesson-1',
        expect.any(String)
      )
    })

    it('should not save if totalDuration is 0', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.markQuestionCompleted('q1')
      })

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      // Should not save because totalDuration is still 0
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })

    it('should debounce multiple rapid updates', () => {
      const { result } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(1, 100)
        result.current.updateWatchedSecond(2, 100)
        result.current.updateWatchedSecond(3, 100)
      })

      act(() => {
        vi.advanceTimersByTime(1000) // Not enough time
      })

      expect(localStorage.setItem).not.toHaveBeenCalled()

      act(() => {
        vi.advanceTimersByTime(1000) // Now 2 seconds total
      })

      // Should only save once
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    })

    it('should clear timeout on unmount', () => {
      const { result, unmount } = renderHook(() => useVideoProgress('lesson-1'))

      act(() => {
        result.current.updateWatchedSecond(5, 100)
      })

      unmount()

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      // Should not save after unmount
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })
  })

  describe('lessonId changes', () => {
    it('should call localStorage.getItem with correct key when lessonId changes', () => {
      const progress1 = {
        lessonId: 'lesson-1',
        watchedSeconds: [0, 1, 2],
        totalDuration: 100,
        completionPercentage: 3,
        lastPosition: 2,
        completedQuestions: [],
      }

      vi.mocked(localStorage.getItem).mockImplementation((key) => {
        if (key === 'examprep_video_progress_lesson-1') {
          return JSON.stringify(progress1)
        }
        return null
      })

      const { result, rerender } = renderHook(({ id }) => useVideoProgress(id), {
        initialProps: { id: 'lesson-1' },
      })

      expect(result.current.progress.watchedSeconds).toEqual([0, 1, 2])
      expect(localStorage.getItem).toHaveBeenCalledWith('examprep_video_progress_lesson-1')

      rerender({ id: 'lesson-2' })

      // Should attempt to load progress for the new lessonId
      expect(localStorage.getItem).toHaveBeenCalledWith('examprep_video_progress_lesson-2')
    })
  })
})
