import type { Exercise, Difficulty } from './types'
import {
  multipleChoice,
  fillBlank,
} from './exerciseBuilders'
import { SeededRandom, generateExerciseId, createSessionSeed } from './randomUtils'

// Utility to create seeded random instance
function createRandom(seed?: string): SeededRandom {
  const numericSeed = seed ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : Date.now()
  return new SeededRandom(numericSeed)
}

// ───────── COUNTING EXERCISE GENERATORS ─────────

export function* generateCountingExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20
): Generator<Exercise> {
  const random = createRandom(seed)
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 5, max: 15 },
    hard: { min: 10, max: 20 }
  }

  const { min, max } = ranges[difficulty]
  const usedCounts = new Set<number>()

  for (let i = 0; i < count; i++) {
    let dotCount: number
    let attempts = 0

    // Ensure unique counts
    do {
      dotCount = random.nextInt(min, max)
      attempts++
    } while (usedCounts.has(dotCount) && attempts < 50)

    if (attempts >= 50) break // Can't generate more unique values
    usedCounts.add(dotCount)

    const dots = '●'.repeat(dotCount)
    const wrongAnswers = [
      String(random.nextInt(min, max)),
      String(dotCount + random.nextInt(1, 3)),
      String(Math.max(min, dotCount - random.nextInt(1, 3)))
    ].filter(a => a !== String(dotCount))

    yield multipleChoice(
      generateExerciseId(unitId, 'count', seed, i),
      unitId,
      `How many dots? ${dots}`,
      String(dotCount),
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

export function* generateNumberSequenceExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15
): Generator<Exercise> {
  const random = createRandom(seed + '-seq')
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 5, max: 15 },
    hard: { min: 10, max: 20 }
  }

  for (let i = 0; i < count; i++) {
    const { min, max } = ranges[difficulty]
    const target = random.nextInt(min, max)
    const questionTypes = ['next', 'before', 'between']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'next') {
      question = `What comes after ${target}?`
      correctAnswer = String(target + 1)
      wrongAnswers = [
        String(target - 1 >= 0 ? target - 1 : target + 2),
        String(target + 2),
        String(target)
      ].filter(a => a !== correctAnswer && !isNaN(Number(a)) && Number(a) >= 0)
    } else if (qType === 'before') {
      question = `What comes before ${target}?`
      correctAnswer = String(Math.max(0, target - 1))
      wrongAnswers = [
        String(target + 1),
        String(Math.max(0, target - 2)),
        String(target)
      ].filter(a => a !== correctAnswer && !isNaN(Number(a)) && Number(a) >= 0)
    } else {
      const lower = target - 1
      const upper = target + 1
      question = `What number is between ${lower} and ${upper}?`
      correctAnswer = String(target)
      wrongAnswers = [
        String(lower),
        String(upper),
        String(target + 2)
      ].filter(a => a !== correctAnswer)
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'sequence', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

// ───────── ARITHMETIC EXERCISE GENERATORS ─────────

export function* generateAdditionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20,
  maxSum: number = 20
): Generator<Exercise> {
  const random = createRandom(seed + '-add')

  // Scale operand ranges relative to maxSum so small units stay small
  // while bigger units (e.g. 1N4, maxSum 100) get two-digit problems.
  const operandMax = {
    easy: Math.max(5, Math.floor(maxSum * 0.25)),
    medium: Math.max(8, Math.floor(maxSum * 0.4)),
    hard: Math.max(10, Math.floor(maxSum * 0.6)),
  }
  const operandMin = {
    easy: 1,
    medium: 2,
    hard: Math.max(4, Math.floor(maxSum * 0.2)),
  }

  for (let i = 0; i < count; i++) {
    // b is chosen so the sum always stays within maxSum
    const a = random.nextInt(operandMin[difficulty], Math.min(operandMax[difficulty], maxSum - 1))
    const b = random.nextInt(1, Math.max(1, maxSum - a))

    const correct = a + b
    const question = `${a} + ${b} = ?`

    yield multipleChoice(
      generateExerciseId(unitId, 'addition', seed, i),
      unitId,
      question,
      String(correct),
      [String(correct + random.nextInt(1, 3)), String(Math.max(0, correct - random.nextInt(1, 3))), String(correct + random.nextInt(2, 5))],
      difficulty
    )
  }
}

export function* generateSubtractionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20,
  maxMinuend: number = 12
): Generator<Exercise> {
  const random = createRandom(seed + '-sub')

  // Scale the minuend range relative to maxMinuend so bigger units
  // (e.g. 1N4, maxMinuend 100) get two-digit problems.
  const minuendMax = {
    easy: Math.max(7, Math.floor(maxMinuend * 0.6)),
    medium: Math.max(10, Math.floor(maxMinuend * 0.75)),
    hard: Math.max(12, Math.floor(maxMinuend * 0.9)),
  }
  const minuendMin = {
    easy: 3,
    medium: 5,
    hard: Math.max(5, Math.floor(maxMinuend * 0.4)),
  }

  for (let i = 0; i < count; i++) {
    const a = random.nextInt(minuendMin[difficulty], minuendMax[difficulty])
    // Subtrahend is always smaller than the minuend: no negatives, no zero
    const b = random.nextInt(1, Math.max(1, a - 1))

    const correct = a - b
    const question = `${a} − ${b} = ?`

    yield multipleChoice(
      generateExerciseId(unitId, 'subtraction', seed, i),
      unitId,
      question,
      String(correct),
      [String(correct + random.nextInt(1, 3)), String(Math.max(0, correct - random.nextInt(1, 2))), String(correct + random.nextInt(2, 4))],
      difficulty
    )
  }
}

export function* generateThreeAddendsExercises(
  unitId: string,
  seed: string = createSessionSeed(),
  count: number = 10
): Generator<Exercise> {
  const random = createRandom(seed + '-three')

  for (let i = 0; i < count; i++) {
    const a = random.nextInt(2, 6)
    const b = random.nextInt(2, 6)
    const c = random.nextInt(2, 6)
    const correct = a + b + c

    yield multipleChoice(
      generateExerciseId(unitId, 'three-addends', seed, i),
      unitId,
      `${a} + ${b} + ${c} = ?`,
      String(correct),
      [String(correct + random.nextInt(1, 3)), String(Math.max(0, correct - random.nextInt(1, 2))), String(correct + random.nextInt(2, 4))],
      'hard'
    )
  }
}

// ───────── COMPARISON EXERCISE GENERATORS ─────────

export function* generateComparisonExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  maxNumber: number = 20
): Generator<Exercise> {
  const random = createRandom(seed + '-compare')

  // Scale the number range toward maxNumber so 1N1 (max 20) stays small
  // while 1N3 (max 100) reaches into the tens.
  const rangeMax = {
    easy: Math.max(10, Math.floor(maxNumber * 0.5)),
    medium: Math.max(15, Math.floor(maxNumber * 0.75)),
    hard: Math.max(20, maxNumber),
  }
  const rangeMin = { easy: 1, medium: 5, hard: 10 }

  for (let i = 0; i < count; i++) {
    const min = rangeMin[difficulty]
    const max = rangeMax[difficulty]
    const a = random.nextInt(min, max)
    const b = random.nextInt(min, max)

    const questionTypes = ['bigger', 'smaller', 'compare']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'bigger') {
      question = `Which number is bigger: ${a} or ${b}?`
      correctAnswer = String(a > b ? a : b)
      wrongAnswers = [
        String(a < b ? a : b),
        a === b ? 'Same' : String(a)
      ].filter(a => a !== correctAnswer)
    } else if (qType === 'smaller') {
      question = `Which number is smaller: ${a} or ${b}?`
      correctAnswer = String(a < b ? a : b)
      wrongAnswers = [
        String(a > b ? a : b),
        a === b ? 'Same' : String(b)
      ].filter(a => a !== correctAnswer)
    } else {
      const symbol = a < b ? '<' : a > b ? '>' : '='
      question = `Is ${a} ${symbol} ${b}?`
      correctAnswer = 'yes'
      wrongAnswers = ['no', 'Same', a === b ? 'yes' : 'no']
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'comparison', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

export function* generateOddEvenExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  maxNumber: number = 20
): Generator<Exercise> {
  const random = createRandom(seed + '-oddeven')

  const rangeMax = {
    easy: Math.max(10, Math.floor(maxNumber * 0.5)),
    medium: Math.max(15, Math.floor(maxNumber * 0.75)),
    hard: Math.max(20, maxNumber),
  }
  const rangeMin = { easy: 1, medium: 5, hard: 10 }

  for (let i = 0; i < count; i++) {
    const min = rangeMin[difficulty]
    const max = rangeMax[difficulty]
    const target = random.nextInt(min, max)
    const isEven = target % 2 === 0
    const questionTypes = ['identify', 'which', 'property']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'identify') {
      question = `Is ${target} odd or even?`
      correctAnswer = isEven ? 'even' : 'odd'
      wrongAnswers = [isEven ? 'odd' : 'even', 'both', 'neither']
    } else if (qType === 'which') {
      // Distractors are always the opposite parity so the question stays unambiguous
      const wrongs = [target + 1, target - 1 >= 1 ? target - 1 : target + 3]
      question = `Which ${isEven ? 'even' : 'odd'} number? ${[target, ...wrongs].join(', ')}`
      correctAnswer = String(target)
      wrongAnswers = wrongs.map(String)
    } else {
      question = `Can ${target} be split into two equal groups?`
      correctAnswer = isEven ? 'yes' : 'no'
      wrongAnswers = [isEven ? 'no' : 'yes', 'maybe', 'sometimes']
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'oddeven', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

// ───────── SKIP COUNTING EXERCISE GENERATORS ─────────

export function* generateSkipCountingExercises(
  unitId: string,
  step: 2 | 5 | 10,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12
): Generator<Exercise> {
  const random = createRandom(seed + `-skip${step}`)

  for (let i = 0; i < count; i++) {
    const ranges = {
      easy: { start: [0, 2, 5, 10], length: 4 },
      medium: { start: [0, 2, 5, 10], length: 5 },
      hard: { start: [1, 3, 6, 12], length: 6 }
    }

    const { start: startOptions, length } = ranges[difficulty]
    const start = random.nextArray(startOptions)
    const sequence = Array.from({ length: length + 2 }, (_, i) => start + i * step)
    const missingIndex = random.nextInt(2, sequence.length - 2)
    const missing = sequence[missingIndex]
    const displaySequence = sequence.map((n, idx) => idx === missingIndex ? '____' : String(n))

    yield fillBlank(
      generateExerciseId(unitId, `skip${step}`, seed, i),
      unitId,
      `${displaySequence.join(', ')}`,
      String(missing),
      difficulty,
      `Count by ${step}s`
    )
  }
}

// ───────── WORD PROBLEM GENERATORS ─────────

const WORD_PROBLEM_TEMPLATES: Record<string, string[]> = {
  addition: [
    "You have {a} {item}. Get {b} more. How many?",
    "There are {a} {item} and {b} {item2}. Total?",
    "{name} has {a}. {name2} gives {b}. How many now?",
    "{name} found {a} {item}. Then found {b} more. Total?",
    "Put {a} {item} in the box. Add {b} more. How many?"
  ],
  subtraction: [
    "You have {a} {item}. Give {b} away. Left?",
    "{a} {item} on {place}. {b} {action}. How many?",
    "Start with {a}. {action} {b}. What's left?",
    "{name} has {a} {item}. Loses {b}. How many now?",
    "Take {b} away from {a}. What remains?"
  ],
  comparison: [
    "{nameA} has {a} {item}. {nameB} has {b} {item}. Who has more?",
    "Which is more: {a} or {b}?",
    "{nameA} has {a}. {nameB} has {b}. Who has less?"
  ]
}

const ITEMS = ['apples', 'stickers', 'balls', 'books', 'cookies', 'pencils', 'toys', 'marbles']
const NAMES = ['Tom', 'Mary', 'John', 'Amy', 'Ben', 'Lisa', 'Mike', 'Sarah']
const NAMES2 = ['Sam', 'Emma', 'Jack', 'Kate', 'Leo', 'Mia']
const ITEMS2 = ['oranges', 'cards', 'games', 'stories', 'candies', 'pens']
const PLACES = ['tree', 'table', 'bag', 'box', 'shelf', 'desk']
const ACTIONS = ['fly away', 'roll away', 'fall off', 'get taken']

export function* generateWordProblems(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15
): Generator<Exercise> {
  const random = createRandom(seed + '-word')
  const ranges = {
    easy: { min: 1, max: 8 },
    medium: { min: 3, max: 12 },
    hard: { min: 5, max: 20 }
  }

  for (let i = 0; i < count; i++) {
    const { min, max } = ranges[difficulty]
    const a = random.nextInt(min, max)
    let b = random.nextInt(min, Math.min(max, a)) // For subtraction, b should be <= a

    const problemTypes: Array<'addition' | 'subtraction' | 'comparison'> = ['addition', 'subtraction', 'comparison']
    const problemType = random.nextArray(problemTypes)
    const templates = WORD_PROBLEM_TEMPLATES[problemType]
    const template = random.nextArray(templates)

    // Comparison questions need distinct values so 'Same' is never the answer
    if (problemType === 'comparison' && a === b) {
      b = Math.max(1, a - 1)
    }

    // Comparison questions pin the names so the answer is deterministic
    let question = problemType === 'comparison'
      ? template.split('{nameA}').join('Tom').split('{nameB}').join('Sam')
      : template
    // Replace every occurrence (some templates use a placeholder twice)
    const fill = (key: string, value: string) => {
      question = question.split(key).join(value)
    }
    fill('{a}', String(a))
    fill('{b}', String(b))
    fill('{item}', random.nextArray(ITEMS))
    fill('{item2}', random.nextArray(ITEMS2))
    fill('{name}', random.nextArray(NAMES))
    fill('{name2}', random.nextArray(NAMES2))
    fill('{nameA}', random.nextArray(NAMES))
    fill('{nameB}', random.nextArray(NAMES2))
    fill('{place}', random.nextArray(PLACES))
    fill('{action}', random.nextArray(ACTIONS))

    let correctAnswer: number | string
    let wrongAnswers: (string | number)[]
    if (problemType === 'addition') {
      correctAnswer = a + b
      wrongAnswers = [
        Number(correctAnswer) + random.nextInt(1, 3),
        Math.max(0, Number(correctAnswer) - random.nextInt(1, 2)),
        Number(correctAnswer) + random.nextInt(2, 4),
      ]
    } else if (problemType === 'subtraction') {
      correctAnswer = a - b
      wrongAnswers = [
        Number(correctAnswer) + random.nextInt(1, 3),
        Math.max(0, Number(correctAnswer) - random.nextInt(1, 2)),
        Number(correctAnswer) + random.nextInt(2, 4),
      ]
    } else {
      if (template.includes('Which is more')) {
        correctAnswer = String(Math.max(a, b))
        wrongAnswers = [String(Math.min(a, b)), 'Same', String(Math.max(a, b) + random.nextInt(1, 3))]
      } else {
        correctAnswer = a > b ? 'Tom' : 'Sam'
        wrongAnswers = random.nextSubset([...NAMES, ...NAMES2, 'Same'].filter(n => n !== String(correctAnswer)), 3)
      }
    }

    const optioned = multipleChoice(
      generateExerciseId(unitId, 'wordprob', seed, i),
      unitId,
      question,
      String(correctAnswer),
      wrongAnswers.map(String),
      difficulty
    )
    // Keep the word-problem type (exercises are still rendered as multiple choice)
    yield { ...optioned, type: 'wordProblem' as const }
  }
}

// ───────── CLOCK READING GENERATORS ─────────

export function* generateClockExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12
): Generator<Exercise> {
  const random = createRandom(seed + '-clock')

  for (let i = 0; i < count; i++) {
    const hour = random.nextInt(1, 12)
    const questionTypes = ['oclock', 'hand']
    const qType = difficulty === 'easy' ? 'oclock' : random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'oclock') {
      question = `Hour hand at ${hour} shows what time?`
      correctAnswer = `${hour}:00`
      wrongAnswers = [
        `${random.nextInt(1, 12)}:00`,
        `${Math.max(1, hour - 1)}:00`,
        `${Math.min(12, hour + 1)}:00`
      ]
    } else {
      question = `Where does the hour hand point for ${hour}:00?`
      correctAnswer = `at ${hour}`
      wrongAnswers = ['at ' + random.nextInt(1, 12), 'between ' + random.nextInt(1, 11), 'past ' + random.nextInt(1, 12)]
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'clock', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

export function* generateHalfPastExercises(
  unitId: string,
  seed: string = createSessionSeed(),
  count: number = 8
): Generator<Exercise> {
  const random = createRandom(seed + '-half')

  for (let i = 0; i < count; i++) {
    const hour = random.nextInt(1, 12)
    const question = `What time is half past ${hour}?`
    const correctAnswer = `${hour}:30`

    const wrongAnswers = [
      `${random.nextInt(1, 12)}:30`,
      `${hour}:00`,
      `${Math.min(12, hour + 1)}:00`
    ]

    yield multipleChoice(
      generateExerciseId(unitId, 'halfpast', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers,
      'medium'
    )
  }
}

// ───────── MONEY GENERATORS ─────────

export function* generateCoinCountingExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12
): Generator<Exercise> {
  const random = createRandom(seed + '-coins')

  const coinValues = [1, 2, 5, 10] // HK dollar coins

  for (let i = 0; i < count; i++) {
    const coinCount = random.nextInt(2, 4)
    const coins: number[] = []

    for (let j = 0; j < coinCount; j++) {
      coins.push(random.nextArray(coinValues))
    }

    const total = coins.reduce((sum, coin) => sum + coin, 0)
    const coinDesc = coins.map(c => `$${c}`).join(' + ')

    const wrongAnswers = [
      String(total + random.nextInt(1, 3)),
      String(Math.max(1, total - random.nextInt(1, 2))),
      String(total + random.nextInt(2, 4))
    ]

    yield multipleChoice(
      generateExerciseId(unitId, 'coins', seed, i),
      unitId,
      `How much: ${coinDesc}?`,
      `$${total}`,
      wrongAnswers.slice(0, 3),
      difficulty
    )
  }
}

// ───────── SHAPE GENERATORS ─────────

const SHAPES_2D = ['triangle', 'square', 'rectangle', 'circle', 'pentagon', 'hexagon'] as const
const SHAPES_3D = ['cube', 'cylinder', 'sphere', 'cone'] as const

type Shape2D = typeof SHAPES_2D[number]

const SHAPE_PROPERTIES: Record<string, { sides: number; corners: number; description: string }> = {
  triangle: { sides: 3, corners: 3, description: '3 sides and 3 corners' },
  square: { sides: 4, corners: 4, description: '4 equal sides and 4 corners' },
  rectangle: { sides: 4, corners: 4, description: '4 sides (opposite equal) and 4 corners' },
  circle: { sides: 0, corners: 0, description: 'round, no straight sides or corners' },
  pentagon: { sides: 5, corners: 5, description: '5 sides and 5 corners' },
  hexagon: { sides: 6, corners: 6, description: '6 sides and 6 corners' }
}

export function* generateShape2DExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 10
): Generator<Exercise> {
  const random = createRandom(seed + '-shape2d')

  const questionTypes = ['sides', 'corners', 'identify', 'sideCount', 'cornersCount', 'properties']
  const availableShapes: Shape2D[] = difficulty === 'easy' ? [...SHAPES_2D.slice(0, 4)] : [...SHAPES_2D]

  for (let i = 0; i < count; i++) {
    const shape = random.nextArray(availableShapes) as Shape2D
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string | number
    let wrongAnswers: (string | number)[]

    if (qType === 'sides') {
      question = `How many sides does a ${shape} have?`
      correctAnswer = SHAPE_PROPERTIES[shape].sides
      wrongAnswers = [
        SHAPE_PROPERTIES[shape].sides + random.nextInt(1, 2),
        Math.max(3, SHAPE_PROPERTIES[shape].sides - random.nextInt(1, 2)),
        SHAPE_PROPERTIES[shape].sides + 2
      ]
    } else if (qType === 'corners') {
      question = `How many corners does a ${shape} have?`
      correctAnswer = SHAPE_PROPERTIES[shape].corners
      wrongAnswers = [
        SHAPE_PROPERTIES[shape].corners + random.nextInt(1, 2),
        Math.max(0, SHAPE_PROPERTIES[shape].corners - random.nextInt(1, 2)),
        SHAPE_PROPERTIES[shape].corners + 1
      ]
    } else if (qType === 'sideCount' || qType === 'cornersCount') {
      // 'Which shape has 4 sides?' is ambiguous when square and rectangle
      // share a count, so only use it when the count is unique.
      const key = qType === 'sideCount' ? 'sides' : 'corners'
      const count = SHAPE_PROPERTIES[shape][key]
      const isUnique = availableShapes.filter(s => SHAPE_PROPERTIES[s][key] === count).length === 1
      if (isUnique) {
        question = `Which shape has ${count} ${key}?`
        correctAnswer = shape
        wrongAnswers = availableShapes.filter(s => SHAPE_PROPERTIES[s][key] !== count)
      } else {
        const props = SHAPE_PROPERTIES[shape].description
        question = `What shape has ${props}?`
        correctAnswer = shape
        wrongAnswers = availableShapes.filter(s => s !== shape)
      }
    } else if (qType === 'identify') {
      const props = SHAPE_PROPERTIES[shape].description
      question = `What shape has ${props}?`
      correctAnswer = shape
      const otherShapes = availableShapes.filter(s => s !== shape)
      wrongAnswers = random.nextSubset(otherShapes, 3)
    } else {
      question = `Which shape is round?`
      correctAnswer = 'circle'
      wrongAnswers = ['square', 'triangle', 'rectangle']
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'shape2d', seed, i),
      unitId,
      question,
      String(correctAnswer),
      wrongAnswers.slice(0, 3).map(String),
      difficulty
    )
  }
}

export function* generateShape3DExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 10
): Generator<Exercise> {
  const random = createRandom(seed + '-shape3d')

  const questionTypes = ['roll', 'faces', 'corners', 'identify', 'properties']

  for (let i = 0; i < count; i++) {
    const shape = random.nextArray([...SHAPES_3D]) as string
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'roll') {
      const canRoll = ['sphere', 'cylinder', 'cone'].includes(shape)
      question = `Can a ${shape} roll like a wheel?`
      correctAnswer = canRoll ? 'yes' : 'no'
      wrongAnswers = [canRoll ? 'no' : 'yes', 'maybe', 'sometimes']
    } else if (qType === 'faces') {
      if (shape === 'cube') {
        question = 'How many flat faces does a cube have?'
        correctAnswer = '6'
        wrongAnswers = ['4', '8', '5']
      } else if (shape === 'cylinder') {
        question = 'How many flat faces does a cylinder have?'
        correctAnswer = '2'
        wrongAnswers = ['0', '3', '1']
      } else {
        // A cone has 1 flat face; a sphere has none
        question = `Does a ${shape} have flat faces?`
        correctAnswer = shape === 'cone' ? 'yes' : 'no'
        wrongAnswers = [shape === 'cone' ? 'no' : 'yes', 'maybe', 'sometimes']
      }
    } else if (qType === 'corners') {
      // Cubes and cones have corners; spheres and cylinders don't
      const hasCorners = shape === 'cube' || shape === 'cone'
      question = `Does a ${shape} have corners?`
      correctAnswer = hasCorners ? 'yes' : 'no'
      wrongAnswers = [hasCorners ? 'no' : 'yes', 'maybe', 'sometimes']
    } else if (qType === 'identify') {
      const descriptions: Record<string, string> = {
        cube: '6 square faces, all same size',
        cylinder: '2 flat faces, can roll',
        sphere: 'no corners, can roll any direction',
        cone: '1 flat face, pointy top'
      }
      question = `What 3-D shape ${descriptions[shape]}?`
      correctAnswer = shape
      wrongAnswers = SHAPES_3D.filter(s => s !== shape).slice(0, 3)
    } else {
      question = `Which shape has no corners?`
      correctAnswer = 'sphere'
      wrongAnswers = ['cube', 'cylinder', 'cone']
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'shape3d', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers,
      difficulty
    )
  }
}

// ───────── POSITION GENERATORS ─────────

const POSITION_CONCEPTS = {
  over: ['over', 'above', 'on top of'],
  under: ['under', 'below', 'beneath'],
  left: ['left', 'to the left'],
  right: ['right', 'to the right'],
  inFront: ['in front of', 'before'],
  behind: ['behind', 'after', 'in back of']
}

// Friendly labels shown as answer options (internal keys stay in code only)
const POSITION_LABELS: Record<string, string> = {
  over: 'over',
  under: 'under',
  left: 'left',
  right: 'right',
  inFront: 'in front',
  behind: 'behind',
}

const POSITION_SCENARIOS = [
  { subject: 'cat', location: 'chair', opposite: 'floor' },
  { subject: 'bird', location: 'tree', opposite: 'ground' },
  { subject: 'ball', location: 'box', opposite: 'table' },
  { subject: 'book', location: 'desk', opposite: 'floor' },
  { subject: 'toy', location: 'bed', opposite: 'shelf' }
]

export function* generatePositionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12
): Generator<Exercise> {
  const random = createRandom(seed + '-position')

  const positions = Object.keys(POSITION_CONCEPTS) as Array<keyof typeof POSITION_CONCEPTS>

  for (let i = 0; i < count; i++) {
    const position = random.nextArray(positions)
    const scenario = random.nextArray(POSITION_SCENARIOS)
    const concept = random.nextArray(POSITION_CONCEPTS[position])

    const questionTypes = ['identify', 'opposite', 'location']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'identify') {
      question = `If the ${scenario.subject} is ${concept} the ${scenario.location}, where is the ${scenario.subject}?`
      correctAnswer = POSITION_LABELS[position]
      wrongAnswers = positions.filter(p => p !== position).map(p => POSITION_LABELS[p])
    } else if (qType === 'opposite') {
      const oppositesMap: Record<string, string> = {
        over: 'under',
        under: 'over',
        left: 'right',
        right: 'left',
        inFront: 'behind',
        behind: 'in front'
      }
      question = `Opposite of ${concept} is ____`
      correctAnswer = oppositesMap[position]
      const wrongPool = Object.values(POSITION_LABELS).filter(l => l !== correctAnswer)
      wrongAnswers = random.nextSubset(wrongPool, 3)
    } else {
      question = `The ${scenario.subject} is flying ${concept} the ${scenario.location}`
      correctAnswer = POSITION_LABELS[position]
      wrongAnswers = positions.filter(p => p !== position).map(p => POSITION_LABELS[p])
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'position', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers,
      difficulty,
      `Position: ${POSITION_LABELS[position]}`
    )
  }
}

// ───────── CAPACITY ESTIMATES ─────────

// Conservative estimates of how many unique questions each generator can
// produce (used for the UI's "variations" display). Actual variety is often
// higher because distractors and wording also vary.
export const CAPACITY_BY_NAME: Record<string, number> = {
  generateCountingExercises: 30,
  generateNumberSequenceExercises: 60,
  generateAdditionExercises: 100,
  generateSubtractionExercises: 70,
  generateThreeAddendsExercises: 125,
  generateComparisonExercises: 150,
  generateOddEvenExercises: 60,
  generateSkipCountingExercises: 30,
  generateWordProblems: 500,
  generateClockExercises: 24,
  generateHalfPastExercises: 12,
  generateCoinCountingExercises: 336,
  generateShape2DExercises: 30,
  generateShape3DExercises: 30,
  generatePositionExercises: 150,
}