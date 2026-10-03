<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# RusGo — rus tili A1–B1 (Duolingo metodikasi)

Oʻzbek tilida soʻzlashuvchilar uchun rus tilini oʻrgatuvchi PWA: mikro-mashqlar, audio talaffuz, soʻz kartochkalari, muloqot simulyatori, grammatika va Gemini yordamida yangi darslar yaratish.

AI Studio: https://ai.studio/apps/f9b265d3-93c0-4f6b-ac99-af6c78669bb5

## Ishga tushirish

**Talab:** Node.js 20 yoki yangiroq.

1. Bogʻliqliklarni oʻrnating: `npm install` (yoki `bun install`).
2. `.env.example` faylini `.env.local` nomi bilan nusxalab, `GEMINI_API_KEY` ga Gemini kalitingizni yozing.
   Kalitsiz ham ilova ishlaydi, faqat AI-dars yaratish oʻchiq boʻladi va audio zaxira ovozda chiqadi.
3. `npm run dev` — ilova http://localhost:3000 da ochiladi.

`.env.local` fayli `.env` dan oldin oʻqiladi (Vite bilan bir xil tartib).

## Buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Express + Vite, dasturlash rejimi (HMR oʻchirilgan) |
| `npm run build` | `dist/` papkasiga ishlab chiqarish build'ini yaratadi |
| `npm start` | `dist/` ni Express orqali ishlab chiqarish rejimida xizmat qiladi (avval `npm run build`) |
| `npm run lint` | Tiplarni tekshiradi (`tsc --noEmit`) |
| `npm run clean` | `dist/` ni oʻchiradi |

## Testlar

| Buyruq | Nimani tekshiradi | Talab |
|---|---|---|
| `npm test` | `test:logic` va `test:server` | faqat `npm install` |
| `npm run test:logic` | javoblarni aralashtirish, AI-dars validatsiyasi, XP/jon/streak/yutuq qoidalari, muloqot ssenariylari, dars maʼlumotlari yaxlitligi | — |
| `npm run test:server` | server: kirish tekshiruvi, tezlik cheklovi, keshlar, xatolar, `.env` (Gemini va Google xizmatlari soxta, internet kerak emas) | — |
| `npm run test:rules` | `firestore.rules` ni Firestore emulyatorida | Java 11+ va Firebase CLI (`npm i -g firebase-tools`) |

Server testlari har bir server uchun vaqtinchalik papka ochadi: sizning `.env.local` va `.cache` fayllaringizga tegmaydi.

## Sozlamalar

Barchasi ixtiyoriy va `.env.local` da beriladi; qiymatlar va izohlar [.env.example](.env.example) faylida.

- `PORT` — server porti (standart 3000).
- `TRUST_PROXY` — serverdan oldin turgan proksilar soni (nginx, load balancer: `1`). Tezlik cheklovi har bir tashrif buyuruvchi uchun alohida ishlashi uchun kerak. Cloud Run (AI Studio) da avtomatik `1`, boshqa joyda `0`; server toʻgʻridan-toʻgʻri ochiq boʻlsa `0` qoldiring.
- `TTS_UPSTREAM_PER_MINUTE`, `TTS_UPSTREAM_GLOBAL_PER_MINUTE`, `LESSON_GENERATIONS_PER_10_MIN` — tezlik cheklovlari.
- `AUDIO_MEMORY_MAX_ENTRIES`, `AUDIO_DISK_MAX_ENTRIES` — audio kesh hajmi.

## Oʻyin qoidalari

Barcha raqamlar [src/utils/xp.ts](src/utils/xp.ts) da (oʻzgartirsangiz `npm run test:logic` ni ishga tushiring).

- **Jonlar:** har bir dars urinishida 5 ta. Xato javob 1 ta jonni oladi; jonlar tugasa "Jonlar tugadi" ekrani chiqadi va dars qaytadan boshlanadi (XP berilmaydi).
- **Dars:** birinchi marta tugatilsa 50 XP, takroran tugatilsa 10 XP.
- **Muloqot:** har bir ssenariy birinchi marta tugatilsa 30 XP, takroran 5 XP.
- **Juftlash:** juftlik uchun 3 XP, ketma-ket toʻgʻri juftliklar uchun yana +1 (koʻpi bilan +3); bir raundda koʻpi bilan 40 XP. XP raund tugaganda yoki oyna yopilganda avtomatik beriladi.
- **Yutuqlar:** mukofot XP si yutuq ochilganda bir marta beriladi va bildirishnoma chiqadi.
- **Streak:** kun foydalanuvchining mahalliy vaqti boʻyicha hisoblanadi; faqat dars tugatilgan kun sanaladi (ilovani ochish streakni uzaytirmaydi). Bir kun oʻtkazib yuborilsa streak 0 ga tushadi.
- XP va streak brauzerda (`localStorage`) hisoblanadi va saqlanadi, serverda tekshirilmaydi: haqiqiy reyting uchun hisob serverda boʻlishi kerak.

## Tuzilma

- `src/` — React ilovasi: `components/`, `data/` (darslar, grammatika, muloqot ssenariylari), `utils/` (audio, gamifikatsiya, XP qoidalari, Firebase).
- `server.ts` — `/api/tts` (audio), `/api/generate-lesson` (AI-dars), `/api/health` va ishlab chiqarishda `dist/` ni tarqatish.
- `firestore.rules`, `firebase-blueprint.json`, `firebase-applet-config.json` — Firebase sozlamalari.

## Bilish kerak

- **Audio:** kalit boʻlsa Gemini TTS, boʻlmasa yoki xato boʻlsa Google Translate'ning **rasmiy boʻlmagan** TTS manzili ishlatiladi — u istalgan vaqt oʻzgarishi yoki serverdan soʻrovlarni rad etishi mumkin. Yaratilgan audio serverda (`.cache/audio`) va brauzerda (IndexedDB) saqlanadi.
- **Server himoyasi:** `/api/*` ochiq (kirish talab qilinmaydi), shuning uchun matn uzunligi, tezlik va kesh hajmi cheklangan. Cloud Run dan boshqa joyda proksi ortida joylashtirsangiz `TRUST_PROXY` ni sozlang, aks holda barcha tashrif buyuruvchilar bitta cheklovni boʻlishadi.
- **Firebase:** Auth va Firestore alohida bundle boʻlagida yuklanadi. `firestore.rules` ni joylashtirishdan oldin emulyatorda sinang.
- **Reyting** hozircha namunaviy (demo): raqiblar toʻqib chiqarilgan (qotirilgan roʻyxat), Firestore'ga ommaviy reyting yozuvi yuborilmaydi (`PUBLISH_LEADERBOARD` bayrogʻi, `src/utils/firebase.ts`).
- **Mehmon hisobi** (ism bilan kirish) anonim Firebase hisobi: faqat shu brauzerda saqlanadi. Qurilmalar orasida saqlash uchun Google bilan kirish kerak.
