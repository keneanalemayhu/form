```plaintext
form/
│
├── backend/
│   ├── db.php
│   └── schema.sql
│
├── public/
│   ├── fonts/
│   ├── images/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── LanguageToggle.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── context/
│   │   │   ├── LanguageContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   └── ui/
│   │       └── shadcn ui components
│   │
│   ├── hooks/
│   │   ├── useCalendar.ts
│   │   └── useTranslation.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── translations/
│   │   ├── am.ts
│   │   ├── en.ts
│   │   └── index.ts
│   │
│   └── types/
│       ├── tables/
│       │   ├── church.ts
│       │   ├── mediaSpecialty.ts
│       │   ├── participant.ts
│       │   ├── participantSkill.ts
│       │   └── participantTrainingDetail.ts
│       ├── base.ts
│       ├── enriched.ts
│       ├── index.ts
│       └── props.ts
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── structure.txt
└── tsconfig.json
```