import { LessonPackage } from '../types/lesson';

// A1, unit 8 "Shahar va xizmatlar" (lessons 44-48): places in town, the post office, the train, meeting up, apps.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_44_DATA: LessonPackage = {
  lesson_id: "a1_lesson_44",
  level: "A1",
  topic: "Shahar joylari",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Почта", translation: "Pochta", audio_text: "Почта" },
    { term: "Больница", translation: "Kasalxona", audio_text: "Больница" },
    { term: "Школа", translation: "Maktab", audio_text: "Школа" },
    { term: "Поликлиника", translation: "Poliklinika", audio_text: "Поликлиника" },
    { term: "Библиотека", translation: "Kutubxona", audio_text: "Библиотека" },
    { term: "Мечеть", translation: "Masjid", audio_text: "Мечеть" },
    { term: "Рынок", translation: "Bozor", audio_text: "Рынок" },
    { term: "Торговый центр", translation: "Savdo markazi", audio_text: "Торговый центр" },
    { term: "Как пройти к вокзалу?", translation: "Vokzalga qanday borsa boʻladi?", audio_text: "Как пройти к вокзалу?" },
    { term: "Напротив банка", translation: "Bank qarshisida", audio_text: "Напротив банка" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Где почта?' — 'почта' nima?",
      target_audio_text: "Где почта?",
      options: ["Pochta", "Bank", "Dorixona", "Maktab"],
      correct_answer: "Pochta",
      explanation: "‘Почта’ — pochta: xat va posilka joʻnatiladi."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Kasalxona bu yerdan uzoq emas'",
      target_audio_text: "Больница недалеко отсюда.",
      accepted_orders: ["Больница отсюда недалеко."],
      words_pool: ["Больница", "недалеко", "отсюда.", "больницы", "сюда"],
      correct_order: ["Больница", "недалеко", "отсюда."],
      explanation: "‘Больница’ — kasalxona. ‘Недалеко отсюда’ — bu yerdan uzoq emas."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Maktab uyning yonida'",
      sentence_with_blank: "___ рядом с домом.",
      blank_answer: "Школа",
      hint: "Gapning egasi",
      options: ["Школа", "Школу", "Школы", "Школой"],
      target_audio_text: "Школа рядом с домом.",
      explanation: "‘Школа’ — maktab. ‘Рядом с домом’ — uyning yonida."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Это поликлиника' — bu qanday joy?",
      target_audio_text: "Это поликлиника.",
      options: ["Shifokorlar qabul qiladigan joy", "Dori sotiladigan joy", "Kitob oʻqiladigan joy", "Sport bilan shugʻullanadigan joy"],
      correct_answer: "Shifokorlar qabul qiladigan joy",
      explanation: "‘Поликлиника’ — shifokorlar qabul qiladigan joy; ‘больница’ — yotib davolanadigan kasalxona."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Kutubxona kechgacha ochiq'",
      target_audio_text: "Библиотека открыта до вечера.",
      accepted_orders: ["Библиотека до вечера открыта."],
      words_pool: ["Библиотека", "открыта", "до", "вечера.", "открыт", "вечер"],
      correct_order: ["Библиотека", "открыта", "до", "вечера."],
      explanation: "‘Библиотека’ — kutubxona. ‘Открыта до вечера’ — kechgacha ochiq."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Soʻrang: 'Eng yaqin masjid qayerda?'",
      sentence_with_blank: "Где ближайшая ___?",
      blank_answer: "мечеть",
      hint: "Masjid",
      options: ["мечеть", "мечети", "мечетью", "мечетей"],
      target_audio_text: "Где ближайшая мечеть?",
      explanation: "‘Мечеть’ — masjid (ayol jinsi → ‘ближайшая’)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Рынок работает с утра' — 'рынок' nima?",
      target_audio_text: "Рынок работает с утра.",
      options: ["Bozor", "Doʻkon", "Bank", "Pochta"],
      correct_answer: "Bozor",
      explanation: "‘Рынок’ — bozor; ‘магазин’ — doʻkon. ‘С утра’ — ertalabdan."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Savdo markazi juda katta'",
      target_audio_text: "Торговый центр очень большой.",
      words_pool: ["Торговый", "центр", "очень", "большой.", "большая", "центре"],
      correct_order: ["Торговый", "центр", "очень", "большой."],
      explanation: "‘Торговый центр’ — savdo markazi: koʻp doʻkonlar bir binoda."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Oʻtkinchidan soʻrang: 'Vokzalga qanday borsa boʻladi?'",
      sentence_with_blank: "Как пройти к ___?",
      blank_answer: "вокзалу",
      hint: "‘К’ dan keyingi shakl",
      options: ["вокзалу", "вокзал", "вокзала", "вокзалом"],
      target_audio_text: "Как пройти к вокзалу?",
      explanation: "‘Как пройти к …?’ — …ga (piyoda) qanday borsa boʻladi? ‘К’ dan keyin: вокзал → к вокзалу."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Аптека напротив банка' gapi nimani anglatadi?",
      target_audio_text: "Аптека напротив банка.",
      options: ["Dorixona bank qarshisida", "Dorixona bank yonida", "Dorixona bank ichida", "Dorixona bankdan uzoqda"],
      correct_answer: "Dorixona bank qarshisida",
      explanation: "‘Напротив’ — qarshisida; ‘рядом с’ — yonida."
    }
  ]
};

export const LESSON_45_DATA: LessonPackage = {
  lesson_id: "a1_lesson_45",
  level: "A1",
  topic: "Pochtada",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Я хочу отправить посылку", translation: "Posilka joʻnatmoqchiman", audio_text: "Я хочу отправить посылку" },
    { term: "Посылка в Узбекистан", translation: "Oʻzbekistonga posilka", audio_text: "Посылка в Узбекистан" },
    { term: "Сколько стоит доставка?", translation: "Yetkazib berish qancha turadi?", audio_text: "Сколько стоит доставка?" },
    { term: "Конверт", translation: "Konvert", audio_text: "Конверт" },
    { term: "Адрес получателя", translation: "Oluvchining manzili", audio_text: "Адрес получателя" },
    { term: "Взвесьте, пожалуйста", translation: "Tortib bering, iltimos", audio_text: "Взвесьте, пожалуйста" },
    { term: "Трек-номер", translation: "Trek-raqam", audio_text: "Трек-номер" },
    { term: "Получить посылку", translation: "Posilkani olmoq", audio_text: "Получить посылку" },
    { term: "Паспорт нужен?", translation: "Pasport kerakmi?", audio_text: "Паспорт нужен?" },
    { term: "Сколько дней идёт?", translation: "Necha kunda yetib boradi?", audio_text: "Сколько дней идёт?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Pochtada ayting: 'Posilka joʻnatmoqchiman'",
      target_audio_text: "Я хочу отправить посылку.",
      options: ["Я хочу отправить посылку.", "Я хочу получить посылку.", "Я хочу купить конверт.", "Я хочу отправить деньги."],
      correct_answer: "Я хочу отправить посылку.",
      explanation: "‘Отправить’ — joʻnatmoq, ‘получить’ — olmoq. ‘Посылка’ → ‘отправить посылку’."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bu Oʻzbekistonga posilka'",
      target_audio_text: "Это посылка в Узбекистан.",
      words_pool: ["Это", "посылка", "в", "Узбекистан.", "Узбекистана", "посылку"],
      correct_order: ["Это", "посылка", "в", "Узбекистан."],
      explanation: "‘В Узбекистан’ — Oʻzbekistonga (qayerga?)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Soʻrang: 'Yetkazib berish qancha turadi?'",
      sentence_with_blank: "Сколько стоит ___?",
      blank_answer: "доставка",
      hint: "Gapning egasi",
      options: ["доставка", "доставку", "доставки", "доставкой"],
      target_audio_text: "Сколько стоит доставка?",
      explanation: "‘Доставка’ — yetkazib berish."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Мне нужен конверт' — 'конверт' nima?",
      target_audio_text: "Мне нужен конверт.",
      options: ["Konvert (xat uchun)", "Quti", "Marka", "Paket"],
      correct_answer: "Konvert (xat uchun)",
      explanation: "‘Конверт’ — konvert; ‘марка’ — pochta markasi; ‘коробка’ — quti."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Xodim aytdi: 'Oluvchining manzilini yozing'",
      target_audio_text: "Напишите адрес получателя.",
      words_pool: ["Напишите", "адрес", "получателя.", "получатель", "адреса"],
      correct_order: ["Напишите", "адрес", "получателя."],
      explanation: "‘Получатель’ — oluvchi; ‘адрес получателя’ — oluvchining manzili."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Xodimdan soʻrang: 'Posilkani tortib bering, iltimos'",
      sentence_with_blank: "___, пожалуйста, посылку.",
      blank_answer: "Взвесьте",
      hint: "Iltimos shakli (siz)",
      options: ["Взвесьте", "Взвесить", "Взвешу", "Взвесил"],
      target_audio_text: "Взвесьте, пожалуйста, посылку.",
      explanation: "‘Взвесить’ — tortmoq (ogʻirligini oʻlchamoq): ‘взвесьте’ — torting."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Xodim 'Вот ваш трек-номер' dedi. U nima uchun kerak?",
      target_audio_text: "Вот ваш трек-номер.",
      options: ["Posilkani kuzatish uchun", "Pul toʻlash uchun", "Pasport uchun", "Telefon qilish uchun"],
      correct_answer: "Posilkani kuzatish uchun",
      explanation: "‘Трек-номер’ — posilka qayerdaligini internetda kuzatish raqami."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting (erkak kishi): 'Posilka olgani keldim'",
      target_audio_text: "Я пришёл получить посылку.",
      words_pool: ["Я", "пришёл", "получить", "посылку.", "посылки", "получу"],
      correct_order: ["Я", "пришёл", "получить", "посылку."],
      explanation: "‘Получить посылку’ — posilkani olmoq. ‘Я пришёл’ — keldim (ayol: ‘я пришла’)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Soʻrang: 'Pasport kerakmi?'",
      sentence_with_blank: "Паспорт ___?",
      blank_answer: "нужен",
      hint: "‘Паспорт’ erkak jinsida",
      options: ["нужен", "нужна", "нужно", "нужны"],
      target_audio_text: "Паспорт нужен?",
      explanation: "‘Паспорт’ erkak jinsi → ‘нужен’ (posilka olishda pasport soʻraladi)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Сколько дней идёт посылка?' savoli nimani anglatadi?",
      target_audio_text: "Сколько дней идёт посылка?",
      options: ["Posilka necha kunda yetib boradi?", "Posilka qancha turadi?", "Posilka qayerda?", "Posilka qancha ogʻir?"],
      correct_answer: "Posilka necha kunda yetib boradi?",
      explanation: "‘Посылка идёт’ — posilka yoʻlda (boryapti); ‘сколько дней’ — necha kun."
    }
  ]
};

export const LESSON_46_DATA: LessonPackage = {
  lesson_id: "a1_lesson_46",
  level: "A1",
  topic: "Poyezdda sayohat",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Поезд Москва — Ташкент", translation: "Moskva–Toshkent poyezdi", audio_text: "Поезд Москва — Ташкент" },
    { term: "Билет на поезд", translation: "Poyezdga chipta", audio_text: "Билет на поезд" },
    { term: "Купе", translation: "Kupe (yopiq boʻlma)", audio_text: "Купе" },
    { term: "Плацкарт", translation: "Platskart (ochiq vagon)", audio_text: "Плацкарт" },
    { term: "Вагон номер семь", translation: "Yettinchi vagon", audio_text: "Вагон номер семь" },
    { term: "Верхняя полка", translation: "Yuqori oʻrin (polka)", audio_text: "Верхняя полка" },
    { term: "Проводник", translation: "Provodnik (vagon xizmatchisi)", audio_text: "Проводник" },
    { term: "Поезд отправляется в десять", translation: "Poyezd soat oʻnda joʻnaydi", audio_text: "Поезд отправляется в десять" },
    { term: "Вокзал", translation: "Vokzal", audio_text: "Вокзал" },
    { term: "Сколько ехать?", translation: "Yoʻl qancha vaqt oladi?", audio_text: "Сколько ехать?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Это поезд Москва — Ташкент' — bu qanday poyezd?",
      target_audio_text: "Это поезд Москва — Ташкент.",
      options: ["Moskva–Toshkent poyezdi", "Toshkent–Samarqand poyezdi", "Moskva metrosi", "Aeroport avtobusi"],
      correct_answer: "Moskva–Toshkent poyezdi",
      explanation: "‘Поезд’ — poyezd. ‘Москва — Ташкент’ — Moskvadan Toshkentga."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Kassada ayting: 'Menga poyezdga chipta kerak'",
      target_audio_text: "Мне нужен билет на поезд.",
      words_pool: ["Мне", "нужен", "билет", "на", "поезд.", "нужна", "билеты"],
      correct_order: ["Мне", "нужен", "билет", "на", "поезд."],
      explanation: "‘Билет на поезд’ — poyezdga chipta. ‘Билет’ erkak jinsi → ‘нужен’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Men kupeda borishni xohlayman'",
      sentence_with_blank: "Я хочу ехать в ___.",
      blank_answer: "купе",
      hint: "Yopiq boʻlma (soʻz oʻzgarmaydi)",
      options: ["купе", "плацкарте", "вагоне", "поезде"],
      target_audio_text: "Я хочу ехать в купе.",
      explanation: "‘Купе’ — 4 kishilik yopiq boʻlma; bu soʻz oʻzgarmaydi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У меня билет в плацкарт' — 'плацкарт' qanday vagon?",
      target_audio_text: "У меня билет в плацкарт.",
      options: ["Ochiq vagon (arzonroq)", "Yopiq 4 kishilik boʻlma", "Restoran-vagon", "Birinchi klass"],
      correct_answer: "Ochiq vagon (arzonroq)",
      explanation: "‘Плацкарт’ — boʻlmalari ochiq, arzonroq vagon; ‘купе’ — yopiq boʻlma."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Bizning vagonimiz yettinchi'",
      target_audio_text: "Наш вагон номер семь.",
      words_pool: ["Наш", "вагон", "номер", "семь.", "вагоны", "номера"],
      correct_order: ["Наш", "вагон", "номер", "семь."],
      explanation: "‘Вагон номер семь’ — 7-vagon. ‘Вагон’ erkak jinsi → ‘наш’."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Mening joyim yuqori polkada'",
      sentence_with_blank: "У меня верхняя ___.",
      blank_answer: "полка",
      hint: "Gapning egasi",
      options: ["полка", "полку", "полки", "полкой"],
      target_audio_text: "У меня верхняя полка.",
      explanation: "‘Верхняя полка’ — yuqori oʻrin; ‘нижняя полка’ — pastki oʻrin."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Спросите у проводника' — 'проводник' kim?",
      target_audio_text: "Спросите у проводника.",
      options: ["Vagon xizmatchisi", "Haydovchi", "Kassir", "Politsiyachi"],
      correct_answer: "Vagon xizmatchisi",
      explanation: "‘Проводник’ — vagon xizmatchisi: chiptani tekshiradi, choy beradi."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Poyezd soat oʻnda joʻnaydi'",
      target_audio_text: "Поезд отправляется в десять.",
      accepted_orders: ["В десять отправляется поезд.", "Поезд в десять отправляется."],
      words_pool: ["Поезд", "отправляется", "в", "десять.", "десяти", "отправился"],
      correct_order: ["Поезд", "отправляется", "в", "десять."],
      explanation: "‘Отправляться’ — joʻnamoq: ‘поезд отправляется в десять’."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Doʻstingizga ayting: 'Vokzalda uchrashamiz'",
      sentence_with_blank: "Мы встречаемся на ___.",
      blank_answer: "вокзале",
      hint: "‘На’ (…da) dan keyingi shakl",
      options: ["вокзале", "вокзал", "вокзала", "вокзалом"],
      target_audio_text: "Мы встречаемся на вокзале.",
      explanation: "‘Вокзал’ — vokzal; ‘на вокзале’ — vokzalda."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Сколько ехать до Ташкента?' savoli nimani anglatadi?",
      target_audio_text: "Сколько ехать до Ташкента?",
      options: ["Toshkentgacha yoʻl qancha vaqt oladi?", "Toshkentgacha chipta qancha?", "Toshkent qayerda?", "Toshkentga qachon boramiz?"],
      correct_answer: "Toshkentgacha yoʻl qancha vaqt oladi?",
      explanation: "‘Сколько ехать?’ — yoʻl qancha vaqt oladi? ‘До Ташкента’ — Toshkentgacha."
    }
  ]
};

export const LESSON_47_DATA: LessonPackage = {
  lesson_id: "a1_lesson_47",
  level: "A1",
  topic: "Uchrashuv va taklif",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Давай встретимся", translation: "Keling, uchrashaylik", audio_text: "Давай встретимся" },
    { term: "Во сколько?", translation: "Soat nechada?", audio_text: "Во сколько?" },
    { term: "Где встретимся?", translation: "Qayerda uchrashamiz?", audio_text: "Где встретимся?" },
    { term: "Я свободен", translation: "Boʻshman", audio_text: "Я свободен", alternatives: ["Я свободна"] },
    { term: "Я занят", translation: "Bandman", audio_text: "Я занят", alternatives: ["Я занята"] },
    { term: "Давай в другой день", translation: "Boshqa kuni boʻlsa-chi", audio_text: "Давай в другой день" },
    { term: "Я приду", translation: "Kelaman", audio_text: "Я приду" },
    { term: "Не могу, извини", translation: "Kela olmayman, kechir", audio_text: "Не могу, извини" },
    { term: "Отличная идея!", translation: "Ajoyib fikr!", audio_text: "Отличная идея!" },
    { term: "До встречи!", translation: "Koʻrishguncha!", audio_text: "До встречи!" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Doʻstingiz 'Давай встретимся в субботу' dedi. Bu nima degani?",
      target_audio_text: "Давай встретимся в субботу.",
      options: ["Shanba kuni uchrashaylik", "Shanba kuni ishlaymiz", "Shanba kuni qoʻngʻiroq qil", "Shanba kuni dam olaman"],
      correct_answer: "Shanba kuni uchrashaylik",
      explanation: "‘Давай встретимся’ — keling, uchrashaylik."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Rozi boʻlib soʻrang: 'Yaxshi, soat nechada?'",
      target_audio_text: "Хорошо, во сколько?",
      words_pool: ["Хорошо,", "во", "сколько?", "в", "какой"],
      correct_order: ["Хорошо,", "во", "сколько?"],
      explanation: "‘Во сколько?’ — soat nechada? (vaqtni soʻrash)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Soʻrang: 'Qayerda uchrashamiz?'",
      sentence_with_blank: "Где ___?",
      blank_answer: "встретимся",
      hint: "Biz… (kelasi zamon)",
      options: ["встретимся", "встретились", "встретит", "встретиться"],
      target_audio_text: "Где встретимся?",
      explanation: "‘Встретиться’ — uchrashmoq: ‘где встретимся?’ — qayerda uchrashamiz?"
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Вечером я свободен' gapi nimani anglatadi?",
      target_audio_text: "Вечером я свободен.",
      options: ["Kechqurun boʻshman", "Kechqurun bandman", "Kechqurun ishlayman", "Kechqurun uydaman"],
      correct_answer: "Kechqurun boʻshman",
      explanation: "‘Свободен’ — boʻsh (erkak); ayol: ‘свободна’."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting (erkak kishi): 'Kechir, men bandman'",
      target_audio_text: "Извини, я занят.",
      accepted_orders: ["Я занят, извини."],
      words_pool: ["Извини,", "я", "занят.", "заняты", "занятый"],
      correct_order: ["Извини,", "я", "занят."],
      explanation: "‘Занят’ — band (erkak); ayol: ‘занята’."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Taklif qiling: 'Boshqa kuni boʻlsa-chi'",
      sentence_with_blank: "Давай в другой ___.",
      blank_answer: "день",
      hint: "Kun",
      options: ["день", "дня", "дню", "днём"],
      target_audio_text: "Давай в другой день.",
      explanation: "‘В другой день’ — boshqa kuni."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Я приду в семь' gapi nimani anglatadi?",
      target_audio_text: "Я приду в семь.",
      options: ["Soat yettida kelaman", "Soat yettida ketaman", "Soat yettida qoʻngʻiroq qilaman", "Soat yettida uxlayman"],
      correct_answer: "Soat yettida kelaman",
      explanation: "‘Прийти’ — kelmoq: ‘я приду’ — kelaman."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Taklifni rad eting: 'Kela olmayman, kechir'",
      target_audio_text: "Не могу, извини.",
      accepted_orders: ["Извини, не могу."],
      words_pool: ["Не", "могу,", "извини.", "можно", "могут"],
      correct_order: ["Не", "могу,", "извини."],
      explanation: "‘Не могу’ — qila olmayman (kela olmayman); ‘извини’ — kechir."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Taklifga xursand boʻlib javob bering: 'Ajoyib fikr!'",
      sentence_with_blank: "Отличная ___!",
      blank_answer: "идея",
      hint: "Fikr (ayol jinsi)",
      options: ["идея", "идею", "идеи", "идеей"],
      target_audio_text: "Отличная идея!",
      explanation: "‘Отличная идея!’ — ajoyib fikr!"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Xayrlashayotganda ayting: 'Koʻrishguncha!'",
      target_audio_text: "До встречи!",
      options: ["До встречи!", "Добрый вечер!", "Приятного аппетита!", "С днём рождения!"],
      correct_answer: "До встречи!",
      explanation: "‘До встречи!’ — koʻrishguncha! (‘до скорой встречи’ — tez orada koʻrishguncha)."
    }
  ]
};

export const LESSON_48_DATA: LessonPackage = {
  lesson_id: "a1_lesson_48",
  level: "A1",
  topic: "Ilovalar va internet",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Скачайте приложение", translation: "Ilovani yuklab oling", audio_text: "Скачайте приложение" },
    { term: "Госуслуги", translation: "Gosuslugi (davlat xizmatlari portali)", audio_text: "Госуслуги" },
    { term: "Пароль", translation: "Parol", audio_text: "Пароль" },
    { term: "Код из СМС", translation: "SMS-dagi kod", audio_text: "Код из СМС" },
    { term: "Войти в аккаунт", translation: "Akkauntga kirmoq", audio_text: "Войти в аккаунт" },
    { term: "Заказать такси", translation: "Taksi buyurtma qilmoq", audio_text: "Заказать такси" },
    { term: "Перевести деньги", translation: "Pul oʻtkazmoq", audio_text: "Перевести деньги" },
    { term: "Обновите приложение", translation: "Ilovani yangilang", audio_text: "Обновите приложение" },
    { term: "Нет связи", translation: "Aloqa yoʻq", audio_text: "Нет связи" },
    { term: "Зарядить телефон", translation: "Telefonni quvvatlamoq", audio_text: "Зарядить телефон" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Скачайте приложение' nimani anglatadi?",
      target_audio_text: "Скачайте приложение.",
      options: ["Ilovani yuklab oling", "Ilovani oʻchiring", "Ilovani yangilang", "Ilovani oching"],
      correct_answer: "Ilovani yuklab oling",
      explanation: "‘Скачать’ — yuklab olmoq; ‘приложение’ — ilova (dastur)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Xodim aytdi: 'Gosuslugi orqali yoziling'",
      target_audio_text: "Запишитесь через Госуслуги.",
      accepted_orders: ["Через Госуслуги запишитесь."],
      words_pool: ["Запишитесь", "через", "Госуслуги.", "Госуслугах", "записаться"],
      correct_order: ["Запишитесь", "через", "Госуслуги."],
      explanation: "‘Госуслуги’ — davlat xizmatlari portali: hujjatlar, navbat, jarimalar."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ekranda yozuv: 'Parolni kiriting'",
      sentence_with_blank: "Введите ___.",
      blank_answer: "пароль",
      hint: "Shakli oʻzgarmaydi",
      options: ["пароль", "пароля", "паролем", "паролю"],
      target_audio_text: "Введите пароль.",
      explanation: "‘Пароль’ — parol. ‘Введите’ — kiriting."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Ekranda 'Введите код из СМС' deb yozilgan. Nimani kiritish kerak?",
      target_audio_text: "Введите код из СМС.",
      options: ["SMS-da kelgan kodni", "Parolni", "Telefon raqamni", "Ismingizni"],
      correct_answer: "SMS-da kelgan kodni",
      explanation: "‘Код из СМС’ — telefonga SMS orqali kelgan kod. Uni hech kimga aytmang!"
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Akkauntga kira olmayapman'",
      target_audio_text: "Я не могу войти в аккаунт.",
      words_pool: ["Я", "не", "могу", "войти", "в", "аккаунт.", "аккаунте", "выйти"],
      correct_order: ["Я", "не", "могу", "войти", "в", "аккаунт."],
      explanation: "‘Войти в аккаунт’ — akkauntga kirmoq; ‘выйти’ — chiqmoq."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Soʻrang: 'Taksini qanday buyurtma qilsa boʻladi?'",
      sentence_with_blank: "Как ___ такси?",
      blank_answer: "заказать",
      hint: "Feʼlning lugʻat shakli",
      options: ["заказать", "закажу", "заказал", "закажи"],
      target_audio_text: "Как заказать такси?",
      explanation: "‘Заказать такси’ — taksi buyurtma qilmoq (ilova orqali)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Можно перевести деньги по номеру телефона' gapi nimani anglatadi?",
      target_audio_text: "Можно перевести деньги по номеру телефона.",
      options: ["Telefon raqami orqali pul oʻtkazish mumkin", "Telefonga pul solish mumkin", "Telefon sotib olish mumkin", "Telefon raqamini almashtirish mumkin"],
      correct_answer: "Telefon raqami orqali pul oʻtkazish mumkin",
      explanation: "‘Перевести деньги’ — pul oʻtkazmoq; ‘по номеру телефона’ — telefon raqami orqali."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ekranda yozuv: 'Ilovani yangilang, iltimos'",
      target_audio_text: "Обновите приложение, пожалуйста.",
      accepted_orders: ["Пожалуйста, обновите приложение."],
      words_pool: ["Обновите", "приложение,", "пожалуйста.", "обновить", "приложения"],
      correct_order: ["Обновите", "приложение,", "пожалуйста."],
      explanation: "‘Обновить’ — yangilamoq: ‘обновите приложение’ — ilovani yangilang."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Bu yerda aloqa yoʻq'",
      sentence_with_blank: "Здесь нет ___.",
      blank_answer: "связи",
      hint: "‘Нет’ dan keyingi shakl",
      options: ["связи", "связь", "связью", "связей"],
      target_audio_text: "Здесь нет связи.",
      explanation: "‘Связь’ — aloqa: ‘нет связи’ — aloqa yoʻq (‘нет’ dan keyin: связь → связи)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Мне нужно зарядить телефон' gapi nimani anglatadi?",
      target_audio_text: "Мне нужно зарядить телефон.",
      options: ["Telefonimni quvvatlashim kerak", "Telefonimni sotishim kerak", "Telefon qilishim kerak", "Telefonimni oʻchirishim kerak"],
      correct_answer: "Telefonimni quvvatlashim kerak",
      explanation: "‘Зарядить телефон’ — telefonni quvvatlamoq (‘зарядка’ — zaryadka)."
    }
  ]
};

