import type { P1Unit } from './types'
import { numbersTo20Lesson } from './numbersTo20'
import type { Lesson } from './types'

export const heroLessonId = '1n1-numbers-to-20'

export const p1Units: P1Unit[] = [
  {
    id: '1n1',
    code: '1N1',
    title: 'Numbers to 20',
    strand: 'number',
    blurb: 'Count, compare, and split numbers — how many is a number?',
    playable: true,
    lessonId: heroLessonId,
  },
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

export const allLessons: Lesson[] = [numbersTo20Lesson]

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

export function nextLessonId(_id: string): string | null {
  return null
}
