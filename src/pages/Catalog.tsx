import { Link } from 'react-router-dom'
import { LangSwitch } from '../components/LangSwitch'
import {
  heroLessonId,
  n1Series,
  p1Units,
  strandOrder,
} from '../data/p1Catalog'
import type { Strand } from '../data/types'
import { useI18n } from '../i18n/I18nProvider'

function strandTitle(strand: Strand, t: ReturnType<typeof useI18n>['t']) {
  if (strand === 'number') return t.strandNumber
  if (strand === 'measures') return t.strandMeasures
  if (strand === 'shape') return t.strandShape
  return t.strandInquiry
}

function CountPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} className="p-dot solo" cx={40 + i * 28} cy={48} r={10} />
      ))}
      <text x={100} y={18} textAnchor="middle" className="p-eq">
        1 2 3 4 5
      </text>
    </svg>
  )
}

function ComparePreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={`a${i}`} className="p-dot a" cx={28 + (i % 3) * 18} cy={i < 3 ? 36 : 58} r={8} />
      ))}
      {[0, 1].map((i) => (
        <circle key={`b${i}`} className="p-dot b" cx={130 + i * 20} cy={48} r={8} />
      ))}
    </svg>
  )
}

function PairPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <ellipse cx={50} cy={44} rx={28} ry={20} className="p-ring" />
      <circle className="p-dot a" cx={40} cy={44} r={8} />
      <circle className="p-dot b" cx={60} cy={44} r={8} />
      <ellipse cx={110} cy={44} rx={28} ry={20} className="p-ring" />
      <circle className="p-dot a" cx={100} cy={44} r={8} />
      <circle className="p-dot b" cx={120} cy={44} r={8} />
      <circle className="p-dot solo" cx={165} cy={44} r={9} />
    </svg>
  )
}

function SplitPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <circle key={`a${i}`} className="p-dot a" cx={28 + i * 18} cy={48} r={8} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle
          key={`b${i}`}
          className="p-dot b"
          cx={110 + (i % 4) * 18}
          cy={i < 4 ? 34 : 58}
          r={7}
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

function previewFor(part: number) {
  if (part === 1) return <CountPreview />
  if (part === 2) return <ComparePreview />
  if (part === 3) return <PairPreview />
  return <SplitPreview />
}

export function Catalog() {
  const { t, localizeUnit, localizeSeriesPart } = useI18n()

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

      <section className="topic-block">
        <header className="topic-head">
          <h2>{t.seriesTitle}</h2>
          <p>{t.seriesBlurb}</p>
        </header>
        <div className="topic-grid">
          {n1Series.map((part) => {
            const P = localizeSeriesPart(part)
            return (
              <Link
                key={part.id}
                className={`topic-card hero-card ${part.part === 1 ? 'first-part' : ''}`}
                to={`/lesson/${part.lessonId}`}
              >
                <div className="preview">{previewFor(part.part)}</div>
                <span className="unit-code">{P.code}</span>
                <strong>{P.title}</strong>
                <em>{P.blurb}</em>
              </Link>
            )
          })}
        </div>
      </section>

      {strandOrder.map((strand) => {
        const units = p1Units.filter((u) => u.strand === strand)
        if (units.length === 0) return null
        return (
          <section key={strand} className="topic-block">
            <header className="topic-head">
              <h2>{strandTitle(strand, t)}</h2>
            </header>
            <div className="topic-grid">
              {units.map((unit) => {
                const U = localizeUnit(unit)
                return (
                  <div key={unit.id} className="topic-card soon-card" aria-disabled>
                    <div className="preview">
                      <SoonPreview />
                    </div>
                    <span className="unit-code">{U.code}</span>
                    <strong>{U.title}</strong>
                    <em>{U.blurb}</em>
                    <span className="soon-tag">{t.comingSoon}</span>
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
