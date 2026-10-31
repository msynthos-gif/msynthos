import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import logoImg from '../assets/logo.jpeg'
import { SERVICES } from '../data/services'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsOpen(false)
    setServicesDropdownOpen(false)
    
    const isHomePage = location.pathname === '/' || location.pathname === '/index.html'
    if (!isHomePage) {
      navigate('/')
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(targetId, { offset: -80, duration: 1.5 })
        } else {
          const element = document.querySelector(targetId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 150)
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(targetId, {
          offset: -80,
          duration: 1.5,
        })
      } else {
        const element = document.querySelector(targetId)
        if (element) {
          const offset = 80
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = element.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          const offsetPosition = elementPosition - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  const handleServiceSelect = (e, serviceId) => {
    e.preventDefault()
    setServicesDropdownOpen(false)
    setIsOpen(false)
    setMobileServicesOpen(false)

    const targetAnchor = `#${serviceId}`

    const triggerScrollAndHighlight = () => {
      const el = document.getElementById(serviceId) || document.querySelector('#services')
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -90, duration: 1.5 })
        } else {
          const offset = 90
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = el.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          const offsetPosition = elementPosition - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
      window.dispatchEvent(new CustomEvent('highlight-service', { detail: { id: serviceId } }))
    }

    const isHomePage = location.pathname === '/' || location.pathname === '/index.html'
    if (!isHomePage) {
      navigate('/')
      setTimeout(() => {
        triggerScrollAndHighlight()
      }, 200)
    } else {
      window.history.pushState(null, '', targetAnchor)
      triggerScrollAndHighlight()
    }
  }

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setServicesDropdownOpen(true)
  }

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 200)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-nav shadow-md ${
          scrolled ? 'py-3 sm:py-4' : 'py-3.5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                handleNavClick(e, '#home')
              } else {
                setIsOpen(false)
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-accent-navy/30 group-hover:border-accent-navy/80 transition-colors duration-300 bg-white flex items-center justify-center">
              <img
                src={logoImg}
                alt="Msynthos official digital agency logo"
                width="40"
                height="40"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-silver-muted transition-colors duration-300">
              Msynthos
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="relative text-sm font-medium text-silver-muted hover:text-white transition-colors duration-200 py-1 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-navy transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="relative text-sm font-medium text-silver-muted hover:text-white transition-colors duration-200 py-1 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-navy transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Services Dropdown Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
            >
              <button
                onClick={(e) => handleNavClick(e, '#services')}
                aria-label="Toggle services menu"
                aria-expanded={servicesDropdownOpen}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-silver-muted hover:text-white transition-colors duration-200 group"
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-white' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-navy transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Desktop Services Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-84 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#0E1A2E]/15 shadow-[0_20px_50px_rgba(14,26,46,0.25)] p-3.5 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-2 border-b border-[#0E1A2E]/10 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E1A2E]">Digital Agency Vectors</span>
                      <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#0E1A2E] text-white shadow-sm">7 Services</span>
                    </div>

                    <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto scrollbar-navy pr-1">
                      {SERVICES.map((service) => {
                        const IconComp = service.icon
                        return (
                          <a
                            key={service.id}
                            href={`#${service.id}`}
                            onClick={(e) => handleServiceSelect(e, service.id)}
                            className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#0E1A2E] transition-all duration-200 group/item border border-transparent shadow-none hover:shadow-md"
                          >
                            <div className="w-9 h-9 rounded-xl bg-[#0E1A2E] text-white flex items-center justify-center border border-[#0E1A2E] shadow-sm flex-shrink-0 group-hover/item:scale-105 transition-transform duration-200">
                              <IconComp className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#0E1A2E] group-hover/item:text-white transition-colors duration-200">
                                {service.title}
                              </p>
                              <p className="text-[10px] font-medium text-[#2D4A7A]/75 group-hover/item:text-white/80 transition-colors duration-200 line-clamp-1">
                                {service.tagline}
                              </p>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Courses Link */}
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                location.pathname === '/courses' ? 'text-white font-semibold' : 'text-silver-muted hover:text-white'
              }`}
            >
              Courses
              <span className={`absolute bottom-0 left-0 h-[2px] bg-accent-navy transition-all duration-300 ${
                location.pathname === '/courses' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative text-sm font-medium text-silver-muted hover:text-white transition-colors duration-200 py-1 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-navy transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Contact Button CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-accent-bright hover:bg-accent-navy transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,74,122,0.3)] group"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-silver-muted hover:text-white transition-colors p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0E1A2E]/98 z-40 md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-5 text-left max-w-sm mx-auto w-full">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="font-display font-semibold text-2xl text-silver-muted hover:text-white transition-colors border-b border-border-light/30 pb-3"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="font-display font-semibold text-2xl text-silver-muted hover:text-white transition-colors border-b border-border-light/30 pb-3"
              >
                About
              </a>

              {/* Mobile Services Expandable Menu */}
              <div className="border-b border-border-light/30 pb-3">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between font-display font-semibold text-2xl text-silver-muted hover:text-white transition-colors text-left"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-accent-bright' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3 pl-2 flex flex-col gap-1.5"
                    >
                      {SERVICES.map((serv) => {
                        const IconC = serv.icon
                        return (
                          <a
                            key={serv.id}
                            href={`#${serv.id}`}
                            onClick={(e) => handleServiceSelect(e, serv.id)}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-white text-[#0E1A2E] hover:bg-[#0E1A2E] hover:text-white transition-all shadow-sm group/mob"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#0E1A2E] text-white flex items-center justify-center flex-shrink-0 group-hover/mob:bg-white group-hover/mob:text-[#0E1A2E] transition-colors">
                              <IconC className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold transition-colors">{serv.title}</span>
                          </a>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/courses"
                onClick={() => setIsOpen(false)}
                className="font-display font-semibold text-2xl text-silver-muted hover:text-white transition-colors border-b border-border-light/30 pb-3"
              >
                Courses
              </Link>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="font-display font-semibold text-2xl text-silver-muted hover:text-white transition-colors border-b border-border-light/30 pb-3"
              >
                Contact
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-4 inline-flex items-center gap-1 justify-center px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-accent-bright hover:bg-accent-navy transition-all"
              >
                Start Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
