import { Modal, Stack, Text, Group, Button, Textarea } from '@mantine/core'
import { useState } from 'react'

interface PraiseModalProps {
  opened: boolean
  onClose: () => void
  onSend: (sticker: string, xp: number, message: string) => void
  studentName: string
}

const STICKERS = ['🏆', '⭐', '🔥', '💪', '🎉']
const XP_OPTIONS = [10, 25, 50]

export function PraiseModal({ opened, onClose, onSend, studentName }: PraiseModalProps) {
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null)
  const [selectedXP, setSelectedXP] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (selectedSticker && selectedXP) {
      onSend(selectedSticker, selectedXP, message)
      // Сброс формы
      setSelectedSticker(null)
      setSelectedXP(null)
      setMessage('')
      onClose()
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Отправить похвалу"
      centered
      size="md"
      withinPortal
    >
      <Stack gap="lg">
        <div>
          <Text size="sm" fw={600} mb="xs">
            Выбери стикер:
          </Text>
          <Group gap="sm">
            {STICKERS.map((sticker) => (
              <Button
                key={sticker}
                size="lg"
                variant={selectedSticker === sticker ? 'filled' : 'outline'}
                onClick={() => setSelectedSticker(sticker)}
                styles={{
                  root: {
                    width: '60px',
                    height: '60px',
                    padding: 0,
                  },
                  label: {
                    fontSize: '36px',
                    lineHeight: '1',
                  },
                }}
              >
                {sticker}
              </Button>
            ))}
          </Group>
        </div>

        <div>
          <Text size="sm" fw={600} mb="xs">
            Добавить XP:
          </Text>
          <Group gap="sm">
            {XP_OPTIONS.map((xp) => (
              <Button
                key={xp}
                variant={selectedXP === xp ? 'filled' : 'outline'}
                onClick={() => setSelectedXP(xp)}
                color="orange"
              >
                +{xp}
              </Button>
            ))}
          </Group>
        </div>

        <div>
          <Text size="sm" fw={600} mb="xs">
            Сообщение (опционально):
          </Text>
          <Textarea
            placeholder="Напиши что-нибудь приятное..."
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            rows={3}
          />
        </div>

        <Button
          fullWidth
          size="md"
          disabled={!selectedSticker || !selectedXP}
          onClick={handleSend}
        >
          Отправить
        </Button>

        {selectedSticker && selectedXP && (
          <Text size="xs" c="dimmed" ta="center">
            {studentName} получит Push: "Папа отправил тебе {selectedSticker} и +{selectedXP} XP!"
          </Text>
        )}
      </Stack>
    </Modal>
  )
}
