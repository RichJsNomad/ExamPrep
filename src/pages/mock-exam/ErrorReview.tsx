import { Container, Stack, Title, Card, Text, Button, Badge, Divider } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

export function ErrorReview() {
  // Моковые данные ошибок
  const errors = [
    {
      id: 4,
      userAnswer: '15',
      correctAnswer: '12',
      topic: 'Производная',
      recommendation: 'повторить урок 12',
    },
    {
      id: 7,
      userAnswer: '29',
      correctAnswer: '32',
      topic: 'Логарифмы',
      recommendation: 'повторить урок 8',
    },
  ]

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>Разбор ошибок</Title>

        <Stack gap="lg">
          {errors.map((error) => (
            <Card key={error.id} shadow="md" padding="xl" radius="md" withBorder>
              <Stack gap="md">
                <Badge
                  size="lg"
                  variant="light"
                  color="red"
                  leftSection={<IconX size={18} />}
                >
                  Задание {error.id} — ❌ Неверно
                </Badge>

                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Твой ответ: <Text component="span" fw={600} c="red">{error.userAnswer}</Text>
                  </Text>
                  <Text size="sm" c="dimmed">
                    Правильный ответ: <Text component="span" fw={600} c="green">{error.correctAnswer}</Text>
                  </Text>
                </Stack>

                <Stack gap="xs">
                  <Button variant="light" fullWidth>
                    Показать решение
                  </Button>
                  <Button variant="outline" fullWidth>
                    Похожие задачи
                  </Button>
                </Stack>

                <Divider />

                <div>
                  <Text size="sm" fw={600} mb="xs">
                    Тема: {error.topic}
                  </Text>
                  <Text size="sm" c="dimmed" mb="md">
                    Рекомендация: {error.recommendation}
                  </Text>
                  <Button variant="light" size="sm" color="blue">
                    Добавить в план
                  </Button>
                </div>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
