import { describe, it, expect } from 'vitest'
import {
  getGeneratableUnitIds,
  generateExerciseSetForUnit,
  generateQuickPractice,
  estimateUnitQuestionCapacity,
  getTotalQuestionCapacity,
} from './exerciseSetGenerators'
import type { Exercise } from './types'

function questionKey(ex: Exercise): string {
  return `${ex.question}||${ex.correctAnswer}`
}

describe('generated question database', () => {
  it('supports 1000+ unique questions across all units', () => {
    const seen = new Set<string>()
    for (const unitId of getGeneratableUnitIds()) {
      for (let i = 0; i < 5; i++) {
        const set = generateExerciseSetForUnit(unitId, 60)
        set.exercises.forEach((ex) => seen.add(questionKey(ex)))
      }
    }
    expect(seen.size).toBeGreaterThanOrEqual(1000)
  })

  it('every unit produces a full-length set with unique ids', () => {
    for (const unitId of getGeneratableUnitIds()) {
      const set = generateExerciseSetForUnit(unitId, 50)
      expect(set.exercises.length, unitId).toBeGreaterThanOrEqual(50)
      const ids = new Set(set.exercises.map((e) => e.id))
      expect(ids.size, unitId).toBe(set.exercises.length)
    }
  })

  it('every question has 4 distinct options and includes the correct answer', () => {
    for (const unitId of getGeneratableUnitIds()) {
      const set = generateExerciseSetForUnit(unitId, 30)
      for (const ex of set.exercises) {
        expect(ex.options, `${unitId}: ${ex.question}`).toBeDefined()
        expect(ex.options!.length, `${unitId}: ${ex.question}`).toBe(4)
        expect(new Set(ex.options).size, `${unitId}: ${ex.question}`).toBe(4)
        expect(ex.options, `${unitId}: ${ex.question}`).toContain(String(ex.correctAnswer))
      }
    }
  })

  it('difficulty selection filters questions to that level when available', () => {
    const easy = generateExerciseSetForUnit('1n2', 30, 'easy')
    expect(easy.exercises.length).toBeGreaterThanOrEqual(30)
    expect(easy.exercises.every((ex) => ex.difficulty === 'easy')).toBe(true)

    const hard = generateExerciseSetForUnit('1n4', 30, 'hard')
    expect(hard.exercises.length).toBeGreaterThanOrEqual(30)
    expect(hard.exercises.every((ex) => ex.difficulty === 'hard')).toBe(true)
  })

  it('units without a matching difficulty fall back to mixed levels', () => {
    // 1F1 has no easy generators — requesting easy must still produce a set
    const set = generateExerciseSetForUnit('1f1', 20, 'easy')
    expect(set.exercises.length).toBeGreaterThanOrEqual(20)
  })

  it('quick practice returns the requested number of unique questions', () => {
    const quick = generateQuickPractice(5)
    expect(quick.length).toBe(5)
    expect(new Set(quick.map((e) => e.id)).size).toBe(5)
  })

  it('capacity estimates stay above the 1000+ total', () => {
    const total = getTotalQuestionCapacity()
    expect(total).toBeGreaterThanOrEqual(1000)
    for (const unitId of getGeneratableUnitIds()) {
      expect(estimateUnitQuestionCapacity(unitId), unitId).toBeGreaterThan(0)
    }
  })
})
