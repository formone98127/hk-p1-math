import type { Lesson } from './types'

/** 1N1 — short parts; big kid-friendly encouraging copy. */

export const countLesson: Lesson = {
  id: '1n1-count',
  title: 'Part 1 · How many?',
  subtitle: 'Count with me!',
  lab: true,
  gotItSub: 'Yes! The number tells how many. You’re a counting star!',
  beats: [
    {
      id: 'c0',
      caption: '3 — yes!',
      prompt: 'How many? Three! Great counting!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 3 } },
    },
    {
      id: 'c1',
      caption: '5 — yes!',
      prompt: 'How many? Five! You got it!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 5 } },
    },
    {
      id: 'c2',
      caption: '8 — yes!',
      prompt: 'How many? Eight! Super!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 8 } },
    },
    {
      id: 'c3',
      caption: '10 — yes!',
      prompt: 'How many? Ten! Amazing!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 10 } },
    },
    {
      id: 'c4',
      caption: '4 — yes!',
      prompt: 'How many? Four! Nice work!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 4 } },
    },
    {
      id: 'c5',
      caption: '7 — yes!',
      prompt: 'How many? Seven! You’re doing so well!',
      viz: { type: 'numberLab', props: { mode: 'count', countTo: 7 } },
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
      id: 'm0',
      caption: '5 more · 3 less',
      prompt: 'Look! Red has more. Blue has less. Good eyes!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 5, groupB: 3 },
      },
    },
    {
      id: 'm1',
      caption: '2 less · 6 more',
      prompt: 'Blue has more. Red has less. Yes!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 2, groupB: 6 },
      },
    },
    {
      id: 'm2',
      caption: 'Same — 4 and 4',
      prompt: 'Wow — same on both sides! Clever!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 4, groupB: 4 },
      },
    },
    {
      id: 'm3',
      caption: '7 more · 4 less',
      prompt: 'Red has more. Blue has less. You see it!',
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: 7, groupB: 4 },
      },
    },
    {
      id: 'm4',
      caption: '3 less · 8 more',
      prompt: 'Blue has more. Red has less. Fantastic!',
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
  subtitle: 'Find a friend!',
  lab: true,
  gotItSub: 'Even makes pairs. Odd leaves one alone. You nailed it!',
  beats: [
    {
      id: 'o0',
      caption: '4 — even!',
      prompt: 'Four friends — everyone has a pair! Hooray!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 4 } },
    },
    {
      id: 'o1',
      caption: '5 — odd!',
      prompt: 'Five — one friend is left alone. That’s odd!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 5 } },
    },
    {
      id: 'o2',
      caption: '6 — even!',
      prompt: 'Six — all in pairs. Perfect!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 6 } },
    },
    {
      id: 'o3',
      caption: '7 — odd!',
      prompt: 'Seven — one left alone. You spotted it!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 7 } },
    },
    {
      id: 'o4',
      caption: '8 — even!',
      prompt: 'Eight — perfect pairs. Awesome!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 8 } },
    },
    {
      id: 'o5',
      caption: '9 — odd!',
      prompt: 'Nine — one left alone. Great job!',
      viz: { type: 'numberLab', props: { mode: 'oddEven', countTo: 9 } },
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
      id: 's0',
      caption: '2 + 4 = 6',
      prompt: 'Watch! 6 splits into 2 and 4. Cool!',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 6, partA: 2, partB: 4 },
      },
    },
    {
      id: 's1',
      caption: '3 + 5 = 8',
      prompt: 'See? 8 splits into 3 and 5. Nice!',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 8, partA: 3, partB: 5 },
      },
    },
    {
      id: 's2',
      caption: '4 + 6 = 10',
      prompt: 'Look! 10 splits into 4 and 6. Yes!',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 10, partA: 4, partB: 6 },
      },
    },
    {
      id: 's3',
      caption: '5 + 7 = 12',
      prompt: 'Wow! 12 splits into 5 and 7.',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 12, partA: 5, partB: 7 },
      },
    },
    {
      id: 's4',
      caption: '1 + 9 = 10',
      prompt: 'Another way! 10 is also 1 and 9. Clever!',
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total: 10, partA: 1, partB: 9 },
      },
    },
    {
      id: 's5',
      caption: '6 + 6 = 12',
      prompt: 'Same both sides — 6 and 6 make 12. You rock!',
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
