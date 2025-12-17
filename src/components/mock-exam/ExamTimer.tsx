import { Text, Group } from '@mantine/core'
import { IconClock } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface ExamTimerProps {
  initialTime: number // в секундах
  isPaused: boolean
  onTimeUp: () => void
}

export function ExamTimer({ initialTime, isPaused, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const isLowTime = timeLeft < 600 // меньше 10 минут

  return (
    <Group gap="xs">
      <IconClock size={20} color={isLowTime ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-blue-6)'} />
      <Text
        size="lg"
        fw={700}
        c={isLowTime ? 'red' : 'blue'}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        ⏱ {formatTime(timeLeft)}
      </Text>
    </Group>
  )
}
