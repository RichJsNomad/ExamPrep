import { Container, Title, Stack, Card, Text, Badge, Button, Group } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'

interface Variant {
  id: string
  name: string
  difficulty: string
  status: 'new' | 'completed'
  score?: number
}

const VARIANTS: Record<string, Variant[]> = {
  math: [
    { id: '1', name: 'Вариант 1 (новый)', difficulty: 'средняя', status: 'new' },
    { id: '2', name: 'Вариант 2', difficulty: 'средняя', status: 'completed', score: 78 },
    { id: 'demo-2025', name: 'Демо ЕГЭ 2025', difficulty: 'официальный', status: 'new' },
  ],
  russian: [
    { id: '1', name: 'Вариант 1 (новый)', difficulty: 'средняя', status: 'new' },
    { id: 'demo-2025', name: 'Демо ЕГЭ 2025', difficulty: 'официальный', status: 'new' },
  ],
  physics: [
    { id: '1', name: 'Вариант 1 (новый)', difficulty: 'средняя', status: 'new' },
    { id: 'demo-2025', name: 'Демо ЕГЭ 2025', difficulty: 'официальный', status: 'new' },
  ],
}

export function VariantSelection() {
  const navigate = useNavigate()
  const { subjectId } = useParams<{ subjectId: string }>()

  const variants = VARIANTS[subjectId || 'math'] || []
  const subjectNames: Record<string, string> = {
    math: 'Математика профиль',
    russian: 'Русский язык',
    physics: 'Физика',
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>{subjectNames[subjectId || 'math']}</Title>
        <Text c="dimmed">Выбери вариант экзамена</Text>

        <Stack gap="md">
          {variants.map((variant) => (
            <Card key={variant.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between">
                  <div>
                    <Text fw={600} size="lg">
                      {variant.name}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Сложность: {variant.difficulty}
                    </Text>
                  </div>

                  {variant.status === 'completed' && variant.score !== undefined && (
                    <Badge size="lg" variant="light" color="green">
                      Пройден: {variant.score} баллов
                    </Badge>
                  )}
                </Group>

                <Button
                  onClick={() => navigate(`/mock-exam/${subjectId}/${variant.id}/briefing`)}
                  fullWidth
                  variant={variant.status === 'new' ? 'filled' : 'light'}
                >
                  {variant.status === 'new' ? 'Начать' : 'Пройти заново'}
                </Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
