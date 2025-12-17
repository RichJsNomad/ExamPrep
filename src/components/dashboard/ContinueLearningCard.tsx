import { Card, Title, Group, Progress, Button, Text, Box } from '@mantine/core'
import { IconBook, IconArrowRight } from '@tabler/icons-react'

interface ContinueLearningCardProps {
  subject: string
  lessonTitle: string
  progress: number
  subjectColor?: string
}

export function ContinueLearningCard({
  subject,
  lessonTitle,
  progress,
  subjectColor = 'blue'
}: ContinueLearningCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        📚 Продолжить обучение:
      </Title>

      <Group wrap="nowrap" align="flex-start">
        {/* Иконка предмета */}
        <Box
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            background: `linear-gradient(135deg, var(--mantine-color-${subjectColor}-6), var(--mantine-color-${subjectColor}-8))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconBook size={40} color="white" stroke={1.5} />
        </Box>

        {/* Информация о курсе */}
        <div style={{ flex: 1 }}>
          <Text fw={600} size="lg" mb={4}>
            {subject}
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            Урок: {lessonTitle}
          </Text>

          <div>
            <Group justify="space-between" mb={4}>
              <Text size="xs" c="dimmed">Прогресс курса</Text>
              <Text size="xs" fw={500}>{progress}%</Text>
            </Group>
            <Progress value={progress} color={subjectColor} size="sm" />
          </div>

          <Button
            variant="light"
            color={subjectColor}
            rightSection={<IconArrowRight size={16} />}
            mt="md"
            fullWidth
          >
            Продолжить
          </Button>
        </div>
      </Group>
    </Card>
  )
}
