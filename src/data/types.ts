export type Strand = 'number' | 'measures' | 'shape' | 'inquiry'

export type NumberLabMode =
  | 'ask'
  | 'count'
  | 'compare'
  | 'oddEven'
  | 'challenge'
  | 'landed'
  | 'generalize'
  | 'add'
  | 'sub'
  | 'tens'

export type NumberLabProps = {
  mode: NumberLabMode
  showAnswer?: boolean
  total?: number
  partA?: number
  partB?: number
  countTo?: number
  groupA?: number
  groupB?: number
  onInteractComplete?: () => void
}

export type WorldLabMode =
  | 'length'
  | 'money'
  | 'clock'
  | 'shape2d'
  | 'shape3d'
  | 'space'

export type WorldLabProps = {
  mode: WorldLabMode
  showAnswer?: boolean
  /** length: relative sizes 1–5 */
  lenA?: number
  lenB?: number
  /** money: coin values to show */
  coins?: number[]
  moneyTotal?: number
  /** clock hour 1–12 */
  hour?: number
  /** 2d: triangle | square | rectangle | circle | pentagon */
  shape2d?: 'triangle' | 'square' | 'rectangle' | 'circle' | 'pentagon'
  /** 3d: cube | cylinder | sphere | cone */
  shape3d?: 'cube' | 'cylinder' | 'sphere' | 'cone'
  /** space: where is the star */
  place?: 'over' | 'under' | 'left' | 'right' | 'inFront' | 'behind'
  answerLabel?: string
}

export type Beat = {
  id: string
  caption: string
  prompt?: string
  gate?: 'interact'
  viz?: {
    type: 'numberLab' | 'worldLab' | 'none'
    props?: NumberLabProps | WorldLabProps
  }
}

export type Lesson = {
  id: string
  title: string
  subtitle: string
  lab?: boolean
  gotItSub?: string
  beats: Beat[]
}

export type P1Unit = {
  id: string
  code: string
  title: string
  strand: Strand
  blurb: string
  playable: boolean
  lessonId?: string
}
