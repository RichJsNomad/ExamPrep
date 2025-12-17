import { Container, Title, Text, Button, Card, Badge, Group, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'

function App() {
  const showNotification = () => {
    notifications.show({
      title: '🎉 Добро пожаловать!',
      message: 'Mantine успешно установлен и настроен!',
      color: 'green',
    })
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1} ta="center" c="blue">
          🎓 ExamPrep - Платформа подготовки к ЕГЭ и ОГЭ
        </Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="lg">
                Mantine успешно установлен! 🚀
              </Text>
              <Badge color="green" variant="light">
                Готово
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Библиотека компонентов Mantine настроена и готова к использованию.
              Цветовая палитра ExamPrep применена:
            </Text>

            <Group gap="xs">
              <Badge color="blue">Синий #2563EB</Badge>
              <Badge color="purple">Фиолетовый #9333EA</Badge>
              <Badge color="green">Зеленый #10B981</Badge>
              <Badge color="orange">Оранжевый #F59E0B</Badge>
            </Group>

            <Button
              onClick={showNotification}
              color="blue"
              size="md"
              fullWidth
            >
              Показать уведомление
            </Button>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            Следующие шаги:
          </Title>
          <Stack gap="xs">
            <Text size="sm">✅ Mantine установлен и настроен</Text>
            <Text size="sm">✅ Цветовая палитра ExamPrep применена</Text>
            <Text size="sm">✅ Система уведомлений подключена</Text>
            <Text size="sm">⏳ Создание MVP экранов для ученика</Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export default App
