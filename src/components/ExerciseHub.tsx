import { Link } from 'react-router-dom'
import { allExerciseSets } from '../data/exercises'
import { getGeneratableUnitIds, getUnitGeneratorConfig, estimateUnitQuestionCapacity, getTotalQuestionCapacity } from '../data/exerciseSetGenerators'
import { LangSwitch } from './LangSwitch'
import { useI18n } from '../i18n/I18nProvider'
import type { Strand } from '../data/types'

const strandIcons: Record<Strand, string> = {
  number: '🔢',
  measures: '📏',
  shape: '🔷',
  inquiry: '🔍',
}

const unitLabels: Record<string, string> = {
  '1n1': '1N1',
  '1n2': '1N2',
  '1n3': '1N3',
  '1n4': '1N4',
  '1m1': '1M1',
  '1m2': '1M2',
  '1m3': '1M3',
  '1m4': '1M4',
  '1s1': '1S1',
  '1s2': '1S2',
  '1s3': '1S3',
  '1f1': '1F1',
}

export interface ExerciseHubProps {
  onBack: () => void
}

export function ExerciseHub({ onBack }: ExerciseHubProps) {
  const { t, locale } = useI18n()

  // Group by strand
  const byStrand = allExerciseSets.reduce((acc, set) => {
    const unit = set.unitId
    let strand: Strand = 'number'
    if (unit.startsWith('1m')) strand = 'measures'
    else if (unit.startsWith('1s')) strand = 'shape'
    else if (unit.startsWith('1f')) strand = 'inquiry'

    if (!acc[strand]) acc[strand] = []
    acc[strand].push(set)
    return acc
  }, {} as Record<Strand, typeof allExerciseSets>)

  const strandOrder: Strand[] = ['number', 'measures', 'shape', 'inquiry']

  return (
    <div className="exercise-hub">
      <header className="hub-header">
        <button className="back-btn" onClick={onBack}>
          ← {t.catalog}
        </button>
        <LangSwitch />
        <h1>{t.practiceTitle}</h1>
        <p>{t.practiceSub}</p>
        <p className="hub-total">
          {t.uniqueTotal.replace('{n}', getTotalQuestionCapacity().toLocaleString())}
        </p>
      </header>

      {/* Mix Practice - Always First */}
      <section className="hub-section">
        <h2 className="hub-strand-title">
          <span className="strand-icon">🎲</span>
          {t.mixSection}
        </h2>
        <div className="hub-grid">
          <div className="hub-card hub-card-featured hub-card-selectable">
            <Link className="hub-card-main" to="/practice/mix">
              <div className="hub-card-header">
                <span className="hub-unit-code">MIX</span>
                <span className="hub-exercise-count">{t.mixCount}</span>
              </div>
              <h3 className="hub-card-title">{t.mixTitle}</h3>
              <p className="hub-card-desc">
                {t.mixDesc}
              </p>
              <div className="hub-card-meta">
                <span className="hub-points">{t.pts.replace('{n}', 'Variable')}</span>
              </div>
            </Link>
            <div className="hub-difficulty">
              <span className="hub-difficulty-label">{t.level}</span>
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <Link
                  key={level}
                  className="hub-difficulty-btn"
                  to={`/practice/mix?difficulty=${level}`}
                >
                  {level === 'easy' ? t.easyLabel : level === 'medium' ? t.mediumLabel : t.hardLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {strandOrder.map((strand) => {
        const sets = byStrand[strand]
        if (!sets || sets.length === 0) return null

        return (
          <section key={strand} className="hub-section">
            <h2 className="hub-strand-title">
              <span className="strand-icon">{strandIcons[strand]}</span>
              {strand === 'number' ? t.strandNumber :
               strand === 'measures' ? t.strandMeasures :
               strand === 'shape' ? t.strandShape : t.strandInquiry}
            </h2>
            <div className="hub-grid">
              {sets.map((set) => {
                const unitId = set.unitId
                const hasGenerator = getGeneratableUnitIds().includes(unitId)
                const generatorConfig = hasGenerator ? getUnitGeneratorConfig(unitId) : undefined
                const capacity = hasGenerator ? estimateUnitQuestionCapacity(unitId) : 0

                // For generated units, use localized titles from generator config
                const cardTitle = hasGenerator && generatorConfig
                  ? (locale === 'zh-Hant' ? (generatorConfig.titleZh ?? generatorConfig.title) : generatorConfig.title)
                  : set.title
                const cardDesc = hasGenerator && generatorConfig
                  ? (locale === 'zh-Hant' ? (generatorConfig.descriptionZh ?? generatorConfig.description) : generatorConfig.description)
                  : set.description

                // For generated units, show dynamic capacity (small pools
                // like clocks or shapes show their real size, not '50+')
                const displayCount = hasGenerator
                  ? capacity >= 50
                    ? t.exercisesCount.replace('{n}', '50+')
                    : t.exercisesCount.replace('{n}', `~${capacity}`)
                  : t.exercisesCount.replace('{n}', set.exercises.length.toString())
                const displayPoints = hasGenerator ? t.pts.replace('{n}', 'Variable') : t.pts.replace('{n}', set.totalPoints.toString())

                return (
                  <div
                    key={set.id}
                    className={`hub-card ${hasGenerator ? 'hub-card-selectable' : ''}`}
                  >
                    <Link className="hub-card-main" to={`/practice/${unitId}-generated`}>
                      <div className="hub-card-header">
                        <span className="hub-unit-code">
                          {unitLabels[unitId] || unitId.toUpperCase()}
                        </span>
                        <span className="hub-exercise-count">
                          {displayCount} {hasGenerator && '🔄'}
                        </span>
                      </div>
                      <h3 className="hub-card-title">{cardTitle}</h3>
                      <p className="hub-card-desc">{cardDesc}</p>
                      <div className="hub-card-meta">
                        <span className="hub-points">{displayPoints}</span>
                        {hasGenerator && capacity > 0 && (
                          <span className="hub-capacity" title={`~${capacity.toLocaleString()} unique combinations`}>
                            {t.variations.replace('{n}', capacity.toLocaleString())}
                          </span>
                        )}
                        {generatorConfig?.timeLimit && (
                          <span className="hub-time">
                            {t.timeMin.replace('{n}', Math.ceil(generatorConfig.timeLimit / 60).toString())}
                          </span>
                        )}
                      </div>
                      {hasGenerator && (
                        <div className="hub-fresh-badge">
                          {t.freshBadge}
                        </div>
                      )}
                    </Link>
                    {hasGenerator && (
                      <div className="hub-difficulty">
                        <span className="hub-difficulty-label">{t.level}</span>
                        {(['easy', 'medium', 'hard'] as const).map((level) => (
                          <Link
                            key={level}
                            className="hub-difficulty-btn"
                            to={`/practice/${unitId}-generated?difficulty=${level}`}
                          >
                            {level === 'easy' ? t.easyLabel : level === 'medium' ? t.mediumLabel : t.hardLabel}
                          </Link>
                        ))}
                      </div>
                    )}
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
