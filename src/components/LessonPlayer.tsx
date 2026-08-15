import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nextLessonId } from '../data/p1Catalog'
import type { Lesson, NumberLabProps, WorldLabProps } from '../data/types'
import { useI18n } from '../i18n/I18nProvider'
import { LangSwitch } from './LangSwitch'
import { NumberComposeLab } from './NumberComposeLab'
import { WorldLab } from './WorldLab'

type Props = { lesson: Lesson }

export function LessonPlayer({ lesson }: Props) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [i, setI] = useState(0)
  const [gateOk, setGateOk] = useState(false)
  const touchY = useRef<number | null>(null)
  const wheelLock = useRef(false)
  const done = i >= lesson.beats.length
  const beat = done ? null : lesson.beats[i]
  const progress = done ? 1 : (i + 1) / lesson.beats.length
  const gated = beat?.gate === 'interact' && !gateOk
  const nextId = nextLessonId(lesson.id)
  const doneRef = useRef(done)
  const nextIdRef = useRef(nextId)
  doneRef.current = done
  nextIdRef.current = nextId

  const go = useCallback(
    (delta: number) => {
      if (delta > 0 && doneRef.current) {
        const id = nextIdRef.current
        navigate(id ? `/lesson/${id}` : '/')
        return
      }
      setI((cur) => {
        const b = lesson.beats[cur]
        if (delta > 0 && b?.gate === 'interact' && !gateOk) return cur
        const next = cur + delta
        if (next < 0) return 0
        if (next > lesson.beats.length) return lesson.beats.length
        return next
      })
    },
    [lesson.beats, gateOk, navigate],
  )

  useEffect(() => {
    setI(0)
    setGateOk(false)
  }, [lesson.id])

  useEffect(() => {
    setGateOk(false)
  }, [i])

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const syncH = () => {
      const h = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty('--app-h', `${h}px`)
      window.scrollTo(0, 0)
    }
    syncH()
    window.visualViewport?.addEventListener('resize', syncH)
    window.visualViewport?.addEventListener('scroll', syncH)
    window.addEventListener('resize', syncH)

    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
      document.documentElement.style.removeProperty('--app-h')
      window.visualViewport?.removeEventListener('resize', syncH)
      window.visualViewport?.removeEventListener('scroll', syncH)
      window.removeEventListener('resize', syncH)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  useEffect(() => {
    const blockTouch = (e: TouchEvent) => {
      e.preventDefault()
    }
    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault()
      if (wheelLock.current) return
      if (Math.abs(e.deltaY) < 8) return
      wheelLock.current = true
      go(e.deltaY > 0 ? 1 : -1)
      window.setTimeout(() => {
        wheelLock.current = false
      }, 380)
    }
    document.addEventListener('touchmove', blockTouch, { passive: false })
    document.addEventListener('wheel', onWheelNative, { passive: false })
    return () => {
      document.removeEventListener('touchmove', blockTouch)
      document.removeEventListener('wheel', onWheelNative)
    }
  }, [go])

  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchY.current == null) return
    const dy = touchY.current - e.changedTouches[0].clientY
    touchY.current = null
    if (Math.abs(dy) < 36) return
    go(dy > 0 ? 1 : -1)
  }

  const vizType = beat?.viz?.type ?? 'none'
  const labProps = (beat?.viz?.props ?? { mode: 'ask' }) as NumberLabProps
  const worldProps = (beat?.viz?.props ?? { mode: 'length' }) as WorldLabProps

  const onLabInteract = () => {
    setGateOk(true)
    window.setTimeout(() => {
      setI((cur) => Math.min(cur + 1, lesson.beats.length))
    }, 700)
  }

  const gotItSub = lesson.gotItSub ?? t.gotItSub

  return (
    <div
      className="player"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="chrome-top">
        <Link to="/" className="back">
          ←
        </Link>
        <div className="chrome-title">{lesson.title}</div>
        <div className="chrome-right">
          <LangSwitch />
          <div className="step-count">
            {done ? '✓' : `${i + 1}/${lesson.beats.length}`}
          </div>
        </div>
      </div>

      <div className="rail">
        <div className="rail-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <main
        className={`stage ${gated ? 'gated' : ''}`}
        onClick={() => {
          if (done || gated) return
          go(1)
        }}
      >
        {done ? (
          <div className="complete">
            <div className="complete-glyph">◎</div>
            <h2>{t.gotIt}</h2>
            <p className="complete-sub">{gotItSub}</p>
            <div className="complete-actions">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setI(0)
                  setGateOk(false)
                }}
              >
                {t.replay}
              </button>
              {nextId ? (
                <Link
                  className="primary"
                  to={`/lesson/${nextId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.nextPart}
                </Link>
              ) : (
                <Link
                  className="primary"
                  to="/"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.catalog}
                </Link>
              )}
            </div>
          </div>
        ) : (
          beat && (
            <div className="beat-stage">
              {beat.prompt && <p className="prompt">{beat.prompt}</p>}
              <div className="viz-plane" key={beat.id}>
                {vizType === 'numberLab' && (
                  <NumberComposeLab
                    {...labProps}
                    onInteractComplete={onLabInteract}
                  />
                )}
                {vizType === 'worldLab' && <WorldLab {...worldProps} />}
              </div>
              <div className={`caption-chip ${gated ? 'pulse' : ''}`}>
                {gated ? t.gateChip : beat.caption}
              </div>
            </div>
          )
        )}
      </main>

      <footer className="hint">
        {gated ? t.challengeHint : t.swipeHint}
      </footer>
    </div>
  )
}
