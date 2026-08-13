import type { Lesson } from './types'

/** Tiny step-by-step lessons for ~age 6. Each = one idea, few examples, Q then A. */

function countQA(
  id: string,
  n: number,
  qPrompt: string,
  aPrompt: string,
): Lesson['beats'] {
  return [
    {
      id: `${id}q`,
      caption: 'Think…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: n, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: `${n} — yes!`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: n, showAnswer: true },
      },
    },
  ]
}

function compareQA(
  id: string,
  a: number,
  b: number,
  qPrompt: string,
  aCaption: string,
  aPrompt: string,
): Lesson['beats'] {
  return [
    {
      id: `${id}q`,
      caption: 'Look…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: a, groupB: b, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: aCaption,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: a, groupB: b, showAnswer: true },
      },
    },
  ]
}

function oddEvenQA(
  id: string,
  n: number,
  qPrompt: string,
  aCaption: string,
  aPrompt: string,
): Lesson['beats'] {
  return [
    {
      id: `${id}q`,
      caption: 'Think…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: n, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: aCaption,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: n, showAnswer: true },
      },
    },
  ]
}

function splitQA(
  id: string,
  total: number,
  partA: number,
  partB: number,
  qPrompt: string,
  aPrompt: string,
): Lesson['beats'] {
  return [
    {
      id: `${id}q`,
      caption: String(total),
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total,
          partA,
          partB,
          showAnswer: false,
        },
      },
    },
    {
      id: `${id}a`,
      caption: `${partA} + ${partB} = ${total}`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: {
          mode: 'landed',
          total,
          partA,
          partB,
          showAnswer: true,
        },
      },
    },
  ]
}

/** 1 · Count small numbers */
export const lessonCountSmall: Lesson = {
  id: '1n1-count-small',
  title: 'Step 1 · Count to 5',
  subtitle: 'Tiny groups first!',
  lab: true,
  gotItSub: 'You can count to 5. Super start!',
  beats: [
    ...countQA('a', 2, 'How many dots?', 'Two! Great!'),
    ...countQA('b', 3, 'How many now?', 'Three! Yes!'),
    ...countQA('c', 5, 'How many?', 'Five! You did it!'),
  ],
}

/** 2 · Count bigger */
export const lessonCountBig: Lesson = {
  id: '1n1-count-big',
  title: 'Step 2 · Count to 10',
  subtitle: 'A little more!',
  lab: true,
  gotItSub: 'You can count to 10. Amazing!',
  beats: [
    ...countQA('a', 6, 'How many dots?', 'Six! Nice!'),
    ...countQA('b', 8, 'Count these!', 'Eight! Super!'),
    ...countQA('c', 10, 'How many?', 'Ten! Wow!'),
  ],
}

/** 3 · Which has more */
export const lessonMore: Lesson = {
  id: '1n1-more',
  title: 'Step 3 · Which has more?',
  subtitle: 'Find the bigger group!',
  lab: true,
  gotItSub: 'You can find which has more. Brilliant!',
  beats: [
    ...compareQA(
      'a',
      5,
      2,
      'Which has more — red or blue?',
      '5 more · 2 less',
      'Red has more. Good eyes!',
    ),
    ...compareQA(
      'b',
      3,
      7,
      'Which has more?',
      '3 less · 7 more',
      'Blue has more. Yes!',
    ),
    ...compareQA(
      'c',
      8,
      4,
      'Which side is more?',
      '8 more · 4 less',
      'Red has more. Fantastic!',
    ),
  ],
}

/** 4 · Which has less */
export const lessonLess: Lesson = {
  id: '1n1-less',
  title: 'Step 4 · Which has less?',
  subtitle: 'Find the smaller group!',
  lab: true,
  gotItSub: 'You can find which has less. Clever!',
  beats: [
    ...compareQA(
      'a',
      6,
      3,
      'Which has less?',
      '6 more · 3 less',
      'Blue has less. Nice!',
    ),
    ...compareQA(
      'b',
      2,
      5,
      'Which has less — red or blue?',
      '2 less · 5 more',
      'Red has less. Yes!',
    ),
    ...compareQA(
      'c',
      4,
      9,
      'Which side is less?',
      '4 less · 9 more',
      'Red has less. Great job!',
    ),
  ],
}

/** 5 · Same */
export const lessonSame: Lesson = {
  id: '1n1-same',
  title: 'Step 5 · The same!',
  subtitle: 'When both sides match',
  lab: true,
  gotItSub: 'You can spot the same number. Smart!',
  beats: [
    ...compareQA(
      'a',
      3,
      3,
      'More, less, or the same?',
      'Same — 3 and 3',
      'Same! Clever!',
    ),
    ...compareQA(
      'b',
      5,
      5,
      'Are they the same?',
      'Same — 5 and 5',
      'Yes — same on both sides!',
    ),
    ...compareQA(
      'c',
      4,
      4,
      'Look carefully…',
      'Same — 4 and 4',
      'Same again! You rock!',
    ),
  ],
}

/** 6 · Even */
export const lessonEven: Lesson = {
  id: '1n1-even',
  title: 'Step 6 · Even — all in pairs',
  subtitle: 'Everyone finds a friend!',
  lab: true,
  gotItSub: 'Even numbers make pairs. You got it!',
  beats: [
    ...oddEvenQA(
      'a',
      4,
      'Can everyone find a pair?',
      '4 — even!',
      'Yes! All in pairs. Hooray!',
    ),
    ...oddEvenQA(
      'b',
      6,
      'Six friends — any left alone?',
      '6 — even!',
      'No one left! Even!',
    ),
    ...oddEvenQA(
      'c',
      8,
      'Eight — pairs?',
      '8 — even!',
      'Perfect pairs. Awesome!',
    ),
  ],
}

/** 7 · Odd */
export const lessonOdd: Lesson = {
  id: '1n1-odd',
  title: 'Step 7 · Odd — one left alone',
  subtitle: 'Someone has no pair!',
  lab: true,
  gotItSub: 'Odd numbers leave one alone. You spotted it!',
  beats: [
    ...oddEvenQA(
      'a',
      3,
      'Can everyone find a pair?',
      '3 — odd!',
      'One left alone. That’s odd!',
    ),
    ...oddEvenQA(
      'b',
      5,
      'Five friends?',
      '5 — odd!',
      'One left alone. Yes!',
    ),
    ...oddEvenQA(
      'c',
      7,
      'Seven — leftover?',
      '7 — odd!',
      'One alone. Great spotting!',
    ),
  ],
}

/** 8 · Split small */
export const lessonSplitSmall: Lesson = {
  id: '1n1-split-small',
  title: 'Step 8 · Split small numbers',
  subtitle: 'Pull apart tiny totals!',
  lab: true,
  gotItSub: 'You can split small numbers. Cool!',
  beats: [
    ...splitQA('a', 4, 1, 3, 'Can we split 4?', '1 and 3 make 4. Cool!'),
    ...splitQA('b', 5, 2, 3, 'Can we split 5?', '2 and 3 make 5. Nice!'),
    ...splitQA('c', 6, 2, 4, 'Can we split 6?', '2 and 4 make 6. Yes!'),
  ],
}

/** 9 · Split to 10 */
export const lessonSplitTen: Lesson = {
  id: '1n1-split-ten',
  title: 'Step 9 · Split to 10',
  subtitle: 'Bigger splits!',
  lab: true,
  gotItSub: 'You can split numbers up to 10. Super!',
  beats: [
    ...splitQA('a', 8, 3, 5, 'Can we split 8?', '3 and 5 make 8. Nice!'),
    ...splitQA('b', 9, 4, 5, 'Can we split 9?', '4 and 5 make 9. Yes!'),
    ...splitQA('c', 10, 4, 6, 'Can we split 10?', '4 and 6 make 10. Wow!'),
  ],
}

/** 10 · Split more ways */
export const lessonSplitWays: Lesson = {
  id: '1n1-split-ways',
  title: 'Step 10 · Many ways to split',
  subtitle: 'Same total, different parts!',
  lab: true,
  gotItSub: 'One number can split many ways. Superstar!',
  beats: [
    ...splitQA('a', 10, 1, 9, 'Another way to split 10?', '1 and 9 make 10 too!'),
    ...splitQA('b', 12, 5, 7, 'Can we split 12?', '5 and 7 make 12. Yes!'),
    ...splitQA(
      'c',
      12,
      6,
      6,
      'Another way for 12?',
      '6 and 6 — same both sides. You rock!',
    ),
  ],
}

export const numbersTo20Lessons: Lesson[] = [
  lessonCountSmall,
  lessonCountBig,
  lessonMore,
  lessonLess,
  lessonSame,
  lessonEven,
  lessonOdd,
  lessonSplitSmall,
  lessonSplitTen,
  lessonSplitWays,
]

export const numbersTo20Lesson = lessonCountSmall
