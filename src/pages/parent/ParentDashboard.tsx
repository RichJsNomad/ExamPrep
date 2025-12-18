import { Container, Stack, Title, Group, Button, SimpleGrid } from '@mantine/core'
import { IconChartBar, IconSparkles } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  WeeklySummaryCard,
  ExamForecastCard,
  PraiseModal,
} from '../../components/parent'
import { notifications } from '@mantine/notifications'

export function ParentDashboard() {
  const navigate = useNavigate()
  const [praiseModalOpened, setPraiseModalOpened] = useState(false)

  // Моковые данные
  const studentName = 'Миша'
  const studentGrade = '11 класс'

  const weeklyStats = {
    timeSpent: '4ч 35мин',
    lessonsCompleted: 12,
    tasksCompleted: 89,
    streak: 6,
  }

  const examForecast = [
    { subject: 'Мат', currentScore: 78, forecastScore: 82, change: 4 },
    { subject: 'Рус', currentScore: 85, forecastScore: 85, change: 0 },
    { subject: 'Физ', currentScore: 67, forecastScore: 71, change: 4 },
  ]

  const handleSendPraise = (sticker: string, xp: number) => {
    notifications.show({
      title: 'Похвала отправлена!',
      message: `${studentName} получит Push: "Папа отправил тебе ${sticker} и +${xp} XP!"`,
      color: 'green',
      icon: <IconSparkles size={18} />,
    })
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>
          👦 {studentName}, {studentGrade}
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <WeeklySummaryCard
            timeSpent={weeklyStats.timeSpent}
            lessonsCompleted={weeklyStats.lessonsCompleted}
            tasksCompleted={weeklyStats.tasksCompleted}
            streak={weeklyStats.streak}
          />

          <ExamForecastCard subjects={examForecast} />
        </SimpleGrid>

        <Group justify="center" gap="md">
          <Button
            variant="light"
            leftSection={<IconChartBar size={18} />}
            onClick={() => navigate('/parent/details')}
          >
            Подробная статистика
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
            onClick={() => setPraiseModalOpened(true)}
          >
            Похвалить 🎉
          </Button>
        </Group>
      </Stack>

      <PraiseModal
        opened={praiseModalOpened}
        onClose={() => setPraiseModalOpened(false)}
        onSend={handleSendPraise}
        studentName={studentName}
      />
    </Container>
  )
}
