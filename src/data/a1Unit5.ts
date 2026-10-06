import { LessonPackage } from '../types/lesson';

// A1, unit 5 "Asoslar" (lessons 29-33): numbers 11-100, big numbers and prices, the body, feelings, describing people.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_29_DATA: LessonPackage = {
  lesson_id: "a1_lesson_29",
  level: "A1",
  topic: "11 dan 100 gacha sonlar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Одиннадцать", translation: "Oʻn bir", audio_text: "Одиннадцать" },
    { term: "Двенадцать", translation: "Oʻn ikki", audio_text: "Двенадцать" },
    { term: "Пятнадцать", translation: "Oʻn besh", audio_text: "Пятнадцать" },
    { term: "Тридцать", translation: "Oʻttiz", audio_text: "Тридцать" },
    { term: "Мне тридцать пять лет", translation: "Men oʻttiz besh yoshdaman", audio_text: "Мне тридцать пять лет" },
    { term: "Сорок", translation: "Qirq", audio_text: "Сорок" },
    { term: "Пятьдесят", translation: "Ellik", audio_text: "Пятьдесят" },
    { term: "Сколько тебе лет?", translation: "Necha yoshdasan?", audio_text: "Сколько тебе лет?" },
    { term: "Девяносто", translation: "Toʻqson", audio_text: "Девяносто" },
    { term: "Двадцать один", translation: "Yigirma bir", audio_text: "Двадцать один" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Одиннадцать' qaysi son?",
      target_audio_text: "Одиннадцать.",
      options: ["11", "12", "15", "21"],
      correct_answer: "11",
      explanation: "11–19 sonlari ‘-надцать’ bilan tugaydi: одиннадцать (11), двенадцать (12), пятнадцать (15)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Ukam oʻn ikki yoshda'",
      target_audio_text: "Моему брату двенадцать лет.",
      words_pool: ["Моему", "брату", "двенадцать", "лет.", "брат", "года"],
      correct_order: ["Моему", "брату", "двенадцать", "лет."],
      explanation: "Yosh ‘kimga? + … лет’ qolipida aytiladi: ‘моему брату двенадцать лет’ — ukam 12 yoshda (soʻzma-soʻz: ukamga 12 yil)."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Dars 15 daqiqadan keyin'",
      sentence_with_blank: "Урок через ___ минут.",
      blank_answer: "пятнадцать",
      hint: "15",
      options: ["пятнадцать", "пятьдесят", "пять", "пятый"],
      target_audio_text: "Урок через пятнадцать минут.",
      explanation: "‘Через … минут’ — … daqiqadan keyin. 15 — пятнадцать, 50 — пятьдесят."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Тридцать' qaysi son?",
      target_audio_text: "Тридцать.",
      options: ["30", "13", "3", "300"],
      correct_answer: "30",
      explanation: "‘Тридцать’ — 30, ‘тринадцать’ — 13: ikkalasini adashtirmang."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Yoshingizni ayting: 'Men oʻttiz besh yoshdaman'",
      target_audio_text: "Мне тридцать пять лет.",
      words_pool: ["Мне", "тридцать", "пять", "лет.", "года", "я"],
      correct_order: ["Мне", "тридцать", "пять", "лет."],
      explanation: "Murakkab son ikki soʻzdan iborat: тридцать пять (35). 5 dan keyin ‘лет’."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Bu 40 rubl turadi'",
      sentence_with_blank: "Это стоит ___ рублей.",
      blank_answer: "сорок",
      hint: "40",
      options: ["сорок", "сорока", "четыреста", "четырнадцать"],
      target_audio_text: "Это стоит сорок рублей.",
      explanation: "‘Сорок’ — 40: u ‘четыре’ dan boshqacha yasaladi. 400 — четыреста, 14 — четырнадцать."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Пятьдесят' qaysi son?",
      target_audio_text: "Пятьдесят.",
      options: ["50", "15", "500", "5"],
      correct_answer: "50",
      explanation: "‘Пятьдесят’ — 50 (пять + десят). 15 — пятнадцать, 500 — пятьсот."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Doʻstingizdan soʻrang: 'Necha yoshdasan?'",
      target_audio_text: "Сколько тебе лет?",
      accepted_orders: ["Тебе сколько лет?"],
      words_pool: ["Сколько", "тебе", "лет?", "ты", "годы"],
      correct_order: ["Сколько", "тебе", "лет?"],
      explanation: "Doʻstga: ‘Сколько тебе лет?’ (sen); hurmat bilan: ‘Сколько вам лет?’ (siz)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Buvim 90 yoshda'",
      sentence_with_blank: "Моей бабушке ___ лет.",
      blank_answer: "девяносто",
      hint: "90",
      options: ["девяносто", "девятнадцать", "девять", "девятьсот"],
      target_audio_text: "Моей бабушке девяносто лет.",
      explanation: "‘Девяносто’ — 90. 19 — девятнадцать, 900 — девятьсот."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Yigirma bir' qanday aytiladi?",
      target_audio_text: "Двадцать один.",
      options: ["Двадцать один", "Двенадцать", "Одиннадцать", "Тридцать один"],
      correct_answer: "Двадцать один",
      explanation: "Murakkab sonlar: двадцать один (21), тридцать два (32), сорок пять (45)."
    }
  ]
};

export const LESSON_30_DATA: LessonPackage = {
  lesson_id: "a1_lesson_30",
  level: "A1",
  topic: "Katta sonlar va narxlar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Двести", translation: "Ikki yuz", audio_text: "Двести" },
    { term: "Пятьсот", translation: "Besh yuz", audio_text: "Пятьсот" },
    { term: "Тысяча двести", translation: "Ming ikki yuz", audio_text: "Тысяча двести" },
    { term: "Две тысячи", translation: "Ikki ming", audio_text: "Две тысячи" },
    { term: "Пять тысяч", translation: "Besh ming", audio_text: "Пять тысяч" },
    { term: "Сколько всего?", translation: "Hammasi qancha?", audio_text: "Сколько всего?" },
    { term: "Дорого", translation: "Qimmat", audio_text: "Дорого" },
    { term: "Дёшево", translation: "Arzon", audio_text: "Дёшево" },
    { term: "Скидка десять процентов", translation: "Oʻn foiz chegirma", audio_text: "Скидка десять процентов" },
    { term: "Цена", translation: "Narx", audio_text: "Цена" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Двести' qaysi son?",
      target_audio_text: "Двести.",
      options: ["200", "20", "2000", "12"],
      correct_answer: "200",
      explanation: "Yuzliklar: сто (100), двести (200), триста (300), пятьсот (500)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bu 500 rubl turadi'",
      target_audio_text: "Это стоит пятьсот рублей.",
      words_pool: ["Это", "стоит", "пятьсот", "рублей.", "рубля", "рубль"],
      correct_order: ["Это", "стоит", "пятьсот", "рублей."],
      explanation: "‘Пятьсот’ — 500. 5 va undan katta sonlardan keyin ‘рублей’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Narx yozuvini oʻqing: 'Narxi — 1200 rubl'",
      sentence_with_blank: "Цена — ___ двести рублей.",
      blank_answer: "тысяча",
      hint: "1000",
      options: ["тысяча", "тысячу", "тысячи", "тысячей"],
      target_audio_text: "Цена — тысяча двести рублей.",
      explanation: "‘Цена’ — narx. ‘Тысяча двести’ — 1200."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Две тысячи' qaysi son?",
      target_audio_text: "Две тысячи.",
      options: ["2000", "200", "1200", "20 000"],
      correct_answer: "2000",
      explanation: "2, 3, 4 dan keyin ‘тысячи’: две тысячи; 5 dan keyin ‘тысяч’: пять тысяч."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Menda besh ming rubl bor'",
      target_audio_text: "У меня есть пять тысяч рублей.",
      words_pool: ["У", "меня", "есть", "пять", "тысяч", "рублей.", "тысячи", "рубля"],
      correct_order: ["У", "меня", "есть", "пять", "тысяч", "рублей."],
      explanation: "5 dan keyin ‘тысяч’: пять тысяч рублей (5000 rubl)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Kassada soʻrang: 'Hammasi qancha?'",
      sentence_with_blank: "Сколько ___?",
      blank_answer: "всего",
      hint: "Hammasi",
      options: ["всего", "всё", "весь", "вся"],
      target_audio_text: "Сколько всего?",
      explanation: "‘Сколько всего?’ — hammasi boʻlib qancha?"
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Narx juda baland. Qanday aytasiz: 'Bu qimmat'?",
      target_audio_text: "Это дорого.",
      options: ["Это дорого.", "Это дёшево.", "Это бесплатно.", "Это вкусно."],
      correct_answer: "Это дорого.",
      explanation: "‘Дорого’ — qimmat, ‘дёшево’ — arzon, ‘бесплатно’ — tekin."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Bu yerda hamma narsa juda arzon'",
      target_audio_text: "Здесь всё очень дёшево.",
      accepted_orders: ["Всё здесь очень дёшево."],
      words_pool: ["Здесь", "всё", "очень", "дёшево.", "дешёвый", "дешевле"],
      correct_order: ["Здесь", "всё", "очень", "дёшево."],
      explanation: "‘Дёшево’ — arzon (‘дешёвый’ — arzon narsa haqida: ‘дешёвый телефон’)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Doʻkonda eʼlon: 'Bugun oʻn foiz chegirma'",
      sentence_with_blank: "Сегодня скидка ___ процентов.",
      blank_answer: "десять",
      hint: "10",
      options: ["десять", "десяти", "десятью", "десятый"],
      target_audio_text: "Сегодня скидка десять процентов.",
      explanation: "‘Скидка’ — chegirma, ‘процент’ — foiz: 5 dan keyin ‘процентов’."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Какая цена?' savoli nimani anglatadi?",
      target_audio_text: "Какая цена?",
      options: ["Narxi qancha?", "Chegirma bormi?", "Qayerda toʻlanadi?", "Bu qimmatmi?"],
      correct_answer: "Narxi qancha?",
      explanation: "‘Цена’ — narx (ayol jinsi → ‘какая цена?’)."
    }
  ]
};

export const LESSON_31_DATA: LessonPackage = {
  lesson_id: "a1_lesson_31",
  level: "A1",
  topic: "Tana aʼzolari",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Голова", translation: "Bosh", audio_text: "Голова" },
    { term: "Рука", translation: "Qoʻl", audio_text: "Рука" },
    { term: "Нога", translation: "Oyoq", audio_text: "Нога" },
    { term: "Спина", translation: "Bel (orqa)", audio_text: "Спина" },
    { term: "Глаза", translation: "Koʻzlar", audio_text: "Глаза" },
    { term: "Уши", translation: "Quloqlar", audio_text: "Уши" },
    { term: "Зуб", translation: "Tish", audio_text: "Зуб" },
    { term: "У меня болят ноги", translation: "Oyoqlarim ogʻriyapti", audio_text: "У меня болят ноги" },
    { term: "Сердце", translation: "Yurak", audio_text: "Сердце" },
    { term: "Я сломал руку", translation: "Qoʻlimni sindirib oldim", audio_text: "Я сломал руку", alternatives: ["Я сломала руку"] },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Это голова' — 'голова' tananing qaysi qismi?",
      target_audio_text: "Это голова.",
      options: ["Bosh", "Qoʻl", "Oyoq", "Bel"],
      correct_answer: "Bosh",
      explanation: "‘Голова’ — bosh."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Bu mening oʻng qoʻlim'",
      target_audio_text: "Это моя правая рука.",
      words_pool: ["Это", "моя", "правая", "рука.", "мой", "правый"],
      correct_order: ["Это", "моя", "правая", "рука."],
      explanation: "‘Рука’ — qoʻl (ayol jinsi): ‘моя правая рука’. ‘Правая’ — oʻng, ‘левая’ — chap."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Shifokorga ayting: 'Oyogʻim ogʻriyapti'",
      sentence_with_blank: "У меня болит ___.",
      blank_answer: "нога",
      hint: "Bitta oyoq",
      options: ["нога", "ногу", "ноги", "ногой"],
      target_audio_text: "У меня болит нога.",
      explanation: "‘Болит’ bitta aʼzo bilan: ‘болит нога’; koʻplik bilan ‘болят ноги’."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У меня болит спина' gapi nimani anglatadi?",
      target_audio_text: "У меня болит спина.",
      options: ["Belim ogʻriyapti", "Boshim ogʻriyapti", "Qoʻlim ogʻriyapti", "Tishim ogʻriyapti"],
      correct_answer: "Belim ogʻriyapti",
      explanation: "‘Спина’ — bel, orqa. Ogʻir yuk koʻtarganda koʻp ogʻriydi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Uning koʻzlari jigarrang'",
      target_audio_text: "У него карие глаза.",
      accepted_orders: ["Глаза у него карие."],
      words_pool: ["У", "него", "карие", "глаза.", "глаз", "карий"],
      correct_order: ["У", "него", "карие", "глаза."],
      explanation: "‘Глаза’ — koʻzlar (bitta koʻz — ‘глаз’). ‘Карие’ — jigarrang."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Yaxshi eshitmayapman, quloqlarim ogʻriyapti'",
      sentence_with_blank: "Я плохо слышу, у меня болят ___.",
      blank_answer: "уши",
      hint: "Koʻplik shakli",
      options: ["уши", "ухо", "ушей", "ушами"],
      target_audio_text: "Я плохо слышу, у меня болят уши.",
      explanation: "‘Ухо’ — quloq, koʻplikda ‘уши’. Koʻplik bilan ‘болят’."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Stomatologga ayting: 'Tishim ogʻriyapti'",
      target_audio_text: "У меня болит зуб.",
      options: ["У меня болит зуб.", "У меня болит спина.", "У меня болит рука.", "У меня болит нога."],
      correct_answer: "У меня болит зуб.",
      explanation: "‘Зуб’ — tish, koʻplikda ‘зубы’. ‘Стоматолог’ — tish shifokori."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Kun boʻyi tik turib ishladingiz. Ayting: 'Oyoqlarim ogʻriyapti'",
      target_audio_text: "У меня болят ноги.",
      accepted_orders: ["У меня ноги болят."],
      words_pool: ["У", "меня", "болят", "ноги.", "болит", "ногу"],
      correct_order: ["У", "меня", "болят", "ноги."],
      explanation: "Koʻplik: ‘ноги болят’ — oyoqlar ogʻriyapti."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Buvamning yuragi kasal'",
      sentence_with_blank: "У дедушки больное ___.",
      blank_answer: "сердце",
      hint: "Yurak",
      options: ["сердце", "сердца", "сердцу", "сердцем"],
      target_audio_text: "У дедушки больное сердце.",
      explanation: "‘Сердце’ — yurak; ‘больное’ — kasal."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Я сломал руку' gapi nimani anglatadi?",
      target_audio_text: "Я сломал руку.",
      options: ["Qoʻlimni sindirib oldim", "Qoʻlimni yuvdim", "Qoʻlim ogʻriyapti", "Qoʻlimni koʻtardim"],
      correct_answer: "Qoʻlimni sindirib oldim",
      explanation: "‘Сломать’ — sindirmoq: ‘я сломал руку’ (ayol: ‘я сломала руку’)."
    }
  ]
};

export const LESSON_32_DATA: LessonPackage = {
  lesson_id: "a1_lesson_32",
  level: "A1",
  topic: "Kayfiyat va his-tuygʻular",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Как настроение?", translation: "Kayfiyat qalay?", audio_text: "Как настроение?" },
    { term: "Я устал", translation: "Charchadim", audio_text: "Я устал", alternatives: ["Я устала"] },
    { term: "Я рад", translation: "Xursandman", audio_text: "Я рад", alternatives: ["Я рада"] },
    { term: "Мне скучно", translation: "Zerikyapman", audio_text: "Мне скучно" },
    { term: "Мне грустно", translation: "Maʼyusman", audio_text: "Мне грустно" },
    { term: "Я злюсь", translation: "Jahlim chiqyapti", audio_text: "Я злюсь" },
    { term: "Я волнуюсь", translation: "Hayajonlanyapman", audio_text: "Я волнуюсь" },
    { term: "Всё хорошо", translation: "Hammasi yaxshi", audio_text: "Всё хорошо" },
    { term: "Не волнуйтесь", translation: "Xavotir olmang", audio_text: "Не волнуйтесь" },
    { term: "Я скучаю по дому", translation: "Uyni sogʻindim", audio_text: "Я скучаю по дому" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Doʻstingiz 'Как настроение?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Как настроение?",
      options: ["Kayfiyating qalay?", "Qayerdasan?", "Nima qilyapsan?", "Necha yoshdasan?"],
      correct_answer: "Kayfiyating qalay?",
      explanation: "‘Настроение’ — kayfiyat. ‘Как настроение?’ — kayfiyat qalay?"
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting (erkak kishi): 'Ishdan keyin charchadim'",
      target_audio_text: "Я устал после работы.",
      accepted_orders: ["После работы я устал."],
      words_pool: ["Я", "устал", "после", "работы.", "работа", "устали"],
      correct_order: ["Я", "устал", "после", "работы."],
      explanation: "‘Устать’ — charchamoq: erkak — ‘я устал’, ayol — ‘я устала’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Mehmonni kutib oling (erkak kishi): 'Sizni koʻrganimdan xursandman!'",
      sentence_with_blank: "Я ___ вас видеть!",
      blank_answer: "рад",
      hint: "Erkak kishi aytadi",
      options: ["рад", "рады", "радость", "радостно"],
      target_audio_text: "Я рад вас видеть!",
      explanation: "‘Рад вас видеть’ — sizni koʻrganimdan xursandman (ayol: ‘рада’)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Мне скучно' gapi nimani anglatadi?",
      target_audio_text: "Мне скучно.",
      options: ["Zerikyapman", "Charchadim", "Xursandman", "Qornim och"],
      correct_answer: "Zerikyapman",
      explanation: "‘Мне скучно’ — zerikyapman (soʻzma-soʻz: ‘menga zerikarli’)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Oilamsiz maʼyusman'",
      target_audio_text: "Мне грустно без семьи.",
      accepted_orders: ["Без семьи мне грустно."],
      words_pool: ["Мне", "грустно", "без", "семьи.", "семья", "грустный"],
      correct_order: ["Мне", "грустно", "без", "семьи."],
      explanation: "‘Мне грустно’ — maʼyusman. ‘Без’ (…siz) dan keyin: семья → без семьи."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Bunday dema, jahlim chiqyapti!'",
      sentence_with_blank: "Не говори так, я ___!",
      blank_answer: "злюсь",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["злюсь", "злится", "злишься", "злиться"],
      target_audio_text: "Не говори так, я злюсь!",
      explanation: "‘Злиться’ — jahli chiqmoq: я злюсь, ты злишься, он злится."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Ertaga imtihon. 'Hayajonlanyapman' qanday aytiladi?",
      target_audio_text: "Завтра экзамен, я волнуюсь.",
      options: ["Я волнуюсь.", "Я злюсь.", "Мне скучно.", "Я рад."],
      correct_answer: "Я волнуюсь.",
      explanation: "‘Волноваться’ — hayajonlanmoq, xavotir olmoq: я волнуюсь."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Hamkasbingizni tinchlantiring: 'Xavotir olmang, hammasi yaxshi'",
      target_audio_text: "Не волнуйтесь, всё хорошо.",
      accepted_orders: ["Всё хорошо, не волнуйтесь."],
      words_pool: ["Не", "волнуйтесь,", "всё", "хорошо.", "волнуюсь", "хороший"],
      correct_order: ["Не", "волнуйтесь,", "всё", "хорошо."],
      explanation: "‘Не волнуйтесь’ — xavotir olmang. ‘Всё хорошо’ — hammasi yaxshi."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Uyni sogʻindim'",
      sentence_with_blank: "Я скучаю по ___.",
      blank_answer: "дому",
      hint: "‘По’ dan keyingi shakl",
      options: ["дому", "дом", "дома", "домом"],
      target_audio_text: "Я скучаю по дому.",
      explanation: "‘Скучать по …’ — …ni sogʻinmoq: по дому, по маме, по семье."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Всё хорошо' nimani anglatadi?",
      target_audio_text: "Всё хорошо.",
      options: ["Hammasi yaxshi", "Hammasi yomon", "Hammasi tayyor", "Hammasi qimmat"],
      correct_answer: "Hammasi yaxshi",
      explanation: "‘Всё’ — hammasi, ‘хорошо’ — yaxshi."
    }
  ]
};

export const LESSON_33_DATA: LessonPackage = {
  lesson_id: "a1_lesson_33",
  level: "A1",
  topic: "Odamlarni tasvirlash",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Высокий", translation: "Baland boʻyli", audio_text: "Высокий" },
    { term: "Невысокий", translation: "Past boʻyli", audio_text: "Невысокий" },
    { term: "Молодой", translation: "Yosh", audio_text: "Молодой" },
    { term: "Пожилой", translation: "Keksa (hurmat bilan)", audio_text: "Пожилой" },
    { term: "Добрый", translation: "Mehribon", audio_text: "Добрый" },
    { term: "Весёлый", translation: "Quvnoq", audio_text: "Весёлый" },
    { term: "Красивая", translation: "Chiroyli (ayol haqida)", audio_text: "Красивая" },
    { term: "Худой", translation: "Ozgʻin", audio_text: "Худой" },
    { term: "У него короткие волосы", translation: "Uning sochi kalta", audio_text: "У него короткие волосы" },
    { term: "Какой он?", translation: "U qanaqa odam?", audio_text: "Какой он?" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "'Мой брат высокий' gapi nimani anglatadi?",
      target_audio_text: "Мой брат высокий.",
      options: ["Akam baland boʻyli", "Akam yosh", "Akam mehribon", "Akam ozgʻin"],
      correct_answer: "Akam baland boʻyli",
      explanation: "‘Высокий’ — baland (boʻyli). ‘Брат’ — aka yoki uka."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting (erkak kishi): 'Men esa past boʻyliman'",
      target_audio_text: "А я невысокий.",
      words_pool: ["А", "я", "невысокий.", "низко", "высоко"],
      correct_order: ["А", "я", "невысокий."],
      explanation: "‘Невысокий’ — past boʻyli (‘не’ + ‘высокий’). ‘А’ — esa."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Otam hali yosh'",
      sentence_with_blank: "Мой отец ещё ___.",
      blank_answer: "молодой",
      hint: "‘Отец’ erkak jinsida",
      options: ["молодой", "молодая", "молодое", "молодые"],
      target_audio_text: "Мой отец ещё молодой.",
      explanation: "‘Молодой’ — yosh. ‘Отец’ erkak jinsi → ‘молодой’."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Avtobusda keksa odamga joy beramiz. Odam haqida hurmat bilan 'keksa' qanday deyiladi?",
      target_audio_text: "Пожилой человек.",
      options: ["Пожилой", "Молодой", "Высокий", "Весёлый"],
      correct_answer: "Пожилой",
      explanation: "Odam haqida hurmat bilan ‘пожилой’ deyiladi; ‘старый’ (qari, eski) odamga nisbatan qoʻpol eshitiladi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Ustozimiz juda mehribon'",
      target_audio_text: "Наш учитель очень добрый.",
      words_pool: ["Наш", "учитель", "очень", "добрый.", "добрая", "наша"],
      correct_order: ["Наш", "учитель", "очень", "добрый."],
      explanation: "‘Добрый’ — mehribon, yaxshi qalbli (ayol haqida: ‘добрая’)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Doʻstim doim quvnoq'",
      sentence_with_blank: "Мой друг всегда ___.",
      blank_answer: "весёлый",
      hint: "‘Друг’ erkak jinsida",
      options: ["весёлый", "весёлая", "весело", "веселье"],
      target_audio_text: "Мой друг всегда весёлый.",
      explanation: "‘Весёлый’ — quvnoq. ‘Всегда’ — doim."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Она очень красивая' gapi nimani anglatadi?",
      target_audio_text: "Она очень красивая.",
      options: ["U juda chiroyli", "U juda baland", "U juda yosh", "U juda mehribon"],
      correct_answer: "U juda chiroyli",
      explanation: "‘Красивая’ — chiroyli (ayol haqida); erkak haqida — ‘красивый’."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'U baland boʻyli va ozgʻin'",
      target_audio_text: "Он высокий и худой.",
      accepted_orders: ["Он худой и высокий."],
      words_pool: ["Он", "высокий", "и", "худой.", "худая", "высокая"],
      correct_order: ["Он", "высокий", "и", "худой."],
      explanation: "‘Худой’ — ozgʻin; ‘полный’ — toʻla."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Uning sochi kalta'",
      sentence_with_blank: "У него короткие ___.",
      blank_answer: "волосы",
      hint: "Soch (koʻplikda)",
      options: ["волосы", "волос", "волоса", "волосами"],
      target_audio_text: "У него короткие волосы.",
      explanation: "‘Волосы’ — soch (doim koʻplikda): ‘короткие волосы’ — kalta soch, ‘длинные’ — uzun."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Doʻstingiz yangi hamkasbingiz haqida 'Какой он?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Какой он?",
      options: ["U qanaqa odam?", "U qayerda?", "U necha yoshda?", "U kim?"],
      correct_answer: "U qanaqa odam?",
      explanation: "‘Какой он?’ — u qanaqa (odam)? Javobda sifatlar: высокий, добрый, весёлый…"
    }
  ]
};

