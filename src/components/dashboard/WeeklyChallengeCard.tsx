import { Card, Title, Text, Progress, Group, Badge, Stack, Box, RingProgress } from '@mantine/core'
import { IconTrophy, IconFlame, IconCoins } from '@tabler/icons-react'

interface WeeklyChallengeCardProps {
  title: string
  description: string
  currentProgress: number
  totalGoal: number
  rewards: {
    xp: number
    badge: string
    coins: number
  }
}

export function WeeklyChallengeCard({
  title,
  description,
  currentProgress,
  totalGoal,
  rewards
}: WeeklyChallengeCardProps) {
  const progress = Math.round((currentProgress / totalGoal) * 100)

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--mantine-color-green-2)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Group justify="space-between" mb="lg">
        <Group gap="xs">
          <Box
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--mantine-color-green-5), var(--mantine-color-green-7))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <IconTrophy size={24} color="white" />
          </Box>
          <div>
            <Title order={3} mb={2}>
              Челлендж недели
            </Title>
            <Text size="xs" c="dimmed">
              Заверши для получения наград
            </Text>
          </div>
        </Group>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'green', to: 'teal', deg: 90 }}
        >
          {progress}%
        </Badge>
      </Group>

      <Stack gap="lg">
        <Box
          p="md"
          style={{
            background: 'linear-gradient(135deg, var(--mantine-color-green-0) 0%, var(--mantine-color-teal-0) 100%)',
            borderRadius: 'var(--mantine-radius-md)',
            border: '2px solid var(--mantine-color-green-2)',
          }}
        >
          <Text fw={700} size="lg" mb={4} c="green.9">
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Box>

        <Group align="center" gap="xl">
          <RingProgress
            size={100}
            thickness={10}
            roundCaps
            sections={[
              {
                value: progress,
                color: progress >= 100 ? 'green' : 'blue',
              },
            ]}
            label={
              <div style={{ textAlign: 'center' }}>
                <Text size="sm" fw={700} c={progress >= 100 ? 'green' : 'blue'}>
                  {currentProgress}
                </Text>
                <Text size="xs" c="dimmed">
                  /{totalGoal}
                </Text>
              </div>
            }
          />

          <div style={{ flex: 1 }}>
            <Group justify="space-between" mb={8}>
              <Text size="sm" fw={500}>
                Прогресс
              </Text>
              <Text size="sm" fw={600} c={progress >= 100 ? 'green' : 'blue'}>
                {currentProgress} / {totalGoal} задач
              </Text>
            </Group>
            <Progress
              value={progress}
              color={progress >= 100 ? 'green' : 'blue'}
              size="lg"
              radius="xl"
              animated={progress < 100}
              style={{
                boxShadow: `0 2px 8px ${progress >= 100 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`,
              }}
            />
          </div>
        </Group>

        <Box
          p="lg"
          style={{
            background: 'linear-gradient(135deg, var(--mantine-color-purple-0) 0%, var(--mantine-color-pink-0) 100%)',
            borderRadius: 'var(--mantine-radius-lg)',
            border: '2px solid var(--mantine-color-purple-2)',
          }}
        >
          <Group gap="xs" mb="sm">
            <IconFlame size={20} color="var(--mantine-color-orange-6)" />
            <Text size="sm" fw={600} c="dimmed">
              Награды за выполнение:
            </Text>
          </Group>
          <Group gap="sm" wrap="wrap">
            <Badge
              variant="gradient"
              gradient={{ from: 'purple', to: 'pink', deg: 90 }}
              size="lg"
              style={{
                padding: '12px 16px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <span>{rewards.xp} XP</span>
            </Badge>
            <Badge
              variant="gradient"
              gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
              size="lg"
              style={{
                padding: '12px 16px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '1rem' }}>🏆</span>
              <span>{rewards.badge}</span>
            </Badge>
            <Badge
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
              size="lg"
              style={{
                padding: '12px 16px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <IconCoins size={16} />
              <span>{rewards.coins} монет</span>
            </Badge>
          </Group>
        </Box>
      </Stack>
    </Card>
  )
}
