# План реализации видеоплеера для ExamPrep

## Статус: ЗАВЕРШЕНО
**Дата начала:** 15.01.2026
**Дата завершения:** 15.01.2026

---

## Обзор задачи

Заменить текущую заглушку видеоплеера (`src/components/lesson/VideoPlayer.tsx`) на полноценный плеер с поддержкой:
- Реального воспроизведения видео (MP4, HLS)
- Интерактивных вопросов поверх видео
- Трекинга прогресса просмотра
- Кастомных контролов (скорость, громкость, полноэкранный режим)
- Сохранения позиции просмотра

---

## Выбранный стек

| Компонент | Решение | Причина |
|-----------|---------|---------|
| **Основной плеер** | react-player | Простота интеграции, встроенный HLS, маленький размер |
| **UI компоненты** | Mantine UI | Уже используется в проекте |
| **Иконки** | Tabler Icons | Уже используется в проекте |
| **Стейт менеджмент** | React hooks + Context | Консистентность с проектом |

---

## Тестовые видео для разработки

```typescript
// Рабочие URL для тестирования (проверено 15.01.2026)
export const TEST_VIDEOS = {
  // MP4 - для быстрого тестирования
  mp4: {
    bigBuckBunny: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    sintel: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  },

  // HLS - для тестирования стриминга
  hls: {
    apple: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    mux: 'https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8',
  }
};
```

---

## Прогресс выполнения

| Этап | Описание | Статус |
|------|----------|--------|
| 1 | Установка react-player | ✅ Завершено |
| 2 | Создание типов и констант | ✅ Завершено |
| 3 | Хук useVideoProgress | ✅ Завершено |
| 4 | Компонент InteractiveOverlay | ✅ Завершено |
| 5 | Основной VideoPlayer | ✅ Завершено |
| 6 | Обновление страниц | ✅ Завершено |
| 7 | Тестирование сборки | ✅ Завершено |

**Общий прогресс: 7/7 этапов (100%)**

---

## Структура созданных файлов

```
src/
├── components/
│   └── lesson/
│       ├── VideoPlayer.tsx          # ✅ Основной плеер (ОБНОВЛЕН)
│       └── InteractiveOverlay.tsx   # ✅ Overlay с вопросами (СОЗДАН)
├── hooks/
│   └── useVideoProgress.ts          # ✅ Хук трекинга прогресса (СОЗДАН)
├── types/
│   └── video.ts                     # ✅ TypeScript типы (СОЗДАН)
├── constants/
│   └── testVideos.ts                # ✅ Тестовые URL (СОЗДАН)
└── pages/
    ├── lesson/
    │   └── LessonVideo.tsx          # ✅ Обновлен для нового плеера
    └── daily/
        └── RegularLesson.tsx        # ✅ Обновлен для нового плеера
```

---

## Функциональность плеера

### Реализовано:
- ✅ Воспроизведение MP4 видео
- ✅ Воспроизведение HLS потоков (через hls.js)
- ✅ Play/Pause по клику на видео и кнопке
- ✅ Перемотка через слайдер
- ✅ Перемотка кнопками ±10 сек
- ✅ Изменение громкости
- ✅ Mute/Unmute
- ✅ Изменение скорости воспроизведения (0.5x - 2x)
- ✅ Полноэкранный режим
- ✅ Интерактивные вопросы поверх видео
- ✅ XP награды за правильные ответы
- ✅ Сохранение прогресса в localStorage
- ✅ Восстановление позиции при перезагрузке
- ✅ Отображение % просмотра
- ✅ Скрытие контролов при бездействии (3 сек)
- ✅ Адаптивный дизайн (mobile-first)

---

## Как использовать плеер

### Базовое использование:

```tsx
import { VideoPlayer } from '../../components/lesson/VideoPlayer'
import { TEST_VIDEOS } from '../../constants/testVideos'

function MyLessonPage() {
  return (
    <VideoPlayer
      src={TEST_VIDEOS.mp4.sintel}
      lessonId="my-lesson-id"
      title="Название урока"
      onComplete={() => console.log('Видео завершено')}
    />
  )
}
```

### С интерактивными вопросами:

```tsx
import { VideoPlayer } from '../../components/lesson/VideoPlayer'
import { TEST_VIDEOS, DEMO_QUESTIONS } from '../../constants/testVideos'

function MyLessonPage() {
  const handleQuestionAnswered = (questionId: string, isCorrect: boolean, xp: number) => {
    if (isCorrect) {
      // Добавить XP пользователю
      addXP(xp)
    }
  }

  return (
    <VideoPlayer
      src={TEST_VIDEOS.mp4.sintel}
      lessonId="my-lesson-id"
      title="Название урока"
      questions={DEMO_QUESTIONS}
      onQuestionAnswered={handleQuestionAnswered}
      onComplete={() => console.log('Видео завершено')}
    />
  )
}
```

### Создание своих вопросов:

```tsx
import type { InteractiveQuestion } from '../../types/video'

const myQuestions: InteractiveQuestion[] = [
  {
    id: 'q1',
    timestamp: 30,  // Вопрос появится на 30-й секунде
    question: 'Какой правильный ответ?',
    options: ['Ответ A', 'Ответ B', 'Ответ C', 'Ответ D'],
    correctIndex: 1,  // Правильный ответ: "Ответ B"
    xpReward: 15,
  },
]
```

---

## Чек-лист для тестирования

**Для проверки работоспособности:**

1. Запустить dev сервер: `npm run dev`
2. Перейти на страницу с видео:
   - `/lesson/first/video` - первый урок
   - `/daily/lesson` - ежедневный урок
3. Проверить:
   - [ ] Видео загружается и воспроизводится
   - [ ] Контролы работают (play, pause, громкость, скорость)
   - [ ] На 3-й секунде появляется интерактивный вопрос
   - [ ] После ответа видео продолжается
   - [ ] Прогресс сохраняется при перезагрузке страницы

---

## Возможные проблемы и решения

### Проблема 1: CORS при загрузке видео
**Решение:** Использовать прокси или CDN с правильными CORS headers

### Проблема 2: HLS не работает в Safari
**Решение:** Safari имеет нативную поддержку HLS, react-player обрабатывает это автоматически

### Проблема 3: Видео не воспроизводится на мобильных
**Решение:** Добавлен `playsInline` атрибут для корректной работы на iOS

### Проблема 4: Большой размер бандла (hls.js ~520KB)
**Решение:** Рассмотреть dynamic import или использовать только MP4 для MVP

---

## Следующие шаги (Post-MVP)

1. **Защита видео от скачивания** - интеграция с VdoCipher или Gumlet
2. **Адаптивный битрейт** - автоматический выбор качества на основе скорости соединения
3. **Субтитры** - поддержка VTT файлов
4. **Превью на таймлайне** - спрайты для превью при наведении на прогресс-бар
5. **Keyboard shortcuts** - горячие клавиши (пробел для pause, стрелки для перемотки)
6. **Analytics** - отправка событий просмотра на бэкенд
7. **Offline support** - кэширование видео для просмотра офлайн
8. **Bookmarks** - возможность ставить закладки в видео

---

## API Reference

### VideoPlayer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | ✅ | URL видео (MP4 или HLS) |
| `lessonId` | `string` | ✅ | Уникальный ID урока для сохранения прогресса |
| `title` | `string` | ❌ | Название видео (отображается в контролах) |
| `questions` | `InteractiveQuestion[]` | ❌ | Массив интерактивных вопросов |
| `onComplete` | `() => void` | ❌ | Callback при завершении видео |
| `onQuestionAnswered` | `(id, isCorrect, xp) => void` | ❌ | Callback при ответе на вопрос |

### InteractiveQuestion Type

```typescript
interface InteractiveQuestion {
  id: string           // Уникальный ID вопроса
  timestamp: number    // Секунда появления вопроса
  question: string     // Текст вопроса
  options: string[]    // Варианты ответов (4 шт)
  correctIndex: number // Индекс правильного ответа (0-3)
  xpReward?: number    // Награда за правильный ответ (по умолчанию 10)
}
```

---

## Заметки

- При продакшен деплое заменить тестовые URL на реальные
- Для продакшена рекомендуется использовать собственный CDN (Cloudflare Stream, Mux, AWS MediaConvert)
- Рассмотреть Vidstack для более сложных кейсов в будущем
- Добавить error boundary для обработки ошибок загрузки видео

---

*Версия документа: 1.0*
*Последнее обновление: 15.01.2026*
