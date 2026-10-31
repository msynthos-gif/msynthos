import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MessageSquare, 
  Search, 
  Palette, 
  CheckCircle2, 
  Rocket, 
  ArrowRight 
} from 'lucide-react'
import { WhatsappIcon, EmailIcon } from './SocialIcons'

gsap.registerPlugin(ScrollTrigger)

const PROCESS_STEPS = [
  {
    step: '01',
    label: 'Share Your Idea',
    icon: MessageSquare,
    accentColor: '#2563EB', // Vivid Royal Blue
    gradientBg: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
    pillBorder: 'rgba(37, 99, 235, 0.35)',
    pillShadow: '0 4px 18px rgba(37, 99, 235, 0.14)',
    numBg: '#DBEAFE',
    numColor: '#1D4ED8',
  },
  {
    step: '02',
    label: 'We Analyze & Plan',
    icon: Search,
    accentColor: '#9333EA', // Vivid Purple
    gradientBg: 'linear-gradient(135deg, #7E22CE 0%, #A855F7 100%)',
    pillBorder: 'rgba(147, 51, 234, 0.35)',
    pillShadow: '0 4px 18px rgba(147, 51, 234, 0.14)',
    numBg: '#F3E8FF',
    numColor: '#7E22CE',
  },
  {
    step: '03',
    label: 'Design & Development',
    icon: Palette,
    accentColor: '#EA580C', // Vivid Orange
    gradientBg: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
    pillBorder: 'rgba(234, 88, 12, 0.35)',
    pillShadow: '0 4px 18px rgba(234, 88, 12, 0.14)',
    numBg: '#FFEDD5',
    numColor: '#C2410C',
  },
  {
    step: '04',
    label: 'Review & Refine',
    icon: CheckCircle2,
    accentColor: '#059669', // Vivid Emerald Green
    gradientBg: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    pillBorder: 'rgba(5, 150, 105, 0.35)',
    pillShadow: '0 4px 18px rgba(5, 150, 105, 0.14)',
    numBg: '#D1FAE5',
    numColor: '#047857',
  },
  {
    step: '05',
    label: 'Launch & Support',
    icon: Rocket,
    accentColor: '#E11D48', // Vivid Electric Rose
    gradientBg: 'linear-gradient(135deg, #BE123C 0%, #F43F5E 100%)',
    pillBorder: 'rgba(225, 29, 72, 0.35)',
    pillShadow: '0 4px 18px rgba(225, 29, 72, 0.14)',
    numBg: '#FFE4E6',
    numColor: '#BE123C',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Scroll-triggered reveal animation for marquee and contact cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: marqueeRef.current || section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      })

      // Process marquee fade-in + slide-up (opacity 0 -> 1, y: 30 -> 0)
      if (marqueeRef.current) {
        tl.fromTo(
          marqueeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
      }

      // Contact cards fade-in + slide-up with slight stagger delay
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        tl.fromTo(
          cards,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out' },
          '-=0.4'
        )
      }

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-bg-alt/50 border-t border-border-light py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background depth & ambient glow (consistent with Hero section style) */}
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      
      {/* Slow drifting ambient glow orbs */}
      <div
        className="hero-orb hero-orb-1 pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[110px] opacity-[0.08]"
        style={{ background: '#2D4A7A', top: '8%', left: '10%' }}
      />
      <div
        className="hero-orb hero-orb-2 pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[130px] opacity-[0.07]"
        style={{ background: '#2D4A7A', bottom: '8%', right: '8%' }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-alt/20 to-bg-alt/60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3 block">
          GET IN TOUCH
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mb-5 leading-tight max-w-2xl">
          Let's Synthesize the Future.
        </h2>
        <p className="text-text-body font-light leading-relaxed mb-10 max-w-2xl text-base md:text-lg">
          Whether you need a custom website, autonomous AI agent workflows, 3D ad creative, or full digital marketing scale, we are ready to build it.
        </p>

        {/* Infinite Auto-scrolling Process Marquee Bar */}
        <div
          ref={marqueeRef}
          className="w-full max-w-4xl relative overflow-hidden py-3.5 sm:py-4 px-0 rounded-2xl sm:rounded-3xl border border-indigo-200/60 shadow-[0_12px_40px_rgba(45,74,122,0.1)] mb-10 select-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(238, 242, 255, 0.9) 0%, rgba(245, 238, 255, 0.9) 40%, rgba(255, 241, 235, 0.9) 75%, rgba(236, 253, 245, 0.9) 100%)',
          }}
        >
          {/* Subtle gradient edge masks for smooth fade in/out on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#EEF2FF] via-[#EEF2FF]/60 to-transparent z-10 pointer-events-none rounded-l-2xl sm:rounded-l-3xl" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#ECFDF5] via-[#ECFDF5]/60 to-transparent z-10 pointer-events-none rounded-r-2xl sm:rounded-r-3xl" />

          {/* Continuously scrolling marquee track */}
          <div className="animate-marquee-infinite flex items-center gap-3.5 sm:gap-4 pl-3">
            {[...PROCESS_STEPS, ...PROCESS_STEPS].map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`${item.step}-${idx}`}
                  className="flex items-center gap-3 px-4 py-2.5 sm:px-4.5 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] flex-shrink-0"
                  style={{
                    border: `1.5px solid ${item.pillBorder}`,
                    boxShadow: item.pillShadow,
                  }}
                >
                  {/* Saturated colorful icon badge with white icon */}
                  <div
                    className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      background: item.gradientBg,
                    }}
                  >
                    <Icon className="w-4 h-4 text-white drop-shadow-xs" />
                  </div>

                  {/* Step Number + High Contrast Bold Label */}
                  <div className="flex items-center gap-2">
                    <span
                      className="px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-black tracking-wide"
                      style={{
                        backgroundColor: item.numBg,
                        color: item.numColor,
                      }}
                    >
                      {item.step}
                    </span>
                    <span className="text-xs sm:text-sm font-display font-extrabold text-[#0E1A2E] tracking-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>

                  {/* Flow Arrow matching step color */}
                  <ArrowRight
                    className="w-3.5 h-3.5 ml-1 flex-shrink-0 opacity-70"
                    style={{ color: item.accentColor }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Direct Contact Cards Row */}
        <div
          ref={cardsRef}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center"
        >
          {/* Email Card */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=msynthos@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 glass-card rounded-2xl p-6 border border-border-light hover:border-accent-navy/50 transition-all duration-300 flex items-center gap-4 group text-left shadow-sm hover:shadow-2xl hover:shadow-accent-navy/15 hover:-translate-y-2 transform"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-border-light flex items-center justify-center group-hover:border-accent-navy/40 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <EmailIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-0.5">General Inquiries</p>
              <p className="text-text-primary font-medium group-hover:text-accent-navy transition-colors duration-200 text-sm sm:text-base">
                msynthos@gmail.com
              </p>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/923460541850"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 glass-card rounded-2xl p-6 border border-border-light hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-4 group text-left shadow-sm hover:shadow-2xl hover:shadow-[#25D366]/20 hover:-translate-y-2 transform"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-border-light flex items-center justify-center group-hover:border-[#25D366]/40 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <WhatsappIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-0.5">WhatsApp / Phone</p>
              <p className="text-text-primary font-medium group-hover:text-[#25D366] transition-colors duration-200 text-sm sm:text-base">
                03460541850
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
