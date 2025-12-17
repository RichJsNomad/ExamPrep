import { Container, Stack, Title, Text, Card, List, Checkbox, Button, Group } from '@mantine/core'
import { IconClock, IconFileText } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ExamBriefing() {
  const navigate = useNavigate()
  const { subjectId, variantId } = useParams<{ subjectId: string; variantId: string }>()
  const [examMode, setExamMode] = useState(false)

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>Перед началом</Title>

        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="xl">
            <Group gap="xl">
              <Group gap="xs">
                <IconClock size={24} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="sm" c="dimmed">
                    Время
                  </Text>
                  <Text fw={600} size="lg">
                    ⏱ 3 ч 55 мин
                  </Text>
                </div>
              </Group>

              <Group gap="xs">
                <IconFileText size={24} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="sm" c="dimmed">
                    Заданий
                  </Text>
                  <Text fw={600} size="lg">
                    📝 19
                  </Text>
                </div>
              </Group>
            </Group>

            <div>
              <Text fw={600} mb="md">
                Правила:
              </Text>
              <List spacing="sm">
                <List.Item>Можно делать паузы</List.Item>
                <List.Item>Автосохранение каждые 5 минут</List.Item>
                <List.Item>Часть 1 — автопроверка</List.Item>
                <List.Item>Часть 2 — проверка экспертом за 24 ч</List.Item>
              </List>
            </div>

            <Card padding="md" radius="md" bg="blue.0" withBorder>
              <Checkbox
                checked={examMode}
                onChange={(event) => setExamMode(event.currentTarget.checked)}
                label={
                  <div>
                    <Text fw={500}>☐ Режим экзамена</Text>
                    <Text size="sm" c="dimmed">
                      (без пауз, как на ЕГЭ)
                    </Text>
                  </div>
                }
              />
            </Card>

            <Button
              size="lg"
              fullWidth
              onClick={() => navigate(`/mock-exam/${subjectId}/${variantId}/exam`)}
            >
              Начать экзамен
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}
