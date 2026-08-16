import type { Exercise, ExerciseSet, ExerciseType, Difficulty } from './types'
import type { Locale } from '../i18n/locale'

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
  locale: Locale = 'en',
): Exercise {
  // Deduplicate wrong answers against the correct answer and each other
  // (generators sometimes produce overlapping distractors), then top up
  // with generic distractors so every question has 3 distinct wrong options.
  const correctStr = String(correctAnswer)
  const seen = new Set<string>([correctStr])
  const wrongs: string[] = []
  for (const wrong of wrongAnswers) {
    const key = String(wrong)
    if (key === correctStr || seen.has(key)) continue
    seen.add(key)
    wrongs.push(key)
    if (wrongs.length >= 3) break
  }
  // Top up with distractors derived from the correct answer (numeric first,
  // then generic words) so a pad never looks like a random '0' or '1'.
  const num = Number(correctStr)
  if (!isNaN(num)) {
    for (const offset of [1, 2, 3, -1, -2, 5]) {
      if (wrongs.length >= 3) break
      const candidate = String(Math.max(0, num + offset))
      if (seen.has(candidate)) continue
      seen.add(candidate)
      wrongs.push(candidate)
    }
  }
  const fallbacks =
    locale === 'zh-Hant'
      ? ['是', '否', '或者', '一樣', '不知道']
      : ['yes', 'no', 'maybe', 'same', "don't know"]
  for (const fallback of fallbacks) {
    if (wrongs.length >= 3) break
    if (seen.has(fallback)) continue
    seen.add(fallback)
    wrongs.push(fallback)
  }

  // Add correct answer and wrong answers, then shuffle
  const allOptions = [...wrongs, correctStr]
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

// Generate wrong answers for numeric questions
function generateNumericWrongs(correct: number, difficulty: Difficulty): string[] {
  const wrongs: string[] = []
  const offset = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3

  // Add/subtract small amounts
  wrongs.push(String(correct + offset))
  wrongs.push(String(correct - offset >= 0 ? correct - offset : correct + offset + 1))

  // Add a different wrong answer based on difficulty
  if (difficulty === 'easy') {
    wrongs.push(String(correct + 2))
  } else if (difficulty === 'medium') {
    wrongs.push(String(correct * 2))
  } else {
    wrongs.push(String(Math.floor(correct / 2)))
  }

  return [...new Set(wrongs)].slice(0, 3)
}

// Generate wrong answers for text questions
function generateTextWrongs(correct: string, context?: string): string[] {
  const wrongs: string[] = []

  // Common variations based on question context
  if (context?.includes('long') || context?.includes('big')) {
    wrongs.push('short', 'same', 'medium')
  } else if (context?.includes('small') || context?.includes('little')) {
    wrongs.push('big', 'same', 'large')
  } else if (correct === 'yes') {
    wrongs.push('no', 'maybe', 'sometimes')
  } else if (correct === 'no') {
    wrongs.push('yes', 'maybe', 'always')
  } else if (correct.includes('odd')) {
    wrongs.push('even', 'both', 'neither')
  } else if (correct.includes('even')) {
    wrongs.push('odd', 'both', 'neither')
  } else if (correct.includes('left')) {
    wrongs.push('right', 'up', 'down')
  } else if (correct.includes('right')) {
    wrongs.push('left', 'up', 'down')
  } else {
    // Generic wrong answers
    wrongs.push('zero', 'one', 'two')
  }

  return wrongs.slice(0, 3)
}

// Fill in the blank - now with auto-generated options
export function fillBlank(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: string,
  difficulty: Difficulty = 'medium',
  hint?: string,
  explanation?: string,
): Exercise {
  // Generate options based on answer type
  let wrongAnswers: string[] = []

  if (!isNaN(Number(correctAnswer))) {
    wrongAnswers = generateNumericWrongs(Number(correctAnswer), difficulty)
  } else {
    wrongAnswers = generateTextWrongs(correctAnswer, question)
  }

  return multipleChoice(id, unitId, question, correctAnswer, wrongAnswers, difficulty, hint, explanation)
}

// Calculation - now with auto-generated multiple choice
export function calculation(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: number,
  difficulty: Difficulty = 'medium',
  hint?: string,
  explanation?: string,
): Exercise {
  const wrongAnswers = generateNumericWrongs(correctAnswer, difficulty)
  return multipleChoice(id, unitId, question, String(correctAnswer), wrongAnswers, difficulty, hint, explanation)
}

// Word problem - now with auto-generated multiple choice
export function wordProblem(
  id: string,
  unitId: string,
  question: string,
  correctAnswer: number | string,
  difficulty: Difficulty = 'hard',
  hint?: string,
  explanation?: string,
): Exercise {
  const answerStr = String(correctAnswer)
  let wrongAnswers: string[] = []

  if (!isNaN(Number(correctAnswer))) {
    wrongAnswers = generateNumericWrongs(Number(correctAnswer), difficulty)
  } else {
    wrongAnswers = generateTextWrongs(answerStr, question)
  }

  return multipleChoice(id, unitId, question, answerStr, wrongAnswers, difficulty, hint, explanation)
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
