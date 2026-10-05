import { LessonPackage } from '../types/lesson';

// A1, unit 2 "Kundalik hayot" (lessons 14-18): food and drink, the café, the market, clothes and colours, free time.
// Each vocabulary item appears in an exercise, so the trainer teaches it on a card right before it is tested.

export const LESSON_14_DATA: LessonPackage = {
  lesson_id: "a1_lesson_14",
  level: "A1",
  topic: "Ovqat va ichimliklar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Я хочу есть", translation: "Qornim och", audio_text: "Я хочу есть" },
    { term: "Я хочу пить", translation: "Chanqadim", audio_text: "Я хочу пить" },
    { term: "Я люблю плов", translation: "Men palovni yaxshi koʻraman", audio_text: "Я люблю плов" },
    { term: "Хлеб", translation: "Non", audio_text: "Хлеб" },
    { term: "Я не ем свинину", translation: "Men choʻchqa goʻshtini yemayman", audio_text: "Я не ем свинину" },
    { term: "Курица с рисом", translation: "Guruch bilan tovuq", audio_text: "Курица с рисом" },
    { term: "Мясо", translation: "Goʻsht", audio_text: "Мясо" },
    { term: "Фрукты и овощи", translation: "Mevalar va sabzavotlar", audio_text: "Фрукты и овощи" },
    { term: "Что на ужин?", translation: "Kechki ovqatga nima bor?", audio_text: "Что на ужин?" },
    { term: "Я пью зелёный чай", translation: "Men koʻk choy ichaman", audio_text: "Я пью зелёный чай" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Ishdan qaytdingiz, qorningiz och. Qanday aytasiz?",
      target_audio_text: "Я хочу есть.",
      options: ["Я хочу есть.", "Я хочу пить.", "Я хочу спать.", "Я хочу домой."],
      correct_answer: "Я хочу есть.",
      explanation: "‘Хотеть есть’ — qorni ochmoq (ovqat yegisi kelmoq), ‘хотеть пить’ — chanqamoq."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Chanqadim' (suv ichgim kelyapti)",
      target_audio_text: "Я хочу пить.",
      accepted_orders: ["Я пить хочу."],
      words_pool: ["Я", "хочу", "пить.", "пью", "вода"],
      correct_order: ["Я", "хочу", "пить."],
      explanation: "‘Я хочу пить’ — chanqadim. ‘Пить’ — ichmoq."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Sevimli taomingizni ayting: 'Men palovni yaxshi koʻraman'",
      sentence_with_blank: "Я люблю ___.",
      blank_answer: "плов",
      hint: "Bu soʻzning shakli oʻzgarmaydi",
      options: ["плов", "плова", "пловом", "плову"],
      target_audio_text: "Я люблю плов.",
      explanation: "‘Любить’ — yaxshi koʻrmoq. ‘Я люблю плов’ — men palovni yaxshi koʻraman."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Dasturxonga nimadir qoʻyib, 'Вот хлеб' deyishdi. 'Хлеб' nima?",
      target_audio_text: "Вот хлеб.",
      options: ["Non", "Goʻsht", "Guruch", "Choy"],
      correct_answer: "Non",
      explanation: "‘Хлеб’ — non. ‘Вот …’ — mana …"
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Men choʻchqa goʻshtini yemayman'",
      target_audio_text: "Я не ем свинину.",
      accepted_orders: ["Свинину я не ем."],
      words_pool: ["Я", "не", "ем", "свинину.", "свинина", "ешь"],
      correct_order: ["Я", "не", "ем", "свинину."],
      explanation: "‘Свинина’ — choʻchqa goʻshti: ‘я не ем свинину’ (-а → -у). ‘Есть’ — yemoq: я ем, ты ешь."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Tushlikka guruch bilan tovuq'",
      sentence_with_blank: "На обед ___ с рисом.",
      blank_answer: "курица",
      hint: "Gapning egasi, shakli oʻzgarmaydi",
      options: ["курица", "курицу", "курицы", "курицей"],
      target_audio_text: "На обед курица с рисом.",
      explanation: "‘На обед’ — tushlikka. ‘Курица с рисом’ — guruch bilan tovuq (‘с’ — bilan)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Goʻsht sotuvchisidan soʻrang: 'Bu goʻsht yangimi?'",
      target_audio_text: "Это мясо свежее?",
      options: ["Это мясо свежее?", "Это хлеб свежий?", "Сколько стоит рис?", "Где курица?"],
      correct_answer: "Это мясо свежее?",
      explanation: "‘Мясо’ — goʻsht; ‘свежий’ — yangi, toza (‘мясо’ uchun ‘свежее’)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Men mevalar va sabzavotlar sotib olaman'",
      target_audio_text: "Я покупаю фрукты и овощи.",
      accepted_orders: ["Я покупаю овощи и фрукты."],
      words_pool: ["Я", "покупаю", "фрукты", "и", "овощи.", "фрукт", "покупать"],
      correct_order: ["Я", "покупаю", "фрукты", "и", "овощи."],
      explanation: "‘Покупать’ — sotib olmoq. ‘Фрукты’ — mevalar, ‘овощи’ — sabzavotlar."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Oilangizdan soʻrang: 'Kechki ovqatga nima bor?'",
      sentence_with_blank: "Что на ___?",
      blank_answer: "ужин",
      hint: "Kechki ovqat",
      options: ["ужин", "ужина", "ужином", "ужину"],
      target_audio_text: "Что на ужин?",
      explanation: "‘Завтрак’ — nonushta, ‘обед’ — tushlik, ‘ужин’ — kechki ovqat. ‘На ужин’ — kechki ovqatga."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Men koʻk choy ichaman' gapini tanlang:",
      target_audio_text: "Я пью зелёный чай.",
      options: ["Я пью зелёный чай.", "Я пью чёрный кофе.", "Я хочу пить.", "Я люблю плов."],
      correct_answer: "Я пью зелёный чай.",
      explanation: "‘Пить’ — ichmoq: я пью, ты пьёшь. ‘Зелёный чай’ — koʻk choy."
    }
  ]
};

export const LESSON_15_DATA: LessonPackage = {
  lesson_id: "a1_lesson_15",
  level: "A1",
  topic: "Kafeda",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Мне, пожалуйста, чай", translation: "Menga choy, iltimos", audio_text: "Мне, пожалуйста, чай" },
    { term: "Что у вас есть?", translation: "Sizda nima bor?", audio_text: "Что у вас есть?" },
    { term: "Я буду суп", translation: "Men shoʻrva olaman", audio_text: "Я буду суп" },
    { term: "У вас есть халяльная еда?", translation: "Sizda halol taom bormi?", audio_text: "У вас есть халяльная еда?" },
    { term: "Здесь или с собой?", translation: "Shu yerdami yoki olib ketasizmi?", audio_text: "Здесь или с собой?" },
    { term: "С собой, пожалуйста", translation: "Olib ketaman, iltimos", audio_text: "С собой, пожалуйста" },
    { term: "Можно ещё хлеба?", translation: "Yana non olsam boʻladimi?", audio_text: "Можно ещё хлеба?" },
    { term: "Сколько с меня?", translation: "Qancha toʻlayman?", audio_text: "Сколько с меня?" },
    { term: "Можно наличными?", translation: "Naqd pul bilan toʻlasam boʻladimi?", audio_text: "Можно наличными?" },
    { term: "Спасибо, всё было вкусно", translation: "Rahmat, hammasi mazali edi", audio_text: "Спасибо, всё было вкусно" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Ofitsiant 'Что вы будете?' deb soʻradi. Javob bering: 'Menga choy, iltimos'",
      target_audio_text: "Мне, пожалуйста, чай.",
      options: ["Мне, пожалуйста, чай.", "Мне, пожалуйста, счёт.", "Где здесь туалет?", "Спасибо, не надо."],
      correct_answer: "Мне, пожалуйста, чай.",
      explanation: "‘Мне, пожалуйста, …’ — buyurtma berishning eng oddiy usuli."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ofitsiantdan soʻrang: 'Sizda nima bor?'",
      target_audio_text: "Что у вас есть?",
      accepted_orders: ["Что есть у вас?"],
      words_pool: ["Что", "у", "вас", "есть?", "нет", "вы"],
      correct_order: ["Что", "у", "вас", "есть?"],
      explanation: "‘У вас есть …?’ — sizda … bormi? ‘Что у вас есть?’ — sizda nima bor?"
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Buyurtma bering: 'Men shoʻrva olaman'",
      sentence_with_blank: "Я буду ___.",
      blank_answer: "суп",
      hint: "Bu soʻzning shakli oʻzgarmaydi",
      options: ["суп", "супа", "супом", "супу"],
      target_audio_text: "Я буду суп.",
      explanation: "Buyurtmada ‘Я буду …’ — men … olaman. ‘Суп’ — shoʻrva."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'У вас есть халяльная еда?' savoli nimani anglatadi?",
      target_audio_text: "У вас есть халяльная еда?",
      options: ["Sizda halol taom bormi?", "Sizda goʻshtli taom bormi?", "Sizda menyu bormi?", "Sizda boʻsh joy bormi?"],
      correct_answer: "Sizda halol taom bormi?",
      explanation: "‘Халяльная еда’ — halol taom. Rossiyada koʻp kafelarda ‘Халяль’ belgisi boʻladi."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Kassir soʻraydi: 'Shu yerdami yoki olib ketasizmi?'",
      target_audio_text: "Здесь или с собой?",
      accepted_orders: ["С собой или здесь?"],
      words_pool: ["Здесь", "или", "с", "собой?", "и", "вы"],
      correct_order: ["Здесь", "или", "с", "собой?"],
      explanation: "‘Здесь’ — shu yerda; ‘с собой’ — oʻzi bilan (olib ketish)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ovqatni olib keting: 'Olib ketaman, iltimos'",
      sentence_with_blank: "С ___, пожалуйста.",
      blank_answer: "собой",
      hint: "‘Oʻzim bilan’",
      options: ["собой", "себя", "себе", "сам"],
      target_audio_text: "С собой, пожалуйста.",
      explanation: "‘С собой’ — oʻzim bilan: ovqatni olib ketaman."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Stoldagi non tugadi. Yana non soʻrang:",
      target_audio_text: "Можно ещё хлеба?",
      options: ["Можно ещё хлеба?", "Можно ещё чаю?", "Можно меню?", "Можно счёт?"],
      correct_answer: "Можно ещё хлеба?",
      explanation: "‘Ещё’ — yana. ‘Хлеб’ → ‘ещё хлеба’ (yana biroz non)."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Toʻlov vaqti. Soʻrang: 'Qancha toʻlayman?'",
      target_audio_text: "Сколько с меня?",
      words_pool: ["Сколько", "с", "меня?", "мне", "стоит"],
      correct_order: ["Сколько", "с", "меня?"],
      explanation: "‘Сколько с меня?’ — qancha toʻlayman? (kafeda, taksida)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Soʻrang: 'Naqd pul bilan toʻlasam boʻladimi?'",
      sentence_with_blank: "Можно ___?",
      blank_answer: "наличными",
      hint: "Naqd pul bilan",
      options: ["наличными", "наличные", "наличных", "наличным"],
      target_audio_text: "Можно наличными?",
      explanation: "‘Наличные’ — naqd pul; ‘можно наличными?’ — naqd pul bilan toʻlasam boʻladimi?"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Ketayotganda ofitsiantga ayting: 'Rahmat, hammasi mazali edi'",
      target_audio_text: "Спасибо, всё было вкусно.",
      options: ["Спасибо, всё было вкусно.", "Спасибо, до свидания.", "Приятного аппетита!", "Сколько с меня?"],
      correct_answer: "Спасибо, всё было вкусно.",
      explanation: "‘Вкусно’ — mazali; ‘всё было вкусно’ — hammasi mazali edi."
    }
  ]
};

export const LESSON_16_DATA: LessonPackage = {
  lesson_id: "a1_lesson_16",
  level: "A1",
  topic: "Bozorda",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Почём помидоры?", translation: "Pomidor qancha?", audio_text: "Почём помидоры?" },
    { term: "Дайте килограмм яблок", translation: "Bir kilogramm olma bering", audio_text: "Дайте килограмм яблок" },
    { term: "Полкило", translation: "Yarim kilo", audio_text: "Полкило" },
    { term: "Это свежее?", translation: "Bu yangimi?", audio_text: "Это свежее?" },
    { term: "Можно подешевле?", translation: "Arzonroq boʻladimi?", audio_text: "Можно подешевле?" },
    { term: "Картошка", translation: "Kartoshka", audio_text: "Картошка" },
    { term: "Лук и морковь", translation: "Piyoz va sabzi", audio_text: "Лук и морковь" },
    { term: "Огурцы", translation: "Bodring", audio_text: "Огурцы" },
    { term: "Ещё что-нибудь?", translation: "Yana biror narsa kerakmi?", audio_text: "Ещё что-нибудь?" },
    { term: "Это всё, спасибо", translation: "Shu xolos, rahmat", audio_text: "Это всё, спасибо" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Bozorda 'Почём помидоры?' deb soʻradingiz. Bu nima degani?",
      target_audio_text: "Почём помидоры?",
      options: ["Pomidor qancha?", "Pomidor yangimi?", "Pomidor qayerda?", "Pomidor bormi?"],
      correct_answer: "Pomidor qancha?",
      explanation: "‘Почём?’ — bozorda narx soʻrashning soʻzlashuv usuli (‘Сколько стоит?’ bilan bir xil)."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Sotuvchiga ayting: 'Bir kilogramm olma bering'",
      target_audio_text: "Дайте килограмм яблок.",
      words_pool: ["Дайте", "килограмм", "яблок.", "яблоко", "яблоки"],
      correct_order: ["Дайте", "килограмм", "яблок."],
      explanation: "‘Килограмм’ dan keyin soʻz shakli oʻzgaradi: яблоко → килограмм яблок."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Yarim kilo pomidor bering, iltimos'",
      sentence_with_blank: "Дайте, пожалуйста, ___ помидоров.",
      blank_answer: "полкило",
      hint: "Yarim kilogramm",
      options: ["полкило", "полкила", "полкилу", "полкиле"],
      target_audio_text: "Дайте, пожалуйста, полкило помидоров.",
      explanation: "‘Полкило’ — yarim kilogramm (shakli oʻzgarmaydi)."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "Sotuvchidan mahsulot yangi ekanini soʻrang:",
      target_audio_text: "Это свежее?",
      options: ["Это свежее?", "Это дорого?", "Это всё?", "Это ваше?"],
      correct_answer: "Это свежее?",
      explanation: "‘Свежий’ — yangi, toza (meva, sabzavot, goʻsht haqida)."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Savdolashing: 'Arzonroq boʻladimi?'",
      target_audio_text: "А можно подешевле?",
      words_pool: ["А", "можно", "подешевле?", "дорого", "дешёвый"],
      correct_order: ["А", "можно", "подешевле?"],
      explanation: "Bozorda savdolashish: ‘Можно подешевле?’ — arzonroq qilib bera olasizmi?"
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Bugun kartoshka arzon'",
      sentence_with_blank: "___ сегодня дешёвая.",
      blank_answer: "Картошка",
      hint: "Gapning egasi",
      options: ["Картошка", "Картошку", "Картошки", "Картошкой"],
      target_audio_text: "Картошка сегодня дешёвая.",
      explanation: "‘Картошка’ — kartoshka; ‘дешёвый’ — arzon (‘картошка’ uchun ‘дешёвая’)."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Palov uchun nima kerak? 'Мне нужны …'",
      target_audio_text: "Мне нужны лук и морковь.",
      options: ["Лук и морковь", "Огурцы и помидоры", "Яблоки и груши", "Хлеб и чай"],
      correct_answer: "Лук и морковь",
      explanation: "Palov uchun: ‘лук’ — piyoz, ‘морковь’ — sabzi, ‘рис’ — guruch, ‘мясо’ — goʻsht."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Ayting: 'Bodringlar juda yangi'",
      target_audio_text: "Огурцы очень свежие.",
      words_pool: ["Огурцы", "очень", "свежие.", "свежий", "огурец"],
      correct_order: ["Огурцы", "очень", "свежие."],
      explanation: "‘Огурец’ — bodring, koʻplikda ‘огурцы’. ‘Свежие’ — yangi (koʻplik)."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Sotuvchi soʻraydi: 'Yana biror narsa kerakmi?'",
      sentence_with_blank: "Ещё ___?",
      blank_answer: "что-нибудь",
      hint: "Biror narsa",
      options: ["что-нибудь", "кто-нибудь", "где-нибудь", "когда-нибудь"],
      target_audio_text: "Ещё что-нибудь?",
      explanation: "‘Что-нибудь’ — biror narsa. ‘Ещё что-нибудь?’ — yana biror narsa kerakmi?"
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Sotuvchi 'Ещё что-нибудь?' deb soʻradi. Javob bering: 'Shu xolos, rahmat'",
      target_audio_text: "Это всё, спасибо.",
      options: ["Это всё, спасибо.", "Это свежее?", "Можно подешевле?", "Дайте килограмм яблок."],
      correct_answer: "Это всё, спасибо.",
      explanation: "‘Это всё’ — shu xolos, boshqa narsa kerak emas."
    }
  ]
};

export const LESSON_17_DATA: LessonPackage = {
  lesson_id: "a1_lesson_17",
  level: "A1",
  topic: "Kiyim va ranglar",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Какого цвета?", translation: "Qanaqa rangda?", audio_text: "Какого цвета?" },
    { term: "Красная куртка", translation: "Qizil kurtka", audio_text: "Красная куртка" },
    { term: "Чёрные брюки", translation: "Qora shim", audio_text: "Чёрные брюки" },
    { term: "Белая рубашка", translation: "Oq koʻylak", audio_text: "Белая рубашка" },
    { term: "Синие джинсы", translation: "Koʻk jinsi shim", audio_text: "Синие джинсы" },
    { term: "Тёплая шапка", translation: "Issiq telpak", audio_text: "Тёплая шапка" },
    { term: "Зимние ботинки", translation: "Qishki botinka", audio_text: "Зимние ботинки" },
    { term: "Мне нравится этот цвет", translation: "Menga bu rang yoqadi", audio_text: "Мне нравится этот цвет" },
    { term: "Жёлтый", translation: "Sariq", audio_text: "Жёлтый" },
    { term: "Надень куртку", translation: "Kurtkangni kiy", audio_text: "Надень куртку" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Hamkasbingiz 'Какого цвета ваша куртка?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Какого цвета ваша куртка?",
      options: ["Kurtkangiz qanaqa rangda?", "Kurtkangiz qancha turadi?", "Kurtkangiz qanaqa oʻlchamda?", "Kurtkangizni qayerdan oldingiz?"],
      correct_answer: "Kurtkangiz qanaqa rangda?",
      explanation: "‘Какого цвета?’ — qanaqa rangda? ‘Цвет’ — rang."
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Mening qizil kurtkam bor'",
      target_audio_text: "У меня красная куртка.",
      words_pool: ["У", "меня", "красная", "куртка.", "красный", "куртку"],
      correct_order: ["У", "меня", "красная", "куртка."],
      explanation: "Sifat otga moslashadi: ‘куртка’ (ayol jinsi) — ‘красная куртка’."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Men qora shim kiyaman'",
      sentence_with_blank: "Я ношу ___ брюки.",
      blank_answer: "чёрные",
      hint: "‘Брюки’ doim koʻplikda",
      options: ["чёрные", "чёрный", "чёрная", "чёрное"],
      target_audio_text: "Я ношу чёрные брюки.",
      explanation: "‘Брюки’ doim koʻplikda, shuning uchun ‘чёрные брюки’. ‘Носить’ — kiyib yurmoq."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Это белая рубашка' gapi nimani anglatadi?",
      target_audio_text: "Это белая рубашка.",
      options: ["Bu oq koʻylak", "Bu qora koʻylak", "Bu oq shim", "Bu koʻk koʻylak"],
      correct_answer: "Bu oq koʻylak",
      explanation: "‘Белый’ — oq; ‘рубашка’ — koʻylak (ayol jinsi): ‘белая рубашка’."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Men koʻk jinsi shimni yaxshi koʻraman'",
      target_audio_text: "Я люблю синие джинсы.",
      words_pool: ["Я", "люблю", "синие", "джинсы.", "синий", "джинс"],
      correct_order: ["Я", "люблю", "синие", "джинсы."],
      explanation: "‘Джинсы’ — doim koʻplikda: ‘синие джинсы’. ‘Синий’ — koʻk."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Qishda issiq telpak kerak'",
      sentence_with_blank: "Зимой нужна ___ шапка.",
      blank_answer: "тёплая",
      hint: "‘Шапка’ ayol jinsida",
      options: ["тёплая", "тёплый", "тёплое", "тёплые"],
      target_audio_text: "Зимой нужна тёплая шапка.",
      explanation: "‘Шапка’ — telpak (ayol jinsi) → ‘тёплая шапка’. ‘Нужна’ — kerak."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "Qish keldi. 'Мне нужны …' — sizga nima kerak?",
      target_audio_text: "Мне нужны зимние ботинки.",
      options: ["Зимние ботинки", "Летние шорты", "Белая рубашка", "Синие джинсы"],
      correct_answer: "Зимние ботинки",
      explanation: "‘Зимний’ — qishki; ‘ботинки’ — botinka (koʻplikda): ‘зимние ботинки’."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Doʻkonda ayting: 'Menga bu rang yoqadi'",
      target_audio_text: "Мне нравится этот цвет.",
      accepted_orders: ["Этот цвет мне нравится."],
      words_pool: ["Мне", "нравится", "этот", "цвет.", "эта", "нравятся"],
      correct_order: ["Мне", "нравится", "этот", "цвет."],
      explanation: "‘Мне нравится …’ — menga … yoqadi. ‘Цвет’ erkak jinsida: ‘этот цвет’."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Bu banan sariq'",
      sentence_with_blank: "Этот банан ___.",
      blank_answer: "жёлтый",
      hint: "‘Банан’ erkak jinsida",
      options: ["жёлтый", "жёлтая", "жёлтое", "жёлтые"],
      target_audio_text: "Этот банан жёлтый.",
      explanation: "‘Жёлтый’ — sariq. ‘Банан’ erkak jinsida, shuning uchun ‘жёлтый’."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "Koʻchada sovuq. Ukangizga ayting: 'Kurtkangni kiy, sovuq'",
      target_audio_text: "Надень куртку, холодно.",
      options: ["Надень куртку, холодно.", "Сними куртку, жарко.", "Купи куртку, дёшево.", "Это моя куртка."],
      correct_answer: "Надень куртку, холодно.",
      explanation: "‘Надеть’ — kiymoq: ‘надень’ (sen), ‘наденьте’ (siz). ‘Снять’ — yechmoq."
    }
  ]
};

export const LESSON_18_DATA: LessonPackage = {
  lesson_id: "a1_lesson_18",
  level: "A1",
  topic: "Boʻsh vaqt va xobbi",
  target_language: "ru",
  instruction_language: "uz",
  exercises_count: 10,
  vocabulary: [
    { term: "Что вы делаете в свободное время?", translation: "Boʻsh vaqtingizda nima qilasiz?", audio_text: "Что вы делаете в свободное время?" },
    { term: "Я люблю играть в футбол", translation: "Men futbol oʻynashni yaxshi koʻraman", audio_text: "Я люблю играть в футбол" },
    { term: "Я читаю книги", translation: "Men kitob oʻqiyman", audio_text: "Я читаю книги" },
    { term: "Я смотрю фильмы", translation: "Men film koʻraman", audio_text: "Я смотрю фильмы" },
    { term: "Я слушаю музыку", translation: "Men musiqa tinglayman", audio_text: "Я слушаю музыку" },
    { term: "Я хожу в спортзал", translation: "Men sport zaliga qatnayman", audio_text: "Я хожу в спортзал" },
    { term: "Я готовлю плов", translation: "Men palov pishiraman", audio_text: "Я готовлю плов" },
    { term: "Давай погуляем", translation: "Yur, sayr qilaylik", audio_text: "Давай погуляем" },
    { term: "Мне нравится гулять", translation: "Menga sayr qilish yoqadi", audio_text: "Мне нравится гулять" },
    { term: "Я играю на дутаре", translation: "Men dutor chalaman", audio_text: "Я играю на дутаре" },
  ],
  exercises: [
    {
      id: 1,
      type: "multiple_choice",
      instruction: "Yangi doʻstingiz 'Что вы делаете в свободное время?' deb soʻradi. Bu qanday savol?",
      target_audio_text: "Что вы делаете в свободное время?",
      options: ["Boʻsh vaqtingizda nima qilasiz?", "Qayerda ishlaysiz?", "Soat necha?", "Bugun qaysi kun?"],
      correct_answer: "Boʻsh vaqtingizda nima qilasiz?",
      explanation: "‘Свободное время’ — boʻsh vaqt. ‘Что вы делаете?’ — nima qilasiz?"
    },
    {
      id: 2,
      type: "translate_order",
      instruction: "Ayting: 'Men futbol oʻynashni yaxshi koʻraman'",
      target_audio_text: "Я люблю играть в футбол.",
      accepted_orders: ["Я люблю в футбол играть."],
      words_pool: ["Я", "люблю", "играть", "в", "футбол.", "на", "футбола"],
      correct_order: ["Я", "люблю", "играть", "в", "футбол."],
      explanation: "Sport oʻyinlari bilan ‘играть в …’: в футбол, в шахматы."
    },
    {
      id: 3,
      type: "fill_blank",
      instruction: "Ayting: 'Men kitob oʻqiyman'",
      sentence_with_blank: "Я ___ книги.",
      blank_answer: "читаю",
      hint: "‘Я’ bilan keladigan shakl",
      options: ["читаю", "читает", "читаешь", "читать"],
      target_audio_text: "Я читаю книги.",
      explanation: "‘Читать’ — oʻqimoq: я читаю, ты читаешь, он читает."
    },
    {
      id: 4,
      type: "multiple_choice",
      instruction: "'Вечером я смотрю фильмы' gapi nimani anglatadi?",
      target_audio_text: "Вечером я смотрю фильмы.",
      options: ["Kechqurun men film koʻraman", "Kechqurun men kitob oʻqiyman", "Kechqurun men musiqa tinglayman", "Kechqurun men futbol oʻynayman"],
      correct_answer: "Kechqurun men film koʻraman",
      explanation: "‘Смотреть’ — koʻrmoq: ‘я смотрю фильмы’ — men film koʻraman."
    },
    {
      id: 5,
      type: "translate_order",
      instruction: "Ayting: 'Men musiqa tinglayman'",
      target_audio_text: "Я слушаю музыку.",
      accepted_orders: ["Я музыку слушаю."],
      words_pool: ["Я", "слушаю", "музыку.", "музыка", "слушать"],
      correct_order: ["Я", "слушаю", "музыку."],
      explanation: "‘Слушать’ — tinglamoq. ‘Музыка’ → ‘слушаю музыку’ (-а → -у)."
    },
    {
      id: 6,
      type: "fill_blank",
      instruction: "Ayting: 'Haftasiga uch marta sport zaliga boraman'",
      sentence_with_blank: "Три раза в неделю я хожу в ___.",
      blank_answer: "спортзал",
      hint: "Qayerga? — shakli oʻzgarmaydi",
      options: ["спортзал", "спортзале", "спортзала", "спортзалом"],
      target_audio_text: "Три раза в неделю я хожу в спортзал.",
      explanation: "‘Ходить в …’ — muntazam qatnamoq. Qayerga? — ‘в спортзал’; qayerda? — ‘в спортзале’."
    },
    {
      id: 7,
      type: "multiple_choice",
      instruction: "'Yakshanba kuni men palov pishiraman' gapini tanlang:",
      target_audio_text: "В воскресенье я готовлю плов.",
      options: ["В воскресенье я готовлю плов.", "В воскресенье я ем плов.", "В воскресенье я покупаю плов.", "В субботу я готовлю суп."],
      correct_answer: "В воскресенье я готовлю плов.",
      explanation: "‘Готовить’ — ovqat pishirmoq: я готовлю, ты готовишь."
    },
    {
      id: 8,
      type: "translate_order",
      instruction: "Doʻstingizga taklif qiling: 'Yur, parkda sayr qilaylik'",
      target_audio_text: "Давай погуляем в парке.",
      accepted_orders: ["Давай в парке погуляем."],
      words_pool: ["Давай", "погуляем", "в", "парке.", "гулять", "парк"],
      correct_order: ["Давай", "погуляем", "в", "парке."],
      explanation: "‘Давай …’ — yur, …-aylik (doʻstga taklif). ‘В парке’ — parkda."
    },
    {
      id: 9,
      type: "fill_blank",
      instruction: "Ayting: 'Menga sayr qilish yoqadi'",
      sentence_with_blank: "Мне нравится ___.",
      blank_answer: "гулять",
      hint: "Feʼlning lugʻat shakli",
      options: ["гулять", "гуляю", "гуляет", "гуляем"],
      target_audio_text: "Мне нравится гулять.",
      explanation: "‘Мне нравится’ + feʼlning lugʻat shakli: ‘мне нравится гулять’ — menga sayr qilish yoqadi."
    },
    {
      id: 10,
      type: "multiple_choice",
      instruction: "'Men dutor chalaman' gapini tanlang:",
      target_audio_text: "Я играю на дутаре.",
      options: ["Я играю на дутаре.", "Я играю в футбол.", "Я слушаю дутар.", "Я покупаю дутар."],
      correct_answer: "Я играю на дутаре.",
      explanation: "Cholgʻu asboblari bilan ‘играть на …’: на дутаре, на гитаре. Sport bilan esa ‘играть в …’."
    }
  ]
};

