# Aqvo — Next.js + Tailwind sayti

## Ishga tushirish
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tayyor statik sayt "out/" papkasiga chiqadi
```
`out/` papkasini Vercel, Netlify (netlify.com/drop) yoki istalgan hostingga yuklash mumkin.

## Tillar
O‘zbek / Русский / English. Barcha matnlar `lib/i18n.ts` faylida. Sayt `?lang=ru` yoki `?lang=en` havolasi bilan kerakli tilda ochiladi.

## Ma’lumotlar
- `lib/data.ts`: 14 ta go‘sht bo‘limi (raqam, toifa, sigirdagi joylashuvi), yetkazib berish shaharlari, kontaktlar.
- **Kontaktlar:** `CONTACT.phones` va `CONTACT.telegram` hozircha bo‘sh. Raqamlarni qo‘shsangiz, ular sayt footerida avtomatik paydo bo‘ladi.
- `public/cuts/*.webp`: bo‘lim suratlari (brend rasmidan kesib olingan). Sifatliroq suratlar bo‘lsa, shu nomlar bilan almashtiring.
- `lib/logo.ts`: Aqvo logotipi (vektorga aylantirilgan).

## Bo‘limlar
1. `Story.tsx`: sigir → 14 ta bo‘limga bo‘linish (raqam, rang, toifa) → haqiqiy go‘sht suratlari aylanasi
2. `Catalog.tsx`: toifa bo‘yicha filtrli katalog, “Buyurtmaga qo‘shish”
3. `Packaging.tsx`: vakuum qadoq → Aqvo qutisi → muhr → yo‘lga
4. `Delivery.tsx`: O‘zbekiston bo‘ylab yetkazib berish xaritasi, katta hajmlar
5. `Order.tsx`: buyurtma formasi (bo‘lim + kg, chakana yoki ulgurji, viloyat)

## Hali qilinishi kerak
- Buyurtma formasi hozircha hech qayerga yubormaydi (namuna rejim). Uni Telegram bot yoki CRM’ga ulash kerak.
# aqvoo
