import { Card, Stack, Title, Text, Button, Progress, Box, Group } from '@mantine/core'
import { IconFlame, IconPlayerPlay, IconCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface Task {
  id: string
  title: string
  icon: string
  duration: string
  completed: boolean
  route: string
}

interface DailyPlanCardProps {
  streak: number
  tasks: Task[]
  progress: number
}

export function DailyPlanCard({ streak, tasks, progress }: DailyPlanCardProps) {
  const navigate = useNavigate()

  const currentTask = tasks.find((task) => !task.completed)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* Заголовок с стриком */}
        <Group justify="space-between">
          <Title order={3}>План на день</Title>
          <Group gap="xs">
            <IconFlame size={24} color="#F59E0B" />
            <Text size="lg" fw={700} c="orange">
              {streak} дней
            </Text>
          </Group>
        </Group>

        {/* Список задач */}
        <Stack gap="sm">
          {tasks.map((task) => (
            <Box
              key={task.id}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #E9ECEF',
                backgroundColor: task.completed ? '#F8F9FA' : 'white',
              }}
            >
              <Group justify="space-between">
                <Group gap="sm">
                  <Text size="xl">{task.icon}</Text>
                  <Box>
                    <Text fw={500} size="md" td={task.completed ? 'line-through' : undefined}>
                      {task.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {task.duration}
                    </Text>
                  </Box>
                </Group>

                {task.completed ? (
                  <IconCheck size={24} color="#10B981" />
                ) : currentTask?.id === task.id ? (
                  <Button
                    leftSection={<IconPlayerPlay size={16} />}
                    onClick={() => navigate(task.route)}
                    size="sm"
                  >
                    Начать
                  </Button>
                ) : (
                  <Box
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: '2px solid #E9ECEF',
                    }}
                  />
                )}
              </Group>
            </Box>
          ))}
        </Stack>

        {/* Прогресс-бар */}
        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={500}>
              Прогресс дня
            </Text>
            <Text size="sm" fw={700} c="blue">
              {progress}%
            </Text>
          </Group>
          <Progress value={progress} size="lg" radius="xl" color="blue" />
        </Box>
      </Stack>
    </Card>
  )
}
