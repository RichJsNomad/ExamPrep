import { Card, Stack, Text, Group, Badge } from '@mantine/core'
import { IconArrowUp, IconMinus } from '@tabler/icons-react'

interface SubjectForecast {
  subject: string
  currentScore: number
  forecastScore: number
  change: number
}

interface ExamForecastCardProps {
  subjects: SubjectForecast[]
}

export function ExamForecastCard({ subjects }: ExamForecastCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Прогноз ЕГЭ:
        </Text>

        <Stack gap="sm">
          {subjects.map((subject) => {
            const hasChange = subject.change !== 0
            const changeColor = subject.change > 0 ? 'green' : 'gray'

            return (
              <Group key={subject.subject} justify="space-between">
                <Text size="sm">{subject.subject}</Text>
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    {subject.currentScore} → {subject.forecastScore}
                  </Text>
                  {hasChange ? (
                    <Badge
                      size="sm"
                      color={changeColor}
                      variant="light"
                      leftSection={
                        subject.change > 0 ? <IconArrowUp size={12} /> : <IconMinus size={12} />
                      }
                    >
                      {subject.change > 0 ? '+' : ''}
                      {subject.change}
                    </Badge>
                  ) : (
                    <Badge size="sm" color="gray" variant="light">
                      без изм.
                    </Badge>
                  )}
                </Group>
              </Group>
            )
          })}
        </Stack>
      </Stack>
    </Card>
  )
}
