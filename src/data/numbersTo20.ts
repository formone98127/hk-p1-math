import type { Lesson } from './types'

/** Flagship — 1N1 Numbers to 20 (EDB KS1). */
export const numbersTo20Lesson: Lesson = {
  id: '1n1-numbers-to-20',
  title: 'How many is a number?',
  subtitle: 'Count, compare, then split — compose & decompose',
  lab: true,
  beats: [
    {
      id: 'n0',
      caption: 'How many?',
      prompt: 'Look at the counters. Can you tell how many without counting yet?',
      viz: { type: 'numberLab', props: { mode: 'ask', countTo: 7 } },
    },
    {
      id: 'n1',
      caption: 'Count onwards',
      prompt: 'Count one by one. The numeral names how many.',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 7 } },
    },
    {
      id: 'n2',
      caption: 'More or less',
      prompt: 'Which group has more? Which has less? (No need for > or <.)',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3 },
      },
    },
    {
      id: 'n3',
      caption: 'Odd or even',
      prompt: 'Walk in pairs of two. Is anyone left alone?',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 7 } },
    },
    {
      id: 'n4',
      caption: 'Split the number',
      prompt: 'Can 12 be two parts that make it again?',
      gate: 'interact',
      viz: {
        type: 'numberLab',
        props: { mode: 'challenge', total: 12, partA: 4, partB: 8 },
      },
    },
    {
      id: 'n5',
      caption: 'Compose & decompose',
      prompt: '4 and 8 make 12. 12 is 4 and 8.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 12, partA: 4, partB: 8 },
      },
    },
    {
      id: 'n6',
      caption: 'Always true',
      prompt: 'Any number (2–18) can split into two parts that remake it.',
      viz: {
        type: 'numberLab',
        props: { mode: 'generalize', total: 15, partA: 7, partB: 8 },
      },
    },
  ],
}
