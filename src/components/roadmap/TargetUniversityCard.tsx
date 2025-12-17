import { Card, Title, Text, Group, Badge, Button, Box } from '@mantine/core'
import { IconSchool, IconMapPin, IconCoin, IconChartBar, IconEdit } from '@tabler/icons-react'

interface TargetUniversityCardProps {
  universityName: string
  faculty: string
  city: string
  budgetPlaces: number
  passingScore: number
  year: number
  onChangeTarget?: () => void
}

export function TargetUniversityCard({
  universityName,
  faculty,
  city,
  budgetPlaces,
  passingScore,
  year,
  onChangeTarget
}: TargetUniversityCardProps) {
  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="md"
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-purple-6) 100%)',
        color: 'white',
      }}
    >
      <Group justify="space-between" align="flex-start" mb="lg">
        <div>
          <Group gap="xs" mb="xs">
            <IconSchool size={28} stroke={1.5} />
            <Title order={1} c="white">
              🎯 МОЙ ПЛАН ПОСТУПЛЕНИЯ
            </Title>
          </Group>
        </div>
        {onChangeTarget && (
          <Button
            variant="white"
            color="dark"
            leftSection={<IconEdit size={16} />}
            onClick={onChangeTarget}
          >
            Изменить цель
          </Button>
        )}
      </Group>

      <Box
        p="md"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Title order={2} c="white" mb="md">
          🎓 {universityName}
        </Title>
        <Text size="lg" fw={500} c="white" mb="lg">
          {faculty}
        </Text>

        <Group gap="lg" wrap="wrap">
          <Group gap="xs">
            <IconMapPin size={20} />
            <Text c="white" fw={500}>
              {city}
            </Text>
          </Group>

          <Group gap="xs">
            <IconCoin size={20} />
            <Text c="white" fw={500}>
              Бюджет: {budgetPlaces} мест
            </Text>
          </Group>

          <Group gap="xs">
            <IconChartBar size={20} />
            <Text c="white" fw={500}>
              Проходной балл {year}: {passingScore}
            </Text>
          </Group>
        </Group>
      </Box>
    </Card>
  )
}
