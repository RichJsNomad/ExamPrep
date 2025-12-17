import { Container, Title, Stack, Box, Button, Paper, TextInput, Group, Radio } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { ProgressBar } from '../../components/onboarding/ProgressBar'

export function OnboardingStep1() {
  const navigate = useNavigate()
  const { data, updateData } = useOnboarding()

  const [name, setName] = useState(data.name)
  const [grade, setGrade] = useState(data.grade)
  const [examType, setExamType] = useState<'ЕГЭ' | 'ОГЭ' | ''>(data.examType)

  const handleNext = () => {
    if (!name || !grade || !examType) {
      return
    }
    updateData({ name, grade, examType })
    navigate('/onboarding/step2')
  }

  const isValid = name.trim() !== '' && grade !== '' && examType !== ''

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
          <ProgressBar currentStep={2} totalSteps={3} />

          <Stack gap="xl">
            <Title order={2} ta="center" c="blue.6">
              Давай познакомимся!
            </Title>

            <TextInput
              label="Как тебя зовут?"
              placeholder="Введи свое имя"
              size="lg"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />

            <Box>
              <Title order={4} mb="md" c="gray.7">
                В каком ты классе?
              </Title>
              <Group gap="md" justify="center">
                <Button
                  size="lg"
                  variant={grade === '9' ? 'filled' : 'outline'}
                  color="blue"
                  onClick={() => setGrade('9')}
                  style={{ minWidth: 120 }}
                >
                  9 класс
                </Button>
                <Button
                  size="lg"
                  variant={grade === '10' ? 'filled' : 'outline'}
                  color="blue"
                  onClick={() => setGrade('10')}
                  style={{ minWidth: 120 }}
                >
                  10 класс
                </Button>
                <Button
                  size="lg"
                  variant={grade === '11' ? 'filled' : 'outline'}
                  color="blue"
                  onClick={() => setGrade('11')}
                  style={{ minWidth: 120 }}
                >
                  11 класс
                </Button>
              </Group>
            </Box>

            <Box>
              <Title order={4} mb="md" c="gray.7">
                Что сдаёшь?
              </Title>
              <Radio.Group
                value={examType}
                onChange={(value) => setExamType(value as 'ЕГЭ' | 'ОГЭ')}
              >
                <Stack gap="sm">
                  <Radio
                    value="ЕГЭ"
                    label="ЕГЭ (Единый государственный экзамен)"
                    size="md"
                  />
                  <Radio
                    value="ОГЭ"
                    label="ОГЭ (Основной государственный экзамен)"
                    size="md"
                  />
                </Stack>
              </Radio.Group>
            </Box>

            <Button
              size="lg"
              color="blue"
              onClick={handleNext}
              disabled={!isValid}
              fullWidth
            >
              Продолжить
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
