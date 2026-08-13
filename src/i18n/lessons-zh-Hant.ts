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

function cBeats(
  items: { id: string; q: string; aCap: string; a: string }[],
): Record<string, { caption: string; prompt?: string }> {
  const out: Record<string, { caption: string; prompt?: string }> = {}
  for (const it of items) {
    out[`${it.id}q`] = { caption: '看一看…', prompt: it.q }
    out[`${it.id}a`] = { caption: it.aCap, prompt: it.a }
  }
  return out
}

function qa(
  items: { id: string; qCap: string; q: string; aCap: string; a: string }[],
): Record<string, { caption: string; prompt?: string }> {
  const out: Record<string, { caption: string; prompt?: string }> = {}
  for (const it of items) {
    out[`${it.id}q`] = { caption: it.qCap, prompt: it.q }
    out[`${it.id}a`] = { caption: it.aCap, prompt: it.a }
  }
  return out
}

export const lessonsZhHant: Record<string, LessonText> = {
  '1n1-count-small': {
    title: '第 1 步 · 數到 5',
    subtitle: '先數小的！',
    gotItSub: '你會數到 5 了。好開始！',
    beats: countBeats([
      ['a', '1', '有多少顆？', '一！真棒！'],
      ['b', '2', '現在有多少？', '二！對了！'],
      ['c', '3', '有多少？', '三！很好！'],
      ['d', '4', '數一數！', '四！超棒！'],
      ['e', '5', '有多少？', '五！你做到了！'],
    ]),
  },
  '1n1-count-big': {
    title: '第 2 步 · 數到 10',
    subtitle: '再多一點！',
    gotItSub: '你會數到 10 了。太厲害了！',
    beats: countBeats([
      ['a', '6', '有多少顆？', '六！很好！'],
      ['b', '7', '數一數！', '七！對了！'],
      ['c', '8', '有多少？', '八！超棒！'],
      ['d', '9', '快到十了…', '九！真棒！'],
      ['e', '10', '有多少？', '十！哇！'],
    ]),
  },
  '1n1-more': {
    title: '第 3 步 · 哪邊較多？',
    subtitle: '找出較多的一組！',
    gotItSub: '你會找出較多的了。好厲害！',
    beats: cBeats([
      { id: 'a', q: '紅還是藍較多？', aCap: '5 較多 · 2 較少', a: '紅色較多。好眼力！' },
      { id: 'b', q: '哪邊較多？', aCap: '3 較少 · 7 較多', a: '藍色較多。對！' },
      { id: 'c', q: '哪邊較多？', aCap: '8 較多 · 4 較少', a: '紅色較多。太棒了！' },
      { id: 'd', q: '哪邊較多？', aCap: '1 較少 · 6 較多', a: '藍色較多。很好！' },
      { id: 'e', q: '仔細看…', aCap: '9 較多 · 5 較少', a: '紅色較多。你最棒！' },
    ]),
  },
  '1n1-less': {
    title: '第 4 步 · 哪邊較少？',
    subtitle: '找出較少的一組！',
    gotItSub: '你會找出較少的了。聰明！',
    beats: cBeats([
      { id: 'a', q: '哪邊較少？', aCap: '6 較多 · 3 較少', a: '藍色較少。很好！' },
      { id: 'b', q: '紅還是藍較少？', aCap: '2 較少 · 5 較多', a: '紅色較少。對！' },
      { id: 'c', q: '哪邊較少？', aCap: '4 較少 · 9 較多', a: '紅色較少。真棒！' },
      { id: 'd', q: '哪邊較少？', aCap: '8 較多 · 1 較少', a: '藍色較少。超棒！' },
      { id: 'e', q: '找出較少的一組！', aCap: '7 較多 · 3 較少', a: '藍色較少。聰明！' },
    ]),
  },
  '1n1-same': {
    title: '第 5 步 · 一樣多！',
    subtitle: '兩邊一樣的時候',
    gotItSub: '你會看出一樣多了。好聰明！',
    beats: cBeats([
      { id: 'a', q: '較多、較少，還是一樣？', aCap: '一樣 — 3 和 3', a: '一樣多！聰明！' },
      { id: 'b', q: '一樣多嗎？', aCap: '一樣 — 5 和 5', a: '對——兩邊一樣！' },
      { id: 'c', q: '仔細看…', aCap: '一樣 — 4 和 4', a: '又是一樣！你最棒！' },
      { id: 'd', q: '一樣嗎？', aCap: '一樣 — 2 和 2', a: '一樣！完美！' },
      { id: 'e', q: '兩邊相等嗎？', aCap: '一樣 — 6 和 6', a: '一樣！超級棒！' },
    ]),
  },
  '1n1-even': {
    title: '第 6 步 · 雙數——一對對',
    subtitle: '大家都有伴！',
    gotItSub: '雙數可以一對對。你懂了！',
    beats: cBeats([
      { id: 'a', q: '大家都有伴嗎？', aCap: '2 — 雙數！', a: '有！剛好一對。萬歲！' },
      { id: 'b', q: '四個朋友——有對嗎？', aCap: '4 — 雙數！', a: '全部都有對。對！' },
      { id: 'c', q: '六個——有人剩下嗎？', aCap: '6 — 雙數！', a: '沒人剩下！雙數！' },
      { id: 'd', q: '八——成對嗎？', aCap: '8 — 雙數！', a: '完美一對對。太棒了！' },
      { id: 'e', q: '十個朋友？', aCap: '10 — 雙數！', a: '全部成對。好厲害！' },
    ]),
  },
  '1n1-odd': {
    title: '第 7 步 · 單數——剩下一個',
    subtitle: '有人沒有伴！',
    gotItSub: '單數會剩下一個。你看出來了！',
    beats: cBeats([
      { id: 'a', q: '大家都有伴嗎？', aCap: '1 — 單數！', a: '剩下一個。這是單數！' },
      { id: 'b', q: '三個朋友？', aCap: '3 — 單數！', a: '剩下一個。對！' },
      { id: 'c', q: '五——有剩下嗎？', aCap: '5 — 單數！', a: '剩下一個。好眼力！' },
      { id: 'd', q: '七個朋友？', aCap: '7 — 單數！', a: '剩下一個。聰明！' },
      { id: 'e', q: '九——成對嗎？', aCap: '9 — 單數！', a: '剩下一個。你懂了！' },
    ]),
  },
  '1n1-split-small': {
    title: '第 8 步 · 拆開小數目',
    subtitle: '先拆小的！',
    gotItSub: '你會拆小數目了。酷！',
    beats: qa([
      { id: 'a', qCap: '3', q: '3 可以拆嗎？', aCap: '1 + 2 = 3', a: '1 和 2 合成 3。酷！' },
      { id: 'b', qCap: '4', q: '4 可以拆嗎？', aCap: '1 + 3 = 4', a: '1 和 3 合成 4。很好！' },
      { id: 'c', qCap: '5', q: '5 可以拆嗎？', aCap: '2 + 3 = 5', a: '2 和 3 合成 5。對！' },
      { id: 'd', qCap: '6', q: '6 可以拆嗎？', aCap: '2 + 4 = 6', a: '2 和 4 合成 6。超棒！' },
      { id: 'e', qCap: '7', q: '7 可以拆嗎？', aCap: '3 + 4 = 7', a: '3 和 4 合成 7。哇！' },
    ]),
  },
  '1n1-split-ten': {
    title: '第 9 步 · 拆到 10',
    subtitle: '再大一點！',
    gotItSub: '你會拆到 10 了。超棒！',
    beats: qa([
      { id: 'a', qCap: '8', q: '8 可以拆嗎？', aCap: '3 + 5 = 8', a: '3 和 5 合成 8。很好！' },
      { id: 'b', qCap: '9', q: '9 可以拆嗎？', aCap: '4 + 5 = 9', a: '4 和 5 合成 9。對！' },
      { id: 'c', qCap: '10', q: '10 可以拆嗎？', aCap: '4 + 6 = 10', a: '4 和 6 合成 10。哇！' },
      { id: 'd', qCap: '10', q: '10 還有別的拆法嗎？', aCap: '2 + 8 = 10', a: '2 和 8 也是 10！' },
      { id: 'e', qCap: '10', q: '10 對半拆？', aCap: '5 + 5 = 10', a: '5 和 5——兩邊一樣！' },
    ]),
  },
  '1n1-split-ways': {
    title: '第 10 步 · 很多種拆法',
    subtitle: '同一個數，不同拆法！',
    gotItSub: '一個數可以有很多拆法。你是超級明星！',
    beats: qa([
      { id: 'a', qCap: '10', q: '10 還有別的拆法嗎？', aCap: '1 + 9 = 10', a: '1 和 9 也是 10！' },
      { id: 'b', qCap: '12', q: '12 可以拆嗎？', aCap: '5 + 7 = 12', a: '5 和 7 合成 12。對！' },
      { id: 'c', qCap: '12', q: '12 還有別的拆法嗎？', aCap: '6 + 6 = 12', a: '6 和 6——兩邊一樣！' },
      { id: 'd', qCap: '14', q: '14 可以拆嗎？', aCap: '6 + 8 = 14', a: '6 和 8 合成 14。很好！' },
      { id: 'e', qCap: '16', q: '16 可以拆嗎？', aCap: '7 + 9 = 16', a: '7 和 9 合成 16。你最棒！' },
    ]),
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
  '1n2-p1': { title: '合起來', blurb: '兩組合在一起！' },
  '1n2-p2': { title: '拿走', blurb: '拿走一些！' },
  '1n2-p3': { title: '零', blurb: '全部拿走！' },
  '1n2-p4': { title: '兩邊加一樣', blurb: '對調也一樣！' },
  '1n2-p5': { title: '加減相連', blurb: '加和減是好朋友！' },
  '1n3-p1': { title: '十和一', blurb: '一捆捆的十！' },
  '1n3-p2': { title: '較大的數', blurb: '哪邊較多？' },
  '1n3-p3': { title: '跳着數', blurb: '一次跳 2！' },
  '1n3-p4': { title: '單雙數', blurb: '看個位！' },
  '1n3-p5': { title: '大約多少？', blurb: '先估再數！' },
  '1n4-p1': { title: '兩個數相加', blurb: '更大的合起來！' },
  '1n4-p2': { title: '三個數相加', blurb: '由左到右！' },
  '1n4-p3': { title: '兩個數相減', blurb: '更大的拿走！' },
  '1n4-p4': { title: '用加法檢驗', blurb: '加回去檢查！' },
  '1n4-p5': { title: '十位幫忙', blurb: '看見十！' },
  '1m1-p1': { title: '較長還是較短？', blurb: '比較兩條！' },
  '1m2-p1': { title: '硬幣面值', blurb: '把錢加起來！' },
  '1m2-p2': { title: '更多硬幣', blurb: '更大堆！' },
  '1m3-p1': { title: '較遠／較近', blurb: '再比較一次！' },
  '1m4-p1': { title: '幾點？', blurb: '看時針！' },
  '1m4-p2': { title: '更多整點', blurb: '繼續讀鐘！' },
  '1s1-p1': { title: '立體圖形', blurb: '說出名字！' },
  '1s2-p1': { title: '平面圖形', blurb: '說出名字！' },
  '1s2-p2': { title: '數一數邊', blurb: '邊數告訴你名字！' },
  '1s3-p1': { title: '在哪裏？', blurb: '找出小球！' },
  '1s3-p2': { title: '更多位置', blurb: '後面和其他！' },
  '1f1-p1': { title: '問一問、查一查', blurb: '先猜再看！' },
  '1f1-p2': { title: '說出為什麼', blurb: '說說你發現什麼！' },
}

export const unitsZhHant: Record<string, UnitText> = {
  '1n1': {
    title: '20以內的數',
    blurb: '十個小小步驟。每步五題！',
  },
  '1n2': {
    title: '基本加減',
    blurb: '合起來、拿走、零，還有加減的關係。',
  },
  '1n3': {
    title: '100以內的數',
    blurb: '十和一、比較、跳數、估計。',
  },
  '1n4': {
    title: '加減（一）',
    blurb: '更大的加減、三個加數、用加檢驗。',
  },
  '1m1': {
    title: '長度和距離（一）',
    blurb: '較長、較短、一樣長。',
  },
  '1m2': {
    title: '貨幣（一）',
    blurb: '硬幣面值和總額。',
  },
  '1m3': {
    title: '長度和距離（二）',
    blurb: '用長條比較遠近。',
  },
  '1m4': {
    title: '時間（一）',
    blurb: '讀整點時間。',
  },
  '1s1': {
    title: '立體圖形（一）',
    blurb: '正方體、圓柱、球、圓錐。',
  },
  '1s2': {
    title: '平面圖形',
    blurb: '平面圖形和邊數。',
  },
  '1s3': {
    title: '方向和位置（一）',
    blurb: '左、右、上、下…',
  },
  '1f1': {
    title: '探究與研習',
    blurb: '問、試、查、解釋。',
  },
}
