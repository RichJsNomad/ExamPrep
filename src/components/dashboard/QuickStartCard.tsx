import { Card, Title, Text, Button, Stack, Group, Progress } from '@mantine/core'
import { IconPlayerPlay, IconClock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface QuickStartCardProps {
  userName: string
  lessonTitle: string
  lessonDuration: number
  todayProgress: number
}

export function QuickStartCard({
  userName,
  lessonTitle,
  lessonDuration,
  todayProgress,
}: QuickStartCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      shadow="md"
      padding="xl"
      radius="lg"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Stack gap="lg">
        <Title order={2} size="h3">
          👋 Привет, {userName}!
        </Title>

        <Card
          padding="lg"
          radius="md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack gap="md">
            <Text size="sm" fw={600} opacity={0.9}>
              Твой первый урок:
            </Text>

            <Title order={3} size="h4" c="white">
              {lessonTitle}
            </Title>

            <Group gap="xs">
              <IconClock size={18} />
              <Text size="sm">{lessonDuration} мин</Text>
            </Group>

            <Button
              size="lg"
              color="orange"
              leftSection={<IconPlayerPlay size={20} />}
              onClick={() => navigate('/lesson/first')}
              fullWidth
              style={{
                fontWeight: 700,
              }}
            >
              Начать
            </Button>
          </Stack>
        </Card>

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" opacity={0.9}>
              Прогресс сегодня:
            </Text>
            <Text size="sm" fw={700}>
              {todayProgress}%
            </Text>
          </Group>
          <Progress
            value={todayProgress}
            size="lg"
            radius="xl"
            color="orange"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Stack>
      </Stack>
    </Card>
  )
}
