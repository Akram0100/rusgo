import { LessonPackage } from '../types/lesson';

/* =========================================================================
   A2 DARAJA: DAVOM ETTIRUVCHI RUS TILI DARSLARI
   ========================================================================= */

export const A2_LESSON_1: LessonPackage = {
  lesson_id: 'a2_lesson_01',
  level: 'A2',
  topic: 'Oʻtgan zamon: Kecha nima qildingiz?',
  target_language: 'ru',
  instruction_language: 'uz',
  exercises_count: 8,
  vocabulary: [
    { term: 'Вчера', translation: 'Kecha', audio_text: 'Вчера' },
    { term: 'Был, была, были', translation: 'Edi (erkak, ayol, koʻplik shakli)', audio_text: 'Был, была, были' },
    { term: 'Где вы были?', translation: 'Qayerda edingiz?', audio_text: 'Где вы были?' },
    { term: 'Я отдыхала', translation: 'Men dam oldim (ayol kishi)', audio_text: 'Я отдыхала' },
    { term: 'Что вы делали?', translation: 'Siz nima qildingiz?', audio_text: 'Что вы делали?' },
    { term: 'Мы ходили в кино', translation: 'Biz kinoga bordik', audio_text: 'Мы ходили в кино' },
    { term: 'Прошлым летом', translation: 'Oʻtgan yozda', audio_text: 'Прошлым летом' },
    { term: 'Я прочитал эту книгу', translation: 'Men bu kitobni oʻqib chiqdim', audio_text: 'Я прочитал эту книгу', alternatives: ['Я прочитала эту книгу'] },
  ],
  exercises: [
    {
      id: 1,
      type: 'multiple_choice',
      instruction: "Erkak kishi 'Kecha men ishda edim' demoqchi. Qaysi shakl toʻgʻri (был, была, были)?",
      target_audio_text: 'Вчера я был на работе.',
      options: ['Вчера я был на работе', 'Вчера я была на работе', 'Вчера я были на работе', 'Вчера я буду на работе'],
      correct_answer: 'Вчера я был на работе',
      explanation: "Erkak jinsida 'boʻlgan edi' feʼli ‘был’ shaklini oladi. Ayol jinsi uchun esa ‘была’ ishlatiladi."
    },
    {
      id: 2,
      type: 'translate_order',
      instruction: "Savolni toʻgʻri tuzing: 'Kecha kechqurun siz nima qildingiz?'",
      target_audio_text: 'Что вы делали вчера вечером?',
      accepted_orders: ['Что вы вчера вечером делали?'],
      words_pool: ['Что', 'вы', 'делали', 'вчера', 'вечером?', 'утром'],
      correct_order: ['Что', 'вы', 'делали', 'вчера', 'вечером?'],
      explanation: "‘Что вы делали...?’ — oʻtgan zamonda kishidan nima ish bilan mashgʻul boʻlganini soʻrash."
    },
    {
      id: 3,
      type: 'fill_blank',
      instruction: "Ayol kishi aytadi: 'Kecha men uyda dam oldim'",
      sentence_with_blank: 'Вчера я ___ дома.',
      blank_answer: 'отдыхала',
      hint: "Oʻtgan zamon ayol jinsi (-ла qoʻshimchasi)",
      options: ['отдыхала', 'отдыхал', 'отдыхали', 'отдыхает'],
      target_audio_text: 'Вчера я отдыхала дома.',
      explanation: "Ayol kishi soʻzlaganda oʻtgan zamon feʼli ‘-ла’ bilan tugaydi: ‘отдыхала’."
    },
    {
      id: 4,
      type: 'multiple_choice',
      instruction: "'Мы ходили в кино' jumlasi oʻzbek tilida qanday maʼno beradi?",
      target_audio_text: 'Вчера мы ходили в кино.',
      options: ['Biz kinoga bordik', 'Biz kinoga boramiz', 'Biz kinoni yoqtiramiz', 'Kinoda joy yoʻq'],
      correct_answer: 'Biz kinoga bordik',
      explanation: "‘Ходили’ — borib keldik (oʻtgan zamon koʻplik shakli)."
    },
    {
      id: 5,
      type: 'translate_order',
      instruction: "Tuzing: 'Oʻtgan yozda biz Samarqandda edik'",
      target_audio_text: 'Прошлым летом мы были в Самарканде.',
      accepted_orders: ['Мы были в Самарканде прошлым летом.', 'Мы прошлым летом были в Самарканде.'],
      words_pool: ['Прошлым', 'летом', 'мы', 'были', 'в', 'Самарканде.', 'будем'],
      correct_order: ['Прошлым', 'летом', 'мы', 'были', 'в', 'Самарканде.'],
      explanation: "‘Прошлым летом’ — oʻtgan yoz mavsumida, ‘были’ — edik."
    },
    {
      id: 6,
      type: 'fill_blank',
      instruction: "Tugallangan harakat (erkak kishi): 'Men bu kitobni oʻqib chiqdim'",
      sentence_with_blank: 'Я ___ эту книгу.',
      blank_answer: 'прочитал',
      hint: "Tugallangan oʻtgan zamon shakli",
      options: ['прочитал', 'читаю', 'буду читать', 'читать'],
      target_audio_text: 'Я прочитал эту книгу.',
      explanation: "‘Прочитал’ — kitobni boshidan oxirigacha oʻqib tamomladi."
    },
    {
      id: 7,
      type: 'multiple_choice',
      instruction: "'Где вы были вчера?' savoli nimani bildiradi?",
      target_audio_text: 'Где вы были вчера?',
      options: ['Kecha qayerda edingiz?', 'Kecha qayerga boryapsiz?', 'Siz qayerda yashaysiz?', 'Bu qayerda joylashgan?'],
      correct_answer: 'Kecha qayerda edingiz?',
      explanation: "‘Где вы были?’ — Siz qayerda boʻlgan edingiz?"
    },
    {
      id: 8,
      type: 'translate_order',
      instruction: "Tuzing: 'Ular kecha juda charchashdi'",
      target_audio_text: 'Они вчера очень устали.',
      accepted_orders: ['Вчера они очень устали.'],
      words_pool: ['Они', 'вчера', 'очень', 'устали.', 'были', 'дома'],
      correct_order: ['Они', 'вчера', 'очень', 'устали.'],
      explanation: "‘Устали’ — charchadilar (koʻplik oʻtgan zamon)."
    }
  ]
};

export const A2_LESSON_2: LessonPackage = {
  lesson_id: 'a2_lesson_02',
  level: 'A2',
  topic: 'Kelasi zamon va rejalar',
  target_language: 'ru',
  instruction_language: 'uz',
  exercises_count: 8,
  vocabulary: [
    { term: 'Завтра', translation: 'Ertaga', audio_text: 'Завтра' },
    { term: 'Я буду учить', translation: 'Men oʻrganaman (kelasi zamon)', audio_text: 'Я буду учить' },
    { term: 'Мы поедем', translation: 'Biz transportda boramiz/ketamiz', audio_text: 'Мы поедем' },
    { term: 'На выходных', translation: 'Dam olish kunlarida', audio_text: 'На выходных' },
    { term: 'На следующей неделе', translation: 'Kelasi haftada', audio_text: 'На следующей неделе' },
    { term: 'Я куплю', translation: 'Men sotib olaman (kelasi zamon)', audio_text: 'Я куплю' },
    { term: 'Важная встреча', translation: 'Muhim uchrashuv', audio_text: 'Важная встреча' },
    { term: 'Я обязательно приду', translation: 'Men albatta kelaman', audio_text: 'Я обязательно приду' },
  ],
  exercises: [
    {
      id: 1,
      type: 'multiple_choice',
      instruction: "'Ertaga nima qilasiz?' savolining ruscha shakli:",
      target_audio_text: 'Что вы будете делать завтра?',
      options: ['Что вы будете делать завтра?', 'Что вы делали вчера?', 'Где вы живёте сейчас?', 'Сколько это стоит?'],
      correct_answer: 'Что вы будете делать завтра?',
      explanation: "Kelasi zamon davomli harakatda ‘будете + feʼl infinitivi’ qoʻllaniladi."
    },
    {
      id: 2,
      type: 'translate_order',
      instruction: "Reja tuzing: 'Dam olish kunlarida biz togʻga boramiz'",
      target_audio_text: 'На выходных мы поедем в горы.',
      accepted_orders: ['Мы поедем в горы на выходных.', 'Мы на выходных поедем в горы.'],
      words_pool: ['На', 'выходных', 'мы', 'поедем', 'в', 'горы.', 'были'],
      correct_order: ['На', 'выходных', 'мы', 'поедем', 'в', 'горы.'],
      explanation: "‘Поедем’ — kelasi zamonda transportda yoʻlga chiqish."
    },
    {
      id: 3,
      type: 'fill_blank',
      instruction: "Vaʼda bering: 'Xavotir olmang, men albatta kelaman'",
      sentence_with_blank: 'Не волнуйтесь, я обязательно ___.',
      blank_answer: 'приду',
      hint: "Kelasi zamon, 1-shaxs (я)",
      options: ['приду', 'пришёл', 'пришла', 'приходить'],
      target_audio_text: 'Не волнуйтесь, я обязательно приду.',
      explanation: "‘Я приду’ — piyoda yetib kelaman degani."
    },
    {
      id: 4,
      type: 'multiple_choice',
      instruction: "'Завтра у нас будет важная встреча' gapi nimani anglatadi?",
      target_audio_text: 'Завтра у нас будет важная встреча.',
      options: [
        'Ertaga bizda muhim uchrashuv boʻladi',
        'Kecha bizda uchrashuv boʻlgan edi',
        'Biz uchrashuvga kech qolyapmiz',
        'Uchrashuv bekor qilindi'
      ],
      correct_answer: 'Ertaga bizda muhim uchrashuv boʻladi',
      explanation: "‘Будет’ — boʻladi (kelasi zamon)."
    },
    {
      id: 5,
      type: 'translate_order',
      instruction: "Tuzing: 'Kelasi haftada men yangi telefon sotib olaman'",
      target_audio_text: 'На следующей неделе я куплю новый телефон.',
      accepted_orders: ['Я куплю новый телефон на следующей неделе.'],
      words_pool: ['На', 'следующей', 'неделе', 'я', 'куплю', 'новый', 'телефон.', 'купил'],
      correct_order: ['На', 'следующей', 'неделе', 'я', 'куплю', 'новый', 'телефон.'],
      explanation: "‘Куплю’ — sotib olaman (tugallangan kelasi zamon)."
    },
    {
      id: 6,
      type: 'fill_blank',
      instruction: "Boʻsh joyni toʻldiring: 'Ertaga ertalab men rus tilini oʻrganaman'",
      sentence_with_blank: 'Завтра утром я буду ___ русский язык.',
      blank_answer: 'учить',
      hint: "Oʻrganmoq feʼlining infinitiv shakli",
      options: ['учить', 'учил', 'учу', 'выучил'],
      target_audio_text: 'Завтра утром я буду учить русский язык.',
      explanation: "‘Буду’ yordamchi feʼlidan keyin feʼl infinitivda keladi: ‘буду учить’."
    },
    {
      id: 7,
      type: 'multiple_choice',
      instruction: "'Когда вы вернётесь?' savoli qanday tarjima qilinadi?",
      target_audio_text: 'Скажите, когда вы вернётесь?',
      options: ['Qachon qaytib kelasiz?', 'Qachon ketasiz?', 'Qayerdan keldingiz?', 'Qayerda turibsiz?'],
      correct_answer: 'Qachon qaytib kelasiz?',
      explanation: "‘Вернуться’ — qaytmoq. ‘Когда вы вернётесь?’ — qachon qaytasiz?"
    },
    {
      id: 8,
      type: 'translate_order',
      instruction: "Tuzing: 'Biz kechqurun albatta qoʻngʻiroq qilamiz'",
      target_audio_text: 'Мы обязательно позвоним вечером.',
      accepted_orders: ['Мы вечером обязательно позвоним.'],
      words_pool: ['Мы', 'обязательно', 'позвоним', 'вечером.', 'утром', 'были'],
      correct_order: ['Мы', 'обязательно', 'позвоним', 'вечером.'],
      explanation: "‘Позвоним’ — telefon qilamiz."
    }
  ]
};

export const A2_LESSON_3: LessonPackage = {
  lesson_id: 'a2_lesson_03',
  level: 'A2',
  topic: 'Restoranda buyurtma va taomlar',
  target_language: 'ru',
  instruction_language: 'uz',
  exercises_count: 8,
  vocabulary: [
    { term: 'Столик на двоих', translation: 'Ikki kishilik stol', audio_text: 'Столик на двоих' },
    { term: 'Принесите мне', translation: 'Menga olib keling', audio_text: 'Принесите мне' },
    { term: 'Что вы посоветуете?', translation: 'Qaysi taomni maslahat berasiz?', audio_text: 'Что вы посоветуете?' },
    { term: 'Это блюдо', translation: 'Bu taom', audio_text: 'Это блюдо' },
    { term: 'Мясной суп', translation: 'Goʻshtli shoʻrva', audio_text: 'Мясной суп' },
    { term: 'Очень вкусно', translation: 'Juda mazali', audio_text: 'Очень вкусно' },
    { term: 'Раздельный счёт', translation: 'Alohida-alohida hisob', audio_text: 'Раздельный счёт' },
    { term: 'Приятного аппетита', translation: 'Yoqimli ishtaha', audio_text: 'Приятного аппетита' },
  ],
  exercises: [
    {
      id: 1,
      type: 'multiple_choice',
      instruction: "Restoranga kirib 'Ikki kishilik stol bormi?' deb soʻrang:",
      target_audio_text: 'У вас есть свободный столик на двоих?',
      options: [
        'У вас есть свободный столик на двоих?',
        'Где находится кухня?',
        'Сколько стоит этот ресторан?',
        'Принесите счёт прямо сейчас'
      ],
      correct_answer: 'У вас есть свободный столик на двоих?',
      explanation: "‘Свободный столик’ — boʻsh joy/stol."
    },
    {
      id: 2,
      type: 'translate_order',
      instruction: "Ofitsiantdan maslahat soʻrang: 'Siz nimani maslahat berasiz?'",
      target_audio_text: 'Подскажите, что вы посоветуете?',
      words_pool: ['Подскажите,', 'что', 'вы', 'посоветуете?', 'счёт', 'столик'],
      correct_order: ['Подскажите,', 'что', 'вы', 'посоветуете?'],
      explanation: "‘Посоветовать’ — tavsiya/maslahat bermoq."
    },
    {
      id: 3,
      type: 'fill_blank',
      instruction: "Iltimos qiling: 'Iltimos, menga koʻk choy olib keling'",
      sentence_with_blank: 'Пожалуйста, ___ мне зелёный чай.',
      blank_answer: 'принесите',
      hint: "Olib keling maʼnosidagi muloyim buyruq shakli",
      options: ['принесите', 'принесу', 'принести', 'принёс'],
      target_audio_text: 'Пожалуйста, принесите мне зелёный чай.',
      explanation: "‘Принесите’ — olib keling (ofitsiantga murojaat)."
    },
    {
      id: 4,
      type: 'multiple_choice',
      instruction: "'Всё было очень вкусно, спасибо!' gapi qanday tarjima qilinadi?",
      target_audio_text: 'Всё было очень вкусно, спасибо!',
      options: [
        'Hammasi juda mazali boʻldi, rahmat!',
        'Taomlar hali tayyor emas',
        'Hisobni alohida bering',
        'Biz yana buyurtma bermoqchimiz'
      ],
      correct_answer: 'Hammasi juda mazali boʻldi, rahmat!',
      explanation: "‘Очень вкусно’ — juda mazali."
    },
    {
      id: 5,
      type: 'translate_order',
      instruction: "Hisob soʻrang: 'Bizga alohida hisob qilib bering, iltimos'",
      target_audio_text: 'Сделайте нам раздельный счёт, пожалуйста.',
      accepted_orders: ['Пожалуйста, сделайте нам раздельный счёт.'],
      words_pool: ['Сделайте', 'нам', 'раздельный', 'счёт,', 'пожалуйста.', 'один'],
      correct_order: ['Сделайте', 'нам', 'раздельный', 'счёт,', 'пожалуйста.'],
      explanation: "‘Раздельный счёт’ — har bir kishi oʻz hisobini alohida toʻlashi."
    },
    {
      id: 6,
      type: 'fill_blank',
      instruction: "Taom tanlang: 'Men goʻshtli shoʻrva olaman'",
      sentence_with_blank: 'Я буду ___ суп.',
      blank_answer: 'мясной',
      hint: "Goʻshtli sifat shakli (erkak jinsi)",
      options: ['мясной', 'рыбный', 'сладкий', 'холодный'],
      target_audio_text: 'Я буду мясной суп.',
      explanation: "‘Мясной суп’ — goʻshtli shoʻrva."
    },
    {
      id: 7,
      type: 'multiple_choice',
      instruction: "Ovqatlanayotgan kishiga 'Yoqimli ishtaha' tilash ruscha:",
      target_audio_text: 'Приятного аппетита!',
      options: ['Приятного аппетита!', 'Будьте здоровы!', 'Счастливого пути!', 'Добро пожаловать!'],
      correct_answer: 'Приятного аппетита!',
      explanation: "‘Приятного аппетита!’ — barchaga maʼlum yoqimli ishtaha tilagi."
    },
    {
      id: 8,
      type: 'translate_order',
      instruction: "Tuzing: 'Bu taom juda achchiqmi?'",
      target_audio_text: 'Это блюдо очень острое?',
      words_pool: ['Это', 'блюдо', 'очень', 'острое?', 'вкусное', 'чай'],
      correct_order: ['Это', 'блюдо', 'очень', 'острое?'],
      explanation: "‘Острое’ — qalampirli, achchiq taom."
    }
  ]
};

/* =========================================================================
   B1 DARAJA: MUSTAQIL SOʻZLASHUV VA KASBIY MULOQOT
   ========================================================================= */

export const B1_LESSON_1: LessonPackage = {
  lesson_id: 'b1_lesson_01',
  level: 'B1',
  topic: 'Ish suhbati va karyera',
  target_language: 'ru',
  instruction_language: 'uz',
  exercises_count: 8,
  vocabulary: [
    { term: 'Собеседование', translation: 'Ishga qabul suhbati', audio_text: 'Собеседование' },
    { term: 'Опыт работы', translation: 'Ish tajribasi', audio_text: 'Опыт работы' },
    { term: 'Резюме', translation: 'Rezyume (CV)', audio_text: 'Резюме' },
    { term: 'Обязанности', translation: 'Vazifalar va majburiyatlar', audio_text: 'Обязанности' },
    { term: 'Мы сообщим вам о результатах', translation: 'Natijalar haqida sizga xabar beramiz', audio_text: 'Мы сообщим вам о результатах' },
    { term: 'График работы', translation: 'Ish jadvali/tartibi', audio_text: 'График работы' },
    { term: 'Перспективы роста', translation: 'Karyera oʻsish imkoniyatlari', audio_text: 'Перспективы роста' },
    { term: 'Я готов приступить', translation: 'Men ish boshlashga tayyorman', audio_text: 'Я готов приступить', alternatives: ['Я готова приступить'] },
  ],
  exercises: [
    {
      id: 1,
      type: 'multiple_choice',
      instruction: "Ishga qabul suhbatida (собеседование) 'Mening bu sohada 3 yillik tajribam bor' deb qanday aytiladi?",
      target_audio_text: 'У меня есть трёхлетний опыт работы в этой сфере.',
      options: [
        'У меня есть трёхлетний опыт работы в этой сфере',
        'Я никогда не работал в этой сфере',
        'Мне не нравится эта работа',
        'Какой у вас график работы?'
      ],
      correct_answer: 'У меня есть трёхлетний опыт работы в этой сфере',
      explanation: "‘Опыт работы’ — ish staji va tajribasi."
    },
    {
      id: 2,
      type: 'translate_order',
      instruction: "Tuzing: 'Mana mening yangilangan rezyumem'",
      target_audio_text: 'Вот моё обновлённое резюме.',
      words_pool: ['Вот', 'моё', 'обновлённое', 'резюме.', 'паспорт', 'чек'],
      correct_order: ['Вот', 'моё', 'обновлённое', 'резюме.'],
      explanation: "‘Резюме’ oʻrta jinsdagi soʻz boʻlgani uchun ‘моё резюме’ deyiladi."
    },
    {
      id: 3,
      type: 'fill_blank',
      instruction: "Savol bering: 'Bu lavozimda asosiy vazifalar qanday?'",
      sentence_with_blank: 'Какие основные ___ на этой должности?',
      blank_answer: 'обязанности',
      hint: "Xodimning majburiyatlari",
      options: ['обязанности', 'документы', 'проблемы', 'разговоры'],
      target_audio_text: 'Какие основные обязанности на этой должности?',
      explanation: "‘Обязанности’ — xizmat vazifalari."
    },
    {
      id: 4,
      type: 'multiple_choice',
      instruction: "'Какой у вас график работы?' savoli nimani anglatadi?",
      target_audio_text: 'Подскажите, какой у вас график работы?',
      options: [
        'Ish tartibi (soatlari va kunlari) qanday?',
        'Oylik maosh qancha beriladi?',
        'Ofis qayerda joylashgan?',
        'Qachon taʼtilga chiqish mumkin?'
      ],
      correct_answer: 'Ish tartibi (soatlari va kunlari) qanday?',
      explanation: "‘График работы’ — ish boshlanish va tugash vaqti tartibi."
    },
    {
      id: 5,
      type: 'translate_order',
      instruction: "Tayyorlikni bildiring: 'Men dushanbadan ishga kirishishga tayyorman'",
      target_audio_text: 'Я готов приступить к работе с понедельника.',
      accepted_orders: ['С понедельника я готов приступить к работе.'],
      words_pool: ['Я', 'готов', 'приступить', 'к', 'работе', 'с', 'понедельника.', 'вчера'],
      correct_order: ['Я', 'готов', 'приступить', 'к', 'работе', 'с', 'понедельника.'],
      explanation: "‘Приступить к работе’ — rasman vazifani bajarishga kirishmoq."
    },
    {
      id: 6,
      type: 'fill_blank',
      instruction: "Karyera haqida soʻrang: 'Kompaniyada oʻsish imkoniyatlari bormi?'",
      sentence_with_blank: 'Есть ли в компании перспективы ___?',
      blank_answer: 'роста',
      hint: "Oʻsish, rivojlanish soʻzi",
      options: ['роста', 'отдыха', 'выезда', 'посадки'],
      target_audio_text: 'Есть ли в компании перспективы роста?',
      explanation: "‘Перспективы карьерного роста’ — martaba oshishi istiqbollari."
    },
    {
      id: 7,
      type: 'multiple_choice',
      instruction: "Ish beruvchi 'Мы сообщим вам о результатах' dedi. Bu nima degani?",
      target_audio_text: 'Спасибо, мы сообщим вам о результатах на этой неделе.',
      options: [
        'Natijalar haqida sizga xabar beramiz',
        'Siz ishga qabul qilinmadingiz',
        'Hozirning oʻzida shartnoma imzolang',
        'Hujjatlaringizni qaytarib oling'
      ],
      correct_answer: 'Natijalar haqida sizga xabar beramiz',
      explanation: "‘Сообщим о результатах’ — suhbat xulosasini maʼlum qilamiz."
    },
    {
      id: 8,
      type: 'translate_order',
      instruction: "Minnatdorchilik bildiring: 'Qiziqarli suhbat uchun katta rahmat'",
      target_audio_text: 'Большое спасибо за интересную беседу.',
      accepted_orders: ['Спасибо большое за интересную беседу.'],
      words_pool: ['Большое', 'спасибо', 'за', 'интересную', 'беседу.', 'до', 'свидания'],
      correct_order: ['Большое', 'спасибо', 'за', 'интересную', 'беседу.'],
      explanation: "‘Интересная беседа’ — qiziqarli suhbat."
    }
  ]
};

export const B1_LESSON_2: LessonPackage = {
  lesson_id: 'b1_lesson_02',
  level: 'B1',
  topic: 'Bank va moliyaviy xizmatlar',
  target_language: 'ru',
  instruction_language: 'uz',
  exercises_count: 8,
  vocabulary: [
    { term: 'Открыть банковский счёт', translation: 'Bank hisobini ochmoq', audio_text: 'Открыть банковский счёт' },
    { term: 'Карта заблокирована', translation: 'Karta bloklangan', audio_text: 'Карта заблокирована' },
    { term: 'Перевод', translation: 'Pul oʻtkazmasi', audio_text: 'Перевод' },
    { term: 'Курс доллара', translation: 'Dollar kursi', audio_text: 'Курс доллара' },
    { term: 'Комиссия', translation: 'Xizmat haqi (komissiya)', audio_text: 'Комиссия' },
    { term: 'Банкомат', translation: 'Bankomat', audio_text: 'Банкомат' },
    { term: 'Снять наличные', translation: 'Naqd pul yechib olish', audio_text: 'Снять наличные' },
    { term: 'Подтвердите операцию', translation: 'Amaliyotni tasdiqlang', audio_text: 'Подтвердите операцию' },
  ],
  exercises: [
    {
      id: 1,
      type: 'multiple_choice',
      instruction: "Bankda (erkak kishi) 'Men bank hisobini ochmoqchi edim' deb qanday aytiladi?",
      target_audio_text: 'Я хотел бы открыть банковский счёт.',
      options: [
        'Я хотел бы открыть банковский счёт',
        'Где находится банкомат?',
        'Я потерял свой паспорт',
        'Сколько стоит этот билет?'
      ],
      correct_answer: 'Я хотел бы открыть банковский счёт',
      explanation: "‘Открыть счёт’ — bankda hisob raqam ochtirish."
    },
    {
      id: 2,
      type: 'translate_order',
      instruction: "Tuzing: 'Bankomatdan naqd pul yechib olsam boʻladimi?'",
      target_audio_text: 'Можно снять наличные в банкомате?',
      accepted_orders: ['В банкомате можно снять наличные?'],
      words_pool: ['Можно', 'снять', 'наличные', 'в', 'банкомате?', 'открыть', 'карту'],
      correct_order: ['Можно', 'снять', 'наличные', 'в', 'банкомате?'],
      explanation: "‘Снять наличные’ — kartadan naqd pul yechish."
    },
    {
      id: 3,
      type: 'fill_blank',
      instruction: "Valyuta almashtirishda soʻrang: 'Aytingchi, bugun dollar kursi qanday?'",
      sentence_with_blank: 'Подскажите, какой сегодня ___ доллара?',
      blank_answer: 'курс',
      hint: "Narx/kurs soʻzi",
      options: ['курс', 'счёт', 'банк', 'чек'],
      target_audio_text: 'Подскажите, какой сегодня курс доллара?',
      explanation: "‘Курс валюты’ — chet el pulining almashuv kursi."
    },
    {
      id: 4,
      type: 'multiple_choice',
      instruction: "'Какая комиссия за этот перевод?' savoli nimani anglatadi?",
      target_audio_text: 'Какая комиссия за этот перевод?',
      options: [
        'Bu pul oʻtkazmasi uchun qancha komissiya olinadi?',
        'Pul qachon yetib boradi?',
        'Mening kartam bloklandimi?',
        'Qayerga imzo qoʻyishim kerak?'
      ],
      correct_answer: 'Bu pul oʻtkazmasi uchun qancha komissiya olinadi?',
      explanation: "‘Комиссия за перевод’ — oʻtkazma uchun xizmat foizi."
    },
    {
      id: 5,
      type: 'translate_order',
      instruction: "Ekranda yozuv: 'Amaliyotni SMS-dagi kod bilan tasdiqlang'",
      target_audio_text: 'Подтвердите операцию кодом из СМС.',
      words_pool: ['Подтвердите', 'операцию', 'кодом', 'из', 'СМС.', 'закройте'],
      correct_order: ['Подтвердите', 'операцию', 'кодом', 'из', 'СМС.'],
      explanation: "‘Подтвердите операцию’ — amaliyotni tasdiqlash."
    },
    {
      id: 6,
      type: 'fill_blank',
      instruction: "Soʻrang: 'Bu kartaning amal qilish muddati qanday?'",
      sentence_with_blank: 'Какой ___ действия у этой карты?',
      blank_answer: 'срок',
      hint: "Vaqt, muddat soʻzi",
      options: ['срок', 'номер', 'цвет', 'курс'],
      target_audio_text: 'Какой срок действия у этой карты?',
      explanation: "‘Срок действия’ — kartaning amal qilish muddati."
    },
    {
      id: 7,
      type: 'multiple_choice',
      instruction: "'Моя карта заблокирована, помогите её разблокировать' gapi nimani anglatadi?",
      target_audio_text: 'Моя карта заблокирована, помогите её разблокировать.',
      options: [
        'Kartam bloklandi, blokdan chiqarishga yordam bering',
        'Men yangi karta olmoqchiman',
        'Kartamda pul yetarli emas',
        'PIN-kodimni oʻzgartiring'
      ],
      correct_answer: 'Kartam bloklandi, blokdan chiqarishga yordam bering',
      explanation: "‘Заблокирована’ — bloklangan holat."
    },
    {
      id: 8,
      type: 'translate_order',
      instruction: "Tuzing: 'Pul muvaffaqiyatli hisobingizga tushdi'",
      target_audio_text: 'Деньги успешно поступили на счёт.',
      words_pool: ['Деньги', 'успешно', 'поступили', 'на', 'счёт.', 'карту', 'нет'],
      correct_order: ['Деньги', 'успешно', 'поступили', 'на', 'счёт.'],
      explanation: "‘Поступили на счёт’ — hisobga oʻtkazildi/kelib tushdi."
    }
  ]
};

export const ALL_A2_LESSONS: LessonPackage[] = [
  A2_LESSON_1,
  A2_LESSON_2,
  A2_LESSON_3,
];

export const ALL_B1_LESSONS: LessonPackage[] = [
  B1_LESSON_1,
  B1_LESSON_2,
];
