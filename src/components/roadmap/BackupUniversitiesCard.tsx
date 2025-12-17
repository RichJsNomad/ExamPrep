import { Card, Title, SimpleGrid, Text, Badge, Button, Stack, Group } from '@mantine/core'
import { IconSchool, IconChartBar, IconArrowsLeftRight } from '@tabler/icons-react'

interface University {
  id: string
  name: string
  passingScore: number
  chanceLevel: 'high' | 'medium' | 'low'
}

interface BackupUniversitiesCardProps {
  universities: University[]
  onUniversityClick?: (universityId: string) => void
  onCompareClick?: () => void
}

export function BackupUniversitiesCard({
  universities,
  onUniversityClick,
  onCompareClick
}: BackupUniversitiesCardProps) {
  const getChanceColor = (level: University['chanceLevel']) => {
    switch (level) {
      case 'high':
        return 'green'
      case 'medium':
        return 'yellow'
      case 'low':
        return 'orange'
    }
  }

  const getChanceLabel = (level: University['chanceLevel']) => {
    switch (level) {
      case 'high':
        return 'Высокий шанс'
      case 'medium':
        return 'Средний шанс'
      case 'low':
        return 'Низкий шанс'
    }
  }

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Title order={2} mb="xl">
        🎓 ЗАПАСНЫЕ ВАРИАНТЫ
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {universities.map((university, index) => (
          <Card
            key={university.id}
            padding="lg"
            radius="md"
            withBorder
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = ''
            }}
            onClick={() => onUniversityClick?.(university.id)}
          >
            <Stack gap="md">
              <Group justify="space-between" wrap="nowrap">
                <Badge size="lg" variant="light" color="blue">
                  {index + 1}️⃣
                </Badge>
                <IconSchool size={32} color="var(--mantine-color-blue-6)" />
              </Group>

              <div>
                <Text fw={700} size="lg" lineClamp={2} mb="xs">
                  {university.name}
                </Text>

                <Group gap="xs" mb="sm">
                  <IconChartBar size={16} />
                  <Text size="sm" c="dimmed">
                    Проходной: <Text component="span" fw={600}>{university.passingScore}</Text>
                  </Text>
                </Group>

                <Badge
                  variant="light"
                  color={getChanceColor(university.chanceLevel)}
                  fullWidth
                >
                  {getChanceLabel(university.chanceLevel)}
                </Badge>
              </div>

              <Button
                variant="light"
                color="blue"
                fullWidth
                size="sm"
              >
                Подробнее
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Button
        variant="outline"
        leftSection={<IconArrowsLeftRight size={18} />}
        onClick={onCompareClick}
        fullWidth
        size="md"
        mt="xl"
      >
        Сравнить вузы
      </Button>
    </Card>
  )
}
