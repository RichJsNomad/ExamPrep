import { Group, Button, Stack, Text } from '@mantine/core'

interface Task {
  id: number
  status: 'completed' | 'skipped' | 'current'
}

interface TaskNavigatorProps {
  tasks: Task[]
  currentTask: number
  onTaskClick: (taskId: number) => void
}

export function TaskNavigator({ tasks, currentTask, onTaskClick }: TaskNavigatorProps) {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'current':
        return '●'
      case 'skipped':
        return '○'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'current':
        return 'blue'
      case 'skipped':
        return 'gray'
    }
  }

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500} c="dimmed">
        Навигация:
      </Text>
      <Group gap="xs" wrap="wrap">
        {tasks.map((task) => (
          <Stack key={task.id} gap={4} align="center">
            <Button
              variant={task.id === currentTask ? 'filled' : 'light'}
              color={getStatusColor(task.status)}
              size="sm"
              onClick={() => onTaskClick(task.id)}
              style={{
                width: '40px',
                height: '40px',
                padding: 0,
              }}
            >
              {task.id}
            </Button>
            <Text size="xs" c={getStatusColor(task.status)}>
              {getStatusIcon(task.status)}
            </Text>
          </Stack>
        ))}
      </Group>
    </Stack>
  )
}
