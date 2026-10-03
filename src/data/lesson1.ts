import { LessonPackage } from '../types/lesson';

export const LESSON_1_DATA: LessonPackage = {
  lesson_id: "a1_lesson_01",
  level: "A1",
  topic: "Tanishuv va salomlashish",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 5,
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Rasmiy vaziyatda 'Assalomu alaykum' deb salomlashish uchun qaysi soʻz ishlatiladi?",
      target_audio_text: "Здравствуйте!",
      options: [
        "Здравствуйте",
        "До свидания",
        "Пожалуйста",
        "Спасибо"
      ],
      correct_answer: "Здравствуйте",
      explanation: "‘Здравствуйте’ — rus tilida kattalarga, hamkasblarga yoki notanish insonlarga aytiladigan rasmiy salomlashuv boʻlib, 'sogʻ-omon boʻling' maʼnosini bildiradi."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri tartibda terib: 'Mening ismim Anvar' jumlasini hosil qiling.",
      target_audio_text: "Меня зовут Анвар.",
      words_pool: [
        "Анвар",
        "Меня",
        "зовут",
        "Привет",
        "как"
      ],
      correct_order: [
        "Меня",
        "зовут",
        "Анвар"
      ],
      explanation: "Rus tilida ism aytishda soʻzma-soʻz 'Meni chaqirishadi' maʼnosini anglatuvchi ‘Меня зовут + Ism’ qolipi qoʻllaniladi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Nuqtalar oʻrniga mos soʻzni qoʻying: 'Sizning ismingiz nima?' (rasmiy hurmat shakli)",
      sentence_with_blank: "Как ___ зовут?",
      blank_answer: "вас",
      hint: "Hurmat maʼnosidagi kishilik olmoshi",
      options: [
        "вас",
        "тебя",
        "меня",
        "его"
      ],
      target_audio_text: "Как вас зовут?",
      explanation: "Rasmiy va hurmat ohangida kattalarga ‘Как вас зовут?’ deyiladi. Norasmiy tengdoshlar orasida esa ‘Как тебя зовут?’ ishlatiladi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Tanishuv paytida 'Tanishganimdan juda xursandman' maʼnosini bildiruvchi toʻgʻri iborani tanlang:",
      target_audio_text: "Очень приятно!",
      options: [
        "Очень приятно",
        "Доброе утро",
        "Не за что",
        "Извините"
      ],
      correct_answer: "Очень приятно",
      explanation: "‘Очень приятно’ iborasi yangi kishi bilan tanishganda 'Siz bilan tanishish menga juda yoqimli/mamnunman' maʼnosida aytiladi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri ketma-ketlikda terib: 'Salom, koʻrishguncha!' jumlasini tuzing.",
      target_audio_text: "Привет, до скорой встречи!",
      words_pool: [
        "Привет,",
        "до",
        "скорой",
        "встречи!",
        "Добро",
        "пожаловать"
      ],
      correct_order: [
        "Привет,",
        "до",
        "скорой",
        "встречи!"
      ],
      explanation: "‘Привет’ — doʻstona norasmiy salom, ‘До скорой встречи’ esa tez orada qayta koʻrishish niyatida aytiladigan samimiy xayrlashuvdir."
    }
  ]
};
