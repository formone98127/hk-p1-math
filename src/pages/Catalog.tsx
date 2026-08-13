import { Link } from 'react-router-dom'
import { LangSwitch } from '../components/LangSwitch'
import { allUnitSeries, heroLessonId, strandOrder } from '../data/p1Catalog'
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
      <circle className="p-dot solo" cx={140} cy={44} r={9} />
    </svg>
  )
}

function SplitPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <circle key={`a${i}`} className="p-dot a" cx={28 + i * 18} cy={48} r={8} />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={`b${i}`} className="p-dot b" cx={120 + i * 18} cy={48} r={8} />
      ))}
    </svg>
  )
}

function AddPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      {[0, 1].map((i) => (
        <circle key={`a${i}`} className="p-dot a" cx={40 + i * 20} cy={48} r={9} />
      ))}
      <text x={100} y={54} textAnchor="middle" className="p-eq">
        +
      </text>
      {[0, 1, 2].map((i) => (
        <circle key={`b${i}`} className="p-dot b" cx={130 + i * 18} cy={48} r={8} />
      ))}
    </svg>
  )
}

function LengthPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <rect className="p-dot a" x="20" y="28" width="120" height="16" rx="6" />
      <rect className="p-dot b" x="20" y="52" width="70" height="16" rx="6" />
    </svg>
  )
}

function MoneyPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <circle className="p-dot solo" cx="70" cy="48" r="18" />
      <circle className="p-dot solo" cx="120" cy="48" r="18" />
    </svg>
  )
}

function ClockPreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <circle cx="100" cy="48" r="28" className="p-ring" />
      <line x1="100" y1="48" x2="100" y2="28" stroke="#ff6b7a" strokeWidth="3" />
    </svg>
  )
}

function ShapePreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <polygon points="100,18 140,68 60,68" className="p-dot a" />
    </svg>
  )
}

function SpacePreview() {
  return (
    <svg viewBox="0 0 200 88" aria-hidden>
      <rect x="70" y="30" width="60" height="36" rx="6" className="p-ring" />
      <circle className="p-dot solo" cx="40" cy="48" r="10" />
    </svg>
  )
}

function previewFor(kind: string) {
  if (kind === 'count' || kind === 'tens') return <CountPreview />
  if (kind === 'compare') return <ComparePreview />
  if (kind === 'pairs') return <PairPreview />
  if (kind === 'split') return <SplitPreview />
  if (kind === 'add' || kind === 'sub') return <AddPreview />
  if (kind === 'length') return <LengthPreview />
  if (kind === 'money') return <MoneyPreview />
  if (kind === 'clock') return <ClockPreview />
  if (kind === 'shape') return <ShapePreview />
  if (kind === 'space') return <SpacePreview />
  return <ComparePreview />
}

export function Catalog() {
  const { t, localizeSeriesPart, localizeUnit } = useI18n()

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
        const series = allUnitSeries.filter((s) => s.strand === strand)
        if (series.length === 0) return null
        return (
          <div key={strand}>
            <header className="topic-head strand-head">
              <h2>{strandTitle(strand, t)}</h2>
            </header>
            {series.map((unit) => {
              const U = localizeUnit({
                id: unit.unitId,
                code: unit.code,
                title: unit.title,
                strand: unit.strand,
                blurb: unit.blurb,
                playable: true,
                lessonId: unit.parts[0]?.lessonId,
              })
              return (
                <section key={unit.unitId} className="topic-block">
                  <header className="topic-head">
                    <h2>
                      <span className="unit-code inline">{U.code}</span> {U.title}
                    </h2>
                    <p>{U.blurb}</p>
                  </header>
                  <div className="topic-grid">
                    {unit.parts.map((part) => {
                      const P = localizeSeriesPart(part)
                      return (
                        <Link
                          key={part.id}
                          className={`topic-card hero-card ${part.part === 1 ? 'first-part' : ''}`}
                          to={`/lesson/${part.lessonId}`}
                        >
                          <div className="preview">{previewFor(part.kind)}</div>
                          <span className="unit-code">{P.code}</span>
                          <strong>{P.title}</strong>
                          <em>{P.blurb}</em>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
