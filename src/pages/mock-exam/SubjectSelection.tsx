import { Container, Title, SimpleGrid, Card, Stack, Text, Badge, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

interface Subject {
  id: string
  name: string
  lastScore: number | null
  recommendedReason: string | null
}

const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Математика', lastScore: 85, recommendedReason: null },
  { id: 'russian', name: 'Русский', lastScore: 92, recommendedReason: null },
  { id: 'physics', name: 'Физика', lastScore: 67, recommendedReason: 'давно не сдавал' },
  { id: 'chemistry', name: 'Химия', lastScore: null, recommendedReason: null },
  { id: 'biology', name: 'Биология', lastScore: null, recommendedReason: null },
  { id: 'history', name: 'История', lastScore: null, recommendedReason: null },
]

export function SubjectSelection() {
  const navigate = useNavigate()

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Выбор предмета</Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {SUBJECTS.map((subject) => (
            <Card
              key={subject.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => navigate(`/mock-exam/${subject.id}/variants`)}
            >
              <Stack gap="md">
                <Text fw={700} size="xl">
                  {subject.name}
                </Text>

                {subject.lastScore !== null && (
                  <Group>
                    <Text size="sm" c="dimmed">
                      Последний результат:
                    </Text>
                    <Badge size="lg" variant="light" color="blue">
                      {subject.lastScore} баллов
                    </Badge>
                  </Group>
                )}

                {subject.recommendedReason && (
                  <Badge color="orange" variant="light" fullWidth>
                    Рекомендуем: {subject.recommendedReason}
                  </Badge>
                )}

                {subject.lastScore === null && (
                  <Text size="sm" c="dimmed">
                    Ещё не проходил
                  </Text>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
