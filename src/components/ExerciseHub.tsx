import { Link } from 'react-router-dom'
import { allExerciseSets } from '../data/exercises'
import { getGeneratableUnitIds, getUnitGeneratorConfig, estimateUnitQuestionCapacity, getTotalQuestionCapacity } from '../data/exerciseSetGenerators'
import type { Strand } from '../data/types'

const strandLabels: Record<Strand, string> = {
  number: 'Number',
  measures: 'Measures',
  shape: 'Shape & Space',
  inquiry: 'Inquiry',
}

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
          ← Back
        </button>
        <h1>🎯 Practice Zone</h1>
        <p>Choose a unit to practice and earn achievements!</p>
        <p className="hub-total">
          🎲 {getTotalQuestionCapacity().toLocaleString()}+ unique questions — fresh every session
        </p>
      </header>

      {strandOrder.map((strand) => {
        const sets = byStrand[strand]
        if (!sets || sets.length === 0) return null

        return (
          <section key={strand} className="hub-section">
            <h2 className="hub-strand-title">
              <span className="strand-icon">{strandIcons[strand]}</span>
              {strandLabels[strand]}
            </h2>
            <div className="hub-grid">
              {sets.map((set) => {
                const unitId = set.unitId
                const hasGenerator = getGeneratableUnitIds().includes(unitId)
                const generatorConfig = hasGenerator ? getUnitGeneratorConfig(unitId) : undefined
                const capacity = hasGenerator ? estimateUnitQuestionCapacity(unitId) : 0

                // For generated units, show dynamic capacity (small pools
                // like clocks or shapes show their real size, not '50+')
                const displayCount = hasGenerator
                  ? capacity >= 50
                    ? '50+'
                    : `~${capacity}`
                  : set.exercises.length
                const displayPoints = hasGenerator ? 'Variable' : set.totalPoints

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
                          {displayCount} exercises {hasGenerator && '🔄'}
                        </span>
                      </div>
                      <h3 className="hub-card-title">{set.title}</h3>
                      <p className="hub-card-desc">{set.description}</p>
                      <div className="hub-card-meta">
                        <span className="hub-points">⭐ {displayPoints} pts</span>
                        {hasGenerator && capacity > 0 && (
                          <span className="hub-capacity" title={`~${capacity.toLocaleString()} unique combinations`}>
                            🎲 ~{capacity.toLocaleString()} variations
                          </span>
                        )}
                        {generatorConfig?.timeLimit && (
                          <span className="hub-time">
                            ⏱️ {Math.ceil(generatorConfig.timeLimit / 60)}m
                          </span>
                        )}
                      </div>
                      {hasGenerator && (
                        <div className="hub-fresh-badge">
                          🔄 Fresh questions each time!
                        </div>
                      )}
                    </Link>
                    {hasGenerator && (
                      <div className="hub-difficulty">
                        <span className="hub-difficulty-label">Level</span>
                        {(['easy', 'medium', 'hard'] as const).map((level) => (
                          <Link
                            key={level}
                            className="hub-difficulty-btn"
                            to={`/practice/${unitId}-generated?difficulty=${level}`}
                          >
                            {level === 'easy' ? '🟢 Easy' : level === 'medium' ? '🟡 Medium' : '🔴 Hard'}
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

      <section className="hub-section">
        <h2 className="hub-strand-title">
          <span className="strand-icon">🎲</span>
          Mix Practice
        </h2>
        <div className="hub-grid">
          <div className="hub-card hub-card-featured hub-card-selectable">
            <Link className="hub-card-main" to="/practice/mix">
              <div className="hub-card-header">
                <span className="hub-unit-code">MIX</span>
                <span className="hub-exercise-count">20 random</span>
              </div>
              <h3 className="hub-card-title">Mix Practice</h3>
              <p className="hub-card-desc">
                Test your skills with 20 random questions from every unit!
              </p>
              <div className="hub-card-meta">
                <span className="hub-points">⭐ Variable</span>
              </div>
            </Link>
            <div className="hub-difficulty">
              <span className="hub-difficulty-label">Level</span>
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <Link
                  key={level}
                  className="hub-difficulty-btn"
                  to={`/practice/mix?difficulty=${level}`}
                >
                  {level === 'easy' ? '🟢 Easy' : level === 'medium' ? '🟡 Medium' : '🔴 Hard'}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
