import { Container, Stack, Title, Text, Button, Card, List, TextInput, Group } from '@mantine/core'
import { IconX, IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAYMENT_METHODS } from '../../constants/subscription'

export function PaymentError() {
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState('')

  const reasons = [
    'Недостаточно средств',
    'Карта заблокирована',
    'Лимит превышен',
  ]

  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: 'var(--mantine-color-red-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconX size={60} color="var(--mantine-color-red-6)" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">
            ❌ Оплата не прошла
          </Title>
          <Text size="lg" c="dimmed">
            Проверьте данные и попробуйте снова
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder w="100%">
          <Stack gap="lg">
            <div>
              <Group gap="xs" mb="md">
                <IconAlertCircle size={20} color="var(--mantine-color-orange-6)" />
                <Text fw={600}>Возможные причины:</Text>
              </Group>
              <List size="sm" c="dimmed">
                {reasons.map((reason, index) => (
                  <List.Item key={index}>{reason}</List.Item>
                ))}
              </List>
            </div>

            <div>
              <Text fw={600} mb="md">
                Попробуйте:
              </Text>
              <Stack gap="sm">
                <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
                  Другая карта
                </Button>
                <Group grow>
                  {PAYMENT_METHODS.filter(m => m.id !== 'card').slice(0, 2).map((method) => (
                    <Button key={method.id} variant="outline">
                      {method.icon} {method.name}
                    </Button>
                  ))}
                </Group>
              </Stack>
            </div>

            <div>
              <Text fw={600} mb="xs">
                Промокод:
              </Text>
              <Group>
                <TextInput
                  placeholder="Введите промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.currentTarget.value)}
                  style={{ flex: 1 }}
                />
                <Button variant="light">Применить</Button>
              </Group>
            </div>
          </Stack>
        </Card>

        <Stack gap="sm" w="100%">
          <Button
            size="xl"
            fullWidth
            onClick={() => navigate(-1)}
          >
            Повторить попытку
          </Button>
          <Button
            variant="subtle"
            fullWidth
            onClick={() => navigate('/support')}
          >
            Написать в поддержку
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
