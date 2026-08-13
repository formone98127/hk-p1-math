import type { Lesson } from './types'

/** 1N1 — short parts; each beat shows question + answer together with motion. */

export const countLesson: Lesson = {
  id: '1n1-count',
  title: 'Part 1 · How many?',
  subtitle: 'Count one by one — the number names how many',
  lab: true,
  gotItSub: 'The number tells how many there are.',
  beats: [
    {
      id: 'c0',
      caption: '3',
      prompt: 'How many? Three!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 3 } },
    },
    {
      id: 'c1',
      caption: '5',
      prompt: 'How many? Five!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 5 } },
    },
    {
      id: 'c2',
      caption: '8',
      prompt: 'How many? Eight!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 8 } },
    },
    {
      id: 'c3',
      caption: '10',
      prompt: 'How many? Ten!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 10 } },
    },
    {
      id: 'c4',
      caption: '4',
      prompt: 'How many? Four!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 4 } },
    },
    {
      id: 'c5',
      caption: '7',
      prompt: 'How many? Seven!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 7 } },
    },
  ],
}

export const compareLesson: Lesson = {
  id: '1n1-compare',
  title: 'Part 2 · More or less?',
  subtitle: 'Which group has more? Which has less?',
  lab: true,
  gotItSub: 'We can say which group has more, and which has less.',
  beats: [
    {
      id: 'm0',
      caption: '5 more · 3 less',
      prompt: 'Red has more. Blue has less.',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3 },
      },
    },
    {
      id: 'm1',
      caption: '2 less · 6 more',
      prompt: 'Blue has more. Red has less.',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 2, groupB: 6 },
      },
    },
    {
      id: 'm2',
      caption: 'Same — 4 and 4',
      prompt: 'Same number on both sides!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 4, groupB: 4 },
      },
    },
    {
      id: 'm3',
      caption: '7 more · 4 less',
      prompt: 'Red has more. Blue has less.',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 7, groupB: 4 },
      },
    },
    {
      id: 'm4',
      caption: '3 less · 8 more',
      prompt: 'Blue has more. Red has less.',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 3, groupB: 8 },
      },
    },
  ],
}

export const oddEvenLesson: Lesson = {
  id: '1n1-odd-even',
  title: 'Part 3 · Pairs',
  subtitle: 'Two by two — is anyone left alone?',
  lab: true,
  gotItSub: 'Even numbers make pairs. Odd numbers leave one alone.',
  beats: [
    {
      id: 'o0',
      caption: '4 — even',
      prompt: 'Four friends — everyone has a pair!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 4 } },
    },
    {
      id: 'o1',
      caption: '5 — odd',
      prompt: 'Five — one friend is left alone.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 5 } },
    },
    {
      id: 'o2',
      caption: '6 — even',
      prompt: 'Six — all in pairs.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 6 } },
    },
    {
      id: 'o3',
      caption: '7 — odd',
      prompt: 'Seven — one left alone.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 7 } },
    },
    {
      id: 'o4',
      caption: '8 — even',
      prompt: 'Eight — perfect pairs.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 8 } },
    },
    {
      id: 'o5',
      caption: '9 — odd',
      prompt: 'Nine — one left alone.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 9 } },
    },
  ],
}

export const splitLesson: Lesson = {
  id: '1n1-split',
  title: 'Part 4 · Split & join',
  subtitle: 'Break a number into two parts — then put it back',
  lab: true,
  gotItSub: 'A number can split into two parts that join to make it again.',
  beats: [
    {
      id: 's0',
      caption: '2 + 4 = 6',
      prompt: 'Watch 6 split into 2 and 4.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 6, partA: 2, partB: 4 },
      },
    },
    {
      id: 's1',
      caption: '3 + 5 = 8',
      prompt: 'Watch 8 split into 3 and 5.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 8, partA: 3, partB: 5 },
      },
    },
    {
      id: 's2',
      caption: '4 + 6 = 10',
      prompt: 'Watch 10 split into 4 and 6.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 10, partA: 4, partB: 6 },
      },
    },
    {
      id: 's3',
      caption: '5 + 7 = 12',
      prompt: 'Watch 12 split into 5 and 7.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 12, partA: 5, partB: 7 },
      },
    },
    {
      id: 's4',
      caption: '1 + 9 = 10',
      prompt: 'Another way: 10 is also 1 and 9.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 10, partA: 1, partB: 9 },
      },
    },
    {
      id: 's5',
      caption: '6 + 6 = 12',
      prompt: 'Same number both sides — 6 and 6 make 12.',
      viz: {
        type: 'numberLab',
        props: { mode: 'generalize', total: 12, partA: 6, partB: 6 },
      },
    },
  ],
}

export const numbersTo20Lessons: Lesson[] = [
  countLesson,
  compareLesson,
  oddEvenLesson,
  splitLesson,
]

export const numbersTo20Lesson = countLesson
