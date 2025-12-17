import { Container, Title, Text, Button, Stack, Box } from '@mantine/core'
import { IconRocket } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

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
      <Container size="md">
        <Stack align="center" gap="xl">
          <IconRocket size={80} color="white" />

          <Title
            order={1}
            size={56}
            fw={900}
            ta="center"
            c="white"
            style={{
              lineHeight: 1.2,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Подготовься к ЕГЭ
            <br />
            на 100 баллов
          </Title>

          <Text
            size="xl"
            ta="center"
            c="white"
            maw={600}
            opacity={0.95}
          >
            Персональный ИИ-помощник построит твой путь к поступлению в мечту.
            Начни бесплатно уже сегодня!
          </Text>

          <Button
            size="xl"
            radius="xl"
            onClick={() => navigate('/register')}
            style={{
              marginTop: '2rem',
              fontSize: '1.25rem',
              padding: '1.5rem 4rem',
              backgroundColor: '#10B981',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: 'auto',
              minHeight: '60px',
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#059669',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 40px rgba(16, 185, 129, 0.6)',
                },
              },
              inner: {
                whiteSpace: 'nowrap',
              },
            }}
          >
            Попробовать бесплатно
          </Button>

          <Text size="sm" c="white" opacity={0.8}>
            Без оплаты • Без привязки карты • 7 дней полного доступа
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}
