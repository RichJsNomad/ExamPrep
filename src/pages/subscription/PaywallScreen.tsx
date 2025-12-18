import { Container, Stack, Title, Text, Button, Card, Group } from '@mantine/core'
import { IconCheck, IconLock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export function PaywallScreen() {
  const navigate = useNavigate()

  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        <IconLock size={80} color="var(--mantine-color-blue-6)" />

        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">
            Продолжай готовиться к ЕГЭ без ограничений
          </Title>
          <Text size="lg" c="dimmed">
            Открой доступ ко всем возможностям ExamPrep
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder w="100%">
          <Stack gap="md">
            <Group gap="xs">
              <IconCheck size={20} color="var(--mantine-color-green-6)" />
              <Text>Твой прогресс сохранён</Text>
            </Group>
            <Group gap="xs">
              <IconCheck size={20} color="var(--mantine-color-green-6)" />
              <Text>198 баллов → 285 цель</Text>
            </Group>
          </Stack>
        </Card>

        <Stack gap="md" w="100%">
          <Button
            size="xl"
            fullWidth
            onClick={() => navigate('/subscription/plans')}
          >
            Выбрать тариф
          </Button>
          <Button
            size="lg"
            variant="subtle"
            fullWidth
            c="dimmed"
            onClick={() => navigate('/dashboard')}
          >
            Продолжить бесплатно (с ограничениями)
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
