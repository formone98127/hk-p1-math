import type { Locale } from './locale'

type UiDict = {
  brand: string
  headline: string
  lede: string
  heroCta: string
  seriesTitle: string
  seriesBlurb: string
  strandNumber: string
  strandMeasures: string
  strandShape: string
  strandInquiry: string
  comingSoon: string
  sourceNote: string
  gotIt: string
  gotItSub: string
  replay: string
  nextPart: string
  catalog: string
  swipeHint: string
  challengeHint: string
  gateChip: string
  autoSplit: string
  watchAgain: string
  missing: string
  backHome: string
  moreLabel: string
  lessLabel: string
  sameLabel: string
  evenLabel: string
  oddLabel: string
  longerLabel: string
  shorterLabel: string
  tensLabel: string
  onesLabel: string
  practiceTitle: string
  practiceSub: string
  uniqueTotal: string
  freshBadge: string
  exercisesCount: string
  variations: string
  pts: string
  timeMin: string
  level: string
  easyLabel: string
  mediumLabel: string
  hardLabel: string
  mixSection: string
  mixTitle: string
  mixDesc: string
  mixCount: string
  exit: string
  questionOf: string
  streak: string
  timeWarning: string
  correctFeedback: string
  wrongFeedback: string
  nextIn: string
  hintToggle: string
  skip: string
  loading: string
  resultsTitle: string
  resultsScore: string
  resultsPoints: string
  achievementsUnlocked: string
  reviewAnswers: string
  correctStatus: string
  yourAnswer: string
  skipped: string
  correctIs: string
  backToPractice: string
  tryAgain: string
}

export const ui: Record<Locale, UiDict> = {
  en: {
    brand: 'HK Primary 1 Maths',
    headline: 'You can see the maths!',
    lede: 'All of Primary 1. Tiny steps. Five examples each. You can do it!',
    heroCta: 'Start Step 1 →',
    seriesTitle: 'Numbers to 20 — 10 steps',
    seriesBlurb: 'Short lessons. Finish one step, then the next!',
    strandNumber: 'Number',
    strandMeasures: 'Measures',
    strandShape: 'Shape & space',
    strandInquiry: 'Inquiry',
    comingSoon: 'Coming soon',
    sourceNote: 'Aligned with EDB Primary Mathematics Curriculum (KS1)',
    gotIt: 'You did it!',
    gotItSub: 'Great job on this part!',
    replay: 'Play again',
    nextPart: 'Next step →',
    catalog: 'Home',
    swipeHint: 'swipe up for more ↓',
    challengeHint: 'tap the yellow button',
    gateChip: 'Tap the yellow button',
    autoSplit: 'Split apart →',
    watchAgain: 'Watch again →',
    missing: 'Lesson not found.',
    backHome: 'Back home',
    moreLabel: 'more',
    lessLabel: 'less',
    sameLabel: 'same',
    evenLabel: 'Even! All in pairs ✨',
    oddLabel: 'Odd! One left alone ✨',
    longerLabel: 'longer',
    shorterLabel: 'shorter',
    tensLabel: 'tens',
    onesLabel: 'ones',
    practiceTitle: '🎯 Practice Zone',
    practiceSub: 'Choose a unit to practice and earn achievements!',
    uniqueTotal: '{n}+ unique questions — fresh every session',
    freshBadge: '🔄 Fresh questions each time!',
    exercisesCount: '{n} exercises',
    variations: '🎲 ~{n} variations',
    pts: '⭐ {n} pts',
    timeMin: '⏱️ {n}m',
    level: 'Level',
    easyLabel: '🟢 Easy',
    mediumLabel: '🟡 Medium',
    hardLabel: '🔴 Hard',
    mixSection: 'Mix Practice',
    mixTitle: 'Mix Practice',
    mixDesc: 'Test your skills with 20 random questions from every unit!',
    mixCount: '20 random',
    exit: '← Exit',
    questionOf: 'Question {a} of {b}',
    streak: '🔥 {n} streak',
    timeWarning: '⚠️ Only {t} remaining!',
    correctFeedback: '🎉 Correct! Great job!',
    wrongFeedback: '❌ Not quite. Try again next time!',
    nextIn: 'Next in {n}s...',
    hintToggle: '💡 Need a hint?',
    skip: 'Skip →',
    loading: 'Loading exercises...',
    resultsTitle: 'Practice Complete! 🎉',
    resultsScore: '{a} / {b} correct ({p}%)',
    resultsPoints: 'You earned {n} points!',
    achievementsUnlocked: 'Achievements Unlocked!',
    reviewAnswers: 'Review Answers',
    correctStatus: '✓ Correct!',
    yourAnswer: '✗ Your answer: {a}',
    skipped: 'Skipped',
    correctIs: 'Correct: {a}',
    backToPractice: 'Back to Practice Zone',
    tryAgain: 'Try Again',
  },
  'zh-Hant': {
    brand: '香港小一數學',
    headline: '數學看得見！',
    lede: '小一全部單元。小小步驟。每步五題。你做得到！',
    heroCta: '開始第 1 步 →',
    seriesTitle: '20以內的數 — 10 步',
    seriesBlurb: '短短的一小課。完成一步，再玩下一步！',
    strandNumber: '數',
    strandMeasures: '度量',
    strandShape: '圖形與空間',
    strandInquiry: '探究',
    comingSoon: '即將推出',
    sourceNote: '參考教育局《小學數學科課程》第一學習階段說明',
    gotIt: '你做到了！',
    gotItSub: '這一小段真棒！',
    replay: '再玩一次',
    nextPart: '下一步 →',
    catalog: '回家',
    swipeHint: '上滑繼續 ↓',
    challengeHint: '按黃色按鈕',
    gateChip: '按黃色按鈕',
    autoSplit: '拆開看看 →',
    watchAgain: '再看一次 →',
    missing: '找不到這一課。',
    backHome: '回家',
    moreLabel: '較多',
    lessLabel: '較少',
    sameLabel: '一樣多',
    evenLabel: '雙數！剛剛好一對對 ✨',
    oddLabel: '單數！剩下一個 ✨',
    longerLabel: '較長',
    shorterLabel: '較短',
    tensLabel: '個十',
    onesLabel: '個一',
    practiceTitle: '🎯 練習區',
    practiceSub: '選擇單元來練習，贏取獎章！',
    uniqueTotal: '{n}+ 條不同題目——每次都是新的',
    freshBadge: '🔄 每次都是新題目！',
    exercisesCount: '{n} 題',
    variations: '🎲 約 {n} 種變化',
    pts: '⭐ {n} 分',
    timeMin: '⏱️ {n} 分鐘',
    level: '程度',
    easyLabel: '🟢 簡單',
    mediumLabel: '🟡 中等',
    hardLabel: '🔴 困難',
    mixSection: '混合練習',
    mixTitle: '混合練習',
    mixDesc: '從所有單元隨機抽出 20 題來挑戰自己！',
    mixCount: '隨機 20 題',
    exit: '← 離開',
    questionOf: '第 {a} 題，共 {b} 題',
    streak: '🔥 連對 {n} 題',
    timeWarning: '⚠️ 只剩 {t}！',
    correctFeedback: '🎉 答對了！真棒！',
    wrongFeedback: '❌ 不對，再試一次！',
    nextIn: '再過 {n} 秒...',
    hintToggle: '💡 需要提示？',
    skip: '跳過 →',
    loading: '正在載入題目...',
    resultsTitle: '練習完成！🎉',
    resultsScore: '答對 {a} / {b} 題（{p}%）',
    resultsPoints: '你獲得 {n} 分！',
    achievementsUnlocked: '解鎖獎章！',
    reviewAnswers: '檢討答案',
    correctStatus: '✓ 答對了！',
    yourAnswer: '✗ 你的答案：{a}',
    skipped: '已跳過',
    correctIs: '正確答案：{a}',
    backToPractice: '返回練習區',
    tryAgain: '再試一次',
  },
}
