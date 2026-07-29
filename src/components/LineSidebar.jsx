import { useCallback, useEffect, useRef, useState } from 'react'
import './LineSidebar.css'

const FALLOFF_CURVES = {
  linear: (progress) => progress,
  smooth: (progress) => progress * progress * (3 - 2 * progress),
  sharp: (progress) => progress * progress * progress,
}

function LineSidebar({
  items,
  accentColor = '#a855f7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  activeIndex: controlledActiveIndex,
  onItemClick,
  className = '',
}) {
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const targetsRef = useRef([])
  const currentRef = useRef([])
  const rafRef = useRef(null)
  const lastRef = useRef(0)
  const smoothingRef = useRef(smoothing)
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActive)
  const activeIndex = controlledActiveIndex ?? internalActiveIndex
  const activeRef = useRef(activeIndex)

  activeRef.current = activeIndex
  smoothingRef.current = smoothing

  const runFrame = useCallback((now) => {
    const delta = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now
    const easing = 1 - Math.exp(-delta / (Math.max(smoothingRef.current, 1) / 1000))
    let moving = false

    itemRefs.current.forEach((element, index) => {
      if (!element) return
      const target = Math.max(targetsRef.current[index] || 0, activeRef.current === index ? 1 : 0)
      const current = currentRef.current[index] || 0
      const next = current + (target - current) * easing
      const settled = Math.abs(target - next) < 0.0015
      const value = settled ? target : next
      currentRef.current[index] = value
      element.style.setProperty('--effect', value.toFixed(4))
      if (!settled) moving = true
    })

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null
  }, [])

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const handlePointerMove = useCallback(
    (event) => {
      if (!listRef.current) return
      const rect = listRef.current.getBoundingClientRect()
      const pointerY = event.clientY - rect.top
      const easing = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear

      itemRefs.current.forEach((element, index) => {
        if (!element) return
        const center = element.offsetTop + element.offsetHeight / 2
        const distance = Math.abs(pointerY - center)
        targetsRef.current[index] = easing(Math.max(0, 1 - distance / proximityRadius))
      })
      startLoop()
    },
    [falloff, proximityRadius, startLoop],
  )

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0)
    startLoop()
  }, [startLoop])

  const handleClick = useCallback(
    (index, label) => {
      if (controlledActiveIndex === undefined) setInternalActiveIndex(index)
      onItemClick?.(index, label)
    },
    [controlledActiveIndex, onItemClick],
  )

  useEffect(() => {
    startLoop()
  }, [activeIndex, startLoop])

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  return (
    <nav
      aria-label="页面章节导航"
      className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': `${markerLength}px`,
        '--marker-gap': `${markerGap}px`,
        '--tick-scale': tickScale,
        '--max-shift': `${maxShift}px`,
        '--item-gap': `${itemGap}px`,
        '--font-size': `${fontSize}rem`,
      }}
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
          >
            <button type="button" onClick={() => handleClick(index, label)}>
              {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
              <span className="line-sidebar__label">
                {showIndex && (
                  <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>
                )}
                <span className="line-sidebar__text">{label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LineSidebar
