import React, { useEffect } from 'react'
import Contact from '../components/Contact'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-20 sm:pt-28 pb-12 bg-bg-alt/50 min-h-screen flex flex-col justify-center">
      <Contact />
    </main>
  )
}
