import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface LessonData {
  currentLesson: string
  videoWatched: boolean
  practiceCompleted: boolean
  practiceScore: number
  earnedXP: number
  earnedBadges: string[]
}

interface LessonContextType {
  data: LessonData
  updateData: (updates: Partial<LessonData>) => void
  resetData: () => void
  addXP: (amount: number) => void
  addBadge: (badge: string) => void
}

const LessonContext = createContext<LessonContextType | undefined>(undefined)

const initialData: LessonData = {
  currentLesson: 'first',
  videoWatched: false,
  practiceCompleted: false,
  practiceScore: 0,
  earnedXP: 0,
  earnedBadges: [],
}

export function LessonProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LessonData>(initialData)

  const updateData = (updates: Partial<LessonData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData(initialData)
  }

  const addXP = (amount: number) => {
    setData((prev) => ({ ...prev, earnedXP: prev.earnedXP + amount }))
  }

  const addBadge = (badge: string) => {
    setData((prev) => ({
      ...prev,
      earnedBadges: [...prev.earnedBadges, badge],
    }))
  }

  return (
    <LessonContext.Provider value={{ data, updateData, resetData, addXP, addBadge }}>
      {children}
    </LessonContext.Provider>
  )
}

export function useLesson() {
  const context = useContext(LessonContext)
  if (context === undefined) {
    throw new Error('useLesson must be used within LessonProvider')
  }
  return context
}
