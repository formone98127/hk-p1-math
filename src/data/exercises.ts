import {
  multipleChoice,
  fillBlank,
  calculation,
  wordProblem,
  exerciseSet,
} from './exerciseBuilders'
import type { Exercise, ExerciseSet } from './types'

// ───────── 1N1 Numbers to 20 Exercises ─────────
export const exercises1N1 = exerciseSet(
  '1n1-exercises',
  '1n1',
  'Numbers to 20 Practice',
  'Master counting, comparing, odd/even, and splitting numbers',
  [
    // Basic counting (easy)
    multipleChoice('1n1-e1', '1n1', 'How many dots? ●●●●●', '4', ['3', '5', '6'], 'easy'),
    multipleChoice('1n1-e2', '1n1', 'What comes after 9?', '10', ['8', '11', '12'], 'easy'),
    multipleChoice('1n1-e3', '1n1', 'Count: ●●●●●●●●●●', '8', ['7', '9', '10'], 'easy'),
    calculation('1n1-e4', '1n1', '●●● + ●● = how many total?', 5, 'easy'),
    calculation('1n1-e5', '1n1', '●●●●● + ●● = ?', 7, 'easy'),

    // Comparison (medium)
    multipleChoice('1n1-e6', '1n1', 'Which group has more? ●●●● vs ●●●●●●', 'Group B (8)', ['Group A (4)', 'Same'], 'medium'),
    multipleChoice('1n1-e7', '1n1', 'Which number is bigger: 15 or 12?', '15', ['12', 'Same'], 'medium'),
    multipleChoice('1n1-e8', '1n1', 'Is 6 less than 9?', 'yes', ['no', 'Same'], 'medium'),
    fillBlank('1n1-e9', '1n1', '18 is ____ than 20', 'less', 'medium', 'Think: 18 comes before 20'),

    // Odd and even (medium)
    multipleChoice('1n1-e10', '1n1', 'Is 5 odd or even?', 'odd', ['even', 'both'], 'medium'),
    multipleChoice('1n1-e11', '1n1', 'Which even number? 12, 15, 18, 19', '12 and 18', ['15', '19 only'], 'medium'),
    fillBlank('1n1-e12', '1n1', 'An odd number cannot be split into __ pairs', 'equal', 'medium'),

    // Splitting (hard)
    fillBlank('1n1-e13', '1n1', '9 = 4 + ____', '5', 'hard', '4 + ? = 9'),
    wordProblem('1n1-e14', '1n1', 'You have 16 stickers. Give 8 to a friend. How many left?', 8, 'hard'),
    multipleChoice('1n1-e15', '1n1', 'Which shows 10 split into two equal parts?', '5 + 5', ['3 + 7', '6 + 4', '8 + 2'], 'hard'),
    fillBlank('1n1-e16', '1n1', '12 can be split into 6 and ____', '6', 'hard'),
  ],
  150, // 2.5 minutes
)

// ───────── 1N2 Basic Addition & Subtraction ─────────
export const exercises1N2 = exerciseSet(
  '1n2-exercises',
  '1n2',
  'Basic + and − Practice',
  'Learn to add, subtract, and understand zero',
  [
    // Basic addition (easy)
    calculation('1n2-e1', '1n2', '2 + 3 = ?', 5, 'easy'),
    calculation('1n2-e2', '1n2', '4 + 1 = ?', 5, 'easy'),
    calculation('1n2-e3', '1n2', '6 + 2 = ?', 8, 'easy'),
    wordProblem('1n2-e4', '1n2', 'You have 3 apples. Get 4 more. How many?', 7, 'easy'),
    calculation('1n2-e5', '1n2', '5 + 0 = ?', 5, 'easy'),

    // Basic subtraction (easy)
    calculation('1n2-e6', '1n2', '5 − 2 = ?', 3, 'easy'),
    calculation('1n2-e7', '1n2', '8 − 3 = ?', 5, 'easy'),
    calculation('1n2-e8', '1n2', '9 − 1 = ?', 8, 'easy'),
    wordProblem('1n2-e9', '1n2', '6 birds on a tree. 3 fly away. How many left?', 3, 'easy'),

    // Zero (medium)
    fillBlank('1n2-e10', '1n2', '5 − 5 = ____', '0', 'medium', 'Take everything away!'),
    calculation('1n2-e11', '1n2', '0 + 7 = ?', 7, 'medium'),
    wordProblem('1n2-e12', '1n2', 'You have 5 cookies. Eat all 5. How many left?', 0, 'medium'),

    // Commutative property (medium)
    fillBlank('1n2-e13', '1n2', '3 + 4 is the same as 4 + ____', '3', 'medium', 'Order changes, result stays'),
    multipleChoice('1n2-e14', '1n2', 'Which equals 5 + 2?', '2 + 5', ['5 + 0', '1 + 4'], 'medium'),

    // Relationship (hard)
    wordProblem('1n2-e15', '1n2', 'If 8 − 3 = 5, then 5 + 3 = ?', 8, 'hard', 'Addition checks subtraction'),
    multipleChoice('1n2-e16', '1n2', 'Which is true: 10 − 6 = 4, so 4 + 6 = ?', '10', ['6', '16'], 'hard'),
    wordProblem('1n2-e17', '1n2', 'First had 10, spent 4, then earned 3. How many now?', 9, 'hard'),
  ],
  180, // 3 minutes
)

// ───────── 1N3 Numbers to 100 ─────────
export const exercises1N3 = exerciseSet(
  '1n3-exercises',
  '1n3',
  'Numbers to 100 Challenge',
  'Tens, ones, skip counting, and estimation',
  [
    // Tens and ones (medium)
    multipleChoice('1n3-e1', '1n3', 'How many tens in 40?', '4', ['3', '5'], 'easy'),
    fillBlank('1n3-e2', '1n3', '37 has ____ tens and ____ ones', '3 and 7', 'medium'),
    multipleChoice('1n3-e3', '1n3', 'Which digit is the tens place in 52?', '5', ['2', '3'], 'medium'),
    wordProblem('1n3-e4', '1n3', 'A book has 73 pages. Is this closer to 70 or 80?', '70', 'medium'),

    // Comparison (easy)
    multipleChoice('1n3-e5', '1n3', 'Which is bigger: 67 or 76?', '76', ['67', 'Same'], 'easy'),
    multipleChoice('1n3-e6', '1n3', 'Is 89 < 98?', 'yes', ['no', 'Same'], 'easy'),
    fillBlank('1n3-e7', '1n3', '95 is ____ than 59', 'greater', 'medium'),

    // Skip counting (medium)
    fillBlank('1n3-e8', 'n3', '2, 4, 6, ____, 10', '8', 'easy', 'Count by twos'),
    fillBlank('1n3-e9', 'n3', '5, 10, 15, 20, ____', '25', 'easy', 'Count by fives'),
    multipleChoice('1n3-e10', 'n3', 'What comes next? 10, 20, 30, ____', '40', ['35', '50'], 'easy'),

    // Odd and even (medium)
    multipleChoice('1n3-e11', 'n3', 'Is 24 odd or even?', 'even', ['odd', 'both'], 'medium'),
    fillBlank('1n3-e12', 'n3', '47 is ____ (ones digit tells you)', 'odd', 'medium'),
    multipleChoice('1n3-e13', 'n3', 'Which is NOT even? 12, 16, 19, 24', '19', ['12', '16', '24'], 'medium'),

    // Estimation (hard)
    multipleChoice('1n3-e14', 'n3', 'About how many: ●●●●●●●●●●●●●●●● (15 dots)', '15', ['10', '20'], 'hard'),
    multipleChoice('1n3-e15', 'n3', 'Is 38 closer to 35 or 40?', '40', ['35', 'Same'], 'hard'),
    wordProblem('n3-e16', 'n3', 'You see about 52 birds. Round to nearest 10.', '50', 'hard'),
  ],
  180,
)

// ───────── 1N4 Addition & Subtraction (I) ─────────
export const exercises1N4 = exerciseSet(
  '1n4-exercises',
  '1n4',
  'Bigger + and − Practice',
  'Two-digit operations and checking your work',
  [
    // Two-digit addition (medium)
    calculation('1n4-e1', '1n4', '13 + 6 = ?', 19, 'medium'),
    calculation('1n4-e2', '1n4', '25 + 4 = ?', 29, 'medium'),
    calculation('1n4-e3', '1n4', '8 + 15 = ?', 23, 'hard'),
    wordProblem('1n4-e4', '1n4', 'Had 12, earned 8 more. Total?', 20, 'medium'),

    // Three numbers (hard)
    calculation('1n4-e5', '1n4', '4 + 6 + 3 = ?', 13, 'hard', 'Add left to right'),
    calculation('1n4-e6', '1n4', '8 + 2 + 7 = ?', 17, 'hard'),
    wordProblem('1n4-e7', '1n4', 'Buy for $6, then $4, then $3. Total spent?', 13, 'hard'),

    // Subtraction (medium)
    calculation('1n4-e8', '1n4', '18 − 6 = ?', 12, 'medium'),
    calculation('1n4-e9', '1n4', '25 − 4 = ?', 21, 'medium'),
    calculation('1n4-e10', '1n4', '32 − 5 = ?', 27, 'hard'),

    // Checking (medium)
    fillBlank('1n4-e11', '1n4', 'To check 15 − 6 = 9, calculate: 9 + 6 = ____', '15', 'medium'),
    multipleChoice('1n4-e12', '1n4', 'Check: 20 − 8 = 12. Is 12 + 8 = 20?', 'yes', ['no', '12'], 'medium'),

    // Place value (hard)
    fillBlank('1n4-e13', '1n4', '24 + 30 = ____ (think: 20 + 30 = 50)', '54', 'hard'),
    calculation('1n4-e14', '1n4', '40 + 7 = ?', 47, 'hard'),
    wordProblem('1n4-e15', '1n4', 'Library has 35 books on one shelf, 40 on another. Total?', 75, 'hard'),
  ],
  210,
)

// ───────── 1M1 Length (I) ─────────
export const exercises1M1 = exerciseSet(
  '1m1-exercises',
  '1m1',
  'Length Comparison',
  'Comparing objects directly and intuitively',
  [
    multipleChoice('1m1-e1', '1m1', 'Which is longer: pencil or finger?', 'pencil', ['finger', 'same'], 'easy'),
    multipleChoice('1m1-e2', '1m1', 'Which is shorter: a bus or a car?', 'car', ['bus', 'same'], 'easy'),
    fillBlank('1m1-e3', '1m1', 'Two sticks are the same length = ____', 'equal', 'medium'),
    multipleChoice('1m1-e4', '1m1', 'Can you measure a book with your hand span?', 'yes', ['no', 'sometimes'], 'medium'),

    multipleChoice('1m1-e5', '1m1', 'Rope A: 5 units, Rope B: 8 units. Longer?', 'Rope B', ['Rope A', 'Same'], 'medium'),
    fillBlank('1m1-e6', '1m1', 'To compare directly, align the ____ ends', 'same', 'medium'),
    multipleChoice('1m1-e7', '1m1', 'Your tower is 7 blocks high. Friend\'s is 9 blocks. Whose is taller?', 'Friend\'s', ['Yours', 'Same'], 'easy'),

    fillBlank('1m1-e8', '1m1', 'A shorter ruler needs ____ units to measure same object', 'more', 'hard'),
    multipleChoice('1m1-e9', '1m1', 'Which animal is longest: mouse, cat, or giraffe?', 'giraffe', ['cat', 'mouse'], 'easy'),
    multipleChoice('1m1-e10', '1m1', 'Path A is 12 steps, Path B is 15 steps. Which is shorter?', 'Path A', ['Path B', 'Same'], 'medium'),
  ],
  120,
)

// ───────── 1M2 Money (I) ─────────
export const exercises1M2 = exerciseSet(
  '1m2-exercises',
  '1m2',
  'Hong Kong Coins',
  'Counting coins and making amounts',
  [
    // Coin recognition (easy)
    multipleChoice('1m2-e1', '1m2', 'Which coin has biggest value?', '$10', ['$1', '$2'], 'easy'),
    multipleChoice('1m2-e2', '1m2', 'Which coin is smaller: $2 or $5?', '$2', ['$5', 'same'], 'easy'),
    calculation('1m2-e3', '1m2', '$1 + $2 = $____', 3, 'easy'),
    calculation('1m2-e4', '1m2', '$2 + $2 = $____', 4, 'easy'),

    // Counting (medium)
    multipleChoice('1m2-e5', '1m2', 'How much: $2 + $2 + $1?', '$5', ['$4', '$6'], 'medium'),
    calculation('1m2-e6', '1m2', '$5 + $1 = $____', 6, 'medium'),
    wordProblem('1m2-e7', '1m2', 'You have $8. Buy snack for $3. Left?', 5, 'medium'),

    // Exchange (hard)
    multipleChoice('1m2-e8', '1m2', 'How many $1 coins make $10?', '10', ['5', '2'], 'hard'),
    multipleChoice('1m2-e9', '1m2', 'Which equals $10? Two $5, or ten $1?', 'Both same', ['$5 bigger', '$1 bigger'], 'hard'),
    wordProblem('1m2-e10', '1m2', 'Exchange: five $2 coins for ____ $10 coins', 'one $10', 'hard'),

    calculation('1m2-e11', '1m2', '$5 + $5 = $____', 10, 'medium'),
    wordProblem('1m2-e12', '1m2', 'Tom has $6. Mom gives $4. Total?', 10, 'hard'),
  ],
  120,
)

// ───────── 1M3 Length (II) ─────────
export const exercises1M3 = exerciseSet(
  '1m3-exercises',
  '1m3',
  'Measuring with cm',
  'Use ruler, estimate, compare lengths',
  [
    multipleChoice('1m3-e1', '1m3', 'What tool measures length?', 'ruler', ['clock', 'scale'], 'easy'),
    fillBlank('1m3-e2', '1m3', '10 cm is ____ than 5 cm', 'longer', 'easy'),
    multipleChoice('1m3-e3', '1m3', 'About how long is a pencil case?', '15-20 cm', ['5 cm', '50 cm'], 'medium'),
    fillBlank('1m3-e4', '1m3', '30 cm rope is ____ than 25 cm rope', 'longer', 'medium'),

    multipleChoice('1m3-e5', '1m3', 'Which unit is smaller: cm or m?', 'cm', ['m', 'same'], 'hard'),
    wordProblem('1m3-e6', '1m3', 'Ribbon A: 15 cm, Ribbon B: 20 cm. Difference?', 5, 'medium'),
    fillBlank('1m3-e7', '1m3', 'About ____ cm from shoulder to fingertips', '30-60', 'hard', 'Varies by person'),

    multipleChoice('1m3-e8', '1m3', 'Estimate: pinky finger length?', '5-6 cm', ['10 cm', '15 cm', '8 cm'], 'medium'),
    multipleChoice('1m3-e9', '1m3', 'Book is 18 cm wide. Desk is 45 cm. Which fits?', 'Both fit', ['Only book', 'Only desk'], 'hard'),
    fillBlank('1m3-e10', '1m3', 'To measure accurately, use a ____', 'ruler', 'hard'),
  ],
  120,
)

// ───────── 1M4 Time (I) ─────────
export const exercises1M4 = exerciseSet(
  '1m4-exercises',
  '1m4',
  'Reading Clocks',
  'O\'clock, half-past, days, months',
  [
    // Clock reading (easy)
    multipleChoice('1m4-e1', '1m4', 'Hour hand at 3 shows what time?', '3:00', ['12:00', '6:00'], 'easy'),
    multipleChoice('1m4-e2', '1m4', 'Hour hand at 9 shows?', '9:00', ['12:00', '6:00'], 'easy'),
    fillBlank('1m4-e3', '1m4', 'Hour hand at 6 = ____:00', '6', 'easy'),
    multipleChoice('1m4-e4', '1m4', 'What time is half past 8?', '8:30', ['8:00', '9:00'], 'medium'),

    // Time concepts (medium)
    fillBlank('1m4-e5', '1m4', 'There are ____ hours in a day', '24', 'medium'),
    multipleChoice('1m4-e6', '1m4', 'Which day comes after Tuesday?', 'Wednesday', ['Monday', 'Thursday'], 'easy'),
    fillBlank('1m4-e7', '1m4', 'There are ____ days in a week', '7', 'easy'),
    multipleChoice('1m4-e8', '1m4', 'How many months in a year?', '12', ['7', '30'], 'medium'),

    // Time problems (hard)
    fillBlank('1m4-e9', '1m4', 'School starts 8:00, ends 3:00. That\'s ____ hours', '7', 'hard', 'Count: 8→3 = 7 hours'),
    wordProblem('1m4-e10', '1m4', 'Lunch at 12:00. Play for 1 hour. What time now?', '1:00', 'hard'),
    multipleChoice('1m4-e11', '1m4', 'What comes next: Monday, Tuesday, ____?', 'Wednesday', ['Sunday', 'Thursday'], 'easy'),
    fillBlank('1m4-e12', '1m4', 'What day is between Thursday and Saturday?', 'Friday', 'medium'),
  ],
  150,
)

// ───────── 1S1 3-D Shapes ─────────
export const exercises1S1 = exerciseSet(
  '1s1-exercises',
  '1s1',
  '3-D Shapes',
  'Identify cubes, cylinders, spheres, cones',
  [
    multipleChoice('1s1-e1', '1s1', 'Which can roll like a wheel? Sphere or cube?', 'sphere', ['cube', 'both'], 'easy'),
    multipleChoice('1s1-e2', '1s1', 'A can of soup looks like which 3-D shape?', 'cylinder', ['cone', 'cube'], 'easy'),
    multipleChoice('1s1-e3', '1s1', 'Which shape has flat faces only?', 'cube', ['sphere', 'cylinder'], 'medium'),
    fillBlank('1s1-e4', '1s1', 'A ball is shaped like a ____', 'sphere', 'easy'),

    multipleChoice('1s1-e5', '1s1', 'Which shape has a pointy top?', 'cone', ['cylinder', 'cube'], 'medium'),
    fillBlank('1s1-e6', '1s1', 'A dice is a ____', 'cube', 'easy'),
    multipleChoice('1s1-e7', '1s1', 'How many flat faces does a cube have?', '6', ['4', '8'], 'hard'),
    fillBlank('1s1-e8', '1s1', 'Cylinders have ____ flat faces (top and bottom)', '2', 'medium'),

    multipleChoice('1s1-e9', '1s1', 'Which cannot roll at all?', 'cube', ['sphere', 'cylinder'], 'medium'),
    wordProblem('1s1-e10', '1s1', 'I have 6 square faces, all same size. What am I?', 'cube', 'medium'),
    fillBlank('1s1-e11', '1s1', 'A party hat is shaped like a ____', 'cone', 'easy'),
    multipleChoice('1s1-e12', '1s1', 'Which shape has no corners?', 'sphere', ['cube', 'cylinder'], 'medium'),
  ],
  120,
)

// ───────── 1S2 2-D Shapes ─────────
export const exercises1S2 = exerciseSet(
  '1s2-exercises',
  '1s2',
  '2-D Shapes',
  'Triangles, squares, rectangles, circles',
  [
    // Basic shape recognition (easy)
    multipleChoice('1s2-e1', '1s2', 'How many sides does a triangle have?', '3', ['4', '5'], 'easy'),
    multipleChoice('1s2-e2', '1s2', 'Which shape has 4 equal sides?', 'square', ['rectangle', 'triangle'], 'easy'),
    fillBlank('1s2-e3', '1s2', 'A circle has ____ straight sides', '0', 'easy'),
    multipleChoice('1s2-e4', '1s2', 'How many sides does a pentagon have?', '5', ['4', '6'], 'easy'),

    // Shape properties (medium)
    fillBlank('1s2-e5', '1s2', 'A rectangle has ____ sides', '4', 'easy'),
    multipleChoice('1s2-e6', '1s2', 'Which shape is round?', 'circle', ['square', 'triangle'], 'easy'),
    multipleChoice('1s2-e7', '1s2', 'Opposite sides of a rectangle are ____ length', 'equal', ['different', 'unequal'], 'medium'),
    fillBlank('1s2-e8', '1s2', 'A square is a special ____', 'rectangle', 'medium'),

    // Advanced (hard)
    multipleChoice('1s2-e9', '1s2', 'Which has most sides: square or pentagon?', 'pentagon', ['square', 'same'], 'easy'),
    fillBlank('1s2-e10', '1s2', 'A hexagon has ____ sides', '6', 'medium'),
    multipleChoice('1s2-e11', '1s2', 'Can a triangle have 2 equal sides?', 'yes', ['no', 'maybe'], 'hard'),
    wordProblem('1s2-e12', '1s2', 'I have 3 corners and 3 straight sides. What am I?', 'triangle', 'medium'),
    fillBlank('1s2-e13', '1s2', 'A stop sign is shaped like an ____ -sided polygon', '8', 'hard', 'octagon'),
  ],
  120,
)

// ───────── 1S3 Directions and Positions ─────────
export const exercises1S3 = exerciseSet(
  '1s3-exercises',
  '1s3',
  'Positions',
  'Over, under, left, right, in front, behind',
  [
    // Basic positions (easy)
    multipleChoice('1s3-e1', '1s3', 'If you sit on a chair, the chair is ____ you', 'under', ['over', 'beside'], 'easy'),
    fillBlank('1s3-e2', '1s3', 'Your right hand is on the ____ side', 'right', 'easy'),
    fillBlank('1s3-e3', '1s3', 'The sun is ____ the ground during day', 'over', 'easy'),
    multipleChoice('1s3-e4', '1s3', 'In a line, the person behind you is ____', 'behind', ['in front', 'beside'], 'easy'),

    // Mirror and opposites (medium)
    fillBlank('1s3-e5', '1s3', 'In a mirror, left becomes ____', 'right', 'medium'),
    multipleChoice('1s3-e6', '1s3', 'Opposite of over is ____', 'under', ['left', 'right'], 'medium'),
    fillBlank('1s3-e7', '1s3', 'The bird is flying ____ the tree', 'over', 'easy'),
    wordProblem('1s3-e8', '1s3', 'Cat is under the table. Where is the cat?', 'under the table', 'easy'),

    // Complex positions (hard)
    multipleChoice('1s3-e9', '1s3', 'In a race, the winner is ____', 'in front', ['behind', 'last'], 'medium'),
    fillBlank('1s3-e10', '1s3', 'The bus arrived ____ the stop', 'at', 'hard'),
    multipleChoice('1s3-e11', '1s3', 'Opposite of right is?', 'left', ['up', 'down'], 'easy'),
    fillBlank('1s3-e12', '1s3', 'The airplane is ____ the clouds', 'over', 'easy'),
  ],
  120,
)

// ───────── 1F1 Inquiry and Investigation ─────────
export const exercises1F1 = exerciseSet(
  '1f1-exercises',
  '1f1',
  'Math Thinking',
  'Ask questions, explain reasoning, investigate',
  [
    multipleChoice('1f1-e1', '1f1', 'How do you check if a number is even?', 'make pairs', ['it ends with 2', 'it\'s big'], 'medium'),
    fillBlank('1f1-e2', '1f1', 'Before counting exactly, you make a(n) ____', 'estimate/guess', 'easy'),
    multipleChoice('1f1-e3', '1f1', 'If 7 + 4 = 11, then 4 + 7 = ?', '11', ['7', '4'], 'medium'),
    fillBlank('1f1-e4', '1f1', 'To check subtraction, you can ____ the numbers back', 'add', 'medium'),

    multipleChoice('1f1-e5', '1f1', 'Why is 10 an even number?', 'makes 5 pairs', ['ends with 0 only', 'it\'s the biggest'], 'hard'),
    fillBlank('1f1-e6', '1f1', 'When counting, put items in ____ or lines', 'groups/rows', 'medium'),
    multipleChoice('1f1-e7', '1f1', 'Does 3 + 4 = 4 + 3? Why or why not?', 'yes', ['no', 'only for subtraction'], 'hard'),
    fillBlank('1f1-e8', '1f1', 'Good math thinkers always ask ____ and check', 'questions', 'easy'),

    multipleChoice('1f1-e9', '1f1', 'Which proves 8 − 3 = 5?', '5 + 3 = 8', ['8 + 3 = 11', '5 − 3 = 2'], 'hard'),
    multipleChoice('1f1-e10', '1f1', 'You estimate 12, count and get 11. Was your estimate good?', 'yes', ['no', 'maybe'], 'hard'),
    fillBlank('1f1-e11', '1f1', 'Splitting 10 into 3 + 7 and 7 + 3 shows the ____ is true', 'same total', 'hard'),
    multipleChoice('1f1-e12', '1f1', 'Can order change the result in addition?', 'no', ['yes', 'sometimes'], 'medium'),
  ],
  180,
)

// All exercise sets
export const allExerciseSets: ExerciseSet[] = [
  exercises1N1,
  exercises1N2,
  exercises1N3,
  exercises1N4,
  exercises1M1,
  exercises1M2,
  exercises1M3,
  exercises1M4,
  exercises1S1,
  exercises1S2,
  exercises1S3,
  exercises1F1,
]

// Get exercises by unit
export function getExercisesForUnit(unitId: string): ExerciseSet | undefined {
  return allExerciseSets.find((set) => set.unitId === unitId)
}

// Get all exercises for mixed practice
export function getAllExercises(): Exercise[] {
  return allExerciseSets.flatMap((set) => set.exercises)
}

// Get random subset for quick practice
export function getQuickPractice(count: number = 5): Exercise[] {
  const all = getAllExercises()
  const shuffled = all.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, all.length))
}
