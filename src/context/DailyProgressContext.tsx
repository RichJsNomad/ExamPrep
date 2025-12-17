import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface DailyProgressData {
  streak: number // Количество дней подряд
  todayXP: number // XP заработанный сегодня
  todayProgress: number // Прогресс дня 0-100%
  tasksCompleted: number // Задач выполнено сегодня
  totalTasks: number // Всего задач на сегодня
  combo: number // Текущее комбо правильных ответов
  bestCombo: number // Лучшее комбо за день
  correctAnswers: number // Правильных ответов
  totalAnswers: number // Всего ответов
  timeSpent: number // Время в минутах
}

interface DailyProgressContextType {
  data: DailyProgressData
  updateData: (updates: Partial<DailyProgressData>) => void
  addXP: (amount: number) => void
  incrementStreak: () => void
  completeTask: () => void
  incrementCombo: () => void
  resetCombo: () => void
  addAnswer: (isCorrect: boolean) => void
  addTime: (minutes: number) => void
  resetDay: () => void
}

const defaultData: DailyProgressData = {
  streak: 0,
  todayXP: 0,
  todayProgress: 0,
  tasksCompleted: 0,
  totalTasks: 3,
  combo: 0,
  bestCombo: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  timeSpent: 0,
}

const DailyProgressContext = createContext<DailyProgressContextType | undefined>(undefined)

export function DailyProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DailyProgressData>(defaultData)

  const updateData = (updates: Partial<DailyProgressData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const addXP = (amount: number) => {
    setData((prev) => ({ ...prev, todayXP: prev.todayXP + amount }))
  }

  const incrementStreak = () => {
    setData((prev) => ({ ...prev, streak: prev.streak + 1 }))
  }

  const completeTask = () => {
    setData((prev) => {
      const newCompleted = prev.tasksCompleted + 1
      const newProgress = Math.round((newCompleted / prev.totalTasks) * 100)
      return {
        ...prev,
        tasksCompleted: newCompleted,
        todayProgress: newProgress,
      }
    })
  }

  const incrementCombo = () => {
    setData((prev) => {
      const newCombo = prev.combo + 1
      const newBestCombo = Math.max(newCombo, prev.bestCombo)
      return {
        ...prev,
        combo: newCombo,
        bestCombo: newBestCombo,
      }
    })
  }

  const resetCombo = () => {
    setData((prev) => ({ ...prev, combo: 0 }))
  }

  const addAnswer = (isCorrect: boolean) => {
    setData((prev) => ({
      ...prev,
      totalAnswers: prev.totalAnswers + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
    }))

    if (isCorrect) {
      incrementCombo()
    } else {
      resetCombo()
    }
  }

  const addTime = (minutes: number) => {
    setData((prev) => ({ ...prev, timeSpent: prev.timeSpent + minutes }))
  }

  const resetDay = () => {
    setData({ ...defaultData, streak: data.streak })
  }

  return (
    <DailyProgressContext.Provider
      value={{
        data,
        updateData,
        addXP,
        incrementStreak,
        completeTask,
        incrementCombo,
        resetCombo,
        addAnswer,
        addTime,
        resetDay,
      }}
    >
      {children}
    </DailyProgressContext.Provider>
  )
}

export function useDailyProgress() {
  const context = useContext(DailyProgressContext)
  if (!context) {
    throw new Error('useDailyProgress must be used within DailyProgressProvider')
  }
  return context
}
