import { Container, Stack, Title, Card, Text, Group, Badge, Button, Divider, Progress, Box } from '@mantine/core'
import { IconTrophy, IconAlertTriangle } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'

export function FinalResults() {
  const navigate = useNavigate()
  const { examId } = useParams()

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>Итоговые результаты</Title>

        {/* Главная карточка с баллом */}
        <Card shadow="lg" padding="xl" radius="md" withBorder>
          <Stack gap="lg" align="center">
            <IconTrophy size={64} color="var(--mantine-color-yellow-6)" />
            <Text size="sm" c="dimmed">
              📊 Математика профиль
            </Text>
            <Text size="3rem" fw={700} c="blue">
              🏆 76 баллов
            </Text>
          </Stack>
        </Card>

        {/* Детализация */}
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <div>
              <Text fw={600} mb="md">
                Детализация:
              </Text>
              <Group gap="xl">
                <div>
                  <Text size="sm" c="dimmed">
                    Первичный
                  </Text>
                  <Text size="lg" fw={600}>
                    52/62
                  </Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">
                    Тестовый
                  </Text>
                  <Text size="lg" fw={600}>
                    76/100
                  </Text>
                </div>
              </Group>
            </div>

            <Divider />

            <div>
              <Text fw={600} mb="md">
                По частям:
              </Text>
              <Stack gap="md">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Часть 1</Text>
                    <Text size="sm" fw={600}>
                      38/62 (61%)
                    </Text>
                  </Group>
                  <Progress value={61} size="lg" radius="xl" color="blue" />
                </div>

                <Box
                  p="md"
                  style={{
                    backgroundColor: 'var(--mantine-color-red-0)',
                    borderRadius: 'var(--mantine-radius-md)',
                    border: '2px solid var(--mantine-color-red-3)',
                  }}
                >
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <Text size="sm" fw={600}>
                        Часть 2
                      </Text>
                      <Badge color="red" size="sm" variant="light">
                        Нужно улучшить
                      </Badge>
                    </Group>
                    <Text size="sm" fw={600}>
                      14/32 (44%)
                    </Text>
                  </Group>
                  <Progress value={44} size="lg" radius="xl" color="red" />
                </Box>
              </Stack>
            </div>
          </Stack>
        </Card>

        {/* Рекомендация */}
        <Card shadow="md" padding="xl" radius="md" withBorder bg="orange.0">
          <Stack gap="md">
            <Group gap="xs">
              <IconAlertTriangle size={24} color="var(--mantine-color-orange-6)" />
              <Text fw={600} c="orange.9">
                ⚠️ Рекомендация:
              </Text>
            </Group>
            <Text>Подтянуть задания 13-15 (геометрия)</Text>
          </Stack>
        </Card>

        {/* Кнопки действий */}
        <Stack gap="sm">
          <Button size="lg" fullWidth onClick={() => navigate(`/mock-exam/${examId}/review`)}>
            Полный разбор
          </Button>
          <Button variant="light" fullWidth onClick={() => console.log('Add topics to plan')}>
            Добавить темы в план
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/mock-exam/subjects')}>
            Пройти ещё вариант
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
