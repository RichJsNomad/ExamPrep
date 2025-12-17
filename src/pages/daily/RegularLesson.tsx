import { Container, Stack, Title, Text, Button, Paper, Group, Box } from '@mantine/core'
import { IconFileText, IconMessageCircle } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VideoPlayer } from '../../components/lesson/VideoPlayer'
import { useDailyProgress } from '../../context/DailyProgressContext'

export function RegularLesson() {
  const navigate = useNavigate()
  const { addXP } = useDailyProgress()
  const [videoCompleted, setVideoCompleted] = useState(false)

  const handleVideoComplete = () => {
    setVideoCompleted(true)
    addXP(5)
  }

  const handleContinue = () => {
    navigate('/daily/quiz')
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Заголовок урока */}
        <Box>
          <Title order={1} mb="xs">
            Функции и графики
          </Title>
          <Text c="dimmed" size="lg">
            Изучим основные понятия о функциях и построение графиков
          </Text>
        </Box>

        {/* Видео плеер */}
        <VideoPlayer duration={720} onComplete={handleVideoComplete} />

        {/* Материалы к уроку */}
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Stack gap="md">
            <Title order={4}>Материалы к уроку</Title>

            <Group gap="md">
              <Button
                variant="light"
                leftSection={<IconFileText size={20} />}
                color="blue"
                onClick={() => console.log('Download PDF')}
              >
                Конспект (PDF)
              </Button>

              <Button
                variant="light"
                leftSection={<IconMessageCircle size={20} />}
                color="violet"
                onClick={() => console.log('Ask AI')}
              >
                Задать вопрос ИИ
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Награда за просмотр */}
        {videoCompleted && (
          <Paper shadow="sm" p="md" radius="md" withBorder bg="green.0">
            <Stack gap="sm" align="center">
              <Text size="lg" fw={500} c="green">
                Отлично! +5 XP за просмотр урока
              </Text>
              <Button size="lg" color="green" onClick={handleContinue} fullWidth>
                Продолжить к мини-тесту
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  )
}
