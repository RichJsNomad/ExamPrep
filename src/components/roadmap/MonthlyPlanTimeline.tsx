import { Card, Title, Timeline, Text } from '@mantine/core'
import { IconCheck, IconLoader, IconClock } from '@tabler/icons-react'

interface WeeklyTask {
  week: number
  title: string
  description: string
  status: 'completed' | 'in_progress' | 'planned'
}

interface MonthlyPlanTimelineProps {
  tasks: WeeklyTask[]
}

export function MonthlyPlanTimeline({ tasks }: MonthlyPlanTimelineProps) {
  const getIcon = (status: WeeklyTask['status']) => {
    switch (status) {
      case 'completed':
        return <IconCheck size={16} />
      case 'in_progress':
        return <IconLoader size={16} />
      case 'planned':
        return <IconClock size={16} />
    }
  }

  const getColor = (status: WeeklyTask['status']) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'in_progress':
        return 'blue'
      case 'planned':
        return 'gray'
    }
  }

  const getStatusEmoji = (status: WeeklyTask['status']) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'in_progress':
        return '🔄'
      case 'planned':
        return '⏳'
    }
  }

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Title order={2} mb="xl">
        📅 ПЛАН НА ЭТОТ МЕСЯЦ
      </Title>

      <Timeline active={tasks.findIndex(t => t.status === 'in_progress')} bulletSize={32} lineWidth={3}>
        {tasks.map((task) => (
          <Timeline.Item
            key={task.week}
            bullet={getIcon(task.status)}
            color={getColor(task.status)}
            title={
              <Text fw={600} size="md">
                {getStatusEmoji(task.status)} Неделя {task.week}: {task.title}
              </Text>
            }
          >
            <Text c="dimmed" size="sm" mt={4}>
              {task.description}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  )
}
