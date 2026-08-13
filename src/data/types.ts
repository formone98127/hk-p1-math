export type Strand = 'number' | 'measures' | 'shape' | 'inquiry'

export type NumberLabMode =
  | 'ask'
  | 'count'
  | 'compare'
  | 'oddEven'
  | 'challenge'
  | 'landed'
  | 'generalize'

export type NumberLabProps = {
  mode: NumberLabMode
  total?: number
  partA?: number
  partB?: number
  countTo?: number
  groupA?: number
  groupB?: number
  onInteractComplete?: () => void
}

export type Beat = {
  id: string
  caption: string
  prompt?: string
  gate?: 'interact'
  viz?: {
    type: 'numberLab' | 'none'
    props?: NumberLabProps
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
