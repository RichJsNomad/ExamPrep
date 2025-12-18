import { Container, Stack, Title, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SubjectProgressCard,
  RecommendationsCard,
  PraiseModal,
} from '../../components/parent'
import { notifications } from '@mantine/notifications'

export function ParentDetails() {
  const navigate = useNavigate()
  const [praiseModalOpened, setPraiseModalOpened] = useState(false)

  const studentName = 'Миша'

  // Моковые данные для математики
  const mathProgress = {
    subject: 'Математика профиль',
    progress: 78,
    topicsCompleted: 18,
    totalTopics: 23,
    averageScore: 82,
    weekActivity: [
      { day: 'Пн', hours: 2 },
      { day: 'Вт', hours: 3 },
      { day: 'Ср', hours: 1 },
      { day: 'Чт', hours: 2 },
      { day: 'Пт', hours: 0 },
      { day: 'Сб', hours: 1.5 },
      { day: 'Вс', hours: 0.5 },
    ],
    classRanking: 'Миша в топ-20% по времени занятий (анонимно)',
  }

  const recommendations = [
    {
      type: 'success' as const,
      icon: '✅',
      message: 'Миша занимается регулярно — отлично!',
    },
    {
      type: 'warning' as const,
      icon: '⚠️',
      message: 'Физика отстаёт. Рекомендуем добавить 15 мин/день',
    },
    {
      type: 'info' as const,
      icon: '💡',
      message: 'Пробный ЕГЭ по математике давно не сдавал (14 дней)',
    },
  ]

  const handleRemind = () => {
    notifications.show({
      title: 'Напоминание отправлено',
      message: `${studentName} получит Push: "Папа напоминает о занятиях. Не теряй стрик!"`,
      color: 'blue',
    })
  }

  const handleSendPraise = (sticker: string, xp: number) => {
    notifications.show({
      title: 'Похвала отправлена!',
      message: `${studentName} получит Push: "Папа отправил тебе ${sticker} и +${xp} XP!"`,
      color: 'green',
    })
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate('/parent/dashboard')}
          w="fit-content"
        >
          Назад к дашборду
        </Button>

        <Title order={1}>Прогресс по предметам</Title>

        {/* Математика */}
        <SubjectProgressCard
          subject={mathProgress.subject}
          progress={mathProgress.progress}
          topicsCompleted={mathProgress.topicsCompleted}
          totalTopics={mathProgress.totalTopics}
          averageScore={mathProgress.averageScore}
          weekActivity={mathProgress.weekActivity}
          classRanking={mathProgress.classRanking}
        />

        <Button variant="outline" fullWidth>
          Посмотреть все предметы
        </Button>

        {/* Рекомендации */}
        <RecommendationsCard
          recommendations={recommendations}
          onRemind={handleRemind}
          onPraise={() => setPraiseModalOpened(true)}
          onMessage={() =>
            notifications.show({
              title: 'Функция в разработке',
              message: 'Отправка сообщений будет доступна позже',
              color: 'blue',
            })
          }
        />
      </Stack>

      <PraiseModal
        opened={praiseModalOpened}
        onClose={() => setPraiseModalOpened(false)}
        onSend={handleSendPraise}
        studentName={studentName}
      />
    </Container>
  )
}
