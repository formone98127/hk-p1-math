import type { Lesson } from './types'

/** Each example = question beat, then answer beat (never together). */

export const countLesson: Lesson = {
  id: '1n1-count',
  title: 'Part 1 · How many?',
  subtitle: 'Count with me!',
  lab: true,
  gotItSub: 'Yes! The number tells how many. You’re a counting star!',
  beats: [
    {
      id: 'c0q',
      caption: 'Think…',
      prompt: 'How many yellow dots?',
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: 3, showAnswer: false },
      },
    },
    {
      id: 'c0a',
      caption: '3 — yes!',
      prompt: 'Three! Great counting!',
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: 3, showAnswer: true },
      },
    },
    {
      id: 'c1q',
      caption: 'Think…',
      prompt: 'How many now?',
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: 5, showAnswer: false },
      },
    },
    {
      id: 'c1a',
      caption: '5 — yes!',
      prompt: 'Five! You got it!',
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: 5, showAnswer: true },
      },
    },
    {
      id: 'c2q',
      caption: 'Think…',
      prompt: 'Can you count these?',
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: 8, showAnswer: false },
      },
    },
    {
      id: 'c2a',
      caption: '8 — yes!',
      prompt: 'Eight! Super!',
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: 8, showAnswer: true },
      },
    },
    {
      id: 'c3q',
      caption: 'Think…',
      prompt: 'How many dots?',
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: 10, showAnswer: false },
      },
    },
    {
      id: 'c3a',
      caption: '10 — yes!',
      prompt: 'Ten! Amazing!',
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: 10, showAnswer: true },
      },
    },
  ],
}

export const compareLesson: Lesson = {
  id: '1n1-compare',
  title: 'Part 2 · More or less?',
  subtitle: 'Let’s compare!',
  lab: true,
  gotItSub: 'You can spot more and less. Brilliant!',
  beats: [
    {
      id: 'm0q',
      caption: 'Look…',
      prompt: 'Which has more — red or blue?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3, showAnswer: false },
      },
    },
    {
      id: 'm0a',
      caption: '5 more · 3 less',
      prompt: 'Red has more. Blue has less. Good eyes!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3, showAnswer: true },
      },
    },
    {
      id: 'm1q',
      caption: 'Look…',
      prompt: 'Which side has more?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 2, groupB: 6, showAnswer: false },
      },
    },
    {
      id: 'm1a',
      caption: '2 less · 6 more',
      prompt: 'Blue has more. Red has less. Yes!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 2, groupB: 6, showAnswer: true },
      },
    },
    {
      id: 'm2q',
      caption: 'Look…',
      prompt: 'More, less, or the same?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 4, groupB: 4, showAnswer: false },
      },
    },
    {
      id: 'm2a',
      caption: 'Same — 4 and 4',
      prompt: 'Same on both sides! Clever!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 4, groupB: 4, showAnswer: true },
      },
    },
    {
      id: 'm3q',
      caption: 'Look…',
      prompt: 'Which has less?',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 7, groupB: 4, showAnswer: false },
      },
    },
    {
      id: 'm3a',
      caption: '7 more · 4 less',
      prompt: 'Red has more. Blue has less. Fantastic!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 7, groupB: 4, showAnswer: true },
      },
    },
  ],
}

export const oddEvenLesson: Lesson = {
  id: '1n1-odd-even',
  title: 'Part 3 · Pairs',
  subtitle: 'Find a friend!',
  lab: true,
  gotItSub: 'Even makes pairs. Odd leaves one alone. You nailed it!',
  beats: [
    {
      id: 'o0q',
      caption: 'Think…',
      prompt: 'Can everyone find a pair?',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 4, showAnswer: false },
      },
    },
    {
      id: 'o0a',
      caption: '4 — even!',
      prompt: 'Yes! Everyone has a pair. Hooray!',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 4, showAnswer: true },
      },
    },
    {
      id: 'o1q',
      caption: 'Think…',
      prompt: 'What about five friends?',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 5, showAnswer: false },
      },
    },
    {
      id: 'o1a',
      caption: '5 — odd!',
      prompt: 'One friend is left alone. That’s odd!',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 5, showAnswer: true },
      },
    },
    {
      id: 'o2q',
      caption: 'Think…',
      prompt: 'Six friends — any left alone?',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 6, showAnswer: false },
      },
    },
    {
      id: 'o2a',
      caption: '6 — even!',
      prompt: 'All in pairs. Perfect!',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 6, showAnswer: true },
      },
    },
    {
      id: 'o3q',
      caption: 'Think…',
      prompt: 'Seven — pairs or leftover?',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 7, showAnswer: false },
      },
    },
    {
      id: 'o3a',
      caption: '7 — odd!',
      prompt: 'One left alone. You spotted it!',
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: 7, showAnswer: true },
      },
    },
  ],
}

export const splitLesson: Lesson = {
  id: '1n1-split',
  title: 'Part 4 · Split & join',
  subtitle: 'Pull apart, put together!',
  lab: true,
  gotItSub: 'You can split a number and join it again. Superstar!',
  beats: [
    {
      id: 's0q',
      caption: '6',
      prompt: 'Can we split 6 into two parts?',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 6,
          partA: 2,
          partB: 4,
          showAnswer: false,
        },
      },
    },
    {
      id: 's0a',
      caption: '2 + 4 = 6',
      prompt: 'Yes! 2 and 4 make 6. Cool!',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 6,
          partA: 2,
          partB: 4,
          showAnswer: true,
        },
      },
    },
    {
      id: 's1q',
      caption: '8',
      prompt: 'Can we split 8?',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 8,
          partA: 3,
          partB: 5,
          showAnswer: false,
        },
      },
    },
    {
      id: 's1a',
      caption: '3 + 5 = 8',
      prompt: '3 and 5 make 8. Nice!',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 8,
          partA: 3,
          partB: 5,
          showAnswer: true,
        },
      },
    },
    {
      id: 's2q',
      caption: '10',
      prompt: 'How can we split 10?',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 10,
          partA: 4,
          partB: 6,
          showAnswer: false,
        },
      },
    },
    {
      id: 's2a',
      caption: '4 + 6 = 10',
      prompt: '4 and 6 make 10. Yes!',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 10,
          partA: 4,
          partB: 6,
          showAnswer: true,
        },
      },
    },
    {
      id: 's3q',
      caption: '12',
      prompt: 'Can 12 split too?',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total: 12,
          partA: 5,
          partB: 7,
          showAnswer: false,
        },
      },
    },
    {
      id: 's3a',
      caption: '5 + 7 = 12',
      prompt: '5 and 7 make 12. You rock!',
      viz: {
        type: 'numberLab',
        props: {
          mode: 'generalize',
          total: 12,
          partA: 5,
          partB: 7,
          showAnswer: true,
        },
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
