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
}

export const ui: Record<Locale, UiDict> = {
  en: {
    brand: 'HK Primary 1 Maths',
    headline: 'You can see the numbers!',
    lede: 'Four fun parts. One new idea each time. You can do it!',
    heroCta: 'Let’s start! →',
    seriesTitle: 'Numbers to 20',
    seriesBlurb: 'Short and fun. Finish one part, then try the next!',
    strandNumber: 'More number games (soon)',
    strandMeasures: 'Measures',
    strandShape: 'Shape & space',
    strandInquiry: 'Inquiry',
    comingSoon: 'Coming soon',
    sourceNote: 'Aligned with EDB Primary Mathematics Curriculum (KS1)',
    gotIt: 'You did it!',
    gotItSub: 'Great job on this part!',
    replay: 'Play again',
    nextPart: 'Next part →',
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
  },
  'zh-Hant': {
    brand: '香港小一數學',
    headline: '數目看得見！',
    lede: '四個好玩的小段。一次學一個。你做得到！',
    heroCta: '開始玩吧！→',
    seriesTitle: '20以內的數',
    seriesBlurb: '又短又好玩。完成一段，再玩下一段！',
    strandNumber: '更多數目遊戲（即將推出）',
    strandMeasures: '度量',
    strandShape: '圖形與空間',
    strandInquiry: '探究',
    comingSoon: '即將推出',
    sourceNote: '參考教育局《小學數學科課程》第一學習階段說明',
    gotIt: '你做到了！',
    gotItSub: '這一小段真棒！',
    replay: '再玩一次',
    nextPart: '下一段 →',
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
  },
}
