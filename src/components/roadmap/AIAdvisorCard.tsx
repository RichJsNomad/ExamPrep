import { Card, Title, Text, Button, Box, Stack } from '@mantine/core'
import { IconMessageChatbot, IconSparkles } from '@tabler/icons-react'

interface AIAdvisorCardProps {
  advice: string
  onAskQuestion?: () => void
}

export function AIAdvisorCard({ advice, onAskQuestion }: AIAdvisorCardProps) {
  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      style={{
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.15) 100%)',
        borderColor: 'var(--mantine-color-purple-3)',
      }}
    >
      <Stack gap="lg">
        <Box>
          <Title order={2} mb="xs">
            💬 ИИ-СОВЕТНИК
          </Title>
          <Text size="xs" c="dimmed">
            Персональные рекомендации на основе твоего прогресса
          </Text>
        </Box>

        <Box
          p="md"
          style={{
            background: 'white',
            borderRadius: '12px',
            border: '2px solid var(--mantine-color-purple-2)',
            position: 'relative',
          }}
        >
          <IconSparkles
            size={24}
            color="var(--mantine-color-purple-6)"
            style={{
              position: 'absolute',
              top: -12,
              left: 16,
              background: 'white',
              padding: '0 8px',
            }}
          />

          <Text size="sm" style={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {advice}
          </Text>
        </Box>

        {onAskQuestion && (
          <Button
            variant="light"
            color="purple"
            size="md"
            leftSection={<IconMessageChatbot size={20} />}
            onClick={onAskQuestion}
            fullWidth
          >
            💬 Задать вопрос ИИ
          </Button>
        )}
      </Stack>
    </Card>
  )
}
