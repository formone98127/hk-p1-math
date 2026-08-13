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

function countBeats(
  pairs: [string, string, string, string][],
): Record<string, { caption: string; prompt?: string }> {
  const out: Record<string, { caption: string; prompt?: string }> = {}
  for (const [id, n, q, a] of pairs) {
    out[`${id}q`] = { caption: '想一想…', prompt: q }
    out[`${id}a`] = { caption: `${n} — 對！`, prompt: a }
  }
  return out
}

export const lessonsZhHant: Record<string, LessonText> = {
  '1n1-count-small': {
    title: '第 1 步 · 數到 5',
    subtitle: '先數小的！',
    gotItSub: '你會數到 5 了。好開始！',
    beats: countBeats([
      ['a', '2', '有多少顆？', '二！真棒！'],
      ['b', '3', '現在有多少？', '三！對了！'],
      ['c', '5', '有多少？', '五！你做到了！'],
    ]),
  },
  '1n1-count-big': {
    title: '第 2 步 · 數到 10',
    subtitle: '再多一點！',
    gotItSub: '你會數到 10 了。太厲害了！',
    beats: countBeats([
      ['a', '6', '有多少顆？', '六！很好！'],
      ['b', '8', '數一數！', '八！超棒！'],
      ['c', '10', '有多少？', '十！哇！'],
    ]),
  },
  '1n1-more': {
    title: '第 3 步 · 哪邊較多？',
    subtitle: '找出較多的一組！',
    gotItSub: '你會找出較多的了。真棒！',
    beats: {
      aq: { caption: '看看…', prompt: '哪邊較多——紅色還是藍色？' },
      aa: { caption: '5 較多 · 2 較少', prompt: '紅色較多。眼睛真亮！' },
      bq: { caption: '看看…', prompt: '哪邊較多？' },
      ba: { caption: '3 較少 · 7 較多', prompt: '藍色較多。對了！' },
      cq: { caption: '看看…', prompt: '哪一邊較多？' },
      ca: { caption: '8 較多 · 4 較少', prompt: '紅色較多。太棒了！' },
    },
  },
  '1n1-less': {
    title: '第 4 步 · 哪邊較少？',
    subtitle: '找出較少的一組！',
    gotItSub: '你會找出較少的了。好聰明！',
    beats: {
      aq: { caption: '看看…', prompt: '哪邊較少？' },
      aa: { caption: '6 較多 · 3 較少', prompt: '藍色較少。很好！' },
      bq: { caption: '看看…', prompt: '哪邊較少——紅色還是藍色？' },
      ba: { caption: '2 較少 · 5 較多', prompt: '紅色較少。對了！' },
      cq: { caption: '看看…', prompt: '哪一邊較少？' },
      ca: { caption: '4 較少 · 9 較多', prompt: '紅色較少。做得好！' },
    },
  },
  '1n1-same': {
    title: '第 5 步 · 一樣多！',
    subtitle: '兩邊一樣的時候',
    gotItSub: '你會看出一樣多了。真棒！',
    beats: {
      aq: { caption: '看看…', prompt: '較多、較少，還是一樣多？' },
      aa: { caption: '一樣多 — 3 和 3', prompt: '一樣多！好聰明！' },
      bq: { caption: '看看…', prompt: '兩邊一樣嗎？' },
      ba: { caption: '一樣多 — 5 和 5', prompt: '對——兩邊一樣多！' },
      cq: { caption: '看看…', prompt: '仔細看…' },
      ca: { caption: '一樣多 — 4 和 4', prompt: '又是一樣多！你最棒！' },
    },
  },
  '1n1-even': {
    title: '第 6 步 · 雙數——一對對',
    subtitle: '大家都有伴！',
    gotItSub: '雙數剛剛好一對對。你學會了！',
    beats: {
      aq: { caption: '想一想…', prompt: '大家都能找到伴嗎？' },
      aa: { caption: '4 — 雙數！', prompt: '對！大家都有伴。萬歲！' },
      bq: { caption: '想一想…', prompt: '六個朋友——有人剩下嗎？' },
      ba: { caption: '6 — 雙數！', prompt: '沒有剩下！雙數！' },
      cq: { caption: '想一想…', prompt: '八——成對嗎？' },
      ca: { caption: '8 — 雙數！', prompt: '完美一對對。太棒了！' },
    },
  },
  '1n1-odd': {
    title: '第 7 步 · 單數——剩下一個',
    subtitle: '有人沒有伴！',
    gotItSub: '單數會剩下一個。你發現了！',
    beats: {
      aq: { caption: '想一想…', prompt: '大家都能找到伴嗎？' },
      aa: { caption: '3 — 單數！', prompt: '有一個剩下。這是單數！' },
      bq: { caption: '想一想…', prompt: '五個朋友呢？' },
      ba: { caption: '5 — 單數！', prompt: '有一個剩下。對了！' },
      cq: { caption: '想一想…', prompt: '七——有人剩下嗎？' },
      ca: { caption: '7 — 單數！', prompt: '有一個剩下。發現得好！' },
    },
  },
  '1n1-split-small': {
    title: '第 8 步 · 拆開小數目',
    subtitle: '先拆小的！',
    gotItSub: '你會拆小數目了。好酷！',
    beats: {
      aq: { caption: '4', prompt: '4 可以拆開嗎？' },
      aa: { caption: '1 + 3 = 4', prompt: '1 和 3 合起來是 4。好酷！' },
      bq: { caption: '5', prompt: '5 可以拆開嗎？' },
      ba: { caption: '2 + 3 = 5', prompt: '2 和 3 合起來是 5。很好！' },
      cq: { caption: '6', prompt: '6 可以拆開嗎？' },
      ca: { caption: '2 + 4 = 6', prompt: '2 和 4 合起來是 6。對了！' },
    },
  },
  '1n1-split-ten': {
    title: '第 9 步 · 拆到 10',
    subtitle: '再大一點！',
    gotItSub: '你會拆到 10 了。超棒！',
    beats: {
      aq: { caption: '8', prompt: '8 可以拆開嗎？' },
      aa: { caption: '3 + 5 = 8', prompt: '3 和 5 合起來是 8。很好！' },
      bq: { caption: '9', prompt: '9 可以拆開嗎？' },
      ba: { caption: '4 + 5 = 9', prompt: '4 和 5 合起來是 9。對了！' },
      cq: { caption: '10', prompt: '10 可以拆開嗎？' },
      ca: { caption: '4 + 6 = 10', prompt: '4 和 6 合起來是 10。哇！' },
    },
  },
  '1n1-split-ways': {
    title: '第 10 步 · 很多種拆法',
    subtitle: '同一個數，不同拆法！',
    gotItSub: '一個數可以有很多種拆法。你最棒！',
    beats: {
      aq: { caption: '10', prompt: '10 還有別的拆法嗎？' },
      aa: { caption: '1 + 9 = 10', prompt: '1 和 9 也是 10！' },
      bq: { caption: '12', prompt: '12 可以拆開嗎？' },
      ba: { caption: '5 + 7 = 12', prompt: '5 和 7 合起來是 12。對了！' },
      cq: { caption: '12', prompt: '12 還有別的拆法嗎？' },
      ca: {
        caption: '6 + 6 = 12',
        prompt: '6 和 6——兩邊一樣。你最棒！',
      },
    },
  },
}

export const seriesZhHant: Record<string, SeriesPartText> = {
  '1n1-p1': { title: '數到 5', blurb: '先數小的！' },
  '1n1-p2': { title: '數到 10', blurb: '再多一點！' },
  '1n1-p3': { title: '哪邊較多？', blurb: '找出較多的一組！' },
  '1n1-p4': { title: '哪邊較少？', blurb: '找出較少的一組！' },
  '1n1-p5': { title: '一樣多！', blurb: '兩邊一樣的時候' },
  '1n1-p6': { title: '雙數——一對對', blurb: '大家都有伴！' },
  '1n1-p7': { title: '單數——剩下一個', blurb: '有人沒有伴！' },
  '1n1-p8': { title: '拆開小數目', blurb: '先拆小的！' },
  '1n1-p9': { title: '拆到 10', blurb: '再大一點！' },
  '1n1-p10': { title: '很多種拆法', blurb: '同一個數，不同拆法！' },
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
