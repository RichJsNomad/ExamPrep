import { Container, Stack, Title, Text, Button, Card, List, Group } from '@mantine/core'
import { IconCheck, IconGift } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export function PaymentSuccess() {
  const navigate = useNavigate()

  const features = [
    '3 предмета',
    'Пробные ЕГЭ',
    'ИИ-роадмап',
    'Вебинары',
  ]

  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: 'var(--mantine-color-green-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconCheck size={60} color="var(--mantine-color-green-6)" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">
            🎉 Добро пожаловать в Стандарт!
          </Title>
          <Text size="lg" c="dimmed">
            Оплата прошла успешно
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder w="100%">
          <Stack gap="lg">
            <div>
              <Text fw={600} mb="md">
                Теперь тебе доступно:
              </Text>
              <List
                spacing="sm"
                icon={<IconCheck size={18} color="var(--mantine-color-green-6)" />}
              >
                {features.map((feature, index) => (
                  <List.Item key={index}>{feature}</List.Item>
                ))}
              </List>
            </div>

            <Card bg="blue.0" padding="md">
              <Group gap="xs">
                <IconGift size={24} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text fw={600} c="blue">
                    Бонус: +100 XP 🎁
                  </Text>
                  <Text size="sm" c="dimmed">
                    Спасибо за доверие!
                  </Text>
                </div>
              </Group>
            </Card>
          </Stack>
        </Card>

        <Button
          size="xl"
          fullWidth
          onClick={() => navigate('/dashboard')}
        >
          Продолжить обучение
        </Button>
      </Stack>
    </Container>
  )
}
