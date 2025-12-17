import { Modal, Stack, Title, Button, Group } from '@mantine/core'

interface InteractiveQuestionProps {
  opened: boolean
  onClose: () => void
  question: string
  onAnswer: (understood: boolean) => void
}

export function InteractiveQuestion({
  opened,
  onClose,
  question,
  onAnswer,
}: InteractiveQuestionProps) {
  const handleAnswer = (understood: boolean) => {
    onAnswer(understood)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      centered
      size="md"
      padding="xl"
      radius="lg"
    >
      <Stack gap="xl">
        <Title order={3} ta="center">
          {question}
        </Title>

        <Group grow>
          <Button
            size="lg"
            color="green"
            onClick={() => handleAnswer(true)}
          >
            Да, понял
          </Button>
          <Button
            size="lg"
            variant="outline"
            color="orange"
            onClick={() => handleAnswer(false)}
          >
            Повторить
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
