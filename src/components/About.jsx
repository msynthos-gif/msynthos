import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoImg from '../assets/logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    number: "01",
    title: "The Genesis",
    subtitle: "Solutions Worth Building",
    content: "Msynthos was forged under a singular, uncompromising directive: building digital solutions for a smarter world. We operate as a full-service digital agency, seamlessly merging software engineering, artificial intelligence, and visual storytelling."
  },
  {
    number: "02",
    title: "Digital Infrastructure & AI",
    subtitle: "Web Systems & Autonomous Agents",
    content: "We engineer high-converting corporate websites, custom full-stack web applications, and domain-tuned AI agents. Our systems automate operations, deliver sub-millisecond interactivity, and scale effortlessly."
  },
  {
    number: "03",
    title: "Creative Media & Scale",
    subtitle: "Design, 3D Commercials & Marketing",
    content: "We transform brand vision into market dominance. Our team crafts bespoke visual identities, photorealistic 3D ad motion design, AI video commercials, and data-driven digital marketing campaigns optimized for maximum reach."
  }
]

export default function About() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ctx = gsap.context(() => {
      // ScrollTrigger fade-in animations for all chapter blocks
      const chapterBlocks = gsap.utils.toArray('.chapter-block')
      chapterBlocks.forEach((block) => {
        gsap.fromTo(block, 
          { opacity: 0.4, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        )
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-bg-light border-t border-border-light py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle background scanner grid */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-navy/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* 1. TOP: Centered Circular Logo Badge (250-280px max width) */}
        <div className="mb-12 md:mb-16 flex items-center justify-center">
          <motion.div
            className="relative w-[250px] h-[250px] sm:w-[270px] sm:h-[270px] md:w-[280px] md:h-[280px] flex items-center justify-center flex-shrink-0"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer soft glowing halo backdrop */}
            <div className="absolute w-[75%] h-[75%] rounded-full bg-accent-navy/10 blur-[35px] z-0 animate-pulse pointer-events-none inset-0 m-auto" />
            
            {/* Main Logo Image (Centered & Static) */}
            <img
              src={logoImg}
              alt="Msynthos official brand logo representing web engineering, AI agents, and creative agency services"
              loading="lazy"
              width="300"
              height="300"
              className="absolute w-[58%] h-[58%] aspect-square object-cover rounded-2xl md:rounded-3xl border-2 border-accent-navy/40 shadow-[0_15px_35px_rgba(14,26,46,0.12)] hover:shadow-[0_20px_45px_rgba(45,74,122,0.25)] transition-shadow duration-500 z-20 inset-0 m-auto"
            />

            {/* Rotating Circular Text Ring - Continuous Infinite Rotation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center animate-spin-slow z-30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <path
                    id="textCirclePath"
                    d="M 150, 15 a 135,135 0 1,1 0,270 a 135,135 0 1,1 0,-270"
                  />
                </defs>
                <text className="fill-[#0E1A2E] text-[10px] font-sans font-bold uppercase tracking-[0.17em]">
                  <textPath href="#textCirclePath" startOffset="0%" textLength="848" lengthAdjust="spacing">
                    Building Digital Solutions for a Smarter World • Building Digital Solutions for a Smarter World •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* 2. Intro Section ("WHO WE ARE") */}
        <div className="chapter-block text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-navy block mb-3">
            WHO WE ARE
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.2vw,3.2rem)] text-accent-bright mb-6 leading-tight">
            A full-service digital agency powering global brands.
          </h2>
          <p className="text-accent-navy font-normal text-base md:text-lg leading-relaxed">
            Msynthos bridges the gap between complex software systems, artificial intelligence, and creative growth strategy. We engineer digital products, AI agents, and visual media designed to move humanity forward.
          </p>
        </div>

        {/* 3. Stacked Core Chapters (01, 02, 03) */}
        <div className="w-full flex flex-col gap-10 md:gap-14">
          {CHAPTERS.map((chapter) => (
            <div
              key={chapter.number}
              className="chapter-block flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-t border-border-light pt-8 sm:pt-10"
            >
              <div className="flex items-center gap-4 sm:block flex-shrink-0">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-accent-bright tracking-wider">
                  {chapter.number}
                </span>
              </div>
              <div className="flex-1">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-accent-navy uppercase block mb-1">
                  {chapter.subtitle}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-accent-bright mb-3">
                  {chapter.title}
                </h3>
                <p className="text-accent-navy font-normal text-base md:text-lg leading-relaxed">
                  {chapter.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
