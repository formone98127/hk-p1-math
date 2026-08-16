export type Theme = 'dark' | 'light'

const THEME_KEY = 'hk-p1-math-theme'

export function detectTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  return 'dark' // Default to dark mode as per current design
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* ignore */
  }
}

export const THEMES: { id: Theme; label: string; icon: string }[] = [
  { id: 'dark', label: '🌙', icon: '🌙' },
  { id: 'light', label: '☀️', icon: '☀️' },
]
