import type { Lesson, P1Unit } from './types'
import { numbersTo20Lessons } from './numbersTo20'

export const heroLessonId = '1n1-count-small'

export type SeriesKind = 'count' | 'compare' | 'pairs' | 'split'

export type SeriesPart = {
  id: string
  code: string
  part: number
  kind: SeriesKind
  title: string
  blurb: string
  lessonId: string
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

export const p1Units: P1Unit[] = [
  {
    id: '1n2',
    code: '1N2',
    title: 'Basic addition and subtraction',
    strand: 'number',
    blurb: 'Merge, take away, and see how + and − fit together.',
    playable: false,
  },
  {
    id: '1n3',
    code: '1N3',
    title: 'Numbers to 100',
    strand: 'number',
    blurb: 'Build tens and ones up to 100.',
    playable: false,
  },
  {
    id: '1n4',
    code: '1N4',
    title: 'Addition and subtraction (I)',
    strand: 'number',
    blurb: 'Written +/− with carrying and borrowing foundations.',
    playable: false,
  },
  {
    id: '1m1',
    code: '1M1',
    title: 'Length and distance (I)',
    strand: 'measures',
    blurb: 'Compare longer and shorter with everyday objects.',
    playable: false,
  },
  {
    id: '1m2',
    code: '1M2',
    title: 'Money (I)',
    strand: 'measures',
    blurb: 'Recognise coins and notes used every day.',
    playable: false,
  },
  {
    id: '1m3',
    code: '1M3',
    title: 'Length and distance (II)',
    strand: 'measures',
    blurb: 'Measure with non-standard and early standard units.',
    playable: false,
  },
  {
    id: '1m4',
    code: '1M4',
    title: 'Time (I)',
    strand: 'measures',
    blurb: 'Days, clocks, and sequencing events.',
    playable: false,
  },
  {
    id: '1s1',
    code: '1S1',
    title: '3-D shapes (I)',
    strand: 'shape',
    blurb: 'Name and sort cubes, cylinders, spheres, and more.',
    playable: false,
  },
  {
    id: '1s2',
    code: '1S2',
    title: '2-D shapes',
    strand: 'shape',
    blurb: 'Circles, triangles, squares — count the sides.',
    playable: false,
  },
  {
    id: '1s3',
    code: '1S3',
    title: 'Directions and positions (I)',
    strand: 'shape',
    blurb: 'Above, below, left, right — where is it?',
    playable: false,
  },
  {
    id: '1f1',
    code: '1F1',
    title: 'Inquiry and investigation',
    strand: 'inquiry',
    blurb: 'Ask, try, and explain with maths.',
    playable: false,
  },
]

export const strandOrder = ['number', 'measures', 'shape', 'inquiry'] as const

export const allLessons: Lesson[] = [...numbersTo20Lessons]

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

export function nextLessonId(id: string): string | null {
  const order = numbersTo20Lessons.map((l) => l.id)
  const i = order.indexOf(id)
  if (i < 0 || i >= order.length - 1) return null
  return order[i + 1]
}
