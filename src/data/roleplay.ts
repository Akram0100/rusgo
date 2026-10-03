// Role-play dialogues. A scenario alternates the other person's lines (npc) with lines the learner picks
// (user, with options of which exactly one is correct), starting with the other person.

export interface DialogueStep {
  speaker: 'npc' | 'user';
  name: string;
  ru: string;
  uz: string;
  options?: {
    text: string;
    uz: string;
    isCorrect: boolean;
  }[];
}

export interface Scenario {
  id: string;
  title: string;
  topicUz: string;
  icon: string;
  steps: DialogueStep[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    title: 'В кафе (Kafeda)',
    topicUz: 'Qahva va nonushta buyurtma berish',
    icon: '☕',
    steps: [
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Здравствуйте! Что будете заказывать?',
        uz: 'Assalomu alaykum! Nima buyurtma qilasiz?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Здравствуйте! Кофе, пожалуйста.',
        uz: 'Salom! Qahva bering, iltimos.',
        options: [
          { text: 'Здравствуйте! Кофе, пожалуйста.', uz: 'Salom! Qahva bering, iltimos.', isCorrect: true },
          { text: 'До свидания, пока.', uz: 'Xayr, koʻrishguncha.', isCorrect: false },
          { text: 'Я не знаю русский.', uz: 'Men rus tilini bilmayman.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Вам с молоком или без молока?',
        uz: 'Sizga sutli boʻlsinmi yoki sutsizmi?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'С молоком и сахаром, спасибо.',
        uz: 'Sut va shakar bilan, rahmat.',
        options: [
          { text: 'С молоком и сахаром, спасибо.', uz: 'Sut va shakar bilan, rahmat.', isCorrect: true },
          { text: 'Где находится метро?', uz: 'Metro qayerda joylashgan?', isCorrect: false },
          { text: 'Меня зовут Алишер.', uz: 'Mening ismim Alisher.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Отлично! Ваш кофе будет готов через пять минут.',
        uz: 'Ajoyib! Qahvangiz besh daqiqada tayyor boʻladi.',
      },
    ],
  },
  {
    id: 'meeting',
    title: 'Знакомство (Tanishuv)',
    topicUz: 'Yangi doʻst bilan tanishish va suhbatlashish',
    icon: '🤝',
    steps: [
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Привет! Как тебя зовут?',
        uz: 'Salom! Isming nima?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Привет! Меня зовут Азиз. А тебя?',
        uz: 'Salom! Mening ismim Aziz. Seniki-chi?',
        options: [
          { text: 'Привет! Меня зовут Азиз. А тебя?', uz: 'Salom! Mening ismim Aziz. Seniki-chi?', isCorrect: true },
          { text: 'Сколько это стоит?', uz: 'Bu qancha turadi?', isCorrect: false },
          { text: 'Приятного аппетита!', uz: 'Yoqimli ishtaha!', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Очень приятно! Ты откуда приехал?',
        uz: 'Juda xursandman! Qayerdan kelgansan?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Я из Узбекистана, из Ташкента.',
        uz: 'Men Oʻzbekistondanman, Toshkentdan.',
        options: [
          { text: 'Я из Узбекистана, из Ташкента.', uz: 'Men Oʻzbekistondanman, Toshkentdan.', isCorrect: true },
          { text: 'Я хочу спать.', uz: 'Men uxlamoqchiman.', isCorrect: false },
          { text: 'Спасибо, всё вкусно.', uz: 'Rahmat, hammasi mazali.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Замечательно! Добро пожаловать!',
        uz: 'Ajoyib! Xush kelibsan!',
      },
    ],
  },
  {
    id: 'taxi',
    title: 'В такси (Taksida)',
    topicUz: 'Haydovchiga manzil aytish va hisoblashish',
    icon: '🚕',
    steps: [
      {
        speaker: 'npc',
        name: 'Haydovchi',
        ru: 'Добрый день! Куда едем?',
        uz: 'Xayrli kun! Qayerga boramiz?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Добрый день! До вокзала, пожалуйста.',
        uz: 'Xayrli kun! Vokzalgacha, iltimos.',
        options: [
          { text: 'Добрый день! До вокзала, пожалуйста.', uz: 'Xayrli kun! Vokzalgacha, iltimos.', isCorrect: true },
          { text: 'Я люблю читать книги.', uz: 'Men kitob oʻqishni yoqtiraman.', isCorrect: false },
          { text: 'Какая сегодня погода?', uz: 'Bugun havo qanday?', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Haydovchi',
        ru: 'Хорошо. Мы приехали. С вас триста рублей.',
        uz: 'Yaxshi. Yetib keldik. Sizdan uch yuz rubl.',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Вот, возьмите, спасибо большое!',
        uz: 'Mana oling, katta rahmat!',
        options: [
          { text: 'Вот, возьмите, спасибо большое!', uz: 'Mana oling, katta rahmat!', isCorrect: true },
          { text: 'Где находится аптека?', uz: 'Dorixona qayerda?', isCorrect: false },
          { text: 'Меня зовут Тимур.', uz: 'Mening ismim Timur.', isCorrect: false },
        ],
      },
    ],
  },
];
