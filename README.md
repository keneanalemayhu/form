# Next.js ብጁ ፍሬምዎርክ

ይህ የ Next.js 15 ማስጀመሪያ ቴምፕሌት ነው። አብሮትም ለ**Tailwind CSS**፣ **App Router**፣ context providers፣ ብጁ hooks እና ለሙሉ **የአማርኛ ፣ እንግሊዝኛና የብዙ ቋንቋዎች ድጋፍ** አለው።

# Next.js Custom Framework

This is a [Next.js](https://nextjs.org) 15 starter template with built-in support for **Tailwind CSS**, **App Router**, context providers, custom hooks, and full **Amharic & English multilingual** features.



## Table of Contents

- [🇪🇹 አማርኛ](#-አማርኛ)
  - [ለመጀመር](#ለመጀመር)
  - [ባህሪያት](#ባህሪያት)
  - [የፋይል አደረጃጀት](#የፋይል-አደረጃጀት)
  - [የትርጓሜ ምሳሌዎች](#የትርጓሜ-ምሳሌዎች)
  - [ተጨማሪ ይወቁ](#ተጨማሪ-ይወቁ)
  - [በVercel ላይ ያሰማሩ](#በVercel-ላይ-ያሰማሩ)
  - [እንገናኝ](#እንገናኝ)
  - [የምስጋና ማስታወሻ](#የምስጋና-ማስታወሻ)
- [🇬🇧 English](#-english)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Folder Structure](#folder-structure)
  - [Translation Example](#translation-example)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Author](#lets-connect)
  - [Credits](#credits)

---

## 🇪🇹 አማርኛ

### ለመጀመር

መጀመሪያ፣ የሚፈለጉትን ጥቅሎች (dependencies) ይጫኑ፦

```bash
npm install
```

ከዚያ የልማት ሰርቨሩን (development server) ያሂዱ፦

```bash
npm run dev
```

ውጤቱን ለማየት [http://localhost:3000](http://localhost:3000) በብሮውዘርዎ ይክፈቱ።

`src/app/page.tsx` የሚለውን ፋይል በማስተካከል መተግበሪያውን ማረም መጀመር ይችላሉ። ፋይሉን ባስተካከሉ ቁጥር ገጹ በራስ-ሰር ይስተካከላል።

ይህ ፕሮጀክት ከቨርሰል (Vercel) የሆነውን [Geist](https://vercel.com/font) የተሰኘውን ዘመናዊ የቅርጸ-ቁምፊ ቤተሰብ በራስ-ሰር ለማመቻቸት እና ለመጫን [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) ይጠቀማል።

### ባህሪያት

- የApp Router ድጋፍ (Next.js 15)
- ሙሉ የአማርኛና እንግሊዝኛ የትርጉም ድጋፍ
- በ[`next-themes`](https://github.com/pacocoursey/next-themes) የገጽታ መቀየሪያ (ብርሃናማ/ጨለማ) 
- ለቋንቋ እና ለገጽታ የሚሆን አጠቃላይ context
- ከShadCN ጋር የሚስማማ የዩአይ ዝግጅት
- እንደገና ጥቅም ላይ ሊውሉ የሚችሉ hooks እና utilities
- በ[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) ብጁ ቅርጸ ቁምፊዎችን መጫን
- ቅድመ-ተዋቅረው የተዘጋጁ ESLint እና Tailwind CSS 4
- ጠቃሚ ቤተ-መጻሕፍት፡- `clsx` ፣ `tailwind-merge` ፣ `lucide-react` ፣ `sonner`, እና ሌሎችም

---

### የፋይል አደረጃጀት

```
framework/
├── public/                  # የማይንቀሳቀሱ ፋይሎች
├── src/
│   ├── app/                 # የ App Router ገጾች እና አቀማመጥ
│   ├── components/          # የተለመዱ የዩአይ (UI)፣ context እና ብጁ ኮምፖነንቶች
│   ├── hooks/               # እንደ useTranslation ያሉ ብጁ hooks
│   ├── lib/                 # Utilities
│   ├── translations/        # የአማርኛ እና የእንግሊዝኛ የትርጉም ፋይሎች
│   └── types/               # የTypeScript አይነቶች
├── tailwind.config.js
├── tsconfig.json
└── ...
```

---

### የትርጓሜ ምሳሌ

```ts

import { useTranslation } from "@/hooks/useTranslation";

const t = useTranslation();
console.log(t.editMessage); // ወጪ በተመረጠው ቋንቋ መሰረት ይለዋወጣል
```

---

### ተጨማሪ ይወቁ

በዚህ ፕሮጀክት ውስጥ ስለተጠቀሙባቸው መሳሪያዎች የበለጠ ለማወቅ የሚከተሉትን ምንጮች ይመልከቱ፦

- [Next.js](https://nextjs.org/docs) ሰነዶች - ስለ Next.js ባህሪያት እና ኤፒአይ ይማሩ።
- [Tailwind CSS](https://tailwindcss.com/docs) - ዩቲሊቲ-ፌርስት የሲኤስኤስ ፍሬምዎርክ።
- [ShadCN UI](https://ui.shadcn.dev/) - በRadix UI ላይ የተገነቡ ማራኪ የዩአይ ኮምፖነንቶች።
- [next-themes](https://github.com/pacocoursey/next-themes) - ለ Next.js የጨለማ ገጽታ (dark mode) አተገባበር።
- [Lucide Icons](https://lucide.dev/) - ውብና ወጥነት ያለው ክፍት ምንጭ የአይኮን ቤተ-መጽሐፍት።

---

### በVercel ላይ ያሰማሩ

የNext.js መተግበሪያዎን ለማሰማራት ቀላሉ መንገድ የ Next.js ገንቢዎች በፈጠሩት [የቨርሰል መድረክ](https://vercel.com/new?utm_medium=default-template&utm_source=create-next-app&utm_campaign=create-next-app-readme) መጠቀም ነው።

ተጨማሪ መረጃ ለማግኘት የ[Next.js](https://nextjs.org/docs/app/building-your-application/deploying) የማሰማራት ሰነዶችን ይመልከቱ።

---

### እንገናኝ  
የድረ ገጻችንን ይጎብኙ፡ [jirehgrp.com](https://jirehgrp.com)  
በ GitHub ላይ ይከተሉን እና ስራዎቻችንን ይከታተሉ።

---

### የምስጋና ማስታወሻ

ይህ ፕሮጀክት የተገነባው በ[Vercel](https://vercel.com) ክፍት ምንጭ (open-source) የሬአክት (React) ፍሬምዎርክ በሆነው [Next.js](https://nextjs.org) ላይ ነው።
ይህን ድንቅ መሣሪያ በነጻ ስላቀረበልን ለ Next.js ቡድን እና ማኅበረሰብ እናመሰግናለን።

**ከጃይረ ግሩፕ ቡድን በ❤️ የተሰራ**

---

## 🇬🇧 English

### Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the app by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a modern font family from Vercel.

---

### Features

- App Router support (Next.js 15)
- Full Amharic & English translation support
- Theme switching (light/dark) via [`next-themes`](https://github.com/pacocoursey/next-themes)
- Global context for language and theme
- ShadCN-compatible UI setup
- Reusable hooks and utilities
- Custom font loading with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- ESLint + Tailwind CSS 4 preconfigured
- Useful libraries: `clsx`, `tailwind-merge`, `lucide-react`, `sonner`, and more

---

### Folder Structure

```
framework/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages & layout
│   ├── components/          # Common UI, context, and custom components
│   ├── hooks/               # Custom hooks like useTranslation
│   ├── lib/                 # Utilities
│   ├── translations/        # Amharic & English translation files
│   └── types/               # TypeScript types
├── tailwind.config.js
├── tsconfig.json
└── ...
```

---

### Translation Example

```ts
import { useTranslation } from "@/hooks/useTranslation";

const t = useTranslation();
console.log(t.editMessage); // Output changes based on selected language
```

---

### Learn More

To learn more about the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) – Utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.dev/) – Beautifully designed UI components built on Radix UI
- [next-themes](https://github.com/pacocoursey/next-themes) – Dark mode implementation for Next.js
- [Lucide Icons](https://lucide.dev/) – Beautiful & consistent open-source icon library

---

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

### Let’s Connect  
Visit our website: [jirehgrp.com](https://jirehgrp.com)  
Follow us on GitHub to stay up to date with our latest work and open-source projects.

---

### Credits

This project is built on top of [Next.js](https://nextjs.org), an open-source React framework by [Vercel](https://vercel.com).  
We thank the Next.js team and community for making this amazing tool freely available.

**Made with ❤️ by the JirehGroup Team**