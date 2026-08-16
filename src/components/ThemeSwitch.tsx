import { useTheme } from '../i18n/ThemeProvider'
import { useI18n } from '../i18n/I18nProvider'

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      aria-label={isDark ? t.themeToLight : t.themeToDark}
      title={isDark ? t.themeToLight : t.themeToDark}
      onClick={(e) => {
        e.stopPropagation()
        toggleTheme()
      }}
    >
      <span className="theme-toggle-icon" aria-hidden>
        {isDark ? '☀' : '☾'}
      </span>
      <span className="theme-toggle-label">
        {isDark ? t.themeLight : t.themeDark}
      </span>
    </button>
  )
}
