import { Card, Title, Text, Progress, Stack, Group, Badge, Divider, Button, Box } from '@mantine/core'
import { IconTrendingUp, IconClock, IconAlertTriangle, IconRefresh } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

interface SubjectProgress {
  subject: string
  currentScore: number
  targetScore: number
  color: string
}

interface CurrentProgressCardProps {
  totalCurrentScore: number
  totalTargetScore: number
  subjects: SubjectProgress[]
  daysUntilExam: number
}

export function CurrentProgressCard({
  totalCurrentScore,
  totalTargetScore,
  subjects,
  daysUntilExam
}: CurrentProgressCardProps) {
  const scoreGap = totalTargetScore - totalCurrentScore
  const isOnTrack = scoreGap <= 50

  const handleRecalculate = () => {
    notifications.show({
      title: 'План пересчитан',
      message: 'Ваш персональный план обновлён на основе текущих результатов',
      color: 'blue',
      icon: <IconRefresh size={18} />,
    })
  }

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Group justify="space-between" mb="lg">
        <Title order={2}>
          📈 ТВОЙ ТЕКУЩИЙ ПРОГНОЗ
        </Title>
        <Badge
          size="xl"
          variant="light"
          color={isOnTrack ? 'green' : 'orange'}
          leftSection={<IconTrendingUp size={18} />}
        >
          {totalCurrentScore} баллов
        </Badge>
      </Group>

      <Divider mb="lg" />

      <Stack gap="lg">
        {subjects.map((subject) => {
          const progress = Math.round((subject.currentScore / subject.targetScore) * 100)
          const isWeak = progress < 60

          return (
            <Box
              key={subject.subject}
              p={isWeak ? 'md' : 0}
              style={
                isWeak
                  ? {
                      backgroundColor: 'var(--mantine-color-red-0)',
                      borderRadius: 'var(--mantine-radius-md)',
                      border: '2px solid var(--mantine-color-red-3)',
                    }
                  : undefined
              }
            >
              <Group justify="space-between" mb={8}>
                <Group gap="xs">
                  <Text fw={600} size="sm">
                    {subject.subject}
                  </Text>
                  {isWeak && (
                    <Badge color="red" variant="light" size="sm" leftSection="⚠️">
                      Нужно ускориться
                    </Badge>
                  )}
                </Group>
                <Text size="sm" c="dimmed">
                  {subject.currentScore}/{subject.targetScore}
                </Text>
              </Group>
              <Progress.Root size="xl">
                <Progress.Section
                  value={progress}
                  color={isWeak ? 'red' : subject.color}
                >
                  <Progress.Label>{progress}%</Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </Box>
          )
        })}
      </Stack>

      <Divider my="lg" />

      <Group justify="space-between" wrap="wrap">
        <Group gap="xs">
          {scoreGap > 0 ? (
            <>
              <IconAlertTriangle size={20} color="var(--mantine-color-orange-6)" />
              <Text fw={600} c="orange">
                До цели: {scoreGap} баллов
              </Text>
            </>
          ) : (
            <>
              <IconTrendingUp size={20} color="var(--mantine-color-green-6)" />
              <Text fw={600} c="green">
                ✅ Цель достигнута!
              </Text>
            </>
          )}
        </Group>

        <Group gap="xs">
          <IconClock size={20} color="var(--mantine-color-blue-6)" />
          <Text fw={500}>
            ⏰ До ЕГЭ: <Text component="span" fw={700} c="blue">{daysUntilExam} дней</Text>
          </Text>
        </Group>
      </Group>

      <Divider my="lg" />

      <Button
        variant="light"
        leftSection={<IconRefresh size={18} />}
        onClick={handleRecalculate}
        fullWidth
        size="md"
      >
        Пересчитать план
      </Button>
    </Card>
  )
}
