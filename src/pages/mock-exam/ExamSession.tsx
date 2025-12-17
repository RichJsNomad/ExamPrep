import { Container, Stack, Card, Text, Group, Button, Divider, Box } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ExamTimer } from '../../components/mock-exam/ExamTimer'
import { TaskNavigator } from '../../components/mock-exam/TaskNavigator'
import { PauseModal } from '../../components/mock-exam/PauseModal'
import { BreakReminderModal } from '../../components/mock-exam/BreakReminderModal'
import { QuizQuestion } from '../../components/lesson/QuizQuestion'

export function ExamSession() {
  const navigate = useNavigate()
  const { subjectId, variantId } = useParams<{ subjectId: string; variantId: string }>()

  const [currentTask, setCurrentTask] = useState(7)
  const [isPaused, setIsPaused] = useState(false)
  const [pauseModalOpened, setPauseModalOpened] = useState(false)
  const [breakReminderOpened, setBreakReminderOpened] = useState(false)

  // Моковые данные задач
  const tasks = Array.from({ length: 19 }, (_, i) => ({
    id: i + 1,
    status: (i + 1 < 7 ? 'completed' : i + 1 === 7 ? 'current' : 'skipped') as 'completed' | 'current' | 'skipped',
  }))

  const handlePause = () => {
    setIsPaused(true)
    setPauseModalOpened(true)
  }

  const handleResume = () => {
    setIsPaused(false)
    setPauseModalOpened(false)
  }

  const handleExitAndSave = () => {
    navigate('/dashboard')
  }

  const handleTakeBreak = () => {
    setBreakReminderOpened(false)
    setIsPaused(true)
    // Здесь можно добавить таймер на 5 минут
  }

  const handleComplete = () => {
    navigate(`/mock-exam/${subjectId}-${variantId}/preliminary`)
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        {/* Верхняя панель */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Group justify="space-between">
            <ExamTimer
              initialTime={14100} // 3ч 55мин = 235 мин = 14100 сек
              isPaused={isPaused}
              onTimeUp={handleComplete}
            />
            <Text size="lg" fw={600}>
              Задание {currentTask} из 19
            </Text>
          </Group>
        </Card>

        {/* Основной контент - демо вопрос */}
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <Box
              p="lg"
              style={{
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
              }}
            >
              <Text size="lg" fw={500}>
                Решите уравнение: log₂(x+3) = 5
              </Text>
            </Box>

            <QuizQuestion
              question="Чему равен x?"
              options={['29', '32', '35', '13']}
              correctAnswer={0}
              onAnswer={(isCorrect) => console.log('Answer:', isCorrect)}
            />
          </Stack>
        </Card>

        {/* Навигация */}
        <Group justify="space-between">
          <Button
            variant="light"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => setCurrentTask((prev) => Math.max(1, prev - 1))}
            disabled={currentTask === 1}
          >
            Назад
          </Button>

          <Button
            variant="light"
            rightSection={<IconArrowRight size={18} />}
            onClick={() => setCurrentTask((prev) => Math.min(19, prev + 1))}
            disabled={currentTask === 19}
          >
            Вперёд
          </Button>
        </Group>

        <Divider />

        {/* Навигация по заданиям */}
        <TaskNavigator
          tasks={tasks}
          currentTask={currentTask}
          onTaskClick={setCurrentTask}
        />

        <Divider />

        {/* Нижняя панель */}
        <Group justify="center" gap="md">
          <Button variant="light" onClick={handlePause} color="orange">
            ⏸ Пауза
          </Button>
          <Button variant="outline" onClick={handleComplete} color="red">
            Завершить
          </Button>
        </Group>
      </Stack>

      {/* Модальные окна */}
      <PauseModal
        opened={pauseModalOpened}
        onClose={() => setPauseModalOpened(false)}
        onResume={handleResume}
        onExitAndSave={handleExitAndSave}
      />

      <BreakReminderModal
        opened={breakReminderOpened}
        onClose={() => setBreakReminderOpened(false)}
        onTakeBreak={handleTakeBreak}
      />
    </Container>
  )
}
