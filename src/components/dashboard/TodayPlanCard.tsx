import { Card, Title, Checkbox, Stack, Text, Group, Badge, Box, Progress } from '@mantine/core'
import { IconTarget } from '@tabler/icons-react'

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
  const completedCount = tasks.filter(t => t.completed).length
  const progressPercent = Math.round((completedCount / tasks.length) * 100)

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--mantine-color-blue-2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <IconTarget size={24} color="var(--mantine-color-blue-6)" />
          <Title order={3}>
            Твой план на сегодня
          </Title>
        </Group>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          {completedCount}/{tasks.length}
        </Badge>
      </Group>

      <Progress
        value={progressPercent}
        size="sm"
        radius="xl"
        mb="lg"
        color={progressPercent === 100 ? 'green' : 'blue'}
        animated={progressPercent < 100}
        style={{
          boxShadow: `0 2px 8px ${progressPercent === 100 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`,
        }}
      />

      <Stack gap="md">
        {tasks.map((task) => (
          <Box
            key={task.id}
            p="sm"
            style={{
              backgroundColor: task.completed ? 'var(--mantine-color-gray-0)' : 'var(--mantine-color-blue-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: `1px solid ${task.completed ? 'var(--mantine-color-gray-2)' : 'var(--mantine-color-blue-2)'}`,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = task.completed ? 'var(--mantine-color-gray-1)' : 'var(--mantine-color-blue-1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = task.completed ? 'var(--mantine-color-gray-0)' : 'var(--mantine-color-blue-0)'
            }}
          >
            <Group wrap="nowrap" align="flex-start">
              <Checkbox
                checked={task.completed}
                onChange={() => onTaskToggle?.(task.id)}
                color={task.completed ? 'green' : 'blue'}
                size="md"
                mt={2}
                variant="outline"
              />
              <div style={{ flex: 1 }}>
                <Text
                  fw={600}
                  size="sm"
                  td={task.completed ? 'line-through' : undefined}
                  c={task.completed ? 'dimmed' : undefined}
                  mb={4}
                >
                  {task.subject}
                </Text>
                <Text
                  size="xs"
                  c="dimmed"
                  td={task.completed ? 'line-through' : undefined}
                >
                  {task.description}
                </Text>
              </div>
              {task.completed && (
                <Text size="xl" style={{ lineHeight: 1 }}>
                  ✅
                </Text>
              )}
            </Group>
          </Box>
        ))}
      </Stack>
    </Card>
  )
}
