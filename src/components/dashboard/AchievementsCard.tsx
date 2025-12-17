import { Card, Title, Stack, Group, Text, Badge, Box } from '@mantine/core'
import { IconTrophy, IconSparkles } from '@tabler/icons-react'

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
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--mantine-color-orange-2)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(245, 158, 11, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Group gap="xs" mb="lg">
        <IconTrophy size={24} color="var(--mantine-color-orange-6)" />
        <Title order={3}>
          Последние достижения
        </Title>
        <IconSparkles size={20} color="var(--mantine-color-orange-6)" style={{ opacity: 0.7 }} />
      </Group>

      <Stack gap="md">
        {achievements.map((achievement, index) => (
          <Box
            key={achievement.id}
            p="md"
            style={{
              background: `linear-gradient(135deg, var(--mantine-color-${achievement.color}-0) 0%, var(--mantine-color-${achievement.color}-1) 100%)`,
              borderRadius: 'var(--mantine-radius-md)',
              border: `2px solid var(--mantine-color-${achievement.color}-3)`,
              transition: 'all 0.2s ease',
              animation: `slideIn 0.4s ease ${index * 0.1}s backwards`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(8px)'
              e.currentTarget.style.borderColor = `var(--mantine-color-${achievement.color}-5)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.borderColor = `var(--mantine-color-${achievement.color}-3)`
            }}
          >
            <Group justify="space-between" wrap="nowrap">
              <Group gap="md">
                <Box
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, var(--mantine-color-${achievement.color}-4), var(--mantine-color-${achievement.color}-6))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: `0 4px 12px var(--mantine-color-${achievement.color}-3)`,
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
                  }}
                >
                  {achievement.icon}
                </Box>
                <div>
                  <Text fw={600} size="md" mb={2}>
                    {achievement.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Только что получено
                  </Text>
                </div>
              </Group>
              <Badge
                variant="gradient"
                gradient={{ from: achievement.color, to: achievement.color === 'orange' ? 'yellow' : achievement.color === 'blue' ? 'cyan' : 'pink', deg: 90 }}
                size="lg"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px var(--mantine-color-${achievement.color}-3)`,
                }}
              >
                +{achievement.xp} XP
              </Badge>
            </Group>
          </Box>
        ))}
      </Stack>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Card>
  )
}
