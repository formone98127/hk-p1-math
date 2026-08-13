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
    g.gain.value = 0.04
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32)
    o.stop(ctx.currentTime + 0.33)
    window.setTimeout(() => ctx.close(), 450)
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

/** Grid positions for n counters inside a box. */
function gridPositions(n: number, box: { x: number; y: number; w: number; h: number }): Pt[] {
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
  opacity = 1,
  label,
}: {
  x: number
  y: number
  color: string
  r?: number
  opacity?: number
  label?: string
}) {
  return (
    <g opacity={opacity}>
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
  total = 12,
  partA = 4,
  partB = 8,
  countTo = 7,
  groupA = 5,
  groupB = 3,
  onInteractComplete,
}: NumberLabProps) {
  const { t } = useI18n()
  const [visible, setVisible] = useState(0)
  const [splitT, setSplitT] = useState(0)
  const [splitDone, setSplitDone] = useState(false)
  const [flying, setFlying] = useState(false)
  const doneRef = useRef(false)
  const rafRef = useRef(0)

  const homePts = useMemo(
    () =>
      gridPositions(total, { x: 40, y: 70, w: 300, h: 160 }),
    [total],
  )

  const partAPts = useMemo(
    () =>
      gridPositions(partA, { x: 20, y: 90, w: 150, h: 140 }),
    [partA],
  )
  const partBPts = useMemo(
    () =>
      gridPositions(partB, { x: 210, y: 90, w: 150, h: 140 }),
    [partB],
  )

  const askPts = useMemo(
    () => gridPositions(countTo, { x: 50, y: 80, w: 280, h: 160 }),
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
    () => pairPositions(countTo, { x: 190, y: 140 }),
    [countTo],
  )

  // Count-onwards reveal
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    if (mode === 'ask') {
      setVisible(countTo)
      return
    }
    if (mode !== 'count') {
      setVisible(countTo)
      return
    }
    setVisible(0)
    const start = performance.now()
    const stepMs = 280
    const tick = (now: number) => {
      const n = Math.min(countTo, Math.floor((now - start) / stepMs) + 1)
      setVisible(n)
      if (n < countTo) rafRef.current = requestAnimationFrame(tick)
      else beep()
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mode, countTo])

  // Challenge / landed / generalize split state
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    doneRef.current = false
    if (mode === 'challenge') {
      setSplitT(0)
      setSplitDone(false)
      setFlying(false)
    } else if (mode === 'landed' || mode === 'generalize') {
      setSplitT(0)
      setSplitDone(false)
      setFlying(true)
      const start = performance.now()
      const dur = 900
      const tick = (now: number) => {
        const u = easeOut(clamp01((now - start) / dur))
        setSplitT(u)
        if (u < 1) rafRef.current = requestAnimationFrame(tick)
        else {
          setFlying(false)
          setSplitDone(true)
          beep()
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    } else {
      setSplitT(0)
      setSplitDone(false)
      setFlying(false)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [mode, total, partA, partB])

  const runAutoSplit = () => {
    if (flying || splitDone) return
    setFlying(true)
    const start = performance.now()
    const dur = 950
    const stagger = 70
    const tick = (now: number) => {
      // overall progress uses first-to-last stagger feel via sin lift
      const u = easeOut(clamp01((now - start) / (dur + stagger * (total - 1) * 0.15)))
      setSplitT(u)
      if (u < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setFlying(false)
        setSplitDone(true)
        beep()
        if (!doneRef.current) {
          doneRef.current = true
          window.setTimeout(() => onInteractComplete?.(), 320)
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const showNumeral =
    mode === 'count' ||
    mode === 'compare' ||
    mode === 'oddEven' ||
    mode === 'challenge' ||
    mode === 'landed' ||
    mode === 'generalize'

  const showEq = splitDone && (mode === 'challenge' || mode === 'landed' || mode === 'generalize')

  return (
    <div
      className={`number-lab mode-${mode} ${flying ? 'is-flying' : ''} ${splitDone ? 'is-split' : ''}`}
    >
      <svg
        className="number-svg"
        viewBox="0 0 380 320"
        role="img"
        aria-label="Numbers to 20 lab"
      >
        {(mode === 'ask' || mode === 'count') && (
          <g>
            {askPts.map((p, i) => {
              const on = mode === 'ask' || i < visible
              const lift =
                mode === 'count' && i === visible - 1 ? 6 : 0
              return (
                <Counter
                  key={i}
                  x={p.x}
                  y={p.y - lift}
                  color={COLORS.solo}
                  opacity={on ? 1 : 0.12}
                  label={mode === 'count' && on ? String(i + 1) : undefined}
                />
              )
            })}
            {mode === 'count' && visible > 0 && (
              <text x={190} y={290} textAnchor="middle" className="big-num">
                {visible}
              </text>
            )}
          </g>
        )}

        {mode === 'compare' && (
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
              <Counter key={`a${i}`} x={p.x} y={p.y} color={COLORS.a} />
            ))}
            {compareB.map((p, i) => (
              <Counter key={`b${i}`} x={p.x} y={p.y} color={COLORS.b} />
            ))}
            {(() => {
              const aTag =
                groupA > groupB
                  ? t.moreLabel
                  : groupA < groupB
                    ? t.lessLabel
                    : t.sameLabel
              const bTag =
                groupB > groupA
                  ? t.moreLabel
                  : groupB < groupA
                    ? t.lessLabel
                    : t.sameLabel
              return (
                <>
                  <text x={99} y={48} textAnchor="middle" className="group-label a">
                    {groupA} · {aTag}
                  </text>
                  <text x={281} y={48} textAnchor="middle" className="group-label b">
                    {groupB} · {bTag}
                  </text>
                </>
              )
            })()}
          </g>
        )}

        {mode === 'oddEven' && (
          <g>
            {pairs.pts.map((p, i) => {
              const isLeft = pairs.leftover && i === pairs.pts.length - 1
              return (
                <Counter
                  key={i}
                  x={p.x}
                  y={p.y}
                  color={isLeft ? COLORS.solo : i % 2 === 0 ? COLORS.a : COLORS.b}
                  r={isLeft ? 16 : 14}
                />
              )
            })}
            {/* pair brackets */}
            {Array.from({ length: Math.floor(countTo / 2) }).map((_, i) => {
              const startX = 190 - ((Math.floor(countTo / 2) - 1) * 56) / 2
              const cx = startX + i * 56
              return (
                <ellipse
                  key={`br${i}`}
                  cx={cx}
                  cy={140}
                  rx={28}
                  ry={22}
                  className="pair-ring"
                />
              )
            })}
            <text x={190} y={270} textAnchor="middle" className="pair-caption">
              {pairs.leftover ? t.oddLabel : t.evenLabel}
            </text>
            {showNumeral && (
              <text x={190} y={300} textAnchor="middle" className="big-num sm">
                {countTo}
              </text>
            )}
          </g>
        )}

        {(mode === 'challenge' || mode === 'landed' || mode === 'generalize') && (
          <g>
            {/* trays */}
            <rect
              className={`split-tray a ${splitT > 0.2 ? 'hot' : ''}`}
              x={24}
              y={56}
              width={150}
              height={180}
              rx={14}
            />
            <rect
              className={`split-tray b ${splitT > 0.2 ? 'hot' : ''}`}
              x={206}
              y={56}
              width={150}
              height={180}
              rx={14}
            />

            {Array.from({ length: total }).map((_, i) => {
              const home = homePts[i] ?? { x: 190, y: 150 }
              const target =
                i < partA
                  ? partAPts[i]
                  : partBPts[i - partA]
              const local = easeOut(
                clamp01(splitT * 1.35 - i * 0.045),
              )
              const lift = Math.sin(local * Math.PI) * 22
              const x = lerp(home.x, target.x, local)
              const y = lerp(home.y, target.y, local) - lift
              const color = i < partA ? COLORS.a : COLORS.b
              return (
                <Counter key={i} x={x} y={y} color={color} />
              )
            })}

            {splitT < 0.05 && mode === 'challenge' && (
              <text x={190} y={300} textAnchor="middle" className="big-num">
                {total}
              </text>
            )}

            {splitDone && (
              <>
                <text x={99} y={48} textAnchor="middle" className="group-label a">
                  {partA}
                </text>
                <text x={281} y={48} textAnchor="middle" className="group-label b">
                  {partB}
                </text>
              </>
            )}
          </g>
        )}
      </svg>

      {mode === 'challenge' && !splitDone && (
        <button
          type="button"
          className="auto-fit"
          disabled={flying}
          onClick={(e) => {
            e.stopPropagation()
            runAutoSplit()
          }}
        >
          {t.autoSplit}
        </button>
      )}

      <p className={`number-eq ${showEq ? 'show' : ''}`}>
        <span className="a">{partA}</span>
        <span className="op">+</span>
        <span className="b">{partB}</span>
        <span className="op">=</span>
        <span className="sum">{total}</span>
      </p>
    </div>
  )
}

