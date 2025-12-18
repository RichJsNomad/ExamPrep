import type { Plan, PeriodOption, PaymentMethod } from '../types/subscription'

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Базовый',
    price: 3990,
    features: [
      '1 предмет на выбор',
      'Базовый ИИ-роадмап',
      'Видеоуроки',
      'Родительский контроль',
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    price: 6990,
    features: [
      '3 предмета на выбор',
      'Полный ИИ-роадмап',
      'Пробные экзамены (безлимит)',
      'Групповые вебинары',
      'Родительский контроль',
    ],
    recommended: true,
    popularityText: '87% учеников выбирают его',
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 12990,
    features: [
      'Все предметы (безлимит)',
      'VIP ИИ-роадмап',
      'Пробные экзамены (безлимит)',
      'Персональный куратор',
      'Приоритетная проверка заданий',
      'Индивидуальный план',
    ],
  },
]

export const PERIOD_OPTIONS: PeriodOption[] = [
  { months: 1, discount: 0 },
  { months: 3, discount: 10 },
  { months: 6, discount: 20 },
  { months: 12, discount: 40, recommendedText: 'До ЕГЭ как раз!' },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Банковская карта', icon: '💳' },
  { id: 'sbp', name: 'СБП', icon: '🏦' },
  { id: 'tinkoff', name: 'Tinkoff рассрочка', icon: '📱' },
  { id: 'sber', name: 'Оплата частями Сбер', icon: '💰' },
]

export function calculatePrice(basePrice: number, months: number, discount: number): number {
  const totalPrice = basePrice * months
  return totalPrice * (1 - discount / 100)
}

export function calculateSavings(basePrice: number, months: number, discount: number): number {
  const totalPrice = basePrice * months
  const discountedPrice = calculatePrice(basePrice, months, discount)
  return totalPrice - discountedPrice
}
