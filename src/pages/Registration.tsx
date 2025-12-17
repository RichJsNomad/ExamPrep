import { Container, Title, Text, Stack, Box, Button, Paper } from '@mantine/core'
import { IconBrandVk, IconBrandTelegram, IconBrandGoogle, IconMail } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export function Registration() {
  const navigate = useNavigate()

  const handleAuthMethod = (method: string) => {
    console.log('Selected auth method:', method)
    // Переходим к онбордингу
    navigate('/onboarding/step1')
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
            <Title order={2} ta="center" c="blue.6">
              Регистрация
            </Title>

            <Text size="md" ta="center" c="dimmed">
              Выберите удобный способ входа
            </Text>

            <Stack gap="md" style={{ width: '100%' }}>
              <Button
                size="lg"
                variant="default"
                leftSection={<IconBrandVk size={24} />}
                onClick={() => handleAuthMethod('vk')}
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #0077FF',
                    color: '#0077FF',
                    '&:hover': {
                      backgroundColor: '#0077FF',
                      color: 'white',
                    },
                  },
                }}
              >
                Войти через VK
              </Button>

              <Button
                size="lg"
                variant="default"
                leftSection={<IconBrandTelegram size={24} />}
                onClick={() => handleAuthMethod('telegram')}
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #0088CC',
                    color: '#0088CC',
                    '&:hover': {
                      backgroundColor: '#0088CC',
                      color: 'white',
                    },
                  },
                }}
              >
                Войти через Telegram
              </Button>

              <Button
                size="lg"
                variant="default"
                leftSection={<IconBrandGoogle size={24} />}
                onClick={() => handleAuthMethod('google')}
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #DB4437',
                    color: '#DB4437',
                    '&:hover': {
                      backgroundColor: '#DB4437',
                      color: 'white',
                    },
                  },
                }}
              >
                Войти через Google
              </Button>

              <Button
                size="lg"
                variant="default"
                leftSection={<IconMail size={24} />}
                onClick={() => handleAuthMethod('email')}
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #868E96',
                    color: '#868E96',
                    '&:hover': {
                      backgroundColor: '#868E96',
                      color: 'white',
                    },
                  },
                }}
              >
                Войти через Email
              </Button>
            </Stack>

            <Text size="xs" ta="center" c="dimmed" mt="md">
              Нажимая на кнопку, вы соглашаетесь с{' '}
              <Text component="span" c="blue" style={{ cursor: 'pointer' }}>
                условиями использования
              </Text>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
