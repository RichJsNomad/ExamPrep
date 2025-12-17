import { Card, Title, Stack, Group, Text, Button, Checkbox } from '@mantine/core'
import { IconRocket } from '@tabler/icons-react'

interface Task {
  id: string
  subject: string
  description: string
  completed: boolean
}

interface TodayRoadmapTasksProps {
  tasks: Task[]
  onStart: () => void
}

export function TodayRoadmapTasks({ tasks, onStart }: TodayRoadmapTasksProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group gap="xs">
          <Text size="xl">⚡</Text>
          <Title order={3}>СЕГОДНЯ</Title>
        </Group>

        <Stack gap="sm">
          {tasks.map((task) => (
            <Group key={task.id} gap="sm" wrap="nowrap">
              <Checkbox
                checked={task.completed}
                readOnly
                size="md"
                styles={{
                  input: {
                    cursor: 'default',
                  },
                }}
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {task.subject}
                </Text>
                <Text size="xs" c="dimmed">
                  {task.description}
                </Text>
              </div>
            </Group>
          ))}
        </Stack>

        <Button
          leftSection={<IconRocket size={18} />}
          onClick={onStart}
          fullWidth
          size="md"
        >
          Начать →
        </Button>
      </Stack>
    </Card>
  )
}
