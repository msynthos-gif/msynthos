import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Connect Lenis scroll events to ScrollTrigger update
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Connect GSAP ticker to Lenis requestAnimationFrame (raf)
    const updatePhysics = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(updatePhysics)
    gsap.ticker.lagSmoothing(0)

    // Store lenis globally for external control
    window.lenis = lenis

    const refreshScroll = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }

    // 1. Immediate refresh check if document is already complete (prerendered / cached)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      refreshScroll()
    }

    // 2. Window load listener
    const handleLoad = () => {
      refreshScroll()
    }
    window.addEventListener('load', handleLoad)

    // 3. Pageshow listener for Chrome prerender / BFCache activation on search result click
    const handlePageshow = (e) => {
      refreshScroll()
    }
    window.addEventListener('pageshow', handlePageshow)

    // 4. Tab visibility change (prerender activation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshScroll()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 5. Fonts ready promise
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        refreshScroll()
      }).catch(() => {})
    }

    // 6. Staggered timers fallback
    const timer1 = setTimeout(refreshScroll, 150)
    const timer2 = setTimeout(refreshScroll, 600)
    const timer3 = setTimeout(refreshScroll, 1200)

    const handleResize = () => {
      refreshScroll()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('pageshow', handlePageshow)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(updatePhysics)
      lenis.destroy()
      window.lenis = null
    }
  }, [])
}
