import { useLayoutEffect } from 'react'

const revealSelector = [
  '.header', '.section-head > *',
  '.product', '.golden > *', '.service-card',
  '.history h2', '.history p', '.founder', '.app-art', '.app-copy > *',
  '.benefits-list article', '.benefits-image', '.contact-copy > *',
  '.contact form > *', '.faq h2', '.faq details', '.footer-columns > *',
  '.footer-brand', '.footer-bottom',
  '.breadcrumb', '.page-lead > *', '.inner-visual', '.inner-founder',
  '.split-intro > *', '.section-heading > *', '.step-list > li',
  '.solution-bridge > *', '.closing-cta > *', '.catalog-mark',
  '.manifesto > *', '.editorial-links > a', '.history-feature',
  '.timeline article', '.publication-panel > *', '.golden-coin',
  '.golden-destination > *', '.contact-info > *', '.access-help > *',
  '.brand-gallery figure', '.about-building',
  '.legal-layout aside', '.legal-sections > section', '.legal-related',
].join(', ')

/** Animation only: no wrappers, text splitting, layout changes or dependencies. */
export function useSiteMotion(routeKey = '/') {
  useLayoutEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let stop = () => {}
    const start = () => {
      stop()
      if (preference.matches || !('IntersectionObserver' in window)) return
      const root = document.documentElement
      const animations = new Set<Animation>()
      const elements = new Set<HTMLElement>()
      let frame = 0
      let pendingPointer: PointerEvent | null = null
      let activeSurface: HTMLElement | null = null
      root.dataset.motion = 'on'

      const reveal = (element: HTMLElement, immediate = false) => {
        if (element.dataset.reveal !== 'pending') return
        element.dataset.reveal = 'running'
        const delay = immediate ? 0 : Number(element.dataset.motionDelay || 0)
        const isArt = element.matches('.product, .founder, .app-art, .benefits-image, .golden > img, .service-card, .inner-visual, .golden-coin')
        const offset = element.matches('.header') ? -14 : isArt ? 40 : 26
        const animation = element.animate([
          { opacity: 0, filter: `blur(${isArt ? 14 : 9}px)`, transform: `translate3d(0, ${offset}px, 0) scale(${isArt ? .965 : 1})` },
          { opacity: 1, filter: 'blur(0px)', transform: 'translate3d(0, 0, 0) scale(1)' },
        ], { duration: immediate ? 250 : isArt ? 1250 : 950, delay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' })
        animations.add(animation)
        animation.onfinish = () => {
          element.dataset.reveal = 'complete'
          animations.delete(animation)
          animation.cancel()
        }
      }
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement
          if (element.matches('.app-art, .golden, .golden-coin')) element.dataset.inView = String(entry.isIntersecting)
          if (entry.isIntersecting) reveal(element)
        }
      }, { threshold: .08, rootMargin: '0px 0px -24px 0px' })
      const register = () => {
        for (const element of elements) {
          if (!element.isConnected) { observer.unobserve(element); elements.delete(element) }
        }
        document.querySelectorAll<HTMLElement>(revealSelector).forEach(element => {
          if (elements.has(element)) return
          elements.add(element)
          const siblings = element.parentElement ? [...element.parentElement.children].filter(child => child.matches(revealSelector)) : []
          const stagger = Math.min(Math.max(siblings.indexOf(element), 0) * 105, 420)
          element.dataset.motionDelay = String(stagger)
          element.dataset.reveal = 'pending'
          observer.observe(element)
        })
        document.querySelectorAll('.golden').forEach(element => observer.observe(element))
      }
      register()
      const changes = new MutationObserver(register)
      const cards = document.querySelector('.service-cards')
      if (cards) changes.observe(cards, { childList: true })
      const focus = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return
        const element = event.target.closest<HTMLElement>('[data-reveal="pending"]')
        if (element) reveal(element, true)
      }
      const resetSurface = () => {
        if (!activeSurface) return
        activeSurface.style.removeProperty('--tilt-x')
        activeSurface.style.removeProperty('--tilt-y')
        activeSurface.dataset.pointer = 'off'
        activeSurface = null
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
        pendingPointer = event
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          if (!pendingPointer || !(pendingPointer.target instanceof Element)) return
          const surface = pendingPointer.target.closest<HTMLElement>('.service-card, .golden')
          if (surface !== activeSurface) resetSurface()
          if (!surface) return
          activeSurface = surface
          const bounds = surface.getBoundingClientRect()
          const x = Math.max(0, Math.min(1, (pendingPointer.clientX - bounds.left) / bounds.width))
          const y = Math.max(0, Math.min(1, (pendingPointer.clientY - bounds.top) / bounds.height))
          surface.style.setProperty('--light-x', `${x * 100}%`)
          surface.style.setProperty('--light-y', `${y * 100}%`)
          surface.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`)
          surface.style.setProperty('--tilt-y', `${(x - .5) * 9}deg`)
          surface.dataset.pointer = 'on'
        })
      }
      document.addEventListener('focusin', focus)
      document.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('pointerleave', resetSurface)
      stop = () => {
        observer.disconnect()
        changes.disconnect()
        cancelAnimationFrame(frame)
        animations.forEach(animation => animation.cancel())
        resetSurface()
        document.removeEventListener('focusin', focus)
        document.removeEventListener('pointermove', move)
        document.removeEventListener('pointerleave', resetSurface)
        delete root.dataset.motion
        for (const element of elements) {
          delete element.dataset.reveal
          delete element.dataset.motionDelay
          delete element.dataset.inView
        }
        document.querySelectorAll('[data-in-view]').forEach(element => element.removeAttribute('data-in-view'))
      }
    }
    start()
    preference.addEventListener('change', start)
    return () => { stop(); preference.removeEventListener('change', start) }
  }, [routeKey])
}
