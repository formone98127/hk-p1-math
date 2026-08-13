import { compareQA, countQA, oddEvenQA, splitQA, lesson } from './builders'
import type { Lesson } from './types'

/** 1 · Count small numbers — 5 examples */
export const lessonCountSmall = lesson(
  '1n1-count-small',
  'Step 1 · Count to 5',
  'Tiny groups first!',
  'You can count to 5. Super start!',
  [
    ...countQA('a', 1, 'How many dots?', 'One! Great!'),
    ...countQA('b', 2, 'How many now?', 'Two! Yes!'),
    ...countQA('c', 3, 'How many?', 'Three! Nice!'),
    ...countQA('d', 4, 'Count these!', 'Four! Super!'),
    ...countQA('e', 5, 'How many?', 'Five! You did it!'),
  ],
)

/** 2 · Count bigger */
export const lessonCountBig = lesson(
  '1n1-count-big',
  'Step 2 · Count to 10',
  'A little more!',
  'You can count to 10. Amazing!',
  [
    ...countQA('a', 6, 'How many dots?', 'Six! Nice!'),
    ...countQA('b', 7, 'Count these!', 'Seven! Yes!'),
    ...countQA('c', 8, 'How many?', 'Eight! Super!'),
    ...countQA('d', 9, 'Almost ten…', 'Nine! Great!'),
    ...countQA('e', 10, 'How many?', 'Ten! Wow!'),
  ],
)

/** 3 · Which has more */
export const lessonMore = lesson(
  '1n1-more',
  'Step 3 · Which has more?',
  'Find the bigger group!',
  'You can find which has more. Brilliant!',
  [
    ...compareQA('a', 5, 2, 'Which has more — red or blue?', '5 more · 2 less', 'Red has more. Good eyes!'),
    ...compareQA('b', 3, 7, 'Which has more?', '3 less · 7 more', 'Blue has more. Yes!'),
    ...compareQA('c', 8, 4, 'Which side is more?', '8 more · 4 less', 'Red has more. Fantastic!'),
    ...compareQA('d', 1, 6, 'Which has more?', '1 less · 6 more', 'Blue has more. Nice!'),
    ...compareQA('e', 9, 5, 'Look carefully…', '9 more · 5 less', 'Red has more. You rock!'),
  ],
)

/** 4 · Which has less */
export const lessonLess = lesson(
  '1n1-less',
  'Step 4 · Which has less?',
  'Find the smaller group!',
  'You can find which has less. Clever!',
  [
    ...compareQA('a', 6, 3, 'Which has less?', '6 more · 3 less', 'Blue has less. Nice!'),
    ...compareQA('b', 2, 5, 'Which has less — red or blue?', '2 less · 5 more', 'Red has less. Yes!'),
    ...compareQA('c', 4, 9, 'Which side is less?', '4 less · 9 more', 'Red has less. Great job!'),
    ...compareQA('d', 8, 1, 'Which has less?', '8 more · 1 less', 'Blue has less. Super!'),
    ...compareQA('e', 7, 3, 'Find the smaller group!', '7 more · 3 less', 'Blue has less. Clever!'),
  ],
)

/** 5 · Same */
export const lessonSame = lesson(
  '1n1-same',
  'Step 5 · The same!',
  'When both sides match',
  'You can spot the same number. Smart!',
  [
    ...compareQA('a', 3, 3, 'More, less, or the same?', 'Same — 3 and 3', 'Same! Clever!'),
    ...compareQA('b', 5, 5, 'Are they the same?', 'Same — 5 and 5', 'Yes — same on both sides!'),
    ...compareQA('c', 4, 4, 'Look carefully…', 'Same — 4 and 4', 'Same again! You rock!'),
    ...compareQA('d', 2, 2, 'Match?', 'Same — 2 and 2', 'Same! Perfect!'),
    ...compareQA('e', 6, 6, 'Are both sides equal?', 'Same — 6 and 6', 'Same! Superstar!'),
  ],
)

/** 6 · Even */
export const lessonEven = lesson(
  '1n1-even',
  'Step 6 · Even — all in pairs',
  'Everyone finds a friend!',
  'Even numbers make pairs. You got it!',
  [
    ...oddEvenQA('a', 2, 'Can everyone find a pair?', '2 — even!', 'Yes! A pair. Hooray!'),
    ...oddEvenQA('b', 4, 'Four friends — pairs?', '4 — even!', 'All in pairs. Yes!'),
    ...oddEvenQA('c', 6, 'Six — any left alone?', '6 — even!', 'No one left! Even!'),
    ...oddEvenQA('d', 8, 'Eight — pairs?', '8 — even!', 'Perfect pairs. Awesome!'),
    ...oddEvenQA('e', 10, 'Ten friends?', '10 — even!', 'All paired up. Brilliant!'),
  ],
)

/** 7 · Odd */
export const lessonOdd = lesson(
  '1n1-odd',
  'Step 7 · Odd — one left alone',
  'Someone has no pair!',
  'Odd numbers leave one alone. You spotted it!',
  [
    ...oddEvenQA('a', 1, 'Can everyone find a pair?', '1 — odd!', 'One alone. That’s odd!'),
    ...oddEvenQA('b', 3, 'Three friends?', '3 — odd!', 'One left alone. Yes!'),
    ...oddEvenQA('c', 5, 'Five — leftover?', '5 — odd!', 'One alone. Great spotting!'),
    ...oddEvenQA('d', 7, 'Seven friends?', '7 — odd!', 'One left. Clever!'),
    ...oddEvenQA('e', 9, 'Nine — pairs?', '9 — odd!', 'One alone. You got it!'),
  ],
)

/** 8 · Split small */
export const lessonSplitSmall = lesson(
  '1n1-split-small',
  'Step 8 · Split small numbers',
  'Pull apart tiny totals!',
  'You can split small numbers. Cool!',
  [
    ...splitQA('a', 3, 1, 2, 'Can we split 3?', '1 and 2 make 3. Cool!'),
    ...splitQA('b', 4, 1, 3, 'Can we split 4?', '1 and 3 make 4. Nice!'),
    ...splitQA('c', 5, 2, 3, 'Can we split 5?', '2 and 3 make 5. Yes!'),
    ...splitQA('d', 6, 2, 4, 'Can we split 6?', '2 and 4 make 6. Super!'),
    ...splitQA('e', 7, 3, 4, 'Can we split 7?', '3 and 4 make 7. Wow!'),
  ],
)

/** 9 · Split to 10 */
export const lessonSplitTen = lesson(
  '1n1-split-ten',
  'Step 9 · Split to 10',
  'Bigger splits!',
  'You can split numbers up to 10. Super!',
  [
    ...splitQA('a', 8, 3, 5, 'Can we split 8?', '3 and 5 make 8. Nice!'),
    ...splitQA('b', 9, 4, 5, 'Can we split 9?', '4 and 5 make 9. Yes!'),
    ...splitQA('c', 10, 4, 6, 'Can we split 10?', '4 and 6 make 10. Wow!'),
    ...splitQA('d', 10, 2, 8, 'Another way for 10?', '2 and 8 make 10 too!'),
    ...splitQA('e', 10, 5, 5, 'Split 10 in half?', '5 and 5 — same both sides!'),
  ],
)

/** 10 · Split more ways */
export const lessonSplitWays = lesson(
  '1n1-split-ways',
  'Step 10 · Many ways to split',
  'Same total, different parts!',
  'One number can split many ways. Superstar!',
  [
    ...splitQA('a', 10, 1, 9, 'Another way to split 10?', '1 and 9 make 10 too!'),
    ...splitQA('b', 12, 5, 7, 'Can we split 12?', '5 and 7 make 12. Yes!'),
    ...splitQA('c', 12, 6, 6, 'Another way for 12?', '6 and 6 — same both sides!'),
    ...splitQA('d', 14, 6, 8, 'Can we split 14?', '6 and 8 make 14. Nice!'),
    ...splitQA('e', 16, 7, 9, 'Can we split 16?', '7 and 9 make 16. You rock!'),
  ],
)

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
