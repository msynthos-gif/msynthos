import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Calculator, Sparkles, Shield, Mail } from 'lucide-react'
import logoImg from '../assets/logo.jpeg'
import {
  FacebookIcon,
  TiktokIcon,
  WhatsappIcon,
  InstagramIcon,
  YoutubeIcon,
  EmailIcon
} from './SocialIcons'

export default function Footer() {
  const handleScrollTop = (e) => {
    e.preventDefault()
    if (window.lenis) {
      window.lenis.scrollTo('#home', { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative w-full bg-navy-dark border-t border-navy-border py-12 md:py-16 overflow-hidden text-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          
          {/* Column 1: Logo Brand / Motto */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 group w-fit"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-navy-border group-hover:border-silver-light/40 transition-colors bg-white flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Msynthos full-service digital agency logo"
                  loading="lazy"
                  width="32"
                  height="32"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-silver-light transition-colors">
                Msynthos
              </span>
            </Link>
            <p className="text-xs text-silver-muted font-sans leading-relaxed">
              "Building Digital Solutions for a Smarter World." — Full-service digital agency powering high-performance web systems, AI agents, creative media, and digital marketing.
            </p>
            <div className="flex items-center gap-2 text-xs text-silver-muted mt-1">
              <Mail className="w-3.5 h-3.5 text-accent-bright" />
              <a href="mailto:msynthos@gmail.com" className="hover:text-white transition-colors">
                msynthos@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: Products & Tools */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5 text-accent-bright" />
              <span>Products & Tools</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-silver-muted">
              <li>
                <Link
                  to="/de/minijob-rechner"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform text-silver-light font-medium">German Minijob Rechner 2026</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 border border-accent/30 text-white font-bold">603 €</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  AI Business Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors block"
                >
                  Msynthos Skills Academy
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  Custom Web Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-bright" />
              <span>Navigation</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-silver-muted">
              <li>
                <Link to="/" className="hover:text-white transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors block">
                  About Agency
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors block">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors block">
                  Courses & Training
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors block">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links & Back to top */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.facebook.com/share/1cGVRCnnVo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on Facebook"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.tiktok.com/@msynthos1?_r=1&_t=ZS-97R8xJKHw0K"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on TikTok"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="TikTok"
              >
                <TiktokIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/923460541850"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Msynthos on WhatsApp"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="WhatsApp"
              >
                <WhatsappIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/msyn.thos?igsh=aDQ5N2llb3lpNWVu"
                target="_blank"
                rel="noopener"
                aria-label="Visit Msynthos on Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:msynthos@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email to Msynthos"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all shadow-sm hover:scale-105"
                title="Email"
              >
                <EmailIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Back to top */}
            <div className="pt-2">
              <a
                href="#home"
                onClick={handleScrollTop}
                aria-label="Scroll back to top of page"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-silver-muted hover:text-white uppercase transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Legal Links Row */}
        <div className="border-t border-navy-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-silver-muted font-medium">
          
          {/* Copyright */}
          <div>
            <p>© {new Date().getFullYear()} MSYNTHOS. ALL RIGHTS RESERVED.</p>
          </div>

          {/* Legal Links (Google AdSense & GDPR Compliance) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-silver-muted">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20 select-none">•</span>
            <Link
              to="/terms"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-white/20 select-none">•</span>
            <Link
              to="/impressum"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Impressum / Legal Notice
            </Link>
          </div>

          {/* Operational Status */}
          <div className="text-[10px] font-bold tracking-wider text-silver-light/80">
            <span>• ALL SYSTEMS OPERATIONAL</span>
          </div>

        </div>

      </div>
    </footer>
  )
}
