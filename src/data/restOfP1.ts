import {
  addQA,
  compareQA,
  countQA,
  lesson,
  oddEvenQA,
  splitQA,
  subQA,
  tensQA,
  worldQA,
} from './builders'
import type { Lesson } from './types'

/* ───────── 1N2 Basic +/− ───────── */

export const lessonAddMerge = lesson(
  '1n2-add',
  '1N2 · Put together',
  'Merge two groups!',
  'You can add by putting groups together!',
  [
    ...addQA('a', 2, 3, '2 and 3 together — how many?', '2 + 3 = 5. Yes!'),
    ...addQA('b', 4, 1, '4 red + 1 blue?', '4 + 1 = 5. Nice!'),
    ...addQA('c', 3, 5, 'How many altogether?', '3 + 5 = 8. Super!'),
    ...addQA('d', 6, 2, 'Merge them!', '6 + 2 = 8. Great!'),
    ...addQA('e', 7, 4, 'How many in all?', '7 + 4 = 11. Wow!'),
  ],
)

export const lessonSubTake = lesson(
  '1n2-sub',
  '1N2 · Take away',
  'Some leave — how many stay?',
  'You can subtract by taking away!',
  [
    ...subQA('a', 5, 2, '5 dots. Take away 2. Left?', '5 − 2 = 3. Yes!'),
    ...subQA('b', 6, 1, 'Take away 1 from 6.', '6 − 1 = 5. Nice!'),
    ...subQA('c', 8, 3, '8. Take away 3.', '8 − 3 = 5. Super!'),
    ...subQA('d', 9, 4, 'How many left?', '9 − 4 = 5. Great!'),
    ...subQA('e', 10, 6, 'Take away 6 from 10.', '10 − 6 = 4. Wow!'),
  ],
)

export const lessonZero = lesson(
  '1n2-zero',
  '1N2 · Zero',
  'Take all away — what’s left?',
  'Zero means none left. Clever!',
  [
    ...subQA('a', 3, 3, '3. Take away all 3. Left?', '3 − 3 = 0. None!'),
    ...subQA('b', 5, 5, 'Take away every one.', '5 − 5 = 0. Empty!'),
    ...subQA('c', 4, 4, 'All gone?', '4 − 4 = 0. Yes — zero!'),
    ...subQA('d', 2, 2, 'Take both away.', '2 − 2 = 0. Zero!'),
    ...subQA('e', 7, 7, 'Nothing left?', '7 − 7 = 0. You got it!'),
  ],
)

export const lessonAddCommute = lesson(
  '1n2-commute',
  '1N2 · Same sum both ways',
  'Swap the groups — same total!',
  'Order can swap — sum stays. Smart!',
  [
    ...addQA('a', 2, 5, '2 + 5 = ?', '2 + 5 = 7. Yes!'),
    ...addQA('b', 5, 2, 'Now 5 + 2 — same?', '5 + 2 = 7. Same sum!'),
    ...addQA('c', 3, 6, '3 + 6 = ?', '3 + 6 = 9. Nice!'),
    ...addQA('d', 6, 3, 'Swap — 6 + 3?', '6 + 3 = 9. Same again!'),
    ...addQA('e', 4, 7, '4 + 7 — and 7 + 4 both 11!', '4 + 7 = 11. Commute!'),
  ],
)

export const lessonAddSubLink = lesson(
  '1n2-link',
  '1N2 · Add & take away link',
  'Addition and subtraction are friends!',
  'You see how + and − fit. Brilliant!',
  [
    ...addQA('a', 3, 4, '3 + 4 = ?', '3 + 4 = 7. Yes!'),
    ...subQA('b', 7, 4, 'Now take 4 from 7.', '7 − 4 = 3. Back!'),
    ...addQA('c', 5, 3, '5 + 3 = ?', '5 + 3 = 8. Nice!'),
    ...subQA('d', 8, 3, 'Take 3 from 8.', '8 − 3 = 5. Linked!'),
    ...subQA('e', 9, 2, '9 − 2 — then you could add 2 back!', '9 − 2 = 7. Super!'),
  ],
)

/* ───────── 1N3 Numbers to 100 ───────── */

export const lessonTensOnes = lesson(
  '1n3-tens',
  '1N3 · Tens and ones',
  'See tens bundles + leftover ones!',
  'You can see tens and ones. Amazing!',
  [
    ...tensQA('a', 23, 'How many? Tens and ones?', '2 tens + 3 ones = 23!'),
    ...tensQA('b', 35, 'Count the dots!', '3 tens + 5 ones = 35!'),
    ...tensQA('c', 40, 'Any leftover ones?', '4 tens + 0 ones = 40!'),
    ...tensQA('d', 56, 'How many altogether?', '5 tens + 6 ones = 56!'),
    ...tensQA('e', 72, 'Tens and ones?', '7 tens + 2 ones = 72!'),
  ],
)

export const lessonCompare100 = lesson(
  '1n3-compare',
  '1N3 · Bigger numbers',
  'Which group is more?',
  'You can compare bigger amounts. Clever!',
  [
    ...compareQA('a', 8, 5, 'Which has more?', '8 more · 5 less', 'Red has more!'),
    ...compareQA('b', 4, 9, 'Which has more?', '4 less · 9 more', 'Blue has more!'),
    ...compareQA('c', 7, 7, 'More, less, or same?', 'Same — 7 and 7', 'Same!'),
    ...compareQA('d', 10, 6, 'Which side is more?', '10 more · 6 less', 'Red wins!'),
    ...compareQA('e', 3, 8, 'Find the bigger group!', '3 less · 8 more', 'Blue! Nice!'),
  ],
)

export const lessonSkipCount = lesson(
  '1n3-skip',
  '1N3 · Count in jumps',
  'Jump by 2s!',
  'Skip counting feels like a bounce. Cool!',
  [
    ...countQA('a', 2, 'Start: how many?', '2 — first jump!'),
    ...countQA('b', 4, 'Jump by 2…', '4!'),
    ...countQA('c', 6, 'Again…', '6!'),
    ...countQA('d', 8, 'Keep going!', '8!'),
    ...countQA('e', 10, 'Last jump!', '10 — by twos!'),
  ],
)

export const lessonOddEven100 = lesson(
  '1n3-oddeven',
  '1N3 · Odd or even (ones digit)',
  'Look at the last digit!',
  'Ones digit tells odd/even. Smart!',
  [
    ...oddEvenQA('a', 4, 'Pairs?', '4 — even!', 'Even!'),
    ...oddEvenQA('b', 7, 'Anyone alone?', '7 — odd!', 'Odd!'),
    ...oddEvenQA('c', 10, 'Ten — pairs?', '10 — even!', 'Even!'),
    ...oddEvenQA('d', 9, 'Nine?', '9 — odd!', 'Odd!'),
    ...oddEvenQA('e', 8, 'Eight?', '8 — even!', 'Even — you got it!'),
  ],
)

export const lessonEstimate = lesson(
  '1n3-estimate',
  '1N3 · About how many?',
  'Guess, then count!',
  'Estimate then check. Super thinking!',
  [
    ...countQA('a', 5, 'About how many? Then count!', '5 — close guess wins!'),
    ...countQA('b', 8, 'Guess first…', '8!'),
    ...countQA('c', 3, 'A little or a lot?', '3 — a little!'),
    ...countQA('d', 9, 'Near ten?', '9 — almost ten!'),
    ...countQA('e', 6, 'About how many?', '6 — nice estimate!'),
  ],
)

/* ───────── 1N4 Addition & subtraction (I) ───────── */

export const lessonAdd2digit = lesson(
  '1n4-add2',
  '1N4 · Add two numbers',
  'Bigger adds — still put together!',
  'You can add larger groups. Awesome!',
  [
    ...addQA('a', 8, 5, '8 + 5 = ?', '8 + 5 = 13. Yes!'),
    ...addQA('b', 9, 6, '9 + 6 = ?', '9 + 6 = 15. Nice!'),
    ...addQA('c', 7, 8, '7 + 8 = ?', '7 + 8 = 15. Super!'),
    ...addQA('d', 10, 4, '10 + 4 = ?', '10 + 4 = 14. Great!'),
    ...addQA('e', 11, 5, '11 + 5 = ?', '11 + 5 = 16. Wow!'),
  ],
)

export const lessonAddThree = lesson(
  '1n4-add3',
  '1N4 · Add three numbers',
  'Add left to right!',
  'Three numbers — step by step. Clever!',
  [
    ...addQA('a', 2, 3, 'First: 2 + 3…', '2 + 3 = 5. Then add more next!'),
    ...addQA('b', 5, 4, 'Now 5 + 4 (from 2+3+4)', '5 + 4 = 9. Chain!'),
    ...addQA('c', 4, 2, '4 + 2 first…', '4 + 2 = 6.'),
    ...addQA('d', 6, 5, 'Then +5 → 2+4+5 path', '6 + 5 = 11. Yes!'),
    ...addQA('e', 3, 7, '3 + 7 — ready for a third later!', '3 + 7 = 10. Super!'),
  ],
)

export const lessonSub2digit = lesson(
  '1n4-sub2',
  '1N4 · Subtract two numbers',
  'Take away from bigger totals',
  'Bigger take-aways — you can do it!',
  [
    ...subQA('a', 12, 3, '12 − 3 = ?', '12 − 3 = 9. Yes!'),
    ...subQA('b', 15, 4, '15 − 4 = ?', '15 − 4 = 11. Nice!'),
    ...subQA('c', 14, 6, '14 − 6 = ?', '14 − 6 = 8. Super!'),
    ...subQA('d', 16, 5, '16 − 5 = ?', '16 − 5 = 11. Great!'),
    ...subQA('e', 18, 7, '18 − 7 = ?', '18 − 7 = 11. Wow!'),
  ],
)

export const lessonCheckSub = lesson(
  '1n4-check',
  '1N4 · Check with addition',
  'Subtract, then add back!',
  'Addition checks subtraction. Smart!',
  [
    ...subQA('a', 10, 3, '10 − 3 = ?', '10 − 3 = 7.'),
    ...addQA('b', 7, 3, 'Check: 7 + 3?', '7 + 3 = 10. Checks!'),
    ...subQA('c', 12, 5, '12 − 5 = ?', '12 − 5 = 7.'),
    ...addQA('d', 7, 5, 'Check: 7 + 5?', '7 + 5 = 12. Yes!'),
    ...addQA('e', 8, 4, 'If 12 − 4 = 8, then 8 + 4…', '8 + 4 = 12. Linked!'),
  ],
)

export const lessonPlaceAdd = lesson(
  '1n4-place',
  '1N4 · Tens help adding',
  'See tens when you add',
  'Tens make big adds clearer. Brilliant!',
  [
    ...tensQA('a', 24, 'See 24 as tens + ones', '2 tens + 4 ones!'),
    ...addQA('b', 10, 4, '10 + 4 (like a ten + ones)', '10 + 4 = 14.'),
    ...tensQA('c', 30, 'Three full tens', '3 tens!'),
    ...addQA('d', 10, 10, 'A ten + a ten', '10 + 10 = 20.'),
    ...addQA('e', 12, 5, '12 + 5', '12 + 5 = 17. Nice!'),
  ],
)

/* ───────── 1M1 / 1M3 Length ───────── */

export const lessonLonger = lesson(
  '1m1-longer',
  '1M1 · Longer or shorter?',
  'Compare two sticks!',
  'You can compare length. Great eyes!',
  [
    ...worldQA('a', 'Which is longer — red or blue?', 'Red longer', 'Red is longer!', {
      mode: 'length',
      lenA: 5,
      lenB: 2,
    }),
    ...worldQA('b', 'Which is longer?', 'Blue longer', 'Blue is longer!', {
      mode: 'length',
      lenA: 2,
      lenB: 4,
    }),
    ...worldQA('c', 'Same length?', 'Same', 'Same length!', {
      mode: 'length',
      lenA: 3,
      lenB: 3,
      answerLabel: 'same',
    }),
    ...worldQA('d', 'Which is shorter?', 'Blue shorter', 'Blue is shorter!', {
      mode: 'length',
      lenA: 5,
      lenB: 1,
      answerLabel: 'B shorter',
    }),
    ...worldQA('e', 'Which is longer?', 'Red longer', 'Red wins!', {
      mode: 'length',
      lenA: 4,
      lenB: 3,
    }),
  ],
)

export const lessonDistance = lesson(
  '1m3-distance',
  '1M3 · Farther / nearer',
  'Compare lengths again!',
  'You compare distance like length. Cool!',
  [
    ...worldQA('a', 'Which bar is longer?', 'Red', 'Red is longer — farther idea!', {
      mode: 'length',
      lenA: 5,
      lenB: 3,
    }),
    ...worldQA('b', 'Which is shorter (nearer)?', 'Red shorter', 'Red is shorter!', {
      mode: 'length',
      lenA: 1,
      lenB: 4,
      answerLabel: 'A shorter',
    }),
    ...worldQA('c', 'Match?', 'Same', 'Same length!', {
      mode: 'length',
      lenA: 4,
      lenB: 4,
    }),
    ...worldQA('d', 'Bigger stretch?', 'Blue', 'Blue is longer!', {
      mode: 'length',
      lenA: 2,
      lenB: 5,
    }),
    ...worldQA('e', 'Which is longer?', 'Red', 'Red!', {
      mode: 'length',
      lenA: 5,
      lenB: 4,
    }),
  ],
)

/* ───────── 1M2 Money ───────── */

export const lessonCoins = lesson(
  '1m2-coins',
  '1M2 · Coin values',
  'Add the coins!',
  'You can total coins. Rich thinking!',
  [
    ...worldQA('a', 'How much altogether?', '$3', '1+2 = $3!', {
      mode: 'money',
      coins: [1, 2],
      moneyTotal: 3,
    }),
    ...worldQA('b', 'Total?', '$4', '2+2 = $4!', {
      mode: 'money',
      coins: [2, 2],
      moneyTotal: 4,
    }),
    ...worldQA('c', 'How much?', '$5', '1+2+2 = $5!', {
      mode: 'money',
      coins: [1, 2, 2],
      moneyTotal: 5,
    }),
    ...worldQA('d', 'Count the money!', '$6', '5+1 = $6!', {
      mode: 'money',
      coins: [5, 1],
      moneyTotal: 6,
    }),
    ...worldQA('e', 'Total coins?', '$10', '5+5 = $10!', {
      mode: 'money',
      coins: [5, 5],
      moneyTotal: 10,
    }),
  ],
)

export const lessonMoneyMore = lesson(
  '1m2-more',
  '1M2 · More coins',
  'Bigger coin piles!',
  'Coin totals — you’ve got this!',
  [
    ...worldQA('a', 'How much?', '$7', '$2+$5 = $7!', {
      mode: 'money',
      coins: [2, 5],
      moneyTotal: 7,
    }),
    ...worldQA('b', 'Total?', '$8', '1+2+5 = $8!', {
      mode: 'money',
      coins: [1, 2, 5],
      moneyTotal: 8,
    }),
    ...worldQA('c', 'How much?', '$9', '2+2+5 = $9!', {
      mode: 'money',
      coins: [2, 2, 5],
      moneyTotal: 9,
    }),
    ...worldQA('d', 'Count!', '$4', '1+1+2 = $4!', {
      mode: 'money',
      coins: [1, 1, 2],
      moneyTotal: 4,
    }),
    ...worldQA('e', 'All together?', '$11', '5+5+1 = $11!', {
      mode: 'money',
      coins: [5, 5, 1],
      moneyTotal: 11,
    }),
  ],
)

/* ───────── 1M4 Time ───────── */

export const lessonClock = lesson(
  '1m4-clock',
  '1M4 · What hour?',
  'Read the hour hand!',
  'You can read o’clock times. Super!',
  [
    ...worldQA('a', 'What time?', '3:00', '3 o’clock!', { mode: 'clock', hour: 3 }),
    ...worldQA('b', 'What time?', '6:00', '6 o’clock!', { mode: 'clock', hour: 6 }),
    ...worldQA('c', 'What time?', '9:00', '9 o’clock!', { mode: 'clock', hour: 9 }),
    ...worldQA('d', 'What time?', '12:00', '12 o’clock!', { mode: 'clock', hour: 12 }),
    ...worldQA('e', 'What time?', '4:00', '4 o’clock!', { mode: 'clock', hour: 4 }),
  ],
)

export const lessonClockMore = lesson(
  '1m4-hours',
  '1M4 · More o’clock',
  'Keep reading the clock!',
  'Hour times — you nailed it!',
  [
    ...worldQA('a', 'What time?', '1:00', '1 o’clock!', { mode: 'clock', hour: 1 }),
    ...worldQA('b', 'What time?', '2:00', '2 o’clock!', { mode: 'clock', hour: 2 }),
    ...worldQA('c', 'What time?', '5:00', '5 o’clock!', { mode: 'clock', hour: 5 }),
    ...worldQA('d', 'What time?', '8:00', '8 o’clock!', { mode: 'clock', hour: 8 }),
    ...worldQA('e', 'What time?', '10:00', '10 o’clock!', { mode: 'clock', hour: 10 }),
  ],
)

/* ───────── 1S1 3-D ───────── */

export const lessonShape3d = lesson(
  '1s1-3d',
  '1S1 · 3-D shapes',
  'Name the solid!',
  'You know 3-D shape names. Awesome!',
  [
    ...worldQA('a', 'What shape is this?', 'cube', 'A cube!', {
      mode: 'shape3d',
      shape3d: 'cube',
      answerLabel: 'cube',
    }),
    ...worldQA('b', 'What shape?', 'cylinder', 'A cylinder!', {
      mode: 'shape3d',
      shape3d: 'cylinder',
      answerLabel: 'cylinder',
    }),
    ...worldQA('c', 'What shape?', 'sphere', 'A sphere (ball)!', {
      mode: 'shape3d',
      shape3d: 'sphere',
      answerLabel: 'sphere',
    }),
    ...worldQA('d', 'What shape?', 'cone', 'A cone!', {
      mode: 'shape3d',
      shape3d: 'cone',
      answerLabel: 'cone',
    }),
    ...worldQA('e', 'Again — what is it?', 'cube', 'Cube again!', {
      mode: 'shape3d',
      shape3d: 'cube',
      answerLabel: 'cube',
    }),
  ],
)

/* ───────── 1S2 2-D ───────── */

export const lessonShape2d = lesson(
  '1s2-2d',
  '1S2 · 2-D shapes',
  'Name the flat shape!',
  'You know 2-D shapes. Great!',
  [
    ...worldQA('a', 'What shape?', 'triangle', 'Triangle — 3 sides!', {
      mode: 'shape2d',
      shape2d: 'triangle',
      answerLabel: 'triangle',
    }),
    ...worldQA('b', 'What shape?', 'square', 'Square — 4 equal sides!', {
      mode: 'shape2d',
      shape2d: 'square',
      answerLabel: 'square',
    }),
    ...worldQA('c', 'What shape?', 'rectangle', 'Rectangle!', {
      mode: 'shape2d',
      shape2d: 'rectangle',
      answerLabel: 'rectangle',
    }),
    ...worldQA('d', 'What shape?', 'circle', 'Circle — round!', {
      mode: 'shape2d',
      shape2d: 'circle',
      answerLabel: 'circle',
    }),
    ...worldQA('e', 'What shape?', 'pentagon', 'Pentagon — 5 sides!', {
      mode: 'shape2d',
      shape2d: 'pentagon',
      answerLabel: 'pentagon',
    }),
  ],
)

export const lessonShape2dMore = lesson(
  '1s2-sides',
  '1S2 · Count the sides',
  'How many sides?',
  'Sides help you name shapes. Clever!',
  [
    ...worldQA('a', 'How many sides?', '3 · triangle', '3 sides — triangle!', {
      mode: 'shape2d',
      shape2d: 'triangle',
      answerLabel: '3 sides',
    }),
    ...worldQA('b', 'How many sides?', '4 · square', '4 sides — square!', {
      mode: 'shape2d',
      shape2d: 'square',
      answerLabel: '4 sides',
    }),
    ...worldQA('c', 'How many sides?', '4 · rectangle', '4 sides — rectangle!', {
      mode: 'shape2d',
      shape2d: 'rectangle',
      answerLabel: '4 sides',
    }),
    ...worldQA('d', 'Sides on a circle?', '0 · circle', 'No straight sides — circle!', {
      mode: 'shape2d',
      shape2d: 'circle',
      answerLabel: '0 straight sides',
    }),
    ...worldQA('e', 'How many sides?', '5 · pentagon', '5 sides — pentagon!', {
      mode: 'shape2d',
      shape2d: 'pentagon',
      answerLabel: '5 sides',
    }),
  ],
)

/* ───────── 1S3 Space ───────── */

export const lessonSpace = lesson(
  '1s3-space',
  '1S3 · Where is it?',
  'Find the yellow ball!',
  'You know positions. Super navigator!',
  [
    ...worldQA('a', 'Where is the ball?', 'left', 'On the left!', {
      mode: 'space',
      place: 'left',
      answerLabel: 'left',
    }),
    ...worldQA('b', 'Where is the ball?', 'right', 'On the right!', {
      mode: 'space',
      place: 'right',
      answerLabel: 'right',
    }),
    ...worldQA('c', 'Where is the ball?', 'over', 'Over the box!', {
      mode: 'space',
      place: 'over',
      answerLabel: 'over',
    }),
    ...worldQA('d', 'Where is the ball?', 'under', 'Under the box!', {
      mode: 'space',
      place: 'under',
      answerLabel: 'under',
    }),
    ...worldQA('e', 'Where is the ball?', 'in front', 'In front!', {
      mode: 'space',
      place: 'inFront',
      answerLabel: 'in front',
    }),
  ],
)

export const lessonSpaceMore = lesson(
  '1s3-behind',
  '1S3 · More positions',
  'Over, under, behind…',
  'Positions — you mastered them!',
  [
    ...worldQA('a', 'Where?', 'behind', 'Behind the box!', {
      mode: 'space',
      place: 'behind',
      answerLabel: 'behind',
    }),
    ...worldQA('b', 'Where?', 'over', 'Over!', {
      mode: 'space',
      place: 'over',
      answerLabel: 'over',
    }),
    ...worldQA('c', 'Where?', 'left', 'Left!', {
      mode: 'space',
      place: 'left',
      answerLabel: 'left',
    }),
    ...worldQA('d', 'Where?', 'under', 'Under!', {
      mode: 'space',
      place: 'under',
      answerLabel: 'under',
    }),
    ...worldQA('e', 'Where?', 'right', 'Right!', {
      mode: 'space',
      place: 'right',
      answerLabel: 'right',
    }),
  ],
)

/* ───────── 1F1 Inquiry ───────── */

export const lessonInquiry = lesson(
  '1f1-ask',
  '1F1 · Ask & check',
  'Guess, then see!',
  'Inquiry = ask, try, check. Superstar!',
  [
    ...compareQA('a', 4, 6, 'Which has more? Check!', '4 less · 6 more', 'Blue — you checked!'),
    ...countQA('b', 7, 'How many? Count to check!', '7 — verified!'),
    ...addQA('c', 3, 5, 'What if we put together?', '3 + 5 = 8. Tried it!'),
    ...subQA('d', 8, 2, 'What if we take 2 away?', '8 − 2 = 6. Explained!'),
    ...worldQA('e', 'Is red longer? Check!', 'Red longer', 'Yes — evidence!', {
      mode: 'length',
      lenA: 5,
      lenB: 2,
    }),
  ],
)

export const lessonInquiry2 = lesson(
  '1f1-explain',
  '1F1 · Explain why',
  'Say what you notice!',
  'You can explain with maths. Brilliant!',
  [
    ...oddEvenQA('a', 6, 'Even or odd — why?', '6 — even!', 'Pairs — that’s why!'),
    ...oddEvenQA('b', 5, 'Even or odd — why?', '5 — odd!', 'One left alone!'),
    ...splitQA('c', 8, 3, 5, 'How can 8 split?', '3 + 5 = 8. Explained!'),
    ...worldQA('d', 'Where is the ball — why?', 'left', 'Left of the box!', {
      mode: 'space',
      place: 'left',
      answerLabel: 'left',
    }),
    ...worldQA('e', 'What time — how do you know?', '7:00', 'Hour hand at 7!', {
      mode: 'clock',
      hour: 7,
    }),
  ],
)

export const restOfP1Lessons: Lesson[] = [
  lessonAddMerge,
  lessonSubTake,
  lessonZero,
  lessonAddCommute,
  lessonAddSubLink,
  lessonTensOnes,
  lessonCompare100,
  lessonSkipCount,
  lessonOddEven100,
  lessonEstimate,
  lessonAdd2digit,
  lessonAddThree,
  lessonSub2digit,
  lessonCheckSub,
  lessonPlaceAdd,
  lessonLonger,
  lessonCoins,
  lessonMoneyMore,
  lessonDistance,
  lessonClock,
  lessonClockMore,
  lessonShape3d,
  lessonShape2d,
  lessonShape2dMore,
  lessonSpace,
  lessonSpaceMore,
  lessonInquiry,
  lessonInquiry2,
]
