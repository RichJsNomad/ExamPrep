import { Modal, Title, Text, Badge, Button, Stack, Group, Divider } from '@mantine/core'
import {
  IconSchool,
  IconMapPin,
  IconCoin,
  IconChartBar,
  IconHome,
  IconStar,
  IconTarget
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

interface UniversityDetail {
  id: string
  name: string
  faculty: string
  city: string
  passingScore: number
  budgetPlaces: number
  tuitionFee?: number
  dormitory: boolean
  rating: number
  description: string
}

interface UniversityDetailModalProps {
  university: UniversityDetail | null
  opened: boolean
  onClose: () => void
  onSetAsTarget?: (universityId: string) => void
}

export function UniversityDetailModal({
  university,
  opened,
  onClose,
  onSetAsTarget
}: UniversityDetailModalProps) {
  if (!university) return null

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconSchool size={28} color="var(--mantine-color-blue-6)" />
          <Title order={2}>Информация о вузе</Title>
        </Group>
      }
      size="lg"
      centered
    >
      <Stack gap="lg">
        {/* Основная информация */}
        <div>
          <Text fw={700} size="xl" mb="xs">
            {university.name}
          </Text>
          <Text size="lg" c="dimmed" mb="md">
            {university.faculty}
          </Text>

          <Group gap="lg" wrap="wrap">
            <Badge size="xl" variant="light" color="blue" leftSection={<IconStar size={16} />}>
              Рейтинг: {university.rating}/100
            </Badge>
          </Group>
        </div>

        <Divider />

        {/* Детали */}
        <Stack gap="md">
          <Group gap="md">
            <IconMapPin size={20} color="var(--mantine-color-blue-6)" />
            <div>
              <Text size="xs" c="dimmed">Город</Text>
              <Text fw={600}>{university.city}</Text>
            </div>
          </Group>

          <Group gap="md">
            <IconChartBar size={20} color="var(--mantine-color-green-6)" />
            <div>
              <Text size="xs" c="dimmed">Проходной балл (2024)</Text>
              <Text fw={600} c="green">{university.passingScore}</Text>
            </div>
          </Group>

          <Group gap="md">
            <IconCoin size={20} color="var(--mantine-color-orange-6)" />
            <div>
              <Text size="xs" c="dimmed">Бюджетные места</Text>
              <Text fw={600}>{university.budgetPlaces}</Text>
            </div>
          </Group>

          {university.tuitionFee && (
            <Group gap="md">
              <IconCoin size={20} color="var(--mantine-color-yellow-6)" />
              <div>
                <Text size="xs" c="dimmed">Стоимость обучения (год)</Text>
                <Text fw={600}>{university.tuitionFee.toLocaleString('ru-RU')} ₽</Text>
              </div>
            </Group>
          )}

          <Group gap="md">
            <IconHome size={20} color="var(--mantine-color-purple-6)" />
            <div>
              <Text size="xs" c="dimmed">Общежитие</Text>
              <Badge color={university.dormitory ? 'green' : 'gray'}>
                {university.dormitory ? 'Есть' : 'Нет'}
              </Badge>
            </div>
          </Group>
        </Stack>

        <Divider />

        {/* Описание */}
        <div>
          <Text fw={600} mb="xs">Описание:</Text>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
            {university.description}
          </Text>
        </div>

        {/* Действия */}
        {onSetAsTarget && (
          <Button
            fullWidth
            size="lg"
            leftSection={<IconTarget size={20} />}
            onClick={() => {
              onSetAsTarget(university.id)
              notifications.show({
                title: 'План обновлён под новую цель',
                message: `${university.name} установлен как целевой вуз. Роадмап пересчитан.`,
                color: 'green',
                icon: <IconTarget size={18} />,
              })
              onClose()
            }}
          >
            Сделать основной целью
          </Button>
        )}
      </Stack>
    </Modal>
  )
}
