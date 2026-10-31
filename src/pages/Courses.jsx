import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { COURSES } from '../data/courses'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function Courses() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#F7F8FA] min-h-screen relative overflow-hidden">
      {/* Background glow graphics */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent-navy/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A2E] border border-[#0E1A2E] text-xs font-bold uppercase tracking-widest text-white shadow-sm mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Msynthos Academy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0E1A2E] tracking-tight mb-6 leading-tight"
          >
            Learn Skills That Are In <span className="bg-gradient-to-r from-[#0E1A2E] via-[#1A3A6B] to-[#2D4A7A] bg-clip-text text-transparent">High Demand</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#2D4A7A] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Industry-grade training programs designed by practitioners. Upgrade your skills across web development, autonomous AI agents, creative design, AI/3D advertising, and digital growth.
          </motion.p>
        </div>

        {/* Section Heading for Screen Readers & SEO */}
        <h2 className="sr-only">Msynthos Academy Professional Training Programs</h2>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9"
        >
          {COURSES.map((course) => {
            const IconComponent = course.icon
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#D9DDE3] hover:border-[#2D4A7A] border-t-4 border-t-[#0E1A2E] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden flex-1"
              >
                {/* TOP: 16:9 Banner Header Image */}
                {course.bannerImage && (
                  <div className="relative w-full aspect-video overflow-hidden border-b border-[#D9DDE3]/60 bg-[#0E1A2E]">
                    <img
                      src={course.bannerImage}
                      alt={course.imageAlt || `${course.title} - Msynthos Academy`}
                      loading="lazy"
                      width="960"
                      height="540"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                )}

                {/* BOTTOM: Solid Card Body Container */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Top Row: Icon */}
                    <div className="mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#0E1A2E] text-white border border-[#0E1A2E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="w-5.5 h-5.5" />
                      </div>
                    </div>

                    {/* Category Tag */}
                    <span className="text-xs font-extrabold text-[#0E1A2E] uppercase tracking-widest block mb-2">
                      {course.category}
                    </span>

                    {/* Title Heading - solid dark navy on hover */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0E1A2E] mb-3 group-hover:text-[#1A3A6B] transition-colors duration-200">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#1F2D44] text-sm font-normal leading-relaxed mb-6 line-clamp-3">
                      {course.shortDescription}
                    </p>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {course.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-semibold text-[#0E1A2E] bg-[#0E1A2E]/5 border border-[#0E1A2E]/15 px-2.5 py-1 rounded-md hover:bg-[#0E1A2E]/10 hover:border-[#0E1A2E]/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Enroll CTA */}
                  <div className="border-t border-[#D9DDE3]/80 pt-6">
                    <a
                      href={`https://wa.me/923460541850?text=${encodeURIComponent(`Hi, I'm interested in enrolling in ${course.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0E1A2E] hover:bg-[#1A3A6B] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
                    >
                      <span>Enroll in Course</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Academy Banner */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 border border-[#D9DDE3] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-l-8 border-l-[#0E1A2E]">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E1A2E] block mb-2">CUSTOM TEAM TRAINING</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#0E1A2E] mb-3">
              Need Corporate Upskilling for Your Team?
            </h3>
            <p className="text-[#1F2D44] text-base font-normal leading-relaxed">
              We design custom corporate training workshops in AI agent development, modern web architecture, and digital advertising workflows tailored specifically to your organization's stack.
            </p>
          </div>
          <a
            href="https://wa.me/923460541850"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0E1A2E] hover:bg-[#1A3A6B] transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg flex-shrink-0"
          >
            Inquire Corporate Training
          </a>
        </div>

      </div>
    </div>
  )
}
