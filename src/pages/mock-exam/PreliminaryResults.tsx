import { Container, Stack, Title, Card, Text, Group, Badge, Button, Divider, Progress } from '@mantine/core'
import { IconCheck, IconClock } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'

export function PreliminaryResults() {
  const navigate = useNavigate()
  const { subjectId, variantId } = useParams()
  const examId = `${subjectId}-${variantId}`

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>Предварительные результаты</Title>

        {/* Часть 1 */}
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <Group justify="space-between">
              <Text fw={600} size="lg">
                Часть 1 (задания 1-12)
              </Text>
              <Badge size="lg" variant="light" color="green" leftSection={<IconCheck size={18} />}>
                Проверено автоматически
              </Badge>
            </Group>

            <div>
              <Text size="sm" c="dimmed" mb="xs">
                Первичный балл
              </Text>
              <Text size="xl" fw={700} c="blue">
                38/62
              </Text>
              <Progress value={61} size="lg" radius="xl" color="blue" mt="md" />
            </div>
          </Stack>
        </Card>

        {/* Часть 2 */}
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="lg">
            <Group justify="space-between">
              <Text fw={600} size="lg">
                Часть 2 (задания 13-19)
              </Text>
              <Badge size="lg" variant="light" color="orange" leftSection={<IconClock size={18} />}>
                На проверке
              </Badge>
            </Group>

            <Text c="dimmed">Готово через ~24 ч</Text>
          </Stack>
        </Card>

        <Divider />

        {/* Предварительный прогноз */}
        <Card shadow="md" padding="xl" radius="md" withBorder bg="blue.0">
          <Stack gap="md" align="center">
            <Text fw={600} c="dimmed">
              Предварительный прогноз:
            </Text>
            <Text size="2rem" fw={700} c="blue">
              ~72-78 баллов
            </Text>
          </Stack>
        </Card>

        {/* Кнопки действий */}
        <Stack gap="sm">
          <Button
            size="lg"
            fullWidth
            onClick={() => navigate(`/mock-exam/${examId}/review`)}
          >
            Разбор ошибок (Часть 1)
          </Button>
          <Button variant="light" fullWidth onClick={() => navigate('/dashboard')}>
            На главную
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
