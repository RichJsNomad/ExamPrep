import { Card, Title, Text, Progress, Stack, Group, Badge, Divider } from '@mantine/core'
import { IconTrendingUp, IconClock, IconAlertTriangle } from '@tabler/icons-react'

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

          return (
            <div key={subject.subject}>
              <Group justify="space-between" mb={8}>
                <Text fw={600} size="sm">
                  {subject.subject}
                </Text>
                <Text size="sm" c="dimmed">
                  {subject.currentScore}/{subject.targetScore}
                </Text>
              </Group>
              <Progress.Root size="xl">
                <Progress.Section
                  value={progress}
                  color={subject.color}
                >
                  <Progress.Label>{progress}%</Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </div>
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
    </Card>
  )
}
