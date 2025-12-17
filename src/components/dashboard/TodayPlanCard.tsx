import { Card, Title, Checkbox, Stack, Text, Group } from '@mantine/core'

interface Task {
  id: string
  subject: string
  description: string
  completed: boolean
}

interface TodayPlanCardProps {
  tasks: Task[]
  onTaskToggle?: (taskId: string) => void
}

export function TodayPlanCard({ tasks, onTaskToggle }: TodayPlanCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        🎯 Твой план на сегодня:
      </Title>
      <Stack gap="sm">
        {tasks.map((task) => (
          <Group key={task.id} wrap="nowrap" align="flex-start">
            <Checkbox
              checked={task.completed}
              onChange={() => onTaskToggle?.(task.id)}
              color={task.completed ? 'green' : 'blue'}
              size="md"
              mt={2}
            />
            <div style={{ flex: 1 }}>
              <Text
                fw={500}
                size="sm"
                td={task.completed ? 'line-through' : undefined}
                c={task.completed ? 'dimmed' : undefined}
              >
                {task.subject}: {task.description}
              </Text>
            </div>
            {task.completed && <Text size="sm">✅</Text>}
          </Group>
        ))}
      </Stack>
    </Card>
  )
}
