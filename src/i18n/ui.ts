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
  },
}
