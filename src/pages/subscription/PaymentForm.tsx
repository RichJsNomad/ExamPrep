import { Container, Stack, Title, Text, Button, Card, TextInput, Checkbox, Group, Divider } from '@mantine/core'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PLANS, PERIOD_OPTIONS, calculatePrice, PAYMENT_METHODS } from '../../constants/subscription'
import type { PaymentPeriod } from '../../types/subscription'

export function PaymentForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || 'standard'
  const period = Number(searchParams.get('period') || 12) as PaymentPeriod

  const plan = PLANS.find((p) => p.id === planId) || PLANS[1]
  const periodOption = PERIOD_OPTIONS.find((p) => p.months === period) || PERIOD_OPTIONS[3]
  const totalPrice = calculatePrice(plan.price, period, periodOption.discount)

  const [autoRenew, setAutoRenew] = useState(false)
  const [cardNumber, setCardNumber] = useState('')

  const handlePayment = () => {
    // Симуляция оплаты (в реальности здесь будет интеграция с платежной системой)
    const success = Math.random() > 0.2 // 80% успеха для демо

    if (success) {
      navigate('/subscription/success')
    } else {
      navigate('/subscription/error')
    }
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Оплата
          </Title>
          <Text size="lg" c="dimmed">
            {plan.name}, {period} {period === 1 ? 'месяц' : period <= 4 ? 'месяца' : 'месяцев'}
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <div>
              <Text size="sm" c="dimmed" mb="xs">
                Итого к оплате:
              </Text>
              <Text size="2rem" fw={700}>
                {totalPrice.toLocaleString('ru-RU')} ₽
              </Text>
            </div>

            <Divider />

            <div>
              <Text fw={600} mb="md">
                Способ оплаты:
              </Text>

              <Stack gap="md">
                <div>
                  <Text size="sm" fw={500} mb="xs">
                    💳 Банковская карта
                  </Text>
                  <TextInput
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.currentTarget.value)}
                    mb="sm"
                  />
                  <Group grow>
                    <TextInput placeholder="MM/YY" />
                    <TextInput placeholder="CVV" />
                  </Group>
                </div>

                <Divider label="Или" labelPosition="center" />

                <Group grow>
                  {PAYMENT_METHODS.filter(m => m.id !== 'card').map((method) => (
                    <Button key={method.id} variant="outline" size="sm">
                      {method.icon} {method.name}
                    </Button>
                  ))}
                </Group>
              </Stack>
            </div>

            <Checkbox
              label="Автопродление подписки"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.currentTarget.checked)}
            />

            <Button size="xl" fullWidth onClick={handlePayment}>
              Оплатить {totalPrice.toLocaleString('ru-RU')} ₽
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}
