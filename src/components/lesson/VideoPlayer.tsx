import { Box, Card, Group, Text, Button, Progress, Stack } from '@mantine/core'
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

interface VideoPlayerProps {
  duration: number // в секундах
  onComplete: () => void
  onInteractiveQuestion?: (time: number) => void
}

export function VideoPlayer({ duration, onComplete, onInteractiveQuestion }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [hasShownQuestion, setHasShownQuestion] = useState(false)

  const progress = (currentTime / duration) * 100

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1

        // Показываем вопрос на 2:30 (150 секунд)
        if (newTime >= 150 && !hasShownQuestion && onInteractiveQuestion) {
          setIsPlaying(false)
          setHasShownQuestion(true)
          onInteractiveQuestion(150)
        }

        if (newTime >= duration) {
          setIsPlaying(false)
          onComplete()
          return duration
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, duration, onComplete, hasShownQuestion, onInteractiveQuestion])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card padding="lg" radius="md" shadow="sm">
      <Stack gap="md">
        {/* Мок видео-области */}
        <Box
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#000',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Фоновое изображение или градиент */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              opacity: 0.3,
            }}
          />

          {/* Иконка Play/Pause */}
          <Button
            size="xl"
            radius="xl"
            color={isPlaying ? 'gray' : 'blue'}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '80px',
              height: '80px',
              zIndex: 1,
            }}
          >
            {isPlaying ? <IconPlayerPause size={40} /> : <IconPlayerPlay size={40} />}
          </Button>

          {/* Текст с названием урока */}
          <Text
            size="xl"
            fw={700}
            c="white"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 1,
            }}
          >
            Как работает ЕГЭ
          </Text>
        </Box>

        {/* Прогресс-бар с метками */}
        <Stack gap="xs">
          <Box style={{ position: 'relative' }}>
            <Progress
              value={progress}
              size="lg"
              radius="xl"
              color="blue"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const clickX = e.clientX - rect.left
                const newTime = Math.floor((clickX / rect.width) * duration)
                setCurrentTime(newTime)
              }}
              style={{ cursor: 'pointer' }}
            />

            {/* Метки на таймлайне */}
            <Box
              style={{
                position: 'absolute',
                top: '-8px',
                left: '0%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2px solid white',
              }}
              title="Старт"
            />
            <Box
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B',
                border: '2px solid white',
              }}
              title="Вопрос на 2:30"
            />
            <Box
              style={{
                position: 'absolute',
                top: '-8px',
                right: '0%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                border: '2px solid white',
              }}
              title="Конец"
            />
          </Box>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {formatTime(currentTime)}
            </Text>
            <Text size="sm" c="dimmed">
              {formatTime(duration)}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
}
