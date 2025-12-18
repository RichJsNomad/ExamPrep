import { Container, Stack, Title, Text, SimpleGrid } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { PricingCard } from '../../components/subscription/PricingCard'
import { PLANS } from '../../constants/subscription'

export function PricingPlans() {
  const navigate = useNavigate()

  const handleSelectPlan = (planId: string) => {
    navigate(`/subscription/period?plan=${planId}`)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">
            Выбери свой тариф
          </Title>
          <Text size="lg" c="dimmed">
            Начни готовиться к ЕГЭ эффективно
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
