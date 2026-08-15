import { Link } from 'react-router-dom'
import { allExerciseSets } from '../data/exercises'
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
              {sets.map((set) => (
                <Link
                  key={set.id}
                  className="hub-card"
                  to={`/practice/${set.id}`}
                >
                  <div className="hub-card-header">
                    <span className="hub-unit-code">
                      {unitLabels[set.unitId] || set.unitId.toUpperCase()}
                    </span>
                    <span className="hub-exercise-count">
                      {set.exercises.length} exercises
                    </span>
                  </div>
                  <h3 className="hub-card-title">{set.title}</h3>
                  <p className="hub-card-desc">{set.description}</p>
                  <div className="hub-card-meta">
                    <span className="hub-points">⭐ {set.totalPoints} pts</span>
                    {set.timeLimit && (
                      <span className="hub-time">
                        ⏱️ {Math.ceil(set.timeLimit / 60)}m
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="hub-section">
        <h2 className="hub-strand-title">
          <span className="strand-icon">🎲</span>
          Quick Practice
        </h2>
        <div className="hub-grid">
          <Link className="hub-card hub-card-featured" to="/practice/quick">
            <div className="hub-card-header">
              <span className="hub-unit-code">MIX</span>
              <span className="hub-exercise-count">5 random</span>
            </div>
            <h3 className="hub-card-title">Quick Challenge</h3>
            <p className="hub-card-desc">
              Test your skills with 5 random exercises from any unit!
            </p>
            <div className="hub-card-meta">
              <span className="hub-points">⭐ Variable</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
