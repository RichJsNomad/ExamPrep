import { Container, SimpleGrid, Stack } from '@mantine/core'
import { WelcomeSection } from '../components/dashboard/WelcomeSection'
import { QuickStartCard } from '../components/dashboard/QuickStartCard'
import { DailyPlanCard } from '../components/dashboard/DailyPlanCard'
import { TodayPlanCard } from '../components/dashboard/TodayPlanCard'
import { GoalProgressCard } from '../components/dashboard/GoalProgressCard'
import { ContinueLearningCard } from '../components/dashboard/ContinueLearningCard'
import { AchievementsCard } from '../components/dashboard/AchievementsCard'
import { WeeklyChallengeCard } from '../components/dashboard/WeeklyChallengeCard'
import { useOnboarding } from '../context/OnboardingContext'
import { useDailyProgress } from '../context/DailyProgressContext'

export function StudentDashboard() {
  const { data: onboardingData } = useOnboarding()
  const { data: dailyData } = useDailyProgress()
  const userName = onboardingData.name || 'Иван'

  // Моковые данные для примера
  const todayTasks = [
    {
      id: '1',
      subject: 'Математика',
      description: 'Урок "Логарифмы"',
      completed: false,
    },
    {
      id: '2',
      subject: 'Русский',
      description: '20 задач (задание 9)',
      completed: false,
    },
    {
      id: '3',
      subject: 'Информатика',
      description: 'Тест пройден',
      completed: true,
    },
  ]

  // Задачи для DailyPlanCard
  const dailyTasks = [
    {
      id: '1',
      title: 'Урок: Функции',
      icon: '🎬',
      duration: '12 мин',
      completed: false,
      route: '/daily/lesson',
    },
    {
      id: '2',
      title: 'Практика',
      icon: '📝',
      duration: '20 задач',
      completed: false,
      route: '/daily/practice',
    },
    {
      id: '3',
      title: 'Мини-тест',
      icon: '✓',
      duration: '5 вопросов',
      completed: false,
      route: '/daily/quiz',
    },
  ]

  const recentAchievements = [
    {
      id: '1',
      icon: '🔥',
      title: 'Огонек (7 дней)',
      xp: 100,
      color: 'orange',
    },
    {
      id: '2',
      icon: '📚',
      title: '100 уроков пройдено',
      xp: 200,
      color: 'blue',
    },
  ]

  // Показываем QuickStartCard только для новых пользователей (streak === 0)
  const showQuickStart = dailyData.streak === 0

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        {/* Быстрый старт для нового пользователя */}
        {showQuickStart && (
          <QuickStartCard
            userName={userName}
            lessonTitle="Как работает ЕГЭ"
            lessonDuration={5}
            todayProgress={0}
          />
        )}

        {/* План на день (для постоянных пользователей) */}
        {!showQuickStart && (
          <DailyPlanCard
            streak={dailyData.streak}
            tasks={dailyTasks}
            progress={dailyData.todayProgress}
          />
        )}

        {/* Приветствие */}
        <WelcomeSection
          userName={userName}
          streak={dailyData.streak}
          level={1}
          levelName="Новичок"
        />

        {/* Сетка с карточками */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* План на сегодня */}
          <TodayPlanCard
            tasks={todayTasks}
            onTaskToggle={(id) => console.log('Toggle task:', id)}
          />

          {/* Прогресс до цели */}
          <GoalProgressCard
            universityName="МГУ"
            currentScore={210}
            targetScore={380}
          />
        </SimpleGrid>

        {/* Продолжить обучение */}
        <ContinueLearningCard
          subject="Математика"
          lessonTitle="Логарифмы"
          progress={67}
          subjectColor="blue"
        />

        {/* Вторая сетка */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* Последние достижения */}
          <AchievementsCard achievements={recentAchievements} />

          {/* Челлендж недели */}
          <WeeklyChallengeCard
            title="Математическая битва"
            description="Реши 100 задач по математике за 7 дней"
            currentProgress={34}
            totalGoal={100}
            rewards={{
              xp: 500,
              badge: 'Бейдж "Математик"',
              coins: 100,
            }}
          />
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
