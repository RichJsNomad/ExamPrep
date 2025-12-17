import { Card, Title, Progress, Text, Group } from '@mantine/core'

interface GoalProgressCardProps {
  universityName: string
  currentScore: number
  targetScore: number
}

export function GoalProgressCard({ universityName, currentScore, targetScore }: GoalProgressCardProps) {
  const progress = Math.round((currentScore / targetScore) * 100)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        📊 Прогресс до цели ({universityName}):
      </Title>
      <Progress.Root size="xl">
        <Progress.Section value={progress} color="blue">
          <Progress.Label>
            {currentScore}/{targetScore} баллов ({progress}%)
          </Progress.Label>
        </Progress.Section>
      </Progress.Root>
      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          Текущий прогноз: {currentScore} баллов
        </Text>
        <Text size="sm" fw={500} c={progress >= 100 ? 'green' : 'orange'}>
          {progress >= 100 ? '✅ Цель достигнута!' : `До цели: ${targetScore - currentScore} баллов`}
        </Text>
      </Group>
    </Card>
  )
}
