import type { Exercise, Difficulty } from './types'
import {
  multipleChoice,
  fillBlank,
} from './exerciseBuilders'
import { SeededRandom, generateExerciseId, createSessionSeed } from './randomUtils'
import type { Locale } from '../i18n/locale'

// Utility to create seeded random instance
function createRandom(seed?: string): SeededRandom {
  const numericSeed = seed ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : Date.now()
  return new SeededRandom(numericSeed)
}

// Pick the localized wording for the current locale
function tr(locale: Locale, en: string, zh: string): string {
  return locale === 'zh-Hant' ? zh : en
}

// ───────── COUNTING EXERCISE GENERATORS ─────────

export function* generateCountingExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20,
  locale: Locale = 'en'
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
    // Wrongs are nearby counts within the range, always distinct from the answer
    const wrongPool = [dotCount + 1, dotCount - 1, dotCount + 2, dotCount - 2, dotCount + 3, dotCount - 3]
      .filter(n => n >= min && n <= max && n !== dotCount)
    const wrongAnswers = random.nextSubset(wrongPool, 3).map(String)

    yield multipleChoice(
      generateExerciseId(unitId, 'count', seed, i),
      unitId,
      tr(locale, `How many dots? ${dots}`, `有多少個圓點？${dots}`),
      String(dotCount),
      wrongAnswers.slice(0, 3),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateNumberSequenceExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  locale: Locale = 'en'
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
      question = tr(locale, `What comes after ${target}?`, `${target} 之後是多少？`)
      correctAnswer = String(target + 1)
      wrongAnswers = [
        String(target - 1 >= 0 ? target - 1 : target + 2),
        String(target + 2),
        String(target)
      ].filter(a => a !== correctAnswer && !isNaN(Number(a)) && Number(a) >= 0)
    } else if (qType === 'before') {
      question = tr(locale, `What comes before ${target}?`, `${target} 之前是多少？`)
      correctAnswer = String(Math.max(0, target - 1))
      wrongAnswers = [
        String(target + 1),
        String(Math.max(0, target - 2)),
        String(target)
      ].filter(a => a !== correctAnswer && !isNaN(Number(a)) && Number(a) >= 0)
    } else {
      const lower = target - 1
      const upper = target + 1
      question = tr(locale, `What number is between ${lower} and ${upper}?`, `${lower} 和 ${upper} 之間是哪個數？`)
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
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── ARITHMETIC EXERCISE GENERATORS ─────────

export function* generateAdditionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20,
  maxSum: number = 20,
  locale: Locale = 'en'
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
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateSubtractionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 20,
  maxMinuend: number = 12,
  locale: Locale = 'en'
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
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateThreeAddendsExercises(
  unitId: string,
  seed: string = createSessionSeed(),
  count: number = 10,
  locale: Locale = 'en'
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
      'hard',
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── COMPARISON EXERCISE GENERATORS ─────────

export function* generateComparisonExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  maxNumber: number = 20,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-compare')
  const same = tr(locale, 'Same', '一樣')
  const yes = tr(locale, 'yes', '對')
  const no = tr(locale, 'no', '不對')
  const dontKnow = tr(locale, "don't know", '不知道')

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
    // b must differ from a so bigger/smaller questions are never ambiguous
    let b = random.nextInt(min, max)
    if (b === a) {
      b = a < max ? a + 1 : a - 1
    }
    // A third distinct number so every option is meaningful (no fallback fill)
    let third = random.nextInt(min, max)
    while (third === a || third === b) {
      third = third < max ? third + 1 : third - 1
    }

    const questionTypes = ['bigger', 'smaller', 'compare']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'bigger') {
      question = tr(locale, `Which number is bigger: ${a} or ${b}?`, `哪個數較大：${a} 或 ${b}？`)
      correctAnswer = String(Math.max(a, b))
      wrongAnswers = [String(Math.min(a, b)), same, String(third)]
    } else if (qType === 'smaller') {
      question = tr(locale, `Which number is smaller: ${a} or ${b}?`, `哪個數較小：${a} 或 ${b}？`)
      correctAnswer = String(Math.min(a, b))
      wrongAnswers = [String(Math.max(a, b)), same, String(third)]
    } else {
      const symbol = a < b ? '<' : '>'
      question = tr(locale, `Is ${a} ${symbol} ${b}?`, `${a} ${symbol} ${b}，對嗎？`)
      correctAnswer = yes
      wrongAnswers = [no, same, dontKnow]
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'comparison', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateOddEvenExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  maxNumber: number = 20,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-oddeven')
  const odd = tr(locale, 'odd', '單數')
  const even = tr(locale, 'even', '雙數')

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
      question = tr(locale, `Is ${target} odd or even?`, `${target} 是單數還是雙數？`)
      correctAnswer = isEven ? even : odd
      wrongAnswers = [isEven ? odd : even, tr(locale, 'both', '兩者皆是'), tr(locale, 'neither', '兩者皆不是')]
    } else if (qType === 'which') {
      // Distractors are always the opposite parity so the question stays unambiguous
      const wrongs = [target + 1, target + 3, target - 1 >= 1 ? target - 1 : target + 5]
      const list = [target, ...wrongs].join(locale === 'zh-Hant' ? '、' : ', ')
      question = tr(locale, `Which of these is ${isEven ? 'even' : 'odd'}? ${list}`, `${list}，哪個是${isEven ? even : odd}？`)
      correctAnswer = String(target)
      wrongAnswers = wrongs.map(String)
    } else {
      question = tr(locale, `Can ${target} be split into two equal groups?`, `${target} 可以分成兩個數量相同的組別嗎？`)
      correctAnswer = isEven ? tr(locale, 'yes', '可以') : tr(locale, 'no', '不可以')
      wrongAnswers = [
        isEven ? tr(locale, 'no', '不可以') : tr(locale, 'yes', '可以'),
        tr(locale, 'maybe', '或者可以'),
        tr(locale, 'sometimes', '有時可以'),
      ]
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'oddeven', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── SKIP COUNTING EXERCISE GENERATORS ─────────

export function* generateSkipCountingExercises(
  unitId: string,
  step: 2 | 5 | 10,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12,
  locale: Locale = 'en'
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
      tr(locale, `Count by ${step}s`, `每次加 ${step}`)
    )
  }
}

// ───────── WORD PROBLEM GENERATORS ─────────

const WORD_PROBLEM_TEMPLATES: Record<Locale, Record<string, string[]>> = {
  en: {
    addition: [
      "You have {a} {item}. Get {b} more. How many?",
      "There are {a} {item} and {b} {item2}. Total?",
      "{name} has {a}. {name2} gives {b}. How many now?",
      "{name} found {a} {item}. Then found {b} more. Total?",
      "Put {a} {item} in the box. Add {b} more. How many?"
    ],
    subtraction: [
      "You have {a} {item}. Give {b} away. Left?",
      "There are {a} {item} on the {place}. {b} {action}. How many left?",
      "Start with {a}. {action} {b}. What's left?",
      "{name} has {a} {item}. Loses {b}. How many now?",
      "Take {b} away from {a}. What remains?"
    ],
    comparison: [
      "{nameA} has {a} {item}. {nameB} has {b} {item}. Who has more?",
      "Which is more: {a} or {b}?",
      "{nameA} has {a}. {nameB} has {b}. Who has less?"
    ]
  },
  'zh-Hant': {
    addition: [
      '你有 {a} 個{item}，再多拿 {b} 個，共有多少個？',
      '有 {a} 個{item}和 {b} 個{item2}，共有多少個？',
      '{name}有 {a} 個，又得到 {b} 個，現在有多少個？',
      '{name}找到 {a} 個{item}，再找到 {b} 個，共有多少個？',
      '盒子裏有 {a} 個{item}，再加入 {b} 個，共有多少個？'
    ],
    subtraction: [
      '你有 {a} 個{item}，送給別人 {b} 個，剩下多少個？',
      '{place}有 {a} 個{item}，拿走 {b} 個，剩下多少個？',
      '開始有 {a} 個，{action} {b} 個，剩下多少個？',
      '{name}有 {a} 個{item}，不見了 {b} 個，現在有多少個？',
      '有 {a} 個，拿走 {b} 個，剩下多少個？'
    ],
    comparison: [
      '{nameA}有 {a} 個{item}，{nameB}有 {b} 個{item}，誰較多？',
      '哪個較多：{a} 或 {b}？',
      '{nameA}有 {a} 個，{nameB}有 {b} 個，誰較少？'
    ]
  }
}

const ITEMS: Record<Locale, string[]> = {
  en: ['apples', 'stickers', 'balls', 'books', 'cookies', 'pencils', 'toys', 'marbles'],
  'zh-Hant': ['蘋果', '貼紙', '波', '書本', '曲奇餅', '鉛筆', '玩具', '波子'],
}
const NAMES: Record<Locale, string[]> = {
  en: ['Tom', 'Mary', 'John', 'Amy', 'Ben', 'Lisa', 'Mike', 'Sarah'],
  'zh-Hant': ['小明', '小美', '阿傑', '小芬', '小欣', '小文', '小儀', '小浩'],
}
const NAMES2: Record<Locale, string[]> = {
  en: ['Sam', 'Emma', 'Jack', 'Kate', 'Leo', 'Mia'],
  'zh-Hant': ['小強', '小麗', '小俊', '小婷', '小偉', '小琪'],
}
const ITEMS2: Record<Locale, string[]> = {
  en: ['oranges', 'cards', 'games', 'stories', 'candies', 'pens'],
  'zh-Hant': ['橙', '卡', '遊戲', '故事', '糖果', '筆'],
}
const PLACES: Record<Locale, string[]> = {
  en: ['tree', 'table', 'bag', 'box', 'shelf', 'desk'],
  'zh-Hant': ['樹上', '桌上', '袋裏', '盒裏', '架上', '書枱上'],
}
const ACTIONS: Record<Locale, string[]> = {
  en: ['fly away', 'roll away', 'fall off', 'get taken'],
  'zh-Hant': ['飛走了', '滾走了', '跌落了', '被拿走了'],
}

export function* generateWordProblems(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 15,
  locale: Locale = 'en'
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
    const templates = WORD_PROBLEM_TEMPLATES[locale][problemType]
    const template = random.nextArray(templates)

    // Comparison questions need distinct values so 'Same' is never the answer
    if (problemType === 'comparison' && a === b) {
      b = Math.max(1, a - 1)
    }

    // Comparison questions pin the names so the answer is deterministic
    const [nameA, nameB] = locale === 'zh-Hant' ? ['小明', '小美'] : ['Tom', 'Sam']
    const same = tr(locale, 'Same', '一樣')
    let question = problemType === 'comparison'
      ? template.split('{nameA}').join(nameA).split('{nameB}').join(nameB)
      : template
    // Replace every occurrence (some templates use a placeholder twice)
    const fill = (key: string, value: string) => {
      question = question.split(key).join(value)
    }
    fill('{a}', String(a))
    fill('{b}', String(b))
    fill('{item}', random.nextArray(ITEMS[locale]))
    fill('{item2}', random.nextArray(ITEMS2[locale]))
    fill('{name}', random.nextArray(NAMES[locale]))
    fill('{name2}', random.nextArray(NAMES2[locale]))
    fill('{nameA}', random.nextArray(NAMES[locale]))
    fill('{nameB}', random.nextArray(NAMES2[locale]))
    fill('{place}', random.nextArray(PLACES[locale]))
    fill('{action}', random.nextArray(ACTIONS[locale]))

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
      const numericCompare = template.includes('Which is more') || template.includes('哪個較多')
      if (numericCompare) {
        correctAnswer = String(Math.max(a, b))
        wrongAnswers = [String(Math.min(a, b)), same, String(Math.max(a, b) + random.nextInt(1, 3))]
      } else {
        // 'Who has less?' asks for the person with the smaller amount
        const whoHasLess = template.includes('Who has less') || template.includes('誰較少')
        correctAnswer = whoHasLess ? (a < b ? nameA : nameB) : (a > b ? nameA : nameB)
        wrongAnswers = random.nextSubset([...NAMES[locale], ...NAMES2[locale], same].filter(n => n !== String(correctAnswer)), 3)
      }
    }

    const optioned = multipleChoice(
      generateExerciseId(unitId, 'wordprob', seed, i),
      unitId,
      question,
      String(correctAnswer),
      wrongAnswers.map(String),
      difficulty,
      undefined,
      undefined,
      locale
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
  count: number = 12,
  locale: Locale = 'en'
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
      question = tr(locale, `Hour hand at ${hour} shows what time?`, `時針指向 ${hour}，現在是幾點？`)
      correctAnswer = `${hour}:00`
      // Three wrong hours that are distinct from the correct one
      const wrongHours = new Set<number>()
      while (wrongHours.size < 3) {
        const h = random.nextInt(1, 12)
        if (h !== hour) wrongHours.add(h)
      }
      wrongAnswers = [...wrongHours].map(h => `${h}:00`)
    } else {
      const at = tr(locale, 'at', '指向')
      const between = tr(locale, 'between', '在')
      const past = tr(locale, 'past', '過了')
      question = tr(locale, `Where does the hour hand point for ${hour}:00?`, `${hour} 點正，時針指向哪裏？`)
      correctAnswer = `${at} ${hour}`
      let pointWrong = random.nextInt(1, 12)
      if (pointWrong === hour) pointWrong = hour < 12 ? hour + 1 : hour - 1
      if (locale === 'zh-Hant') {
        const betweenN = random.nextInt(1, 11)
        wrongAnswers = [`指向 ${pointWrong}`, `在 ${betweenN} 和 ${betweenN + 1} 之間`, `過了 ${random.nextInt(1, 12)}`]
      } else {
        wrongAnswers = [`${at} ${pointWrong}`, `${between} ${random.nextInt(1, 11)}`, `${past} ${random.nextInt(1, 12)}`]
      }
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'clock', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers.slice(0, 3),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateHalfPastExercises(
  unitId: string,
  seed: string = createSessionSeed(),
  count: number = 8,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-half')

  for (let i = 0; i < count; i++) {
    const hour = random.nextInt(1, 12)
    const question = tr(locale, `What time is half past ${hour}?`, `時鐘顯示 ${hour} 點半，現在是幾點？`)
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
      'medium',
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── MONEY GENERATORS ─────────

export function* generateCoinCountingExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12,
  locale: Locale = 'en'
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

    // Wrongs keep the $ format and stay distinct so no fallback fill is needed
    const off1 = total + random.nextInt(1, 3)
    const off2 = total + random.nextInt(4, 6)
    const off3 = Math.max(1, total - random.nextInt(1, 2))
    const wrongAnswers = [`$${off1}`, `$${off2}`, `$${off3}`]

    yield multipleChoice(
      generateExerciseId(unitId, 'coins', seed, i),
      unitId,
      tr(locale, `How much: ${coinDesc}?`, `合共多少錢：${coinDesc}？`),
      `$${total}`,
      wrongAnswers.slice(0, 3),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── SHAPE GENERATORS ─────────

const SHAPES_2D = ['triangle', 'square', 'rectangle', 'circle', 'pentagon', 'hexagon'] as const
const SHAPES_3D = ['cube', 'cylinder', 'sphere', 'cone'] as const

type Shape2D = typeof SHAPES_2D[number]

// Localized display names (internal keys stay English in code)
const SHAPE_2D_NAMES: Record<Locale, Record<string, string>> = {
  en: { triangle: 'triangle', square: 'square', rectangle: 'rectangle', circle: 'circle', pentagon: 'pentagon', hexagon: 'hexagon' },
  'zh-Hant': { triangle: '三角形', square: '正方形', rectangle: '長方形', circle: '圓形', pentagon: '五邊形', hexagon: '六邊形' },
}
const SHAPE_3D_NAMES: Record<Locale, Record<string, string>> = {
  en: { cube: 'cube', cylinder: 'cylinder', sphere: 'sphere', cone: 'cone' },
  'zh-Hant': { cube: '立方體', cylinder: '圓柱體', sphere: '球體', cone: '圓錐體' },
}

const SHAPE_PROPERTIES: Record<string, { sides: number; corners: number; descriptionEn: string; descriptionZh: string }> = {
  triangle: { sides: 3, corners: 3, descriptionEn: '3 sides and 3 corners', descriptionZh: '3 條邊和 3 個角' },
  square: { sides: 4, corners: 4, descriptionEn: '4 equal sides and 4 corners', descriptionZh: '4 條相等的邊和 4 個角' },
  rectangle: { sides: 4, corners: 4, descriptionEn: '4 sides (opposite equal) and 4 corners', descriptionZh: '4 條邊（對邊相等）和 4 個角' },
  circle: { sides: 0, corners: 0, descriptionEn: 'round, no straight sides or corners', descriptionZh: '圓圓的，沒有直邊或角' },
  pentagon: { sides: 5, corners: 5, descriptionEn: '5 sides and 5 corners', descriptionZh: '5 條邊和 5 個角' },
  hexagon: { sides: 6, corners: 6, descriptionEn: '6 sides and 6 corners', descriptionZh: '6 條邊和 6 個角' }
}

export function* generateShape2DExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 10,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-shape2d')
  const shapeNames = SHAPE_2D_NAMES[locale]

  const questionTypes = ['sides', 'corners', 'identify', 'sideCount', 'cornersCount', 'properties']
  const availableShapes: Shape2D[] = difficulty === 'easy' ? [...SHAPES_2D.slice(0, 4)] : [...SHAPES_2D]

  for (let i = 0; i < count; i++) {
    const shape = random.nextArray(availableShapes) as Shape2D
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string | number
    let wrongAnswers: (string | number)[]

    const shapeName = shapeNames[shape]
    const props = locale === 'zh-Hant' ? SHAPE_PROPERTIES[shape].descriptionZh : SHAPE_PROPERTIES[shape].descriptionEn

    if (qType === 'sides') {
      question = tr(locale, `How many sides does a ${shapeName} have?`, `${shapeName}有幾條邊？`)
      correctAnswer = SHAPE_PROPERTIES[shape].sides
      wrongAnswers = [
        SHAPE_PROPERTIES[shape].sides + random.nextInt(1, 2),
        Math.max(3, SHAPE_PROPERTIES[shape].sides - random.nextInt(1, 2)),
        SHAPE_PROPERTIES[shape].sides + 2
      ]
    } else if (qType === 'corners') {
      question = tr(locale, `How many corners does a ${shapeName} have?`, `${shapeName}有幾個角？`)
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
      const countWord = tr(locale, key, key === 'sides' ? '條邊' : '個角')
      const isUnique = availableShapes.filter(s => SHAPE_PROPERTIES[s][key] === count).length === 1
      if (isUnique) {
        question = tr(locale, `Which shape has ${count} ${key}?`, `哪個圖形有 ${count} ${countWord}？`)
        correctAnswer = shapeName
        wrongAnswers = availableShapes.filter(s => SHAPE_PROPERTIES[s][key] !== count).map(s => shapeNames[s])
      } else {
        question = tr(locale, `What shape has ${props}?`, `哪個圖形有 ${props}？`)
        correctAnswer = shapeName
        wrongAnswers = availableShapes.filter(s => s !== shape).map(s => shapeNames[s])
      }
    } else if (qType === 'identify') {
      question = tr(locale, `What shape has ${props}?`, `哪個圖形有 ${props}？`)
      correctAnswer = shapeName
      const otherShapes = availableShapes.filter(s => s !== shape).map(s => shapeNames[s])
      wrongAnswers = random.nextSubset(otherShapes, 3)
    } else {
      question = tr(locale, 'Which shape is round?', '哪個圖形是圓的？')
      correctAnswer = shapeNames.circle
      wrongAnswers = [shapeNames.square, shapeNames.triangle, shapeNames.rectangle]
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'shape2d', seed, i),
      unitId,
      question,
      String(correctAnswer),
      wrongAnswers.slice(0, 3).map(String),
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

export function* generateShape3DExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 10,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-shape3d')
  const shapeNames = SHAPE_3D_NAMES[locale]
  // Roll questions answer 可以/不可以; face/corner questions answer 有/沒有
  const canYes = tr(locale, 'yes', '可以')
  const canNo = tr(locale, 'no', '不可以')
  const hasYes = tr(locale, 'yes', '有')
  const hasNo = tr(locale, 'no', '沒有')
  const maybeRoll = tr(locale, 'maybe', '或者可以')
  const maybeHas = tr(locale, 'maybe', '或者有')
  const dontKnow = tr(locale, "don't know", '不知道')

  const questionTypes = ['roll', 'faces', 'corners', 'identify', 'properties']

  for (let i = 0; i < count; i++) {
    const shape = random.nextArray([...SHAPES_3D]) as string
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    const shapeName = shapeNames[shape]

    if (qType === 'roll') {
      const canRoll = ['sphere', 'cylinder', 'cone'].includes(shape)
      question = tr(locale, `Can a ${shapeName} roll like a wheel?`, `${shapeName}可以像車輪一樣滾動嗎？`)
      correctAnswer = canRoll ? canYes : canNo
      wrongAnswers = [canRoll ? canNo : canYes, maybeRoll, dontKnow]
    } else if (qType === 'faces') {
      if (shape === 'cube') {
        question = tr(locale, 'How many flat faces does a cube have?', '立方體有幾個平面？')
        correctAnswer = '6'
        wrongAnswers = ['4', '8', '5']
      } else if (shape === 'cylinder') {
        question = tr(locale, 'How many flat faces does a cylinder have?', '圓柱體有幾個平面？')
        correctAnswer = '2'
        wrongAnswers = ['0', '3', '1']
      } else {
        // A cone has 1 flat face; a sphere has none
        question = tr(locale, `Does a ${shapeName} have flat faces?`, `${shapeName}有平面嗎？`)
        correctAnswer = shape === 'cone' ? hasYes : hasNo
        wrongAnswers = [shape === 'cone' ? hasNo : hasYes, maybeHas, dontKnow]
      }
    } else if (qType === 'corners') {
      // Cubes and cones have corners; spheres and cylinders don't
      const hasCorners = shape === 'cube' || shape === 'cone'
      question = tr(locale, `Does a ${shapeName} have corners?`, `${shapeName}有角嗎？`)
      correctAnswer = hasCorners ? hasYes : hasNo
      wrongAnswers = [hasCorners ? hasNo : hasYes, maybeHas, dontKnow]
    } else if (qType === 'identify') {
      const descriptions: Record<Locale, Record<string, string>> = {
        en: {
          cube: '6 square faces, all same size',
          cylinder: '2 flat faces, can roll',
          sphere: 'no corners, can roll any direction',
          cone: '1 flat face, pointy top'
        },
        'zh-Hant': {
          cube: '有 6 個正方形面，大小相同',
          cylinder: '有 2 個平面，可以滾動',
          sphere: '沒有角，可以向任何方向滾動',
          cone: '有 1 個平面，頂部尖尖的'
        }
      }
      question = tr(locale, `What 3-D shape ${descriptions.en[shape]}?`, `哪個立體圖形${descriptions['zh-Hant'][shape]}？`)
      correctAnswer = shapeName
      wrongAnswers = SHAPES_3D.filter(s => s !== shape).map(s => shapeNames[s]).slice(0, 3)
    } else {
      question = tr(locale, 'Which shape has no corners?', '哪個圖形沒有角？')
      correctAnswer = shapeNames.sphere
      wrongAnswers = [shapeNames.cube, shapeNames.cylinder, shapeNames.cone]
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'shape3d', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers,
      difficulty,
      undefined,
      undefined,
      locale
    )
  }
}

// ───────── POSITION GENERATORS ─────────

const POSITION_CONCEPTS: Record<Locale, Record<string, string[]>> = {
  en: {
    over: ['over', 'above', 'on top of'],
    under: ['under', 'below', 'beneath'],
    left: ['left', 'to the left'],
    right: ['right', 'to the right'],
    inFront: ['in front of', 'before'],
    behind: ['behind', 'after', 'in back of'],
  },
  'zh-Hant': {
    over: ['上面', '上方', '之上'],
    under: ['下面', '下方', '之下'],
    left: ['左面', '左邊'],
    right: ['右面', '右邊'],
    inFront: ['前面', '前方'],
    behind: ['後面', '後方'],
  },
}

// Friendly labels shown as answer options (internal keys stay in code only)
const POSITION_LABELS: Record<Locale, Record<string, string>> = {
  en: { over: 'over', under: 'under', left: 'left', right: 'right', inFront: 'in front', behind: 'behind' },
  'zh-Hant': { over: '上面', under: '下面', left: '左邊', right: '右邊', inFront: '前面', behind: '後面' },
}

const POSITION_SCENARIOS: Record<Locale, Array<{ subject: string; location: string }>> = {
  en: [
    { subject: 'cat', location: 'chair' },
    { subject: 'bird', location: 'tree' },
    { subject: 'ball', location: 'box' },
    { subject: 'book', location: 'desk' },
    { subject: 'toy', location: 'bed' },
  ],
  'zh-Hant': [
    { subject: '貓', location: '椅子' },
    { subject: '雀仔', location: '樹' },
    { subject: '波', location: '盒' },
    { subject: '書', location: '書枱' },
    { subject: '玩具', location: '床' },
  ],
}

export function* generatePositionExercises(
  unitId: string,
  difficulty: Difficulty,
  seed: string = createSessionSeed(),
  count: number = 12,
  locale: Locale = 'en'
): Generator<Exercise> {
  const random = createRandom(seed + '-position')
  const concepts = POSITION_CONCEPTS[locale]
  const labels = POSITION_LABELS[locale]
  const scenarios = POSITION_SCENARIOS[locale]
  const positions = Object.keys(concepts) as Array<keyof typeof concepts>

  for (let i = 0; i < count; i++) {
    const position = random.nextArray(positions)
    const scenario = random.nextArray(scenarios)
    const concept = random.nextArray(concepts[position])

    const questionTypes = ['identify', 'opposite', 'location']
    const qType = random.nextArray(questionTypes)

    let question: string
    let correctAnswer: string
    let wrongAnswers: string[]

    if (qType === 'identify') {
      question = tr(
        locale,
        `If the ${scenario.subject} is ${concept} the ${scenario.location}, where is the ${scenario.subject}?`,
        `如果${scenario.subject}在${scenario.location}${concept}，${scenario.subject}在哪裏？`
      )
      correctAnswer = labels[position]
      wrongAnswers = positions.filter(p => p !== position).map(p => labels[p])
    } else if (qType === 'opposite') {
      const oppositesMap: Record<Locale, Record<string, string>> = {
        en: { over: 'under', under: 'over', left: 'right', right: 'left', inFront: 'behind', behind: 'in front' },
        'zh-Hant': { over: '下面', under: '上面', left: '右邊', right: '左邊', inFront: '後面', behind: '前面' },
      }
      question = tr(locale, `Opposite of ${concept} is ____`, `「${concept}」的相反是 ____`)
      correctAnswer = oppositesMap[locale][position]
      const wrongPool = Object.values(labels).filter(l => l !== correctAnswer)
      wrongAnswers = random.nextSubset(wrongPool, 3)
    } else {
      question = tr(
        locale,
        `The ${scenario.subject} is flying ${concept} the ${scenario.location}`,
        `${scenario.subject}在${scenario.location}${concept}飛`
      )
      correctAnswer = labels[position]
      wrongAnswers = positions.filter(p => p !== position).map(p => labels[p])
    }

    yield multipleChoice(
      generateExerciseId(unitId, 'position', seed, i),
      unitId,
      question,
      correctAnswer,
      wrongAnswers,
      difficulty,
      tr(locale, `Position: ${labels[position]}`, `位置：${labels[position]}`),
      undefined,
      locale
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