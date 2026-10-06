# RusGo: AI agent uchun ko'rsatma

Bu fayl loyihani davom ettiradigan AI agent uchun yozilgan. Ishni boshlashdan oldin to'liq o'qing.

## 1. Loyiha nima

**RusGo** — o'zbek tilida so'zlashuvchilar (asosan Rossiyadagi mehnat muhojirlari) uchun rus tili ilovasi, Duolingo uslubida. Asosiy daraja A1. A2 va B1 darslari ham bor.

- Sayt: https://rusgo.vercel.app. `main` branchga har push bo'lganda Vercel avtomatik deploy qiladi, odatda 1–2 daqiqada.
- Repo: https://github.com/Akram0100/rusgo, branch `main`.
- Stek:
  - Vite + React + TypeScript + Tailwind;
  - Express server (`server.ts`, Vercelda `api/index.ts`);
  - Firebase (login, Firestore sinxron);
  - Gemini API: ovoz (TTS) va AI dars yaratish;
  - PWA (service worker).

## 2. Foydalanuvchi bilan ishlash qoidalari (MAJBURIY)

1. **Foydalanuvchiga o'zbek tilida javob bering.** Har javob oxirida aniq bitta taklif bering, foydalanuvchi uni "ok" bilan tasdiqlaydi.
2. **Commit va push faqat foydalanuvchi "ok" degandan keyin qilinadi**, har to'plam alohida tasdiqlanadi. Force-push, rebase, amend qilmang, git config va remote URLni o'zgartirmang.
3. **`.env` faylini hech qachon ochmang, chiqarmang, commit qilmang.** Unda Gemini kalitlari turadi: `GEMINI_API_KEY`, `GEMINI_API_KEY_2`, `GEMINI_API_KEY_3`. Skriptlar uni o'zi o'qiydi.
4. **Yangi darslar yozilsa, push qilishdan oldin foydalanuvchiga so'z ro'yxatini ko'rsating.**
5. **Push qilgandan keyin saytda tekshiring.** Service worker deploydan keyingi birinchi yuklashda eski bundle beradi, shuning uchun sahifani 2 marta yuklang. Yangi bundle borligini `/assets/index-*.js` nomi o'zgarganidan bilasiz.
6. **Foydalanuvchiga real holatni ayting.** Test o'tmasa, buni yashirmang.

## 3. Buyruqlar

```bash
npm install            # bog'liqliklar (node_modules bor)
npm run lint           # tsc --noEmit — tip tekshiruvi
npm test               # logic + audio (138) va server (29) testlari
npx vite build         # build tekshiruvi
npm run audio:generate # MP3 yaratish (Gemini TTS, kunlik limit)
npm run dev            # lokal server (tsx server.ts)
```

Har o'zgarishdan keyin quyidagilar o'tishi shart:
- `npm run lint` — xatosiz;
- `npm test` — hammasi pass;
- build — ishlaydi.

## 4. Kod tuzilishi

| Fayl | Nima |
|---|---|
| `src/data/lessons.ts` | Eski darslar `LESSON_1_DATA`…`LESSON_8_DATA` va **`INITIAL_A1_LESSONS`**. Bu 48 ta A1 darsi osondan qiyinga tartibda, 8 bosqichda. O'quvchi ko'radigan dars raqami shu ro'yxatdagi o'rin. `INITIAL_LESSONS` = A1 + A2 + B1. |
| `src/data/a1Unit1.ts` … `a1Unit8.ts` | 9–48-darslar (`LESSON_9_DATA`…`LESSON_48_DATA`). Dars `lesson_id` lari yozilgan tartibni saqlaydi, o'qitish tartibi esa `INITIAL_A1_LESSONS` da. |
| `src/data/advancedLessons.ts` | A2 (3 dars), B1 (2 dars). |
| `src/data/grammar.ts`, `src/data/roleplay.ts` | Grammatika eslatmalari va rolli o'yin dialoglari. |
| `src/types/lesson.ts` | `LessonPackage`. Mashq turlari: `multiple_choice`, `translate_order` (+ `accepted_orders`), `fill_blank`, `learn_word`, `type_word`. Lug'atda `alternatives` maydoni bor. |
| `src/utils/duolingoFlow.ts` | `buildDuolingoProgression` (pastda batafsil), `addRetry`, `lessonStepsDone`. |
| `src/utils/typing.ts` | Javob tekshiruvi (pastda batafsil). |
| `src/utils/review.ts` | Takrorlash: Leitner qutilari, 1/2/4/7/14/30 kun. Ma'lumot localStorage `rusgo_review_deck` da. |
| `src/utils/xp.ts` | XP: birinchi marta 50 + har karta uchun 5; takror o'tganda 10. |
| `src/App.tsx` | Asosiy holat. Keyingi dars ro'yxatdagi indeks bo'yicha ochiladi. |
| `src/utils/audioTexts.ts` | Ovozlanadigan hamma iboralar ro'yxati. |
| `scripts/generate-audio.ts` | Gemini TTS bilan `public/audio/*.mp3` va `public/audio/manifest.json` yaratadi. |
| `tests/logic.test.ts`, `tests/audio.test.ts`, `tests/server.test.mjs` | Testlar. Ular dars ma'lumotlari qoidalarini ham tekshiradi. |

`buildDuolingoProgression` darsni qadamlarga aylantiradi:
- lug'atdagi so'z birinchi uchragan mashqdan oldin "Yangi so'z" kartasi qo'yiladi;
- dars oxiriga bitta "Ruscha yozing" qadami qo'shiladi: lug'atdagi eng qisqa 1–2 so'zli ibora, so'roq sifatida o'zbekcha tarjimasi ko'rsatiladi;
- undan keyin 2 ta tinglash qadami keladi.

`src/utils/typing.ts`:
- `normalizeTyped`, `checkTyped`: katta-kichik harf, ё/е va tinish belgilari hisobga olinmaydi; 4+ harfli so'zda bitta harf xato bo'lsa, javob ✏️ eslatma bilan qabul qilinadi;
- `checkTypedAgainst` muqobil javoblarni ham tekshiradi;
- `isRightOrder` gap tuzish mashqini tekshiradi va muqobil tartiblarni qabul qiladi.

## 5. Dars yozish qoidalari (testlar ham tekshiradi)

1. **Lug'atdagi `term` lar butun kursda takrorlanmasligi kerak.**
2. **Har bir lug'at so'zi kartada o'rgatilishi va har dars karta bilan boshlanishi kerak.**
   - So'z o'sha darsdagi biror mashqning shu maydonlaridan birida aynan uchrashi shart: `target_audio_text`, `instruction`, `correct_answer`, `blank_answer`, `correct_order`. Taqqoslashda katta-kichik harf va tinish belgilari hisobga olinmaydi.
   - Variantlar (`options`) bu yerda hisobga olinmaydi.
3. **`fill_blank` qoidasi:** `sentence_with_blank` dagi `___` o'rniga `blank_answer` qo'yilsa, natija `target_audio_text` bilan aynan bir xil bo'lishi kerak.
4. **`translate_order` qoidalari:**
   - `words_pool` ichida `correct_order` dagi hamma so'z bo'lsin.
   - Ortiqcha bo'laklar bilan boshqa **to'g'ri** tarjima tuzilib qolmasin. Masalan, "день" bo'lagi bilan "Сегодня у меня выходной день" ham to'g'ri bo'lib qolardi.
   - Tabiiy muqobil tartiblar `accepted_orders` ga yoziladi va faqat o'sha so'zlardan tuziladi.
5. **Topshiriq yozish:**
   - Variantlari o'zbekcha bo'lgan savolda ruscha gap topshiriq matnida keltiriladi, chunki u faqat ovozda eshitiladi.
   - Topshiriq va yordamchi izoh (`hint`) javobni oldindan aytib qo'ymasin.
   - Topshiriqdagi o'zbekcha gap ruscha javobga aniq mos kelsin. Yarim ruscha gapni bo'sh joy bilan keltirmang, o'zbekcha nima deyish kerakligini yozing.
6. **Jins va murojaat shakli:**
   - Jinsli 1-shaxs iboralarga `alternatives` qo'shing, masalan "Я узбек" uchun "Я узбечка".
   - Do'stga "ты" va "Давай" ishlatiladi. Hamkasb yoki notanishga "вы" va "Возьмите" ishlatiladi.
7. **"Ruscha yozing" topshirig'i** (lug'atdagi tarjima) **bir ma'noli bo'lsin.** Masalan, "Issiq (havo haqida)" → "Жарко". Faqat "Issiq" bo'lsa, o'quvchi "тепло" deb yozishi mumkin.
8. **O'zbek imlosi:**
   - oʻ va gʻ da U+02BB (ʻ), tutuq belgisida U+02BC (ʼ) ishlatiladi;
   - "Aytingchi" deb yoziladi, "Ayting-chi" emas.
9. **Ruscha iborani o'zgartirsangiz:** agar uning MP3 fayli bo'lsa, manifestda eskirgan yozuv qoladi va `tests/audio.test.ts` ("holds nothing stale") yiqiladi.
   - Eskirgan yozuvni `public/audio/manifest.json` dan o'chiring, MP3 faylini ham o'chiring.
   - Manifest formati: `JSON.stringify({version:1, complete, files}, null, 1) + '\n'`, `files` kalit bo'yicha saralangan.
   - Generator buni faqat to'liq yugurishda o'zi tozalaydi.

## 6. Audio (MP3)

- **Holat:** 1013 ta iboradan 148 tasining MP3 fayli bor. Qolganlarini sayt `/api/tts` orqali jonli ovozlaydi; bu Gemini kvotasini sarflaydi.
- **Kunlik limit:**
  - `GEMINI_API_KEY` — kuniga ~100 so'rov. Bu kvotani saytning `/api/tts` i ham ishlatadi.
  - `_2`, `_3` — kuniga ~10 tadan.
  - Kvota kalitga emas, Google Cloud **loyihasiga** beriladi. Generator bir kalitning limiti tugasa, keyingisiga o'tadi.
- **Kunlik ish tartibi.** Bu ishni Claude Code'dagi `rusgo-audio-daily` vazifasi bajarardi. Boshqa agent uchun qo'lda:
  1. `npm run audio:generate`
  2. `npm test`
  3. faqat `public/audio` papkasini commit qiling;
  4. push qiling, faqat foydalanuvchi "ok" desa.
- **Yo'l:** papka `public/audio`, `audio/` emas.

## 7. Hozirgi holat (2026-10-06)

Hammasi oxirgi commit `196e44a` gacha push qilingan va saytda ishlayapti.

- **Kontent:**
  - 48 ta A1 darsi (~480 so'z) osondan qiyinga 8 bosqichda tartiblangan.
  - Har darsda taxminan 10 so'z va 10 mashq. Dars oqimi: kartalar, mashqlar, 1 yozish va 2 tinglash qadami.
  - Xato javob berilgan mashq dars oxirida qaytib keladi.
  - Takrorlash (spaced repetition) ishlaydi.
- **Sifat:**
  - Kontent ikki marta to'liq tekshirildi.
  - Har bir so'z kartada o'rgatiladi.
  - 100 ta gap tuzish mashqi erkin so'z tartibini qabul qiladi.
- **Saytda sinov:** 1–4-darslar yangi o'quvchi sifatida boshidan oxirigacha o'tildi, hammasi ishladi.
- **Oxirgi commit `196e44a`.** Unda uchta tuzatish bor:
  - yangi yoki qayta boshlangan dars sahifaning tepasidan ochiladi;
  - natija ekranidan "JSON kodini koʻrish" tugmasi olib tashlandi (u menyuda qoldi);
  - "Kunlik maqsad" oynasi telefonda (`sm` dan tor ekranda) ko'rsatilmaydi.

  Bu uchala tuzatish saytdagi yangi bundleda borligi tekshirildi. Lekin natija ekrani va "Keyingi darsga o'tish"ni brauzerda ko'rib chiqish tugatilmadi. Birinchi navbatda shuni tekshiring.

## 8. Ochiq ishlar (taklif tartibida)

1. **`196e44a` ni saytda ko'rib chiqing:**
   - biror darsni tugating;
   - natija ekranida JSON tugmasi yo'qligini tekshiring;
   - natija sahifasini pastga aylantirib, "Keyingi darsga oʻtish"ni bosing va yangi dars tepadan ochilishini tekshiring;
   - telefon o'lchamida "Kunlik maqsad" chiqmasligini tekshiring. Buni bugun dars qilinmagan toza brauzerda sinang.
2. **Kichik ekranda 4-variant pastki "Tekshirish" paneli ostida qolishi mumkin.** Sahifa aylanadi, shuning uchun bu hozircha qoldirilgan.
3. **Tinish belgisi so'z bo'lagiga yopishgan.** Muqobil tartibda "Я в Москве. живу" ko'rinishi chiqadi. Bu faqat ko'rinish masalasi, javob to'g'ri tekshiriladi.
4. **Texnik qarzlar:**
   - `bun.lock` eskirgan, Vercel shu fayl bilan o'rnatadi; `bun install` kerak.
   - `firestore.rules` deploy qilinmagan.
   - Firebase web apiKey ommaviy repoda turibdi; Google Cloud'da kalitga cheklov qo'yish kerak.
   - XP brauzerda hisoblanadi; haqiqiy reyting uchun server tomonida hisoblash kerak.
   - Oflayn ijro sinalmagan.
5. **Kontentni kengaytirish:** TRKI A1 minimumi ~780 so'z, hozir ~480 so'z bor. Yangi bo'lim yozishdan oldin mavzular va so'z ro'yxatini foydalanuvchiga ko'rsating.
6. **Rus tili egasi tekshiruvi:** Claude artifact sahifasi bor (https://claude.ai/artifact/JjtLKzSefs8N9bjkaQJmcA), lekin hali ishlatilmagan.
   - Tekshiruvchi natijani matn sifatida yuboradi. Satr formati: `- [a1_lesson_05/e9] Mashq 9 (XATO): ...` va keyingi qatorda `Izoh: ...`.
   - Kalitlar: `w<n>` — n-chi lug'at so'zi (0 dan sanaladi); `e<id>` — mashq id si.
