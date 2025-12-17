import { Container, Stack, Title, Text, Button, Paper, Box, Group } from '@mantine/core'
import { IconTrophy, IconSparkles, IconChartBar, IconRoute } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useLesson } from '../../context/LessonContext'

export function LessonComplete() {
  const navigate = useNavigate()
  const { data } = useLesson()

  const totalXP = data.earnedXP + 25 // Итого XP (включая бонус)

  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        {/* Анимированная иконка */}
        <Box
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)',
          }}
        >
          <IconTrophy size={60} color="white" />
        </Box>

        <Title order={1} size={48}>
          🎉 Отлично!
        </Title>

        {/* XP и бейдж */}
        <Paper shadow="md" p="xl" radius="lg" bg="orange.0" w="100%">
          <Stack gap="md" align="center">
            <Group gap="xl">
              <Stack gap="xs" align="center">
                <IconSparkles size={32} color="#F59E0B" />
                <Text size="xl" fw={700} c="orange.7">
                  +{totalXP} XP
                </Text>
                <Text size="sm" c="dimmed">
                  Опыт получен
                </Text>
              </Stack>

              <Box
                style={{
                  width: 2,
                  height: 60,
                  backgroundColor: '#E9ECEF',
                }}
              />

              <Stack gap="xs" align="center">
                <Text size="3xl">🏅</Text>
                <Text size="lg" fw={600} c="orange.7">
                  Первый урок
                </Text>
                <Text size="sm" c="dimmed">
                  Бейдж получен
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Paper>

        {/* Выбор действий */}
        <Paper shadow="sm" p="lg" radius="md" w="100%">
          <Stack gap="md">
            <Text size="lg" fw={600} ta="center">
              Что дальше?
            </Text>

            <Button
              size="lg"
              leftSection={<IconRoute size={20} />}
              onClick={() => navigate('/lesson/second')}
              fullWidth
            >
              Следующий урок
            </Button>

            <Button
              size="lg"
              variant="light"
              color="purple"
              leftSection={<IconChartBar size={20} />}
              onClick={() => navigate('/assessment/entry-test')}
              fullWidth
            >
              Узнать свой уровень — тест
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              fullWidth
            >
              Посмотреть план
            </Button>
          </Stack>
        </Paper>

        {/* Статистика */}
        <Paper shadow="xs" p="md" radius="md" bg="gray.0" w="100%">
          <Group justify="space-between">
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Видео просмотрено
              </Text>
              <Text fw={600}>✓ 5 минут</Text>
            </Stack>
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Задач решено
              </Text>
              <Text fw={600}>{data.practiceScore}/3</Text>
            </Stack>
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Время
              </Text>
              <Text fw={600}>~8 минут</Text>
            </Stack>
          </Group>
        </Paper>
      </Stack>
    </Container>
  )
}
