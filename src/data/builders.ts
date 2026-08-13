import type { Lesson, Beat, NumberLabProps, WorldLabProps } from './types'

export function countQA(
  id: string,
  n: number,
  qPrompt: string,
  aPrompt: string,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: 'Think…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'ask', countTo: n, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: `${n} — yes!`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'count', countTo: n, showAnswer: true },
      },
    },
  ]
}

export function compareQA(
  id: string,
  a: number,
  b: number,
  qPrompt: string,
  aCaption: string,
  aPrompt: string,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: 'Look…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: a, groupB: b, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: aCaption,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'compare', groupA: a, groupB: b, showAnswer: true },
      },
    },
  ]
}

export function oddEvenQA(
  id: string,
  n: number,
  qPrompt: string,
  aCaption: string,
  aPrompt: string,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: 'Think…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: n, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: aCaption,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'oddEven', countTo: n, showAnswer: true },
      },
    },
  ]
}

export function splitQA(
  id: string,
  total: number,
  partA: number,
  partB: number,
  qPrompt: string,
  aPrompt: string,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: String(total),
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total, partA, partB, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: `${partA} + ${partB} = ${total}`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'landed', total, partA, partB, showAnswer: true },
      },
    },
  ]
}

export function addQA(
  id: string,
  partA: number,
  partB: number,
  qPrompt: string,
  aPrompt: string,
): Beat[] {
  const sum = partA + partB
  return [
    {
      id: `${id}q`,
      caption: 'Add…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'add', partA, partB, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: `${partA} + ${partB} = ${sum}`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'add', partA, partB, showAnswer: true },
      },
    },
  ]
}

export function subQA(
  id: string,
  total: number,
  take: number,
  qPrompt: string,
  aPrompt: string,
): Beat[] {
  const left = total - take
  return [
    {
      id: `${id}q`,
      caption: 'Take away…',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'sub', total, partB: take, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: `${total} − ${take} = ${left}`,
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'sub', total, partB: take, showAnswer: true },
      },
    },
  ]
}

export function tensQA(
  id: string,
  n: number,
  qPrompt: string,
  aPrompt: string,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: 'How many?',
      prompt: qPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'tens', countTo: n, showAnswer: false },
      },
    },
    {
      id: `${id}a`,
      caption: String(n),
      prompt: aPrompt,
      viz: {
        type: 'numberLab',
        props: { mode: 'tens', countTo: n, showAnswer: true },
      },
    },
  ]
}

export function worldQA(
  id: string,
  qPrompt: string,
  aCaption: string,
  aPrompt: string,
  props: WorldLabProps,
): Beat[] {
  return [
    {
      id: `${id}q`,
      caption: 'Look…',
      prompt: qPrompt,
      viz: { type: 'worldLab', props: { ...props, showAnswer: false } },
    },
    {
      id: `${id}a`,
      caption: aCaption,
      prompt: aPrompt,
      viz: { type: 'worldLab', props: { ...props, showAnswer: true } },
    },
  ]
}

export function lesson(
  id: string,
  title: string,
  subtitle: string,
  gotItSub: string,
  beats: Beat[],
): Lesson {
  return { id, title, subtitle, lab: true, gotItSub, beats }
}

export type { NumberLabProps }
