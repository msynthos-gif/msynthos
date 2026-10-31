import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap } from 'lucide-react'
import { SERVICES } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const containerRef = useRef(null)
  const [highlightedId, setHighlightedId] = useState(null)

  useEffect(() => {
    const handleHighlight = (e) => {
      if (e.detail && e.detail.id) {
        setHighlightedId(e.detail.id)
        setTimeout(() => setHighlightedId(null), 3000)
      }
    }

    const checkHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && SERVICES.some(s => s.id === hash)) {
        setHighlightedId(hash)
        setTimeout(() => setHighlightedId(null), 3000)
      }
    }

    checkHash()
    window.addEventListener('highlight-service', handleHighlight)
    window.addEventListener('hashchange', checkHash)

    return () => {
      window.removeEventListener('highlight-service', handleHighlight)
      window.removeEventListener('hashchange', checkHash)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ctx = gsap.context(() => {
      // Cinematic alternating entrance animations per service panel
      const panels = gsap.utils.toArray('.service-panel')
      panels.forEach((panel) => {
        const isReverse = panel.classList.contains('panel-reverse')
        const imageCol = panel.querySelector('.service-image-col')
        const contentCol = panel.querySelector('.service-content-col')

        if (imageCol && contentCol) {
          const imgStartX = isReverse ? 60 : -60
          const contentStartX = isReverse ? -60 : 60

          gsap.fromTo(imageCol,
            { opacity: 0, x: imgStartX, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
                once: true,
              }
            }
          )

          gsap.fromTo(contentCol,
            { opacity: 0, x: contentStartX, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              delay: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
                once: true,
              }
            }
          )
        }
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-navy-dark border-t border-navy-border py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-navy/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 lg:mb-36">
          <span className="text-xs font-semibold uppercase tracking-widest text-silver-muted mb-3 inline-block">
            FULL-SERVICE DIGITAL AGENCY
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-silver-light mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-silver-muted font-light leading-relaxed text-base md:text-lg">
            We deliver full-spectrum digital solutions — from custom websites and scalable web applications to autonomous AI agents, graphic design, AI/3D advertising, and data-driven marketing campaigns.
          </p>
        </div>

        {/* Alternating Full-Width Service Panels */}
        <div className="flex flex-col gap-24 md:gap-36 lg:gap-44">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon
            const isHighlighted = highlightedId === service.id
            const isReverse = index % 2 !== 0

            return (
              <div
                key={service.id}
                id={service.id}
                className={`service-panel ${isReverse ? 'panel-reverse' : ''} flex flex-col ${
                  isReverse ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-8 md:gap-12 lg:gap-16 rounded-3xl p-2 sm:p-3 transition-all duration-500 ${
                  isHighlighted 
                    ? 'ring-4 ring-accent-navy shadow-[0_0_50px_rgba(45,74,122,0.4)] bg-navy-card/40' 
                    : ''
                }`}
              >
                {/* IMAGE SIDE */}
                <div className="service-image-col w-full md:w-1/2 flex-shrink-0">
                  <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-navy-border/60 bg-bg-card shadow-2xl group">
                    <img
                      src={service.bgImage}
                      alt={service.imageAlt || `${service.title} - Msynthos Digital Agency`}
                      loading="lazy"
                      width="960"
                      height="540"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                </div>

                {/* CONTENT SIDE */}
                <div className="service-content-col w-full md:w-1/2 flex flex-col justify-center text-left">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-accent-navy/20 border border-accent-navy/40 flex items-center justify-center text-white shadow-md mb-6">
                    <IconComponent className="w-6 h-6 text-silver-light" />
                  </div>

                  {/* Tagline & Title */}
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-navy mb-2 block">
                    {service.tagline}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-silver-light mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-silver-muted font-light leading-relaxed text-base sm:text-lg mb-8">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables */}
                  <div className="border-t border-navy-border/60 pt-6">
                    <span className="text-xs font-semibold tracking-widest uppercase text-silver-muted block mb-4">
                      Key Deliverables
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2.5 text-sm text-silver-light font-medium">
                          <Zap className="w-4 h-4 text-accent-navy flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
