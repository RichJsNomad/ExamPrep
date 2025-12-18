import { Container, Stack, Title, Text, Button, Card } from '@mantine/core'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PaymentPeriodSelector } from '../../components/subscription/PaymentPeriodSelector'
import { PLANS } from '../../constants/subscription'
import type { PaymentPeriod as PaymentPeriodType } from '../../types/subscription'

export function PaymentPeriod() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || 'standard'

  const plan = PLANS.find((p) => p.id === planId) || PLANS[1]
  const [selectedPeriod, setSelectedPeriod] = useState<PaymentPeriodType>(12)

  const handleContinue = () => {
    navigate(`/subscription/payment?plan=${planId}&period=${selectedPeriod}`)
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Период оплаты
          </Title>
          <Text size="lg" c="dimmed">
            {plan.name} — {plan.price.toLocaleString('ru-RU')} ₽/мес
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <PaymentPeriodSelector
            selectedPeriod={selectedPeriod}
            basePrice={plan.price}
            onChange={setSelectedPeriod}
          />
        </Card>

        <Button size="xl" fullWidth onClick={handleContinue}>
          Продолжить
        </Button>
      </Stack>
    </Container>
  )
}
