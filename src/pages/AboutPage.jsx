import React, { useEffect } from 'react'
import About from '../components/About'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-16 sm:pt-20 bg-white min-h-screen">
      <About />
    </main>
  )
}
