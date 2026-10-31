import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Database, Bot, Box, Sparkles, TrendingUp, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    icon: Shield,
    title: "Aegis Visualizer",
    category: "Corporate Platform",
    desc: "A high-throughput security dashboard and interactive monitoring interface built for modern enterprise infrastructure.",
    status: "COMING SOON",
    tech: ["React.js", "WebSockets", "D3.js"]
  },
  {
    icon: Bot,
    title: "OmniAgent Core",
    category: "AI Agent System",
    desc: "An autonomous multi-agent workflow system providing real-time data retrieval, automated CRM actions, and customer support.",
    status: "IN DEVELOPMENT",
    tech: ["Python", "LangChain", "FastAPI"]
  },
  {
    icon: Box,
    title: "Hyperion 3D Studio",
    category: "3D Motion Commercial",
    desc: "A cinematic 3D product render and photorealistic motion ad campaign crafted for a next-gen electronics brand release.",
    status: "COMING SOON",
    tech: ["Blender 3D", "After Effects", "CGI"]
  },
  {
    icon: Sparkles,
    title: "Vesper Ad Engine",
    category: "AI Ad & Content",
    desc: "Generative AI video commercial generator producing localized ad copy, synthetic avatars, and omnichannel video ad variations.",
    status: "IN DEVELOPMENT",
    tech: ["GenAI", "FFmpeg", "Node.js"]
  },
  {
    icon: TrendingUp,
    title: "Krypton Scale Pipeline",
    category: "Digital Marketing",
    desc: "A data-driven digital marketing analytics dashboard tracking omnichannel ad performance and multi-touch ROI attribution.",
    status: "COMING SOON",
    tech: ["React.js", "Tailwind", "Analytics API"]
  }
]

export default function Portfolio() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let ctx = gsap.context(() => {
      // Pin horizontal scroll section on desktop for cinematic look
      let mm = gsap.matchMedia()
      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray('.project-panel')
        
        gsap.to(panels, {
          x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainer,
            pin: true,
            scrub: 1,
            start: "top top+=80",
            end: () => `+=${scrollContainer.scrollWidth - window.innerWidth + 300}`,
            invalidateOnRefresh: true,
          }
        })
      // Refresh ScrollTrigger after Portfolio setup
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }, scrollRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={scrollRef}
      className="relative w-full bg-bg-dark border-t border-white/5 py-22 md:py-26 lg:py-30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 inline-block font-sans">PORTFOLIO & PIPELINE</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
              Project Pipeline
            </h2>
            <p className="text-gray-400 font-light max-w-xl text-base">
              A preview of custom web platforms, autonomous AI agents, 3D commercial media, and digital growth engines currently in development.
            </p>
          </div>
          {/* Scroll instruction for desktop */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-semibold text-gray-500 tracking-wider uppercase">
            <span>Scroll to view</span>
            <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Projects Container (Horizontal scroll on desktop, vertical stacked grid on mobile/tablet) */}
      <div className="flex flex-col lg:flex-row lg:flex-nowrap gap-8 lg:gap-12 px-6 md:px-12 max-w-7xl mx-auto lg:max-w-none lg:w-max lg:h-[450px] lg:items-center overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 scroll-smooth">
        {PROJECTS.map((project, index) => {
          const IconComponent = project.icon
          return (
            <div
              key={index}
              className="project-panel w-full md:w-[360px] lg:w-[390px] xl:w-[410px] h-[350px] md:h-[370px] flex-shrink-0 glass-card rounded-2xl p-8 flex flex-col justify-between border border-white/5 relative group select-none hover:border-accent/20 transition-all duration-300"
            >
              {/* Coming soon banner */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-[9px] font-bold uppercase tracking-widest text-accent">
                {project.status}
              </div>

              {/* Icon & Category */}
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed mt-4 line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Technology Tags */}
              <div className="border-t border-white/5 pt-6 flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-gray-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
