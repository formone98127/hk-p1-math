import type { Exercise, ExerciseSet, Difficulty } from './types'
import { exerciseSet } from './exerciseBuilders'
import * as generators from './questionGenerators'
import type { Locale } from '../i18n/locale'

// Generator function type - more flexible to match actual generator signatures
type GeneratorFunction = (...args: any[]) => Generator<Exercise>

interface GeneratorConfig {
  unitId: string
  title: string
  description: string
  titleZh?: string // Traditional Chinese card title
  descriptionZh?: string // Traditional Chinese card description
  locale?: Locale
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
  titleZh: '20以內的數 練習',
  descriptionZh: '掌握數數、比較、單雙數和拆分數',
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
  titleZh: '基本加法和減法 練習',
  descriptionZh: '學習加減法和認識零',
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
  titleZh: '100以內的數 挑戰',
  descriptionZh: '十位個位、跳數和估算',
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
  titleZh: '進階加法和減法 練習',
  descriptionZh: '兩位數加減和驗算',
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
  titleZh: '長度比較',
  descriptionZh: '直接直觀地比較物件',
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
  titleZh: '香港硬幣',
  descriptionZh: '數硬幣和計算金額',
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
  titleZh: '用厘米量度',
  descriptionZh: '用間尺量度、估算和比較長度',
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
  titleZh: '閱讀時鐘',
  descriptionZh: '整點、半時、星期和月份',
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
  titleZh: '立體圖形',
  descriptionZh: '認識立方體、圓柱體、球體和圓錐體',
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
  titleZh: '平面圖形',
  descriptionZh: '三角形、正方形、長方形和圓形',
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
  titleZh: '位置',
  descriptionZh: '上、下、左、右、前、後',
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
  titleZh: '數學思維',
  descriptionZh: '提出問題、說明理由和探究',
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
  const locale = config.locale ?? 'en'

  if (entry.generator === generators.generateSkipCountingExercises) {
    // Signature: (unitId, step, difficulty, seed, count, locale)
    const step = (p.step as 2 | 5 | 10 | undefined) ?? (extra[0] as 2 | 5 | 10 | undefined) ?? 2
    return entry.generator(unitId, step, entry.difficulty, entrySeed, entry.count, locale)
  }
  if (entry.generator === generators.generateHalfPastExercises || entry.generator === generators.generateThreeAddendsExercises) {
    // Signature: (unitId, seed, count, locale) — no difficulty parameter
    return entry.generator(unitId, entrySeed, entry.count, locale)
  }
  if (entry.generator === generators.generateAdditionExercises) {
    const maxSum = (p.maxSum as number | undefined) ?? (extra[0] as number | undefined) ?? 20
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxSum, locale)
  }
  if (entry.generator === generators.generateSubtractionExercises) {
    const maxMinuend = (p.maxMinuend as number | undefined) ?? (extra[0] as number | undefined) ?? 12
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxMinuend, locale)
  }
  if (entry.generator === generators.generateComparisonExercises || entry.generator === generators.generateOddEvenExercises) {
    const maxNumber = (p.maxNumber as number | undefined) ?? (extra[0] as number | undefined) ?? 20
    return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, maxNumber, locale)
  }
  // Standard signature: (unitId, difficulty, seed, count, locale)
  return entry.generator(unitId, entry.difficulty, entrySeed, entry.count, locale)
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

  // Size the set to the requested count: trim when the pool is bigger,
  // and cycle through the pool with re-shuffled options when it's smaller
  // (clocks, shapes, etc. can't fill the request with unique questions).
  const locale = config.locale ?? 'en'
  const title = locale === 'zh-Hant' ? (config.titleZh ?? config.title) : config.title
  const description = locale === 'zh-Hant' ? (config.descriptionZh ?? config.description) : config.description
  const goal = targetCount ?? exercises.length
  let finalExercises: Exercise[]
  if (uniqueExercises.length >= goal) {
    // Random spread rather than a prefix so repeated sessions vary
    finalExercises = uniqueExercises.sort(() => Math.random() - 0.5).slice(0, goal)
  } else {
    finalExercises = [...uniqueExercises]
    let repeat = 0
    while (finalExercises.length < goal && uniqueExercises.length > 0) {
      repeat++
      const base = uniqueExercises[(repeat - 1) % uniqueExercises.length]
      finalExercises.push(cloneWithShuffledOptions(base, repeat))
    }
  }

  return exerciseSet(
    `${config.unitId}-generated-${seed.substring(0, 8)}`,
    config.unitId,
    title,
    description,
    finalExercises,
    config.timeLimit
  )
}

// Generate exercise set for specific unit, optionally restricted to a difficulty
// and localized into Traditional Chinese or English.
export function generateExerciseSetForUnit(unitId: string, count: number = 50, difficulty?: Difficulty, locale?: Locale): ExerciseSet {
  const config = UNIT_GENERATORS[unitId]
  if (!config) {
    throw new Error(`No generator config found for unit: ${unitId}`)
  }

  const seed = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const targetConfig: GeneratorConfig = {
    ...configForDifficulty(config, difficulty),
    locale: locale ?? config.locale ?? 'en',
  }

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

// Does this unit have generators at the given difficulty?
export function unitHasDifficulty(unitId: string, difficulty?: Difficulty): boolean {
  const config = UNIT_GENERATORS[unitId]
  if (!config) return false
  if (!difficulty) return true
  return config.generators.some((g) => g.difficulty === difficulty)
}

// Generate mixed practice drawn from all (or selected) units, optionally
// restricted to a single difficulty level and localized.
export function generateQuickPractice(count: number = 5, difficulty?: Difficulty, units?: string[], locale?: Locale): Exercise[] {
  let targetUnits = (units || Object.keys(UNIT_GENERATORS)).filter((u) => unitHasDifficulty(u, difficulty))

  // If no unit offers that level, fall back to an unfiltered mix
  if (targetUnits.length === 0) {
    targetUnits = units || Object.keys(UNIT_GENERATORS)
  }

  // Rotate which units lead each session so every unit gets fair coverage
  targetUnits = targetUnits.sort(() => Math.random() - 0.5)

  const exercises: Exercise[] = []

  // Distribute across requested units
  const perUnit = Math.ceil(count / targetUnits.length)

  for (const unitId of targetUnits) {
    if (exercises.length >= count) break

    try {
      const set = generateExerciseSetForUnit(unitId, Math.min(perUnit, count - exercises.length), difficulty, locale)
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