import React, { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import BrowserMockupCarousel from './BrowserMockupCarousel'
import { WhatsappIcon } from './SocialIcons'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  // Mouse-follow glow spring values
  const glowOffsetX = useMotionValue(0)
  const glowOffsetY = useMotionValue(0)
  const springGlowX = useSpring(glowOffsetX, { stiffness: 20, damping: 18, mass: 1.5 })
  const springGlowY = useSpring(glowOffsetY, { stiffness: 20, damping: 18, mass: 1.5 })

  // Exit parallax animation on scroll
  useEffect(() => {
    const content = contentRef.current
    const container = containerRef.current

    if (content && container) {
      let st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (content) {
            gsap.set(content, { y: self.progress * 60 })
          }
        }
      })

      // Refresh ScrollTrigger after Hero mounts
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => {
        st.kill()
      }
    }
  }, [])

  // Mouse handlers for interactive glow
  const handleHeroMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const mouseRelX = e.clientX - rect.left
    const mouseRelY = e.clientY - rect.top
    glowOffsetX.set((mouseRelX - centerX) * 0.5)
    glowOffsetY.set((mouseRelY - centerY) * 0.5)
  }

  const handleHeroMouseLeave = () => {
    glowOffsetX.set(0)
    glowOffsetY.set(0)
  }

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault()
    if (window.lenis) {
      window.lenis.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
      })
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden bg-bg-dark grid-bg select-none pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      {/* Interactive ambient glow: CSS drift wrapper + spring mouse offset */}
      <div
        className="hero-orb hero-orb-1 pointer-events-none absolute"
        style={{ top: 'calc(50% - 320px)', left: 'calc(50% - 320px)' }}
      >
        <motion.div
          style={{ x: springGlowX, y: springGlowY }}
          className="w-[640px] h-[640px] rounded-full blur-[70px] opacity-85"
          data-testid="hero-glow"
        >
          <div className="w-full h-full rounded-full bg-[#2D4A7A]/35" />
        </motion.div>
      </div>

      {/* Slow drifting ambient glow orbs */}
      <div className="hero-orb hero-orb-1 pointer-events-none absolute w-[420px] h-[420px] rounded-full blur-[110px] opacity-[0.07]" style={{ background: '#2D4A7A', top: '8%', left: '10%' }} />
      <div className="hero-orb hero-orb-2 pointer-events-none absolute w-[380px] h-[380px] rounded-full blur-[130px] opacity-[0.06]" style={{ background: '#2D4A7A', bottom: '10%', right: '8%' }} />

      {/* Faint grid texture overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      
      {/* Gradient overlay for aesthetic structure */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40 pointer-events-none" />

      {/* Hero Content: 2-Column Split Layout */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto"
      >
        {/* LEFT COLUMN: Eyebrow + Headline + Description + CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-border-light shadow-2xs backdrop-blur-md mb-4 sm:mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-accent-navy animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0E1A2E]">
              FULL-SERVICE DIGITAL AGENCY
            </span>
          </motion.div>

          {/* Large Bold Multi-line Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-display font-black tracking-tight text-[#0E1A2E] leading-[1.08] mb-4 sm:mb-5"
          >
            Building Digital Solutions <br className="hidden sm:inline" />
            <span className="text-gradient-accent">for a Smarter World.</span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base lg:text-lg text-text-body font-sans font-normal leading-relaxed max-w-xl mb-6 sm:mb-8"
          >
            Architecting custom websites, web applications, autonomous AI agents, 3D commercial ads, graphic design, and growth marketing strategies.
          </motion.p>

          {/* CTAs Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA: WhatsApp */}
            <a
              href="https://wa.me/923460541850"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0E1A2E] hover:bg-[#1A3A6B] text-white font-display font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group w-full sm:w-auto"
            >
              <WhatsappIcon className="w-5 h-5 flex-shrink-0" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA: Explore Services */}
            <a
              href="#services"
              onClick={(e) => handleScrollToSection(e, '#services')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/90 hover:bg-white text-[#0E1A2E] font-display font-bold text-sm sm:text-base border border-border-light hover:border-accent-navy/40 shadow-2xs hover:shadow-md transition-all duration-300 w-full sm:w-auto"
            >
              <span>Explore Services</span>
            </a>
          </motion.div>

          {/* Trust / Capability Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-7 border-t border-border-light/60 mt-6 sm:mt-7 text-xs font-semibold text-text-muted"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-navy" />
              <span>Modern Tech Stacks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>100% Scalable</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Stacked Browser Mockup Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex justify-center w-full"
        >
          <BrowserMockupCarousel />
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center mt-6 sm:mt-4 mb-2 flex-shrink-0"
      >
        <a
          href="#about"
          onClick={(e) => handleScrollToSection(e, '#about')}
          aria-label="Scroll down to About section"
          className="flex flex-col items-center text-[9px] sm:text-[10px] font-semibold text-text-muted hover:text-accent-navy tracking-widest uppercase gap-1 group transition-colors duration-300"
        >
          <span>Scroll Down</span>
          <div className="w-6 h-6 rounded-full border border-border-light flex items-center justify-center group-hover:border-accent-navy/40 group-hover:bg-accent-navy/5 transition-all duration-300">
            <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-navy group-hover:translate-y-0.5 transition-all duration-300 animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
