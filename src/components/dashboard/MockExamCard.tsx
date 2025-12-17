import { Card, Title, Text, Button, Stack } from '@mantine/core'
import { IconFileText } from '@tabler/icons-react'

interface MockExamCardProps {
  onStartClick: () => void
}

export function MockExamCard({ onStartClick }: MockExamCardProps) {
  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--mantine-color-orange-2)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(245, 158, 11, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Stack gap="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconFileText size={32} color="var(--mantine-color-orange-6)" />
          <Title order={3}>📝 Пробный ЕГЭ</Title>
        </div>

        <Text c="dimmed">Проверь готовность к экзамену</Text>

        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'red', deg: 90 }}
          size="md"
          fullWidth
          onClick={onStartClick}
        >
          Пройти
        </Button>
      </Stack>
    </Card>
  )
}
