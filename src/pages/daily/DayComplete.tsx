import { Container, Stack, Title, Text, Button, Paper, Box, Group } from '@mantine/core'
import { IconTrophy, IconFlame } from '@tabler/icons-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDailyProgress } from '../../context/DailyProgressContext'
import { useEffect } from 'react'

export function DayComplete() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data, incrementStreak } = useDailyProgress()

  const correctAnswers = parseInt(searchParams.get('correct') || '0')
  const totalQuestions = 20
  const timeSpent = parseInt(searchParams.get('time') || '0')
  const bestCombo = parseInt(searchParams.get('combo') || '0')

  useEffect(() => {
    // Увеличиваем стрик при завершении дня
    incrementStreak()
  }, [incrementStreak])

  const handleBackHome = () => {
    navigate('/dashboard')
  }

  const handleContinue = () => {
    navigate('/daily/lesson')
  }

  return (
    <Container size="sm" py="xl">
      <Paper shadow="xl" p="xl" radius="lg">
        <Stack align="center" gap="xl">
          {/* Иконка трофея */}
          <Box
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            <IconTrophy size={60} color="white" />
          </Box>

          {/* Заголовок */}
          <Stack align="center" gap="sm">
            <Title order={1} c="orange.6">
              🏆 День завершён!
            </Title>
            <Text size="xl" fw={700} c="orange">
              +{data.todayXP} XP сегодня
            </Text>
          </Stack>

          {/* Стрик */}
          <Paper p="md" radius="md" bg="orange.0" withBorder style={{ width: '100%' }}>
            <Group justify="center" gap="sm">
              <IconFlame size={32} color="#F59E0B" />
              <Box>
                <Text size="sm" c="dimmed" ta="center">
                  Стрик
                </Text>
                <Text size="xl" fw={700} c="orange" ta="center">
                  {data.streak} дней!
                </Text>
              </Box>
            </Group>
          </Paper>

          {/* Статистика */}
          <Paper p="lg" radius="md" withBorder style={{ width: '100%' }}>
            <Stack gap="md">
              <Title order={4} ta="center">
                Статистика:
              </Title>

              <Group justify="space-between">
                <Text c="dimmed">Правильно:</Text>
                <Text fw={700} size="lg">
                  {correctAnswers}/{totalQuestions}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Время:</Text>
                <Text fw={700} size="lg">
                  {timeSpent} мин
                </Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Лучший комбо:</Text>
                <Text fw={700} size="lg" c="orange">
                  {bestCombo}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Задач выполнено:</Text>
                <Text fw={700} size="lg" c="green">
                  {data.tasksCompleted}/{data.totalTasks}
                </Text>
              </Group>
            </Stack>
          </Paper>

          {/* Кнопки действий */}
          <Stack gap="sm" style={{ width: '100%' }}>
            <Button size="lg" color="blue" onClick={handleBackHome} fullWidth>
              На главную
            </Button>

            <Button size="lg" variant="light" color="green" onClick={handleContinue} fullWidth>
              Позаниматься ещё
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
