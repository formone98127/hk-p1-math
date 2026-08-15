// Seeded random number generator for reproducible question generation

export class SeededRandom {
  private seed: number

  constructor(seed: number = Date.now()) {
    this.seed = seed
  }

  // Get next random number between 0 and 1
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  // Get random integer between min and max (inclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  // Get random element from array
  nextArray<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)]
  }

  // Get random subset of array
  nextSubset<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => this.next() - 0.5)
    return shuffled.slice(0, Math.min(count, array.length))
  }

  // Get random boolean
  nextBoolean(): boolean {
    return this.next() > 0.5
  }

  // Shuffle array in place
  shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

// Create session-based seed for question generation
export function createSessionSeed(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Generate unique exercise ID
export function generateExerciseId(unitId: string, type: string, seed: string, index: number): string {
  const seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return `${unitId}-${type}-${(seedHash % 10000).toString().padStart(4, '0')}-${index}`
}

// Global random instance for general use
let globalRandom = new SeededRandom()

export function setGlobalSeed(seed: number): void {
  globalRandom = new SeededRandom(seed)
}

export function randomInt(min: number, max: number): number {
  return globalRandom.nextInt(min, max)
}

export function randomArray<T>(array: T[]): T {
  return globalRandom.nextArray(array)
}

export function randomBoolean(): boolean {
  return globalRandom.nextBoolean()
}