import en from './en.json';
import th from './th.json';

export const languages = {
  en: 'English',
  th: 'ไทย',
};

export const defaultLang = 'en';

export const translations = {
  en,
  th,
} as const;

export type Lang = keyof typeof translations;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function getAlternateLanguages(currentPath: string, currentLang: Lang) {
  const pathWithoutLang = currentLang === defaultLang
    ? currentPath
    : currentPath.replace(`/${currentLang}`, '') || '/';

  return Object.keys(languages).map((lang) => ({
    lang: lang as Lang,
    path: getLocalizedPath(pathWithoutLang, lang as Lang),
    name: languages[lang as Lang],
  }));
}
