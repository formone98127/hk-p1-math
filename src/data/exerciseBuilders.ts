import type { Exercise, ExerciseSet, ExerciseType, Difficulty } from './types'

// Exercise builder functions
export function exercise(
  id: string,
  type: ExerciseType,
  difficulty: Difficulty,
  unitId: string,
  question: string,
  correctAnswer: string | number,
  options?: string[],
  hint?: string,
  explanation?: string,
  points: number = 10,
): Exercise {
  return {
    id,
    type,
    difficulty,
    unitId,
    question,
    options,
    correctAnswer,
    hint,
    explanation,
    points,
  }
}

// Multiple choice with shuffled wrong answers
export function multipleChoice(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: string,
  wrongAnswers: string[],
  difficulty: Difficulty = 'easy',
  hint?: string,
  explanation?: string,
): Exercise {
  // Add correct answer and 3 wrong answers, then shuffle
  const allOptions = [...wrongAnswers.slice(0, 3), correctAnswer]
    .map((value) => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value)

  return exercise(
    id,
    'multipleChoice',
    difficulty,
    unitId,
    question,
    correctAnswer,
    allOptions,
    hint,
    explanation,
  )
}

// Fill in the blank
export function fillBlank(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: string,
  difficulty: Difficulty = 'medium',
  hint?: string,
  explanation?: string,
): Exercise {
  return exercise(
    id,
    'fillBlank',
    difficulty,
    unitId,
    question,
    correctAnswer,
    undefined,
    hint,
    explanation,
  )
}

// Calculation (numeric answer)
export function calculation(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: number,
  difficulty: Difficulty = 'medium',
  hint?: string,
  explanation?: string,
): Exercise {
  return exercise(
    id,
    'calculation',
    difficulty,
    unitId,
    question,
    correctAnswer,
    undefined,
    hint,
    explanation,
  )
}

// Word problem with context
export function wordProblem(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: number | string,
  difficulty: Difficulty = 'hard',
  hint?: string,
  explanation?: string,
): Exercise {
  // For word problems with numeric answers, convert to number
  const numericAnswer = typeof correctAnswer === 'string' && !isNaN(Number(correctAnswer))
    ? Number(correctAnswer)
    : correctAnswer

  return exercise(
    id,
    'wordProblem',
    difficulty,
    unitId,
    question,
    numericAnswer,
    undefined,
    hint,
    explanation,
     )
}

// Create exercise set with metadata
export function exerciseSet(
  id: string,
  unitId: string,
  title: string,
  description: string,
  exercises: Exercise[],
  timeLimit?: number,
  prerequisites?: string[],
): ExerciseSet {
  const totalPoints = exercises.reduce((sum, ex) => sum + ex.points, 0)
  return {
    id,
    unitId,
    title,
    description,
    exercises,
    totalPoints,
    timeLimit,
    prerequisites,
  }
}

export type { Exercise, ExerciseSet }
