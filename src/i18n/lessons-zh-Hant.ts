export type LessonText = {
  title: string
  subtitle: string
  beats: Record<string, { caption: string; prompt?: string }>
}

export type UnitText = {
  title: string
  blurb: string
}

export const lessonsZhHant: Record<string, LessonText> = {
  '1n1-numbers-to-20': {
    title: '數目是「有多少」？',
    subtitle: '數一數、比一比，再拆開——合成與分解',
    beats: {
      n0: {
        caption: '有多少？',
        prompt: '看這些圓點。你能先估計有多少嗎？',
      },
      n1: {
        caption: '一個一個數',
        prompt: '一個一個數下去。數字就是「有多少」的名字。',
      },
      n2: {
        caption: '較多還是較少',
        prompt: '哪一組較多？哪一組較少？（不用學 >、<。）',
      },
      n3: {
        caption: '單數還是雙數',
        prompt: '兩個兩個一對。有沒有剩下一個？',
      },
      n4: {
        caption: '拆開這個數',
        prompt: '12 可以拆成兩部分，合起來又是 12 嗎？',
      },
      n5: {
        caption: '合成與分解',
        prompt: '4 和 8 合成 12。12 可以分解成 4 和 8。',
      },
      n6: {
        caption: '永遠可以',
        prompt: '2 到 18 的數，都可以拆成兩部分，再合回原來的數。',
      },
    },
  },
}

export const unitsZhHant: Record<string, UnitText> = {
  '1n1': {
    title: '20以內的數',
    blurb: '數一數、比一比，再把數目拆開又合上。',
  },
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
