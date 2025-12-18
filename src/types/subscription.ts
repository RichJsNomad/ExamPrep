export type PlanType = 'basic' | 'standard' | 'premium'
export type PaymentPeriod = 1 | 3 | 6 | 12

export interface Plan {
  id: PlanType
  name: string
  price: number
  features: string[]
  recommended?: boolean
  popularityText?: string
}

export interface PeriodOption {
  months: PaymentPeriod
  discount: number
  recommendedText?: string
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
}
