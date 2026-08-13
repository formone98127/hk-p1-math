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
  missing: string
  backHome: string
  moreLabel: string
  lessLabel: string
  sameLabel: string
  evenLabel: string
  oddLabel: string
}

export const ui: Record<Locale, UiDict> = {
  en: {
    brand: 'HK Primary 1 Maths',
    headline: 'Numbers you can see.',
    lede: 'Four short parts for Numbers to 20 — one idea at a time, lots of practice.',
    heroCta: 'Start Part 1 →',
    seriesTitle: '1N1 · Numbers to 20',
    seriesBlurb: 'Small steps for young learners. Finish one part, then the next.',
    strandNumber: 'More number (soon)',
    strandMeasures: 'Measures',
    strandShape: 'Shape & space',
    strandInquiry: 'Inquiry',
    comingSoon: 'Coming soon',
    sourceNote: 'Aligned with EDB Primary Mathematics Curriculum (KS1)',
    gotIt: 'Well done!',
    gotItSub: 'You finished this part.',
    replay: 'Again',
    nextPart: 'Next part →',
    catalog: 'Home',
    swipeHint: 'swipe / ↓',
    challengeHint: 'tap the yellow button',
    gateChip: 'Tap the yellow button',
    autoSplit: 'Split apart →',
    missing: 'Lesson not found.',
    backHome: 'Back home',
    moreLabel: 'more',
    lessLabel: 'less',
    sameLabel: 'same',
    evenLabel: 'even — all in pairs',
    oddLabel: 'odd — one left alone',
  },
  'zh-Hant': {
    brand: '香港小一數學',
    headline: '看得見的數目。',
    lede: '「20以內的數」分成四小段——一次學一個，多練習幾次。',
    heroCta: '開始第 1 段 →',
    seriesTitle: '1N1 · 20以內的數',
    seriesBlurb: '給小朋友的小步驟。完成一段，再玩下一段。',
    strandNumber: '更多數（即將推出）',
    strandMeasures: '度量',
    strandShape: '圖形與空間',
    strandInquiry: '探究',
    comingSoon: '即將推出',
    sourceNote: '參考教育局《小學數學科課程》第一學習階段說明',
    gotIt: '真棒！',
    gotItSub: '這一小段完成了。',
    replay: '再玩一次',
    nextPart: '下一段 →',
    catalog: '回家',
    swipeHint: '上滑 / ↓',
    challengeHint: '先按黃色按鈕',
    gateChip: '按黃色按鈕',
    autoSplit: '拆開看看 →',
    missing: '找不到這一課。',
    backHome: '回家',
    moreLabel: '較多',
    lessLabel: '較少',
    sameLabel: '一樣多',
    evenLabel: '雙數——剛剛好一對對',
    oddLabel: '單數——剩下一個',
  },
}
