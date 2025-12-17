import { Container, Stack } from '@mantine/core'
import { useState } from 'react'
import {
  TargetUniversityCard,
  CurrentProgressCard,
  MonthlyPlanTimeline,
  BackupUniversitiesCard,
  AIAdvisorCard,
  UniversityDetailModal
} from '../components/roadmap'

// Типы данных
interface UniversityDetail {
  id: string
  name: string
  faculty: string
  city: string
  passingScore: number
  budgetPlaces: number
  tuitionFee?: number
  dormitory: boolean
  rating: number
  description: string
}

export function AIRoadmap() {
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityDetail | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Mock данные - целевой вуз
  const targetUniversity = {
    name: 'МГУ',
    faculty: 'Факультет ВМК (Вычислительная математика и кибернетика)',
    city: 'Москва',
    budgetPlaces: 650,
    passingScore: 380,
    year: 2024,
  }

  // Mock данные - прогресс по предметам
  const subjectsProgress = [
    { subject: 'Русский язык', currentScore: 68, targetScore: 100, color: 'blue' },
    { subject: 'Математика', currentScore: 72, targetScore: 100, color: 'green' },
    { subject: 'Информатика', currentScore: 67, targetScore: 100, color: 'purple' },
  ]

  // Mock данные - план на месяц
  const monthlyTasks = [
    {
      week: 1,
      title: 'Интенсив по информатике',
      description: 'Алгоритмы и структуры данных, задания 24-27',
      status: 'completed' as const,
    },
    {
      week: 2,
      title: 'Математика (задания 13-15)',
      description: 'Тригонометрия и стереометрия',
      status: 'in_progress' as const,
    },
    {
      week: 3,
      title: 'Русский язык (сочинение)',
      description: 'Структура и аргументация сочинения ЕГЭ',
      status: 'planned' as const,
    },
    {
      week: 4,
      title: 'Пробный ЕГЭ (все предметы)',
      description: 'Полная симуляция экзамена',
      status: 'planned' as const,
    },
  ]

  // Mock данные - запасные вузы
  const backupUniversities = [
    { id: '1', name: 'МФТИ', passingScore: 365, chanceLevel: 'high' as const },
    { id: '2', name: 'ВШЭ (Высшая школа экономики)', passingScore: 355, chanceLevel: 'medium' as const },
    { id: '3', name: 'СПбГУ (Санкт-Петербургский государственный университет)', passingScore: 350, chanceLevel: 'medium' as const },
  ]

  // Mock данные - детали вузов
  const universitiesDetails: Record<string, UniversityDetail> = {
    '1': {
      id: '1',
      name: 'МФТИ',
      faculty: 'Факультет инноваций и высоких технологий',
      city: 'Москва (Долгопрудный)',
      passingScore: 365,
      budgetPlaces: 450,
      tuitionFee: 450000,
      dormitory: true,
      rating: 95,
      description: 'Московский физико-технический институт - ведущий технический вуз России. Известен сильной подготовкой в области физики, математики и информационных технологий. Выпускники МФТИ высоко востребованы в IT-компаниях и научных центрах.'
    },
    '2': {
      id: '2',
      name: 'ВШЭ',
      faculty: 'Факультет компьютерных наук',
      city: 'Москва',
      passingScore: 355,
      budgetPlaces: 320,
      tuitionFee: 520000,
      dormitory: true,
      rating: 92,
      description: 'Высшая школа экономики - современный университет с сильной программой по компьютерным наукам. Акцент на практическом применении знаний, тесные связи с IT-индустрией.'
    },
    '3': {
      id: '3',
      name: 'СПбГУ',
      faculty: 'Факультет математики и компьютерных наук',
      city: 'Санкт-Петербург',
      passingScore: 350,
      budgetPlaces: 280,
      tuitionFee: 380000,
      dormitory: true,
      rating: 90,
      description: 'Санкт-Петербургский государственный университет - один из старейших вузов России. Сильная математическая школа и качественное образование в области компьютерных наук.'
    }
  }

  // Совет от ИИ
  const aiAdvice = `Иван, ты отлично справляешься! За последнюю неделю твой прогноз вырос на 5 баллов.

Рекомендую уделить больше внимания русскому языку - это самый простой способ набрать дополнительные баллы. Предлагаю пройти интенсив по сочинению на следующей неделе.

Твоя текущая траектория приведет тебя к ~215 баллам к концу месяца. Продолжай в том же духе! 🚀`

  const handleUniversityClick = (id: string) => {
    setSelectedUniversity(universitiesDetails[id])
    setModalOpened(true)
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        {/* Hero секция - Целевой вуз */}
        <TargetUniversityCard
          universityName={targetUniversity.name}
          faculty={targetUniversity.faculty}
          city={targetUniversity.city}
          budgetPlaces={targetUniversity.budgetPlaces}
          passingScore={targetUniversity.passingScore}
          year={targetUniversity.year}
          onChangeTarget={() => console.log('Change target university')}
        />

        {/* Текущий прогресс */}
        <CurrentProgressCard
          totalCurrentScore={207}
          totalTargetScore={380}
          subjects={subjectsProgress}
          daysUntilExam={245}
        />

        {/* План на месяц */}
        <MonthlyPlanTimeline tasks={monthlyTasks} />

        {/* Запасные варианты */}
        <BackupUniversitiesCard
          universities={backupUniversities}
          onUniversityClick={handleUniversityClick}
        />

        {/* ИИ-советник */}
        <AIAdvisorCard
          advice={aiAdvice}
          onAskQuestion={() => console.log('Ask AI question')}
        />
      </Stack>

      {/* Модалка с деталями вуза */}
      <UniversityDetailModal
        university={selectedUniversity}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSetAsTarget={(id) => console.log('Set as target:', id)}
      />
    </Container>
  )
}
