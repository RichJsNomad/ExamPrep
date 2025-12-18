import { Radio, Stack, Text, Group, Badge } from '@mantine/core'
import type { PaymentPeriod } from '../../types/subscription'
import { PERIOD_OPTIONS, calculatePrice, calculateSavings } from '../../constants/subscription'

interface PaymentPeriodSelectorProps {
  selectedPeriod: PaymentPeriod
  basePrice: number
  onChange: (period: PaymentPeriod) => void
}

export function PaymentPeriodSelector({
  selectedPeriod,
  basePrice,
  onChange,
}: PaymentPeriodSelectorProps) {
  return (
    <Radio.Group value={String(selectedPeriod)} onChange={(value) => onChange(Number(value) as PaymentPeriod)}>
      <Stack gap="md">
        {PERIOD_OPTIONS.map((option) => {
          const totalPrice = calculatePrice(basePrice, option.months, option.discount)
          const savings = calculateSavings(basePrice, option.months, option.discount)

          return (
            <Radio
              key={option.months}
              value={String(option.months)}
              label={
                <Group justify="space-between" w="100%" wrap="nowrap">
                  <div>
                    <Text fw={500}>
                      {option.months} {option.months === 1 ? 'месяц' : option.months <= 4 ? 'месяца' : 'месяцев'}
                    </Text>
                    {option.discount > 0 && (
                      <Text size="xs" c="green">
                        Экономия: {savings.toLocaleString('ru-RU')} ₽ ({option.discount}%)
                      </Text>
                    )}
                    {option.recommendedText && (
                      <Badge size="sm" variant="light" color="blue" mt={4}>
                        {option.recommendedText}
                      </Badge>
                    )}
                  </div>
                  <Text fw={600}>{totalPrice.toLocaleString('ru-RU')} ₽</Text>
                </Group>
              }
              styles={{
                body: { width: '100%' },
                labelWrapper: { width: '100%' },
              }}
            />
          )
        })}
      </Stack>
    </Radio.Group>
  )
}
