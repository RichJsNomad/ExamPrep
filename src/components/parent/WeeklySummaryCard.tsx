import { Card, Stack, Group, Text, SimpleGrid } from '@mantine/core'
import { IconClock, IconBook, IconChecklist, IconFlame } from '@tabler/icons-react'

interface WeeklyStat {
  icon: typeof IconClock
  label: string
  value: string
  color: string
}

interface WeeklySummaryCardProps {
  timeSpent: string
  lessonsCompleted: number
  tasksCompleted: number
  streak: number
}

export function WeeklySummaryCard({
  timeSpent,
  lessonsCompleted,
  tasksCompleted,
  streak,
}: WeeklySummaryCardProps) {
  const stats: WeeklyStat[] = [
    { icon: IconClock, label: 'Время', value: timeSpent, color: 'blue' },
    { icon: IconBook, label: 'Уроков', value: String(lessonsCompleted), color: 'purple' },
    { icon: IconChecklist, label: 'Задач', value: String(tasksCompleted), color: 'green' },
    { icon: IconFlame, label: 'Стрик', value: `${streak} дней`, color: 'orange' },
  ]

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Эта неделя:
        </Text>

        <SimpleGrid cols={2} spacing="md">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Group key={stat.label} gap="xs">
                <Icon size={20} color={`var(--mantine-color-${stat.color}-6)`} />
                <Stack gap={0}>
                  <Text size="sm" c="dimmed">
                    {stat.label}
                  </Text>
                  <Text size="md" fw={600}>
                    {stat.value}
                  </Text>
                </Stack>
              </Group>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Card>
  )
}
