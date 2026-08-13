import type { Lesson } from './types'

/** 1N1 split into short kid-paced parts — one idea at a time, many examples. */

export const countLesson: Lesson = {
  id: '1n1-count',
  title: 'Part 1 · How many?',
  subtitle: 'Count one by one — the number names how many',
  lab: true,
  gotItSub: 'The number tells how many there are.',
  beats: [
    {
      id: 'c0',
      caption: 'Look',
      prompt: 'How many yellow dots?',
      viz: { type: 'numberLab', props: { mode: 'ask', countTo: 3 } },
    },
    {
      id: 'c1',
      caption: 'Count',
      prompt: 'Count with me: one, two, three.',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 3 } },
    },
    {
      id: 'c2',
      caption: 'Try again',
      prompt: 'New dots! How many now?',
      viz: { type: 'numberLab', props: { mode: 'ask', countTo: 5 } },
    },
    {
      id: 'c3',
      caption: 'Count',
      prompt: 'One, two, three, four, five.',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 5 } },
    },
    {
      id: 'c4',
      caption: 'Bigger group',
      prompt: 'How many this time?',
      viz: { type: 'numberLab', props: { mode: 'ask', countTo: 8 } },
    },
    {
      id: 'c5',
      caption: 'Count',
      prompt: 'Count all the way to eight.',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 8 } },
    },
    {
      id: 'c6',
      caption: 'One more try',
      prompt: 'Last one — how many?',
      viz: { type: 'numberLab', props: { mode: 'ask', countTo: 10 } },
    },
    {
      id: 'c7',
      caption: 'Ten!',
      prompt: 'Ten means there are ten dots.',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 10 } },
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
      caption: 'Two groups',
      prompt: 'Red or blue — which has more?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3 },
      },
    },
    {
      id: 'm1',
      caption: 'Try again',
      prompt: 'Which side has more dots?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 2, groupB: 6 },
      },
    },
    {
      id: 'm2',
      caption: 'Same?',
      prompt: 'Look carefully — more, less, or the same?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 4, groupB: 4 },
      },
    },
    {
      id: 'm3',
      caption: 'Another one',
      prompt: 'Which group has less?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 7, groupB: 4 },
      },
    },
    {
      id: 'm4',
      caption: 'One more',
      prompt: 'More or less?',
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
      caption: 'Hold hands',
      prompt: 'Can everyone find a pair?',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 4 } },
    },
    {
      id: 'o1',
      caption: 'Try 5',
      prompt: 'What about five friends?',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 5 } },
    },
    {
      id: 'o2',
      caption: 'Try 6',
      prompt: 'Six friends — any left alone?',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 6 } },
    },
    {
      id: 'o3',
      caption: 'Try 7',
      prompt: 'Seven — pairs or leftover?',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 7 } },
    },
    {
      id: 'o4',
      caption: 'Try 8',
      prompt: 'Eight friends holding hands.',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 8 } },
    },
    {
      id: 'o5',
      caption: 'Try 9',
      prompt: 'Nine — is one left alone?',
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
      caption: 'Split 6',
      prompt: 'Tap to split 6 into two parts.',
      gate: 'interact',
      viz: {
        type: 'numberLab',
        props: { mode: 'challenge', total: 6, partA: 2, partB: 4 },
      },
    },
    {
      id: 's1',
      caption: 'See?',
      prompt: '2 and 4 make 6.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 6, partA: 2, partB: 4 },
      },
    },
    {
      id: 's2',
      caption: 'Split 8',
      prompt: 'Now split 8 another way.',
      gate: 'interact',
      viz: {
        type: 'numberLab',
        props: { mode: 'challenge', total: 8, partA: 3, partB: 5 },
      },
    },
    {
      id: 's3',
      caption: 'Join',
      prompt: '3 and 5 make 8.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 8, partA: 3, partB: 5 },
      },
    },
    {
      id: 's4',
      caption: 'Split 10',
      prompt: 'Split ten into two parts.',
      gate: 'interact',
      viz: {
        type: 'numberLab',
        props: { mode: 'challenge', total: 10, partA: 4, partB: 6 },
      },
    },
    {
      id: 's5',
      caption: 'Join',
      prompt: '4 and 6 make 10.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 10, partA: 4, partB: 6 },
      },
    },
    {
      id: 's6',
      caption: 'Split 12',
      prompt: 'One more — split 12.',
      gate: 'interact',
      viz: {
        type: 'numberLab',
        props: { mode: 'challenge', total: 12, partA: 5, partB: 7 },
      },
    },
    {
      id: 's7',
      caption: 'Always works',
      prompt: '5 and 7 make 12. You can split numbers this way again and again.',
      viz: {
        type: 'numberLab',
        props: { mode: 'generalize', total: 12, partA: 5, partB: 7 },
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

/** @deprecated use numbersTo20Lessons[0] */
export const numbersTo20Lesson = countLesson
