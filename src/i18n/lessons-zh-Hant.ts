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
    subtitle: '一個一個數——數字就是「有多少」',
    gotItSub: '數字告訴我們有多少顆。',
    beats: {
      c0: { caption: '看看', prompt: '黃色圓點有多少？' },
      c1: { caption: '數一數', prompt: '跟我數：一、二、三。' },
      c2: { caption: '再試一次', prompt: '新的圓點！現在有多少？' },
      c3: { caption: '數一數', prompt: '一、二、三、四、五。' },
      c4: { caption: '多一點', prompt: '這次有多少？' },
      c5: { caption: '數一數', prompt: '一直數到八。' },
      c6: { caption: '最後一次', prompt: '最後一組——有多少？' },
      c7: { caption: '十！', prompt: '十，就是有十顆。' },
    },
  },
  '1n1-compare': {
    title: '第 2 段 · 較多還是較少？',
    subtitle: '哪一組較多？哪一組較少？',
    gotItSub: '我們可以說哪一組較多，哪一組較少。',
    beats: {
      m0: { caption: '兩組', prompt: '紅色還是藍色——哪邊較多？' },
      m1: { caption: '再試', prompt: '哪一邊圓點較多？' },
      m2: { caption: '一樣？', prompt: '仔細看——較多、較少，還是一樣多？' },
      m3: { caption: '又一次', prompt: '哪一組較少？' },
      m4: { caption: '再一次', prompt: '較多還是較少？' },
    },
  },
  '1n1-odd-even': {
    title: '第 3 段 · 一對對',
    subtitle: '兩個兩個——有沒有剩下一個？',
    gotItSub: '雙數剛剛好一對對。單數會剩下一個。',
    beats: {
      o0: { caption: '牽手', prompt: '大家都能找到伴嗎？' },
      o1: { caption: '試試 5', prompt: '五個朋友呢？' },
      o2: { caption: '試試 6', prompt: '六個朋友——有人剩下嗎？' },
      o3: { caption: '試試 7', prompt: '七——成對還是剩下？' },
      o4: { caption: '試試 8', prompt: '八個朋友牽著手。' },
      o5: { caption: '試試 9', prompt: '九——有一個剩下嗎？' },
    },
  },
  '1n1-split': {
    title: '第 4 段 · 拆開又合上',
    subtitle: '把一個數拆成兩部分——再合回去',
    gotItSub: '一個數可以拆成兩部分，合起來又是原來的數。',
    beats: {
      s0: { caption: '拆開 6', prompt: '按一下，把 6 拆成兩部分。' },
      s1: { caption: '看見了？', prompt: '2 和 4 合起來是 6。' },
      s2: { caption: '拆開 8', prompt: '換一種拆法，拆開 8。' },
      s3: { caption: '合上', prompt: '3 和 5 合起來是 8。' },
      s4: { caption: '拆開 10', prompt: '把十拆成兩部分。' },
      s5: { caption: '合上', prompt: '4 和 6 合起來是 10。' },
      s6: { caption: '拆開 12', prompt: '再來一次——拆開 12。' },
      s7: {
        caption: '都可以',
        prompt: '5 和 7 合起來是 12。數目都可以這樣拆開又合上。',
      },
    },
  },
}

export const seriesZhHant: Record<string, SeriesPartText> = {
  '1n1-p1': {
    title: '有多少？',
    blurb: '數圓點。數字就是「有多少」。',
  },
  '1n1-p2': {
    title: '較多還是較少？',
    blurb: '哪一組較多？哪一組較少？',
  },
  '1n1-p3': {
    title: '一對對',
    blurb: '兩個兩個——有人剩下嗎？',
  },
  '1n1-p4': {
    title: '拆開又合上',
    blurb: '把數目拆開，再合回去。',
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
