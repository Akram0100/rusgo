import { LessonPackage } from '../types/lesson';

// A1, unit 6 "Uy va kundalik ishlar" (lessons 34-38): rooms and furniture, chores, cooking, the supermarket, relatives.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_34_DATA: LessonPackage = {
  lesson_id: "a1_lesson_34",
  level: "A1",
  topic: "Xonalar va mebel",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Спальня", translation: "Yotoqxona", audio_text: "Спальня" },
    { term: "Гостиная", translation: "Mehmonxona (zal)", audio_text: "Гостиная" },
    { term: "Диван", translation: "Divan", audio_text: "Диван" },
    { term: "Шкаф", translation: "Shkaf", audio_text: "Шкаф" },
    { term: "Кровать", translation: "Karavot", audio_text: "Кровать" },
    { term: "Стол и стулья", translation: "Stol va stullar", audio_text: "Стол и стулья" },
    { term: "Окно", translation: "Deraza", audio_text: "Окно" },
    { term: "Холодильник", translation: "Muzlatkich", audio_text: "Холодильник" },
    { term: "Телевизор", translation: "Televizor", audio_text: "Телевизор" },
    { term: "Моя комната", translation: "Mening xonam", audio_text: "Моя комната" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Это спальня' — 'спальня' qanday xona?",
      target_audio_text: "Это спальня.",
      options: ["Yotoqxona", "Oshxona", "Hammom", "Dahliz"],
      correct_answer: "Yotoqxona",
      explanation: "‘Спальня’ — yotoqxona (‘спать’ — uxlamoq soʻzidan)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Mehmonga uyni koʻrsating: 'Bu bizning zalimiz'",
      target_audio_text: "Это наша гостиная.",
      words_pool: ["Это", "наша", "гостиная.", "наш", "гостиной"],
      correct_order: ["Это", "наша", "гостиная."],
      explanation: "‘Гостиная’ — mehmonxona, zal (‘гость’ — mehmon soʻzidan)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Men divanda uxlayman'",
      sentence_with_blank: "Я сплю на ___.",
      blank_answer: "диване",
      hint: "‘На’ (…da) dan keyingi shakl",
      options: ["диване", "диван", "дивана", "диваном"],
      target_audio_text: "Я сплю на диване.",
      explanation: "‘Диван’ → ‘на диване’ — divanda (‘на’ dan keyin -е)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Одежда в шкафу' gapi nimani anglatadi?",
      target_audio_text: "Одежда в шкафу.",
      options: ["Kiyimlar shkafda", "Kiyimlar karavotda", "Kiyimlar stolda", "Kiyimlar derazada"],
      correct_answer: "Kiyimlar shkafda",
      explanation: "‘Шкаф’ — shkaf; ‘в шкафу’ — shkafda (bu soʻzda maxsus -у shakli)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Yotoqxonada katta karavot bor'",
      target_audio_text: "В спальне большая кровать.",
      accepted_orders: ["Большая кровать в спальне."],
      words_pool: ["В", "спальне", "большая", "кровать.", "большой", "спальня"],
      correct_order: ["В", "спальне", "большая", "кровать."],
      explanation: "‘Кровать’ — karavot (ayol jinsi → ‘большая’). ‘В спальне’ — yotoqxonada."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Oshxonada stol va stullar bor'",
      sentence_with_blank: "На кухне стол и ___.",
      blank_answer: "стулья",
      hint: "Koʻplik shakli",
      options: ["стулья", "стул", "стула", "стулом"],
      target_audio_text: "На кухне стол и стулья.",
      explanation: "‘Стул’ — stul, koʻplikda ‘стулья’. ‘На кухне’ — oshxonada."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Это окно' — 'окно' nima?",
      target_audio_text: "Это окно.",
      options: ["Deraza", "Eshik", "Devor", "Pol"],
      correct_answer: "Deraza",
      explanation: "‘Окно’ — deraza, ‘дверь’ — eshik, ‘стена’ — devor, ‘пол’ — pol."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Muzlatkich oshxonada'",
      target_audio_text: "Холодильник на кухне.",
      accepted_orders: ["На кухне холодильник."],
      words_pool: ["Холодильник", "на", "кухне.", "кухня", "кухню"],
      correct_order: ["Холодильник", "на", "кухне."],
      explanation: "‘Холодильник’ — muzlatkich (‘холод’ — sovuq soʻzidan)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Kechqurun biz televizor koʻramiz'",
      sentence_with_blank: "Вечером мы смотрим ___.",
      blank_answer: "телевизор",
      hint: "Shakli oʻzgarmaydi",
      options: ["телевизор", "телевизора", "телевизором", "телевизоре"],
      target_audio_text: "Вечером мы смотрим телевизор.",
      explanation: "‘Смотреть телевизор’ — televizor koʻrmoq."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Моя комната маленькая' gapi nimani anglatadi?",
      target_audio_text: "Моя комната маленькая.",
      options: ["Mening xonam kichkina", "Mening xonam katta", "Mening uyim kichkina", "Mening xonam yorugʻ"],
      correct_answer: "Mening xonam kichkina",
      explanation: "‘Комната’ — xona (ayol jinsi): ‘моя комната’. ‘Маленькая’ — kichkina."
    }
  ]
};

export const LESSON_35_DATA: LessonPackage = {
  lesson_id: "a1_lesson_35",
  level: "A1",
  topic: "Uy ishlari",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Я мою посуду", translation: "Idish yuvaman", audio_text: "Я мою посуду" },
    { term: "Я стираю одежду", translation: "Kir yuvaman", audio_text: "Я стираю одежду" },
    { term: "Стиральная машина", translation: "Kir yuvish mashinasi", audio_text: "Стиральная машина" },
    { term: "Я убираю квартиру", translation: "Kvartirani yigʻishtiraman", audio_text: "Я убираю квартиру" },
    { term: "Пылесос", translation: "Changyutgich", audio_text: "Пылесос" },
    { term: "Утюг", translation: "Dazmol", audio_text: "Утюг" },
    { term: "Вынеси мусор", translation: "Axlatni chiqar", audio_text: "Вынеси мусор" },
    { term: "Помоги мне", translation: "Menga yordam ber", audio_text: "Помоги мне" },
    { term: "Чисто", translation: "Toza", audio_text: "Чисто" },
    { term: "Грязно", translation: "Iflos", audio_text: "Грязно" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Я мою посуду' gapi nimani anglatadi?",
      target_audio_text: "Я мою посуду.",
      options: ["Idish yuvaman", "Kir yuvaman", "Pol yuvaman", "Ovqat pishiraman"],
      correct_answer: "Idish yuvaman",
      explanation: "‘Мыть’ — yuvmoq: я мою, ты моешь. ‘Посуда’ — idish-tovoq."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Men kir yuvaman'",
      target_audio_text: "Я стираю одежду.",
      accepted_orders: ["Я одежду стираю."],
      words_pool: ["Я", "стираю", "одежду.", "одежда", "стирать"],
      correct_order: ["Я", "стираю", "одежду."],
      explanation: "‘Стирать’ — kir yuvmoq: я стираю. ‘Одежда’ → ‘стираю одежду’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Bizda yangi kir yuvish mashinasi bor'",
      sentence_with_blank: "У нас новая стиральная ___.",
      blank_answer: "машина",
      hint: "Gapning egasi",
      options: ["машина", "машину", "машины", "машиной"],
      target_audio_text: "У нас новая стиральная машина.",
      explanation: "‘Стиральная машина’ — kir yuvish mashinasi."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Я убираю квартиру' gapi nimani anglatadi?",
      target_audio_text: "Я убираю квартиру.",
      options: ["Kvartirani yigʻishtiraman", "Kvartira qidiryapman", "Kvartiraga koʻchyapman", "Kvartirani ijaraga olaman"],
      correct_answer: "Kvartirani yigʻishtiraman",
      explanation: "‘Убирать’ — yigʻishtirmoq, tozalamoq: я убираю квартиру."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Soʻrang: 'Oyi, changyutgich qayerda?'",
      target_audio_text: "Мама, где пылесос?",
      accepted_orders: ["Где пылесос, мама?"],
      words_pool: ["Мама,", "где", "пылесос?", "пылесоса", "куда"],
      correct_order: ["Мама,", "где", "пылесос?"],
      explanation: "‘Пылесос’ — changyutgich (‘пыль’ — chang soʻzidan)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Dazmol qayerda? Koʻylakni dazmollashim kerak'",
      sentence_with_blank: "Где ___? Мне нужно погладить рубашку.",
      blank_answer: "утюг",
      hint: "Dazmol",
      options: ["утюг", "утюга", "утюгом", "утюгу"],
      target_audio_text: "Где утюг? Мне нужно погладить рубашку.",
      explanation: "‘Утюг’ — dazmol; ‘погладить’ — dazmollamoq."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Onangiz 'Вынеси мусор, пожалуйста' dedi. Nima qilish kerak?",
      target_audio_text: "Вынеси мусор, пожалуйста.",
      options: ["Axlatni chiqarish", "Idish yuvish", "Nonga borish", "Kir yuvish"],
      correct_answer: "Axlatni chiqarish",
      explanation: "‘Мусор’ — axlat; ‘вынести’ — olib chiqmoq: ‘вынеси’ (sen)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ukangizdan soʻrang: 'Menga yordam ber, iltimos'",
      target_audio_text: "Помоги мне, пожалуйста.",
      accepted_orders: ["Пожалуйста, помоги мне."],
      words_pool: ["Помоги", "мне,", "пожалуйста.", "помощь", "меня"],
      correct_order: ["Помоги", "мне,", "пожалуйста."],
      explanation: "‘Помоги мне’ — menga yordam ber (sen); ‘помогите’ — yordam bering (siz)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Xonada toza, hammasini yigʻishtirdim'",
      sentence_with_blank: "В комнате ___, я всё убрал.",
      blank_answer: "чисто",
      hint: "Toza",
      options: ["чисто", "чистый", "чистая", "чище"],
      target_audio_text: "В комнате чисто, я всё убрал.",
      explanation: "‘Чисто’ — toza: ‘в комнате чисто’ — xonada toza."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'На кухне грязно' gapi nimani anglatadi?",
      target_audio_text: "На кухне грязно.",
      options: ["Oshxona iflos", "Oshxona toza", "Oshxona katta", "Oshxonada issiq"],
      correct_answer: "Oshxona iflos",
      explanation: "‘Грязно’ — iflos; ‘чисто’ — toza."
    }
  ]
};

export const LESSON_36_DATA: LessonPackage = {
  lesson_id: "a1_lesson_36",
  level: "A1",
  topic: "Oshxonada ovqat tayyorlash",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Нож", translation: "Pichoq", audio_text: "Нож" },
    { term: "Кастрюля", translation: "Qozon (kastryul)", audio_text: "Кастрюля" },
    { term: "Сковорода", translation: "Tova", audio_text: "Сковорода" },
    { term: "Режь лук", translation: "Piyozni toʻgʻra", audio_text: "Режь лук" },
    { term: "Я варю суп", translation: "Shoʻrva pishiryapman", audio_text: "Я варю суп" },
    { term: "Я жарю мясо", translation: "Goʻsht qovuryapman", audio_text: "Я жарю мясо" },
    { term: "Соль и перец", translation: "Tuz va murch", audio_text: "Соль и перец" },
    { term: "Масло", translation: "Yogʻ", audio_text: "Масло" },
    { term: "Вкусно пахнет", translation: "Mazali hid kelyapti", audio_text: "Вкусно пахнет" },
    { term: "Помой руки", translation: "Qoʻlingni yuv", audio_text: "Помой руки" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Это нож' — 'нож' nima?",
      target_audio_text: "Это нож.",
      options: ["Pichoq", "Qoshiq", "Vilka", "Tova"],
      correct_answer: "Pichoq",
      explanation: "‘Нож’ — pichoq, ‘ложка’ — qoshiq, ‘вилка’ — vilka."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Soʻrang: 'Katta qozon qayerda?'",
      target_audio_text: "Где большая кастрюля?",
      words_pool: ["Где", "большая", "кастрюля?", "большой", "кастрюлю"],
      correct_order: ["Где", "большая", "кастрюля?"],
      explanation: "‘Кастрюля’ — qozon (kastryul), ayol jinsi → ‘большая’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ogohlantiring: 'Tova issiq, ehtiyot boʻl!'",
      sentence_with_blank: "___ горячая, осторожно!",
      blank_answer: "Сковорода",
      hint: "Tova (gapning egasi)",
      options: ["Сковорода", "Сковороду", "Сковороды", "Сковородой"],
      target_audio_text: "Сковорода горячая, осторожно!",
      explanation: "‘Сковорода’ — tova; ‘горячая’ — issiq (kuydiradi)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Onangiz 'Режь лук' dedi. Nima qilish kerak?",
      target_audio_text: "Режь лук.",
      options: ["Piyozni toʻgʻrash", "Piyozni qovurish", "Piyoz sotib olish", "Piyozni yuvish"],
      correct_answer: "Piyozni toʻgʻrash",
      explanation: "‘Резать’ — toʻgʻramoq, kesmoq: ‘режь’ (sen), ‘режьте’ (siz)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Oilam uchun shoʻrva pishiryapman'",
      target_audio_text: "Я варю суп для семьи.",
      accepted_orders: ["Для семьи я варю суп."],
      words_pool: ["Я", "варю", "суп", "для", "семьи.", "семья", "варить"],
      correct_order: ["Я", "варю", "суп", "для", "семьи."],
      explanation: "‘Варить’ — qaynatib pishirmoq: я варю суп. ‘Для’ — uchun."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Men tovada goʻsht qovuryapman'",
      sentence_with_blank: "Я ___ мясо на сковороде.",
      blank_answer: "жарю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["жарю", "жарит", "жаришь", "жарить"],
      target_audio_text: "Я жарю мясо на сковороде.",
      explanation: "‘Жарить’ — qovurmoq: я жарю, ты жаришь. ‘На сковороде’ — tovada."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Dasturxonda soʻradingiz: 'Tuz va murch bering'. Qaysi biri?",
      target_audio_text: "Дай, пожалуйста, соль и перец.",
      options: ["Соль и перец", "Сахар и чай", "Масло и хлеб", "Нож и вилка"],
      correct_answer: "Соль и перец",
      explanation: "‘Соль’ — tuz, ‘перец’ — murch, ‘сахар’ — shakar."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Yogʻ stolda'",
      target_audio_text: "Масло на столе.",
      accepted_orders: ["На столе масло."],
      words_pool: ["Масло", "на", "столе.", "стол", "масла"],
      correct_order: ["Масло", "на", "столе."],
      explanation: "‘Масло’ — yogʻ (sariyogʻ yoki oʻsimlik yogʻi). ‘На столе’ — stolda."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Oshxonaga kirib ayting: 'Qanday mazali hid kelyapti!'",
      sentence_with_blank: "Как вкусно ___!",
      blank_answer: "пахнет",
      hint: "Hid kelmoq",
      options: ["пахнет", "пахну", "пахнешь", "пахнуть"],
      target_audio_text: "Как вкусно пахнет!",
      explanation: "‘Пахнуть’ — hid kelmoq: ‘вкусно пахнет’ — mazali hid kelyapti."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Ovqatdan oldin onangiz 'Помой руки!' dedi. Nima qilish kerak?",
      target_audio_text: "Помой руки!",
      options: ["Qoʻlni yuvish", "Idishni yuvish", "Dasturxon yozish", "Ovqatni isitish"],
      correct_answer: "Qoʻlni yuvish",
      explanation: "‘Помыть руки’ — qoʻl yuvmoq: ‘помой’ (sen), ‘помойте’ (siz)."
    }
  ]
};

export const LESSON_37_DATA: LessonPackage = {
  lesson_id: "a1_lesson_37",
  level: "A1",
  topic: "Supermarketda",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Где молоко?", translation: "Sut qayerda?", audio_text: "Где молоко?" },
    { term: "Пачка чая", translation: "Bir quti choy", audio_text: "Пачка чая" },
    { term: "Бутылка воды", translation: "Bir shisha suv", audio_text: "Бутылка воды" },
    { term: "Яйца", translation: "Tuxumlar", audio_text: "Яйца" },
    { term: "Сыр", translation: "Pishloq", audio_text: "Сыр" },
    { term: "Тележка", translation: "Arava (supermarketda)", audio_text: "Тележка" },
    { term: "Касса самообслуживания", translation: "Oʻz-oʻziga xizmat kassasi", audio_text: "Касса самообслуживания" },
    { term: "Срок годности", translation: "Yaroqlilik muddati", audio_text: "Срок годности" },
    { term: "По акции", translation: "Aksiya boʻyicha", audio_text: "По акции" },
    { term: "Молочный отдел", translation: "Sut mahsulotlari boʻlimi", audio_text: "Молочный отдел" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Supermarketda xodimdan soʻrang: 'Sut qayerda?'",
      target_audio_text: "Где молоко?",
      options: ["Где молоко?", "Где хлеб?", "Где касса?", "Где выход?"],
      correct_answer: "Где молоко?",
      explanation: "‘Молоко’ — sut. ‘Касса’ — kassa, ‘выход’ — chiqish."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bir quti choy yuz rubl turadi'",
      target_audio_text: "Пачка чая стоит сто рублей.",
      words_pool: ["Пачка", "чая", "стоит", "сто", "рублей.", "чай", "пачку"],
      correct_order: ["Пачка", "чая", "стоит", "сто", "рублей."],
      explanation: "‘Пачка’ — quti, qadoq; undan keyin: чай → пачка чая."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Kassada ayting: 'Bir shisha suv, iltimos'",
      sentence_with_blank: "Одна ___ воды, пожалуйста.",
      blank_answer: "бутылка",
      hint: "Shisha (gapning egasi)",
      options: ["бутылка", "бутылку", "бутылки", "бутылкой"],
      target_audio_text: "Одна бутылка воды, пожалуйста.",
      explanation: "‘Бутылка воды’ — bir shisha suv (‘бутылка’ dan keyin: вода → воды)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Мне нужны яйца' — 'яйца' nima?",
      target_audio_text: "Мне нужны яйца.",
      options: ["Tuxum", "Sut", "Pishloq", "Non"],
      correct_answer: "Tuxum",
      explanation: "‘Яйцо’ — tuxum, koʻplikda ‘яйца’. ‘Десяток яиц’ — oʻnta tuxum."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Bu pishloq juda mazali'",
      target_audio_text: "Этот сыр очень вкусный.",
      words_pool: ["Этот", "сыр", "очень", "вкусный.", "эта", "вкусно"],
      correct_order: ["Этот", "сыр", "очень", "вкусный."],
      explanation: "‘Сыр’ — pishloq (erkak jinsi → ‘этот’, ‘вкусный’)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Doʻkonga kirib soʻrang: 'Arava qayerda?'",
      sentence_with_blank: "Где ___?",
      blank_answer: "тележка",
      hint: "Supermarket aravasi",
      options: ["тележка", "тележку", "тележки", "тележкой"],
      target_audio_text: "Где тележка?",
      explanation: "‘Тележка’ — supermarket aravasi; ‘корзина’ — savat."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Здесь касса самообслуживания' — bu qanday kassa?",
      target_audio_text: "Здесь касса самообслуживания.",
      options: ["Oʻzingiz toʻlaydigan kassa", "Yopiq kassa", "Qaytarish kassasi", "Telefonga pul solish joyi"],
      correct_answer: "Oʻzingiz toʻlaydigan kassa",
      explanation: "‘Самообслуживание’ — oʻz-oʻziga xizmat: mahsulotni oʻzingiz skanerlab, oʻzingiz toʻlaysiz."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Yaroqlilik muddatiga qara'",
      target_audio_text: "Посмотри срок годности.",
      words_pool: ["Посмотри", "срок", "годности.", "срока", "годность"],
      correct_order: ["Посмотри", "срок", "годности."],
      explanation: "‘Срок годности’ — yaroqlilik muddati. Sut va goʻshtda albatta qarang!"
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Bugun tovuq aksiyada'",
      sentence_with_blank: "Сегодня курица по ___.",
      blank_answer: "акции",
      hint: "‘По’ dan keyingi shakl",
      options: ["акции", "акция", "акцию", "акцией"],
      target_audio_text: "Сегодня курица по акции.",
      explanation: "‘По акции’ — aksiya boʻyicha (arzonlashtirilgan narxda)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Молочный отдел' qanday boʻlim?",
      target_audio_text: "Молочный отдел.",
      options: ["Sut mahsulotlari boʻlimi", "Goʻsht boʻlimi", "Non boʻlimi", "Meva boʻlimi"],
      correct_answer: "Sut mahsulotlari boʻlimi",
      explanation: "‘Отдел’ — boʻlim; ‘молочный’ — sut (mahsulotlari)."
    }
  ]
};

export const LESSON_38_DATA: LessonPackage = {
  lesson_id: "a1_lesson_38",
  level: "A1",
  topic: "Qarindoshlar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Бабушка и дедушка", translation: "Buvi va buva", audio_text: "Бабушка и дедушка" },
    { term: "Дядя", translation: "Amaki (togʻa)", audio_text: "Дядя" },
    { term: "Тётя", translation: "Xola (amma)", audio_text: "Тётя" },
    { term: "Двоюродный брат", translation: "Amakivachcha (togʻavachcha)", audio_text: "Двоюродный брат" },
    { term: "Сын и дочь", translation: "Oʻgʻil va qiz", audio_text: "Сын и дочь" },
    { term: "Внук", translation: "Nevara (oʻgʻil)", audio_text: "Внук" },
    { term: "Жена", translation: "Xotin (rafiqa)", audio_text: "Жена" },
    { term: "Муж", translation: "Er (turmush oʻrtogʻi)", audio_text: "Муж" },
    { term: "Я женат", translation: "Uylanganman", audio_text: "Я женат", alternatives: ["Я замужем"] },
    { term: "Родственники", translation: "Qarindoshlar", audio_text: "Родственники" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Это мои бабушка и дедушка' — ular kimlar?",
      target_audio_text: "Это мои бабушка и дедушка.",
      options: ["Buvi va buva", "Ota va ona", "Aka va opa", "Amaki va xola"],
      correct_answer: "Buvi va buva",
      explanation: "‘Бабушка’ — buvi, ‘дедушка’ — buva."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Amakim Samarqandda yashaydi'",
      target_audio_text: "Мой дядя живёт в Самарканде.",
      accepted_orders: ["Мой дядя в Самарканде живёт.", "В Самарканде живёт мой дядя."],
      words_pool: ["Мой", "дядя", "живёт", "в", "Самарканде.", "моя", "живу"],
      correct_order: ["Мой", "дядя", "живёт", "в", "Самарканде."],
      explanation: "‘Дядя’ — amaki yoki togʻa: ‘-я’ bilan tugasa ham erkak, shuning uchun ‘мой’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Xolam — shifokor'",
      sentence_with_blank: "Моя ___ — врач.",
      blank_answer: "тётя",
      hint: "Xola yoki amma",
      options: ["тётя", "тётю", "тёти", "тётей"],
      target_audio_text: "Моя тётя — врач.",
      explanation: "‘Тётя’ — xola yoki amma."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Это мой двоюродный брат' — bu kim?",
      target_audio_text: "Это мой двоюродный брат.",
      options: ["Amakivachcha (togʻavachcha)", "Tugʻishgan aka", "Kuyov", "Qoʻshni"],
      correct_answer: "Amakivachcha (togʻavachcha)",
      explanation: "‘Двоюродный брат’ — amaki, togʻa, xola yoki ammaning oʻgʻli."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Ularning oʻgʻli va qizi bor'",
      target_audio_text: "У них есть сын и дочь.",
      accepted_orders: ["У них есть дочь и сын."],
      words_pool: ["У", "них", "есть", "сын", "и", "дочь.", "сына", "дочка"],
      correct_order: ["У", "них", "есть", "сын", "и", "дочь."],
      explanation: "‘Сын’ — oʻgʻil, ‘дочь’ — qiz (farzand). ‘У них есть …’ — ularda … bor."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Bu mening nevaram Alisher'",
      sentence_with_blank: "Это мой ___ Алишер.",
      blank_answer: "внук",
      hint: "Nevara (oʻgʻil)",
      options: ["внук", "внука", "внуку", "внуком"],
      target_audio_text: "Это мой внук Алишер.",
      explanation: "‘Внук’ — nevara (oʻgʻil), ‘внучка’ — nevara (qiz)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Это моя жена' gapi nimani anglatadi?",
      target_audio_text: "Это моя жена.",
      options: ["Bu mening xotinim", "Bu mening opam", "Bu mening onam", "Bu mening qizim"],
      correct_answer: "Bu mening xotinim",
      explanation: "‘Жена’ — xotin, rafiqa; ‘муж’ — er."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Uning eri Moskvada ishlaydi'",
      target_audio_text: "Её муж работает в Москве.",
      accepted_orders: ["Её муж в Москве работает."],
      words_pool: ["Её", "муж", "работает", "в", "Москве.", "мужа", "его"],
      correct_order: ["Её", "муж", "работает", "в", "Москве."],
      explanation: "‘Муж’ — er (turmush oʻrtogʻi). ‘Её муж’ — uning (ayolning) eri."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting (erkak kishi): 'Uylanganman, ikki farzandim bor'",
      sentence_with_blank: "Я ___, у меня двое детей.",
      blank_answer: "женат",
      hint: "Erkak kishi aytadi",
      options: ["женат", "жената", "женаты", "жениться"],
      target_audio_text: "Я женат, у меня двое детей.",
      explanation: "Erkak: ‘я женат’ (uylanganman); ayol: ‘я замужем’ (turmushga chiqqanman)."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Летом приезжают родственники' — kimlar keladi?",
      target_audio_text: "Летом приезжают родственники.",
      options: ["Qarindoshlar", "Qoʻshnilar", "Doʻstlar", "Hamkasblar"],
      correct_answer: "Qarindoshlar",
      explanation: "‘Родственники’ — qarindoshlar; ‘соседи’ — qoʻshnilar."
    }
  ]
};

