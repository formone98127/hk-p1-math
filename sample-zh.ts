import { generateExerciseSetForUnit } from './src/data/exerciseSetGenerators'

const units = ['1n1', '1n2', '1n3', '1n4', '1f1', '1m1', '1m2', '1m3', '1m4', '1s1', '1s2']
for (const unit of units) {
  const set = generateExerciseSetForUnit(unit, 12, undefined, 'zh-Hant')
  console.log(`\n===== ${unit} =====`)
  for (const ex of set.exercises.slice(0, 10)) {
    console.log(`  Q: ${ex.question}`)
    console.log(`    ✓ ${ex.correctAnswer}   opts: [${ex.options!.join(' | ')}]`)
  }
}
