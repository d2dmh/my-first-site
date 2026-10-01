import { useEffect, useState } from 'react'

const HOVER_TARGETS = 'a, button, [data-hover-glow]'

/**
 * Page-level effects for the Dark Luxe style, extracted from the original App.jsx:
 * - reveal-on-scroll: adds `is-visible` to `.reveal` elements once they enter view
 * - cursor glow: writes --pointer-x / --pointer-y on <html> for `.cursor-glow`
 * - hover state: toggles `body.is-hovering` over links, buttons and [data-hover-glow]
 * - active section: returns the index of the section crossing the 42% reading line
 *
 * sectionIds must be listed in the same order the sections appear in the DOM,
 * otherwise the sidebar highlight jumps around.
 */
export default function usePageEffects(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(0)
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split('|') : []

    const onScroll = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.42
      let next = 0
      ids.forEach((id, index) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= readingLine) next = index
      })
      setActiveSection(next)
    }

    const onPointerMove = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }

    const onPointerOver = (event) => {
      if (event.target.closest?.(HOVER_TARGETS)) document.body.classList.add('is-hovering')
    }

    const onPointerOut = (event) => {
      if (
        event.target.closest?.(HOVER_TARGETS) &&
        !event.relatedTarget?.closest?.(HOVER_TARGETS)
      ) {
        document.body.classList.remove('is-hovering')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    document.addEventListener('mouseover', onPointerOver)
    document.addEventListener('mouseout', onPointerOut)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onPointerMove)
      document.removeEventListener('mouseover', onPointerOver)
      document.removeEventListener('mouseout', onPointerOut)
      observer.disconnect()
    }
  }, [sectionKey])

  const scrollToSection = (index) => {
    document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { activeSection, scrollToSection }
}
