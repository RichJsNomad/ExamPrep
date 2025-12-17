import { Container, Stack, Title, Text, Group, Box } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuizQuestion } from '../../components/lesson/QuizQuestion'
import { useLesson } from '../../context/LessonContext'

const PRACTICE_QUESTIONS = [
  {
    question: 'Сколько заданий в ЕГЭ по математике профильного уровня?',
    options: ['15', '19', '21', '25'],
    correctAnswer: 1, // 19
  },
  {
    question: 'Сколько времени дается на выполнение ЕГЭ по математике?',
    options: ['2 часа', '3 часа', '3 часа 55 минут', '4 часа'],
    correctAnswer: 2, // 3 часа 55 минут
  },
  {
    question: 'Какое максимальное количество баллов можно получить за ЕГЭ?',
    options: ['80', '90', '100', '110'],
    correctAnswer: 2, // 100
  },
]

export function LessonPractice() {
  const navigate = useNavigate()
  const { addXP, updateData } = useLesson()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      addXP(5) // +5 XP за правильный ответ
    }

    if (currentQuestion < PRACTICE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Практика завершена
      updateData({
        practiceCompleted: true,
        practiceScore: correctAnswers + (isCorrect ? 1 : 0),
      })
      addXP(15) // Бонус +15 XP за завершение
      navigate('/lesson/first/complete')
    }
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="sm" align="center">
          <Title order={1}>Закрепим за 2 минуты</Title>
          <Text c="dimmed" size="lg">
            Задача {currentQuestion + 1} из {PRACTICE_QUESTIONS.length}
          </Text>
        </Stack>

        {/* Прогресс точками */}
        <Group justify="center" gap="xs">
          {PRACTICE_QUESTIONS.map((_, index) => (
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
          question={PRACTICE_QUESTIONS[currentQuestion].question}
          options={PRACTICE_QUESTIONS[currentQuestion].options}
          correctAnswer={PRACTICE_QUESTIONS[currentQuestion].correctAnswer}
          onAnswer={handleAnswer}
        />

        <Text size="sm" ta="center" c="dimmed">
          Правильных ответов: {correctAnswers} из {currentQuestion + 1}
        </Text>
      </Stack>
    </Container>
  )
}
