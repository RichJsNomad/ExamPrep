import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface OnboardingData {
  name: string
  grade: string
  examType: 'ЕГЭ' | 'ОГЭ' | ''
  subjects: string[]
}

interface OnboardingContextType {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  resetData: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const initialData: OnboardingData = {
  name: '',
  grade: '',
  examType: '',
  subjects: [],
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(initialData)

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData(initialData)
  }

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
