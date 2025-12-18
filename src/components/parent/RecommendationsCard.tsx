import { Card, Stack, Text, Button, Group } from '@mantine/core'

interface Recommendation {
  type: 'success' | 'warning' | 'info'
  icon: string
  message: string
}

interface RecommendationsCardProps {
  recommendations: Recommendation[]
  onRemind?: () => void
  onPraise?: () => void
  onMessage?: () => void
}

export function RecommendationsCard({
  recommendations,
  onRemind,
  onPraise,
  onMessage,
}: RecommendationsCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="lg">
        <Text size="lg" fw={600}>
          Рекомендации
        </Text>

        <Stack gap="md">
          {recommendations.map((rec, index) => (
            <Group key={index} gap="xs" align="flex-start">
              <Text size="lg">{rec.icon}</Text>
              <Text size="sm" style={{ flex: 1 }}>
                {rec.message}
              </Text>
            </Group>
          ))}
        </Stack>

        <div>
          <Text size="sm" fw={600} mb="xs">
            Действия:
          </Text>
          <Stack gap="xs">
            {onRemind && (
              <Button variant="light" fullWidth onClick={onRemind}>
                Напомнить про физику
              </Button>
            )}
            {onPraise && (
              <Button variant="light" fullWidth color="green" onClick={onPraise}>
                Похвалить за стрик 🎉
              </Button>
            )}
            {onMessage && (
              <Button variant="outline" fullWidth onClick={onMessage}>
                Написать сообщение
              </Button>
            )}
          </Stack>
        </div>
      </Stack>
    </Card>
  )
}
