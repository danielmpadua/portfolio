import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import ptTranslations from "./pt.json";
import enTranslations from "./en.json";

export const DEFAULT_LANGUAGE = localStorage.getItem("language") || "pt";

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  resources: {
    pt: { translation: { ...ptTranslations } },
    en: { translation: { ...enTranslations } },
  },
});
