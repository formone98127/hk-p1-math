import type { Lesson, P1Unit } from './types'
import { numbersTo20Lessons } from './numbersTo20'

export const heroLessonId = '1n1-count'

export type SeriesPart = {
  id: string
  code: string
  part: number
  title: string
  blurb: string
  lessonId: string
}

/** 1N1 broken into short parts for ~age 6. */
export const n1Series: SeriesPart[] = [
  {
    id: '1n1-p1',
    code: '1N1 · 1',
    part: 1,
    title: 'How many?',
    blurb: 'Count the dots. The number says how many.',
    lessonId: '1n1-count',
  },
  {
    id: '1n1-p2',
    code: '1N1 · 2',
    part: 2,
    title: 'More or less?',
    blurb: 'Which group has more? Which has less?',
    lessonId: '1n1-compare',
  },
  {
    id: '1n1-p3',
    code: '1N1 · 3',
    part: 3,
    title: 'Pairs',
    blurb: 'Two by two — anyone left alone?',
    lessonId: '1n1-odd-even',
  },
  {
    id: '1n1-p4',
    code: '1N1 · 4',
    part: 4,
    title: 'Split & join',
    blurb: 'Break a number apart, then put it back.',
    lessonId: '1n1-split',
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
