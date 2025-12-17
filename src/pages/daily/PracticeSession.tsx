import { Container, Stack, Title, Progress, Group, Text, Box, Paper } from '@mantine/core'
import { IconFlame } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PracticeQuestion } from '../../components/practice/PracticeQuestion'
import { useDailyProgress } from '../../context/DailyProgressContext'

const PRACTICE_QUESTIONS = [
  { question: 'Решите уравнение: 2x + 5 = 13', answer: '4' },
  { question: 'Найдите значение: 3² + 4²', answer: '25' },
  { question: 'Вычислите: √64', answer: '8' },
  { question: 'Решите: 5x - 3 = 12', answer: '3' },
  { question: 'Найдите: 2 × 3 + 4 × 5', answer: '26' },
  { question: 'Вычислите: 100 - 37', answer: '63' },
  { question: 'Решите: x/2 = 8', answer: '16' },
  { question: 'Найдите: 15% от 200', answer: '30' },
  { question: 'Вычислите: 2³', answer: '8' },
  { question: 'Решите: 3x = 21', answer: '7' },
  { question: 'Найдите: 7 × 8', answer: '56' },
  { question: 'Вычислите: 144 / 12', answer: '12' },
  { question: 'Решите: x + 15 = 30', answer: '15' },
  { question: 'Найдите: 50% от 80', answer: '40' },
  { question: 'Вычислите: 5 + 5 × 5', answer: '30' },
  { question: 'Решите: 2(x + 3) = 14', answer: '4' },
  { question: 'Найдите: √36', answer: '6' },
  { question: 'Вычислите: 10²', answer: '100' },
  { question: 'Решите: 4x - 8 = 8', answer: '4' },
  { question: 'Найдите: 20% от 150', answer: '30' },
]

export function PracticeSession() {
  const navigate = useNavigate()
  const { data, addXP, completeTask, addTime } = useDailyProgress()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [startTime] = useState(Date.now())

  const progress = Math.round(((currentQuestion + 1) / PRACTICE_QUESTIONS.length) * 100)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      addXP(3) // +3 XP за правильный ответ
    }

    // Бонус за комбо
    if (data.combo >= 4) {
      addXP(data.combo * 2) // +8 XP за комбо 4+
    }

    if (currentQuestion < PRACTICE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Практика завершена
      const timeSpent = Math.round((Date.now() - startTime) / 60000) // минуты
      addTime(timeSpent)
      completeTask()
      navigate(
        `/daily/day-complete?correct=${correctAnswers + (isCorrect ? 1 : 0)}&time=${timeSpent}&combo=${data.bestCombo}`
      )
    }
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Заголовок */}
        <Stack gap="sm" align="center">
          <Title order={1}>Практика — Функции</Title>
          <Text size="lg" c="dimmed">
            Задача {currentQuestion + 1} из {PRACTICE_QUESTIONS.length}
          </Text>
        </Stack>

        {/* Прогресс-бар */}
        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={500}>
              Прогресс
            </Text>
            <Text size="sm" fw={700} c="blue">
              {progress}%
            </Text>
          </Group>
          <Progress value={progress} size="lg" radius="xl" color="blue" />
        </Box>

        {/* Комбо индикатор */}
        {data.combo >= 2 && (
          <Paper p="md" radius="md" bg="orange.0" withBorder>
            <Group gap="xs" justify="center">
              <IconFlame size={24} color="#F59E0B" />
              <Text size="lg" fw={700} c="orange">
                Комбо: {data.combo} подряд! +{data.combo * 2} XP
              </Text>
            </Group>
          </Paper>
        )}

        {/* Вопрос */}
        <PracticeQuestion
          question={PRACTICE_QUESTIONS[currentQuestion].question}
          correctAnswer={PRACTICE_QUESTIONS[currentQuestion].answer}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={PRACTICE_QUESTIONS.length}
        />
      </Stack>
    </Container>
  )
}
