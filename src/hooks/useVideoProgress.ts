import { useState, useEffect, useCallback, useRef } from 'react'
import type { VideoProgress } from '../types/video'

const STORAGE_PREFIX = 'examprep_video_progress_'

export function useVideoProgress(lessonId: string) {
  const [progress, setProgress] = useState<VideoProgress>({
    lessonId,
    watchedSeconds: [],
    totalDuration: 0,
    completionPercentage: 0,
    lastPosition: 0,
    completedQuestions: [],
  })

  // Ref для отслеживания последней сохранённой секунды (избегаем лишних обновлений)
  const lastSavedSecondRef = useRef<number>(-1)
  // Ref для debounce сохранения в localStorage
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${lessonId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as VideoProgress
        setProgress(parsed)
      } catch (e) {
        console.error('Failed to parse video progress:', e)
      }
    }
  }, [lessonId])

  // Debounced сохранение в localStorage (раз в 2 секунды максимум)
  useEffect(() => {
    if (progress.totalDuration > 0) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem(`${STORAGE_PREFIX}${lessonId}`, JSON.stringify(progress))
      }, 2000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [progress, lessonId])

  // Обновление просмотренной секунды (оптимизировано для производительности)
  const updateWatchedSecond = useCallback((second: number, duration: number) => {
    const secondInt = Math.floor(second)

    // Пропускаем если это та же секунда что и раньше
    if (secondInt === lastSavedSecondRef.current) {
      return
    }
    lastSavedSecondRef.current = secondInt

    setProgress((prev) => {
      // Если эта секунда уже просмотрена, просто обновляем позицию
      if (prev.watchedSeconds.includes(secondInt)) {
        // Обновляем lastPosition только если изменение значительное (> 1 сек)
        if (Math.abs(prev.lastPosition - second) < 1) {
          return prev // Не обновляем вообще
        }
        return { ...prev, lastPosition: second }
      }

      // Добавляем новую просмотренную секунду
      const newWatched = [...prev.watchedSeconds, secondInt]
      const totalSeconds = Math.floor(duration)
      const completion = totalSeconds > 0 ? (newWatched.length / totalSeconds) * 100 : 0

      return {
        ...prev,
        watchedSeconds: newWatched,
        totalDuration: duration,
        completionPercentage: Math.min(completion, 100),
        lastPosition: second,
      }
    })
  }, [])

  // Отметка вопроса как отвеченного
  const markQuestionCompleted = useCallback((questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedQuestions: [...new Set([...prev.completedQuestions, questionId])],
    }))
  }, [])

  // Сброс прогресса
  const resetProgress = useCallback(() => {
    const initial: VideoProgress = {
      lessonId,
      watchedSeconds: [],
      totalDuration: 0,
      completionPercentage: 0,
      lastPosition: 0,
      completedQuestions: [],
    }
    setProgress(initial)
    localStorage.removeItem(`${STORAGE_PREFIX}${lessonId}`)
  }, [lessonId])

  // Проверка, был ли вопрос уже отвечен
  const isQuestionCompleted = useCallback(
    (questionId: string) => {
      return progress.completedQuestions.includes(questionId)
    },
    [progress.completedQuestions]
  )

  return {
    progress,
    updateWatchedSecond,
    markQuestionCompleted,
    resetProgress,
    isQuestionCompleted,
  }
}
