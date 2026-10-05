import { LessonPackage } from '../types/lesson';

export const LESSON_1_DATA: LessonPackage = {
  lesson_id: "a1_lesson_01",
  level: "A1",
  topic: "Tanishuv va salomlashish",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Здравствуйте", translation: "Assalomu alaykum (rasmiy salom)", audio_text: "Здравствуйте" },
    { term: "Привет", translation: "Salom (doʻstona, norasmiy)", audio_text: "Привет" },
    { term: "Меня зовут...", translation: "Mening ismim...", audio_text: "Меня зовут" },
    { term: "Как вас зовут?", translation: "Sizning ismingiz nima?", audio_text: "Как вас зовут?" },
    { term: "Очень приятно", translation: "Tanishganimdan xursandman", audio_text: "Очень приятно" },
    { term: "Как дела?", translation: "Ishlar/hol-ahvol qalay?", audio_text: "Как дела?" },
    { term: "Хорошо, спасибо", translation: "Yaxshi, rahmat", audio_text: "Хорошо, спасибо" },
    { term: "Доброе утро", translation: "Xayrli tong", audio_text: "Доброе утро" },
    { term: "До свидания", translation: "Xayr (koʻrishguncha)", audio_text: "До свидания" },
    { term: "До скорой встречи", translation: "Tez orada koʻrishguncha!", audio_text: "До скорой встречи" },
  ],
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
      explanation: "‘Привет’ — doʻstona salom, ‘До скорой встречи!’ esa 'Tez orada koʻrishguncha!' deganidir."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Boʻsh joyni toʻldiring: 'Hol-ahvolingiz qalay?'",
      sentence_with_blank: "Как ___?",
      blank_answer: "дела",
      hint: "Ishlar/hol-ahvol maʼnosidagi soʻz",
      options: [
        "дела",
        "вас",
        "зовут",
        "утро"
      ],
      target_audio_text: "Как дела?",
      explanation: "‘Как дела?’ — rus tilida eng koʻp qoʻllaniladigan 'Ishlar qalay? Ahvollar yaxshimi?' iborasidir."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Как дела?' savoliga 'Yaxshi, rahmat!' deb qanday javob beriladi?",
      target_audio_text: "Хорошо, спасибо!",
      options: [
        "Хорошо, спасибо",
        "Плохо, извините",
        "Меня зовут",
        "До свидания"
      ],
      correct_answer: "Хорошо, спасибо",
      explanation: "‘Хорошо, спасибо!’ — eng xushmuomala va ommabop javob hisoblanadi."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ertalabki 'Xayrli tong, doʻstim!' jumlasini rus tilida toʻgʻri tartibda tering.",
      target_audio_text: "Доброе утро, мой друг!",
      words_pool: [
        "Доброе",
        "утро,",
        "мой",
        "друг!",
        "Добрый",
        "день"
      ],
      correct_order: [
        "Доброе",
        "утро,",
        "мой",
        "друг!"
      ],
      explanation: "‘Утро’ oʻrta jinsdagi soʻz boʻlgani uchun ‘Доброе утро’ shaklida aytiladi."
    },
    {
      id: 9,
      type: "multiple_choice",
      instruction: "Xayrlashuv paytida 'Xayr, koʻrishguncha' (rasmiy) maʼnosida qaysi soʻz aytiladi?",
      target_audio_text: "До свидания!",
      options: [
        "До свидания",
        "Здравствуйте",
        "Пожалуйста",
        "Привет"
      ],
      correct_answer: "До свидания",
      explanation: "‘До свидания’ soʻzma-soʻz 'Koʻrishguncha' maʼnosini anglatuvchi eng asosiy rasmiy xayrlashuvdir."
    },
    {
      id: 10,
      type: "fill_blank",
      instruction: "'Mening doʻstimning ismi Timur' gapini toʻldiring:",
      sentence_with_blank: "Моего друга ___ Тимур.",
      blank_answer: "зовут",
      hint: "Chaqiradilar maʼnosidagi feʼl",
      options: [
        "зовут",
        "дела",
        "приятно",
        "утро"
      ],
      target_audio_text: "Моего друга зовут Тимур.",
      explanation: "Uchinchi shaxs uchun ham 'зовут' feʼli saqlanadi: ‘Моего друга зовут Тимур’."
    }
  ]
};

export const LESSON_2_DATA: LessonPackage = {
  lesson_id: "a1_lesson_02",
  level: "A1",
  topic: "Raqamlar va xarid qilish",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Сколько это стоит?", translation: "Bu qancha turadi?", audio_text: "Сколько это стоит?" },
    { term: "Один кофе, пожалуйста", translation: "Bitta kofe, iltimos", audio_text: "Один кофе, пожалуйста" },
    { term: "Счёт, пожалуйста", translation: "Hisobni bering, iltimos", audio_text: "Счёт, пожалуйста" },
    { term: "Один, два, три", translation: "Bir, ikki, uch", audio_text: "Один, два, три" },
    { term: "Четыре, пять", translation: "Toʻrt, besh", audio_text: "Четыре, пять" },
    { term: "Десять", translation: "Oʻn", audio_text: "Десять" },
    { term: "Стакан воды", translation: "Bir stakan suv", audio_text: "Стакан воды" },
    { term: "Рубль / Рубли", translation: "Rubl (pul birligi)", audio_text: "Рубль" },
    { term: "Без сахара", translation: "Shakarsiz", audio_text: "Без сахара" },
    { term: "Вот, пожалуйста", translation: "Mana, marhamat", audio_text: "Вот, пожалуйста" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Kafeda 'Bitta kofe, iltimos' deb buyurtma berish uchun qaysi ibora toʻgʻri?",
      target_audio_text: "Один кофе, пожалуйста.",
      options: [
        "Один кофе, пожалуйста",
        "Сколько это стоит?",
        "Счёт, пожалуйста",
        "До свидания"
      ],
      correct_answer: "Один кофе, пожалуйста",
      explanation: "‘Один кофе, пожалуйста’ — kafeda ichimlik buyurtma qilishning eng odobli va standart shaklidir."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri tartibda terib: 'Bu qancha turadi?' savolini hosil qiling.",
      target_audio_text: "Сколько это стоит?",
      words_pool: [
        "стоит?",
        "Сколько",
        "это",
        "кофе",
        "пожалуйста"
      ],
      correct_order: [
        "Сколько",
        "это",
        "стоит?"
      ],
      explanation: "‘Сколько это стоит?’ — doʻkon va bozorlarda narx soʻrash uchun ishlatiladigan asosiy jumla."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Kafeda ofitsiantdan 'Hisobni olib keling, iltimos' deb soʻrang:",
      sentence_with_blank: "___, пожалуйста!",
      blank_answer: "Счёт",
      hint: "Kafedagi hisob cheki",
      options: [
        "Счёт",
        "Кофе",
        "Вода",
        "Меню"
      ],
      target_audio_text: "Счёт, пожалуйста!",
      explanation: "‘Счёт, пожалуйста!’ — restoran va kafelarda hisob-kitob qilishni soʻrashda aytiladi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Rus tilida '1, 2, 3' raqamlari qanday aytiladi?",
      target_audio_text: "Один, два, три.",
      options: [
        "Один, два, три",
        "Четыре, пять, шесть",
        "Семь, восемь, девять",
        "Десять, двадцать, тридцать"
      ],
      correct_answer: "Один, два, три",
      explanation: "‘Один’ (1), ‘Два’ (2), ‘Три’ (3) — rus tilining eng boshlangʻich sanash raqamlaridir."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri joylashtirib: 'Iltimos, bir stakan suv bering' jumlasini tuzing.",
      target_audio_text: "Стакан воды, пожалуйста.",
      words_pool: [
        "Стакан",
        "воды,",
        "пожалуйста.",
        "Один",
        "чай"
      ],
      correct_order: [
        "Стакан",
        "воды,",
        "пожалуйста."
      ],
      explanation: "‘Стакан воды, пожалуйста’ — bitta stakan ichimlik suvi soʻrash."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ichimlikka shakar solmaslikni soʻrang: '___ сахара' (Shakarsiz)",
      sentence_with_blank: "Кофе ___ сахара, пожалуйста.",
      blank_answer: "без",
      hint: "-siz / boʻlmasin maʼnosidagi predlog",
      options: [
        "без",
        "для",
        "из",
        "под"
      ],
      target_audio_text: "Кофе без сахара, пожалуйста.",
      explanation: "‘Без сахара’ — shakarsiz degani. ‘Без’ predlogi '...siz' inkor maʼnosini beradi."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Сто рублей' iborasi oʻzbek tilida nimani bildiradi?",
      target_audio_text: "Сто рублей.",
      options: [
        "Yuz rubl",
        "Oʻn rubl",
        "Ming rubl",
        "Besh yuz rubl"
      ],
      correct_answer: "Yuz rubl",
      explanation: "‘Сто’ — 100 raqami, ‘рублей’ — rubl valyutasining koʻplik shakli."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Doʻkonda narsa uzatayotganda: 'Mana, marhamat oling' jumlasini tartiblang.",
      target_audio_text: "Вот, пожалуйста, возьмите.",
      words_pool: [
        "Вот,",
        "пожалуйста,",
        "возьмите.",
        "Сколько",
        "стоит"
      ],
      correct_order: [
        "Вот,",
        "пожалуйста,",
        "возьмите."
      ],
      explanation: "‘Вот, пожалуйста’ — buyum, pul yoki hujjat uzatishda aytiladigan xushmuomala ibora."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Kassirga 'Qaytim kerak emas' deb ayting: 'Сдачу ___ надо'",
      sentence_with_blank: "Спасибо, сдачу ___ надо.",
      blank_answer: "не",
      hint: "Inkor yuklamasi",
      options: [
        "не",
        "да",
        "нет",
        "без"
      ],
      target_audio_text: "Спасибо, сдачу не надо.",
      explanation: "‘Сдачу не надо’ — mayda qaytim pulini qoldirganda 'Qaytimi kerak emas' maʼnosida qoʻllaniladi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Kassada 'Ikkita chipta bering' iborasi qanday boʻladi?",
      target_audio_text: "Дайте два билета, пожалуйста.",
      options: [
        "Дайте два билета, пожалуйста",
        "Один кофе, пожалуйста",
        "Сколько это стоит?",
        "Счёт, пожалуйста"
      ],
      correct_answer: "Дайте два билета, пожалуйста",
      explanation: "‘Два билета’ — ikkita chipta. ‘Дайте ... пожалуйста’ — bering, iltimos."
    }
  ]
};

export const LESSON_3_DATA: LessonPackage = {
  lesson_id: "a1_lesson_03",
  level: "A1",
  topic: "Oila va uy",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Это моя семья", translation: "Bu mening oilam", audio_text: "Это моя семья" },
    { term: "Мама и папа", translation: "Ona va ota", audio_text: "Мама и папа" },
    { term: "Брат и сестра", translation: "Aka/uka va opa/singil", audio_text: "Брат и сестра" },
    { term: "У меня есть...", translation: "Menda bor...", audio_text: "У меня есть" },
    { term: "Где вы живёте?", translation: "Siz qayerda yashaysiz?", audio_text: "Где вы живёте?" },
    { term: "Я живу в...", translation: "Men ...da yashayman", audio_text: "Я живу в" },
    { term: "Наш дом", translation: "Bizning uyimiz", audio_text: "Наш дом" },
    { term: "Квартира", translation: "Kvartira (xonadon)", audio_text: "Квартира" },
    { term: "Большая семья", translation: "Katta oila", audio_text: "Большая семья" },
    { term: "Мы живём вместе", translation: "Biz birga yashaymiz", audio_text: "Мы живём вместе" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Bu mening oilam' jumlasining ruscha toʻgʻri tarjimasini tanlang:",
      target_audio_text: "Это моя семья.",
      options: [
        "Это моя семья",
        "Это мой дом",
        "Это мой друг",
        "Это моя работа"
      ],
      correct_answer: "Это моя семья",
      explanation: "‘Семья’ — oila (ayol jinsida boʻlgani uchun ‘моя семья’ deyiladi)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri tartibda terib: 'Mening akam bor' gapini hosil qiling.",
      target_audio_text: "У меня есть брат.",
      words_pool: [
        "есть",
        "У",
        "меня",
        "брат.",
        "сестра",
        "дом"
      ],
      correct_order: [
        "У",
        "меня",
        "есть",
        "брат."
      ],
      explanation: "Rus tilida 'Menda bor' iborasi ‘У меня есть + ot’ shaklida yasaladi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Oʻzingizning yashash joyingizni ayting: 'Men Toshkentda yashayman'",
      sentence_with_blank: "Я ___ в Ташкенте.",
      blank_answer: "живу",
      hint: "Birinchi shaxs birlik feʼl shakli (я ...)",
      options: [
        "живу",
        "живёт",
        "живём",
        "жить"
      ],
      target_audio_text: "Я живу в Ташкенте.",
      explanation: "‘Жить’ (yashamoq) feʼli 'Я' (men) olmoshi bilan ‘живу’ shaklini oladi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У меня есть сестра' gapi oʻzbek tilida qanday maʼno beradi?",
      target_audio_text: "У меня есть сестра.",
      options: [
        "Mening opam (singlim) bor",
        "Mening akam (ukam) bor",
        "Bu mening onam",
        "Biz birga yashaymiz"
      ],
      correct_answer: "Mening opam (singlim) bor",
      explanation: "‘Сестра’ — opa yoki singil maʼnosini bildiradi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻzlarni toʻgʻri joylashtirib: 'Biz birga yashaymiz' jumlasini tuzing.",
      target_audio_text: "Мы живём вместе.",
      words_pool: [
        "Мы",
        "живём",
        "вместе.",
        "дома",
        "очень"
      ],
      correct_order: [
        "Мы",
        "живём",
        "вместе."
      ],
      explanation: "‘Мы’ — biz, ‘живём’ — yashaymiz, ‘вместе’ — birgalikda."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Nuqtalar oʻrniga mos soʻzni tanlang: 'Mening onam shifokor'",
      sentence_with_blank: "Моя ___ врач.",
      blank_answer: "мама",
      hint: "Oila aʼzosi (ona)",
      options: [
        "мама",
        "папа",
        "брат",
        "друг"
      ],
      target_audio_text: "Моя мама врач.",
      explanation: "‘Моя’ ayol jinsiga tegishli olmosh boʻlgani uchun ‘мама’ tanlanadi."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Kimdandir 'Siz qayerda yashaysiz?' deb soʻrash uchun qaysi ibora ishlatiladi?",
      target_audio_text: "Где вы живёте?",
      options: [
        "Где вы живёте?",
        "Как вас зовут?",
        "Сколько это стоит?",
        "Откуда вы знаете?"
      ],
      correct_answer: "Где вы живёте?",
      explanation: "‘Где’ — qayerda, ‘вы живёте’ — siz yashaysiz."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Soʻzlarni tartiblang: 'Bu bizning yangi xonadonimiz (kvartiramiz)'",
      target_audio_text: "Это наша новая квартира.",
      words_pool: [
        "Это",
        "наша",
        "новая",
        "квартира.",
        "мой",
        "дом"
      ],
      correct_order: [
        "Это",
        "наша",
        "новая",
        "квартира."
      ],
      explanation: "‘Квартира’ ayol jinsida, shuning uchun ‘наша новая квартира’ deyiladi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "'Mening otam muhandis': '___ папа инженер'",
      sentence_with_blank: "___ папа инженер.",
      blank_answer: "Мой",
      hint: "Erkak jinsidagi 'Mening' olmoshi",
      options: [
        "Мой",
        "Моя",
        "Моё",
        "Мои"
      ],
      target_audio_text: "Мой папа инженер.",
      explanation: "‘Папа’ erkak jinsi boʻlgani sababli ‘Мой папа’ deb aytiladi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'У нас большая и дружная семья' gapi qanday tarjima qilinadi?",
      target_audio_text: "У нас большая и дружная семья.",
      options: [
        "Bizda katta va ahil oila bor",
        "Biz yangi uyda yashaymiz",
        "Mening akam va singlim bor",
        "Bu mening shinam uyim"
      ],
      correct_answer: "Bizda katta va ahil oila bor",
      explanation: "‘Большая’ — katta, ‘дружная’ — inoq, ahil degan maʼnoni anglatadi."
    }
  ]
};

export const LESSON_4_DATA: LessonPackage = {
  lesson_id: "a1_lesson_04",
  level: "A1",
  topic: "Shaharda yoʻnalish soʻrash",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Где находится метро?", translation: "Metro qayerda joylashgan?", audio_text: "Где находится метро?" },
    { term: "Идите прямо", translation: "Toʻgʻriga boring", audio_text: "Идите прямо" },
    { term: "Поверните направо", translation: "Oʻngga buriling", audio_text: "Поверните направо" },
    { term: "Поверните налево", translation: "Chapga buriling", audio_text: "Поверните налево" },
    { term: "Это далеко?", translation: "Bu uzoqmi?", audio_text: "Это далеко?" },
    { term: "Это рядом", translation: "Bu yaqin", audio_text: "Это рядом" },
    { term: "Остановка", translation: "Bekat", audio_text: "Остановка" },
    { term: "Пешком", translation: "Piyoda", audio_text: "Пешком" },
    { term: "Перекрёсток", translation: "Chorraha", audio_text: "Перекрёсток" },
    { term: "Скажите, пожалуйста", translation: "Aytingchi, iltimos", audio_text: "Скажите, пожалуйста" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Notanish odamdan 'Metro qayerda joylashgan?' deb soʻrash uchun toʻgʻri jumla:",
      target_audio_text: "Скажите, пожалуйста, где находится метро?",
      options: [
        "Скажите, пожалуйста, где находится метро?",
        "Сколько стоит билет на метро?",
        "Во сколько открывается метро?",
        "Где вы живёте?"
      ],
      correct_answer: "Скажите, пожалуйста, где находится метро?",
      explanation: "‘Где находится...?’ — biror obyektning qayerdaligini soʻrashning eng xushmuomala usuli."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Yoʻl koʻrsating: 'Toʻgʻriga boring va oʻngga buriling'",
      target_audio_text: "Идите прямо и поверните направо.",
      words_pool: [
        "Идите",
        "прямо",
        "и",
        "поверните",
        "направо.",
        "налево"
      ],
      correct_order: [
        "Идите",
        "прямо",
        "и",
        "поверните",
        "направо."
      ],
      explanation: "‘Прямо’ — toʻgʻriga, ‘направо’ — oʻng tomonga."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Boʻsh joyni toʻldiring: 'Chorraxada chapga buriling'",
      sentence_with_blank: "На перекрёстке поверните ___.",
      blank_answer: "налево",
      hint: "Chap tomonga yoʻnalish",
      options: [
        "налево",
        "направо",
        "прямо",
        "быстро"
      ],
      target_audio_text: "На перекрёстке поверните налево.",
      explanation: "‘Налево’ — chapga, ‘На перекрёстке’ — chorrahada."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Это далеко отсюда?' savoli oʻzbek tilida nimani bildiradi?",
      target_audio_text: "Это далеко отсюда?",
      options: [
        "Bu yerdan uzoqmi?",
        "Bu qachon ochiladi?",
        "Bu qancha turadi?",
        "Bu yerga qanday boriladi?"
      ],
      correct_answer: "Bu yerdan uzoqmi?",
      explanation: "‘Далеко’ — uzoq, ‘отсюда’ — bu yerdan."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Javob bering: 'Bu yaqin, piyoda besh daqiqa'",
      target_audio_text: "Это рядом, пять минут пешком.",
      words_pool: [
        "Это",
        "рядом,",
        "пять",
        "минут",
        "пешком.",
        "далеко"
      ],
      correct_order: [
        "Это",
        "рядом,",
        "пять",
        "минут",
        "пешком."
      ],
      explanation: "‘Рядом’ — yonida/yaqin, ‘пешком’ — piyoda yurish."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "'Eng yaqin avtobus bekati qayerda?' gapini toʻldiring:",
      sentence_with_blank: "Где ближайшая ___?",
      blank_answer: "остановка",
      hint: "Jamoat transporti bekati",
      options: [
        "остановка",
        "аптека",
        "станция",
        "дорога"
      ],
      target_audio_text: "Где ближайшая остановка?",
      explanation: "‘Остановка’ — avtobus yoki tramvay bekati."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Как доехать до вокзала?' gapi qanday tarjima qilinadi?",
      target_audio_text: "Как доехать до вокзала?",
      options: [
        "Vokzalga qanday yetib olsa boʻladi?",
        "Vokzal soat nechada ochiladi?",
        "Vokzalga chipta bormi?",
        "Vokzal qayerda joylashgan?"
      ],
      correct_answer: "Vokzalga qanday yetib olsa boʻladi?",
      explanation: "‘Доехать’ — transportda yetib bormoq."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Soʻzlarni terib: 'Avtobus hozir yetib keladi' jumlasini tuzing.",
      target_audio_text: "Автобус сейчас приедет.",
      words_pool: [
        "Автобус",
        "сейчас",
        "приедет.",
        "метро",
        "далеко"
      ],
      correct_order: [
        "Автобус",
        "сейчас",
        "приедет."
      ],
      explanation: "‘Сейчас’ — hozir, ‘приедет’ — yetib keladi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Metrodan chiqish joyini toping: 'Где находится ___?'",
      sentence_with_blank: "Подскажите, где ___?",
      blank_answer: "выход",
      hint: "Chiqish eshigi (kirish emas)",
      options: [
        "выход",
        "вход",
        "поезд",
        "касса"
      ],
      target_audio_text: "Подскажите, где выход?",
      explanation: "‘Выход’ — chiqish joyi, ‘Вход’ — kirish."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Taksistga 'Meni markazga eltib qoʻying' deb qanday aytiladi?",
      target_audio_text: "Довезите меня до центра, пожалуйста.",
      options: [
        "Довезите меня до центра, пожалуйста",
        "Где находится остановка?",
        "Идите прямо и налево",
        "Это очень далеко"
      ],
      correct_answer: "Довезите меня до центра, пожалуйста",
      explanation: "‘Довезите до...’ — ...gacha mashinada yetkazib qoʻymoq."
    }
  ]
};

export const LESSON_5_DATA: LessonPackage = {
  lesson_id: "a1_lesson_05",
  level: "A1",
  topic: "Doʻkonda xarid qilish va narxlar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Можно примерить?", translation: "Kiyib koʻrsam boʻladimi?", audio_text: "Можно примерить?" },
    { term: "Какой это размер?", translation: "Bu qaysi oʻlcham?", audio_text: "Какой это размер?" },
    { term: "Можно оплатить картой?", translation: "Karta bilan toʻlasa boʻladimi?", audio_text: "Можно оплатить картой?" },
    { term: "Это слишком дорого", translation: "Bu juda qimmat", audio_text: "Это слишком дорого" },
    { term: "Есть ли скидка?", translation: "Chegirma bormi?", audio_text: "Есть ли скидка?" },
    { term: "Примерочная", translation: "Kiyib koʻrish xonasi", audio_text: "Примерочная" },
    { term: "Чек", translation: "Xarid cheki", audio_text: "Чек" },
    { term: "Пакет", translation: "Xarid xaltasi (paket)", audio_text: "Пакет" },
    { term: "Я беру это", translation: "Men buni olaman", audio_text: "Я беру это" },
    { term: "Другой цвет", translation: "Boshqa rang", audio_text: "Другой цвет" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Kiyim doʻkonida sotuvchidan 'Kiyib koʻrsam boʻladimi?' deb soʻrang:",
      target_audio_text: "Можно примерить эту куртку?",
      options: [
        "Можно примерить эту куртку?",
        "Сколько стоит этот пакет?",
        "Где находится касса?",
        "У вас есть чек?"
      ],
      correct_answer: "Можно примерить эту куртку?",
      explanation: "‘Примерить’ — kiyim yoki poyabzalni kiyib/oʻlchab koʻrmoq."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Kassirga 'Karta orqali toʻlasa boʻladimi?' deb soʻrang.",
      target_audio_text: "Можно оплатить картой?",
      words_pool: [
        "Можно",
        "оплатить",
        "картой?",
        "наличными",
        "чек"
      ],
      correct_order: [
        "Можно",
        "оплатить",
        "картой?"
      ],
      explanation: "‘Оплатить картой’ — bank kartasi orqali toʻlov qilish."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Kiyib koʻrish kabinasini soʻrang: 'Где находится ___?'",
      sentence_with_blank: "Скажите, где находится ___?",
      blank_answer: "примерочная",
      hint: "Kiyim kiyib koʻriladigan joy",
      options: [
        "примерочная",
        "касса",
        "дверь",
        "скидка"
      ],
      target_audio_text: "Скажите, где находится примерочная?",
      explanation: "‘Примерочная’ — kiyib koʻrish xonasi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Narx juda yuqori boʻlsa, nima deyiladi?",
      target_audio_text: "Это слишком дорого.",
      options: [
        "Это слишком дорого",
        "Это очень дёшево",
        "Я это беру",
        "Дайте мне чек"
      ],
      correct_answer: "Это слишком дорого",
      explanation: "‘Слишком дорого’ — haddan tashqari qimmat."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻzlarni tartiblang: 'Menga boshqa oʻlcham bormi?'",
      target_audio_text: "У вас есть другой размер?",
      words_pool: [
        "У",
        "вас",
        "есть",
        "другой",
        "размер?",
        "цвет"
      ],
      correct_order: [
        "У",
        "вас",
        "есть",
        "другой",
        "размер?"
      ],
      explanation: "‘Размер’ — kiyim yoki poyabzal oʻlchami."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Kassir soʻraydi: 'Пакет ___?' (Paket kerakmi?)",
      sentence_with_blank: "Вам пакет ___?",
      blank_answer: "нужен",
      hint: "Kerak maʼnosidagi soʻz",
      options: [
        "нужен",
        "можно",
        "стоит",
        "есть"
      ],
      target_audio_text: "Вам пакет нужен?",
      explanation: "‘Нужен’ — erkak jinsidagi otlar uchun 'kerak' maʼnosida qoʻllaniladi."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Дайте мне чек, пожалуйста' gapi nimani bildiradi?",
      target_audio_text: "Дайте мне чек, пожалуйста.",
      options: [
        "Menga toʻlov chekini bering, iltimos",
        "Menga paket bering, iltimos",
        "Karta bilan toʻlayman",
        "Chegirma bormi?"
      ],
      correct_answer: "Menga toʻlov chekini bering, iltimos",
      explanation: "‘Чек’ — toʻlov amalga oshirilganini tasdiqlovchi qogʻoz."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Xarid qilishga qaror qildingiz: 'Men buni olaman'",
      target_audio_text: "Хорошо, я беру это.",
      words_pool: [
        "Хорошо,",
        "я",
        "беру",
        "это.",
        "слишком",
        "дорого"
      ],
      correct_order: [
        "Хорошо,",
        "я",
        "беру",
        "это."
      ],
      explanation: "‘Я беру это’ — 'Men buni sotib olaman / xarid qilaman'."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Chegirma soʻrang: 'У вас есть ___ на этот товар?'",
      sentence_with_blank: "У вас есть ___ на это платье?",
      blank_answer: "скидка",
      hint: "Narxning arzonlashtirilishi",
      options: [
        "скидка",
        "карта",
        "чек",
        "размер"
      ],
      target_audio_text: "У вас есть скидка на это платье?",
      explanation: "‘Скидка’ — mahsulotga beriladigan chegirma."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Kassada 'Naqd pul bilan toʻlayman' deb qanday aytiladi?",
      target_audio_text: "Я оплачу наличными.",
      options: [
        "Я оплачу наличными",
        "Можно оплатить картой?",
        "Это слишком дорого",
        "Дайте мне пакет"
      ],
      correct_answer: "Я оплачу наличными",
      explanation: "‘Наличными’ — naqd pul orqali degan maʼnoda keladi."
    }
  ]
};

export const LESSON_6_DATA: LessonPackage = {
  lesson_id: "a1_lesson_06",
  level: "A1",
  topic: "Mehmonxona va turar joy",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "У меня есть бронь", translation: "Menda xona broni bor", audio_text: "У меня есть бронь" },
    { term: "Пароль от Wi-Fi", translation: "Wi-Fi paroli", audio_text: "Пароль от Wi-Fi" },
    { term: "Номер на двоих", translation: "Ikki kishilik xona", audio_text: "Номер на двоих" },
    { term: "Во сколько завтрак?", translation: "Nonushta soat nechada?", audio_text: "Во сколько завтрак?" },
    { term: "Ключ от номера", translation: "Xona kaliti", audio_text: "Ключ от номера" },
    { term: "Лифт", translation: "Lift", audio_text: "Лифт" },
    { term: "Время выезда", translation: "Chiqib ketish vaqti (check-out)", audio_text: "Время выезда" },
    { term: "Кондиционер", translation: "Konditsioner", audio_text: "Кондиционер" },
    { term: "Полотенце", translation: "Sochiq", audio_text: "Полотенце" },
    { term: "Спасибо за помощь", translation: "Yordamingiz uchun rahmat", audio_text: "Спасибо за помощь" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Mehmonxona maʼmuriyatiga kelganda 'Menda xona broni bor' deb qanday aytiladi?",
      target_audio_text: "Здравствуйте, у меня есть бронь.",
      options: [
        "Здравствуйте, у меня есть бронь",
        "Где находится ресторан?",
        "Сколько стоит этот номер?",
        "Во сколько завтрак?"
      ],
      correct_answer: "Здравствуйте, у меня есть бронь",
      explanation: "‘Бронь’ (бронирование) — oldindan band qilingan buyurtma."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Savol bering: 'Wi-Fi paroli qanday?'",
      target_audio_text: "Какой пароль от Wi-Fi?",
      words_pool: [
        "Какой",
        "пароль",
        "от",
        "Wi-Fi?",
        "номер",
        "ключ"
      ],
      correct_order: [
        "Какой",
        "пароль",
        "от",
        "Wi-Fi?"
      ],
      explanation: "‘Пароль от Wi-Fi’ — internetga ulanish kodi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ertalabki ovqatlanish vaqtini soʻrang: 'Во сколько ___?'",
      sentence_with_blank: "Подскажите, во сколько ___?",
      blank_answer: "завтрак",
      hint: "Ertalabki taom",
      options: [
        "завтрак",
        "обед",
        "ужин",
        "выезд"
      ],
      target_audio_text: "Подскажите, во сколько завтрак?",
      explanation: "‘Завтрак’ — nonushta. ‘Во сколько...?’ — soat nechada?"
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Вот ваш ключ от номера' jumlasi qanday tushuniladi?",
      target_audio_text: "Вот ваш ключ от номера.",
      options: [
        "Mana sizning xonangiz kaliti",
        "Sizning xonangiz ikkinchi qavatda",
        "Nonushta soat sakkizda",
        "Pasportingizni bering"
      ],
      correct_answer: "Mana sizning xonangiz kaliti",
      explanation: "‘Ключ’ — kalit, ‘номер’ — mehmonxona xonasi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻzlarni joylashtiring: 'Lift qayerda joylashgan?'",
      target_audio_text: "Скажите, где находится лифт?",
      words_pool: [
        "Скажите,",
        "где",
        "находится",
        "лифт?",
        "номер",
        "ключ"
      ],
      correct_order: [
        "Скажите,",
        "где",
        "находится",
        "лифт?"
      ],
      explanation: "‘Лифт’ — yuqori qavatlarga koʻtarilish qurilmasi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Muammoni ayting: 'Xonada konditsioner ishlamayapti'",
      sentence_with_blank: "В номере не работает ___.",
      blank_answer: "кондиционер",
      hint: "Xonani sovutuvchi qurilma",
      options: [
        "кондиционер",
        "завтрак",
        "ключ",
        "паспорт"
      ],
      target_audio_text: "В номере не работает кондиционер.",
      explanation: "‘Не работает’ — ishlamayapti yoki buzilgan."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Номер на двоих' iborasi nimani anglatadi?",
      target_audio_text: "Нам нужен номер на двоих.",
      options: [
        "Ikki kishilik xona",
        "Bitta kishilik xona",
        "Ikkinchi qavatdagi xona",
        "Ikki kunlik bron"
      ],
      correct_answer: "Ikki kishilik xona",
      explanation: "‘На двоих’ — ikki kishi uchun moʻljallangan."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ketish vaqtini soʻrang: 'Chiqib ketish vaqti soat nechada?'",
      target_audio_text: "Во сколько время выезда?",
      words_pool: [
        "Во",
        "сколько",
        "время",
        "выезда?",
        "завтрак",
        "лифт"
      ],
      correct_order: [
        "Во",
        "сколько",
        "время",
        "выезда?"
      ],
      explanation: "‘Время выезда’ — mehmonxonani boʻshatib chiqish vaqti."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Xonaga qoʻshimcha sochiq soʻrang: 'Принесите, пожалуйста, чистое ___'",
      sentence_with_blank: "Принесите, пожалуйста, чистое ___.",
      blank_answer: "полотенце",
      hint: "Yuvinishdan keyin artinadigan buyum",
      options: [
        "полотенце",
        "мыло",
        "одеяло",
        "окно"
      ],
      target_audio_text: "Принесите, пожалуйста, чистое полотенце.",
      explanation: "‘Полотенце’ — sochiq (oʻrta jins)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Mehmonxona xodimiga yaxshi xizmati uchun qanday minnatdorchilik bildiriladi?",
      target_audio_text: "Большое спасибо за помощь!",
      options: [
        "Большое спасибо за помощь!",
        "Сколько это стоит?",
        "Где мой номер?",
        "До скорой встречи"
      ],
      correct_answer: "Большое спасибо за помощь!",
      explanation: "‘Спасибо за помощь’ — yordam uchun samimiy rahmat aytish."
    }
  ]
};

export const LESSON_7_DATA: LessonPackage = {
  lesson_id: "a1_lesson_07",
  level: "A1",
  topic: "Dorixona va salomatlik",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "У меня болит голова", translation: "Boshim ogʻriyapti", audio_text: "У меня болит голова" },
    { term: "Лекарство от простуды", translation: "Shamollashga qarshi dori", audio_text: "Лекарство от простуды" },
    { term: "Как принимать?", translation: "Qanday qabul qilish kerak?", audio_text: "Как принимать?" },
    { term: "После еды", translation: "Ovqatdan keyin", audio_text: "После еды" },
    { term: "До еды", translation: "Ovqatdan oldin", audio_text: "До еды" },
    { term: "Высокая температура", translation: "Yuqori harorat (isitma)", audio_text: "Высокая температура" },
    { term: "Обезболивающее", translation: "Ogʻriq qoldiruvchi vosita", audio_text: "Обезболивающее" },
    { term: "Капли для носа", translation: "Burun tomchilari", audio_text: "Капли для носа" },
    { term: "Рецепт врача", translation: "Shifokor retsepti", audio_text: "Рецепт врача" },
    { term: "Скорая помощь", translation: "Tez tibbiy yordam", audio_text: "Скорая помощь" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Dorixonada 'Mening boshim ogʻriyapti' deb oʻz holatingizni tushuntiring:",
      target_audio_text: "У меня сильно болит голова.",
      options: [
        "У меня сильно болит голова",
        "У меня есть рецепт",
        "Где находится аптека?",
        "Дайте стакан воды"
      ],
      correct_answer: "У меня сильно болит голова",
      explanation: "‘Болит...’ — ogʻriyapti (birlikdagi tana aʼzolari uchun)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Dori soʻrang: 'Shamollashga qarshi dori bering, iltimos'",
      target_audio_text: "Дайте лекарство от простуды, пожалуйста.",
      words_pool: [
        "Дайте",
        "лекарство",
        "от",
        "простуды,",
        "пожалуйста.",
        "голова"
      ],
      correct_order: [
        "Дайте",
        "лекарство",
        "от",
        "простуды,",
        "пожалуйста."
      ],
      explanation: "‘Лекарство от простуды’ — shamollashga qarshi dori-darmon."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Dorini qachon ichish kerakligini soʻrang: 'Как ___ эти таблетки?'",
      sentence_with_blank: "Подскажите, как ___ эти таблетки?",
      blank_answer: "принимать",
      hint: "Dorini ichmoq/qabul qilmoq feʼli",
      options: [
        "принимать",
        "купить",
        "болеть",
        "носить"
      ],
      target_audio_text: "Подскажите, как принимать эти таблетки?",
      explanation: "‘Принимать таблетки’ — dori ichish/qabul qilish."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Farmatsevt 'Два раза в день после еды' dedi. Bu nima degani?",
      target_audio_text: "Два раза в день после еды.",
      options: [
        "Kuniga ikki marta ovqatdan keyin",
        "Kuniga bir marta ovqatdan oldin",
        "Uxlashdan oldin ikki tabletka",
        "Har soatda bittadan"
      ],
      correct_answer: "Kuniga ikki marta ovqatdan keyin",
      explanation: "‘Два раза в день’ — kuniga ikki marta, ‘после еды’ — ovqatdan soʻng."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Shikoyat qiling: 'Menda yuqori harorat (isitma) bor'",
      target_audio_text: "У меня высокая температура.",
      words_pool: [
        "У",
        "меня",
        "высокая",
        "температура.",
        "болит",
        "рука"
      ],
      correct_order: [
        "У",
        "меня",
        "высокая",
        "температура."
      ],
      explanation: "‘Высокая температура’ — tana haroratining koʻtarilishi (isitma)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ogʻriq qoldiruvchi soʻrang: 'Есть ли у вас хорошее ___?'",
      sentence_with_blank: "У вас есть сильное ___?",
      blank_answer: "обезболивающее",
      hint: "Ogʻriqni bartaraf qiluvchi vosita",
      options: [
        "обезболивающее",
        "простуда",
        "болезнь",
        "еда"
      ],
      target_audio_text: "У вас есть сильное обезболивающее?",
      explanation: "‘Обезболивающее’ — ogʻriq qoldiruvchi dori vositasi."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Капли для носа' dorixonada qaysi maqsadda soʻraladi?",
      target_audio_text: "Мне нужны капли для носа.",
      options: [
        "Burun oqishi/bitishiga qarshi tomchi dori",
        "Koʻz tomchisi",
        "Quloq ogʻrigʻiga dori",
        "Tomoq ogʻrigʻiga sprey"
      ],
      correct_answer: "Burun oqishi/bitishiga qarshi tomchi dori",
      explanation: "‘Капли’ — tomchilar, ‘для носа’ — burun uchun."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Shoshilinch holatda ayting: 'Tez tibbiy yordamni chaqiring!'",
      target_audio_text: "Срочно вызовите скорую помощь!",
      words_pool: [
        "Срочно",
        "вызовите",
        "скорую",
        "помощь!",
        "врач",
        "аптека"
      ],
      correct_order: [
        "Срочно",
        "вызовите",
        "скорую",
        "помощь!"
      ],
      explanation: "‘Скорая помощь’ — tez tibbiy yordam xizmati (103)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Dorixonachi soʻraydi: 'У вас есть ___ от врача?'",
      sentence_with_blank: "У вас есть ___ от врача?",
      blank_answer: "рецепт",
      hint: "Shifokorning dori yozilgan qogʻozi",
      options: [
        "рецепт",
        "чек",
        "билет",
        "паспорт"
      ],
      target_audio_text: "У вас есть рецепт от врача?",
      explanation: "‘Рецепт’ — shifokor tomonidan dori sotib olish uchun beriladigan rasmiy tavsiya."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Bemorga 'Tezroq sogʻayib keting!' deb tilak bildirish:",
      target_audio_text: "Выздоравливайте скорее!",
      options: [
        "Выздоравливайте скорее!",
        "Приятного аппетита!",
        "Счастливого пути!",
        "Добро пожаловать!"
      ],
      correct_answer: "Выздоравливайте скорее!",
      explanation: "‘Выздоравливайте!’ — kasal boʻlib qolgan kishiga sogʻlik tilash iborasi."
    }
  ]
};

export const LESSON_8_DATA: LessonPackage = {
  lesson_id: "a1_lesson_08",
  level: "A1",
  topic: "Aeroport va sayohat",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Выход на посадку", translation: "Samolyotga chiqish joyi (Gate)", audio_text: "Выход на посадку" },
    { term: "Посадочный талон", translation: "Samolyotga oʻtirish taloni", audio_text: "Посадочный талон" },
    { term: "Паспортный контроль", translation: "Pasport nazorati", audio_text: "Паспортный контроль" },
    { term: "Ручная кладь", translation: "Qoʻl yuki", audio_text: "Ручная кладь" },
    { term: "Выдача багажа", translation: "Yuk topshirish/olish joyi", audio_text: "Выдача багажа" },
    { term: "Рейс задерживается", translation: "Parvoz kechikmoqda", audio_text: "Рейс задерживается" },
    { term: "Пристегните ремни", translation: "Xavfsizlik kamarlarini taqing", audio_text: "Пристегните ремни" },
    { term: "Счастливого пути!", translation: "Oq yoʻl! Xayrli safar!", audio_text: "Счастливого пути!" },
    { term: "Таможня", translation: "Bojxona", audio_text: "Таможня" },
    { term: "Самолёт приземлился", translation: "Samolyot qoʻndi", audio_text: "Самолёт приземлился" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Aeroportda 'Samolyotga chiqish joyi qayerda?' deb soʻrang:",
      target_audio_text: "Где находится выход на посадку?",
      options: [
        "Где находится выход на посадку?",
        "Где можно получить багаж?",
        "Во сколько вылетает самолёт?",
        "Сколько стоит билет?"
      ],
      correct_answer: "Где находится выход на посадку?",
      explanation: "‘Выход на посадку’ — samolyot eshigiga eltuvchi darvoza (Gate)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Hujjat topshiring: 'Mana mening pasportim va chiptam'",
      target_audio_text: "Вот мой паспорт и билет.",
      words_pool: [
        "Вот",
        "мой",
        "паспорт",
        "и",
        "билет.",
        "багаж"
      ],
      correct_order: [
        "Вот",
        "мой",
        "паспорт",
        "и",
        "билет."
      ],
      explanation: "Roʻyxatdan oʻtishda pasport va chipta birga taqdim etiladi."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Salonga olib kiriladigan yuk haqida ayting: 'Это моя ___ кладь'",
      sentence_with_blank: "Это моя ___ кладь.",
      blank_answer: "ручная",
      hint: "Qoʻlda olib yuriladigan yuk",
      options: [
        "ручная",
        "большая",
        "тяжёлая",
        "новая"
      ],
      target_audio_text: "Это моя ручная кладь.",
      explanation: "‘Ручная кладь’ — samolyot kabinasiga oʻzingiz bilan olinadigan kichik yuk."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Ekranda 'Рейс задерживается' yozuvi paydo boʻldi. Bu nima degani?",
      target_audio_text: "Рейс задерживается на один час.",
      options: [
        "Parvoz kechikmoqda",
        "Parvoz bekor qilindi",
        "Samolyotga chiqish boshlandi",
        "Yuk topshirish joyi yopiq"
      ],
      correct_answer: "Parvoz kechikmoqda",
      explanation: "‘Задерживается’ — reja boʻyicha vaqtdan kechikyapti."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Styuardessa eʼlon qiladi: 'Xavfsizlik kamarlarini taqing'",
      target_audio_text: "Пожалуйста, пристегните ремни безопасности.",
      words_pool: [
        "Пожалуйста,",
        "пристегните",
        "ремни",
        "безопасности.",
        "откройте",
        "дверь"
      ],
      correct_order: [
        "Пожалуйста,",
        "пристегните",
        "ремни",
        "безопасности."
      ],
      explanation: "‘Пристегните ремни безопасности’ — samolyot uchish va qoʻnishida aytiladi."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Parvozdan keyin oʻz chamadoningizni qidiryapsiz: 'Где выдача ___?'",
      sentence_with_blank: "Подскажите, где выдача ___?",
      blank_answer: "багажа",
      hint: "Katta chamadonlar beriladigan joy",
      options: [
        "багажа",
        "билетов",
        "паспортов",
        "воды"
      ],
      target_audio_text: "Подскажите, где выдача багажа?",
      explanation: "‘Выдача багажа’ — yuk berish karuseli joylashgan zona."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Samolyotga oʻtirish chiptasi rus tilida nima deyiladi?",
      target_audio_text: "Предъявите ваш посадочный талон.",
      options: [
        "Посадочный талон",
        "Паспортный контроль",
        "Таможенная декларация",
        "Ручная кладь"
      ],
      correct_answer: "Посадочный талон",
      explanation: "‘Посадочный талон’ — samolyotga chiqish uchun maxsus shtrix-kodli talon."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Yoʻlovchiga tilak bildiring: 'Sizga oq yoʻl va xayrli safar!'",
      target_audio_text: "Желаю вам счастливого пути!",
      words_pool: [
        "Желаю",
        "вам",
        "счастливого",
        "пути!",
        "доброе",
        "утро"
      ],
      correct_order: [
        "Желаю",
        "вам",
        "счастливого",
        "пути!"
      ],
      explanation: "‘Счастливого пути!’ — sayohatchilarga aytiladigan ezgu oq yoʻl tilagi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Chegara tekshiruvidan oʻtish joyi: 'Пройдите на ___ контроль'",
      sentence_with_blank: "Пройдите на ___ контроль, пожалуйста.",
      blank_answer: "паспортный",
      hint: "Shaxsni tasdiqlovchi hujjat nazorati",
      options: [
        "паспортный",
        "багажный",
        "выходной",
        "быстрый"
      ],
      target_audio_text: "Пройдите на паспортный контроль, пожалуйста.",
      explanation: "‘Паспортный контроль’ — aeroportdagi pasport tekshiruvi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Uchuvchi 'Наш самолёт совершил посадку' desa, nima maʼnoni anglatadi?",
      target_audio_text: "Наш самолёт успешно совершил посадку.",
      options: [
        "Samolyotimiz muvaffaqiyatli qoʻndi",
        "Samolyot havoga koʻtarildi",
        "Samolyot kechikmoqda",
        "Havo harorati past"
      ],
      correct_answer: "Samolyotimiz muvaffaqiyatli qoʻndi",
      explanation: "‘Совершил посадку’ — manzilga qoʻndi deganidir."
    }
  ]
};

import { ALL_A2_LESSONS, ALL_B1_LESSONS } from './advancedLessons';
import { A1_UNIT_1_LESSONS } from './a1Unit1';

export const INITIAL_A1_LESSONS: LessonPackage[] = [
  LESSON_1_DATA,
  LESSON_2_DATA,
  LESSON_3_DATA,
  LESSON_4_DATA,
  LESSON_5_DATA,
  LESSON_6_DATA,
  LESSON_7_DATA,
  LESSON_8_DATA,
  // New lessons are added after the first eight, so the lessons learners have unlocked stay as they are
  ...A1_UNIT_1_LESSONS,
];

export const INITIAL_LESSONS: LessonPackage[] = [
  ...INITIAL_A1_LESSONS,
  ...ALL_A2_LESSONS,
  ...ALL_B1_LESSONS,
];

