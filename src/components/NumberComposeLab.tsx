import { useEffect, useMemo, useRef, useState } from 'react'
import type { NumberLabProps } from '../data/types'
import { useI18n } from '../i18n/I18nProvider'

type Pt = { x: number; y: number }

const COLORS = {
  a: '#ff6b7a',
  b: '#4cc9f0',
  solo: '#ffd166',
}

function beep() {
  try {
    const ctx = new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 640
    g.gain.value = 0.045
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28)
    o.stop(ctx.currentTime + 0.3)
    window.setTimeout(() => ctx.close(), 400)
  } catch {
    /* ignore */
  }
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t))
}
function easeOut(t: number) {
  return 1 - (1 - t) ** 3
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function gridPositions(
  n: number,
  box: { x: number; y: number; w: number; h: number },
): Pt[] {
  const cols = Math.min(5, Math.max(1, Math.ceil(Math.sqrt(n))))
  const rows = Math.ceil(n / cols)
  const gapX = box.w / (cols + 1)
  const gapY = box.h / (rows + 1)
  const pts: Pt[] = []
  for (let i = 0; i < n; i++) {
    const c = i % cols
    const r = Math.floor(i / cols)
    pts.push({
      x: box.x + gapX * (c + 1),
      y: box.y + gapY * (r + 1),
    })
  }
  return pts
}

function pairPositions(n: number, origin: Pt): { pts: Pt[]; leftover: boolean } {
  const pairs = Math.floor(n / 2)
  const leftover = n % 2 === 1
  const pts: Pt[] = []
  const startX = origin.x - ((pairs - 1) * 56) / 2
  for (let i = 0; i < pairs; i++) {
    const cx = startX + i * 56
    pts.push({ x: cx - 12, y: origin.y })
    pts.push({ x: cx + 12, y: origin.y })
  }
  if (leftover) {
    pts.push({ x: origin.x, y: origin.y + 48 })
  }
  return { pts, leftover }
}

function Counter({
  x,
  y,
  color,
  r = 14,
  label,
  delayMs = 0,
  pop = true,
  opacity = 1,
}: {
  x: number
  y: number
  color: string
  r?: number
  label?: string
  delayMs?: number
  pop?: boolean
  opacity?: number
}) {
  return (
    <g
      className={pop ? 'counter-pop' : undefined}
      style={pop ? { animationDelay: `${delayMs}ms`, opacity } : { opacity }}
    >
      <circle cx={x} cy={y} r={r} fill={color} className="counter-dot" />
      {label != null && (
        <text x={x} y={y + 5} textAnchor="middle" className="counter-idx">
          {label}
        </text>
      )}
    </g>
  )
}

export function NumberComposeLab({
  mode,
  showAnswer = false,
  total = 12,
  partA = 4,
  partB = 8,
  countTo = 7,
  groupA = 5,
  groupB = 3,
}: NumberLabProps) {
  const { t } = useI18n()
  const [splitT, setSplitT] = useState(0)
  const [flying, setFlying] = useState(false)
  const [entered, setEntered] = useState(false)
  const rafRef = useRef(0)

  const addTotal = partA + partB
  const subRemain = Math.max(0, total - partB)
  const tensN = countTo

  const homePts = useMemo(
    () => gridPositions(total, { x: 40, y: 70, w: 300, h: 160 }),
    [total],
  )
  const partAPts = useMemo(
    () => gridPositions(partA, { x: 20, y: 90, w: 150, h: 140 }),
    [partA],
  )
  const partBPts = useMemo(
    () => gridPositions(partB, { x: 210, y: 90, w: 150, h: 140 }),
    [partB],
  )
  const askPts = useMemo(
    () => gridPositions(countTo, { x: 50, y: 70, w: 280, h: 150 }),
    [countTo],
  )
  const compareA = useMemo(
    () => gridPositions(groupA, { x: 20, y: 90, w: 150, h: 140 }),
    [groupA],
  )
  const compareB = useMemo(
    () => gridPositions(groupB, { x: 210, y: 90, w: 150, h: 140 }),
    [groupB],
  )
  const pairs = useMemo(
    () => pairPositions(countTo, { x: 190, y: 130 }),
    [countTo],
  )
  const addA = useMemo(
    () => gridPositions(partA, { x: 20, y: 90, w: 150, h: 140 }),
    [partA],
  )
  const addB = useMemo(
    () => gridPositions(partB, { x: 210, y: 90, w: 150, h: 140 }),
    [partB],
  )
  const subPts = useMemo(
    () => gridPositions(total, { x: 50, y: 70, w: 280, h: 150 }),
    [total],
  )
  const tensCount = Math.floor(tensN / 10)
  const onesCount = tensN % 10
  const onesPts = useMemo(
    () => gridPositions(onesCount, { x: 250, y: 80, w: 100, h: 160 }),
    [onesCount],
  )

  useEffect(() => {
    setEntered(false)
    const id = window.requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [mode, showAnswer, countTo, groupA, groupB, total, partA, partB])

  // Question: keep pile together. Answer: animate split.
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    const isSplitMode =
      mode === 'challenge' || mode === 'landed' || mode === 'generalize'

    if (!isSplitMode) {
      setSplitT(0)
      setFlying(false)
      return
    }

    if (!showAnswer) {
      setSplitT(0)
      setFlying(false)
      return
    }

    setSplitT(0)
    setFlying(true)
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const u = easeOut(clamp01((now - start) / dur))
      setSplitT(u)
      if (u < 1) rafRef.current = requestAnimationFrame(tick)
      else {
        setFlying(false)
        beep()
      }
    }
    const delay = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, 60)
    return () => {
      clearTimeout(delay)
      cancelAnimationFrame(rafRef.current)
    }
  }, [mode, showAnswer, total, partA, partB])

  const aTag =
    groupA > groupB ? t.moreLabel : groupA < groupB ? t.lessLabel : t.sameLabel
  const bTag =
    groupB > groupA ? t.moreLabel : groupB < groupA ? t.lessLabel : t.sameLabel

  const isCount = mode === 'ask' || mode === 'count'
  const isCompare = mode === 'compare'
  const isOddEven = mode === 'oddEven'
  const isSplit =
    mode === 'challenge' || mode === 'landed' || mode === 'generalize'
  const isAdd = mode === 'add'
  const isSub = mode === 'sub'
  const isTens = mode === 'tens'
  const splitDone = splitT > 0.98

  const replaySplit = () => {
    cancelAnimationFrame(rafRef.current)
    setSplitT(0)
    setFlying(true)
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const u = easeOut(clamp01((now - start) / dur))
      setSplitT(u)
      if (u < 1) rafRef.current = requestAnimationFrame(tick)
      else {
        setFlying(false)
        beep()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <div
      className={`number-lab mode-${mode} ${flying ? 'is-flying' : ''} ${entered ? 'is-in' : ''} ${showAnswer ? 'has-answer' : 'is-question'} ${splitDone ? 'is-split' : ''}`}
    >
      <svg
        className="number-svg"
        viewBox="0 0 380 320"
        role="img"
        aria-label="Numbers to 20 lab"
      >
        {isCount && (
          <g>
            {askPts.map((p, i) => (
              <Counter
                key={i}
                x={p.x}
                y={p.y}
                color={COLORS.solo}
                delayMs={i * 70}
                label={showAnswer ? String(i + 1) : undefined}
              />
            ))}
            {showAnswer && (
              <text
                x={190}
                y={292}
                textAnchor="middle"
                className="big-num answer-pop"
              >
                {countTo}
              </text>
            )}
          </g>
        )}

        {isCompare && (
          <g>
            <rect
              className="group-frame a"
              x={24}
              y={56}
              width={150}
              height={180}
              rx={14}
            />
            <rect
              className="group-frame b"
              x={206}
              y={56}
              width={150}
              height={180}
              rx={14}
            />
            {compareA.map((p, i) => (
              <Counter
                key={`a${i}`}
                x={p.x}
                y={p.y}
                color={COLORS.a}
                delayMs={i * 55}
              />
            ))}
            {compareB.map((p, i) => (
              <Counter
                key={`b${i}`}
                x={p.x}
                y={p.y}
                color={COLORS.b}
                delayMs={80 + i * 55}
              />
            ))}
            {showAnswer && (
              <>
                <text
                  x={99}
                  y={48}
                  textAnchor="middle"
                  className="group-label a answer-pop"
                >
                  {groupA} · {aTag}
                </text>
                <text
                  x={281}
                  y={48}
                  textAnchor="middle"
                  className="group-label b answer-pop"
                >
                  {groupB} · {bTag}
                </text>
              </>
            )}
          </g>
        )}

        {isOddEven && (
          <g>
            {(showAnswer ? pairs.pts : askPts).map((p, i) => {
              const isLeft =
                showAnswer && pairs.leftover && i === pairs.pts.length - 1
              return (
                <Counter
                  key={i}
                  x={p.x}
                  y={p.y}
                  color={
                    showAnswer
                      ? isLeft
                        ? COLORS.solo
                        : i % 2 === 0
                          ? COLORS.a
                          : COLORS.b
                      : COLORS.solo
                  }
                  r={isLeft ? 16 : 14}
                  delayMs={i * 60}
                />
              )
            })}
            {showAnswer &&
              Array.from({ length: Math.floor(countTo / 2) }).map((_, i) => {
                const startX =
                  190 - ((Math.floor(countTo / 2) - 1) * 56) / 2
                const cx = startX + i * 56
                return (
                  <ellipse
                    key={`br${i}`}
                    cx={cx}
                    cy={130}
                    rx={28}
                    ry={22}
                    className="pair-ring answer-pop"
                    style={{ animationDelay: `${120 + i * 80}ms` }}
                  />
                )
              })}
            {showAnswer && (
              <>
                <text
                  x={190}
                  y={255}
                  textAnchor="middle"
                  className="pair-caption answer-pop"
                >
                  {pairs.leftover ? t.oddLabel : t.evenLabel}
                </text>
                <text
                  x={190}
                  y={295}
                  textAnchor="middle"
                  className="big-num sm answer-pop"
                >
                  {countTo}
                </text>
              </>
            )}
          </g>
        )}

        {isSplit && (
          <g>
            {showAnswer && (
              <>
                <rect
                  className={`split-tray a ${splitT > 0.15 ? 'hot' : ''}`}
                  x={24}
                  y={56}
                  width={150}
                  height={180}
                  rx={14}
                />
                <rect
                  className={`split-tray b ${splitT > 0.15 ? 'hot' : ''}`}
                  x={206}
                  y={56}
                  width={150}
                  height={180}
                  rx={14}
                />
              </>
            )}

            {Array.from({ length: total }).map((_, i) => {
              const home = homePts[i] ?? { x: 190, y: 150 }
              const target = i < partA ? partAPts[i] : partBPts[i - partA]
              const local = showAnswer
                ? easeOut(clamp01(splitT * 1.35 - i * 0.045))
                : 0
              const lift = Math.sin(local * Math.PI) * 22
              const x = lerp(home.x, target.x, local)
              const y = lerp(home.y, target.y, local) - lift
              const color = showAnswer
                ? i < partA
                  ? COLORS.a
                  : COLORS.b
                : COLORS.solo
              return (
                <Counter
                  key={i}
                  x={x}
                  y={y}
                  color={color}
                  pop={!showAnswer}
                  delayMs={!showAnswer ? i * 50 : 0}
                />
              )
            })}

            {!showAnswer && (
              <text x={190} y={292} textAnchor="middle" className="big-num">
                {total}
              </text>
            )}

            {showAnswer && (
              <>
                <text
                  x={99}
                  y={48}
                  textAnchor="middle"
                  className="group-label a answer-pop"
                >
                  {partA}
                </text>
                <text
                  x={281}
                  y={48}
                  textAnchor="middle"
                  className="group-label b answer-pop"
                >
                  {partB}
                </text>
              </>
            )}
          </g>
        )}
        {isAdd && (
          <g>
            <rect className="group-frame a" x={24} y={56} width={150} height={180} rx={14} />
            <rect className="group-frame b" x={206} y={56} width={150} height={180} rx={14} />
            {addA.map((p, i) => (
              <Counter key={`aa${i}`} x={p.x} y={p.y} color={COLORS.a} delayMs={i * 50} />
            ))}
            {addB.map((p, i) => (
              <Counter key={`ab${i}`} x={p.x} y={p.y} color={COLORS.b} delayMs={80 + i * 50} />
            ))}
            {showAnswer && (
              <>
                <text x={99} y={48} textAnchor="middle" className="group-label a answer-pop">
                  {partA}
                </text>
                <text x={281} y={48} textAnchor="middle" className="group-label b answer-pop">
                  {partB}
                </text>
              </>
            )}
          </g>
        )}

        {isSub && (
          <g>
            {subPts.map((p, i) => {
              const gone = showAnswer && i >= subRemain
              return (
                <Counter
                  key={i}
                  x={p.x}
                  y={p.y}
                  color={gone ? '#556' : COLORS.solo}
                  delayMs={i * 45}
                  opacity={gone ? 0.25 : 1}
                />
              )
            })}
            {showAnswer && (
              <text x={190} y={292} textAnchor="middle" className="big-num answer-pop">
                {subRemain}
              </text>
            )}
          </g>
        )}

        {isTens && (
          <g>
            {Array.from({ length: tensCount }).map((_, i) => (
              <rect
                key={`t${i}`}
                className="counter-pop"
                style={{ animationDelay: `${i * 60}ms` }}
                x={36 + (i % 5) * 38}
                y={70 + Math.floor(i / 5) * 100}
                width={28}
                height={88}
                rx={8}
                fill={COLORS.a}
              />
            ))}
            {onesPts.map((p, i) => (
              <Counter
                key={`o${i}`}
                x={p.x}
                y={p.y}
                color={COLORS.b}
                r={11}
                delayMs={tensCount * 40 + i * 40}
              />
            ))}
            {showAnswer && (
              <text x={190} y={292} textAnchor="middle" className="big-num sm answer-pop">
                {tensCount} {t.tensLabel} + {onesCount} {t.onesLabel}
              </text>
            )}
          </g>
        )}
      </svg>

      {isSplit && showAnswer && (
        <>
          <p className="number-eq show answer-pop">
            <span className="a">{partA}</span>
            <span className="op">+</span>
            <span className="b">{partB}</span>
            <span className="op">=</span>
            <span className="sum">{total}</span>
          </p>
          <button
            type="button"
            className="auto-fit replay-split"
            onClick={(e) => {
              e.stopPropagation()
              replaySplit()
            }}
          >
            {t.watchAgain}
          </button>
        </>
      )}

      {isAdd && showAnswer && (
        <p className="number-eq show answer-pop">
          <span className="a">{partA}</span>
          <span className="op">+</span>
          <span className="b">{partB}</span>
          <span className="op">=</span>
          <span className="sum">{addTotal}</span>
        </p>
      )}

      {isSub && showAnswer && (
        <p className="number-eq show answer-pop">
          <span className="sum">{total}</span>
          <span className="op">−</span>
          <span className="b">{partB}</span>
          <span className="op">=</span>
          <span className="a">{subRemain}</span>
        </p>
      )}
    </div>
  )
}
