import { Card, Stack, Title, Radio, Button } from '@mantine/core'
import { useState } from 'react'

interface QuizQuestionProps {
  question: string
  options: string[]
  correctAnswer: number
  onAnswer: (isCorrect: boolean) => void
}

export function QuizQuestion({ question, options, correctAnswer, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    const selectedIndex = options.indexOf(selectedAnswer || '')
    const isCorrect = selectedIndex === correctAnswer
    setShowResult(true)

    setTimeout(() => {
      onAnswer(isCorrect)
      setShowResult(false)
      setSelectedAnswer(null)
    }, 1000)
  }

  const getResultColor = () => {
    if (!showResult) return 'blue'
    const selectedIndex = options.indexOf(selectedAnswer || '')
    return selectedIndex === correctAnswer ? 'green' : 'red'
  }

  return (
    <Card shadow="md" padding="xl" radius="lg">
      <Stack gap="xl">
        <Title order={3}>{question}</Title>

        <Radio.Group
          value={selectedAnswer}
          onChange={setSelectedAnswer}
        >
          <Stack gap="md">
            {options.map((option, index) => (
              <Radio
                key={index}
                value={option}
                label={option}
                size="md"
                disabled={showResult}
                color={showResult && index === correctAnswer ? 'green' : undefined}
              />
            ))}
          </Stack>
        </Radio.Group>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!selectedAnswer || showResult}
          color={getResultColor()}
          fullWidth
        >
          {showResult
            ? options.indexOf(selectedAnswer || '') === correctAnswer
              ? '✓ Правильно!'
              : '✗ Неправильно'
            : 'Ответить'}
        </Button>
      </Stack>
    </Card>
  )
}
