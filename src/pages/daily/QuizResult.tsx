import { Container, Stack, Title, Text, Button, Paper, Box } from '@mantine/core'
import { IconTrophy, IconThumbUp, IconMoodSad } from '@tabler/icons-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDailyProgress } from '../../context/DailyProgressContext'
import { useEffect } from 'react'

export function QuizResult() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addXP } = useDailyProgress()
  const score = parseInt(searchParams.get('score') || '0')

  useEffect(() => {
    // Начисляем бонусный XP в зависимости от результата
    if (score === 5) {
      addXP(15) // +15 XP за идеальный результат
    } else if (score >= 3) {
      addXP(10) // +10 XP за хороший результат
    }
  }, [score, addXP])

  const handleToPractice = () => {
    navigate('/daily/practice')
  }

  const handleReviewErrors = () => {
    console.log('Review errors')
  }

  const handleRetryVideo = () => {
    navigate('/daily/lesson')
  }

  // 5 из 5 - Идеально
  if (score === 5) {
    return (
      <Container size="sm" py="xl">
        <Paper shadow="xl" p="xl" radius="lg">
          <Stack align="center" gap="xl">
            <Box
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconTrophy size={50} color="white" />
            </Box>

            <Stack align="center" gap="sm">
              <Title order={1} c="green.6">
                🎉 Идеально!
              </Title>
              <Text size="xl" fw={500} c="green">
                +15 XP бонус
              </Text>
              <Text size="lg" c="dimmed">
                Все 5 ответов правильные!
              </Text>
            </Stack>

            <Button size="lg" color="green" onClick={handleToPractice} fullWidth>
              К практике →
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  // 3-4 из 5 - Хорошо
  if (score >= 3) {
    return (
      <Container size="sm" py="xl">
        <Paper shadow="xl" p="xl" radius="lg">
          <Stack align="center" gap="xl">
            <Box
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconThumbUp size={50} color="white" />
            </Box>

            <Stack align="center" gap="sm">
              <Title order={1} c="blue.6">
                👍 Хорошо!
              </Title>
              <Text size="xl" fw={500} c="blue">
                +10 XP
              </Text>
              <Text size="lg" c="dimmed">
                Правильных ответов: {score} из 5
              </Text>
            </Stack>

            <Stack gap="md" style={{ width: '100%' }}>
              <Text size="sm" c="dimmed" ta="center">
                Ошибки в вопросах: {[1, 2, 3, 4, 5].filter((_, i) => i >= score).join(', ')}
              </Text>

              <Button variant="light" onClick={handleReviewErrors} fullWidth>
                Посмотреть разбор
              </Button>

              <Button size="lg" color="blue" onClick={handleToPractice} fullWidth>
                К практике →
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    )
  }

  // 0-2 из 5 - Нужно разобраться
  return (
    <Container size="sm" py="xl">
      <Paper shadow="xl" p="xl" radius="lg">
        <Stack align="center" gap="xl">
          <Box
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconMoodSad size={50} color="white" />
          </Box>

          <Stack align="center" gap="sm">
            <Title order={1} c="orange.6">
              Давай разберёмся 💪
            </Title>
            <Text size="lg" c="dimmed">
              Правильных ответов: {score} из 5
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Не переживай! Давай повторим материал
            </Text>
          </Stack>

          <Stack gap="sm" style={{ width: '100%' }}>
            <Text size="md" fw={500} ta="center" mb="xs">
              Что хочешь сделать?
            </Text>

            <Button variant="light" color="blue" onClick={handleRetryVideo} fullWidth>
              Пересмотреть видео
            </Button>

            <Button variant="light" color="violet" onClick={handleReviewErrors} fullWidth>
              Мини-урок по ошибкам
            </Button>

            <Button variant="light" color="grape" onClick={() => console.log('Ask AI')} fullWidth>
              Спросить ИИ-помощника
            </Button>

            <Button color="orange" onClick={handleToPractice} fullWidth>
              Пропустить к практике
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
