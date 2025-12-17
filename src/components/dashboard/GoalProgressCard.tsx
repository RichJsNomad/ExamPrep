import { Card, Title, Progress, Text, Group, Badge, Stack, RingProgress, Box } from '@mantine/core'
import { IconTrendingUp, IconTarget } from '@tabler/icons-react'

interface GoalProgressCardProps {
  universityName: string
  currentScore: number
  targetScore: number
}

export function GoalProgressCard({ universityName, currentScore, targetScore }: GoalProgressCardProps) {
  const progress = Math.round((currentScore / targetScore) * 100)
  const remaining = targetScore - currentScore

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--mantine-color-purple-2)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(147, 51, 234, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Group justify="space-between" mb="lg">
        <Group gap="xs">
          <IconTarget size={24} color="var(--mantine-color-purple-6)" />
          <div>
            <Title order={3} mb={4}>
              Прогресс до цели
            </Title>
            <Text size="sm" c="dimmed">
              {universityName}
            </Text>
          </div>
        </Group>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'purple', to: 'pink', deg: 90 }}
        >
          {progress}%
        </Badge>
      </Group>

      <Group align="center" mb="xl" gap="xl">
        {/* Кольцевой прогресс */}
        <RingProgress
          size={140}
          thickness={14}
          roundCaps
          sections={[
            {
              value: progress,
              color: progress >= 100 ? 'green' : progress >= 70 ? 'blue' : 'orange',
            },
          ]}
          label={
            <div style={{ textAlign: 'center' }}>
              <Text size="xl" fw={700} c={progress >= 100 ? 'green' : 'purple'}>
                {progress}%
              </Text>
              <Text size="xs" c="dimmed">
                готово
              </Text>
            </div>
          }
        />

        {/* Статистика */}
        <Stack gap="md" style={{ flex: 1 }}>
          <Box
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-blue-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid var(--mantine-color-blue-2)',
            }}
          >
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Текущий прогноз
              </Text>
              <Group gap={4}>
                <IconTrendingUp size={16} color="var(--mantine-color-blue-6)" />
                <Text size="lg" fw={700} c="blue">
                  {currentScore}
                </Text>
              </Group>
            </Group>
          </Box>

          <Box
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-purple-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid var(--mantine-color-purple-2)',
            }}
          >
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Целевой балл
              </Text>
              <Text size="lg" fw={700} c="purple">
                {targetScore}
              </Text>
            </Group>
          </Box>
        </Stack>
      </Group>

      <Progress
        value={progress}
        size="lg"
        radius="xl"
        color={progress >= 100 ? 'green' : progress >= 70 ? 'blue' : 'orange'}
        animated={progress < 100}
        style={{
          boxShadow: `0 2px 8px ${
            progress >= 100
              ? 'rgba(16, 185, 129, 0.3)'
              : progress >= 70
              ? 'rgba(37, 99, 235, 0.3)'
              : 'rgba(245, 158, 11, 0.3)'
          }`,
        }}
      />

      <Group justify="center" mt="lg">
        {progress >= 100 ? (
          <Badge size="lg" variant="light" color="green" leftSection="✅">
            Цель достигнута!
          </Badge>
        ) : (
          <Badge size="lg" variant="light" color="orange" leftSection="🎯">
            Осталось набрать: {remaining} баллов
          </Badge>
        )}
      </Group>
    </Card>
  )
}
