import { Card, Stack, Text, Button, Badge, List, Group } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useState } from 'react'
import type { Plan } from '../../types/subscription'

interface PricingCardProps {
  plan: Plan
  onSelect: (planId: string) => void
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  const [isSelected, setIsSelected] = useState(plan.recommended || false)

  const handleSelect = () => {
    setIsSelected(true)
    onSelect(plan.id)
  }

  return (
    <Card
      shadow="md"
      padding="xl"
      radius="md"
      withBorder
      style={{
        border: isSelected ? '2px solid var(--mantine-color-blue-6)' : undefined,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={handleSelect}
    >
      <Stack gap="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div>
          <Text size="xl" fw={700} mb="xs">
            {plan.name}
          </Text>
          <Text size="sm" c="dimmed" mb="md" style={{ minHeight: '20px' }}>
            {plan.popularityText}
          </Text>
          <Group align="baseline" gap={4}>
            <Text size="2rem" fw={700}>
              {plan.price.toLocaleString('ru-RU')} ₽
            </Text>
            <Text size="md" c="dimmed">
              /месяц
            </Text>
          </Group>
        </div>

        <List
          spacing="sm"
          size="sm"
          icon={<IconCheck size={18} color="var(--mantine-color-green-6)" />}
          style={{ flex: 1 }}
        >
          {plan.features.map((feature, index) => (
            <List.Item key={index}>{feature}</List.Item>
          ))}
        </List>

        <Button
          fullWidth
          size="lg"
          variant={isSelected ? 'filled' : 'outline'}
          onClick={(e) => {
            e.stopPropagation()
            handleSelect()
          }}
        >
          Выбрать
        </Button>
      </Stack>
    </Card>
  )
}
