import { Card, Stack, Text, Progress, Group, Box } from '@mantine/core'

interface DayActivity {
  day: string
  hours: number
}

interface SubjectProgressCardProps {
  subject: string
  progress: number
  topicsCompleted: number
  totalTopics: number
  averageScore: number
  weekActivity: DayActivity[]
  classRanking?: string
}

export function SubjectProgressCard({
  subject,
  progress,
  topicsCompleted,
  totalTopics,
  averageScore,
  weekActivity,
  classRanking,
}: SubjectProgressCardProps) {
  const maxHours = Math.max(...weekActivity.map((d) => d.hours))

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          {subject}
        </Text>

        <div>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              Прогресс
            </Text>
            <Text size="sm" fw={600}>
              {progress}%
            </Text>
          </Group>
          <Progress value={progress} color="blue" size="lg" radius="md" />
        </div>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Тем пройдено:
          </Text>
          <Text size="sm" fw={600}>
            {topicsCompleted}/{totalTopics}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Ср. балл тестов:
          </Text>
          <Text size="sm" fw={600}>
            {averageScore}%
          </Text>
        </Group>

        {/* График активности */}
        <div>
          <Text size="sm" fw={500} mb="xs">
            📅 Активность:
          </Text>
          <Group gap="xs" align="flex-end">
            {weekActivity.map((day) => {
              const heightPercent = maxHours > 0 ? (day.hours / maxHours) * 100 : 0
              return (
                <Stack key={day.day} gap={4} align="center" style={{ flex: 1 }}>
                  <Box
                    style={{
                      width: '100%',
                      height: `${Math.max(heightPercent, 10)}px`,
                      maxHeight: '60px',
                      backgroundColor: 'var(--mantine-color-blue-6)',
                      borderRadius: '4px',
                    }}
                  />
                  <Text size="xs" c="dimmed">
                    {day.day}
                  </Text>
                </Stack>
              )
            })}
          </Group>
          <Text size="xs" c="dimmed" mt="xs">
            (высота = время)
          </Text>
        </div>

        {classRanking && (
          <Box p="sm" style={{ backgroundColor: 'var(--mantine-color-blue-0)', borderRadius: '8px' }}>
            <Text size="sm" fw={500} mb={4}>
              В сравнении с классом:
            </Text>
            <Text size="sm" c="dimmed">
              {classRanking}
            </Text>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
