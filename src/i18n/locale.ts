export type Locale = 'en' | 'zh-Hant'

export const LOCALES: { id: Locale; label: string }[] = [
  { id: 'zh-Hant', label: '繁中' },
  { id: 'en', label: 'EN' },
]

const STORAGE_KEY = 'hk-p1-math-locale'

export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'zh-Hant') return saved
  } catch {
    /* ignore */
  }
  return 'zh-Hant'
}

export function saveLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}
