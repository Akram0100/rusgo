# Rus Tili A1: Tanishuv va Salomlashish (1-Dars) — Interaktiv Trenajyor va JSON Eksport

Oʻzbek tilida soʻzlashuvchilar uchun rus tilini noldan oʻrgatuvchi Duolingo metodikasi asosidagi 5 ta mikro-mashqdan iborat dars toʻplami hamda toʻliq ishchi interaktiv trenajyor va JSON eksport tizimi.

## User Review & Critical Decisions

> [!IMPORTANT]
> Foydalanuvchi bilan savol-javob orqali quyidagi arxitektura va pedagogik yoʻnalishlar tasdiqlandi:

- **Taqdimot formati**: Toʻliq interaktiv Duolingo trenajyori (jonlar, progress bari, natijalar tahlili, soʻz bloklarini bosish) va bir marta bosish orqali toza standart JSON formatini koʻrish/nusxalash/yuklab olish.
- **Audio va talaffuz**: Har bir mashq uchun toza ruscha `target_audio_text` hamda brauzer Web Speech API (`ru-RU`) orqali normal va sekin (0.7x) tezlikda talaffuz qilish imkoniyati.
- **Pedagogik balans**: Kundalik muloqotda eng koʻp uchraydigan rasmiy ("Здравствуйте", "Как вас зовут?", "Очень приятно") va doʻstona norasmiy ("Привет", "Меня зовут...") iboralar balansi.

---

## 1. Overview & Core Concept

- **What It Does**: Rus tilini noldan oʻrganayotgan oʻzbek tili sohiblariga 1-dars ("Tanishuv va salomlashish") doirasida 5 ta turli formatdagi mikro-mashqni interaktiv tarzda oʻrgatadi, xatolar boʻyicha oʻzbek tilida grammatik izoh beradi va toʻliq JSON sxemasini taqdim etadi.
- **Target Audience / Persona**: Rus tilini noldan boshlayotgan oʻquvchilar, repetitorlar, va Duolingo uslubidagi taʼlim platformalari uchun tayyor metodik kontentga muhtoj dasturchilar.
- **Key Value**: Grammatik jihatdan 100% toʻgʻri ruscha jumlalar, lotin alifbosidagi tushunarli oʻzbekcha qoidalar, tabiiy nutq audio modeli va oʻyinlashtirilgan oʻrganish jarayoni.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Darsni boshlash**: Oʻquvchi dars maqsadi va yangi soʻzlar lugʻati bilan tanishadi (3 ta jon, progress paneli).
2. **Mashqlarni bajarish (5 ta bosqich)**:
   - *1-mashq (multiple_choice)*: Salomlashuv tanlash ("Здравствуйте" vs "Спокойной ночи" vs "Пожалуйста" vs "Спасибо").
   - *2-mashq (translate_order)*: "Mening ismim Anvar" jumlasini ruscha bloklardan tartiblash ("Меня" + "зовут" + "Анвар").
   - *3-mashq (fill_blank)*: Rasmiy savoldagi tushib qolgan soʻzni qoʻyish ("Как ___ зовут?" -> "вас").
   - *4-mashq (multiple_choice)*: "Очень приятно" (Tanishganimdan xursandman) iborasining toʻgʻri maʼnosini va javobini topish.
   - *5-mashq (translate_order)*: Norasmiy xayrlashuv va koʻrishguncha jumlasini tuzish ("До" + "скорой" + "встречи").
3. **Audio tinglash**: Har bir mashq tepasida karnaycha belgisi va sekin toshbaqa belgisi orqali ruscha toza talaffuzni tinglash.
4. **Natijalar & JSON koʻrish**: Dars yakunida statistika va tizimning toʻliq JSON maʼlumotlarini yoritilgan formatda koʻrish, nusxalash yoki fayl sifatida yuklab olish (`lesson_1_a1.json`).

### Visual Identity & Theme
- **Aesthetic Direction**: Duolingo uslubidagi toza, joʻshqin, zamonaviy va charchatmaydigan taʼlimiy interfeys.
- **Color Palette (60-30-10)**:
  - 60% Canvas: Toza och fon (`bg-slate-50` / `bg-white`)
  - 30% Structural: Yumshoq neytral chegaralar (`border-slate-200`), karta yuzalari (`bg-white` soya bilan)
  - 10% Accents: Zumrad yashil (`#16a34a` / `#22c55e`) muvaffaqiyat va faol harakatlar uchun, Amber sariq (`#f59e0b`) streak va yutuqlar uchun, Qizil (`#ef4444`) jonlar uchun.
- **Typography**: Sans-serif (`Plus Jakarta Sans` / `Outfit` tuygʻusi), aniq matn oʻlchamlari va kirillcha-lotincha matnlar uchun yuqori kontrast.

### Interactive Feedback & Motion
- Tugmalar bosilganda 3D tactile bosilish effekti (`active:translate-y-0.5`).
- Toʻgʻri javob berilganda pastki panel yashil tusga kirib oʻzbekcha qisqa izoh chiqadi, notoʻgʻri boʻlganda qizil tusda toʻgʻri variant koʻrsatiladi.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: JSON va Trenajyorni bitta ekranda integratsiya qilish**
  - *Chosen Approach*: Yuqori panelda "Mashgʻulot" (Interactive Trainer) va "JSON Maʼlumotlar" (Raw JSON Viewer) oʻrtasida bir zumda oʻtish imkoniyatini yaratish.
  - *Why*: Foydalanuvchi ham tayyor metodik JSON faylni oʻz loyihasiga olib ketishi, ham uning amalda qanday ishlashini darhol sinab koʻrishi mumkin.
- **Decision 2: Ovoz sintezi (SpeechSynthesis) tanlovi**
  - *Chosen Approach*: Qoʻshimcha tashqi API kalitlari yoki server toʻlovlarisiz toʻgʻridan-toʻgʻri zamonaviy brauzer Web Speech API (`ru-RU` ovozi) dan foydalanish. Sekinlashtirilgan (rate: 0.75) tinglash rejimini qoʻshish.
  - *Why*: 100% ishonchli, kechikishlarsiz ishlaydi va oʻquvchi har bir soʻzni aniq eshitadi.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       Top Navigation Bar                    │
│   "Rus Tili A1"  ·  Rejimlar: [Trenajyor | JSON Koʻrish]   │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                         ▼
┌───────────────────────────────┐     ┌───────────────────────┐
│     Interactive Trainer       │     │      JSON Viewer      │
│  - Hearts & Progress Bar      │     │  - Formatted JSON     │
│  - Russian Audio (TTS / Slow) │     │  - Copy to Clipboard  │
│  - Exercise Renderer:         │     │  - Download .json     │
│    * multiple_choice          │     │  - Schema Specs       │
│    * translate_order          │     └───────────────────────┘
│    * fill_blank               │
│  - Feedback Banner (Oʻzbekcha)│
│  - Results & Review Screen    │
└───────────────────────────────┘
```

### 5 ta Mashqning Aniq JSON Sxemasi va Tarkibi

Dars paketi quyidagi qatʼiy JSON tuzilishida boʻladi:
```json
{
  "lesson_id": "a1_lesson_01",
  "level": "A1",
  "topic": "Tanishuv va salomlashish",
  "target_language": "ru",
  "instruction_language": "uz",
  "exercises_count": 5,
  "exercises": [
    {
      "id": 1,
      "type": "multiple_choice",
      "instruction": "Rasmiy vaziyatda 'Assalomu alaykum' deb salomlashish uchun qaysi soʻz ishlatiladi?",
      "target_audio_text": "Здравствуйте!",
      "options": ["Здравствуйте", "До свидания", "Пожалуйста", "Спасибо"],
      "correct_answer": "Здравствуйте",
      "explanation": "‘Здравствуйте’ — rus tilida kattalarga yoki notanish odamlarga aytiladigan rasmiy salomlashuv."
    },
    {
      "id": 2,
      "type": "translate_order",
      "instruction": "Soʻzlarni toʻgʻri tartibda terib: 'Mening ismim Anvar' jumlasini hosil qiling.",
      "target_audio_text": "Меня зовут Анвар.",
      "words_pool": ["Анвар", "Меня", "зовут", "Привет", "как"],
      "correct_order": ["Меня", "зовут", "Анвар"],
      "explanation": "Rus tilida ismni aytishda ‘Меня зовут + Ism’ konstruksiyasidan foydalaniladi."
    },
    {
      "id": 3,
      "type": "fill_blank",
      "instruction": "Nuqtalar oʻrniga mos soʻzni qoʻying: 'Sizning ismingiz nima?'",
      "target_audio_text": "Как вас зовут?",
      "sentence_with_blank": "Как ___ зовут?",
      "blank_answer": "вас",
      "hint": "Hurmat maʼnosidagi kishilik olmoshi",
      "options": ["вас", "тебя", "меня", "его"],
      "explanation": "Rasmiy va hurmat ohangida ‘Как вас зовут?’, norasmiy doʻstona holatda esa ‘Как тебя зовут?’ deyiladi."
    },
    {
      "id": 4,
      "type": "multiple_choice",
      "instruction": "Tanishuvdan soʻng 'Tanishganimdan xursandman' maʼnosidagi toʻgʻri iborani tanlang:",
      "target_audio_text": "Очень приятно!",
      "options": ["Очень приятно", "Доброе утро", "Не за что", "Извините"],
      "correct_answer": "Очень приятно",
      "explanation": "‘Очень приятно’ iborasi yangi inson bilan tanishganda mamnuniyat bildirish uchun ishlatiladi."
    },
    {
      "id": 5,
      "type": "translate_order",
      "instruction": "Soʻzlarni terib: 'Salom, koʻrishguncha!' jumlasini tuzing.",
      "target_audio_text": "Привет, до скорой встречи!",
      "words_pool": ["Привет,", "до", "скорой", "встречи!", "Добро", "пожаловать"],
      "correct_order": ["Привет,", "до", "скорой", "встречи!"],
      "explanation": "‘До скорой встречи’ — yaqin orada yana koʻrishishni niyat qilib xayrlashish iborasidir."
    }
  ]
}
```

### Interactive State Mapping
- `currentIndex`: 0 dan 4 gacha boʻlgan joriy mashq indeksi.
- `selectedOption`: Tanlangan variant yoki kiritilgan matn.
- `selectedWordOrder`: Foydalanuvchi tanlagan soʻzlar ketma-ketligi (bosilganda pastdan yuqoriga chiqadi yoki qaytadi).
- `hearts`: Foydalanuvchining jonlari (standart 3 ta).
- `isAnswerChecked`: Javob tekshirilganmi va tekshirish holati (`idle`, `correct`, `wrong`).
- `ttsActive`: Audio ijro etilayotgan paytdagi vizual animatsiya.
