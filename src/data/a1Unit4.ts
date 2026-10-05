import { LessonPackage } from '../types/lesson';

// A1, unit 4 "Rossiyada hayot" (lessons 23-28): documents, looking for work, renting a room, the doctor,
// emergencies, holidays and greetings. Each vocabulary item appears in an exercise, so the trainer teaches it
// on a card right before it is tested.

export const LESSON_23_DATA: LessonPackage = {
  lesson_id: "a1_lesson_23",
  level: "A1",
  topic: "Hujjatlar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Ваш паспорт, пожалуйста", translation: "Pasportingiz, iltimos", audio_text: "Ваш паспорт, пожалуйста" },
    { term: "Вот мой паспорт", translation: "Mana mening pasportim", audio_text: "Вот мой паспорт" },
    { term: "У меня есть регистрация", translation: "Menda registratsiya bor", audio_text: "У меня есть регистрация" },
    { term: "Миграционная карта", translation: "Migratsiya kartasi", audio_text: "Миграционная карта" },
    { term: "Патент на работу", translation: "Ishlash uchun patent", audio_text: "Патент на работу" },
    { term: "Документы готовы", translation: "Hujjatlar tayyor", audio_text: "Документы готовы" },
    { term: "Заполните анкету", translation: "Anketani toʻldiring", audio_text: "Заполните анкету" },
    { term: "Подпишите здесь", translation: "Shu yerga imzo qoʻying", audio_text: "Подпишите здесь" },
    { term: "Фамилия и имя", translation: "Familiya va ism", audio_text: "Фамилия и имя" },
    { term: "Дата рождения", translation: "Tugʻilgan sana", audio_text: "Дата рождения" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Politsiyachi 'Ваш паспорт, пожалуйста' dedi. Bu nima degani?",
      target_audio_text: "Ваш паспорт, пожалуйста.",
      options: ["Pasportingizni koʻrsating, iltimos", "Pasportingiz qayerda?", "Pasportingizni yoʻqotdingizmi?", "Pasportingizni oling"],
      correct_answer: "Pasportingizni koʻrsating, iltimos",
      explanation: "‘Ваш паспорт, пожалуйста’ — hujjat tekshiruvi: pasportingizni koʻrsating."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Pasportni uzatib ayting: 'Mana mening pasportim'",
      target_audio_text: "Вот мой паспорт.",
      words_pool: ["Вот", "мой", "паспорт.", "моя", "паспорта"],
      correct_order: ["Вот", "мой", "паспорт."],
      explanation: "‘Вот …’ — mana … ‘Паспорт’ erkak jinsida: ‘мой паспорт’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Menda registratsiya bor'",
      sentence_with_blank: "У меня есть ___.",
      blank_answer: "регистрация",
      hint: "‘У меня есть …’ dan keyin shakl oʻzgarmaydi",
      options: ["регистрация", "регистрацию", "регистрации", "регистрацией"],
      target_audio_text: "У меня есть регистрация.",
      explanation: "‘Регистрация’ — yashash joyida roʻyxatdan oʻtganlik hujjati."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Chegarada sizga 'Это ваша миграционная карта' deb qogʻoz berishdi. Bu nima?",
      target_audio_text: "Это ваша миграционная карта.",
      options: ["Migratsiya kartasi", "Bank kartasi", "Shahar xaritasi", "Yoʻl chiptasi"],
      correct_answer: "Migratsiya kartasi",
      explanation: "‘Миграционная карта’ — chegarada beriladigan migratsiya kartasi. Uni yoʻqotmang!"
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Menga ishlash uchun patent kerak'",
      target_audio_text: "Мне нужен патент на работу.",
      words_pool: ["Мне", "нужен", "патент", "на", "работу.", "нужна", "работа"],
      correct_order: ["Мне", "нужен", "патент", "на", "работу."],
      explanation: "‘Патент на работу’ — Rossiyada ishlash uchun ruxsatnoma. ‘Патент’ erkak jinsida → ‘нужен’."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Idorada sizga aytishdi: 'Hujjatlaringiz tayyor'",
      sentence_with_blank: "Ваши документы ___.",
      blank_answer: "готовы",
      hint: "‘Документы’ koʻplikda",
      options: ["готовы", "готов", "готова", "готово"],
      target_audio_text: "Ваши документы готовы.",
      explanation: "‘Документы’ koʻplikda, shuning uchun ‘готовы’ (tayyor)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Idorada sizga qogʻoz berib, 'Заполните анкету, пожалуйста' deyishdi. Nima qilish kerak?",
      target_audio_text: "Заполните анкету, пожалуйста.",
      options: ["Anketani toʻldirish", "Anketani oʻqish", "Anketani olib ketish", "Anketadan nusxa olish"],
      correct_answer: "Anketani toʻldirish",
      explanation: "‘Заполнить анкету’ — anketani toʻldirmoq."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Xodim imzo joyini koʻrsatib aytdi: 'Shu yerga imzo qoʻying, iltimos'",
      target_audio_text: "Подпишите здесь, пожалуйста.",
      accepted_orders: ["Пожалуйста, подпишите здесь.", "Подпишите, пожалуйста, здесь."],
      words_pool: ["Подпишите", "здесь,", "пожалуйста.", "подпись", "пишите"],
      correct_order: ["Подпишите", "здесь,", "пожалуйста."],
      explanation: "‘Подписать’ — imzo qoʻymoq: ‘подпишите здесь’ — shu yerga imzo qoʻying."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Xodim soʻraydi: 'Familiyangiz va ismingiz?'",
      sentence_with_blank: "Ваша ___ и имя?",
      blank_answer: "фамилия",
      hint: "Familiya",
      options: ["фамилия", "фамилию", "фамилии", "фамилией"],
      target_audio_text: "Ваша фамилия и имя?",
      explanation: "‘Фамилия’ — familiya, ‘имя’ — ism. Rasmiy idorada avval familiya soʻraladi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Anketada 'Дата рождения' degan joy bor. U yerga nima yoziladi?",
      target_audio_text: "Дата рождения.",
      options: ["Tugʻilgan sana", "Tugʻilgan joy", "Telefon raqami", "Yashash manzili"],
      correct_answer: "Tugʻilgan sana",
      explanation: "‘Дата рождения’ — tugʻilgan sana (masalan: 05.10.1998). ‘Место рождения’ — tugʻilgan joy."
    }
  ]
};

export const LESSON_24_DATA: LessonPackage = {
  lesson_id: "a1_lesson_24",
  level: "A1",
  topic: "Ish qidirish",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Я ищу работу", translation: "Men ish qidiryapman", audio_text: "Я ищу работу" },
    { term: "У вас есть работа?", translation: "Sizda ish bormi?", audio_text: "У вас есть работа?" },
    { term: "Какой у вас график?", translation: "Ish tartibingiz qanday?", audio_text: "Какой у вас график?" },
    { term: "Сколько платят?", translation: "Qancha toʻlashadi?", audio_text: "Сколько платят?" },
    { term: "Какая зарплата?", translation: "Maosh qancha?", audio_text: "Какая зарплата?" },
    { term: "Я могу начать завтра", translation: "Men ertadan boshlay olaman", audio_text: "Я могу начать завтра" },
    { term: "У меня есть опыт", translation: "Menda tajriba bor", audio_text: "У меня есть опыт" },
    { term: "Полный рабочий день", translation: "Toʻliq ish kuni", audio_text: "Полный рабочий день" },
    { term: "Трудовой договор", translation: "Mehnat shartnomasi", audio_text: "Трудовой договор" },
    { term: "Когда можно прийти?", translation: "Qachon kelsam boʻladi?", audio_text: "Когда можно прийти?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Ish beruvchiga ayting: 'Assalomu alaykum, men ish qidiryapman'",
      target_audio_text: "Здравствуйте, я ищу работу.",
      options: ["Здравствуйте, я ищу работу.", "Здравствуйте, я работаю здесь.", "Здравствуйте, я студент.", "Здравствуйте, у меня выходной."],
      correct_answer: "Здравствуйте, я ищу работу.",
      explanation: "‘Искать’ — qidirmoq: ‘я ищу работу’ — ish qidiryapman."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻrang: 'Sizda ish bormi?'",
      target_audio_text: "У вас есть работа?",
      accepted_orders: ["Работа у вас есть?"],
      words_pool: ["У", "вас", "есть", "работа?", "работу", "нет"],
      correct_order: ["У", "вас", "есть", "работа?"],
      explanation: "‘У вас есть …?’ — sizda … bormi?"
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ish tartibini soʻrang: 'Ish tartibingiz qanday?'",
      sentence_with_blank: "Какой у вас ___?",
      blank_answer: "график",
      hint: "Ish tartibi",
      options: ["график", "графика", "графиком", "графику"],
      target_audio_text: "Какой у вас график?",
      explanation: "‘График’ — ish tartibi (qaysi kunlari, soat nechadan nechagacha)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Сколько платят?' savoli nimani anglatadi?",
      target_audio_text: "Сколько платят?",
      options: ["Qancha toʻlashadi?", "Qachon toʻlashadi?", "Kim toʻlaydi?", "Qancha ishlash kerak?"],
      correct_answer: "Qancha toʻlashadi?",
      explanation: "‘Платить’ — toʻlamoq: ‘сколько платят?’ — (ish uchun) qancha toʻlashadi?"
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻrang: 'Maosh qancha?'",
      target_audio_text: "А какая зарплата?",
      words_pool: ["А", "какая", "зарплата?", "какой", "зарплату"],
      correct_order: ["А", "какая", "зарплата?"],
      explanation: "‘Зарплата’ — maosh (ayol jinsi → ‘какая’)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Men ertadan boshlay olaman'",
      sentence_with_blank: "Я могу ___ завтра.",
      blank_answer: "начать",
      hint: "‘Могу’ dan keyin feʼlning lugʻat shakli",
      options: ["начать", "начну", "начинаю", "начал"],
      target_audio_text: "Я могу начать завтра.",
      explanation: "‘Могу’ dan keyin lugʻat shakli keladi: ‘могу начать’ — boshlay olaman."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Menda tajriba bor' gapini tanlang:",
      target_audio_text: "У меня есть опыт.",
      options: ["У меня есть опыт.", "У меня нет опыта.", "У меня есть работа.", "У меня есть патент."],
      correct_answer: "У меня есть опыт.",
      explanation: "‘Опыт’ — tajriba. ‘У меня нет опыта’ — tajribam yoʻq."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ish beruvchi aytdi: 'Bu toʻliq ish kuni'",
      target_audio_text: "Это полный рабочий день.",
      words_pool: ["Это", "полный", "рабочий", "день.", "полная", "дни"],
      correct_order: ["Это", "полный", "рабочий", "день."],
      explanation: "‘Полный рабочий день’ — toʻliq ish kuni (odatda 8 soat)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ishga kirayotganda ayting: 'Mehnat shartnomasi kerak'",
      sentence_with_blank: "Нужен трудовой ___.",
      blank_answer: "договор",
      hint: "Shartnoma",
      options: ["договор", "договора", "договором", "договору"],
      target_audio_text: "Нужен трудовой договор.",
      explanation: "‘Трудовой договор’ — mehnat shartnomasi. Ishga kirganda uni albatta soʻrang!"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Ish beruvchidan soʻrang: 'Qachon kelsam boʻladi?'",
      target_audio_text: "Когда можно прийти?",
      options: ["Когда можно прийти?", "Куда можно прийти?", "Когда вы работаете?", "Можно позвонить?"],
      correct_answer: "Когда можно прийти?",
      explanation: "‘Прийти’ — kelmoq. ‘Когда можно …?’ — qachon … boʻladi?"
    }
  ]
};

export const LESSON_25_DATA: LessonPackage = {
  lesson_id: "a1_lesson_25",
  level: "A1",
  topic: "Xona ijarasi",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Я хочу снять комнату", translation: "Men xona ijaraga olmoqchiman", audio_text: "Я хочу снять комнату" },
    { term: "Сколько в месяц?", translation: "Oyiga qancha?", audio_text: "Сколько в месяц?" },
    { term: "Коммунальные услуги", translation: "Kommunal xizmatlar", audio_text: "Коммунальные услуги" },
    { term: "Залог", translation: "Garov puli", audio_text: "Залог" },
    { term: "Хозяин квартиры", translation: "Kvartira egasi", audio_text: "Хозяин квартиры" },
    { term: "Можно посмотреть?", translation: "Koʻrsam boʻladimi?", audio_text: "Можно посмотреть?" },
    { term: "Кухня и ванная", translation: "Oshxona va hammom", audio_text: "Кухня и ванная" },
    { term: "Рядом с метро", translation: "Metro yonida", audio_text: "Рядом с метро" },
    { term: "Нет горячей воды", translation: "Issiq suv yoʻq", audio_text: "Нет горячей воды" },
    { term: "Когда можно въехать?", translation: "Qachon koʻchib kirsam boʻladi?", audio_text: "Когда можно въехать?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Eʼlon boʻyicha qoʻngʻiroq qildingiz. Ayting: 'Men xona ijaraga olmoqchiman'",
      target_audio_text: "Здравствуйте, я хочу снять комнату.",
      options: ["Здравствуйте, я хочу снять комнату.", "Здравствуйте, я хочу купить квартиру.", "Здравствуйте, я ищу работу.", "Здравствуйте, я хочу снять деньги."],
      correct_answer: "Здравствуйте, я хочу снять комнату.",
      explanation: "‘Снять комнату’ — xona ijaraga olmoq. ‘Снять деньги’ esa pul yechmoq: bitta feʼl, ikki maʼno."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Narxni soʻrang: 'Oyiga qancha?'",
      target_audio_text: "Сколько в месяц?",
      words_pool: ["Сколько", "в", "месяц?", "месяца", "на"],
      correct_order: ["Сколько", "в", "месяц?"],
      explanation: "‘В месяц’ — oyiga."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Soʻrang: 'Kommunal xizmatlar narxga kiritilganmi?'",
      sentence_with_blank: "Коммунальные ___ включены?",
      blank_answer: "услуги",
      hint: "Koʻplik shakli",
      options: ["услуги", "услуга", "услуг", "услугами"],
      target_audio_text: "Коммунальные услуги включены?",
      explanation: "‘Коммунальные услуги’ — svet, suv va gaz uchun toʻlov. ‘Включены?’ — narxga kiritilganmi?"
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Uy egasi 'Нужен залог' dedi. 'Залог' nima?",
      target_audio_text: "Нужен залог.",
      options: ["Garov puli", "Ijara shartnomasi", "Kalit", "Kommunal toʻlov"],
      correct_answer: "Garov puli",
      explanation: "‘Залог’ — garov puli: koʻchib ketayotganingizda qaytariladi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Kvartira egasi yaqinda yashaydi'",
      target_audio_text: "Хозяин квартиры живёт рядом.",
      accepted_orders: ["Рядом живёт хозяин квартиры."],
      words_pool: ["Хозяин", "квартиры", "живёт", "рядом.", "квартира", "живу"],
      correct_order: ["Хозяин", "квартиры", "живёт", "рядом."],
      explanation: "‘Хозяин квартиры’ — kvartira egasi. ‘Рядом’ — yaqinda, yonida."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Soʻrang: 'Xonani koʻrsam boʻladimi?'",
      sentence_with_blank: "Можно ___ комнату?",
      blank_answer: "посмотреть",
      hint: "Koʻrmoq (lugʻat shakli)",
      options: ["посмотреть", "посмотрю", "смотрит", "посмотрел"],
      target_audio_text: "Можно посмотреть комнату?",
      explanation: "‘Можно …?’ dan keyin lugʻat shakli: ‘можно посмотреть?’ — koʻrsam boʻladimi?"
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Uy egasi 'Здесь есть кухня и ванная' dedi. Qaysi xonalar bor?",
      target_audio_text: "Здесь есть кухня и ванная.",
      options: ["Oshxona va hammom", "Yotoqxona va balkon", "Dahliz va oyna", "Eshik va kalit"],
      correct_answer: "Oshxona va hammom",
      explanation: "‘Кухня’ — oshxona, ‘ванная’ — hammom (vanna xonasi)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Kvartira metro yonida'",
      target_audio_text: "Квартира рядом с метро.",
      words_pool: ["Квартира", "рядом", "с", "метро.", "далеко", "метром"],
      correct_order: ["Квартира", "рядом", "с", "метро."],
      explanation: "‘Рядом с …’ — … yonida. ‘Метро’ soʻzi oʻzgarmaydi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Uy egasiga qoʻngʻiroq qilib ayting: 'Bizda issiq suv yoʻq'",
      sentence_with_blank: "У нас нет горячей ___.",
      blank_answer: "воды",
      hint: "‘Нет’ dan keyingi shakl",
      options: ["воды", "вода", "воду", "водой"],
      target_audio_text: "У нас нет горячей воды.",
      explanation: "‘Нет’ dan keyin shakl oʻzgaradi: горячая вода → нет горячей воды."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Uy egasidan soʻrang: 'Qachon koʻchib kirsam boʻladi?'",
      target_audio_text: "Когда можно въехать?",
      options: ["Когда можно въехать?", "Когда можно посмотреть?", "Сколько в месяц?", "Где хозяин квартиры?"],
      correct_answer: "Когда можно въехать?",
      explanation: "‘Въехать’ — (yangi uyga) koʻchib kirmoq."
    }
  ]
};

export const LESSON_26_DATA: LessonPackage = {
  lesson_id: "a1_lesson_26",
  level: "A1",
  topic: "Shifokorda",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Мне нужен врач", translation: "Menga shifokor kerak", audio_text: "Мне нужен врач" },
    { term: "Запишите меня к врачу", translation: "Meni shifokor qabuliga yozib qoʻying", audio_text: "Запишите меня к врачу" },
    { term: "Что вас беспокоит?", translation: "Sizni nima bezovta qilyapti?", audio_text: "Что вас беспокоит?" },
    { term: "У меня болит горло", translation: "Tomogʻim ogʻriyapti", audio_text: "У меня болит горло" },
    { term: "У меня болит живот", translation: "Qornim ogʻriyapti", audio_text: "У меня болит живот" },
    { term: "Кашель", translation: "Yoʻtal", audio_text: "Кашель" },
    { term: "Я плохо себя чувствую", translation: "Oʻzimni yomon his qilyapman", audio_text: "Я плохо себя чувствую" },
    { term: "Медицинский полис", translation: "Tibbiy sugʻurta polisi", audio_text: "Медицинский полис" },
    { term: "Откройте рот", translation: "Ogʻzingizni oching", audio_text: "Откройте рот" },
    { term: "Больничный", translation: "Kasallik varaqasi", audio_text: "Больничный" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Ishxonada ahvolingiz yomonlashdi. Ayting: 'Menga shifokor kerak'",
      target_audio_text: "Мне нужен врач.",
      options: ["Мне нужен врач.", "Мне нужна аптека.", "Мне нужно такси.", "Мне нужен патент."],
      correct_answer: "Мне нужен врач.",
      explanation: "‘Врач’ — shifokor (erkak jinsi → ‘нужен’)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Poliklinikada ayting: 'Meni shifokor qabuliga yozib qoʻying, iltimos'",
      target_audio_text: "Запишите меня к врачу, пожалуйста.",
      accepted_orders: ["Пожалуйста, запишите меня к врачу.", "Запишите, пожалуйста, меня к врачу."],
      words_pool: ["Запишите", "меня", "к", "врачу,", "пожалуйста.", "врач", "мне"],
      correct_order: ["Запишите", "меня", "к", "врачу,", "пожалуйста."],
      explanation: "‘Записаться к врачу’ — shifokor qabuliga yozilmoq. ‘К врачу’ — shifokorga."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Shifokor birinchi boʻlib soʻraydi: 'Sizni nima bezovta qilyapti?'",
      sentence_with_blank: "Что вас ___?",
      blank_answer: "беспокоит",
      hint: "‘Что’ bilan keladigan shakl",
      options: ["беспокоит", "беспокою", "беспокоишь", "беспокоить"],
      target_audio_text: "Что вас беспокоит?",
      explanation: "‘Что вас беспокоит?’ — sizni nima bezovta qilyapti? (qayeringiz ogʻriyapti?)"
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У меня болит горло' gapi nimani anglatadi?",
      target_audio_text: "У меня болит горло.",
      options: ["Tomogʻim ogʻriyapti", "Boshim ogʻriyapti", "Qornim ogʻriyapti", "Tishim ogʻriyapti"],
      correct_answer: "Tomogʻim ogʻriyapti",
      explanation: "‘Горло’ — tomoq. ‘У меня болит …’ — …im ogʻriyapti."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Qornim ogʻriyapti'",
      target_audio_text: "У меня болит живот.",
      accepted_orders: ["У меня живот болит."],
      words_pool: ["У", "меня", "болит", "живот.", "болят", "животе"],
      correct_order: ["У", "меня", "болит", "живот."],
      explanation: "‘Живот’ — qorin. Bitta aʼzo uchun ‘болит’, koʻplik uchun ‘болят’."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Menda kuchli yoʻtal bor'",
      sentence_with_blank: "У меня сильный ___.",
      blank_answer: "кашель",
      hint: "Yoʻtal",
      options: ["кашель", "кашля", "кашлем", "кашлю"],
      target_audio_text: "У меня сильный кашель.",
      explanation: "‘Кашель’ — yoʻtal; ‘сильный’ — kuchli."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Oʻzimni yomon his qilyapman' gapini tanlang:",
      target_audio_text: "Я плохо себя чувствую.",
      options: ["Я плохо себя чувствую.", "Я хорошо себя чувствую.", "Я плохо понимаю.", "Я хочу спать."],
      correct_answer: "Я плохо себя чувствую.",
      explanation: "‘Чувствовать себя’ — oʻzini his qilmoq: плохо — yomon, хорошо — yaxshi."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Qabulxonada ayting: 'Mana mening tibbiy polisim'",
      target_audio_text: "Вот мой медицинский полис.",
      words_pool: ["Вот", "мой", "медицинский", "полис.", "полиса", "моё"],
      correct_order: ["Вот", "мой", "медицинский", "полис."],
      explanation: "‘Медицинский полис’ — tibbiy sugʻurta polisi. Poliklinikada soʻrashadi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Shifokor tomogʻingizni koʻrmoqchi: 'Ogʻzingizni oching, iltimos'",
      sentence_with_blank: "___ рот, пожалуйста.",
      blank_answer: "Откройте",
      hint: "Iltimos shakli (siz)",
      options: ["Откройте", "Открыть", "Открою", "Открыл"],
      target_audio_text: "Откройте рот, пожалуйста.",
      explanation: "‘Откройте рот’ — ogʻzingizni oching (shifokor koʻrigida)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Shifokor 'Я дам вам больничный' dedi. 'Больничный' nima?",
      target_audio_text: "Я дам вам больничный.",
      options: ["Kasallik varaqasi", "Dori retsepti", "Tibbiy polis", "Shifoxona manzili"],
      correct_answer: "Kasallik varaqasi",
      explanation: "‘Больничный (лист)’ — kasallik varaqasi: kasal boʻlib ishga bormaganingizni tasdiqlaydi."
    }
  ]
};

export const LESSON_27_DATA: LessonPackage = {
  lesson_id: "a1_lesson_27",
  level: "A1",
  topic: "Favqulodda holat",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Помогите!", translation: "Yordam bering!", audio_text: "Помогите!" },
    { term: "Вызовите полицию", translation: "Politsiyani chaqiring", audio_text: "Вызовите полицию" },
    { term: "Вызовите скорую", translation: "Tez yordamni chaqiring", audio_text: "Вызовите скорую" },
    { term: "Звоните сто двенадцать", translation: "112 ga qoʻngʻiroq qiling", audio_text: "Звоните сто двенадцать" },
    { term: "У меня украли телефон", translation: "Telefonimni oʻgʻirlab ketishdi", audio_text: "У меня украли телефон" },
    { term: "Я потерял паспорт", translation: "Pasportimni yoʻqotdim", audio_text: "Я потерял паспорт", alternatives: ["Я потеряла паспорт"] },
    { term: "Пожар!", translation: "Yongʻin!", audio_text: "Пожар!" },
    { term: "Мне плохо", translation: "Ahvolim yomon", audio_text: "Мне плохо" },
    { term: "Где посольство Узбекистана?", translation: "Oʻzbekiston elchixonasi qayerda?", audio_text: "Где посольство Узбекистана?" },
    { term: "Мне нужен переводчик", translation: "Menga tarjimon kerak", audio_text: "Мне нужен переводчик" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Koʻchada xavfli vaziyatga tushdingiz. Qanday baqirasiz: 'Yordam bering!'",
      target_audio_text: "Помогите!",
      options: ["Помогите!", "Подождите!", "Позвоните!", "Покажите!"],
      correct_answer: "Помогите!",
      explanation: "‘Помогите!’ — yordam bering! Eng muhim soʻz."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Politsiyani chaqiring, iltimos!'",
      target_audio_text: "Вызовите полицию, пожалуйста!",
      accepted_orders: ["Пожалуйста, вызовите полицию!"],
      words_pool: ["Вызовите", "полицию,", "пожалуйста!", "полиции", "вызов"],
      correct_order: ["Вызовите", "полицию,", "пожалуйста!"],
      explanation: "‘Полиция’ → ‘вызовите полицию’ (-я → -ю). Politsiya raqami: 102."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Odam yiqilib qoldi. Ayting: 'Tez yordamni chaqiring! Odamning ahvoli yomon!'",
      sentence_with_blank: "Вызовите ___! Человеку плохо!",
      blank_answer: "скорую",
      hint: "Tez yordam mashinasi",
      options: ["скорую", "скорая", "скорой", "скорый"],
      target_audio_text: "Вызовите скорую! Человеку плохо!",
      explanation: "‘Скорая’ — tez yordam (‘скорая помощь’ ning qisqasi). Tez yordam raqami: 103."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Qaysi raqam aytildi? 'Звоните сто двенадцать'",
      target_audio_text: "Звоните сто двенадцать.",
      options: ["112", "120", "102", "12"],
      correct_answer: "112",
      explanation: "‘Сто двенадцать’ — 112: Rossiyada yagona favqulodda yordam raqami (bepul)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Politsiyada ayting: 'Telefonimni oʻgʻirlab ketishdi'",
      target_audio_text: "У меня украли телефон.",
      accepted_orders: ["У меня телефон украли.", "Телефон у меня украли."],
      words_pool: ["У", "меня", "украли", "телефон.", "украл", "телефона"],
      correct_order: ["У", "меня", "украли", "телефон."],
      explanation: "‘Украсть’ — oʻgʻirlamoq: ‘у меня украли …’ — …imni oʻgʻirlab ketishdi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting (erkak kishi): 'Men pasportimni yoʻqotdim'",
      sentence_with_blank: "Я потерял ___.",
      blank_answer: "паспорт",
      hint: "Bu soʻzning shakli oʻzgarmaydi",
      options: ["паспорт", "паспорта", "паспорту", "паспортом"],
      target_audio_text: "Я потерял паспорт.",
      explanation: "‘Потерять’ — yoʻqotmoq: erkak — ‘я потерял’, ayol — ‘я потеряла’."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Odamlar 'Пожар!' deb baqirishyapti. Bu nima degani?",
      target_audio_text: "Пожар!",
      options: ["Yongʻin!", "Toʻxta!", "Yordam bering!", "Ehtiyot boʻling!"],
      correct_answer: "Yongʻin!",
      explanation: "‘Пожар’ — yongʻin. Yongʻinda 101 yoki 112 ga qoʻngʻiroq qiling."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Ahvolim yomon, yordam bering!'",
      target_audio_text: "Мне плохо, помогите!",
      accepted_orders: ["Помогите, мне плохо!"],
      words_pool: ["Мне", "плохо,", "помогите!", "плохой", "помощь"],
      correct_order: ["Мне", "плохо,", "помогите!"],
      explanation: "‘Мне плохо’ — ahvolim yomon (oʻzimni yomon his qilyapman)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Pasportingizni yoʻqotdingiz. Soʻrang: 'Oʻzbekiston elchixonasi qayerda?'",
      sentence_with_blank: "Где ___ Узбекистана?",
      blank_answer: "посольство",
      hint: "Elchixona",
      options: ["посольство", "посольства", "посольству", "посольством"],
      target_audio_text: "Где посольство Узбекистана?",
      explanation: "‘Посольство’ — elchixona. Pasportni yoʻqotsangiz, elchixonaga murojaat qiling."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Politsiyada rus tilini yaxshi tushunmayapsiz. Nima deysiz?",
      target_audio_text: "Мне нужен переводчик.",
      options: ["Мне нужен переводчик.", "Мне нужен врач.", "Мне нужно такси.", "Мне нужна сим-карта."],
      correct_answer: "Мне нужен переводчик.",
      explanation: "‘Переводчик’ — tarjimon. Siz tarjimon talab qilishga haqlisiz."
    }
  ]
};

export const LESSON_28_DATA: LessonPackage = {
  lesson_id: "a1_lesson_28",
  level: "A1",
  topic: "Bayram va tabriklar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "С днём рождения!", translation: "Tugʻilgan kuningiz bilan!", audio_text: "С днём рождения!" },
    { term: "С Новым годом!", translation: "Yangi yilingiz bilan!", audio_text: "С Новым годом!" },
    { term: "Поздравляю!", translation: "Tabriklayman!", audio_text: "Поздравляю!" },
    { term: "Желаю здоровья", translation: "Sogʻlik tilayman", audio_text: "Желаю здоровья" },
    { term: "Счастья и удачи!", translation: "Baxt va omad!", audio_text: "Счастья и удачи!" },
    { term: "С праздником!", translation: "Bayramingiz bilan!", audio_text: "С праздником!" },
    { term: "Ураза-байрам", translation: "Ramazon hayiti", audio_text: "Ураза-байрам" },
    { term: "Восьмое марта", translation: "8-mart (Xalqaro xotin-qizlar kuni)", audio_text: "Восьмое марта" },
    { term: "Приходите в гости", translation: "Mehmonga keling", audio_text: "Приходите в гости" },
    { term: "Спасибо за подарок", translation: "Sovgʻa uchun rahmat", audio_text: "Спасибо за подарок" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Bugun doʻstingizning tugʻilgan kuni. Qanday tabriklaysiz?",
      target_audio_text: "С днём рождения!",
      options: ["С днём рождения!", "С Новым годом!", "Приятного аппетита!", "Счастливого пути!"],
      correct_answer: "С днём рождения!",
      explanation: "‘С днём рождения!’ — tugʻilgan kuningiz bilan! (‘С’ + bayram nomi)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "31-dekabr. Tabriklang: 'Yangi yilingiz bilan!'",
      target_audio_text: "С Новым годом!",
      words_pool: ["С", "Новым", "годом!", "Новый", "год"],
      correct_order: ["С", "Новым", "годом!"],
      explanation: "‘Новый год’ → ‘с Новым годом!’ (‘с’ dan keyin shakl oʻzgaradi)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Doʻstingiz uylandi. Ayting: 'Seni tabriklayman!'",
      sentence_with_blank: "___ тебя!",
      blank_answer: "Поздравляю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["Поздравляю", "Поздравлять", "Поздравил", "Поздравит"],
      target_audio_text: "Поздравляю тебя!",
      explanation: "‘Поздравлять’ — tabriklamoq: ‘поздравляю тебя/вас!’ — seni/sizni tabriklayman!"
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Желаю здоровья!' tilagi nimani anglatadi?",
      target_audio_text: "Желаю здоровья!",
      options: ["Sogʻlik tilayman!", "Omad tilayman!", "Baxt tilayman!", "Rahmat aytaman!"],
      correct_answer: "Sogʻlik tilayman!",
      explanation: "‘Желать’ — tilamoq: ‘желаю здоровья’ — sogʻlik tilayman."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Tilak bildiring: 'Sizga baxt va omad tilayman!'",
      target_audio_text: "Желаю счастья и удачи!",
      accepted_orders: ["Желаю удачи и счастья!"],
      words_pool: ["Желаю", "счастья", "и", "удачи!", "счастье", "удача"],
      correct_order: ["Желаю", "счастья", "и", "удачи!"],
      explanation: "‘Желаю’ dan keyin shakl oʻzgaradi: счастье → счастья, удача → удачи."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Bayram kuni hamkasblaringizni tabriklang: 'Bayramingiz bilan!'",
      sentence_with_blank: "С ___!",
      blank_answer: "праздником",
      hint: "‘С’ dan keyingi shakl",
      options: ["праздником", "праздник", "праздника", "празднику"],
      target_audio_text: "С праздником!",
      explanation: "‘С праздником!’ — bayramingiz bilan! (har qanday bayramda aytiladi)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Hamkasbingiz 'С праздником Ураза-байрам!' dedi. Qaysi bayram?",
      target_audio_text: "С праздником Ураза-байрам!",
      options: ["Ramazon hayiti", "Qurbon hayiti", "Navroʻz", "Yangi yil"],
      correct_answer: "Ramazon hayiti",
      explanation: "‘Ураза-байрам’ — Ramazon hayiti, ‘Курбан-байрам’ — Qurbon hayiti."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Ertaga 8-mart'",
      target_audio_text: "Завтра Восьмое марта.",
      accepted_orders: ["Восьмое марта завтра."],
      words_pool: ["Завтра", "Восьмое", "марта.", "март", "восьмой"],
      correct_order: ["Завтра", "Восьмое", "марта."],
      explanation: "‘Восьмое марта’ — 8-mart, Xalqaro xotin-qizlar kuni: bu kuni ayollarni tabriklashadi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Doʻstlaringizni taklif qiling: 'Mehmonga keling!'",
      sentence_with_blank: "Приходите в ___!",
      blank_answer: "гости",
      hint: "Qayerga? — mehmonga",
      options: ["гости", "гостях", "гостей", "гость"],
      target_audio_text: "Приходите в гости!",
      explanation: "‘Приходить в гости’ — mehmonga kelmoq. ‘В гостях’ — mehmonda."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Sizga sovgʻa berishdi. Qanday minnatdorchilik bildirasiz?",
      target_audio_text: "Спасибо за подарок!",
      options: ["Спасибо за подарок!", "Спасибо за помощь!", "С днём рождения!", "Приходите в гости!"],
      correct_answer: "Спасибо за подарок!",
      explanation: "‘Спасибо за …’ — … uchun rahmat: ‘за подарок’ — sovgʻa uchun."
    }
  ]
};

