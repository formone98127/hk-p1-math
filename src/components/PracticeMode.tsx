import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import { allExerciseSets } from '../data/exercises'
import { generateExerciseSetForUnit, generateQuickPractice as generateNewQuickPractice, getGeneratableUnitIds } from '../data/exerciseSetGenerators'
import type { Difficulty, Exercise } from '../data/types'
import { checkAchievements } from '../data/achievements'

// In-progress sessions are saved so a reload resumes where the kid left off
const STORAGE_KEY = 'hk-p1-practice-session'

type SavedSession = {
  setId: string
  difficulty?: Difficulty
  exercises: Exercise[]
  currentIndex: number
  userAnswers: Record<string, string | number>
  correctCount: number
  streak: number
  timeRemaining: number | null
  showResults: boolean
}

function loadSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedSession) : null
  } catch {
    return null
  }
}

function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable — nothing to clear
  }
}

export function PracticeMode() {
  const { setId } = useParams<{ setId?: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const difficultyParam = searchParams.get('difficulty')
  const difficulty: Difficulty | undefined =
    difficultyParam === 'easy' || difficultyParam === 'medium' || difficultyParam === 'hard'
      ? difficultyParam
      : undefined

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [streak, setStreak] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Sound effects using Web Audio API
  const playCorrectSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 523.25 // C5 (happy note)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)

      // Add a second note for a chime effect
      setTimeout(() => {
        const osc2 = audioContext.createOscillator()
        const gain2 = audioContext.createGain()
        osc2.connect(gain2)
        gain2.connect(audioContext.destination)
        osc2.frequency.value = 659.25 // E5
        osc2.type = 'sine'
        gain2.gain.setValueAtTime(0.2, audioContext.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        osc2.start(audioContext.currentTime)
        osc2.stop(audioContext.currentTime + 0.2)
      }, 100)
    } catch (error) {
      console.log('Audio not supported')
    }
  }, [])

  const playIncorrectSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 200 // Low, gentle tone
      oscillator.type = 'triangle'

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log('Audio not supported')
    }
  }, [])

  const playAchievementSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Fanfare effect - ascending notes
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          oscillator.frequency.value = freq
          oscillator.type = 'sine'
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.3)
        }, index * 120)
      })
    } catch (error) {
      console.log('Audio not supported')
    }
  }, [])

  // Load exercises, restoring an in-progress session when one exists
  useEffect(() => {
    if (!setId) return

    if (setId === 'quick') {
      // Legacy quick practice: 5 fresh mixed questions every visit
      setExercises(generateNewQuickPractice(5))
      setCurrentIndex(0)
      setUserAnswers({})
      setCorrectCount(0)
      setStreak(0)
      setShowResults(false)
      setTimeRemaining(null)
      return
    }

    const saved = loadSession()
    if (
      saved &&
      !saved.showResults &&
      saved.exercises.length > 0 &&
      saved.setId === setId &&
      (saved.difficulty ?? undefined) === (difficulty ?? undefined)
    ) {
      // Resume the saved session for this exact set + difficulty
      setExercises(saved.exercises)
      setCurrentIndex(saved.currentIndex)
      setUserAnswers(saved.userAnswers)
      setCorrectCount(saved.correctCount)
      setStreak(saved.streak)
      setTimeRemaining(saved.timeRemaining)
      setShowResults(false)
      return
    }

    // No resumable session — start fresh and clear stale state
    setCurrentIndex(0)
    setUserAnswers({})
    setCorrectCount(0)
    setStreak(0)
    setShowResults(false)

    if (setId === 'mix') {
      // 20 random questions across all units at the chosen level
      setExercises(generateNewQuickPractice(20, difficulty))
      setTimeRemaining(null)
      return
    }

    // Static sets (backward compatibility)
    const staticSet = allExerciseSets.find((s) => s.id === setId)
    if (staticSet) {
      setExercises(staticSet.exercises)
      setTimeRemaining(staticSet.timeLimit ?? null)
      return
    }

    // Generated unit sets, optionally filtered by difficulty
    try {
      const unitId = setId.split('-')[0]
      if (getGeneratableUnitIds().includes(unitId)) {
        const generatedSet = generateExerciseSetForUnit(unitId, 50, difficulty)
        setExercises(generatedSet.exercises)
        setTimeRemaining(generatedSet.timeLimit ?? null)
      } else {
        console.warn(`No generator available for unit: ${unitId}`)
        setExercises([])
      }
    } catch (error) {
      console.error('Error generating exercises:', error)
      setExercises([])
    }
  }, [setId, difficulty])

  // Persist the in-progress session so a reload resumes where the kid left off
  useEffect(() => {
    if (!setId || setId === 'quick' || exercises.length === 0) return
    const payload: SavedSession = {
      setId,
      difficulty,
      exercises,
      currentIndex,
      userAnswers,
      correctCount,
      streak,
      timeRemaining,
      showResults,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Storage unavailable (private mode, quota) — practice still works in memory
    }
  }, [setId, difficulty, exercises, currentIndex, userAnswers, correctCount, streak, timeRemaining, showResults])

  // Timer
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || showResults) return
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeRemaining, showResults])

  // Play achievement sound when results show with achievements
  useEffect(() => {
    if (showResults) {
      const percentage = Math.round((correctCount / exercises.length) * 100)
      const newProgress = {
        completedExercises: exercises.map((e) => e.id),
        scores: { [setId || 'quick']: percentage },
        streaks: { current: streak },
        totalPoints: 0,
        lastPractice: new Date().toISOString(),
        timeSpent: {},
      }
      const unlockedAchievements = checkAchievements(newProgress)
      if (unlockedAchievements.length > 0) {
        playAchievementSound()
      }
    }
  }, [showResults, correctCount, exercises.length, setId, streak, playAchievementSound])

  // Reset feedback when changing exercises
  useEffect(() => {
    setShowFeedback(false)
    setWasCorrect(false)
  }, [currentIndex])

  const currentExercise = exercises[currentIndex]
  const isLast = currentIndex === exercises.length - 1

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const checkAnswer = useCallback(() => {
    if (!currentExercise) return

    // Reset feedback state for next question
    setShowFeedback(false)
    setWasCorrect(false)

    if (isLast) {
      setShowResults(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentExercise, isLast])

  // Auto-advance after feedback based on correctness
  useEffect(() => {
    if (!showFeedback) return

    const delay = wasCorrect ? 1 : 5 // 1s if correct, 5s if wrong
    setCountdown(delay)

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Auto-advance timer
    const advanceTimer = setTimeout(() => {
      checkAnswer()
    }, delay * 1000)

    return () => {
      clearTimeout(advanceTimer)
      clearInterval(countdownInterval)
    }
  }, [showFeedback, wasCorrect, checkAnswer])

  const handleInputChange = (value: string) => {
    if (currentExercise && !showFeedback) {
      setUserAnswers((prev) => ({ ...prev, [currentExercise.id]: value }))

      const correct = String(value) === String(currentExercise.correctAnswer)
      setWasCorrect(correct)

      if (correct) {
        setCorrectCount((prev) => prev + 1)
        setStreak((prev) => prev + 1)
        playCorrectSound()
      } else {
        setStreak(0)
        playIncorrectSound()
      }

      setShowFeedback(true)
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
          <button className="btn-primary" onClick={() => { clearSession(); navigate('/practice') }}>
            Back to Practice Zone
          </button>
          <button className="btn-secondary" onClick={() => { clearSession(); window.location.reload() }}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="practice-mode">
      <header className="practice-header">
        <Link to="/practice" className="back-link" onClick={clearSession}>
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
              {currentExercise.options.map((option, idx) => {
                const isSelected = userAnswers[currentExercise.id] === option
                const isCorrect = String(option) === String(currentExercise.correctAnswer)

                // Only show feedback on the selected option
                const showUserFeedback = showFeedback && isSelected
                const showUserCorrect = showUserFeedback && isCorrect
                const showUserIncorrect = showUserFeedback && !isCorrect

                return (
                  <button
                    key={idx}
                    className={`option-btn
                      ${isSelected ? 'selected' : ''}
                      ${showUserCorrect ? 'correct' : ''}
                      ${showUserIncorrect ? 'incorrect' : ''}
                      ${showFeedback ? 'disabled' : ''}
                    `}
                    onClick={() => handleInputChange(option)}
                    disabled={showFeedback}
                  >
                    {option}
                    {showUserCorrect && <span className="feedback-icon">✓</span>}
                    {showUserIncorrect && <span className="feedback-icon">✗</span>}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="no-options-error">
              No options available for this exercise.
            </div>
          )}

          {showFeedback && (
            <div className={`feedback-message ${wasCorrect ? 'correct' : 'incorrect'}`}>
              {wasCorrect ? (
                <span>🎉 Correct! Great job!</span>
              ) : (
                <span>❌ Not quite. Try again next time!</span>
              )}
              <span className="countdown">Next in {countdown}s...</span>
            </div>
          )}

          {currentExercise.hint && !showFeedback && (
            <button
              className="hint-toggle"
              onClick={() => document.querySelector('.hint-text')?.classList.toggle('visible')}
            >
              💡 Need a hint?
            </button>
          )}
          {currentExercise.hint && !showFeedback && (
            <p className="hint-text">{currentExercise.hint}</p>
          )}
        </div>

        <div className="practice-actions">
          {!showFeedback && (
            <button className="btn-skip" onClick={handleSkip}>
              Skip →
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
