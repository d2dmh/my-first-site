import { useCallback, useEffect, useRef } from 'react'
import './BorderGlow.css'

function parseHSL(hslString) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const variables = {}

  for (let index = 0; index < opacities.length; index += 1) {
    variables[`--glow-color${keys[index]}`] =
      `hsl(${base} / ${Math.min(opacities[index] * intensity, 100)}%)`
  }
  return variables
}

const gradientPositions = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const gradientKeys = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
]
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const variables = {}
  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    variables[gradientKeys[index]] =
      `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`
  }
  variables['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return variables
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

function easeInCubic(value) {
  return value * value * value
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}) {
  const startTime = performance.now() + delay

  function tick() {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    onUpdate(start + (end - start) * ease(progress))
    if (progress < 1) requestAnimationFrame(tick)
    else if (onEnd) onEnd()
  }

  setTimeout(() => requestAnimationFrame(tick), delay)
}

export default function BorderGlow({
  children,
  className = '',
  style = {},
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) {
  const cardRef = useRef(null)

  const getCenterOfElement = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element)
      const deltaX = x - centerX
      const deltaY = y - centerY
      let scaleX = Infinity
      let scaleY = Infinity
      if (deltaX !== 0) scaleX = centerX / Math.abs(deltaX)
      if (deltaY !== 0) scaleY = centerY / Math.abs(deltaY)
      return Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1)
    },
    [getCenterOfElement],
  )

  const getCursorAngle = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element)
      const deltaX = x - centerX
      const deltaY = y - centerY
      if (deltaX === 0 && deltaY === 0) return 0
      const radians = Math.atan2(deltaY, deltaX)
      let degrees = radians * (180 / Math.PI) + 90
      if (degrees < 0) degrees += 360
      return degrees
    },
    [getCenterOfElement],
  )

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current
      if (!card) return

      const rectangle = card.getBoundingClientRect()
      const x = event.clientX - rectangle.left
      const y = event.clientY - rectangle.top
      const edge = getEdgeProximity(card, x, y)
      const angle = getCursorAngle(card, x, y)

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
    },
    [getCursorAngle, getEdgeProximity],
  )

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined

    const card = cardRef.current
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('sweep-active')
    card.style.setProperty('--cursor-angle', `${angleStart}deg`)

    animateValue({
      duration: 500,
      onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
    })
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (value) => {
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`,
        )
      },
    })
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (value) => {
        card.style.setProperty(
          '--cursor-angle',
          `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`,
        )
      },
    })
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
      onEnd: () => card.classList.remove('sweep-active'),
    })

    return undefined
  }, [animated])

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        ...style,
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
