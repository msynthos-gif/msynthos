import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, 
  Monitor, 
  Bot, 
  Sparkles, 
  Layers, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  ArrowUpRight,
  Database,
  CheckCircle2
} from 'lucide-react'

const SCENES = [
  {
    id: 'mobile',
    label: 'MOBILE EXPERIENCES',
    subtitle: 'High-Performance Mobile Systems',
    icon: Smartphone,
    color: '#2D4A7A',
  },
  {
    id: 'website',
    label: 'WEB DEVELOPMENT',
    subtitle: 'Modern Ultra-Fast Corporate Websites',
    icon: Monitor,
    color: '#1A3A6B',
  },
  {
    id: 'ai',
    label: 'AI AGENTS',
    subtitle: 'Autonomous Logic & Multi-Agent Systems',
    icon: Bot,
    color: '#2D4A7A',
  },
  {
    id: 'commercial',
    label: '3D COMMERCIALS',
    subtitle: 'Photorealistic 3D Motion & CGI Ads',
    icon: Sparkles,
    color: '#1A3A6B',
  },
  {
    id: 'webapp',
    label: 'WEB APPLICATIONS',
    subtitle: 'Scalable Full-Stack SaaS Platforms',
    icon: Layers,
    color: '#2D4A7A',
  },
]

// ==========================================
// SCENE 1: Mobile App Mockup (3D Phone)
// ==========================================
function MobileAppScene({ isReducedMotion }) {
  return (
    <motion.div
      key="mobile-scene"
      initial={{ opacity: 0, rotateY: 25, scale: 0.9, z: -40 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
      exit={{ opacity: 0, rotateY: -25, scale: 0.9, z: -40 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
    >
      <motion.div
        animate={isReducedMotion ? {} : {
          y: [0, -5, 0],
          rotateY: [-4, 4, -4],
          rotateX: [3, -2, 3],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[155px] sm:w-[145px] md:w-[155px] h-[220px] sm:h-[195px] md:h-[208px] bg-[#0E1A2E] rounded-[28px] sm:rounded-[28px] p-2 sm:p-2 border-[2px] border-[#2D4A7A]/70 shadow-[0_16px_36px_rgba(14,26,46,0.35)] flex flex-col justify-between overflow-hidden"
      >
        {/* Glossy top edge highlight */}
        <div className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Dynamic Island / Speaker Pill */}
        <div className="w-12 h-2.5 bg-black/90 rounded-full mx-auto mb-0.5 flex items-center justify-between px-1.5 flex-shrink-0 z-20">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-[#2D4A7A]" />
        </div>

        {/* Screen Content Container */}
        <div className="flex-1 bg-[#F7F8FA] rounded-[20px] sm:rounded-[18px] p-2 sm:p-2 flex flex-col justify-between overflow-hidden text-left border border-white/60 shadow-inner">
          
          {/* App Header */}
          <div className="flex items-center justify-between border-b border-border-light/60 pb-1">
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#0E1A2E] flex items-center justify-center text-[7px] sm:text-[6.5px] font-bold text-white">
                M
              </div>
              <span className="text-[8px] sm:text-[8px] font-bold text-[#0E1A2E] tracking-tight">MSYNTHOS</span>
            </div>
            <span className="text-[6.5px] sm:text-[6px] font-semibold uppercase px-1.5 py-0.2 bg-[#2D4A7A]/10 text-[#2D4A7A] rounded-full leading-tight">
              LIVE
            </span>
          </div>

          {/* Metric Card */}
          <div className="bg-white rounded-lg p-1.5 sm:p-1.5 border border-border-light shadow-2xs mt-0.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[7px] sm:text-[6.5px] font-medium text-text-muted">User Velocity</span>
              <span className="text-[7px] sm:text-[6.5px] font-bold text-emerald-600 flex items-center">
                +148% <ArrowUpRight className="w-2 h-2 ml-0.5" />
              </span>
            </div>
            <div className="flex items-end gap-0.5 h-5 sm:h-4.5 pt-0.5">
              {[35, 60, 45, 80, 65, 95, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-[#EEF0F3] rounded-t-xs overflow-hidden h-full flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="w-full bg-[#2D4A7A] rounded-t-xs" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-1 mt-1 sm:mt-0.5">
            <div className="bg-white p-1 rounded-md border border-border-light/70 flex items-center gap-1">
              <div className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded bg-[#2D4A7A]/10 flex items-center justify-center text-[#2D4A7A] flex-shrink-0">
                <Zap className="w-2.5 h-2.5 sm:w-2 sm:h-2" />
              </div>
              <div className="min-w-0">
                <span className="text-[7px] sm:text-[6.5px] font-bold text-[#0E1A2E] block leading-none truncate">Instant</span>
                <span className="text-[6px] sm:text-[5.5px] text-text-muted leading-none block mt-0.5">0.4s load</span>
              </div>
            </div>
            <div className="bg-white p-1 rounded-md border border-border-light/70 flex items-center gap-1">
              <div className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-2 sm:h-2" />
              </div>
              <div className="min-w-0">
                <span className="text-[7px] sm:text-[6.5px] font-bold text-[#0E1A2E] block leading-none truncate">Secured</span>
                <span className="text-[6px] sm:text-[5.5px] text-text-muted leading-none block mt-0.5">Encrypted</span>
              </div>
            </div>
          </div>

          {/* Bottom Tab Bar */}
          <div className="bg-white rounded-full py-1 sm:py-0.5 px-2.5 sm:px-2 flex justify-between items-center border border-border-light/80 mt-1 sm:mt-0.5 shadow-2xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0E1A2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9DDE3]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9DDE3]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9DDE3]" />
          </div>

        </div>

        {/* Home Indicator bar */}
        <div className="w-10 h-0.5 bg-white/40 rounded-full mx-auto mt-0.5 flex-shrink-0" />
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// SCENE 2: Website Mockup (3D Laptop)
// ==========================================
function WebsiteScene({ isReducedMotion }) {
  return (
    <motion.div
      key="website-scene"
      initial={{ opacity: 0, rotateX: 20, scale: 0.9, z: -40 }}
      animate={{ opacity: 1, rotateX: 0, scale: 1, z: 0 }}
      exit={{ opacity: 0, rotateX: -20, scale: 0.9, z: -40 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex flex-col items-center justify-center perspective-1000"
    >
      <motion.div
        animate={isReducedMotion ? {} : {
          y: [0, -4, 0],
          rotateX: [4, -2, 4],
          rotateY: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        {/* Laptop Display (Screen) */}
        <div className="w-[285px] sm:w-[275px] md:w-[310px] h-[165px] sm:h-[155px] md:h-[168px] bg-[#0E1A2E] rounded-t-xl p-2 sm:p-2 border border-[#2D4A7A]/60 shadow-[0_14px_35px_rgba(14,26,46,0.3)] relative overflow-hidden flex flex-col">
          
          {/* Camera dot */}
          <div className="w-1 h-1 rounded-full bg-black/80 border border-white/20 mx-auto mb-0.5 flex-shrink-0" />

          {/* Browser Container */}
          <div className="flex-1 bg-[#F7F8FA] rounded-md overflow-hidden flex flex-col border border-border-light shadow-inner text-left">
            
            {/* Browser Navigation Bar */}
            <div className="bg-[#EEF0F3] px-2 sm:px-1.5 py-0.5 border-b border-border-light flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 bg-white rounded px-1.5 py-0.2 text-[7px] sm:text-[7px] text-text-muted flex items-center gap-1 border border-border-light/60 font-mono">
                <span className="text-emerald-600 text-[6px]">🔒</span>
                https://msynthos.com/enterprise
              </div>
            </div>

            {/* Web Page Body */}
            <div className="p-2 sm:p-2 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#F7F8FA]">
              {/* Web Header */}
              <div className="flex justify-between items-center pb-1 border-b border-border-light/40">
                <span className="font-display font-extrabold text-[8px] sm:text-[8px] text-[#0E1A2E] tracking-tight">MSYNTHOS</span>
                <div className="flex gap-1.5 text-[7px] sm:text-[6.5px] font-medium text-text-muted">
                  <span className="text-[#0E1A2E] font-bold">Solutions</span>
                  <span>Systems</span>
                  <span>AI</span>
                </div>
                <div className="px-1.5 py-0.5 bg-[#0E1A2E] text-white text-[6px] sm:text-[6px] font-bold rounded">
                  Get Started
                </div>
              </div>

              {/* Web Hero Mockup */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 items-center py-0.5">
                <div>
                  <span className="text-[6px] sm:text-[5.5px] font-bold uppercase tracking-wider text-[#2D4A7A] block mb-0.5 leading-none">
                    HIGH CONVERSION WEB
                  </span>
                  <h4 className="font-display font-bold text-[8px] sm:text-[8.5px] text-[#0E1A2E] leading-tight mb-0.5">
                    Architected for Global Market Scale.
                  </h4>
                  <p className="text-[6px] sm:text-[6px] text-text-muted leading-tight">
                    Sub-millisecond latency with responsive interactive design.
                  </p>
                </div>
                <div className="bg-[#0E1A2E] rounded-md p-1.5 sm:p-1.5 text-white flex flex-col justify-between h-[48px] sm:h-[48px] border border-[#2D4A7A]/40 shadow-2xs">
                  <div className="flex justify-between items-center text-[6px] sm:text-[6px] text-white/70">
                    <span>Performance</span>
                    <span className="text-emerald-400 font-bold">100/100</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '98%' }}
                      transition={{ duration: 0.8 }}
                      className="bg-emerald-400 h-full rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[5.5px] sm:text-[5.5px] text-white/60 pt-0.2">
                    <span>LCP: 0.38s</span>
                    <span>INP: 18ms</span>
                  </div>
                </div>
              </div>

              {/* Feature Chips */}
              <div className="flex gap-1 pt-0.5 border-t border-border-light/40">
                <span className="text-[5.5px] sm:text-[5.5px] bg-[#2D4A7A]/10 text-[#2D4A7A] px-1 py-0.2 rounded font-medium">⚡ SEO 100%</span>
                <span className="text-[5.5px] sm:text-[5.5px] bg-[#2D4A7A]/10 text-[#2D4A7A] px-1 py-0.2 rounded font-medium">🛡️ Zero Trust</span>
                <span className="text-[5.5px] sm:text-[5.5px] bg-[#2D4A7A]/10 text-[#2D4A7A] px-1 py-0.2 rounded font-medium">🌐 Edge</span>
              </div>
            </div>

          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div className="w-[315px] sm:w-[310px] md:w-[348px] h-3 sm:h-2.5 bg-gradient-to-b from-[#1F2D44] via-[#0E1A2E] to-[#0A1220] rounded-b-lg border-t border-[#2D4A7A]/70 flex justify-center items-start shadow-[0_8px_18px_rgba(14,26,46,0.25)]">
          <div className="w-12 h-0.5 bg-[#2D4A7A]/60 rounded-b-xs" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// SCENE 3: AI Agent Matrix (Holographic Nodes)
// ==========================================
function AIAgentScene({ isReducedMotion }) {
  return (
    <motion.div
      key="ai-scene"
      initial={{ opacity: 0, scale: 0.88, z: -40 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      exit={{ opacity: 0, scale: 0.88, z: -40 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative w-[310px] sm:w-[320px] md:w-[350px] h-[205px] sm:h-[192px] md:h-[205px] flex items-center justify-center">
        
        {/* Background Neural Grid SVG with Connecting Energy Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 205">
          <defs>
            <linearGradient id="aiLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D4A7A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1A3A6B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Lines connecting satellites to center (Center is 175, 102.5) */}
          <line x1="55" y1="35" x2="175" y2="102.5" stroke="url(#aiLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="295" y1="35" x2="175" y2="102.5" stroke="url(#aiLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="55" y1="170" x2="175" y2="102.5" stroke="url(#aiLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="295" y1="170" x2="175" y2="102.5" stroke="url(#aiLineGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
          
          {/* Orbit rings */}
          <circle cx="175" cy="102.5" r="48" fill="none" stroke="#2D4A7A" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="5 3" />
          <circle cx="175" cy="102.5" r="78" fill="none" stroke="#2D4A7A" strokeWidth="1" strokeOpacity="0.15" />
        </svg>

        {/* Central Core (AI Intelligence Hub) */}
        <motion.div
          animate={isReducedMotion ? {} : {
            scale: [1, 1.04, 1],
            boxShadow: [
              "0 0 15px rgba(45,74,122,0.4)",
              "0 0 30px rgba(45,74,122,0.65)",
              "0 0 15px rgba(45,74,122,0.4)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-16 h-16 sm:w-16 sm:h-16 rounded-xl bg-[#0E1A2E] border border-[#2D4A7A] flex flex-col items-center justify-center p-1 text-center text-white"
        >
          <div className="w-6 h-6 sm:w-6 sm:h-6 rounded-lg bg-[#2D4A7A]/30 border border-[#2D4A7A] flex items-center justify-center mb-0.5 text-white">
            <Bot className="w-3 h-3 text-white animate-pulse" />
          </div>
          <span className="text-[7px] sm:text-[7px] font-bold tracking-wider uppercase leading-none">CORE AI</span>
          <span className="text-[5.5px] sm:text-[5px] text-emerald-400 font-mono mt-0.5 leading-none">AUTONOMOUS</span>
        </motion.div>

        {/* Satellite Node 1: NLP Reasoning (Top Left) */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1 left-0 sm:left-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-1.5 border border-border-light shadow-sm text-left w-[90px] sm:w-[94px] z-20"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Cpu className="w-2.5 h-2.5 text-[#2D4A7A]" />
            <span className="text-[7px] sm:text-[7px] font-bold text-[#0E1A2E] leading-none">Neural NLP</span>
          </div>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted block leading-tight">14ms latency</span>
          <span className="text-[6px] sm:text-[5.5px] font-bold text-emerald-600 block leading-tight">● 99.98% Acc</span>
        </motion.div>

        {/* Satellite Node 2: Multi-Agent Hub (Top Right) */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1 right-0 sm:right-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-1.5 border border-border-light shadow-sm text-left w-[90px] sm:w-[94px] z-20"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Zap className="w-2.5 h-2.5 text-[#2D4A7A]" />
            <span className="text-[7px] sm:text-[7px] font-bold text-[#0E1A2E] leading-none">Multi-Agent</span>
          </div>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted block leading-tight">Consensus active</span>
          <span className="text-[6px] sm:text-[5.5px] font-bold text-blue-600 block leading-tight">● 4 Nodes</span>
        </motion.div>

        {/* Satellite Node 3: Vector Knowledge (Bottom Left) */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1 left-0 sm:left-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-1.5 border border-border-light shadow-sm text-left w-[90px] sm:w-[94px] z-20"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Database className="w-2.5 h-2.5 text-[#2D4A7A]" />
            <span className="text-[7px] sm:text-[7px] font-bold text-[#0E1A2E] leading-none">Vector RAG</span>
          </div>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted block leading-tight">128k Context</span>
          <span className="text-[6px] sm:text-[5.5px] font-bold text-purple-600 block leading-tight">● Sub-ms</span>
        </motion.div>

        {/* Satellite Node 4: Autonomous Pipeline (Bottom Right) */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1 right-0 sm:right-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-1.5 border border-border-light shadow-sm text-left w-[90px] sm:w-[94px] z-20"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            <span className="text-[7px] sm:text-[7px] font-bold text-[#0E1A2E] leading-none">Workflows</span>
          </div>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted block leading-tight">Auto-operating</span>
          <span className="text-[6px] sm:text-[5.5px] font-bold text-emerald-600 block leading-tight">● Zero Down</span>
        </motion.div>

      </div>
    </motion.div>
  )
}

// ==========================================
// SCENE 4: 3D Commercial / Motion Ad Scene
// ==========================================
function CommercialScene({ isReducedMotion }) {
  return (
    <motion.div
      key="commercial-scene"
      initial={{ opacity: 0, rotateY: -25, scale: 0.9, z: -40 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
      exit={{ opacity: 0, rotateY: 25, scale: 0.9, z: -40 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
    >
      <div className="relative w-[300px] sm:w-[300px] md:w-[330px] h-[205px] sm:h-[192px] md:h-[205px] flex items-center justify-center">
        
        {/* Studio Viewfinder HUD Corners */}
        <div className="absolute inset-1.5 sm:inset-2 border border-[#2D4A7A]/20 pointer-events-none rounded-xl">
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#2D4A7A]" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#2D4A7A]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#2D4A7A]" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#2D4A7A]" />
          <div className="absolute top-1.5 left-2 text-[6px] sm:text-[6px] font-mono text-accent-navy tracking-widest uppercase">
            REC ● 4K 60FPS
          </div>
          <div className="absolute top-1.5 right-2 text-[6px] sm:text-[6px] font-mono text-accent-navy">
            SHUTTER 1/120
          </div>
        </div>

        {/* Ambient Light Halo */}
        <div className="absolute w-30 h-30 sm:w-28 sm:h-28 rounded-full bg-[#2D4A7A]/20 blur-[30px] pointer-events-none" />

        {/* Rotating 3D Orbital Rings */}
        <motion.div
          animate={isReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-34 h-34 sm:w-34 sm:h-34 border border-[#2D4A7A]/40 rounded-full border-dashed pointer-events-none"
        />
        <motion.div
          animate={isReducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute w-26 h-26 sm:w-26 sm:h-26 border border-[#1A3A6B]/30 rounded-full pointer-events-none"
        />

        {/* 3D Floating Prism / Product Crystal */}
        <motion.div
          animate={isReducedMotion ? {} : {
            y: [0, -6, 0],
            rotateX: [8, -6, 8],
            rotateY: [-10, 10, -10],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-22 h-22 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-[#0E1A2E] via-[#1A3A6B] to-[#2D4A7A] border border-white/30 shadow-[0_12px_30px_rgba(14,26,46,0.35)] flex flex-col items-center justify-center p-2 text-white"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center mb-1 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-extrabold text-[8.5px] sm:text-[8.5px] tracking-wider uppercase text-white leading-none">
            3D VISUAL
          </span>
          <span className="text-[5.5px] sm:text-[5.5px] text-white/70 font-mono tracking-wide uppercase mt-0.5 leading-none">
            CGI MOTION AD
          </span>
        </motion.div>

        {/* Floating Spec Tags */}
        <motion.div
          animate={isReducedMotion ? {} : { x: [0, -2, 0], y: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 left-2 sm:left-4 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-border-light shadow-2xs text-left z-20"
        >
          <span className="text-[7px] sm:text-[6.5px] font-bold text-[#0E1A2E] block leading-none">Cinema Render</span>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted leading-none mt-0.5 block">Octane / Unreal</span>
        </motion.div>

        <motion.div
          animate={isReducedMotion ? {} : { x: [0, 2, 0], y: [0, -2, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-2 right-2 sm:right-4 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-border-light shadow-2xs text-left z-20"
        >
          <span className="text-[7px] sm:text-[6.5px] font-bold text-[#0E1A2E] block leading-none">Brand Virality</span>
          <span className="text-[6px] sm:text-[5.5px] text-emerald-600 font-bold leading-none mt-0.5 block">● High Conv</span>
        </motion.div>

      </div>
    </motion.div>
  )
}

// ==========================================
// SCENE 5: Web Application / SaaS Dashboard
// ==========================================
function WebAppScene({ isReducedMotion }) {
  return (
    <motion.div
      key="webapp-scene"
      initial={{ opacity: 0, scale: 0.9, z: -40 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      exit={{ opacity: 0, scale: 0.9, z: -40 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
    >
      <div className="relative w-[310px] sm:w-[320px] md:w-[350px] h-[205px] sm:h-[192px] md:h-[205px] flex items-center justify-center">
        
        {/* Layer 1 (Back Panel): SaaS App Main Shell */}
        <motion.div
          animate={isReducedMotion ? {} : {
            rotateX: [4, 1, 4],
            rotateY: [-5, -2, -5],
            y: [0, -3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[260px] sm:w-[265px] md:w-[295px] h-[142px] sm:h-[140px] md:h-[152px] bg-[#0E1A2E] rounded-xl p-2 sm:p-2.5 border border-[#2D4A7A]/50 shadow-[0_14px_32px_rgba(14,26,46,0.3)] text-left flex flex-col justify-between"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[8px] sm:text-[8px] font-bold text-white tracking-wide">Enterprise SaaS Platform</span>
            </div>
            <span className="text-[6.5px] sm:text-[6px] bg-white/10 text-white/80 px-1.5 py-0.2 rounded font-mono">
              v3.8.0
            </span>
          </div>

          {/* Body stats */}
          <div className="grid grid-cols-3 gap-1 my-0.5">
            <div className="bg-white/5 rounded p-1 border border-white/5">
              <span className="text-[6px] sm:text-[5.5px] text-white/50 block leading-none">Users</span>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-white leading-none mt-0.5 block">48.2k</span>
            </div>
            <div className="bg-white/5 rounded p-1 border border-white/5">
              <span className="text-[6px] sm:text-[5.5px] text-white/50 block leading-none">Throughput</span>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-emerald-400 leading-none mt-0.5 block">99.99%</span>
            </div>
            <div className="bg-white/5 rounded p-1 border border-white/5">
              <span className="text-[6px] sm:text-[5.5px] text-white/50 block leading-none">Latency</span>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-blue-400 leading-none mt-0.5 block">2.1ms</span>
            </div>
          </div>

          {/* Sparkline Graph */}
          <div className="bg-white/5 rounded p-1 border border-white/5 flex items-center justify-between">
            <span className="text-[7px] sm:text-[6.5px] text-white/70">Database Sharding</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[6px] sm:text-[5.5px] font-mono text-emerald-400">HEALTHY</span>
            </div>
          </div>
        </motion.div>

        {/* Layer 2 (Floating Front Left Panel): Live Revenue Growth Card */}
        <motion.div
          animate={isReducedMotion ? {} : {
            y: [0, -5, 0],
            rotateZ: [-2, 2, -2]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute -bottom-1 -left-1 sm:left-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-2 border border-border-light shadow-lg text-left w-[108px] sm:w-[110px] md:w-[125px] z-30"
        >
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[6.5px] sm:text-[6px] font-bold text-text-muted uppercase">ARR Growth</span>
            <span className="text-[7px] sm:text-[6.5px] font-bold text-emerald-600">+312%</span>
          </div>
          <span className="text-[10.5px] sm:text-[11px] font-display font-extrabold text-[#0E1A2E] block leading-none">$1.48M</span>
          <div className="w-full bg-[#EEF0F3] rounded-full h-0.5 mt-1 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 0.8 }}
              className="bg-[#2D4A7A] h-full rounded-full" 
            />
          </div>
        </motion.div>

        {/* Layer 3 (Floating Front Right Panel): Global Edge Nodes */}
        <motion.div
          animate={isReducedMotion ? {} : {
            y: [0, 5, 0],
            rotateZ: [2, -2, 2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -top-1 -right-1 sm:right-1 bg-white/95 backdrop-blur-md rounded-lg p-1.5 sm:p-2 border border-border-light shadow-lg text-left w-[108px] sm:w-[110px] md:w-[125px] z-30"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Activity className="w-2.5 h-2.5 text-[#2D4A7A]" />
            <span className="text-[7px] sm:text-[7px] font-bold text-[#0E1A2E] leading-none">Global Clusters</span>
          </div>
          <span className="text-[6px] sm:text-[5.5px] text-text-muted block leading-tight">Multi-Region Sync</span>
          <span className="text-[6px] sm:text-[5.5px] font-bold text-emerald-600 block leading-tight">● 24 Zones Active</span>
        </motion.div>

      </div>
    </motion.div>
  )
}

// ==========================================
// MAIN HERO SHOWCASE COMPONENT
// ==========================================
export default function HeroShowcase() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const timerRef = useRef(null)

  // Performance / Reduced Motion Detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  // Continuous Auto-Cycling Interval (4.0s per scene)
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % SCENES.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Manual dot selection restarts 4s timer cleanly
  const handleDotClick = (idx) => {
    setCurrentSceneIndex(idx)
    startTimer()
  }

  const activeScene = SCENES[currentSceneIndex]
  const IconComponent = activeScene.icon

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center z-20">
      {/* 1. Dynamic Synced Pill Badge */}
      <div className="mb-1.5 sm:mb-2 flex flex-col items-center">
        <motion.div
          key={activeScene.id}
          initial={{ opacity: 0, y: -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-border-light backdrop-blur-md shadow-2xs"
        >
          <div className="w-4 h-4 rounded-full bg-[#0E1A2E] text-white flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0E1A2E]">
            {activeScene.label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A7A] animate-pulse" />
        </motion.div>
      </div>

      {/* 2. 3D Animated Scene Stage */}
      <div className="relative w-full h-[225px] sm:h-[198px] md:h-[212px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentSceneIndex === 0 && <MobileAppScene isReducedMotion={isReducedMotion} />}
          {currentSceneIndex === 1 && <WebsiteScene isReducedMotion={isReducedMotion} />}
          {currentSceneIndex === 2 && <AIAgentScene isReducedMotion={isReducedMotion} />}
          {currentSceneIndex === 3 && <CommercialScene isReducedMotion={isReducedMotion} />}
          {currentSceneIndex === 4 && <WebAppScene isReducedMotion={isReducedMotion} />}
        </AnimatePresence>
      </div>

      {/* 3. Interactive Scene Navigation Dots */}
      <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 z-30">
        {SCENES.map((scene, idx) => {
          const isActive = idx === currentSceneIndex
          return (
            <button
              key={scene.id}
              onClick={() => handleDotClick(idx)}
              aria-label={`Switch to ${scene.label} showcase`}
              className={`relative h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                isActive 
                  ? 'w-6 bg-[#0E1A2E]' 
                  : 'w-1.5 bg-[#D9DDE3] hover:bg-[#B8C0CC]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-[#0E1A2E] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
