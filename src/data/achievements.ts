import type { Achievement, UserProgress } from './types'

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first exercise',
    icon: '👶',
    requirement: (p) => p.completedExercises.length >= 1,
    points: 10,
  },
  {
    id: 'math-apprentice',
    title: 'Math Apprentice',
    description: 'Complete 10 exercises',
    icon: '🎓',
    requirement: (p) => p.completedExercises.length >= 10,
    points: 50,
  },
  {
    id: 'math-master',
    title: 'Math Master',
    description: 'Complete 50 exercises',
    icon: '👑',
    requirement: (p) => p.completedExercises.length >= 50,
    points: 200,
  },
  {
    id: 'perfect-score',
    title: 'Perfect!',
    description: 'Get 100% on any practice set',
    icon: '💯',
    requirement: (p) => Object.values(p.scores).some((score) => score === 100),
    points: 100,
  },
  {
    id: 'hot-streak-3',
    title: 'On Fire!',
    description: 'Answer 3 correctly in a row',
    icon: '🔥',
    requirement: (p) => Object.values(p.streaks).some((s) => s >= 3),
    points: 30,
  },
  {
    id: 'hot-streak-5',
    title: 'Unstoppable!',
    description: 'Answer 5 correctly in a row',
    icon: '⚡',
    requirement: (p) => Object.values(p.streaks).some((s) => s >= 5),
    points: 50,
  },
  {
    id: 'points-100',
    title: 'Century Club',
    description: 'Earn 100 total points',
    icon: '💎',
    requirement: (p) => p.totalPoints >= 100,
    points: 25,
  },
  {
    id: 'points-500',
    title: 'High Scorer',
    description: 'Earn 500 total points',
    icon: '🏆',
    requirement: (p) => p.totalPoints >= 500,
    points: 100,
  },
  {
    id: 'all-number',
    title: 'Number Ninja',
    description: 'Complete all Number strand exercises',
    icon: '🥷',
    requirement: (p) => {
      const numberUnits = ['1n1', '1n2', '1n3', '1n4']
      return numberUnits.every((unit) =>
        Object.keys(p.scores).some((setId) => setId.includes(unit) && p.scores[setId] >= 70)
      )
    },
    points: 150,
  },
  {
    id: 'consistent',
    title: 'Dedicated Learner',
    description: 'Practice on 3 different days',
    icon: '📅',
    requirement: (p) => {
      const dates = Object.values(p.timeSpent).length
      return dates >= 3
    },
    points: 75,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a timed practice with 2+ minutes remaining',
    icon: '⏱️',
    requirement: (p) => p.timeSpent['speed_bonus'] !== undefined,
    points: 40,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Try exercises from at least 3 different units',
    icon: '🗺️',
    requirement: (p) => {
      const uniqueUnits = new Set(p.completedExercises.map((id) => id.split('-')[0]))
      return uniqueUnits.size >= 3
    },
    points: 60,
  },
  {
    id: 'persistent',
    title: 'Never Give Up',
    description: 'Complete 20 exercises (including retries)',
    icon: '💪',
    requirement: (p) => p.completedExercises.length >= 20,
    points: 80,
  },
]

export function checkAchievements(progress: UserProgress): Achievement[] {
  return achievements.filter((ach) => ach.requirement(progress))
}

export function getUnlockedCount(progress: UserProgress): number {
  return checkAchievements(progress).length
}

export function getTotalAchievementPoints(): number {
  return achievements.reduce((sum, ach) => sum + ach.points, 0)
}
