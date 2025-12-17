import { Card, Group, Text, Stack, Button } from '@mantine/core'
import { IconCalendarPlus } from '@tabler/icons-react'

interface DayStatus {
  day: string
  status: 'completed' | 'today' | 'planned'
}

interface WeekCalendarProps {
  weekDays: DayStatus[]
  onAddToCalendar: () => void
}

export function WeekCalendar({ weekDays, onAddToCalendar }: WeekCalendarProps) {
  const getStatusIcon = (status: DayStatus['status']) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'today':
        return '●'
      case 'planned':
        return '○'
    }
  }

  const getStatusColor = (status: DayStatus['status']) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'today':
        return 'blue'
      case 'planned':
        return 'gray'
    }
  }

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Stack gap="md">
        <Text size="sm" fw={600} c="dimmed">
          📅 Эта неделя:
        </Text>

        <Group gap="lg" justify="center">
          {weekDays.map((day) => (
            <Stack key={day.day} gap={4} align="center">
              <Text
                size="lg"
                c={getStatusColor(day.status)}
                style={{ fontWeight: 600 }}
              >
                {getStatusIcon(day.status)}
              </Text>
              <Text size="xs" c="dimmed">
                {day.day}
              </Text>
            </Stack>
          ))}
        </Group>

        <Button
          variant="light"
          leftSection={<IconCalendarPlus size={18} />}
          onClick={onAddToCalendar}
          fullWidth
        >
          Добавить в календарь
        </Button>
      </Stack>
    </Card>
  )
}
