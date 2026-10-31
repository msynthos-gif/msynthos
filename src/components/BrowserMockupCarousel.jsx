import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import restaurantMockup from '../assets/hero_mockup_restaurant.webp'
import workshopMockup from '../assets/hero_mockup_workshop.webp'
import realestateMockup from '../assets/hero_mockup_realestate.webp'
import fitnessMockup from '../assets/hero_mockup_fitness.webp'

const MOCKUPS = [
  {
    id: 'restaurant',
    title: 'Restaurant Website',
    url: 'lumenbistro.com/menu',
    accentColor: '#FF6B4A',
    image: restaurantMockup,
    alt: 'Lumen Bistro Artisan Restaurant Website & Menu Booking UI'
  },
  {
    id: 'workshop',
    title: 'Automotive Workshop SaaS',
    url: 'garagesphere.io/dashboard',
    accentColor: '#00D2FF',
    image: workshopMockup,
    alt: 'GarageSphere Automobile Workshop SaaS Management Dashboard UI'
  },
  {
    id: 'realestate',
    title: 'Real Estate Platform',
    url: 'estatevilla.com/listings',
    accentColor: '#10B981',
    image: realestateMockup,
    alt: 'Estate Villa Luxury Real Estate & Property Listing Platform UI'
  },
  {
    id: 'fitness',
    title: 'Fitness & Athletic Platform',
    url: 'apexfitness.io/schedule',
    accentColor: '#84CC16',
    image: fitnessMockup,
    alt: 'Apex Fitness High-Energy Gym Booking & Training Web App UI'
  }
]

export default function BrowserMockupCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Preload all mockup images on mount so horizontal swipe is buttery-smooth without delay
  useEffect(() => {
    MOCKUPS.forEach((mockup) => {
      const img = new Image()
      img.src = mockup.image
    })
  }, [])

  // Auto-advance every 3 seconds, continuously looping through all 4 images forever
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCKUPS.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const currentMockup = MOCKUPS[activeIndex]

  return (
    <div className="w-full flex flex-col items-center relative select-none">
      {/* Browser Mockup Container */}
      <div className="relative w-full max-w-[480px] lg:max-w-[550px] h-[260px] sm:h-[295px] md:h-[325px] flex items-center justify-center">
        
        {/* Soft Ambient Glow Backdrop */}
        <motion.div
          animate={{
            backgroundColor: currentMockup.accentColor,
            opacity: 0.18,
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-2 rounded-3xl blur-[65px] pointer-events-none"
        />

        {/* Browser Window Frame */}
        <div className="relative z-10 w-full h-full bg-[#0E1A2E] rounded-2xl border border-border-light/90 shadow-[0_22px_60px_rgba(14,26,46,0.38)] overflow-hidden flex flex-col">
          
          {/* Top Browser Header Bar */}
          <div className="bg-[#0E1A2E] px-3.5 sm:px-4 py-2 border-b border-white/10 flex items-center justify-between gap-2 flex-shrink-0 z-30">
            {/* macOS Style Traffic Light Window Controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-2xs" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-2xs" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-2xs" />
            </div>

            {/* Browser URL Bar */}
            <div className="flex-1 max-w-[290px] bg-white/10 rounded-md px-2.5 py-0.5 text-[8px] sm:text-[9px] text-white/90 font-mono flex items-center justify-between border border-white/10 truncate">
              <div className="flex items-center gap-1 truncate">
                <span className="text-emerald-400 text-[8px]">🔒</span>
                <span className="truncate">{currentMockup.url}</span>
              </div>
              <span className="text-[7px] text-white/40 hidden sm:inline">https</span>
            </div>

            {/* Live Indicator Badge */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[7.5px] sm:text-[8px] font-semibold text-white/90 border border-white/10 flex-shrink-0">
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse" 
                style={{ backgroundColor: currentMockup.accentColor }} 
              />
              <span className="hidden sm:inline font-mono uppercase tracking-wider">LIVE PREVIEW</span>
            </div>
          </div>

          {/* Screenshot Content Stage with Continuous Horizontal Swipe Transition */}
          <div className="flex-1 relative w-full h-full overflow-hidden bg-[#0A111E]">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentMockup.id}
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '-100%' }}
                transition={{
                  x: { type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.8 }
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <img
                  src={currentMockup.image}
                  alt={currentMockup.alt}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
