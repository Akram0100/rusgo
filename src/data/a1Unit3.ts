import { LessonPackage } from '../types/lesson';

// A1, unit 3 "Shahar va aloqa" (lessons 19-22): public transport, the taxi, the phone, cash machines and money.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_19_DATA: LessonPackage = {
  lesson_id: "a1_lesson_19",
  level: "A1",
  topic: "Metro va avtobus",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Как доехать до центра?", translation: "Markazga qanday borsam boʻladi?", audio_text: "Как доехать до центра?" },
    { term: "Какой автобус идёт до вокзала?", translation: "Vokzalga qaysi avtobus boradi?", audio_text: "Какой автобус идёт до вокзала?" },
    { term: "Автобус номер пять", translation: "Beshinchi raqamli avtobus", audio_text: "Автобус номер пять" },
    { term: "Следующая станция", translation: "Keyingi bekat (metroda)", audio_text: "Следующая станция" },
    { term: "Мне нужно выйти", translation: "Men tushishim kerak", audio_text: "Мне нужно выйти" },
    { term: "Вы выходите?", translation: "Tushasizmi?", audio_text: "Вы выходите?" },
    { term: "Билет на автобус", translation: "Avtobus chiptasi", audio_text: "Билет на автобус" },
    { term: "Пересадка", translation: "Boshqa liniyaga oʻtish joyi", audio_text: "Пересадка" },
    { term: "Сколько остановок?", translation: "Necha bekat?", audio_text: "Сколько остановок?" },
    { term: "Осторожно, двери закрываются", translation: "Ehtiyot boʻling, eshiklar yopilmoqda", audio_text: "Осторожно, двери закрываются" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Oʻtkinchidan 'Как доехать до центра?' deb soʻradingiz. Bu nima degani?",
      target_audio_text: "Как доехать до центра?",
      options: ["Markazga qanday borsam boʻladi?", "Markaz qayerda?", "Markaz uzoqmi?", "Markazga necha pul?"],
      correct_answer: "Markazga qanday borsam boʻladi?",
      explanation: "‘Доехать до …’ — (transportda) …gacha yetib bormoq. ‘До’ dan keyin: центр → до центра."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻrang: 'Vokzalga qaysi avtobus boradi?'",
      target_audio_text: "Какой автобус идёт до вокзала?",
      accepted_orders: ["Какой автобус до вокзала идёт?"],
      words_pool: ["Какой", "автобус", "идёт", "до", "вокзала?", "вокзал", "куда"],
      correct_order: ["Какой", "автобус", "идёт", "до", "вокзала?"],
      explanation: "Transport haqida ‘идёт’ deyiladi: ‘автобус идёт до вокзала’ — avtobus vokzalgacha boradi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Sizga yoʻl koʻrsatishdi: 'Beshinchi raqamli avtobusga chiqing'",
      sentence_with_blank: "Садитесь на автобус номер ___.",
      blank_answer: "пять",
      hint: "Raqam: 5",
      options: ["пять", "пятый", "пятая", "пяти"],
      target_audio_text: "Садитесь на автобус номер пять.",
      explanation: "‘Садиться на автобус’ — avtobusga chiqmoq. ‘Автобус номер пять’ — beshinchi raqamli avtobus."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Metroda 'Следующая станция — «Пушкинская»' deb eshitdingiz. Bu nima degani?",
      target_audio_text: "Следующая станция — «Пушкинская».",
      options: ["Keyingi bekat — Pushkinskaya", "Bu bekat — Pushkinskaya", "Oxirgi bekat — Pushkinskaya", "Pushkinskayada tushing"],
      correct_answer: "Keyingi bekat — Pushkinskaya",
      explanation: "‘Следующая станция’ — keyingi bekat (metroda). Avtobusda: ‘следующая остановка’."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Men shu yerda tushishim kerak'",
      target_audio_text: "Мне нужно выйти здесь.",
      accepted_orders: ["Мне здесь нужно выйти.", "Здесь мне нужно выйти."],
      words_pool: ["Мне", "нужно", "выйти", "здесь.", "выхожу", "нужен"],
      correct_order: ["Мне", "нужно", "выйти", "здесь."],
      explanation: "‘Мне нужно …’ — men …ishim kerak. ‘Выйти’ — (transportdan) tushmoq."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Tiqilinch avtobusda eshik oldidagi odamdan soʻrang: 'Keyingisida tushasizmi?'",
      sentence_with_blank: "Вы ___ на следующей?",
      blank_answer: "выходите",
      hint: "‘Вы’ bilan keladigan shakl",
      options: ["выходите", "выходишь", "выхожу", "выходить"],
      target_audio_text: "Вы выходите на следующей?",
      explanation: "‘Вы выходите на следующей?’ — keyingi bekatda tushasizmi? Tushmasa, joy almashasiz."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Kassada ayting: 'Bitta avtobus chiptasi, iltimos'",
      target_audio_text: "Один билет на автобус, пожалуйста.",
      options: ["Один билет на автобус, пожалуйста.", "Один кофе, пожалуйста.", "Где автобус?", "Сколько остановок?"],
      correct_answer: "Один билет на автобус, пожалуйста.",
      explanation: "‘Билет на …’ — …ga chipta: билет на автобус, билет на метро."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Metroda soʻrang: 'Bu yerda boshqa liniyaga qayerdan oʻtiladi?'",
      target_audio_text: "Где здесь пересадка?",
      accepted_orders: ["Где пересадка здесь?"],
      words_pool: ["Где", "здесь", "пересадка?", "пересадку", "куда"],
      correct_order: ["Где", "здесь", "пересадка?"],
      explanation: "‘Пересадка’ — metroda boshqa liniyaga oʻtish joyi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Soʻrang: 'Markazgacha necha bekat?'",
      sentence_with_blank: "Сколько ___ до центра?",
      blank_answer: "остановок",
      hint: "‘Сколько’ dan keyingi koʻplik shakli",
      options: ["остановок", "остановки", "остановка", "остановке"],
      target_audio_text: "Сколько остановок до центра?",
      explanation: "‘Сколько’ dan keyin: остановка → сколько остановок? (necha bekat?)"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Metroda har safar eshitiladi: 'Осторожно, двери закрываются!' Bu nima degani?",
      target_audio_text: "Осторожно, двери закрываются!",
      options: ["Ehtiyot boʻling, eshiklar yopilmoqda!", "Ehtiyot boʻling, eshiklar ochilmoqda!", "Keyingi bekat — oxirgi", "Chiptangizni koʻrsating"],
      correct_answer: "Ehtiyot boʻling, eshiklar yopilmoqda!",
      explanation: "‘Осторожно’ — ehtiyot boʻling; ‘двери закрываются’ — eshiklar yopilmoqda."
    }
  ]
};

export const LESSON_20_DATA: LessonPackage = {
  lesson_id: "a1_lesson_20",
  level: "A1",
  topic: "Taksida",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Мне нужно на улицу Ленина", translation: "Menga Lenin koʻchasiga borish kerak", audio_text: "Мне нужно на улицу Ленина" },
    { term: "Вызовите такси", translation: "Taksi chaqiring", audio_text: "Вызовите такси" },
    { term: "Сколько стоит до аэропорта?", translation: "Aeroportgacha qancha turadi?", audio_text: "Сколько стоит до аэропорта?" },
    { term: "Остановите здесь", translation: "Shu yerda toʻxtating", audio_text: "Остановите здесь" },
    { term: "Подождите, пожалуйста", translation: "Kutib turing, iltimos", audio_text: "Подождите, пожалуйста" },
    { term: "Быстрее, пожалуйста", translation: "Tezroq, iltimos", audio_text: "Быстрее, пожалуйста" },
    { term: "Откройте окно", translation: "Oynani oching", audio_text: "Откройте окно" },
    { term: "Мой адрес", translation: "Mening manzilim", audio_text: "Мой адрес" },
    { term: "Какой номер машины?", translation: "Mashina raqami qanday?", audio_text: "Какой номер машины?" },
    { term: "Сдачи не надо", translation: "Qaytim kerak emas", audio_text: "Сдачи не надо" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Taksichiga manzilni ayting: 'Menga Lenin koʻchasiga borish kerak'",
      target_audio_text: "Мне нужно на улицу Ленина.",
      options: ["Мне нужно на улицу Ленина.", "Я живу на улице Ленина.", "Где улица Ленина?", "Улица Ленина далеко?"],
      correct_answer: "Мне нужно на улицу Ленина.",
      explanation: "‘Мне нужно на …’ — menga …ga borish kerak. Qayerga? — ‘на улицу’."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Mehmonxonada ayting: 'Taksi chaqiring, iltimos'",
      target_audio_text: "Вызовите такси, пожалуйста.",
      accepted_orders: ["Пожалуйста, вызовите такси."],
      words_pool: ["Вызовите", "такси,", "пожалуйста.", "вызов", "таксист"],
      correct_order: ["Вызовите", "такси,", "пожалуйста."],
      explanation: "‘Вызвать такси’ — taksi chaqirmoq: ‘вызовите’ — chaqiring."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Narxni soʻrang: 'Aeroportgacha qancha turadi?'",
      sentence_with_blank: "Сколько стоит до ___?",
      blank_answer: "аэропорта",
      hint: "‘До’ dan keyingi shakl",
      options: ["аэропорта", "аэропорт", "аэропорту", "аэропортом"],
      target_audio_text: "Сколько стоит до аэропорта?",
      explanation: "‘До’ (…gacha) dan keyin: аэропорт → до аэропорта."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Uyingizga yetib keldingiz. Haydovchiga nima deysiz?",
      target_audio_text: "Остановите здесь, пожалуйста.",
      options: ["Остановите здесь, пожалуйста.", "Подождите, пожалуйста.", "Быстрее, пожалуйста.", "Откройте окно, пожалуйста."],
      correct_answer: "Остановите здесь, пожалуйста.",
      explanation: "‘Остановите’ — toʻxtating; ‘здесь’ — shu yerda."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Haydovchiga ayting: 'Kutib turing, iltimos, besh daqiqa'",
      target_audio_text: "Подождите, пожалуйста, пять минут.",
      accepted_orders: ["Подождите пять минут, пожалуйста.", "Пожалуйста, подождите пять минут."],
      words_pool: ["Подождите,", "пожалуйста,", "пять", "минут.", "минута", "ждать"],
      correct_order: ["Подождите,", "пожалуйста,", "пять", "минут."],
      explanation: "‘Подождите’ — kutib turing. ‘Пять минут’ — besh daqiqa."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Shoshyapsiz. Ayting: 'Tezroq, iltimos, kechikyapman'",
      sentence_with_blank: "___, пожалуйста, я опаздываю.",
      blank_answer: "Быстрее",
      hint: "Tezroq",
      options: ["Быстрее", "Быстрый", "Быстрая", "Быстрые"],
      target_audio_text: "Быстрее, пожалуйста, я опаздываю.",
      explanation: "‘Быстрее’ — tezroq. ‘Я опаздываю’ — kechikyapman."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Mashinada juda issiq. Haydovchidan nima soʻraysiz?",
      target_audio_text: "Откройте окно, пожалуйста.",
      options: ["Откройте окно, пожалуйста.", "Закройте окно, пожалуйста.", "Остановите здесь, пожалуйста.", "Подождите, пожалуйста."],
      correct_answer: "Откройте окно, пожалуйста.",
      explanation: "‘Откройте’ — oching, ‘закройте’ — yoping. ‘Окно’ — oyna, deraza."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Telefoningizdagi manzilni koʻrsatib ayting: 'Mana mening manzilim'",
      target_audio_text: "Вот мой адрес.",
      words_pool: ["Вот", "мой", "адрес.", "моя", "адреса"],
      correct_order: ["Вот", "мой", "адрес."],
      explanation: "‘Адрес’ — manzil (erkak jinsi): ‘мой адрес’."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Taksini ilova orqali chaqirdingiz. Soʻrang: 'Mashina raqami qanday?'",
      sentence_with_blank: "Какой ___ машины?",
      blank_answer: "номер",
      hint: "Raqam",
      options: ["номер", "номера", "номеру", "номером"],
      target_audio_text: "Какой номер машины?",
      explanation: "‘Номер машины’ — mashina raqami. Taksini topish uchun shuni soʻrang."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Yoʻl 450 rubl, siz 500 rubl berdingiz. Ayting: 'Qaytim kerak emas'",
      target_audio_text: "Сдачи не надо.",
      options: ["Сдачи не надо.", "Сколько стоит?", "Дайте сдачу.", "У меня нет денег."],
      correct_answer: "Сдачи не надо.",
      explanation: "‘Сдача’ — qaytim. ‘Сдачи не надо’ — qaytim kerak emas."
    }
  ]
};

export const LESSON_21_DATA: LessonPackage = {
  lesson_id: "a1_lesson_21",
  level: "A1",
  topic: "Telefon va SIM-karta",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Мне нужна сим-карта", translation: "Menga SIM-karta kerak", audio_text: "Мне нужна сим-карта" },
    { term: "Какой у вас номер телефона?", translation: "Telefon raqamingiz qanday?", audio_text: "Какой у вас номер телефона?" },
    { term: "Позвоните мне", translation: "Menga qoʻngʻiroq qiling", audio_text: "Позвоните мне" },
    { term: "Я вам перезвоню", translation: "Sizga qayta qoʻngʻiroq qilaman", audio_text: "Я вам перезвоню" },
    { term: "Алло, слушаю", translation: "Allo, eshitaman", audio_text: "Алло, слушаю" },
    { term: "Плохо слышно", translation: "Yaxshi eshitilmayapti", audio_text: "Плохо слышно" },
    { term: "Положить деньги на телефон", translation: "Telefonga pul solmoq", audio_text: "Положить деньги на телефон" },
    { term: "Интернет не работает", translation: "Internet ishlamayapti", audio_text: "Интернет не работает" },
    { term: "Напишите мне сообщение", translation: "Menga xabar yozing", audio_text: "Напишите мне сообщение" },
    { term: "Зарядка", translation: "Zaryadka (quvvatlagich)", audio_text: "Зарядка" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Aloqa doʻkonida ayting: 'Menga SIM-karta kerak'",
      target_audio_text: "Мне нужна сим-карта.",
      options: ["Мне нужна сим-карта.", "Мне нужен телефон.", "У меня нет денег.", "Где интернет?"],
      correct_answer: "Мне нужна сим-карта.",
      explanation: "‘Мне нужна …’ — menga … kerak (‘сим-карта’ ayol jinsida, shuning uchun ‘нужна’)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Yangi tanishingizdan soʻrang: 'Telefon raqamingiz qanday?'",
      target_audio_text: "Какой у вас номер телефона?",
      accepted_orders: ["Какой номер телефона у вас?"],
      words_pool: ["Какой", "у", "вас", "номер", "телефона?", "телефон", "мой"],
      correct_order: ["Какой", "у", "вас", "номер", "телефона?"],
      explanation: "‘Номер телефона’ — telefon raqami. ‘У вас’ — sizda."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Menga kechqurun qoʻngʻiroq qiling'",
      sentence_with_blank: "___ мне вечером.",
      blank_answer: "Позвоните",
      hint: "Iltimos shakli (siz)",
      options: ["Позвоните", "Позвонить", "Позвоню", "Позвонил"],
      target_audio_text: "Позвоните мне вечером.",
      explanation: "‘Позвонить’ — qoʻngʻiroq qilmoq; ‘позвоните мне’ — menga qoʻngʻiroq qiling."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Я вам перезвоню' gapi nimani anglatadi?",
      target_audio_text: "Я вам перезвоню.",
      options: ["Sizga qayta qoʻngʻiroq qilaman", "Sizga xabar yozaman", "Men sizni kutaman", "Men sizni eshitmayapman"],
      correct_answer: "Sizga qayta qoʻngʻiroq qilaman",
      explanation: "‘Перезвонить’ — qayta qoʻngʻiroq qilmoq."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Telefon jiringladi. Javob bering: 'Allo, eshitaman'",
      target_audio_text: "Алло, слушаю вас.",
      accepted_orders: ["Алло, вас слушаю."],
      words_pool: ["Алло,", "слушаю", "вас.", "слышно", "вам"],
      correct_order: ["Алло,", "слушаю", "вас."],
      explanation: "Telefonni olganda: ‘Алло, слушаю (вас)’ — allo, eshitaman."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Aloqa yomon. Ayting: 'Balandroq gapiring, yaxshi eshitilmayapti'",
      sentence_with_blank: "Говорите громче, плохо ___.",
      blank_answer: "слышно",
      hint: "Eshitilmoq",
      options: ["слышно", "слышу", "слушаю", "слышать"],
      target_audio_text: "Говорите громче, плохо слышно.",
      explanation: "‘Плохо слышно’ — yaxshi eshitilmayapti. ‘Громче’ — balandroq."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Telefonimga pul solmoqchiman' gapini tanlang:",
      target_audio_text: "Я хочу положить деньги на телефон.",
      options: ["Я хочу положить деньги на телефон.", "Я хочу купить телефон.", "Я хочу позвонить маме.", "У меня новый телефон."],
      correct_answer: "Я хочу положить деньги на телефон.",
      explanation: "‘Положить деньги на телефон’ — telefon balansiga pul solmoq."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Menda internet ishlamayapti'",
      target_audio_text: "У меня интернет не работает.",
      accepted_orders: ["Интернет у меня не работает.", "У меня не работает интернет."],
      words_pool: ["У", "меня", "интернет", "не", "работает.", "работаю", "нет"],
      correct_order: ["У", "меня", "интернет", "не", "работает."],
      explanation: "‘Не работает’ — ishlamayapti."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Menga xabar yozing'",
      sentence_with_blank: "Напишите мне ___.",
      blank_answer: "сообщение",
      hint: "Xabar (SMS)",
      options: ["сообщение", "сообщения", "сообщением", "сообщению"],
      target_audio_text: "Напишите мне сообщение.",
      explanation: "‘Сообщение’ — xabar. ‘Напишите’ — yozing."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Telefoningiz oʻchib qolyapti. Hamkasbingizdan soʻrang:",
      target_audio_text: "У вас есть зарядка?",
      options: ["У вас есть зарядка?", "У вас есть сим-карта?", "Какой у вас номер телефона?", "Интернет не работает?"],
      correct_answer: "У вас есть зарядка?",
      explanation: "‘Зарядка’ — zaryadka (quvvatlagich)."
    }
  ]
};

export const LESSON_22_DATA: LessonPackage = {
  lesson_id: "a1_lesson_22",
  level: "A1",
  topic: "Bankomat va pul",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Где ближайший банкомат?", translation: "Eng yaqin bankomat qayerda?", audio_text: "Где ближайший банкомат?" },
    { term: "Можно картой?", translation: "Karta bilan boʻladimi?", audio_text: "Можно картой?" },
    { term: "Я хочу снять деньги", translation: "Men pul yechmoqchiman", audio_text: "Я хочу снять деньги" },
    { term: "Карта не работает", translation: "Karta ishlamayapti", audio_text: "Карта не работает" },
    { term: "Пин-код", translation: "PIN-kod", audio_text: "Пин-код" },
    { term: "Отправить деньги домой", translation: "Uyga pul joʻnatmoq", audio_text: "Отправить деньги домой" },
    { term: "У меня нет мелочи", translation: "Menda mayda pul yoʻq", audio_text: "У меня нет мелочи" },
    { term: "Сто рублей", translation: "Yuz rubl", audio_text: "Сто рублей" },
    { term: "Тысяча рублей", translation: "Ming rubl", audio_text: "Тысяча рублей" },
    { term: "Сколько стоит перевод?", translation: "Pul oʻtkazish qancha turadi?", audio_text: "Сколько стоит перевод?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Naqd pul kerak. Oʻtkinchidan soʻrang: 'Eng yaqin bankomat qayerda?'",
      target_audio_text: "Где ближайший банкомат?",
      options: ["Где ближайший банкомат?", "Где ближайшая аптека?", "Где остановка?", "Где метро?"],
      correct_answer: "Где ближайший банкомат?",
      explanation: "‘Ближайший’ — eng yaqin. ‘Банкомат’ — bankomat."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Kassada soʻrang: 'Aytingchi, karta bilan boʻladimi?'",
      target_audio_text: "Скажите, можно картой?",
      words_pool: ["Скажите,", "можно", "картой?", "карта", "нельзя"],
      correct_order: ["Скажите,", "можно", "картой?"],
      explanation: "‘Картой’ — karta bilan (toʻlov). Naqd pul bilan: ‘наличными’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Bankda ayting: 'Men pul yechmoqchiman'",
      sentence_with_blank: "Я хочу ___ деньги.",
      blank_answer: "снять",
      hint: "‘Хочу’ dan keyin feʼlning lugʻat shakli",
      options: ["снять", "сниму", "снимаю", "снял"],
      target_audio_text: "Я хочу снять деньги.",
      explanation: "‘Снять деньги’ — (bankomatdan) pul yechmoq."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Моя карта не работает' gapi nimani anglatadi?",
      target_audio_text: "Моя карта не работает.",
      options: ["Mening kartam ishlamayapti", "Mening kartam yoʻq", "Kartamda pul yoʻq", "Kartamni yoʻqotdim"],
      correct_answer: "Mening kartam ishlamayapti",
      explanation: "‘Не работает’ — ishlamayapti."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Bankomat ekranida yozuv: 'PIN-kodni kiriting, iltimos'",
      target_audio_text: "Введите, пожалуйста, пин-код.",
      accepted_orders: ["Введите пин-код, пожалуйста.", "Пожалуйста, введите пин-код."],
      words_pool: ["Введите,", "пожалуйста,", "пин-код.", "код", "карту"],
      correct_order: ["Введите,", "пожалуйста,", "пин-код."],
      explanation: "‘Введите’ — kiriting. ‘Пин-код’ — kartaning maxfiy kodi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Men uyga pul joʻnatmoqchiman'",
      sentence_with_blank: "Я хочу отправить ___ домой.",
      blank_answer: "деньги",
      hint: "Pul",
      options: ["деньги", "денег", "деньгами", "деньгам"],
      target_audio_text: "Я хочу отправить деньги домой.",
      explanation: "‘Отправить деньги домой’ — uyga (oilaga) pul joʻnatmoq."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Sotuvchi 'Есть мелочь?' deb soʻradi, sizda mayda pul yoʻq. Qanday javob berasiz?",
      target_audio_text: "Извините, у меня нет мелочи.",
      options: ["Извините, у меня нет мелочи.", "Вот, пожалуйста.", "У меня есть карта.", "Сдачи не надо."],
      correct_answer: "Извините, у меня нет мелочи.",
      explanation: "‘Мелочь’ — mayda pul. ‘У меня нет …’ dan keyin: мелочь → нет мелочи."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Bu yuz rubl turadi'",
      target_audio_text: "Это стоит сто рублей.",
      words_pool: ["Это", "стоит", "сто", "рублей.", "рубля", "тысяча"],
      correct_order: ["Это", "стоит", "сто", "рублей."],
      explanation: "5 dan keyin ‘рублей’: пять рублей, сто рублей. 2–4 dan keyin ‘рубля’."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Menda faqat ming rubl bor'",
      sentence_with_blank: "У меня есть только ___ рублей.",
      blank_answer: "тысяча",
      hint: "Ming",
      options: ["тысяча", "тысячу", "тысячи", "тысячей"],
      target_audio_text: "У меня есть только тысяча рублей.",
      explanation: "‘Тысяча’ — ming. ‘У меня есть …’ — menda … bor."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Сколько стоит перевод?' savoli nimani anglatadi?",
      target_audio_text: "Сколько стоит перевод?",
      options: ["Pul oʻtkazish qancha turadi?", "Bankomat qayerda?", "Kartam ishlamayapti", "Menda mayda pul yoʻq"],
      correct_answer: "Pul oʻtkazish qancha turadi?",
      explanation: "‘Перевод’ — pul oʻtkazmasi. ‘Сколько стоит …?’ — … qancha turadi?"
    }
  ]
};

