import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { allExerciseSets, getQuickPractice } from '../data/exercises'
import type { Exercise } from '../data/types'
import { checkAchievements } from '../data/achievements'

export function PracticeMode() {
  const { setId } = useParams<{ setId?: string }>()
  const navigate = useNavigate()

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [streak, setStreak] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  // Load exercises
  useEffect(() => {
    if (setId === 'quick') {
      setExercises(getQuickPractice(5))
    } else if (setId) {
      const set = allExerciseSets.find((s) => s.id === setId)
      if (set) {
        setExercises(set.exercises)
        if (set.timeLimit) {
          setTimeRemaining(set.timeLimit)
        }
      }
    }
  }, [setId])

  // Timer
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || showResults) return
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeRemaining, showResults])

  const currentExercise = exercises[currentIndex]
  const isLast = currentIndex === exercises.length - 1
  const hasAnswered = userAnswers[currentExercise?.id] !== undefined

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const checkAnswer = useCallback(() => {
    if (!currentExercise || !hasAnswered) return

    const userAnswer = userAnswers[currentExercise.id]
    const correct = String(userAnswer) === String(currentExercise.correctAnswer)

    if (correct) {
      setCorrectCount((prev) => prev + 1)
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }

    if (isLast) {
      setShowResults(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentExercise, hasAnswered, userAnswers, isLast])

  const handleInputChange = (value: string) => {
    if (currentExercise) {
      setUserAnswers((prev) => ({ ...prev, [currentExercise.id]: value }))
    }
  }

  const handleSkip = () => {
    if (isLast) {
      setShowResults(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  if (!currentExercise && !showResults) {
    return (
      <div className="practice-loading">
        <p>Loading exercises...</p>
      </div>
    )
  }

  if (showResults) {
    const earnedPoints = exercises.reduce((sum, ex) => {
      const isCorrect = String(userAnswers[ex.id]) === String(ex.correctAnswer)
      return isCorrect ? sum + ex.points : sum
    }, 0)
    const percentage = Math.round((correctCount / exercises.length) * 100)

    const newProgress = {
      completedExercises: exercises.map((e) => e.id),
      scores: { [setId || 'quick']: percentage },
      streaks: { current: streak },
      totalPoints: earnedPoints,
      lastPractice: new Date().toISOString(),
      timeSpent: {},
    }

    const unlockedAchievements = checkAchievements(newProgress)

    return (
      <div className="practice-results">
        <header className="results-header">
          <h2>Practice Complete! 🎉</h2>
          <p className="results-score">
            {correctCount} / {exercises.length} correct ({percentage}%)
          </p>
          <p className="results-points">You earned {earnedPoints} points!</p>
        </header>

        {unlockedAchievements.length > 0 && (
          <section className="achievements-unlocked">
            <h3>Achievements Unlocked!</h3>
            <div className="achievement-grid">
              {unlockedAchievements.map((ach) => (
                <div key={ach.id} className="achievement-badge unlocked">
                  <span className="achievement-icon">{ach.icon}</span>
                  <div className="achievement-info">
                    <strong>{ach.title}</strong>
                    <p>{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="review-section">
          <h3>Review Answers</h3>
          {exercises.map((ex, idx) => {
            const userAnswer = userAnswers[ex.id]
            const isCorrect = String(userAnswer) === String(ex.correctAnswer)
            return (
              <div key={ex.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="review-q">
                  <span className="review-num">{idx + 1}.</span>
                  <span className="review-question">{ex.question}</span>
                </div>
                <div className="review-a">
                  {isCorrect ? (
                    <span className="review-status correct">✓ Correct!</span>
                  ) : (
                    <div className="review-incorrect">
                      <span className="review-status incorrect">✗ Your answer: {userAnswer ?? 'Skipped'}</span>
                      <span className="review-correct">Correct: {ex.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </section>

        <div className="results-actions">
          <button className="btn-primary" onClick={() => navigate('/practice')}>
            Back to Practice Zone
          </button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="practice-mode">
      <header className="practice-header">
        <Link to="/practice" className="back-link">
          ← Exit
        </Link>
        <div className="practice-progress">
          <span>
            Question {currentIndex + 1} of {exercises.length}
          </span>
          {timeRemaining !== null && (
            <span className="practice-timer">
              ⏱️ {formatTime(timeRemaining)}
            </span>
          )}
          <span className="practice-streak">
            🔥 {streak} streak
          </span>
        </div>
      </header>

      {timeRemaining !== null && timeRemaining <= 30 && (
        <div className="time-warning">
          ⚠️ Only {formatTime(timeRemaining)} remaining!
        </div>
      )}

      <main className="practice-main">
        <div className="exercise-card">
          <div className="exercise-difficulty">
            {currentExercise.difficulty === 'easy' && '🟢 Easy'}
            {currentExercise.difficulty === 'medium' && '🟡 Medium'}
            {currentExercise.difficulty === 'hard' && '🔴 Hard'}
          </div>

          <h2 className="exercise-question">{currentExercise.question}</h2>

          {currentExercise.options && currentExercise.options.length > 0 ? (
            <div className="multiple-choice-options">
              {currentExercise.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${userAnswers[currentExercise.id] === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="no-options-error">
              No options available for this exercise.
            </div>
          )}

          {currentExercise.hint && (
            <button
              className="hint-toggle"
              onClick={() => document.querySelector('.hint-text')?.classList.toggle('visible')}
            >
              💡 Need a hint?
            </button>
          )}
          {currentExercise.hint && (
            <p className="hint-text">{currentExercise.hint}</p>
          )}
        </div>

        <div className="practice-actions">
          <button className="btn-skip" onClick={handleSkip}>
            Skip →
          </button>
          <button
            className="btn-primary"
            onClick={checkAnswer}
            disabled={!hasAnswered}
          >
            {isLast ? 'Finish' : 'Next →'}
          </button>
        </div>
      </main>
    </div>
  )
}
