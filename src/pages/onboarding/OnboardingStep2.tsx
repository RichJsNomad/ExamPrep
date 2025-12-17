import { Container, Title, Stack, Box, Button, Paper, Checkbox } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { ProgressBar } from '../../components/onboarding/ProgressBar'

const SUBJECTS = [
  { value: 'russian', label: 'Русский язык', required: true },
  { value: 'math_prof', label: 'Математика профильная', required: false },
  { value: 'math_base', label: 'Математика базовая', required: false },
  { value: 'social', label: 'Обществознание', required: false },
  { value: 'history', label: 'История', required: false },
  { value: 'physics', label: 'Физика', required: false },
  { value: 'chemistry', label: 'Химия', required: false },
  { value: 'biology', label: 'Биология', required: false },
  { value: 'informatics', label: 'Информатика', required: false },
  { value: 'english', label: 'Английский язык', required: false },
  { value: 'geography', label: 'География', required: false },
  { value: 'literature', label: 'Литература', required: false },
]

export function OnboardingStep2() {
  const navigate = useNavigate()
  const { data, updateData } = useOnboarding()

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    data.subjects.length > 0 ? data.subjects : ['russian', 'math_prof']
  )

  const handleToggleSubject = (subject: string, required: boolean) => {
    if (required) return // Нельзя снять обязательный предмет

    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    )
  }

  const handleNext = () => {
    updateData({ subjects: selectedSubjects })
    navigate('/onboarding/complete')
  }

  const isValid = selectedSubjects.length >= 2

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
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <ProgressBar currentStep={3} totalSteps={3} />

          <Stack gap="xl">
            <Title order={2} ta="center" c="blue.6">
              Какие предметы будешь сдавать?
            </Title>

            <Stack gap="sm">
              {SUBJECTS.map((subject) => {
                const isSelected = selectedSubjects.includes(subject.value)
                const isRequired = subject.required

                return (
                  <Checkbox
                    key={subject.value}
                    label={`${subject.label}${isRequired ? ' (обязательный)' : ''}`}
                    checked={isSelected}
                    disabled={isRequired}
                    onChange={() => handleToggleSubject(subject.value, isRequired)}
                    size="md"
                    styles={{
                      label: {
                        cursor: isRequired ? 'not-allowed' : 'pointer',
                      },
                    }}
                  />
                )
              })}
            </Stack>

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
