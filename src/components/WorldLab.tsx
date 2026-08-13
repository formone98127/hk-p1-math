import type { WorldLabProps } from '../data/types'
import { useI18n } from '../i18n/I18nProvider'

const COLORS = {
  a: '#ff6b7a',
  b: '#4cc9f0',
  solo: '#ffd166',
  ink: '#f3f7f2',
}

export function WorldLab({
  mode,
  showAnswer = false,
  lenA = 4,
  lenB = 2,
  coins = [2, 2, 1],
  moneyTotal = 5,
  hour = 3,
  shape2d = 'triangle',
  shape3d = 'cube',
  place = 'left',
  answerLabel,
}: WorldLabProps) {
  const { t } = useI18n()

  const lengthAnswer =
    lenA === lenB
      ? t.sameLabel
      : lenA > lenB
        ? t.longerLabel
        : t.shorterLabel

  return (
    <div className={`world-lab mode-${mode} ${showAnswer ? 'has-answer' : 'is-question'}`}>
      <svg className="world-svg" viewBox="0 0 380 300" role="img">
        {mode === 'length' && (
          <g>
            <rect
              className="len-bar a counter-pop"
              x={40}
              y={80}
              width={40 + lenA * 36}
              height={36}
              rx={10}
              fill={COLORS.a}
            />
            <rect
              className="len-bar b counter-pop"
              x={40}
              y={160}
              width={40 + lenB * 36}
              height={36}
              rx={10}
              fill={COLORS.b}
              style={{ animationDelay: '80ms' }}
            />
            {showAnswer && (
              <text x={190} y={270} textAnchor="middle" className="big-num sm answer-pop">
                {answerLabel ??
                  (lenA > lenB ? `A · ${t.longerLabel}` : lenA < lenB ? `B · ${t.longerLabel}` : t.sameLabel)}
              </text>
            )}
          </g>
        )}

        {mode === 'money' && (
          <g>
            {coins.map((v, i) => {
              const x = 70 + (i % 4) * 70
              const y = 90 + Math.floor(i / 4) * 80
              return (
                <g key={i} className="counter-pop" style={{ animationDelay: `${i * 70}ms` }}>
                  <circle cx={x} cy={y} r={28} fill={COLORS.solo} className="counter-dot" />
                  <text x={x} y={y + 7} textAnchor="middle" className="coin-val">
                    ${v}
                  </text>
                </g>
              )
            })}
            {showAnswer && (
              <text x={190} y={270} textAnchor="middle" className="big-num sm answer-pop">
                ${moneyTotal}
              </text>
            )}
          </g>
        )}

        {mode === 'clock' && (
          <g>
            <circle cx={190} cy={140} r={90} fill="rgba(255,255,255,0.06)" stroke={COLORS.solo} strokeWidth={3} />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2
              const x = 190 + Math.cos(a) * 72
              const y = 140 + Math.sin(a) * 72
              return (
                <text key={i} x={x} y={y + 5} textAnchor="middle" className="clock-num">
                  {i + 1}
                </text>
              )
            })}
            {/* hour hand */}
            <line
              x1={190}
              y1={140}
              x2={190 + Math.cos((hour / 12) * Math.PI * 2 - Math.PI / 2) * 50}
              y2={140 + Math.sin((hour / 12) * Math.PI * 2 - Math.PI / 2) * 50}
              stroke={COLORS.a}
              strokeWidth={5}
              strokeLinecap="round"
              className="counter-pop"
            />
            <circle cx={190} cy={140} r={6} fill={COLORS.solo} />
            {showAnswer && (
              <text x={190} y={270} textAnchor="middle" className="big-num sm answer-pop">
                {hour}:00
              </text>
            )}
          </g>
        )}

        {mode === 'shape2d' && (
          <g>
            {shape2d === 'triangle' && (
              <polygon points="190,50 80,220 300,220" fill={COLORS.a} className="counter-pop" />
            )}
            {shape2d === 'square' && (
              <rect x={110} y={60} width={160} height={160} fill={COLORS.b} className="counter-pop" />
            )}
            {shape2d === 'rectangle' && (
              <rect x={70} y={90} width={240} height={120} fill={COLORS.solo} className="counter-pop" />
            )}
            {shape2d === 'circle' && (
              <circle cx={190} cy={140} r={90} fill={COLORS.a} className="counter-pop" />
            )}
            {shape2d === 'pentagon' && (
              <polygon
                points="190,45 300,120 260,240 120,240 80,120"
                fill={COLORS.b}
                className="counter-pop"
              />
            )}
            {showAnswer && (
              <text x={190} y={280} textAnchor="middle" className="big-num sm answer-pop">
                {answerLabel ?? shape2d}
              </text>
            )}
          </g>
        )}

        {mode === 'shape3d' && (
          <g>
            {shape3d === 'cube' && (
              <g className="counter-pop">
                <polygon points="140,90 220,90 250,120 170,120" fill={COLORS.a} opacity={0.9} />
                <polygon points="140,90 170,120 170,200 140,170" fill={COLORS.a} opacity={0.7} />
                <polygon points="170,120 250,120 250,200 170,200" fill={COLORS.a} opacity={0.55} />
              </g>
            )}
            {shape3d === 'cylinder' && (
              <g className="counter-pop">
                <ellipse cx={190} cy={80} rx={60} ry={22} fill={COLORS.b} />
                <rect x={130} y={80} width={120} height={120} fill={COLORS.b} opacity={0.75} />
                <ellipse cx={190} cy={200} rx={60} ry={22} fill={COLORS.b} />
              </g>
            )}
            {shape3d === 'sphere' && (
              <circle cx={190} cy={140} r={85} fill={COLORS.solo} className="counter-pop" />
            )}
            {shape3d === 'cone' && (
              <g className="counter-pop">
                <polygon points="190,50 120,200 260,200" fill={COLORS.a} opacity={0.85} />
                <ellipse cx={190} cy={200} rx={70} ry={22} fill={COLORS.a} />
              </g>
            )}
            {showAnswer && (
              <text x={190} y={280} textAnchor="middle" className="big-num sm answer-pop">
                {answerLabel ?? shape3d}
              </text>
            )}
          </g>
        )}

        {mode === 'space' && (
          <g>
            <rect x={120} y={90} width={140} height={100} rx={12} fill="rgba(255,255,255,0.08)" stroke={COLORS.ink} strokeWidth={2} />
            <text x={190} y={148} textAnchor="middle" className="box-label">
              box
            </text>
            {place === 'over' && <circle cx={190} cy={55} r={18} fill={COLORS.solo} className="counter-pop" />}
            {place === 'under' && <circle cx={190} cy={230} r={18} fill={COLORS.solo} className="counter-pop" />}
            {place === 'left' && <circle cx={70} cy={140} r={18} fill={COLORS.solo} className="counter-pop" />}
            {place === 'right' && <circle cx={310} cy={140} r={18} fill={COLORS.solo} className="counter-pop" />}
            {place === 'inFront' && <circle cx={190} cy={210} r={18} fill={COLORS.solo} className="counter-pop" />}
            {place === 'behind' && <circle cx={190} cy={70} r={18} fill={COLORS.solo} className="counter-pop" />}
            {showAnswer && (
              <text x={190} y={280} textAnchor="middle" className="big-num sm answer-pop">
                {answerLabel ?? place}
              </text>
            )}
          </g>
        )}
      </svg>
      {/* silence unused */}
      <span className="sr-only">{lengthAnswer}</span>
    </div>
  )
}
