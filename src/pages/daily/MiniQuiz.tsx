import { Container, Stack, Title, Text, Group, Box } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuizQuestion } from '../../components/lesson/QuizQuestion'
import { useDailyProgress } from '../../context/DailyProgressContext'

const QUIZ_QUESTIONS = [
  {
    question: 'Чему равен D(f), если f(x) = √(x-2)?',
    options: ['(-∞; +∞)', '[2; +∞)', '(2; +∞)', '[0; +∞)'],
    correctAnswer: 1, // [2; +∞)
  },
  {
    question: 'Какая функция является четной?',
    options: ['f(x) = x³', 'f(x) = x²', 'f(x) = x', 'f(x) = x² + x'],
    correctAnswer: 1, // f(x) = x²
  },
  {
    question: 'Что такое область значений функции?',
    options: [
      'Множество всех x',
      'Множество всех y',
      'Множество всех точек',
      'Множество решений',
    ],
    correctAnswer: 1, // Множество всех y
  },
  {
    question: 'Функция f(x) = 2x + 3 является:',
    options: ['Квадратичной', 'Линейной', 'Степенной', 'Показательной'],
    correctAnswer: 1, // Линейной
  },
  {
    question: 'График функции f(x) = x² проходит через точку:',
    options: ['(1, 2)', '(2, 4)', '(2, 2)', '(1, 3)'],
    correctAnswer: 1, // (2, 4)
  },
]

export function MiniQuiz() {
  const navigate = useNavigate()
  const { addXP, addAnswer } = useDailyProgress()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      addXP(2) // +2 XP за правильный ответ
    }
    addAnswer(isCorrect)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Тест завершен
      navigate(`/daily/quiz-result?score=${correctAnswers + (isCorrect ? 1 : 0)}`)
    }
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="sm" align="center">
          <Title order={1}>Мини-тест — 5 вопросов</Title>
          <Text c="dimmed" size="lg">
            Вопрос {currentQuestion + 1} из {QUIZ_QUESTIONS.length}
          </Text>
          <Text size="sm" c="dimmed">
            +2 XP за правильный ответ
          </Text>
        </Stack>

        {/* Прогресс точками */}
        <Group justify="center" gap="xs">
          {QUIZ_QUESTIONS.map((_, index) => (
            <Box
              key={index}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor:
                  index < currentQuestion
                    ? '#9333EA'
                    : index === currentQuestion
                    ? '#2563EB'
                    : '#E9ECEF',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Group>

        <QuizQuestion
          question={QUIZ_QUESTIONS[currentQuestion].question}
          options={QUIZ_QUESTIONS[currentQuestion].options}
          correctAnswer={QUIZ_QUESTIONS[currentQuestion].correctAnswer}
          onAnswer={handleAnswer}
        />
      </Stack>
    </Container>
  )
}
