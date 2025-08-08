// @/hooks/useTranslation.ts

import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}
