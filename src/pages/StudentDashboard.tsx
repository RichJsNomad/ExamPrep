import { Container, SimpleGrid, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { WelcomeSection } from '../components/dashboard/WelcomeSection'
import { TodayPlanCard } from '../components/dashboard/TodayPlanCard'
import { GoalProgressCard } from '../components/dashboard/GoalProgressCard'
import { ContinueLearningCard } from '../components/dashboard/ContinueLearningCard'
import { AchievementsCard } from '../components/dashboard/AchievementsCard'
import { WeeklyChallengeCard } from '../components/dashboard/WeeklyChallengeCard'
import { useOnboarding } from '../context/OnboardingContext'
import { useDailyProgress } from '../context/DailyProgressContext'

export function StudentDashboard() {
  const navigate = useNavigate()
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

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
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
