import type { Locale } from './locale'

type UiDict = {
  brand: string
  headline: string
  lede: string
  heroCta: string
  strandNumber: string
  strandMeasures: string
  strandShape: string
  strandInquiry: string
  comingSoon: string
  sourceNote: string
  gotIt: string
  gotItSub: string
  replay: string
  catalog: string
  swipeHint: string
  challengeHint: string
  gateChip: string
  autoSplit: string
  labHookAsk: string
  missing: string
  backHome: string
  moreLabel: string
  lessLabel: string
  evenLabel: string
  oddLabel: string
  leftover: string
}

export const ui: Record<Locale, UiDict> = {
  en: {
    brand: 'HK Primary 1 Maths',
    headline: 'Numbers you can see.',
    lede: 'Start with Numbers to 20 — count, compare, then split a number into parts that make it again.',
    heroCta: 'Start Numbers to 20 →',
    strandNumber: 'Number',
    strandMeasures: 'Measures',
    strandShape: 'Shape & space',
    strandInquiry: 'Inquiry',
    comingSoon: 'Coming soon',
    sourceNote: 'Aligned with EDB Primary Mathematics Curriculum (KS1)',
    gotIt: 'Got it',
    gotItSub: 'A number is how many — and you can split it into two parts that make it again.',
    replay: 'Replay',
    catalog: 'Catalog',
    swipeHint: 'swipe / ↓',
    challengeHint: 'complete the challenge',
    gateChip: 'Tap Auto-split to continue',
    autoSplit: 'Split into two parts →',
    labHookAsk: 'How many counters are there?',
    missing: 'Lesson not found.',
    backHome: 'Back to catalog',
    moreLabel: 'more',
    lessLabel: 'less',
    evenLabel: 'even — all in pairs',
    oddLabel: 'odd — one left alone',
    leftover: 'left over',
  },
  'zh-Hant': {
    brand: '香港小一數學',
    headline: '看得見的數目。',
    lede: '先從「20以內的數」開始——數一數、比一比，再把一個數拆成兩部分，合起來又是原來的數。',
    heroCta: '開始「20以內的數」→',
    strandNumber: '數',
    strandMeasures: '度量',
    strandShape: '圖形與空間',
    strandInquiry: '探究',
    comingSoon: '即將推出',
    sourceNote: '參考教育局《小學數學科課程》第一學習階段說明',
    gotIt: '懂了',
    gotItSub: '數目就是「有多少」——還可以拆成兩部分，合起來又是同一個數。',
    replay: '再玩一次',
    catalog: '目錄',
    swipeHint: '上滑 / ↓',
    challengeHint: '完成挑戰後繼續',
    gateChip: '點「自動拆開」後繼續',
    autoSplit: '拆成兩部分 →',
    labHookAsk: '這裏有多少顆？',
    missing: '找不到這一課。',
    backHome: '回到目錄',
    moreLabel: '較多',
    lessLabel: '較少',
    evenLabel: '雙數——剛剛好一對對',
    oddLabel: '單數——剩下一個',
    leftover: '剩下',
  },
}
