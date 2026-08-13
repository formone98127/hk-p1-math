export type LessonText = {
  title: string
  subtitle: string
  gotItSub?: string
  beats: Record<string, { caption: string; prompt?: string }>
}

export type UnitText = {
  title: string
  blurb: string
}

export type SeriesPartText = {
  title: string
  blurb: string
}

export const lessonsZhHant: Record<string, LessonText> = {
  '1n1-count': {
    title: '第 1 段 · 有多少？',
    subtitle: '一起來數！',
    gotItSub: '對！數字告訴我們有多少。你是數數小明星！',
    beats: {
      c0q: { caption: '想一想…', prompt: '黃色圓點有多少？' },
      c0a: { caption: '3 — 對！', prompt: '三！數得真棒！' },
      c1q: { caption: '想一想…', prompt: '現在有多少？' },
      c1a: { caption: '5 — 對！', prompt: '五！你做到了！' },
      c2q: { caption: '想一想…', prompt: '你數得出來嗎？' },
      c2a: { caption: '8 — 對！', prompt: '八！超棒！' },
      c3q: { caption: '想一想…', prompt: '有多少顆？' },
      c3a: { caption: '10 — 對！', prompt: '十！太厲害了！' },
    },
  },
  '1n1-compare': {
    title: '第 2 段 · 較多還是較少？',
    subtitle: '來比一比！',
    gotItSub: '你會看出較多和較少了。真棒！',
    beats: {
      m0q: { caption: '看看…', prompt: '哪邊較多——紅色還是藍色？' },
      m0a: {
        caption: '5 較多 · 3 較少',
        prompt: '紅色較多。藍色較少。眼睛真亮！',
      },
      m1q: { caption: '看看…', prompt: '哪一邊較多？' },
      m1a: {
        caption: '2 較少 · 6 較多',
        prompt: '藍色較多。紅色較少。答對了！',
      },
      m2q: { caption: '看看…', prompt: '較多、較少，還是一樣多？' },
      m2a: { caption: '一樣多 — 4 和 4', prompt: '兩邊一樣多！好聰明！' },
      m3q: { caption: '看看…', prompt: '哪一組較少？' },
      m3a: {
        caption: '7 較多 · 4 較少',
        prompt: '紅色較多。藍色較少。太棒了！',
      },
    },
  },
  '1n1-odd-even': {
    title: '第 3 段 · 一對對',
    subtitle: '找找同伴！',
    gotItSub: '雙數一對對。單數剩下一個。你學會了！',
    beats: {
      o0q: { caption: '想一想…', prompt: '大家都能找到伴嗎？' },
      o0a: { caption: '4 — 雙數！', prompt: '對！大家都有伴。萬歲！' },
      o1q: { caption: '想一想…', prompt: '五個朋友呢？' },
      o1a: { caption: '5 — 單數！', prompt: '有一個剩下。這是單數！' },
      o2q: { caption: '想一想…', prompt: '六個朋友——有人剩下嗎？' },
      o2a: { caption: '6 — 雙數！', prompt: '剛剛好一對對。完美！' },
      o3q: { caption: '想一想…', prompt: '七——成對還是剩下？' },
      o3a: { caption: '7 — 單數！', prompt: '有一個剩下。你發現了！' },
    },
  },
  '1n1-split': {
    title: '第 4 段 · 拆開又合上',
    subtitle: '拆開，再合回去！',
    gotItSub: '你會把數目拆開又合上了。超級棒！',
    beats: {
      s0q: { caption: '6', prompt: '6 可以拆成兩部分嗎？' },
      s0a: { caption: '2 + 4 = 6', prompt: '可以！2 和 4 合起來是 6。好酷！' },
      s1q: { caption: '8', prompt: '8 可以拆開嗎？' },
      s1a: { caption: '3 + 5 = 8', prompt: '3 和 5 合起來是 8。真棒！' },
      s2q: { caption: '10', prompt: '10 可以怎麼拆？' },
      s2a: { caption: '4 + 6 = 10', prompt: '4 和 6 合起來是 10。對了！' },
      s3q: { caption: '12', prompt: '12 也可以拆嗎？' },
      s3a: {
        caption: '5 + 7 = 12',
        prompt: '5 和 7 合起來是 12。你最棒！',
      },
    },
  },
}

export const seriesZhHant: Record<string, SeriesPartText> = {
  '1n1-p1': {
    title: '有多少？',
    blurb: '一起來數！數字就是「有多少」。',
  },
  '1n1-p2': {
    title: '較多還是較少？',
    blurb: '來比一比——哪邊多？哪邊少？',
  },
  '1n1-p3': {
    title: '一對對',
    blurb: '兩個兩個——有人剩下嗎？',
  },
  '1n1-p4': {
    title: '拆開又合上',
    blurb: '把數目拆開，再合回去！',
  },
}

export const unitsZhHant: Record<string, UnitText> = {
  '1n2': {
    title: '基本加減',
    blurb: '合起來、拿走，看出加法和減法的關係。',
  },
  '1n3': {
    title: '100以內的數',
    blurb: '用十和一組成到 100。',
  },
  '1n4': {
    title: '加減（一）',
    blurb: '直式加減，為進位退位打基礎。',
  },
  '1m1': {
    title: '長度和距離（一）',
    blurb: '用日常物件比較長短。',
  },
  '1m2': {
    title: '貨幣（一）',
    blurb: '認識日常使用的硬幣和紙幣。',
  },
  '1m3': {
    title: '長度和距離（二）',
    blurb: '用不標準單位和初步標準單位量度。',
  },
  '1m4': {
    title: '時間（一）',
    blurb: '日子、時鐘，和事情的先後。',
  },
  '1s1': {
    title: '立體圖形（一）',
    blurb: '認識和分類正方體、圓柱、球等。',
  },
  '1s2': {
    title: '平面圖形',
    blurb: '圓、三角形、正方形——數一數邊。',
  },
  '1s3': {
    title: '方向和位置（一）',
    blurb: '上、下、左、右——它在哪裏？',
  },
  '1f1': {
    title: '探究與研習',
    blurb: '用數學去問、試、解釋。',
  },
}
