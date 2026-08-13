import { Link } from 'react-router-dom'
import { LangSwitch } from '../components/LangSwitch'
import { heroLessonId, p1Units, strandOrder } from '../data/p1Catalog'
import type { Strand } from '../data/types'
import { useI18n } from '../i18n/I18nProvider'

function strandTitle(strand: Strand, t: ReturnType<typeof useI18n>['t']) {
  if (strand === 'number') return t.strandNumber
  if (strand === 'measures') return t.strandMeasures
  if (strand === 'shape') return t.strandShape
  return t.strandInquiry
}

function NumberPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <circle key={`a${i}`} className="p-dot a" cx={28 + i * 20} cy={48} r={9} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle
          key={`b${i}`}
          className="p-dot b"
          cx={118 + (i % 4) * 18}
          cy={i < 4 ? 34 : 58}
          r={8}
        />
      ))}
      <text x={100} y={16} textAnchor="middle" className="p-eq">
        4 + 8 = 12
      </text>
    </svg>
  )
}

function SoonPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <rect className="p-soon" x="30" y="24" width="140" height="48" rx="10" />
    </svg>
  )
}

export function Catalog() {
  const { t, localizeUnit } = useI18n()

  return (
    <div className="catalog">
      <div className="catalog-top">
        <LangSwitch />
      </div>

      <header className="catalog-hero">
        <p className="brand">{t.brand}</p>
        <h1>{t.headline}</h1>
        <p className="lede">{t.lede}</p>
        <Link className="hero-cta" to={`/lesson/${heroLessonId}`}>
          {t.heroCta}
        </Link>
        <p className="source-note">{t.sourceNote}</p>
      </header>

      {strandOrder.map((strand) => {
        const units = p1Units.filter((u) => u.strand === strand)
        return (
          <section key={strand} className="topic-block">
            <header className="topic-head">
              <h2>{strandTitle(strand, t)}</h2>
            </header>
            <div className="topic-grid">
              {units.map((unit) => {
                const U = localizeUnit(unit)
                const to = unit.playable && unit.lessonId
                  ? `/lesson/${unit.lessonId}`
                  : undefined
                const className = `topic-card ${unit.playable ? 'hero-card' : 'soon-card'}`
                const inner = (
                  <>
                    <div className="preview">
                      {unit.playable ? <NumberPreview /> : <SoonPreview />}
                    </div>
                    <span className="unit-code">{U.code}</span>
                    <strong>{U.title}</strong>
                    <em>{U.blurb}</em>
                    {!unit.playable && (
                      <span className="soon-tag">{t.comingSoon}</span>
                    )}
                  </>
                )
                return to ? (
                  <Link key={unit.id} className={className} to={to}>
                    {inner}
                  </Link>
                ) : (
                  <div key={unit.id} className={className} aria-disabled>
                    {inner}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
