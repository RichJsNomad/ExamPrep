import { Container, Title, Text, Stack, Box, Button, Paper } from '@mantine/core'
import { IconConfetti, IconSparkles } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'

export function OnboardingComplete() {
  const navigate = useNavigate()
  const { data } = useOnboarding()

  const handleStartLearning = () => {
    navigate('/dashboard')
  }

  const handleCareerTest = () => {
    // TODO: В будущем здесь будет переход на тест профориентации
    console.log('Career test clicked')
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container size="sm">
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          style={{
            backgroundColor: 'white',
          }}
        >
          <Stack align="center" gap="xl">
            <Box
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <IconConfetti size={50} color="white" />
            </Box>

            <Title
              order={1}
              ta="center"
              c="blue.6"
              style={{
                fontSize: '2.5rem',
              }}
            >
              🎉 Готово!
            </Title>

            <Stack gap="md" align="center">
              <Text size="lg" ta="center" c="gray.7" fw={500}>
                Привет, {data.name}! 👋
              </Text>
              <Text size="md" ta="center" c="dimmed" maw={400}>
                Твой персональный план готов. Начни первый урок и получи{' '}
                <Text component="span" c="orange" fw={700}>
                  +50 XP
                </Text>
                !
              </Text>
              <Text size="sm" ta="center" c="dimmed">
                Мы подобрали для тебя материалы по {data.subjects.length} предметам
              </Text>
            </Stack>

            <Button
              size="xl"
              color="blue"
              leftSection={<IconSparkles size={24} />}
              onClick={handleStartLearning}
              fullWidth
              style={{
                marginTop: '1rem',
              }}
            >
              Начать обучение
            </Button>

            <Button
              variant="subtle"
              size="sm"
              color="gray"
              onClick={handleCareerTest}
            >
              Пройти тест профориентации позже
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
