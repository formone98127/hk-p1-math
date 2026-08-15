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

export type WorldLabMode =
  | 'length'
  | 'money'
  | 'clock'
  | 'shape2d'
  | 'shape3d'
  | 'space'

// Exercise System Types
export type ExerciseType =
  | 'multipleChoice'
  | 'fillBlank'
  | 'matchPairs'
  | 'ordering'
  | 'identify'
  | 'calculation'
  | 'wordProblem'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Exercise = {
  id: string
  type: ExerciseType
  difficulty: Difficulty
  unitId: string
  question: string
  options?: string[]
  correctAnswer: string | number
  hint?: string
  explanation?: string
  points: number
}

export type ExerciseSet = {
  id: string
  unitId: string
  title: string
  description: string
  exercises: Exercise[]
  totalPoints: number
  timeLimit?: number // seconds
  prerequisites?: string[]
}

export type UserProgress = {
  completedExercises: string[]
  scores: Record<string, number> // exerciseSetId -> percentage
  streaks: Record<string, number>
  totalPoints: number
  lastPractice: string
  timeSpent: Record<string, number> // unitId -> seconds
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  requirement: (progress: UserProgress) => boolean
  points: number
  unlocked?: boolean
}

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

export type WorldLabProps = {
  mode: WorldLabMode
  showAnswer?: boolean
  lenA?: number
  lenB?: number
  coins?: number[]
  moneyTotal?: number
  hour?: number
  shape2d?: 'triangle' | 'square' | 'rectangle' | 'circle' | 'pentagon'
  shape3d?: 'cube' | 'cylinder' | 'sphere' | 'cone'
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