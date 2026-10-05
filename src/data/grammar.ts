export interface GrammarExample {
  ru: string;
  uz: string;
  audio_text: string;
  highlight?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  topicUz: string;
  icon: string;
  level: string;
  summary: string;
  sections: {
    heading: string;
    explanation: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    examples: GrammarExample[];
  }[];
}

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'gender',
    title: 'Род имён существительных (Otlarning jinsi)',
    topicUz: 'Rus tilida 3 ta jins: Erkak (Мужской), Ayol (Женский) va Oʻrta (Средний)',
    icon: '🚻',
    level: 'A1 Asos',
    summary: 'Oʻzbek tilida otlarning jinsi yoʻq, ammo rus tilida har bir ot erkak, ayol yoki oʻrta jinsda boʻladi. Koʻpincha buni soʻzning oxirgi harfiga qarab aniqlash mumkin.',
    sections: [
      {
        heading: '1. Soʻz oxirgi harfiga qarab jinsni aniqlash qoidasi',
        explanation: 'Soʻz qaysi harf bilan tugashiga eʼtibor bering:',
        table: {
          headers: ['Jins (Род)', 'Olmosh', 'Tugash harfi', 'Misollar'],
          rows: [
            ['Мужской (Erkak)', 'Он (u)', 'Undosh harf yoki -й', 'брат, стол, чай, город'],
            ['Женский (Ayol)', 'Она (u)', '-а yoki -я', 'мама, сестра, семья, книга'],
            ['Средний (Oʻrta)', 'Оно (u)', '-о yoki -е', 'окно, море, письмо, молоко'],
          ],
        },
        examples: [
          { ru: 'Это мой брат. Он студент.', uz: 'Bu mening akam. U talaba.', audio_text: 'Это мой брат. Он студент.' },
          { ru: 'Это моя сестра. Она врач.', uz: 'Bu mening opam. U shifokor.', audio_text: 'Это моя сестра. Она врач.' },
          { ru: 'Это окно. Оно большое.', uz: 'Bu deraza. U katta.', audio_text: 'Это окно. Оно большое.' },
        ],
      },
      {
        heading: '2. Muhim istisno: Erkak kishini bildiruvchi -а/-я soʻzlar',
        explanation: 'Oxiri -а yoki -я bilan tugasa ham, erkak kishini bildiradigan soʻz erkak jinsida (мужской род) boʻladi:',
        examples: [
          { ru: 'Мой папа', uz: 'Mening dadam (erkak jinsi)', audio_text: 'Мой папа' },
          { ru: 'Мой дедушка', uz: 'Mening bobom (erkak jinsi)', audio_text: 'Мой дедушка' },
          { ru: 'Мой дядя', uz: 'Mening amakim / togʻam (erkak jinsi)', audio_text: 'Мой дядя' },
        ],
      },
      {
        heading: '3. ‘-ь’ bilan tugaydigan soʻzlar',
        explanation: 'Yumshatish belgisi (ь) bilan tugaydigan soʻz erkak jinsida ham, ayol jinsida ham boʻlishi mumkin, shuning uchun uni jinsi bilan birga yodlang:',
        examples: [
          { ru: 'Новый день', uz: 'Yangi kun (erkak jinsi)', audio_text: 'Новый день' },
          { ru: 'Большая кровать', uz: 'Katta karavot (ayol jinsi)', audio_text: 'Большая кровать' },
        ],
      },
    ],
  },
  {
    id: 'possessive',
    title: 'Притяжательные местоимения (Egalik olmoshlari)',
    topicUz: 'Mening, sening, bizning, sizning olmoshlari',
    icon: '🏷️',
    level: 'A1 Asos',
    summary: 'Rus tilida egalik olmoshlari oʻzi bogʻlanib kelayotgan soʻzning jinsiga qarab oʻzgaradi.',
    sections: [
      {
        heading: 'Olmoshlarning rodlar boʻyicha jadvali',
        explanation: 'Agar ot ayol jinsida boʻlsa — ‘моя’, erkak jinsida boʻlsa — ‘мой’, oʻrta jinsda boʻlsa — ‘моё’ ishlatiladi:',
        table: {
          headers: ['Egalik', 'Мужской (Он)', 'Женский (Она)', 'Средний (Оно)', 'Koʻplik (Они)'],
          rows: [
            ['Mening', 'Мой брат', 'Моя сестра', 'Моё окно', 'Мои друзья'],
            ['Sening', 'Твой друг', 'Твоя подруга', 'Твоё дело', 'Твои книги'],
            ['Bizning', 'Наш дом', 'Наша улица', 'Наше кафе', 'Наши планы'],
            ['Sizning', 'Ваш билет', 'Ваша бронь', 'Ваше место', 'Ваши паспорта'],
          ],
        },
        examples: [
          { ru: 'Это мой паспорт, а это моя виза.', uz: 'Bu mening pasportim, bu esa mening vizam.', audio_text: 'Это мой паспорт, а это моя виза.' },
          { ru: 'Как ваше имя?', uz: 'Sizning ismingiz nima? (Имя - oʻrta jins)', audio_text: 'Как ваше имя?' },
          { ru: 'Где ваши вещи?', uz: 'Sizning narsalaringiz qayerda?', audio_text: 'Где ваши вещи?' },
        ],
      },
    ],
  },
  {
    id: 'prepositional',
    title: 'Предложный падеж: Где? (Qayerda?)',
    topicUz: 'Shahar, bino va joy nomlariga -е qoʻshimchasi',
    icon: '📍',
    level: 'A1/A2',
    summary: '‘Qayerda?’ (Где?) savoliga javob berayotganda otlarga odatda ‘-е’ qoʻshimchasi qoʻshiladi va ‘в’ yoki ‘на’ predlogi qoʻyiladi.',
    sections: [
      {
        heading: 'Joy nomlariga -е qoʻshilishi qoidasi',
        explanation: 'Aksariyat shahar va joy nomlarining oxiriga ‘-е’ qoʻshiladi:',
        table: {
          headers: ['Dastlabki soʻz', 'Предложный падеж (Где?)', 'Oʻzbekcha maʼnosi'],
          rows: [
            ['Ташкент', 'в Ташкенте', 'Toshkentda'],
            ['Самарканд', 'в Самарканде', 'Samarqandda'],
            ['Москва', 'в Москве', 'Moskvada'],
            ['Город', 'в городе', 'Shaharda'],
            ['Гостиница', 'в гостинице', 'Mehmonxonada'],
            ['Аптека', 'в аптеке', 'Dorixonada'],
          ],
        },
        examples: [
          { ru: 'Я живу в Ташкенте.', uz: 'Men Toshkentda yashayman.', audio_text: 'Я живу в Ташкенте.' },
          { ru: 'Мы сейчас в гостинице.', uz: 'Biz hozir mehmonxonadamiz.', audio_text: 'Мы сейчас в гостинице.' },
          { ru: 'Метро находится в центре.', uz: 'Metro markazda joylashgan.', audio_text: 'Метро находится в центре.' },
        ],
      },
      {
        heading: '‘В’ va ‘НА’ predloglarining farqi',
        explanation: 'Bino yoki xona ichida odatda ‘в’, koʻcha, maydon va ochiq joylarda ‘на’ ishlatiladi. Ayrim soʻzlar bilan doim ‘на’ keladi (на вокзале, на работе, на почте), shuning uchun ularni birga yodlang:',
        examples: [
          { ru: 'в кафе / в магазине / в комнате', uz: 'kafe ichida / doʻkonda / xonada', audio_text: 'в кафе, в магазине, в комнате' },
          { ru: 'на улице / на вокзале / на площади', uz: 'koʻchada / vokzalda / maydonda', audio_text: 'на улице, на вокзале, на площади' },
        ],
      },
    ],
  },
  {
    id: 'pain',
    title: 'Болит vs Болят (Sogʻliq va ogʻriq)',
    topicUz: 'Birlik va koʻplikdagi ogʻriqni ifodalash',
    icon: '💊',
    level: 'A1/A2',
    summary: 'Agar bitta aʼzo ogʻriyotgan boʻlsa ‘болит’, bir nechta aʼzo boʻlsa ‘болят’ soʻzi qoʻllaniladi.',
    sections: [
      {
        heading: '‘У меня болит...’ (Birlik)',
        explanation: 'Faqat bitta tana aʼzosi ogʻriganda ishlatiladi:',
        examples: [
          { ru: 'У меня болит голова.', uz: 'Boshim ogʻriyapti.', audio_text: 'У меня болит голова.' },
          { ru: 'У меня болит зуб.', uz: 'Tishim ogʻriyapti.', audio_text: 'У меня болит зуб.' },
          { ru: 'У меня болит горло.', uz: 'Tomogʻim ogʻriyapti.', audio_text: 'У меня болит горло.' },
          { ru: 'У меня болит живот.', uz: 'Qornim ogʻriyapti.', audio_text: 'У меня болит живот.' },
        ],
      },
      {
        heading: '‘У меня болят...’ (Koʻplik)',
        explanation: 'Juft yoki koʻplikdagi tana aʼzolari ogʻriganda ishlatiladi:',
        examples: [
          { ru: 'У меня болят глаза.', uz: 'Koʻzlarim ogʻriyapti.', audio_text: 'У меня болят глаза.' },
          { ru: 'У меня болят ноги.', uz: 'Oyoqlarim ogʻriyapti.', audio_text: 'У меня болят ноги.' },
          { ru: 'У меня болят зубы.', uz: 'Tishlarim ogʻriyapti.', audio_text: 'У меня болят зубы.' },
        ],
      },
    ],
  },
  {
    id: 'price',
    title: 'Сколько стоит vs Сколько стоят?',
    topicUz: 'Doʻkonda narx soʻrash qoidalari',
    icon: '💳',
    level: 'A1',
    summary: 'Sotib olinayotgan buyum bitta yoki koʻpligiga qarab feʼl oʻzgaradi.',
    sections: [
      {
        heading: 'Birlik va koʻplik shakllari',
        explanation: 'Bitta mahsulot uchun ‘стоит’, koʻp mahsulotlar uchun ‘стоят’ ishlatiladi:',
        table: {
          headers: ['Shakl', 'Ruscha ibora', 'Misol', 'Oʻzbekcha tarjimasi'],
          rows: [
            ['Birlik', 'Сколько стоит...?', 'Сколько стоит этот кофе?', 'Bu qahva qancha turadi?'],
            ['Koʻplik', 'Сколько стоят...?', 'Сколько стоят эти яблоки?', 'Bu olmalar qancha turadi?'],
          ],
        },
        examples: [
          { ru: 'Скажите, пожалуйста, сколько стоит билет?', uz: 'Aytingchi, iltimos, chipta qancha turadi?', audio_text: 'Скажите, пожалуйста, сколько стоит билет?' },
          { ru: 'Сколько стоят эти сувениры?', uz: 'Bu suvenirlar qancha turadi?', audio_text: 'Сколько стоят эти сувениры?' },
          { ru: 'С вас триста рублей.', uz: 'Sizdan uch yuz rubl boʻldi.', audio_text: 'С вас триста рублей.' },
        ],
      },
    ],
  },
];
