import type { Exercise, ExerciseSet, Difficulty } from './types'
import { exerciseSet } from './exerciseBuilders'
import * as generators from './questionGenerators'

// Generator function type - more flexible to match actual generator signatures
type GeneratorFunction = (...args: any[]) => Generator<Exercise>

interface GeneratorConfig {
  unitId: string
  title: string
  description: string
  generators: Array<{
    generator: GeneratorFunction
    count: number
    difficulty: Difficulty
    params?: Record<string, any>
    extraArgs?: any[] // Additional arguments like step: 2
    weight?: number // Relative share when scaling to a target size
  }>
  timeLimit?: number
}

// Restrict a config to the chosen difficulty (exact match), falling back to
// the full config when a unit has no generators of that level.
function configForDifficulty(config: GeneratorConfig, difficulty?: Difficulty): GeneratorConfig {
  if (!difficulty) return config
  const matching = config.generators.filter((g) => g.difficulty === difficulty)
  if (matching.length === 0) return config
  return { ...config, generators: matching }
}

// Clone an exercise for repetition in a padded set: re-shuffle the options
// and give it a fresh id so the repeat feels new and never collides.
function cloneWithShuffledOptions(ex: Exercise, n: number): Exercise {
  const options = ex.options
    ? ex.options
        .map((value) => ({ value, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ value }) => value)
    : ex.options
  return { ...ex, id: `${ex.id}-r${n}`, options }
}

// ───────── UNIT-SPECIFIC GENERATION CONFIGURATIONS ─────────

// 1N1: Numbers to 20
const config1N1: GeneratorConfig = {
  unitId: '1n1',
  title: 'Numbers to 20 Practice',
  description: 'Master counting, comparing, odd/even, and splitting numbers',
  generators: [
    { generator: generators.generateCountingExercises, count: 25, difficulty: 'easy' },
    { generator: generators.generateNumberSequenceExercises, count: 15, difficulty: 'easy' },
    { generator: generators.generateComparisonExercises, count: 15, difficulty: 'medium', params: { maxNumber: 20 } },
    { generator: generators.generateOddEvenExercises, count: 12, difficulty: 'medium', params: { maxNumber: 20 } },
    { generator: generators.generateWordProblems, count: 10, difficulty: 'hard' },
  ],
  timeLimit: 180
}

// 1N2: Basic Addition & Subtraction
const config1N2: GeneratorConfig = {
  unitId: '1n2',
  title: 'Basic + and − Practice',
  description: 'Learn to add, subtract, and understand zero',
  generators: [
    { generator: generators.generateAdditionExercises, count: 20, difficulty: 'easy', params: { maxSum: 10 } },
    { generator: generators.generateSubtractionExercises, count: 20, difficulty: 'easy', params: { maxMinuend: 10 } },
    { generator: generators.generateAdditionExercises, count: 15, difficulty: 'medium', params: { maxSum: 20 } },
    { generator: generators.generateSubtractionExercises, count: 15, difficulty: 'medium', params: { maxMinuend: 20 } },
    { generator: generators.generateWordProblems, count: 15, difficulty: 'medium' },
    { generator: generators.generateThreeAddendsExercises, count: 8, difficulty: 'hard' },
  ],
  timeLimit: 210
}

// 1N3: Numbers to 100
const config1N3: GeneratorConfig = {
  unitId: '1n3',
  title: 'Numbers to 100 Challenge',
  description: 'Tens, ones, skip counting, and estimation',
  generators: [
    { generator: generators.generateSkipCountingExercises, count: 12, difficulty: 'easy', params: { step: 10 } },
    { generator: generators.generateSkipCountingExercises, count: 12, difficulty: 'easy', params: { step: 5 } },
    { generator: generators.generateSkipCountingExercises, count: 10, difficulty: 'medium', params: { step: 2 } },
    { generator: generators.generateComparisonExercises, count: 20, difficulty: 'easy', params: { maxNumber: 100 } },
    { generator: generators.generateOddEvenExercises, count: 15, difficulty: 'medium', params: { maxNumber: 100 } },
    { generator: generators.generateWordProblems, count: 12, difficulty: 'medium' },
  ],
  timeLimit: 240
}

// 1N4: Addition & Subtraction (I)
const config1N4: GeneratorConfig = {
  unitId: '1n4',
  title: 'Bigger + and − Practice',
  description: 'Two-digit operations and checking your work',
  generators: [
    { generator: generators.generateAdditionExercises, count: 25, difficulty: 'medium', params: { maxSum: 100 } },
    { generator: generators.generateSubtractionExercises, count: 25, difficulty: 'medium', params: { maxMinuend: 100 } },
    { generator: generators.generateThreeAddendsExercises, count: 12, difficulty: 'hard' },
    { generator: generators.generateWordProblems, count: 15, difficulty: 'hard' },
  ],
  timeLimit: 240
}

// 1M1: Length (I)
const config1M1: GeneratorConfig = {
  unitId: '1m1',
  title: 'Length Comparison',
  description: 'Comparing objects directly and intuitively',
  generators: [
    { generator: generators.generateComparisonExercises, count: 25, difficulty: 'easy', params: { maxNumber: 20 } },
    { generator: generators.generateWordProblems, count: 20, difficulty: 'medium' },
  ],
  timeLimit: 150
}

// 1M2: Money (I)
const config1M2: GeneratorConfig = {
  unitId: '1m2',
  title: 'Hong Kong Coins',
  description: 'Counting coins and making amounts',
  generators: [
    { generator: generators.generateCoinCountingExercises, count: 30, difficulty: 'easy' },
    { generator: generators.generateCoinCountingExercises, count: 25, difficulty: 'medium' },
    { generator: generators.generateWordProblems, count: 15, difficulty: 'hard' },
  ],
  timeLimit: 180
}

// 1M3: Length (II)
const config1M3: GeneratorConfig = {
  unitId: '1m3',
  title: 'Measuring with cm',
  description: 'Use ruler, estimate, compare lengths',
  generators: [
    { generator: generators.generateComparisonExercises, count: 25, difficulty: 'medium', params: { maxNumber: 100 } },
    { generator: generators.generateWordProblems, count: 20, difficulty: 'medium' },
  ],
  timeLimit: 180
}

// 1M4: Time (I)
const config1M4: GeneratorConfig = {
  unitId: '1m4',
  title: 'Reading Clocks',
  description: "O'clock, half-past, days, months",
  generators: [
    { generator: generators.generateClockExercises, count: 30, difficulty: 'easy' },
    { generator: generators.generateClockExercises, count: 20, difficulty: 'medium' },
    { generator: generators.generateHalfPastExercises, count: 20, difficulty: 'medium' },
  ],
  timeLimit: 180
}

// 1S1: 3-D Shapes
const config1S1: GeneratorConfig = {
  unitId: '1s1',
  title: '3-D Shapes',
  description: 'Identify cubes, cylinders, spheres, cones',
  generators: [
    { generator: generators.generateShape3DExercises, count: 25, difficulty: 'easy' },
    { generator: generators.generateShape3DExercises, count: 25, difficulty: 'medium' },
    { generator: generators.generateWordProblems, count: 10, difficulty: 'hard' },
  ],
  timeLimit: 180
}

// 1S2: 2-D Shapes
const config1S2: GeneratorConfig = {
  unitId: '1s2',
  title: '2-D Shapes',
  description: 'Triangles, squares, rectangles, circles',
  generators: [
    { generator: generators.generateShape2DExercises, count: 30, difficulty: 'easy' },
    { generator: generators.generateShape2DExercises, count: 25, difficulty: 'medium' },
  ],
  timeLimit: 180
}

// 1S3: Directions and Positions
const config1S3: GeneratorConfig = {
  unitId: '1s3',
  title: 'Positions',
  description: 'Over, under, left, right, in front, behind',
  generators: [
    { generator: generators.generatePositionExercises, count: 35, difficulty: 'easy' },
    { generator: generators.generatePositionExercises, count: 20, difficulty: 'medium' },
  ],
  timeLimit: 180
}

// 1F1: Inquiry and Investigation
const config1F1: GeneratorConfig = {
  unitId: '1f1',
  title: 'Math Thinking',
  description: 'Ask questions, explain reasoning, investigate',
  generators: [
    { generator: generators.generateComparisonExercises, count: 20, difficulty: 'medium', params: { maxNumber: 100 } },
    { generator: generators.generateOddEvenExercises, count: 20, difficulty: 'hard', params: { maxNumber: 100 } },
    { generator: generators.generateWordProblems, count: 25, difficulty: 'hard' },
  ],
  timeLimit: 240
}

// Unit generator registry
const UNIT_GENERATORS: Record<string, GeneratorConfig> = {
  '1n1': config1N1,
  '1n2': config1N2,
  '1n3': config1N3,
  '1n4': config1N4,
  '1m1': config1M1,
  '1m2': config1M2,
  '1m3': config1M3,
  '1m4': config1M4,
  '1s1': config1S1,
  '1s2': config1S2,
  '1s3': config1S3,
  '1f1': config1F1,
}

// Build a fresh generator instance for a config entry. Each entry gets a
// unique per-entry seed (so entries never reproduce each other's questions)
// and the right argument order for its signature.
function createGenerator(
  config: GeneratorConfig,
  entry: GeneratorConfig['generators'][number],
  seed: string,
  index: number
): Generator<Exercise> {
  const unitId = config.unitId
  const p = entry.params || {}
  const extra = entry.extraArgs || []
  const entrySeed = `${seed}-${index}`

  if (entry.generator === generators.generateSkipCountingExercises) {
    // Signature: (unitId, step, difficulty, seed, count)
    const step = (p.step as 2 | 5 | 10 | undefined) ?? (extra[0] as 2 | 5 | 10 | undefined) ?? 2
    return entry.generator(unitId, step, entry.difficulty, entrySeed, entry.count)
  }
  if (entry.generator === generators.generateHalfPastExercises || entry.generator === generators.generateThreeAddendsExercises) {
    // Signature: (unitId, seed, count) — no difficulty parameter
    return entry.generator(unitId, entrySeed, entry.count)
  }
  if (entry.generator === generators.generateAdditionExercises) {
    const maxSum = (p.maxSum as number | undefined) ?? (extra[0] as number | undefined) ?? 20
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxSum)
  }
  if (entry.generator === generators.generateSubtractionExercises) {
    const maxMinuend = (p.maxMinuend as number | undefined) ?? (extra[0] as number | undefined) ?? 12
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxMinuend)
  }
  if (entry.generator === generators.generateComparisonExercises || entry.generator === generators.generateOddEvenExercises) {
    const maxNumber = (p.maxNumber as number | undefined) ?? (extra[0] as number | undefined) ?? 20
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxNumber)
  }
  // Standard signature: (unitId, difficulty, seed, count)
  return entry.generator(unitId, entry.difficulty, entrySeed, entry.count)
}

// Generate exercise set from configuration
export function generateExerciseSet(config: GeneratorConfig, seed: string, targetCount?: number): ExerciseSet {
  const exercises: Exercise[] = []

  config.generators.forEach((entry, index) => {
    const gen = createGenerator(config, entry, seed, index)
    // Pull up to `count` exercises from a single generator instance so every
    // yielded question is different (same seed + same count was producing
    // identical duplicates).
    for (let i = 0; i < entry.count; i++) {
      const result = gen.next()
      if (result.done) break
      exercises.push(result.value)
    }
  })

  // Drop repeated questions within the set (e.g. an easy and a medium
  // addition can ask the same sum).
  const seen = new Set<string>()
  const uniqueExercises: Exercise[] = []
  for (const ex of exercises) {
    const key = `${ex.question}||${ex.correctAnswer}`
    if (seen.has(key)) continue
    seen.add(key)
    uniqueExercises.push(ex)
  }

  // Small pools (clocks, shapes) can't fill the requested size with unique
  // questions, so cycle through the pool again with re-shuffled options.
  const goal = targetCount ?? exercises.length
  const finalExercises: Exercise[] = [...uniqueExercises]
  let repeat = 0
  while (finalExercises.length < goal && uniqueExercises.length > 0) {
    repeat++
    const base = uniqueExercises[(repeat - 1) % uniqueExercises.length]
    finalExercises.push(cloneWithShuffledOptions(base, repeat))
  }

  return exerciseSet(
    `${config.unitId}-generated-${seed.substring(0, 8)}`,
    config.unitId,
    config.title,
    config.description,
    finalExercises,
    config.timeLimit
  )
}

// Generate exercise set for specific unit, optionally restricted to a difficulty
export function generateExerciseSetForUnit(unitId: string, count: number = 50, difficulty?: Difficulty): ExerciseSet {
  const config = UNIT_GENERATORS[unitId]
  if (!config) {
    throw new Error(`No generator config found for unit: ${unitId}`)
  }

  const seed = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const targetConfig = configForDifficulty(config, difficulty)

  // Scale generators proportionally to meet requested count
  const totalBaseCount = targetConfig.generators.reduce((sum, g) => sum + g.count * (g.weight ?? 1), 0)
  const scaleFactor = count / Math.max(1, totalBaseCount)

  const scaledConfig: GeneratorConfig = {
    ...targetConfig,
    generators: targetConfig.generators.map(g => ({
      ...g,
      count: Math.max(5, Math.ceil(g.count * (g.weight ?? 1) * scaleFactor)) // Minimum 5 per generator
    }))
  }

  return generateExerciseSet(scaledConfig, seed, count)
}

// Generate quick practice with mixed units
export function generateQuickPractice(count: number = 5, units?: string[]): Exercise[] {
  const targetUnits = units || Object.keys(UNIT_GENERATORS)
  const exercises: Exercise[] = []

  // Distribute across requested units
  const perUnit = Math.ceil(count / targetUnits.length)

  for (const unitId of targetUnits) {
    if (exercises.length >= count) break

    try {
      const set = generateExerciseSetForUnit(unitId, Math.min(perUnit, count - exercises.length))
      exercises.push(...set.exercises.slice(0, count - exercises.length))
    } catch (error) {
      console.warn(`Could not generate exercises for unit: ${unitId}`, error)
    }
  }

  // Shuffle exercises for variety
  const shuffled = exercises.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get all unit IDs that have generators
export function getGeneratableUnitIds(): string[] {
  return Object.keys(UNIT_GENERATORS)
}

// Get generator config for unit (useful for UI display)
export function getUnitGeneratorConfig(unitId: string): GeneratorConfig | undefined {
  return UNIT_GENERATORS[unitId]
}

// Estimate total possible unique questions per unit (each generator type
// counts once, using its conservative capacity estimate)
export function estimateUnitQuestionCapacity(unitId: string): number {
  const config = UNIT_GENERATORS[unitId]
  if (!config) return 0

  const seen = new Set<string>()
  let total = 0
  for (const gen of config.generators) {
    const name = gen.generator.name
    if (seen.has(name)) continue
    seen.add(name)
    total += generators.CAPACITY_BY_NAME[name] ?? 100
  }
  return total
}

// Total unique questions across all units
export function getTotalQuestionCapacity(): number {
  return Object.keys(UNIT_GENERATORS).reduce((sum, unitId) => sum + estimateUnitQuestionCapacity(unitId), 0)
}

export { UNIT_GENERATORS, config1N1, config1N2, config1N3, config1N4,
         config1M1, config1M2, config1M3, config1M4,
         config1S1, config1S2, config1S3, config1F1 }