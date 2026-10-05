import { LessonPackage } from '../types/lesson';

// A1, unit 7 "Ishda" (lessons 39-43): the construction site, a café kitchen, the shop till, driving, pay and hours.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_39_DATA: LessonPackage = {
  lesson_id: "a1_lesson_39",
  level: "A1",
  topic: "Qurilishda",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Каска", translation: "Kaska (himoya dubulgʻasi)", audio_text: "Каска" },
    { term: "Перчатки", translation: "Qoʻlqop", audio_text: "Перчатки" },
    { term: "Молоток", translation: "Bolgʻa", audio_text: "Молоток" },
    { term: "Кирпич", translation: "Gʻisht", audio_text: "Кирпич" },
    { term: "Цемент", translation: "Sement", audio_text: "Цемент" },
    { term: "Лестница", translation: "Narvon (zinapoya)", audio_text: "Лестница" },
    { term: "Подними это", translation: "Buni koʻtar", audio_text: "Подними это" },
    { term: "Принеси доски", translation: "Taxtalarni olib kel", audio_text: "Принеси доски" },
    { term: "Осторожно, опасно!", translation: "Ehtiyot boʻl, xavfli!", audio_text: "Осторожно, опасно!" },
    { term: "Техника безопасности", translation: "Xavfsizlik qoidalari", audio_text: "Техника безопасности" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Где моя каска?' — 'каска' nima?",
      target_audio_text: "Где моя каска?",
      options: ["Himoya dubulgʻasi", "Qoʻlqop", "Etik", "Kurtka"],
      correct_answer: "Himoya dubulgʻasi",
      explanation: "‘Каска’ — himoya dubulgʻasi: qurilishda albatta kiyiladi!"
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Menga qoʻlqop kerak'",
      target_audio_text: "Мне нужны перчатки.",
      words_pool: ["Мне", "нужны", "перчатки.", "нужна", "перчатку"],
      correct_order: ["Мне", "нужны", "перчатки."],
      explanation: "‘Перчатки’ — qoʻlqop (koʻplikda), shuning uchun ‘нужны’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ishdoshingizdan soʻrang: 'Menga bolgʻani ber, iltimos'",
      sentence_with_blank: "Дай мне ___, пожалуйста.",
      blank_answer: "молоток",
      hint: "Shakli oʻzgarmaydi",
      options: ["молоток", "молотка", "молотком", "молотку"],
      target_audio_text: "Дай мне молоток, пожалуйста.",
      explanation: "‘Молоток’ — bolgʻa. ‘Дай мне’ — menga ber."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Это кирпич' — 'кирпич' nima?",
      target_audio_text: "Это кирпич.",
      options: ["Gʻisht", "Sement", "Taxta", "Tosh"],
      correct_answer: "Gʻisht",
      explanation: "‘Кирпич’ — gʻisht; ‘доска’ — taxta; ‘камень’ — tosh."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ustaga ayting: 'Bizda sement tugadi'",
      target_audio_text: "У нас закончился цемент.",
      words_pool: ["У", "нас", "закончился", "цемент.", "цемента", "закончилась"],
      correct_order: ["У", "нас", "закончился", "цемент."],
      explanation: "‘Цемент’ — sement. ‘Закончился’ — tugadi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Narvon devor yonida turibdi'",
      sentence_with_blank: "___ стоит у стены.",
      blank_answer: "Лестница",
      hint: "Gapning egasi",
      options: ["Лестница", "Лестницу", "Лестницы", "Лестницей"],
      target_audio_text: "Лестница стоит у стены.",
      explanation: "‘Лестница’ — narvon yoki zinapoya. ‘У стены’ — devor yonida."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Usta 'Подними это' dedi. Nima qilish kerak?",
      target_audio_text: "Подними это.",
      options: ["Buni koʻtarish", "Buni tashlash", "Buni sindirish", "Buni yuvish"],
      correct_answer: "Buni koʻtarish",
      explanation: "‘Поднять’ — koʻtarmoq: ‘подними’ (sen), ‘поднимите’ (siz)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ishdoshingizga ayting: 'Taxtalarni olib kel, iltimos'",
      target_audio_text: "Принеси доски, пожалуйста.",
      words_pool: ["Принеси", "доски,", "пожалуйста.", "доска", "досок"],
      correct_order: ["Принеси", "доски,", "пожалуйста."],
      explanation: "‘Доска’ — taxta, koʻplikda ‘доски’. ‘Принеси’ — olib kel (sen)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ishdoshingizni ogohlantiring: 'Ehtiyot boʻl, xavfli!'",
      sentence_with_blank: "Осторожно, ___!",
      blank_answer: "опасно",
      hint: "Xavfli",
      options: ["опасно", "опасный", "опасность", "опасная"],
      target_audio_text: "Осторожно, опасно!",
      explanation: "‘Опасно’ — xavfli. Bu soʻzni eshitsangiz, darrov toʻxtang!"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Техника безопасности очень важна' — 'техника безопасности' nima?",
      target_audio_text: "Техника безопасности очень важна.",
      options: ["Xavfsizlik qoidalari", "Ish haqi", "Ish vaqti", "Asbob-uskunalar"],
      correct_answer: "Xavfsizlik qoidalari",
      explanation: "‘Техника безопасности’ — xavfsizlik qoidalari: kaska, qoʻlqop va ehtiyotkorlik."
    }
  ]
};

export const LESSON_40_DATA: LessonPackage = {
  lesson_id: "a1_lesson_40",
  level: "A1",
  topic: "Kafe oshxonasida ishlash",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Моя смена", translation: "Mening smenam", audio_text: "Моя смена" },
    { term: "Заказ готов", translation: "Buyurtma tayyor", audio_text: "Заказ готов" },
    { term: "Фартук", translation: "Fartuk", audio_text: "Фартук" },
    { term: "Посудомойка", translation: "Idish yuvish mashinasi", audio_text: "Посудомойка" },
    { term: "Повар", translation: "Oshpaz", audio_text: "Повар" },
    { term: "Официант", translation: "Ofitsiant", audio_text: "Официант" },
    { term: "Горячо!", translation: "Issiq! (ehtiyot boʻling)", audio_text: "Горячо!" },
    { term: "Нарежь овощи", translation: "Sabzavotlarni toʻgʻra", audio_text: "Нарежь овощи" },
    { term: "Два кофе на пятый столик", translation: "Beshinchi stolga ikkita qahva", audio_text: "Два кофе на пятый столик" },
    { term: "Перерыв", translation: "Tanaffus", audio_text: "Перерыв" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Моя смена начинается в восемь' gapi nimani anglatadi?",
      target_audio_text: "Моя смена начинается в восемь.",
      options: ["Smenam soat sakkizda boshlanadi", "Smenam soat sakkizda tugaydi", "Men sakkiz soat ishlayman", "Men sakkizda uyga ketaman"],
      correct_answer: "Smenam soat sakkizda boshlanadi",
      explanation: "‘Смена’ — smena (ish navbati). ‘Начинается’ — boshlanadi."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Mijozni chaqiring: 'Buyurtmangiz tayyor!'",
      target_audio_text: "Ваш заказ готов!",
      words_pool: ["Ваш", "заказ", "готов!", "ваша", "готова"],
      correct_order: ["Ваш", "заказ", "готов!"],
      explanation: "‘Заказ’ — buyurtma (erkak jinsi → ‘ваш’, ‘готов’)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Yangi ishchiga ayting: 'Fartukni kiy, bu oshxona'",
      sentence_with_blank: "Надень ___, это кухня.",
      blank_answer: "фартук",
      hint: "Shakli oʻzgarmaydi",
      options: ["фартук", "фартука", "фартуком", "фартуке"],
      target_audio_text: "Надень фартук, это кухня.",
      explanation: "‘Фартук’ — fartuk, perednik."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Посудомойка сломалась' gapi nimani anglatadi?",
      target_audio_text: "Посудомойка сломалась.",
      options: ["Idish yuvish mashinasi buzildi", "Muzlatkich buzildi", "Plita buzildi", "Kassa buzildi"],
      correct_answer: "Idish yuvish mashinasi buzildi",
      explanation: "‘Посудомойка’ — idish yuvish mashinasi (‘посуда’ + ‘мыть’)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Bizning oshpazimiz Toshkentdan'",
      target_audio_text: "Наш повар из Ташкента.",
      words_pool: ["Наш", "повар", "из", "Ташкента.", "наша", "Ташкент"],
      correct_order: ["Наш", "повар", "из", "Ташкента."],
      explanation: "‘Повар’ — oshpaz."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Oshxonadan chaqiring: 'Ofitsiant, beshinchi stol kutyapti!'",
      sentence_with_blank: "___, пятый столик ждёт!",
      blank_answer: "Официант",
      hint: "Murojaat (shakli oʻzgarmaydi)",
      options: ["Официант", "Официанта", "Официанту", "Официантом"],
      target_audio_text: "Официант, пятый столик ждёт!",
      explanation: "‘Официант’ — ofitsiant. ‘Столик’ — kafedagi stol."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Oshxonada kimdir 'Горячо!' deb baqirdi. Bu nima degani?",
      target_audio_text: "Горячо!",
      options: ["Issiq, ehtiyot boʻling!", "Sovuq!", "Tezroq!", "Tayyor!"],
      correct_answer: "Issiq, ehtiyot boʻling!",
      explanation: "‘Горячо’ — issiq (kuydiradi). ‘Горячий суп’ — issiq shoʻrva."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Oshpaz aytdi: 'Salat uchun sabzavotlarni toʻgʻra'",
      target_audio_text: "Нарежь овощи для салата.",
      words_pool: ["Нарежь", "овощи", "для", "салата.", "салат", "овощ"],
      correct_order: ["Нарежь", "овощи", "для", "салата."],
      explanation: "‘Нарезать’ — toʻgʻrab tayyorlamoq: ‘нарежь овощи’ — sabzavotlarni toʻgʻra."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Buyurtmani oshxonaga ayting: 'Beshinchi stolga ikkita qahva'",
      sentence_with_blank: "Два кофе на пятый ___.",
      blank_answer: "столик",
      hint: "Kafedagi stol",
      options: ["столик", "столика", "столику", "столиком"],
      target_audio_text: "Два кофе на пятый столик.",
      explanation: "‘На пятый столик’ — beshinchi stolga. ‘Кофе’ soʻzi oʻzgarmaydi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'У меня перерыв' gapi nimani anglatadi?",
      target_audio_text: "У меня перерыв.",
      options: ["Tanaffusdaman", "Ishim tugadi", "Kech qoldim", "Smenam boshlandi"],
      correct_answer: "Tanaffusdaman",
      explanation: "‘Перерыв’ — tanaffus, dam olish vaqti."
    }
  ]
};

export const LESSON_41_DATA: LessonPackage = {
  lesson_id: "a1_lesson_41",
  level: "A1",
  topic: "Doʻkon kassasida",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Пакет нужен?", translation: "Paket kerakmi?", audio_text: "Пакет нужен?" },
    { term: "Ваша сдача", translation: "Qaytimingiz", audio_text: "Ваша сдача" },
    { term: "Приложите карту", translation: "Kartani tekkizing", audio_text: "Приложите карту" },
    { term: "Следующий!", translation: "Keyingisi!", audio_text: "Следующий!" },
    { term: "Бонусная карта", translation: "Bonus kartasi", audio_text: "Бонусная карта" },
    { term: "Наличные или карта?", translation: "Naqd pulmi yoki karta?", audio_text: "Наличные или карта?" },
    { term: "Касса не работает", translation: "Kassa ishlamayapti", audio_text: "Касса не работает" },
    { term: "Вам помочь?", translation: "Sizga yordam beraymi?", audio_text: "Вам помочь?" },
    { term: "Подождите минуту", translation: "Bir daqiqa kuting", audio_text: "Подождите минуту" },
    { term: "Чек нужен?", translation: "Chek kerakmi?", audio_text: "Чек нужен?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Kassir 'Пакет нужен?' deb soʻradi. Bu nima degani?",
      target_audio_text: "Пакет нужен?",
      options: ["Paket kerakmi?", "Chek kerakmi?", "Karta bormi?", "Yana nima kerak?"],
      correct_answer: "Paket kerakmi?",
      explanation: "‘Пакет’ — paket (sumka). Rossiyada paket koʻpincha pullik."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Kassir sifatida ayting: 'Mana qaytimingiz'",
      target_audio_text: "Вот ваша сдача.",
      words_pool: ["Вот", "ваша", "сдача.", "ваш", "сдачу"],
      correct_order: ["Вот", "ваша", "сдача."],
      explanation: "‘Сдача’ — qaytim (ayol jinsi → ‘ваша’)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Mijozga ayting: 'Kartani terminalga tekkizing'",
      sentence_with_blank: "Приложите ___ к терминалу.",
      blank_answer: "карту",
      hint: "‘Приложите’ dan keyingi shakl",
      options: ["карту", "карта", "карты", "картой"],
      target_audio_text: "Приложите карту к терминалу.",
      explanation: "‘Приложить карту’ — kartani terminalga tekkizish (kontaktsiz toʻlov)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Kassir 'Следующий!' dedi. Bu nima degani?",
      target_audio_text: "Следующий!",
      options: ["Keyingisi!", "Toʻxtang!", "Rahmat!", "Yopiq!"],
      correct_answer: "Keyingisi!",
      explanation: "‘Следующий!’ — keyingisi! (navbatdagi mijoz kelsin)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Mijozdan soʻrang: 'Sizda bonus kartasi bormi?'",
      target_audio_text: "У вас есть бонусная карта?",
      words_pool: ["У", "вас", "есть", "бонусная", "карта?", "бонусный", "карту"],
      correct_order: ["У", "вас", "есть", "бонусная", "карта?"],
      explanation: "‘Бонусная карта’ — bonus (chegirma) kartasi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Kassir soʻraydi: 'Naqd pulmi yoki karta?'",
      sentence_with_blank: "Наличные или ___?",
      blank_answer: "карта",
      hint: "Gapning egasi",
      options: ["карта", "карту", "картой", "карты"],
      target_audio_text: "Наличные или карта?",
      explanation: "‘Наличные’ — naqd pul; ‘карта’ — bank kartasi."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Kassada yozuv: 'Касса не работает'. Bu nima degani?",
      target_audio_text: "Касса не работает.",
      options: ["Kassa ishlamayapti", "Kassa ochiq", "Kassa shu yerda", "Kassada navbat bor"],
      correct_answer: "Kassa ishlamayapti",
      explanation: "‘Не работает’ — ishlamayapti."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Sotuvchi sifatida mijozga ayting: 'Assalomu alaykum, yordam beraymi?'",
      target_audio_text: "Здравствуйте, вам помочь?",
      words_pool: ["Здравствуйте,", "вам", "помочь?", "вас", "помощь"],
      correct_order: ["Здравствуйте,", "вам", "помочь?"],
      explanation: "‘Вам помочь?’ — sizga yordam beraymi? (sotuvchi soʻraydi)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Mijozga ayting: 'Bir daqiqa kuting, iltimos'",
      sentence_with_blank: "Подождите ___, пожалуйста.",
      blank_answer: "минуту",
      hint: "Bir daqiqa",
      options: ["минуту", "минута", "минуты", "минутой"],
      target_audio_text: "Подождите минуту, пожалуйста.",
      explanation: "‘Подождите минуту’ — bir daqiqa kuting (‘минута’ → ‘минуту’)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Kassir 'Чек нужен?' deb soʻradi. Bu nima degani?",
      target_audio_text: "Чек нужен?",
      options: ["Chek kerakmi?", "Paket kerakmi?", "Qaytim kerakmi?", "Karta kerakmi?"],
      correct_answer: "Chek kerakmi?",
      explanation: "‘Чек’ — xarid cheki; ‘нужен?’ — kerakmi?"
    }
  ]
};

export const LESSON_42_DATA: LessonPackage = {
  lesson_id: "a1_lesson_42",
  level: "A1",
  topic: "Haydovchilar uchun",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Ваши документы", translation: "Hujjatlaringiz", audio_text: "Ваши документы" },
    { term: "Водительские права", translation: "Haydovchilik guvohnomasi", audio_text: "Водительские права" },
    { term: "Штраф", translation: "Jarima", audio_text: "Штраф" },
    { term: "Заправка", translation: "Zapravka (yoqilgʻi quyish joyi)", audio_text: "Заправка" },
    { term: "Бензин", translation: "Benzin", audio_text: "Бензин" },
    { term: "Пристегнитесь", translation: "Kamarni taqing", audio_text: "Пристегнитесь" },
    { term: "Превышение скорости", translation: "Tezlikni oshirish", audio_text: "Превышение скорости" },
    { term: "Пробка", translation: "Tirbandlik", audio_text: "Пробка" },
    { term: "Парковка", translation: "Toʻxtash joyi", audio_text: "Парковка" },
    { term: "Машина сломалась", translation: "Mashina buzildi", audio_text: "Машина сломалась" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Inspektor 'Ваши документы, пожалуйста' dedi. Nima koʻrsatasiz?",
      target_audio_text: "Ваши документы, пожалуйста.",
      options: ["Haydovchilik guvohnomasi va hujjatlar", "Telefon", "Chipta", "Pul"],
      correct_answer: "Haydovchilik guvohnomasi va hujjatlar",
      explanation: "‘Ваши документы’ — hujjatlaringiz: haydovchilik guvohnomasi va mashina hujjatlari."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Inspektorga ayting: 'Mana mening haydovchilik guvohnomam'",
      target_audio_text: "Вот мои водительские права.",
      words_pool: ["Вот", "мои", "водительские", "права.", "мой", "право"],
      correct_order: ["Вот", "мои", "водительские", "права."],
      explanation: "‘Права’ — haydovchilik guvohnomasi (koʻplikda: ‘мои права’)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Inspektor aytdi: 'Sizga tezlik uchun jarima'",
      sentence_with_blank: "Вам ___ за скорость.",
      blank_answer: "штраф",
      hint: "Jarima",
      options: ["штраф", "штрафа", "штрафом", "штрафу"],
      target_audio_text: "Вам штраф за скорость.",
      explanation: "‘Штраф’ — jarima; ‘за скорость’ — tezlik uchun."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Где ближайшая заправка?' savoli nimani anglatadi?",
      target_audio_text: "Где ближайшая заправка?",
      options: ["Eng yaqin zapravka qayerda?", "Eng yaqin avtoservis qayerda?", "Eng yaqin parkovka qayerda?", "Eng yaqin bankomat qayerda?"],
      correct_answer: "Eng yaqin zapravka qayerda?",
      explanation: "‘Заправка’ — yoqilgʻi quyish shoxobchasi (zapravka)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Zapravkada ayting: 'Toʻla bak benzin, iltimos'",
      target_audio_text: "Полный бак бензина, пожалуйста.",
      words_pool: ["Полный", "бак", "бензина,", "пожалуйста.", "полная", "баки"],
      correct_order: ["Полный", "бак", "бензина,", "пожалуйста."],
      explanation: "‘Бензин’ — benzin; ‘полный бак бензина’ — toʻla bak benzin."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Yoʻlovchiga ayting: 'Kamarni taqing, iltimos, yoʻlga chiqyapmiz'",
      sentence_with_blank: "___, пожалуйста, мы едем.",
      blank_answer: "Пристегнитесь",
      hint: "Iltimos shakli (siz)",
      options: ["Пристегнитесь", "Пристегнуть", "Пристегнулся", "Пристёгнут"],
      target_audio_text: "Пристегнитесь, пожалуйста, мы едем.",
      explanation: "‘Пристегнуться’ — xavfsizlik kamarini taqmoq: ‘пристегнитесь!’ (siz)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Это превышение скорости' — qanday qoidabuzarlik?",
      target_audio_text: "Это превышение скорости.",
      options: ["Tezlikni oshirish", "Notoʻgʻri toʻxtash", "Qizil chiroqdan oʻtish", "Kamarsiz haydash"],
      correct_answer: "Tezlikni oshirish",
      explanation: "‘Скорость’ — tezlik; ‘превышение скорости’ — ruxsat etilganidan tez haydash."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Telefonda ayting: 'Kechikyapman, katta tirbandlik'",
      target_audio_text: "Я опаздываю, большая пробка.",
      words_pool: ["Я", "опаздываю,", "большая", "пробка.", "большой", "пробки"],
      correct_order: ["Я", "опаздываю,", "большая", "пробка."],
      explanation: "‘Пробка’ — tirbandlik (ayol jinsi → ‘большая’)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Yozuvni oʻqing: 'Bu yerda pullik toʻxtash joyi'",
      sentence_with_blank: "Здесь платная ___.",
      blank_answer: "парковка",
      hint: "Toʻxtash joyi",
      options: ["парковка", "парковку", "парковки", "парковкой"],
      target_audio_text: "Здесь платная парковка.",
      explanation: "‘Парковка’ — mashina toʻxtash joyi; ‘платная’ — pullik, ‘бесплатная’ — tekin."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Yoʻlda qolib ketdingiz. Telefonda ayting: 'Mashinam buzildi'",
      target_audio_text: "У меня машина сломалась.",
      options: ["У меня машина сломалась.", "У меня кончился бензин.", "Я опаздываю.", "Здесь платная парковка."],
      correct_answer: "У меня машина сломалась.",
      explanation: "‘Сломаться’ — buzilmoq: ‘машина сломалась’ — mashina buzildi."
    }
  ]
};

export const LESSON_43_DATA: LessonPackage = {
  lesson_id: "a1_lesson_43",
  level: "A1",
  topic: "Ish haqi va ish vaqti",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Аванс", translation: "Avans", audio_text: "Аванс" },
    { term: "Зарплата задерживается", translation: "Oylik kechikyapti", audio_text: "Зарплата задерживается" },
    { term: "Переработка", translation: "Qoʻshimcha ishlash (ortiqcha soat)", audio_text: "Переработка" },
    { term: "Ночная смена", translation: "Tungi smena", audio_text: "Ночная смена" },
    { term: "Выходной день", translation: "Dam olish kuni", audio_text: "Выходной день" },
    { term: "Отпуск", translation: "Taʼtil", audio_text: "Отпуск" },
    { term: "Мне не заплатили", translation: "Menga pul toʻlashmadi", audio_text: "Мне не заплатили" },
    { term: "Сколько в час?", translation: "Soatiga qancha?", audio_text: "Сколько в час?" },
    { term: "Я работаю по двенадцать часов", translation: "Men 12 soatdan ishlayman", audio_text: "Я работаю по двенадцать часов" },
    { term: "Я хочу уволиться", translation: "Ishdan boʻshamoqchiman", audio_text: "Я хочу уволиться" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Аванс будет в пятницу' gapi nimani anglatadi?",
      target_audio_text: "Аванс будет в пятницу.",
      options: ["Avans juma kuni beriladi", "Oylik juma kuni beriladi", "Juma kuni dam olamiz", "Juma kuni ish yoʻq"],
      correct_answer: "Avans juma kuni beriladi",
      explanation: "‘Аванс’ — oylikning oy oʻrtasida oldindan beriladigan qismi."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Oylik bir haftaga kechikyapti'",
      target_audio_text: "Зарплата задерживается на неделю.",
      words_pool: ["Зарплата", "задерживается", "на", "неделю.", "неделя", "зарплату"],
      correct_order: ["Зарплата", "задерживается", "на", "неделю."],
      explanation: "‘Задерживаться’ — kechikmoq: ‘зарплата задерживается’ — oylik kechikyapti."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ish beruvchi aytdi: 'Ortiqcha soatlar alohida toʻlanadi'",
      sentence_with_blank: "___ оплачивается отдельно.",
      blank_answer: "Переработка",
      hint: "Gapning egasi",
      options: ["Переработка", "Переработку", "Переработки", "Переработкой"],
      target_audio_text: "Переработка оплачивается отдельно.",
      explanation: "‘Переработка’ — belgilangan vaqtdan ortiq ishlash; ‘оплачивается отдельно’ — alohida toʻlanadi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У меня ночная смена' gapi nimani anglatadi?",
      target_audio_text: "У меня ночная смена.",
      options: ["Tungi smenadaman", "Kunduzgi smenadaman", "Bugun dam olaman", "Ishdan boʻshadim"],
      correct_answer: "Tungi smenadaman",
      explanation: "‘Ночная смена’ — tungi smena; ‘дневная смена’ — kunduzgi smena."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Mening bitta dam olish kunim bor'",
      target_audio_text: "У меня один выходной день.",
      words_pool: ["У", "меня", "один", "выходной", "день.", "одна", "дни"],
      correct_order: ["У", "меня", "один", "выходной", "день."],
      explanation: "‘Выходной день’ — dam olish kuni."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Yozda mening taʼtilim bor'",
      sentence_with_blank: "Летом у меня ___.",
      blank_answer: "отпуск",
      hint: "Taʼtil",
      options: ["отпуск", "отпуска", "отпуском", "отпуске"],
      target_audio_text: "Летом у меня отпуск.",
      explanation: "‘Отпуск’ — taʼtil (yillik dam olish)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Bir oy ishladingiz, lekin pul berishmadi. Qanday aytasiz?",
      target_audio_text: "Мне не заплатили за месяц.",
      options: ["Мне не заплатили за месяц.", "Мне дали аванс.", "У меня отпуск.", "У меня ночная смена."],
      correct_answer: "Мне не заплатили за месяц.",
      explanation: "‘Заплатить’ — toʻlamoq: ‘мне не заплатили’ — menga toʻlashmadi. Bunda mehnat inspeksiyasiga murojaat qilish mumkin."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ish haqini soʻrang: 'Soatiga qancha?'",
      target_audio_text: "Сколько в час?",
      words_pool: ["Сколько", "в", "час?", "часов", "на"],
      correct_order: ["Сколько", "в", "час?"],
      explanation: "‘В час’ — soatiga: ‘сколько в час?’ — soatiga qancha toʻlanadi?"
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Men 12 soatdan ishlayman'",
      sentence_with_blank: "Я работаю по двенадцать ___.",
      blank_answer: "часов",
      hint: "12 dan keyingi shakl",
      options: ["часов", "часа", "час", "часы"],
      target_audio_text: "Я работаю по двенадцать часов.",
      explanation: "‘По двенадцать часов’ — (har kuni) 12 soatdan."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Я хочу уволиться' gapi nimani anglatadi?",
      target_audio_text: "Я хочу уволиться.",
      options: ["Ishdan boʻshamoqchiman", "Ish qidiryapman", "Taʼtilga chiqmoqchiman", "Koʻproq ishlamoqchiman"],
      correct_answer: "Ishdan boʻshamoqchiman",
      explanation: "‘Уволиться’ — ishdan boʻshamoq."
    }
  ]
};

export const A1_UNIT_7_LESSONS: LessonPackage[] = [
  LESSON_39_DATA,
  LESSON_40_DATA,
  LESSON_41_DATA,
  LESSON_42_DATA,
  LESSON_43_DATA,
];
