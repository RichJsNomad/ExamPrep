import { Container, Stack, Title, Text, Button, Paper } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VideoPlayer } from '../../components/lesson/VideoPlayer'
import { InteractiveQuestion } from '../../components/lesson/InteractiveQuestion'
import { useLesson } from '../../context/LessonContext'
import { TEST_VIDEOS, DEMO_QUESTIONS } from '../../constants/testVideos'

export function LessonVideo() {
  const navigate = useNavigate()
  const { updateData, addXP } = useLesson()
  const [showQuestion, setShowQuestion] = useState(false)
  const [videoCompleted, setVideoCompleted] = useState(false)

  const handleVideoComplete = () => {
    setVideoCompleted(true)
    updateData({ videoWatched: true })
    addXP(10) // +10 XP за просмотр видео
  }

  const handleQuestionAnswered = (questionId: string, isCorrect: boolean, xp: number) => {
    if (isCorrect) {
      addXP(xp)
    }
    console.log(`Question ${questionId}: ${isCorrect ? 'correct' : 'wrong'}, XP: ${xp}`)
  }

  const handleAnswer = (understood: boolean) => {
    if (!understood) {
      // Можно вернуть видео назад или показать дополнительные материалы
      console.log('User wants to repeat')
    }
    setShowQuestion(false)
  }

  const handleContinue = () => {
    navigate('/lesson/first/practice')
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Stack gap="sm">
          <Title order={1}>Урок 1: Как работает ЕГЭ</Title>
          <Text c="dimmed">
            Узнай структуру экзамена и основные правила. Это поможет тебе лучше подготовиться!
          </Text>
        </Stack>

        <VideoPlayer
          src={TEST_VIDEOS.mp4.sintel}
          lessonId="first-lesson-intro"
          title="Урок 1: Как работает ЕГЭ"
          onComplete={handleVideoComplete}
          questions={DEMO_QUESTIONS}
          onQuestionAnswered={handleQuestionAnswered}
        />

        {videoCompleted && (
          <Paper shadow="sm" p="lg" radius="md" bg="green.0">
            <Stack gap="md" align="center">
              <Text size="lg" fw={600} c="green.7">
                Видео просмотрено! +10 XP
              </Text>
              <Button size="lg" color="green" onClick={handleContinue}>
                Перейти к практике
              </Button>
            </Stack>
          </Paper>
        )}

        <InteractiveQuestion
          opened={showQuestion}
          onClose={() => setShowQuestion(false)}
          question="Понял структуру ЕГЭ?"
          onAnswer={handleAnswer}
        />
      </Stack>
    </Container>
  )
}
