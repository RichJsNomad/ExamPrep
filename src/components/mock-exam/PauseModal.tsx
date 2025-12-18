import { Modal, Stack, Text, Button, Title } from '@mantine/core'
import { IconPlayerPause } from '@tabler/icons-react'

interface PauseModalProps {
  opened: boolean
  onClose: () => void
  onResume: () => void
  onExitAndSave: () => void
}

export function PauseModal({ opened, onClose, onResume, onExitAndSave }: PauseModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={3}>
          <IconPlayerPause size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          ⏸ Пауза
        </Title>
      }
      centered
      size="md"
      withinPortal
    >
      <Stack gap="lg">
        <Stack gap="xs">
          <Text fw={500}>Таймер остановлен</Text>
          <Text size="sm" c="dimmed">
            Прогресс сохранён
          </Text>
        </Stack>

        <Stack gap="sm">
          <Button onClick={onResume} size="lg" fullWidth>
            Продолжить
          </Button>
          <Button variant="light" onClick={onExitAndSave} fullWidth>
            Выйти и продолжить позже
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}
