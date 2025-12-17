import { Card, Title, Stack, Group, Text, Badge } from '@mantine/core'

interface Achievement {
  id: string
  icon: string
  title: string
  xp: number
  color: string
}

interface AchievementsCardProps {
  achievements: Achievement[]
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        🏆 Последние достижения:
      </Title>
      <Stack gap="sm">
        {achievements.map((achievement) => (
          <Group key={achievement.id} justify="space-between" wrap="nowrap">
            <Group gap="sm">
              <Text size="xl">{achievement.icon}</Text>
              <div>
                <Text fw={500} size="sm">
                  {achievement.title}
                </Text>
              </div>
            </Group>
            <Badge
              variant="light"
              color={achievement.color}
              size="lg"
            >
              +{achievement.xp} XP
            </Badge>
          </Group>
        ))}
      </Stack>
    </Card>
  )
}
