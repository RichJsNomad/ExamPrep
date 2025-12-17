import { Modal, Stack, Text, Button, Title } from '@mantine/core'
import { IconBulb } from '@tabler/icons-react'

interface BreakReminderModalProps {
  opened: boolean
  onClose: () => void
  onTakeBreak: () => void
}

export function BreakReminderModal({ opened, onClose, onTakeBreak }: BreakReminderModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={3}>
          <IconBulb size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          💡 Напоминание
        </Title>
      }
      centered
      size="md"
    >
      <Stack gap="lg">
        <Text>Ты занимаешься уже час. Хочешь сделать перерыв?</Text>

        <Stack gap="sm">
          <Button onClick={onTakeBreak} size="lg" fullWidth variant="light" color="orange">
            Перерыв 5 мин
          </Button>
          <Button onClick={onClose} fullWidth>
            Продолжить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}
