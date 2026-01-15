import { Box, Card, Title, Button, Stack, Text, Badge } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import type { InteractiveQuestion } from '../../types/video'

interface InteractiveOverlayProps {
  question: InteractiveQuestion
  onAnswer: (questionId: string, selectedIndex: number, isCorrect: boolean) => void
}

export function InteractiveOverlay({ question, onAnswer }: InteractiveOverlayProps) {
  const handleAnswer = (index: number) => {
    const isCorrect = index === question.correctIndex
    onAnswer(question.id, index, isCorrect)
  }

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        backdropFilter: 'blur(4px)',
      }}
    >
      <Card p="xl" radius="lg" w={{ base: '95%', sm: 450, md: 500 }} shadow="xl">
        <Stack gap="lg">
          <Badge
            leftSection={<IconSparkles size={14} />}
            color="violet"
            size="lg"
            style={{ alignSelf: 'center' }}
          >
            +{question.xpReward || 10} XP за правильный ответ
          </Badge>

          <Title order={3} ta="center" size="h4">
            {question.question}
          </Title>

          <Stack gap="sm">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="md"
                onClick={() => handleAnswer(index)}
                fullWidth
                styles={{
                  root: {
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      borderColor: 'var(--mantine-color-blue-6)',
                    },
                  },
                }}
              >
                {option}
              </Button>
            ))}
          </Stack>

          <Text size="xs" c="dimmed" ta="center">
            Ответьте на вопрос, чтобы продолжить просмотр
          </Text>
        </Stack>
      </Card>
    </Box>
  )
}
