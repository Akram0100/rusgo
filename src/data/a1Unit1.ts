import { LessonPackage } from '../types/lesson';

// A1, unit 1 "Men va kunim" (lessons 9-13): about oneself, work, the time of day, days and months, the weather.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_9_DATA: LessonPackage = {
  lesson_id: "a1_lesson_09",
  level: "A1",
  topic: "Oʻzim haqimda: yosh va millat",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Сколько вам лет?", translation: "Yoshingiz nechada?", audio_text: "Сколько вам лет?" },
    { term: "Мне двадцать лет", translation: "Men yigirma yoshdaman", audio_text: "Мне двадцать лет" },
    { term: "Откуда вы?", translation: "Siz qayerdansiz?", audio_text: "Откуда вы?" },
    { term: "Я из Ташкента", translation: "Men Toshkentdanman", audio_text: "Я из Ташкента" },
    { term: "Я живу в Москве", translation: "Men Moskvada yashayman", audio_text: "Я живу в Москве" },
    { term: "Я из Узбекистана", translation: "Men Oʻzbekistondanman", audio_text: "Я из Узбекистана" },
    { term: "Мой родной язык — узбекский", translation: "Mening ona tilim — oʻzbek tili", audio_text: "Мой родной язык — узбекский" },
    { term: "Я немного говорю по-русски", translation: "Men ozgina ruscha gapiraman", audio_text: "Я немного говорю по-русски" },
    { term: "Я не понимаю", translation: "Men tushunmayapman", audio_text: "Я не понимаю" },
    { term: "Я узбек", translation: "Men oʻzbekman", audio_text: "Я узбек", alternatives: ["Я узбечка"] },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Yangi tanishingiz 'Сколько вам лет?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Сколько вам лет?",
      options: ["Yoshingiz nechada?", "Qayerdansiz?", "Ismingiz nima?", "Qayerda yashaysiz?"],
      correct_answer: "Yoshingiz nechada?",
      explanation: "‘Сколько вам лет?’ — yoshni hurmat bilan soʻrash (soʻzma-soʻz: ‘sizga necha yil?’)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Yoshingizni ayting: 'Men yigirma yoshdaman'",
      target_audio_text: "Мне двадцать лет.",
      words_pool: ["Мне", "двадцать", "лет.", "Я", "года"],
      correct_order: ["Мне", "двадцать", "лет."],
      explanation: "Yosh ‘Мне … лет’ qolipida aytiladi: ‘мне’ — menga. ‘Я двадцать лет’ deb boʻlmaydi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Suhbatdoshingiz qayerdan ekanini soʻrang: 'Извините, откуда ___?'",
      sentence_with_blank: "Извините, откуда ___?",
      blank_answer: "вы",
      hint: "‘Siz’ olmoshi",
      options: ["вы", "вас", "вам", "ваш"],
      target_audio_text: "Извините, откуда вы?",
      explanation: "‘Откуда вы?’ — siz qayerdansiz? (‘откуда’ — qayerdan)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Я из Ташкента' gapi nimani anglatadi?",
      target_audio_text: "Я из Ташкента.",
      options: ["Men Toshkentdanman", "Men Toshkentda yashayman", "Men Toshkentga boraman", "Men Toshkentni yaxshi koʻraman"],
      correct_answer: "Men Toshkentdanman",
      explanation: "‘Я из …’ — kelib chiqishni bildiradi: ‘Я из Ташкента’ — men Toshkentdanman."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Qayerda yashashingizni ayting: 'Men Moskvada yashayman'",
      target_audio_text: "Я живу в Москве.",
      accepted_orders: ["Я в Москве живу."],
      words_pool: ["Я", "живу", "в", "Москве.", "Москва", "из"],
      correct_order: ["Я", "живу", "в", "Москве."],
      explanation: "‘Жить в …’ — …da yashamoq. ‘В’ dan keyin shahar nomi oʻzgaradi: Москва → в Москве."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Qayerdan ekaningizni ayting: 'Я из ___.' (Oʻzbekistondan)",
      sentence_with_blank: "Я из ___.",
      blank_answer: "Узбекистана",
      hint: "‘Из’ dan keyin soʻz oxiriga -a qoʻshiladi",
      options: ["Узбекистана", "Узбекистан", "Узбекистане", "Узбекистаном"],
      target_audio_text: "Я из Узбекистана.",
      explanation: "‘Из’ (-dan) dan keyin otning shakli oʻzgaradi: Узбекистан → из Узбекистана, Ташкент → из Ташкента."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Mening ona tilim — oʻzbek tili' gapini tanlang:",
      target_audio_text: "Мой родной язык — узбекский.",
      options: ["Мой родной язык — узбекский.", "Я немного говорю по-русски.", "Я из Узбекистана.", "Я живу в Москве."],
      correct_answer: "Мой родной язык — узбекский.",
      explanation: "‘Родной язык’ — ona tili. Tire (—) bu yerda ‘boʻlmoq’ oʻrnida turadi."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Men ozgina ruscha gapiraman'",
      target_audio_text: "Я немного говорю по-русски.",
      accepted_orders: ["Я говорю по-русски немного.", "Я говорю немного по-русски."],
      words_pool: ["Я", "немного", "говорю", "по-русски.", "язык", "русский"],
      correct_order: ["Я", "немного", "говорю", "по-русски."],
      explanation: "‘Немного’ — ozgina; ‘говорить по-русски’ — ruscha gapirmoq."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Suhbatdoshingiz juda tez gapiryapti. Ayting: 'Kechirasiz, men tushunmayapman'",
      sentence_with_blank: "Извините, я не ___.",
      blank_answer: "понимаю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["понимаю", "понимает", "понимаешь", "понимать"],
      target_audio_text: "Извините, я не понимаю.",
      explanation: "‘Я не понимаю’ — men tushunmayapman. Qayta aytishini soʻrash uchun: ‘Повторите, пожалуйста’."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Millatingizni ayting (erkak kishi): 'Men oʻzbekman'",
      target_audio_text: "Я узбек.",
      options: ["Я узбек", "Я узбечка", "Я русский", "Я из Ташкента"],
      correct_answer: "Я узбек",
      explanation: "Erkak kishi: ‘Я узбек’. Ayol kishi: ‘Я узбечка’."
    }
  ]
};

export const LESSON_10_DATA: LessonPackage = {
  lesson_id: "a1_lesson_10",
  level: "A1",
  topic: "Kasb va ish joyi",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Кем вы работаете?", translation: "Kim boʻlib ishlaysiz?", audio_text: "Кем вы работаете?" },
    { term: "Я работаю водителем", translation: "Men haydovchi boʻlib ishlayman", audio_text: "Я работаю водителем" },
    { term: "Я работаю на стройке", translation: "Men qurilishda ishlayman", audio_text: "Я работаю на стройке" },
    { term: "Я строитель", translation: "Men quruvchiman", audio_text: "Я строитель" },
    { term: "Где вы работаете?", translation: "Qayerda ishlaysiz?", audio_text: "Где вы работаете?" },
    { term: "Я работаю в магазине", translation: "Men doʻkonda ishlayman", audio_text: "Я работаю в магазине" },
    { term: "Я студент", translation: "Men talabaman", audio_text: "Я студент", alternatives: ["Я студентка"] },
    { term: "Сегодня у меня выходной", translation: "Bugun dam olish kunim", audio_text: "Сегодня у меня выходной" },
    { term: "Я работаю каждый день", translation: "Men har kuni ishlayman", audio_text: "Я работаю каждый день" },
    { term: "Мой начальник", translation: "Mening boshligʻim", audio_text: "Мой начальник" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Sizdan 'Кем вы работаете?' deb soʻrashdi. Bu qanday savol?",
      target_audio_text: "Кем вы работаете?",
      options: ["Kim boʻlib ishlaysiz?", "Qayerda yashaysiz?", "Yoshingiz nechada?", "Qayerdansiz?"],
      correct_answer: "Kim boʻlib ishlaysiz?",
      explanation: "‘Кем?’ — kim boʻlib? Kasb haqida soʻrashning eng oddiy usuli."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Kasbingizni ayting: 'Men haydovchi boʻlib ishlayman'",
      target_audio_text: "Я работаю водителем.",
      accepted_orders: ["Я водителем работаю."],
      words_pool: ["Я", "работаю", "водителем.", "водитель", "на"],
      correct_order: ["Я", "работаю", "водителем."],
      explanation: "‘Работать кем?’ dan keyin kasb nomi oʻzgaradi: водитель → работаю водителем."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Qayerda ishlashingizni ayting: 'Я ___ на стройке.'",
      sentence_with_blank: "Я ___ на стройке.",
      blank_answer: "работаю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["работаю", "работает", "работаешь", "работать"],
      target_audio_text: "Я работаю на стройке.",
      explanation: "‘Я работаю’ — men ishlayman. ‘Стройка’ — qurilish maydoni: ‘на стройке’ — qurilishda."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Я строитель' gapi nimani anglatadi?",
      target_audio_text: "Я строитель.",
      options: ["Men quruvchiman", "Men haydovchiman", "Men talabaman", "Men sotuvchiman"],
      correct_answer: "Men quruvchiman",
      explanation: "Hozirgi zamonda ‘boʻlmoq’ feʼli aytilmaydi: ‘Я строитель’ — men quruvchiman."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻrang: 'Siz qayerda ishlaysiz?'",
      target_audio_text: "Где вы работаете?",
      accepted_orders: ["Вы где работаете?"],
      words_pool: ["Где", "вы", "работаете?", "кем", "работаю"],
      correct_order: ["Где", "вы", "работаете?"],
      explanation: "‘Где?’ — qayerda? ‘Вы работаете’ — siz ishlaysiz."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Men doʻkonda ishlayman'",
      sentence_with_blank: "Я работаю в ___.",
      blank_answer: "магазине",
      hint: "‘В’ (…da) dan keyingi shakl",
      options: ["магазине", "магазин", "магазина", "магазином"],
      target_audio_text: "Я работаю в магазине.",
      explanation: "‘В’ (…da) dan keyin joy nomiga -е qoʻshiladi: магазин → в магазине."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Siz oʻqiysiz. Qanday aytasiz: 'Men talabaman'?",
      target_audio_text: "Я студент.",
      options: ["Я студент", "Я строитель", "Я водитель", "Я начальник"],
      correct_answer: "Я студент",
      explanation: "‘Студент’ — talaba (qiz bola uchun: ‘студентка’)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Bugun dam olish kunim'",
      target_audio_text: "Сегодня у меня выходной.",
      accepted_orders: ["У меня сегодня выходной."],
      words_pool: ["Сегодня", "у", "меня", "выходной.", "работаю", "день"],
      correct_order: ["Сегодня", "у", "меня", "выходной."],
      explanation: "‘Выходной (день)’ — dam olish kuni. ‘У меня …’ — menda … bor."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Men har kuni ishlayman'",
      sentence_with_blank: "Я работаю ___ день.",
      blank_answer: "каждый",
      hint: "‘День’ erkak jinsidagi soʻz",
      options: ["каждый", "каждая", "каждое", "каждые"],
      target_audio_text: "Я работаю каждый день.",
      explanation: "‘Каждый день’ — har kuni. ‘День’ erkak jinsida, shuning uchun ‘каждый’."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Mening boshligʻim — yaxshi odam' gapini tanlang:",
      target_audio_text: "Мой начальник — хороший человек.",
      options: [
        "Мой начальник — хороший человек.",
        "Мой друг — хороший водитель.",
        "Мой брат работает в магазине.",
        "Мой начальник работает каждый день."
      ],
      correct_answer: "Мой начальник — хороший человек.",
      explanation: "‘Начальник’ — boshliq, rahbar. Tire (—) bu yerda ‘boʻlmoq’ oʻrnida turadi."
    }
  ]
};

export const LESSON_11_DATA: LessonPackage = {
  lesson_id: "a1_lesson_11",
  level: "A1",
  topic: "Soat va kun tartibi",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Который час?", translation: "Soat necha?", audio_text: "Который час?" },
    { term: "Сейчас три часа", translation: "Hozir soat uch", audio_text: "Сейчас три часа" },
    { term: "Я встаю в семь часов", translation: "Men soat yettida turaman", audio_text: "Я встаю в семь часов" },
    { term: "Утром", translation: "Ertalab", audio_text: "Утром" },
    { term: "Я завтракаю", translation: "Men nonushta qilaman", audio_text: "Я завтракаю" },
    { term: "Я иду на работу", translation: "Men ishga ketyapman", audio_text: "Я иду на работу" },
    { term: "Я обедаю в час", translation: "Men soat birda tushlik qilaman", audio_text: "Я обедаю в час" },
    { term: "Вечером", translation: "Kechqurun", audio_text: "Вечером" },
    { term: "Я ложусь спать в одиннадцать", translation: "Men soat oʻn birda uxlashga yotaman", audio_text: "Я ложусь спать в одиннадцать" },
    { term: "Я опаздываю", translation: "Men kechikyapman", audio_text: "Я опаздываю" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Koʻchada sizdan 'Который час?' deb soʻrashdi. Bu qanday savol?",
      target_audio_text: "Который час?",
      options: ["Soat necha?", "Qayerdasiz?", "Bugun qaysi kun?", "Yoshingiz nechada?"],
      correct_answer: "Soat necha?",
      explanation: "‘Который час?’ — soat necha? Shunday ham soʻrashadi: ‘Сколько времени?’"
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Javob bering: 'Hozir soat uch'",
      target_audio_text: "Сейчас три часа.",
      words_pool: ["Сейчас", "три", "часа.", "час", "утром"],
      correct_order: ["Сейчас", "три", "часа."],
      explanation: "2, 3, 4 dan keyin ‘часа’, 5 dan 20 gacha ‘часов’: три часа, семь часов."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Men soat yettida turaman'",
      sentence_with_blank: "Я встаю в семь ___.",
      blank_answer: "часов",
      hint: "5 dan keyingi shakl",
      options: ["часов", "часа", "час", "часы"],
      target_audio_text: "Я встаю в семь часов.",
      explanation: "‘Вставать’ — (uyqudan) turmoq. ‘В семь часов’ — soat yettida."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Утром я завтракаю' gapi nimani anglatadi?",
      target_audio_text: "Утром я завтракаю.",
      options: ["Ertalab men nonushta qilaman", "Kechqurun men kechki ovqat qilaman", "Ertalab men ishga boraman", "Kunduzi men tushlik qilaman"],
      correct_answer: "Ertalab men nonushta qilaman",
      explanation: "‘Утром’ — ertalab; ‘завтракать’ — nonushta qilmoq."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Keyin men ishga ketaman'",
      target_audio_text: "Потом я иду на работу.",
      accepted_orders: ["Я потом иду на работу."],
      words_pool: ["Потом", "я", "иду", "на", "работу.", "работа", "в"],
      correct_order: ["Потом", "я", "иду", "на", "работу."],
      explanation: "‘Потом’ — keyin. ‘Идти на работу’ — ishga (piyoda) bormoq."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Men soat birda tushlik qilaman'",
      sentence_with_blank: "Я обедаю в ___.",
      blank_answer: "час",
      hint: "Soat bir: ‘один’ soʻzi aytilmaydi",
      options: ["час", "часа", "часов", "часы"],
      target_audio_text: "Я обедаю в час.",
      explanation: "‘Обедать’ — tushlik qilmoq. ‘В час’ — soat birda."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Kechqurun men uydaman' gapini tanlang:",
      target_audio_text: "Вечером я дома.",
      options: ["Вечером я дома.", "Утром я дома.", "Вечером я на работе.", "Днём я в магазине."],
      correct_answer: "Вечером я дома.",
      explanation: "‘Утром’ — ertalab, ‘днём’ — kunduzi, ‘вечером’ — kechqurun. ‘Дома’ — uyda."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Men soat oʻn birda uxlashga yotaman'",
      target_audio_text: "Я ложусь спать в одиннадцать.",
      accepted_orders: ["В одиннадцать я ложусь спать.", "Я в одиннадцать ложусь спать."],
      words_pool: ["Я", "ложусь", "спать", "в", "одиннадцать.", "утро", "часа"],
      correct_order: ["Я", "ложусь", "спать", "в", "одиннадцать."],
      explanation: "‘Ложиться спать’ — uxlashga yotmoq."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Uchrashuvga kech qolyapsiz. Telefonda ayting: 'Kechirasiz, men kechikyapman'",
      sentence_with_blank: "Извините, я ___.",
      blank_answer: "опаздываю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["опаздываю", "опаздывает", "опаздываешь", "опаздывать"],
      target_audio_text: "Извините, я опаздываю.",
      explanation: "‘Опаздывать’ — kechikmoq: ‘Извините, я опаздываю’ — kechirasiz, kechikyapman."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Я встаю в семь часов' gapi nimani anglatadi?",
      target_audio_text: "Я встаю в семь часов.",
      options: ["Men soat yettida turaman", "Men soat yettida uxlayman", "Men soat yettida ishlayman", "Men yetti soat uxlayman"],
      correct_answer: "Men soat yettida turaman",
      explanation: "‘Вставать’ — turmoq, ‘ложиться спать’ — uxlashga yotmoq."
    }
  ]
};

export const LESSON_12_DATA: LessonPackage = {
  lesson_id: "a1_lesson_12",
  level: "A1",
  topic: "Hafta kunlari va oylar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Какой сегодня день?", translation: "Bugun qaysi kun?", audio_text: "Какой сегодня день?" },
    { term: "Сегодня понедельник", translation: "Bugun dushanba", audio_text: "Сегодня понедельник" },
    { term: "Завтра вторник", translation: "Ertaga seshanba", audio_text: "Завтра вторник" },
    { term: "В пятницу", translation: "Juma kuni", audio_text: "В пятницу" },
    { term: "В субботу", translation: "Shanba kuni", audio_text: "В субботу" },
    { term: "В воскресенье", translation: "Yakshanba kuni", audio_text: "В воскресенье" },
    { term: "Каждую среду", translation: "Har chorshanba", audio_text: "Каждую среду" },
    { term: "В четверг", translation: "Payshanba kuni", audio_text: "В четверг" },
    { term: "Мой день рождения в мае", translation: "Mening tugʻilgan kunim mayda", audio_text: "Мой день рождения в мае" },
    { term: "В январе", translation: "Yanvarda", audio_text: "В январе" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Hamkasbingiz 'Какой сегодня день?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Какой сегодня день?",
      options: ["Bugun qaysi kun?", "Soat necha?", "Bugun havo qanday?", "Ertaga nima qilasiz?"],
      correct_answer: "Bugun qaysi kun?",
      explanation: "‘Какой сегодня день?’ — hafta kunini soʻrash."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bugun dushanba, men ishdaman'",
      target_audio_text: "Сегодня понедельник, я на работе.",
      accepted_orders: ["Я на работе, сегодня понедельник."],
      words_pool: ["Сегодня", "понедельник,", "я", "на", "работе.", "работа", "дом"],
      correct_order: ["Сегодня", "понедельник,", "я", "на", "работе."],
      explanation: "‘Понедельник’ — dushanba. ‘На работе’ — ishda."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Hafta kunlari tartibini eslang: 'Bugun dushanba, ertaga esa…'",
      sentence_with_blank: "Сегодня понедельник, а завтра ___.",
      blank_answer: "вторник",
      hint: "Dushanbadan keyingi kun",
      options: ["вторник", "среда", "пятница", "воскресенье"],
      target_audio_text: "Сегодня понедельник, а завтра вторник.",
      explanation: "Hafta: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Juma kuni' qanday aytiladi?",
      target_audio_text: "В пятницу.",
      options: ["В пятницу", "В понедельник", "В среду", "В четверг"],
      correct_answer: "В пятницу",
      explanation: "‘В’ + hafta kuni — …kuni: в понедельник, в среду, в пятницу (пятница → в пятницу)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Shanba kuni men dam olaman'",
      target_audio_text: "В субботу я отдыхаю.",
      accepted_orders: ["Я отдыхаю в субботу.", "Я в субботу отдыхаю."],
      words_pool: ["В", "субботу", "я", "отдыхаю.", "отдыхать", "суббота"],
      correct_order: ["В", "субботу", "я", "отдыхаю."],
      explanation: "‘Отдыхать’ — dam olmoq. ‘Суббота’ → ‘в субботу’ — shanba kuni."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Yakshanba kuni men uydaman'",
      sentence_with_blank: "В ___ я дома.",
      blank_answer: "воскресенье",
      hint: "Bu soʻzning oxiri oʻzgarmaydi",
      options: ["воскресенье", "воскресенья", "воскресеньем", "воскресенью"],
      target_audio_text: "В воскресенье я дома.",
      explanation: "‘Воскресенье’ — yakshanba; ‘в воскресенье’ — yakshanba kuni."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Каждую среду я учу русский язык' gapidagi 'каждую среду' nimani anglatadi?",
      target_audio_text: "Каждую среду я учу русский язык.",
      options: ["Har chorshanba", "Har juma", "Har kuni", "Har dushanba"],
      correct_answer: "Har chorshanba",
      explanation: "‘Среда’ — chorshanba; ‘каждую среду’ — har chorshanba. ‘Я учу русский язык’ — men rus tilini oʻrganaman."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Payshanba kuni mening darsim bor'",
      target_audio_text: "В четверг у меня урок.",
      accepted_orders: ["У меня урок в четверг.", "У меня в четверг урок."],
      words_pool: ["В", "четверг", "у", "меня", "урок.", "четверга", "уроки"],
      correct_order: ["В", "четверг", "у", "меня", "урок."],
      explanation: "‘Четверг’ — payshanba; ‘в четверг’ — payshanba kuni. ‘У меня урок’ — mening darsim bor."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Mening tugʻilgan kunim mayda'",
      sentence_with_blank: "Мой день рождения в ___.",
      blank_answer: "мае",
      hint: "‘В’ dan keyin oy nomi -е bilan tugaydi",
      options: ["мае", "май", "мая", "маем"],
      target_audio_text: "Мой день рождения в мае.",
      explanation: "Oylar bilan ‘в’: в январе, в мае, в октябре. ‘День рождения’ — tugʻilgan kun."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Yanvarda' qanday aytiladi?",
      target_audio_text: "В январе.",
      options: ["В январе", "В июне", "В марте", "В августе"],
      correct_answer: "В январе",
      explanation: "Oylar: январь, февраль, март, апрель, май, июнь, июль, август, сентябрь, октябрь, ноябрь, декабрь."
    }
  ]
};

export const LESSON_13_DATA: LessonPackage = {
  lesson_id: "a1_lesson_13",
  level: "A1",
  topic: "Ob-havo va fasllar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Какая сегодня погода?", translation: "Bugun havo qanday?", audio_text: "Какая сегодня погода?" },
    { term: "Холодно", translation: "Sovuq", audio_text: "Холодно" },
    { term: "Жарко", translation: "Issiq", audio_text: "Жарко" },
    { term: "Идёт дождь", translation: "Yomgʻir yogʻyapti", audio_text: "Идёт дождь" },
    { term: "Идёт снег", translation: "Qor yogʻyapti", audio_text: "Идёт снег" },
    { term: "Светит солнце", translation: "Quyosh charaqlayapti", audio_text: "Светит солнце" },
    { term: "Зимой", translation: "Qishda", audio_text: "Зимой" },
    { term: "Летом", translation: "Yozda", audio_text: "Летом" },
    { term: "Осенью", translation: "Kuzda", audio_text: "Осенью" },
    { term: "Возьмите зонт", translation: "Soyabon oling", audio_text: "Возьмите зонт" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Doʻstingiz 'Какая сегодня погода?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Какая сегодня погода?",
      options: ["Bugun havo qanday?", "Bugun qaysi kun?", "Soat necha?", "Qayerda yashaysiz?"],
      correct_answer: "Bugun havo qanday?",
      explanation: "‘Погода’ — ob-havo. ‘Какая сегодня погода?’ — bugun havo qanday?"
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bugun juda sovuq'",
      target_audio_text: "Сегодня очень холодно.",
      accepted_orders: ["Очень холодно сегодня."],
      words_pool: ["Сегодня", "очень", "холодно.", "холодный", "погода"],
      correct_order: ["Сегодня", "очень", "холодно."],
      explanation: "Havo haqida ‘холодно’ (sovuq) deyiladi. ‘Очень’ — juda."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Toshkentda yoz qanday? 'Летом в Ташкенте очень ___.' (issiq)",
      sentence_with_blank: "Летом в Ташкенте очень ___.",
      blank_answer: "жарко",
      hint: "Issiq havo",
      options: ["жарко", "холодно", "снег", "дождь"],
      target_audio_text: "Летом в Ташкенте очень жарко.",
      explanation: "‘Летом’ — yozda; ‘жарко’ — issiq."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Идёт дождь' gapi nimani anglatadi?",
      target_audio_text: "Идёт дождь.",
      options: ["Yomgʻir yogʻyapti", "Qor yogʻyapti", "Quyosh chiqdi", "Shamol esyapti"],
      correct_answer: "Yomgʻir yogʻyapti",
      explanation: "Ruschada yomgʻir va qor ‘yuradi’: ‘идёт дождь’, ‘идёт снег’."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Qishda tez-tez qor yogʻadi'",
      target_audio_text: "Зимой часто идёт снег.",
      accepted_orders: ["Часто зимой идёт снег."],
      words_pool: ["Зимой", "часто", "идёт", "снег.", "снега", "зима"],
      correct_order: ["Зимой", "часто", "идёт", "снег."],
      explanation: "‘Зимой’ — qishda; ‘часто’ — tez-tez."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Havo ochiq. Ayting: 'Bugun quyosh charaqlayapti'",
      sentence_with_blank: "Сегодня светит ___.",
      blank_answer: "солнце",
      hint: "Osmonda nur sochadi",
      options: ["солнце", "снег", "дождь", "зима"],
      target_audio_text: "Сегодня светит солнце.",
      explanation: "‘Светит солнце’ — quyosh charaqlayapti (havo ochiq)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Kuzda tez-tez yomgʻir yogʻadi' gapini tanlang:",
      target_audio_text: "Осенью часто идёт дождь.",
      options: ["Осенью часто идёт дождь.", "Зимой часто идёт снег.", "Летом очень жарко.", "Сегодня светит солнце."],
      correct_answer: "Осенью часто идёт дождь.",
      explanation: "Fasllar: зимой — qishda, весной — bahorda, летом — yozda, осенью — kuzda."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Doʻstingizga maslahat bering: 'Soyabon oling, yomgʻir yogʻyapti'",
      target_audio_text: "Возьмите зонт, идёт дождь.",
      accepted_orders: ["Идёт дождь, возьмите зонт."],
      words_pool: ["Возьмите", "зонт,", "идёт", "дождь.", "зонта", "дождя"],
      correct_order: ["Возьмите", "зонт,", "идёт", "дождь."],
      explanation: "‘Возьмите’ — oling (hurmat bilan); ‘зонт’ — soyabon."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Qishda Moskvada juda sovuq'",
      sentence_with_blank: "Зимой в Москве очень ___.",
      blank_answer: "холодно",
      hint: "Havo haqida gapirganda",
      options: ["холодно", "холодный", "холод", "холодная"],
      target_audio_text: "Зимой в Москве очень холодно.",
      explanation: "Havo haqida ‘холодно’, ‘жарко’ shakli ishlatiladi: ‘Зимой холодно’."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Doʻstingiz 'Какая сегодня погода?' deb soʻradi. Javob bering: 'Bugun issiq, quyosh charaqlayapti'",
      target_audio_text: "Сегодня жарко, светит солнце.",
      options: ["Сегодня жарко, светит солнце.", "Сегодня холодно, идёт снег.", "Сегодня идёт дождь.", "Сегодня понедельник."],
      correct_answer: "Сегодня жарко, светит солнце.",
      explanation: "‘Жарко’ — issiq; ‘светит солнце’ — quyosh charaqlayapti."
    }
  ]
};

