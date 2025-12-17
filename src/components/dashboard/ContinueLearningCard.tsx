import { Card, Title, Group, Progress, Button, Text, Box } from '@mantine/core'
import { IconBook, IconArrowRight, IconPlaystationCircle } from '@tabler/icons-react'

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
    <Card
      shadow="xl"
      padding="xl"
      radius="lg"
      style={{
        background: `linear-gradient(135deg, var(--mantine-color-${subjectColor}-6) 0%, var(--mantine-color-${subjectColor}-8) 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)'
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(37, 99, 235, 0.4)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Декоративные элементы */}
      <Box
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(30px)',
        }}
      />

      {/* Контент */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Group gap="xs" mb="lg">
          <IconPlaystationCircle size={24} style={{ opacity: 0.9 }} />
          <Title order={3} style={{ opacity: 0.95 }}>
            Продолжить обучение
          </Title>
        </Group>

        <Group wrap="nowrap" align="flex-start" gap="xl">
          {/* Иконка предмета с анимацией */}
          <Box
            style={{
              width: 100,
              height: 100,
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(-5deg) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
            }}
          >
            <IconBook size={50} color="white" stroke={2} />
          </Box>

          {/* Информация о курсе */}
          <div style={{ flex: 1 }}>
            <Text fw={700} size="xl" mb={8} style={{ opacity: 0.98 }}>
              {subject}
            </Text>
            <Text size="md" mb="lg" style={{ opacity: 0.9 }}>
              Урок: {lessonTitle}
            </Text>

            <div>
              <Group justify="space-between" mb={8}>
                <Text size="sm" style={{ opacity: 0.9 }}>Прогресс курса</Text>
                <Text size="sm" fw={600}>{progress}%</Text>
              </Group>
              <Progress
                value={progress}
                size="lg"
                radius="xl"
                color="white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>

            <Button
              variant="white"
              color={subjectColor}
              rightSection={<IconArrowRight size={18} />}
              size="md"
              mt="xl"
              fullWidth
              style={{
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              Продолжить урок
            </Button>
          </div>
        </Group>
      </div>
    </Card>
  )
}
