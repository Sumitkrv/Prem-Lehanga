import { useId } from 'react'

const palettes = {
  carmine: { back: '#3b111f', mid: '#74293a', light: '#bd8c73', line: '#d8bd92' },
  ivory: { back: '#ded0bb', mid: '#b99b79', light: '#f4e9d9', line: '#806346' },
  rose: { back: '#44212c', mid: '#945665', light: '#d4a58e', line: '#e0c49b' },
  midnight: { back: '#25212a', mid: '#51475a', light: '#9d8b9b', line: '#d0b281' },
}

export default function ImageCanvas({ variant = 'carmine', number = '01', className = '', label = 'Official studio photograph pending' }) {
  const colors = palettes[variant] || palettes.carmine
  const reactId = useId().replace(/:/g, '')
  const id = `woven-${variant}-${number}-${reactId}`
  return (
    <div className={`image-canvas canvas-${variant} ${className}`} role="img" aria-label={`Illustrative textile-inspired placeholder. ${label}.`}>
      <svg className="image-canvas__art" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={colors.back} />
            <stop offset=".55" stopColor={colors.mid} />
            <stop offset="1" stopColor={colors.back} />
          </linearGradient>
          <pattern id={`${id}-weave`} width="42" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
            <path d="M0 7H42M0 28H42" stroke={colors.line} strokeOpacity=".15" strokeWidth="1" />
            <path d="M8 0V42M29 0V42" stroke={colors.light} strokeOpacity=".11" strokeWidth="1" />
            <path d="M21 7l7 7-7 7-7-7z" fill="none" stroke={colors.line} strokeOpacity=".26" strokeWidth=".8" />
          </pattern>
          <pattern id={`${id}-fine`} width="23" height="23" patternUnits="userSpaceOnUse">
            <circle cx="11.5" cy="11.5" r="1.2" fill={colors.line} fillOpacity=".54" />
            <path d="M11.5 2C7 7 7 16 11.5 21c4.5-5 4.5-14 0-19z" fill="none" stroke={colors.line} strokeOpacity=".2" strokeWidth=".65" />
          </pattern>
          <clipPath id={`${id}-arch`}>
            <path d="M125 880V424a275 275 0 0 1 550 0v456z" />
          </clipPath>
        </defs>
        <rect width="800" height="1000" fill={`url(#${id}-wash)`} />
        <rect width="800" height="1000" fill={`url(#${id}-weave)`} opacity=".55" />
        <path d="M72 930V397a328 328 0 0 1 656 0v533" fill="none" stroke={colors.line} strokeOpacity=".56" strokeWidth="1.2" />
        <path d="M92 930V411a308 308 0 0 1 616 0v519" fill="none" stroke={colors.line} strokeOpacity=".28" strokeWidth=".7" />
        <g clipPath={`url(#${id}-arch)`}>
          <rect x="125" y="145" width="550" height="735" fill={colors.light} fillOpacity=".16" />
          <rect x="125" y="145" width="550" height="735" fill={`url(#${id}-fine)`} opacity=".72" />
          <path d="M145 760c130-105 190-335 335-415 65-36 120 15 190 85v450H145z" fill={colors.back} fillOpacity=".2" />
          <path d="M145 775c128-106 193-297 327-381 75-48 133 7 198 72" fill="none" stroke={colors.line} strokeOpacity=".34" strokeWidth="1" />
          <path d="M170 805c142-106 207-292 337-366 66-38 115 5 163 53" fill="none" stroke={colors.line} strokeOpacity=".22" strokeWidth="1" />
        </g>
        <path d="M125 880V424a275 275 0 0 1 550 0v456" fill="none" stroke={colors.line} strokeOpacity=".78" strokeWidth="1.4" />
        <circle cx="400" cy="400" r="3" fill={colors.line} fillOpacity=".8" />
        <path d="M388 400h24M400 388v24" stroke={colors.line} strokeOpacity=".7" strokeWidth=".7" />
      </svg>
      <span className="image-canvas__index" aria-hidden="true">{number}</span>
      <span className="image-canvas__label"><i /> {label}</span>
    </div>
  )
}
