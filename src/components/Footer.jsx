import { ArrowUp } from 'lucide-react'
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
    <footer className="relative w-full bg-navy-dark border-t border-navy-border py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          
          {/* Logo Brand / Motto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-sm">
            <a
              href="#home"
              onClick={handleScrollTop}
              className="flex items-center gap-3 group"
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
            </a>
            <p className="text-xs text-silver-muted font-sans font-bold leading-relaxed">
              "Building Digital Solutions for a Smarter World." — Full-service digital agency powering web systems, AI agents, creative media, and digital marketing.
            </p>
          </div>
          
          {/* Social Links & Scroll Top */}
          <div className="flex flex-col items-center md:items-end gap-6">
            
            {/* Social Buttons Row */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/1cGVRCnnVo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@msynthos1?_r=1&_t=ZS-97R8xJKHw0K"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on TikTok"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="TikTok"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923460541850"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Msynthos on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="WhatsApp"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/msyn.thos?igsh=aDQ5N2llb3lpNWVu"
                target="_blank"
                rel="noopener"
                aria-label="Visit Msynthos on Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Msynthos on YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=msynthos@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email to Msynthos"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-sm hover:scale-105"
                title="Email"
              >
                <EmailIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top */}
            <a
              href="#home"
              onClick={handleScrollTop}
              aria-label="Scroll back to top of page"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-silver-muted hover:text-white uppercase transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom Metadata */}
        <div className="border-t border-navy-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-silver-muted font-bold tracking-wider">
          <p>© {new Date().getFullYear()} MSYNTHOS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="text-silver-light/80 font-bold">• ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
