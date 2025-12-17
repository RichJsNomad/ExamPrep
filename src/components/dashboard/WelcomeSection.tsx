import { Group, Title, Badge, Text } from '@mantine/core'
import { IconFlame, IconTrophy } from '@tabler/icons-react'

interface WelcomeSectionProps {
  userName: string
  streak: number
  level: number
  levelName: string
}

export function WelcomeSection({ userName, streak, level, levelName }: WelcomeSectionProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <Title order={2} mb="sm">
        👋 Привет, {userName}!
      </Title>
      <Group gap="md">
        <Badge
          size="lg"
          variant="light"
          color="orange"
          leftSection={<IconFlame size={16} />}
        >
          Стрик: {streak} дней
        </Badge>
        <Badge
          size="lg"
          variant="light"
          color="purple"
          leftSection={<IconTrophy size={16} />}
        >
          Уровень {level} ({levelName})
        </Badge>
      </Group>
    </div>
  )
}
