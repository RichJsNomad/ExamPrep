import { useState, useRef, useEffect, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { Box, Card, Stack, Group, Text, ActionIcon, Slider, Tooltip, Menu, Badge } from '@mantine/core'
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
  IconMaximize,
  IconMinimize,
  IconSettings,
  IconRewindBackward10,
  IconRewindForward10,
} from '@tabler/icons-react'
import { InteractiveOverlay } from './InteractiveOverlay'
import { useVideoProgress } from '../../hooks/useVideoProgress'
import type { InteractiveQuestion } from '../../types/video'

interface VideoPlayerProps {
  src: string
  lessonId: string
  title?: string
  onComplete?: () => void
  questions?: InteractiveQuestion[]
  onQuestionAnswered?: (questionId: string, isCorrect: boolean, xp: number) => void
}

export function VideoPlayer({
  src,
  lessonId,
  title = 'Видеоурок',
  onComplete,
  questions = [],
  onQuestionAnswered,
}: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Состояние плеера
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isReady, setIsReady] = useState(false)

  // Интерактивные вопросы
  const [activeQuestion, setActiveQuestion] = useState<InteractiveQuestion | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([])

  // Прогресс
  const { progress, updateWatchedSecond, markQuestionCompleted } = useVideoProgress(lessonId)

  // Сохраняем начальную позицию для восстановления (только при первой загрузке)
  const hasRestoredPosition = useRef(false)

  // Восстановление позиции при загрузке (только один раз)
  useEffect(() => {
    if (isReady && !hasRestoredPosition.current && progress.lastPosition > 0 && playerRef.current) {
      playerRef.current.currentTime = progress.lastPosition
      hasRestoredPosition.current = true
    }
  }, [isReady, progress.lastPosition])

  // Загрузка ранее отвеченных вопросов
  useEffect(() => {
    setAnsweredQuestions(progress.completedQuestions)
  }, [progress.completedQuestions])

  // Проверка интерактивных вопросов
  useEffect(() => {
    if (!playing || activeQuestion) return

    const question = questions.find(
      (q) => Math.abs(q.timestamp - currentTime) < 0.5 && !answeredQuestions.includes(q.id)
    )

    if (question) {
      setPlaying(false)
      if (playerRef.current) {
        playerRef.current.pause()
      }
      setActiveQuestion(question)
    }
  }, [currentTime, questions, answeredQuestions, playing, activeQuestion])

  // Throttle ref для ограничения частоты обновлений
  const lastTimeUpdateRef = useRef<number>(0)

  // Обработчик обновления времени (throttled)
  const handleTimeUpdate = useCallback(() => {
    if (playerRef.current) {
      const now = Date.now()
      // Ограничиваем обновления до 4 раз в секунду (250ms)
      if (now - lastTimeUpdateRef.current < 250) {
        return
      }
      lastTimeUpdateRef.current = now

      const time = playerRef.current.currentTime
      setCurrentTime(time)
      if (duration > 0) {
        updateWatchedSecond(time, duration)
      }
    }
  }, [duration, updateWatchedSecond])

  // Обработчик загрузки метаданных
  const handleLoadedMetadata = useCallback(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration)
      setIsReady(true)
    }
  }, [])

  // Обработчик окончания видео
  const handleEnded = useCallback(() => {
    setPlaying(false)
    onComplete?.()
  }, [onComplete])

  // Обработчик ответа на вопрос
  const handleQuestionAnswer = useCallback(
    (questionId: string, _selectedIndex: number, isCorrect: boolean) => {
      const question = questions.find((q) => q.id === questionId)
      const xp = isCorrect ? question?.xpReward || 10 : 0

      setAnsweredQuestions((prev) => [...prev, questionId])
      markQuestionCompleted(questionId)
      setActiveQuestion(null)
      setPlaying(true)
      if (playerRef.current) {
        playerRef.current.play()
      }

      onQuestionAnswered?.(questionId, isCorrect, xp)
    },
    [questions, markQuestionCompleted, onQuestionAnswered]
  )

  // Перемотка через слайдер
  const handleSeek = useCallback(
    (value: number) => {
      if (duration > 0 && playerRef.current) {
        const seekTo = (value / 100) * duration
        playerRef.current.currentTime = seekTo
        setCurrentTime(seekTo)
      }
    },
    [duration]
  )

  // Перемотка на N секунд
  const handleSkip = useCallback(
    (seconds: number) => {
      if (playerRef.current) {
        const newTime = Math.max(0, Math.min(currentTime + seconds, duration))
        playerRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    },
    [currentTime, duration]
  )

  // Управление воспроизведением
  const togglePlay = useCallback(() => {
    if (!activeQuestion && playerRef.current) {
      if (playing) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
      setPlaying(!playing)
    }
  }, [playing, activeQuestion])

  // Полноэкранный режим
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  // Отслеживание состояния полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Обновление громкости
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = muted ? 0 : volume
    }
  }, [volume, muted])

  // Обновление скорости воспроизведения
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Скрытие контролов при бездействии
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      if (playing) {
        timeout = setTimeout(() => setShowControls(false), 3000)
      }
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    container?.addEventListener('touchstart', handleMouseMove)

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
      container?.removeEventListener('touchstart', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [playing])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Card
      padding={0}
      radius={isFullscreen ? 0 : 'md'}
      shadow={isFullscreen ? 'none' : 'sm'}
      ref={containerRef}
      style={isFullscreen ? { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' } : undefined}
    >
      <Box style={{ position: 'relative', flex: isFullscreen ? 1 : undefined, display: 'flex', flexDirection: 'column' }}>
        {/* Видео */}
        <Box
          style={{
            aspectRatio: isFullscreen ? undefined : '16/9',
            flex: isFullscreen ? 1 : undefined,
            height: isFullscreen ? '100%' : undefined,
            backgroundColor: '#000',
            cursor: showControls ? 'default' : 'none',
          }}
          onClick={togglePlay}
        >
          <ReactPlayer
            ref={playerRef}
            src={src}
            style={{ width: '100%', height: '100%', objectFit: isFullscreen ? 'contain' : undefined }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            playsInline
            controlsList="nodownload"
          />
        </Box>

        {/* Интерактивный вопрос */}
        {activeQuestion && (
          <InteractiveOverlay question={activeQuestion} onAnswer={handleQuestionAnswer} />
        )}

        {/* Контролы */}
        <Box
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: '40px 16px 16px',
            opacity: showControls && !activeQuestion ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: showControls && !activeQuestion ? 'auto' : 'none',
          }}
        >
          <Stack gap="xs">
            {/* Название и прогресс просмотра */}
            <Group justify="space-between">
              <Text size="sm" c="white" fw={500}>
                {title}
              </Text>
              <Badge color="green" size="sm">
                {progress.completionPercentage.toFixed(0)}% просмотрено
              </Badge>
            </Group>

            {/* Прогресс-бар */}
            <Slider
              value={progressPercent}
              onChange={handleSeek}
              size="sm"
              color="blue"
              styles={{
                track: { backgroundColor: 'rgba(255,255,255,0.3)' },
                bar: { backgroundColor: '#2563EB' },
                thumb: { borderColor: '#2563EB', backgroundColor: '#fff' },
              }}
            />

            {/* Контролы */}
            <Group justify="space-between">
              <Group gap="xs">
                {/* Play/Pause */}
                <Tooltip label={playing ? 'Пауза' : 'Воспроизвести'}>
                  <ActionIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    variant="subtle"
                    color="white"
                    size="lg"
                  >
                    {playing ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
                  </ActionIcon>
                </Tooltip>

                {/* Перемотка назад */}
                <Tooltip label="-10 сек">
                  <ActionIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSkip(-10)
                    }}
                    variant="subtle"
                    color="white"
                  >
                    <IconRewindBackward10 size={18} />
                  </ActionIcon>
                </Tooltip>

                {/* Перемотка вперёд */}
                <Tooltip label="+10 сек">
                  <ActionIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSkip(10)
                    }}
                    variant="subtle"
                    color="white"
                  >
                    <IconRewindForward10 size={18} />
                  </ActionIcon>
                </Tooltip>

                {/* Время */}
                <Text size="sm" c="white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Text>
              </Group>

              <Group gap="xs">
                {/* Громкость */}
                <Group gap={4}>
                  <Tooltip label={muted ? 'Включить звук' : 'Выключить звук'}>
                    <ActionIcon
                      onClick={(e) => {
                        e.stopPropagation()
                        setMuted(!muted)
                      }}
                      variant="subtle"
                      color="white"
                    >
                      {muted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
                    </ActionIcon>
                  </Tooltip>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Slider
                      value={volume * 100}
                      onChange={(v) => setVolume(v / 100)}
                      w={80}
                      size="xs"
                      color="white"
                      styles={{
                        track: { backgroundColor: 'rgba(255,255,255,0.3)' },
                        bar: { backgroundColor: '#fff' },
                        thumb: { backgroundColor: '#fff', borderColor: '#fff' },
                      }}
                    />
                  </Box>
                </Group>

                {/* Скорость воспроизведения */}
                <Menu shadow="md" width={120}>
                  <Menu.Target>
                    <Tooltip label="Скорость воспроизведения">
                      <ActionIcon
                        variant="subtle"
                        color="white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconSettings size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Скорость</Menu.Label>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <Menu.Item
                        key={rate}
                        onClick={() => setPlaybackRate(rate)}
                        style={{ fontWeight: playbackRate === rate ? 700 : 400 }}
                      >
                        {rate}x {rate === 1 && '(норм.)'}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>

                {/* Полноэкранный режим */}
                <Tooltip label={isFullscreen ? 'Выйти из полноэкранного' : 'Полноэкранный режим'}>
                  <ActionIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFullscreen()
                    }}
                    variant="subtle"
                    color="white"
                  >
                    {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Stack>
        </Box>
      </Box>
    </Card>
  )
}
