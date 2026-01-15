import type { InteractiveQuestion } from '../types/video'

// Тестовые видео для разработки (проверено 15.01.2026)
export const TEST_VIDEOS = {
  // MP4 - для быстрого тестирования
  mp4: {
    // Big Buck Bunny - классическое тестовое видео (10 сек, 2MB)
    bigBuckBunny: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    // Sintel trailer (52 сек) - более длинное для тестирования прогресса
    sintel: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    // Blender Open Movie - Elephants Dream
    elephantsDream: 'https://media.w3.org/2010/05/video/movie_300.mp4',
  },

  // HLS - для тестирования адаптивного стриминга
  hls: {
    // Apple официальный тестовый поток (рекомендуется)
    apple: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    // Mux демо поток
    mux: 'https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8',
    // Live stream тест (Akamai)
    live: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  },
}

// Демо-вопросы для тестирования интерактивности
export const DEMO_QUESTIONS: InteractiveQuestion[] = [
  {
    id: 'demo-q1',
    timestamp: 3,
    question: 'Какой персонаж показан в видео?',
    options: ['Кролик', 'Медведь', 'Слон', 'Лиса'],
    correctIndex: 0,
    xpReward: 10,
  },
  {
    id: 'demo-q2',
    timestamp: 7,
    question: 'Это тестовый вопрос. Выберите любой ответ:',
    options: ['Ответ A', 'Ответ B', 'Ответ C', 'Ответ D'],
    correctIndex: 1,
    xpReward: 10,
  },
]

// Вопросы для образовательного контента (пример для урока по ЕГЭ)
export const EGE_INTRO_QUESTIONS: InteractiveQuestion[] = [
  {
    id: 'ege-q1',
    timestamp: 30,
    question: 'Сколько обязательных предметов нужно сдать на ЕГЭ?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, // Русский и математика
    xpReward: 15,
  },
  {
    id: 'ege-q2',
    timestamp: 90,
    question: 'Какой максимальный балл можно получить за один предмет ЕГЭ?',
    options: ['50', '80', '100', '150'],
    correctIndex: 2,
    xpReward: 15,
  },
  {
    id: 'ege-q3',
    timestamp: 150,
    question: 'Можно ли пересдать ЕГЭ в тот же год?',
    options: [
      'Да, любой предмет',
      'Только обязательные предметы',
      'Нет, только на следующий год',
      'Только если не сдал',
    ],
    correctIndex: 1,
    xpReward: 20,
  },
]
