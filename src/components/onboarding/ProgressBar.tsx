import { Box, Group, Text } from '@mantine/core'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <Box mb="xl">
      <Group justify="center" gap="xs" mb="xs">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Box
            key={index}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index < currentStep ? '#9333EA' : '#E9ECEF',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Group>
      <Text size="sm" ta="center" c="dimmed">
        {currentStep} из {totalSteps}
      </Text>
    </Box>
  )
}
