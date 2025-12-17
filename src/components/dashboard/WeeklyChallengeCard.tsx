import { Card, Title, Text, Progress, Group, Badge, Stack } from '@mantine/core'

interface WeeklyChallengeCardProps {
  title: string
  description: string
  currentProgress: number
  totalGoal: number
  rewards: {
    xp: number
    badge: string
    coins: number
  }
}

export function WeeklyChallengeCard({
  title,
  description,
  currentProgress,
  totalGoal,
  rewards
}: WeeklyChallengeCardProps) {
  const progress = Math.round((currentProgress / totalGoal) * 100)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="sm">
        🎮 Челлендж недели:
      </Title>

      <Stack gap="md">
        <div>
          <Text fw={600} size="lg" mb={4}>
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>

        <div>
          <Group justify="space-between" mb={8}>
            <Text size="sm" fw={500}>
              Прогресс: {currentProgress}/{totalGoal} задач
            </Text>
            <Badge variant="light" color={progress >= 100 ? 'green' : 'blue'}>
              {progress}%
            </Badge>
          </Group>
          <Progress
            value={progress}
            color={progress >= 100 ? 'green' : 'blue'}
            size="lg"
            animated={progress < 100}
          />
        </div>

        <Card p="sm" withBorder style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
          <Text size="xs" c="dimmed" mb={4}>
            Награда:
          </Text>
          <Group gap="xs">
            <Badge variant="light" color="purple" size="sm">
              {rewards.xp} XP
            </Badge>
            <Badge variant="light" color="orange" size="sm">
              {rewards.badge}
            </Badge>
            <Badge variant="light" color="yellow" size="sm">
              {rewards.coins} монет
            </Badge>
          </Group>
        </Card>
      </Stack>
    </Card>
  )
}
