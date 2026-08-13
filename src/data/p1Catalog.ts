import type { Lesson, P1Unit } from './types'
import { numbersTo20Lessons } from './numbersTo20'
import { restOfP1Lessons } from './restOfP1'

export const heroLessonId = '1n1-count-small'

export type SeriesKind =
  | 'count'
  | 'compare'
  | 'pairs'
  | 'split'
  | 'add'
  | 'sub'
  | 'tens'
  | 'length'
  | 'money'
  | 'clock'
  | 'shape'
  | 'space'
  | 'inquiry'

export type SeriesPart = {
  id: string
  code: string
  part: number
  kind: SeriesKind
  title: string
  blurb: string
  lessonId: string
}

export type UnitSeries = {
  unitId: string
  code: string
  title: string
  blurb: string
  strand: P1Unit['strand']
  parts: SeriesPart[]
}

/** 1N1 as 10 tiny steps for ~age 6. */
export const n1Series: SeriesPart[] = [
  {
    id: '1n1-p1',
    code: 'Step 1',
    part: 1,
    kind: 'count',
    title: 'Count to 5',
    blurb: 'Tiny groups first!',
    lessonId: '1n1-count-small',
  },
  {
    id: '1n1-p2',
    code: 'Step 2',
    part: 2,
    kind: 'count',
    title: 'Count to 10',
    blurb: 'A little more!',
    lessonId: '1n1-count-big',
  },
  {
    id: '1n1-p3',
    code: 'Step 3',
    part: 3,
    kind: 'compare',
    title: 'Which has more?',
    blurb: 'Find the bigger group!',
    lessonId: '1n1-more',
  },
  {
    id: '1n1-p4',
    code: 'Step 4',
    part: 4,
    kind: 'compare',
    title: 'Which has less?',
    blurb: 'Find the smaller group!',
    lessonId: '1n1-less',
  },
  {
    id: '1n1-p5',
    code: 'Step 5',
    part: 5,
    kind: 'compare',
    title: 'The same!',
    blurb: 'When both sides match',
    lessonId: '1n1-same',
  },
  {
    id: '1n1-p6',
    code: 'Step 6',
    part: 6,
    kind: 'pairs',
    title: 'Even — pairs',
    blurb: 'Everyone finds a friend!',
    lessonId: '1n1-even',
  },
  {
    id: '1n1-p7',
    code: 'Step 7',
    part: 7,
    kind: 'pairs',
    title: 'Odd — one alone',
    blurb: 'Someone has no pair!',
    lessonId: '1n1-odd',
  },
  {
    id: '1n1-p8',
    code: 'Step 8',
    part: 8,
    kind: 'split',
    title: 'Split small',
    blurb: 'Pull apart tiny totals!',
    lessonId: '1n1-split-small',
  },
  {
    id: '1n1-p9',
    code: 'Step 9',
    part: 9,
    kind: 'split',
    title: 'Split to 10',
    blurb: 'Bigger splits!',
    lessonId: '1n1-split-ten',
  },
  {
    id: '1n1-p10',
    code: 'Step 10',
    part: 10,
    kind: 'split',
    title: 'Many ways',
    blurb: 'Same total, different parts!',
    lessonId: '1n1-split-ways',
  },
]

export const allUnitSeries: UnitSeries[] = [
  {
    unitId: '1n1',
    code: '1N1',
    title: 'Numbers to 20',
    blurb: 'Ten tiny steps. Five examples each!',
    strand: 'number',
    parts: n1Series,
  },
  {
    unitId: '1n2',
    code: '1N2',
    title: 'Basic addition and subtraction',
    blurb: 'Merge, take away, zero, and how +/− link.',
    strand: 'number',
    parts: [
      { id: '1n2-p1', code: 'Step 1', part: 1, kind: 'add', title: 'Put together', blurb: 'Merge two groups!', lessonId: '1n2-add' },
      { id: '1n2-p2', code: 'Step 2', part: 2, kind: 'sub', title: 'Take away', blurb: 'Some leave!', lessonId: '1n2-sub' },
      { id: '1n2-p3', code: 'Step 3', part: 3, kind: 'sub', title: 'Zero', blurb: 'Take all away!', lessonId: '1n2-zero' },
      { id: '1n2-p4', code: 'Step 4', part: 4, kind: 'add', title: 'Same sum both ways', blurb: 'Swap — same total!', lessonId: '1n2-commute' },
      { id: '1n2-p5', code: 'Step 5', part: 5, kind: 'add', title: 'Add & take away link', blurb: '+ and − are friends!', lessonId: '1n2-link' },
    ],
  },
  {
    unitId: '1n3',
    code: '1N3',
    title: 'Numbers to 100',
    blurb: 'Tens, ones, compare, skip count, estimate.',
    strand: 'number',
    parts: [
      { id: '1n3-p1', code: 'Step 1', part: 1, kind: 'tens', title: 'Tens and ones', blurb: 'Bundles + leftovers!', lessonId: '1n3-tens' },
      { id: '1n3-p2', code: 'Step 2', part: 2, kind: 'compare', title: 'Bigger numbers', blurb: 'Which is more?', lessonId: '1n3-compare' },
      { id: '1n3-p3', code: 'Step 3', part: 3, kind: 'count', title: 'Count in jumps', blurb: 'Jump by 2s!', lessonId: '1n3-skip' },
      { id: '1n3-p4', code: 'Step 4', part: 4, kind: 'pairs', title: 'Odd or even', blurb: 'Check the ones!', lessonId: '1n3-oddeven' },
      { id: '1n3-p5', code: 'Step 5', part: 5, kind: 'count', title: 'About how many?', blurb: 'Guess, then count!', lessonId: '1n3-estimate' },
    ],
  },
  {
    unitId: '1n4',
    code: '1N4',
    title: 'Addition and subtraction (I)',
    blurb: 'Bigger +/−, three addends, check with +.',
    strand: 'number',
    parts: [
      { id: '1n4-p1', code: 'Step 1', part: 1, kind: 'add', title: 'Add two numbers', blurb: 'Bigger puts-together!', lessonId: '1n4-add2' },
      { id: '1n4-p2', code: 'Step 2', part: 2, kind: 'add', title: 'Add three numbers', blurb: 'Left to right!', lessonId: '1n4-add3' },
      { id: '1n4-p3', code: 'Step 3', part: 3, kind: 'sub', title: 'Subtract two numbers', blurb: 'Bigger take-aways!', lessonId: '1n4-sub2' },
      { id: '1n4-p4', code: 'Step 4', part: 4, kind: 'add', title: 'Check with addition', blurb: 'Add back to check!', lessonId: '1n4-check' },
      { id: '1n4-p5', code: 'Step 5', part: 5, kind: 'tens', title: 'Tens help adding', blurb: 'See the tens!', lessonId: '1n4-place' },
    ],
  },
  {
    unitId: '1m1',
    code: '1M1',
    title: 'Length and distance (I)',
    blurb: 'Longer, shorter, same.',
    strand: 'measures',
    parts: [
      { id: '1m1-p1', code: 'Step 1', part: 1, kind: 'length', title: 'Longer or shorter?', blurb: 'Compare two sticks!', lessonId: '1m1-longer' },
    ],
  },
  {
    unitId: '1m2',
    code: '1M2',
    title: 'Money (I)',
    blurb: 'Coin values and totals.',
    strand: 'measures',
    parts: [
      { id: '1m2-p1', code: 'Step 1', part: 1, kind: 'money', title: 'Coin values', blurb: 'Add the coins!', lessonId: '1m2-coins' },
      { id: '1m2-p2', code: 'Step 2', part: 2, kind: 'money', title: 'More coins', blurb: 'Bigger piles!', lessonId: '1m2-more' },
    ],
  },
  {
    unitId: '1m3',
    code: '1M3',
    title: 'Length and distance (II)',
    blurb: 'Farther and nearer with bars.',
    strand: 'measures',
    parts: [
      { id: '1m3-p1', code: 'Step 1', part: 1, kind: 'length', title: 'Farther / nearer', blurb: 'Compare again!', lessonId: '1m3-distance' },
    ],
  },
  {
    unitId: '1m4',
    code: '1M4',
    title: 'Time (I)',
    blurb: 'Read o’clock times.',
    strand: 'measures',
    parts: [
      { id: '1m4-p1', code: 'Step 1', part: 1, kind: 'clock', title: 'What hour?', blurb: 'Read the hour hand!', lessonId: '1m4-clock' },
      { id: '1m4-p2', code: 'Step 2', part: 2, kind: 'clock', title: 'More o’clock', blurb: 'Keep reading!', lessonId: '1m4-hours' },
    ],
  },
  {
    unitId: '1s1',
    code: '1S1',
    title: '3-D shapes (I)',
    blurb: 'Cube, cylinder, sphere, cone.',
    strand: 'shape',
    parts: [
      { id: '1s1-p1', code: 'Step 1', part: 1, kind: 'shape', title: '3-D shapes', blurb: 'Name the solid!', lessonId: '1s1-3d' },
    ],
  },
  {
    unitId: '1s2',
    code: '1S2',
    title: '2-D shapes',
    blurb: 'Flat shapes and sides.',
    strand: 'shape',
    parts: [
      { id: '1s2-p1', code: 'Step 1', part: 1, kind: 'shape', title: '2-D shapes', blurb: 'Name the shape!', lessonId: '1s2-2d' },
      { id: '1s2-p2', code: 'Step 2', part: 2, kind: 'shape', title: 'Count the sides', blurb: 'Sides tell the name!', lessonId: '1s2-sides' },
    ],
  },
  {
    unitId: '1s3',
    code: '1S3',
    title: 'Directions and positions (I)',
    blurb: 'Left, right, over, under…',
    strand: 'shape',
    parts: [
      { id: '1s3-p1', code: 'Step 1', part: 1, kind: 'space', title: 'Where is it?', blurb: 'Find the ball!', lessonId: '1s3-space' },
      { id: '1s3-p2', code: 'Step 2', part: 2, kind: 'space', title: 'More positions', blurb: 'Behind and more!', lessonId: '1s3-behind' },
    ],
  },
  {
    unitId: '1f1',
    code: '1F1',
    title: 'Inquiry and investigation',
    blurb: 'Ask, try, check, explain.',
    strand: 'inquiry',
    parts: [
      { id: '1f1-p1', code: 'Step 1', part: 1, kind: 'inquiry', title: 'Ask & check', blurb: 'Guess, then see!', lessonId: '1f1-ask' },
      { id: '1f1-p2', code: 'Step 2', part: 2, kind: 'inquiry', title: 'Explain why', blurb: 'Say what you notice!', lessonId: '1f1-explain' },
    ],
  },
]

/** Flat unit cards for any leftover UI — all playable via series. */
export const p1Units: P1Unit[] = allUnitSeries.map((s) => ({
  id: s.unitId,
  code: s.code,
  title: s.title,
  strand: s.strand,
  blurb: s.blurb,
  playable: true,
  lessonId: s.parts[0]?.lessonId,
}))

export const strandOrder = ['number', 'measures', 'shape', 'inquiry'] as const

export const allLessons: Lesson[] = [
  ...numbersTo20Lessons,
  ...restOfP1Lessons,
]

/** Curriculum order for next-step chaining */
export const lessonOrder: string[] = allUnitSeries.flatMap((s) =>
  s.parts.map((p) => p.lessonId),
)

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

export function nextLessonId(id: string): string | null {
  const i = lessonOrder.indexOf(id)
  if (i < 0 || i >= lessonOrder.length - 1) return null
  return lessonOrder[i + 1]
}
