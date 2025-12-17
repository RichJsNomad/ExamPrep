import { Stack, Text, TextInput, Button, Group, Paper, Box } from '@mantine/core'
import { IconBulb, IconBook } from '@tabler/icons-react'
import { useState } from 'react'

interface PracticeQuestionProps {
  question: string
  correctAnswer: string
  onAnswer: (isCorrect: boolean) => void
  questionNumber: number
  totalQuestions: number
}

export function PracticeQuestion({
  question,
  correctAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: PracticeQuestionProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const handleSubmit = () => {
    // Простая проверка (убираем пробелы и приводим к нижнему регистру)
    const normalizedUserAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase()
    const correct = normalizedUserAnswer === normalizedCorrectAnswer

    setIsCorrect(correct)
    setShowResult(true)

    // Через 1.5 секунды переходим к следующему вопросу
    setTimeout(() => {
      onAnswer(correct)
      setUserAnswer('')
      setShowResult(false)
      setShowHint(false)
      setShowSolution(false)
    }, 1500)
  }

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <Stack gap="lg">
        {/* Номер задачи */}
        <Text size="sm" c="dimmed" fw={500}>
          Задача {questionNumber} из {totalQuestions}
        </Text>

        {/* Условие задачи */}
        <Box
          style={{
            padding: '16px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
          }}
        >
          <Text size="lg" fw={500}>
            {question}
          </Text>
        </Box>

        {/* Поле ввода ответа */}
        <TextInput
          label="Ваш ответ"
          placeholder="Введите ответ"
          size="lg"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.currentTarget.value)}
          disabled={showResult}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userAnswer.trim() !== '') {
              handleSubmit()
            }
          }}
        />

        {/* Результат проверки */}
        {showResult && (
          <Paper
            p="md"
            radius="md"
            bg={isCorrect ? 'green.0' : 'red.0'}
            style={{ border: `2px solid ${isCorrect ? '#10B981' : '#EF4444'}` }}
          >
            <Text size="lg" fw={600} c={isCorrect ? 'green.7' : 'red.7'} ta="center">
              {isCorrect ? '✓ Правильно!' : '✗ Неверно'}
            </Text>
            {!isCorrect && (
              <Text size="sm" c="dimmed" ta="center" mt="xs">
                Правильный ответ: {correctAnswer}
              </Text>
            )}
          </Paper>
        )}

        {/* Кнопки действий */}
        {!showResult && (
          <Group gap="md" grow>
            <Button
              variant="light"
              leftSection={<IconBulb size={20} />}
              onClick={() => setShowHint(!showHint)}
              color="yellow"
            >
              Подсказка
            </Button>

            <Button
              variant="light"
              leftSection={<IconBook size={20} />}
              onClick={() => setShowSolution(!showSolution)}
              color="blue"
            >
              Решение
            </Button>
          </Group>
        )}

        {/* Подсказка */}
        {showHint && !showResult && (
          <Paper p="md" radius="md" bg="yellow.0" withBorder>
            <Text size="sm" fw={500} c="yellow.9" mb="xs">
              💡 Подсказка:
            </Text>
            <Text size="sm" c="dimmed">
              Внимательно прочитайте условие и используйте основные формулы
            </Text>
          </Paper>
        )}

        {/* Решение */}
        {showSolution && !showResult && (
          <Paper p="md" radius="md" bg="blue.0" withBorder>
            <Text size="sm" fw={500} c="blue.9" mb="xs">
              📖 Решение:
            </Text>
            <Text size="sm" c="dimmed">
              Правильный ответ: {correctAnswer}
            </Text>
          </Paper>
        )}

        {/* Кнопка отправки */}
        {!showResult && (
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={userAnswer.trim() === ''}
            fullWidth
          >
            Проверить
          </Button>
        )}
      </Stack>
    </Paper>
  )
}
