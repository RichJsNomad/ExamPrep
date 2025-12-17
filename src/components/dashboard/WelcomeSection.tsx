import { Group, Title, Badge, Text, Paper, Box } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'

interface WelcomeSectionProps {
  userName: string
  streak: number
  level: number
  levelName: string
}

export function WelcomeSection({ userName, streak, level, levelName }: WelcomeSectionProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="lg"
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-purple-6) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Декоративные элементы */}
      <Box
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(30px)',
        }}
      />

      {/* Контент */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Group gap="sm" mb="md">
          <IconSparkles size={32} style={{ opacity: 0.9 }} />
          <Title order={1} style={{ fontWeight: 700, fontSize: '2rem' }}>
            Привет, {userName}!
          </Title>
        </Group>

        <Text size="lg" mb="xl" style={{ opacity: 0.95, fontWeight: 500 }}>
          Продолжай в том же духе! Ты на пути к своей цели 🚀
        </Text>

        <Group gap="md" wrap="wrap">
          <Badge
            size="xl"
            variant="white"
            color="orange"
            style={{
              padding: '14px 24px',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🔥</span>
            <span>Стрик: {streak} дней</span>
          </Badge>
          <Badge
            size="xl"
            variant="white"
            color="purple"
            style={{
              padding: '14px 24px',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <span>Уровень {level} — {levelName}</span>
          </Badge>
        </Group>
      </div>
    </Paper>
  )
}
