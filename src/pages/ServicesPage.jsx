import React, { useEffect } from 'react'
import Services from '../components/Services'

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-16 sm:pt-20 bg-navy-dark min-h-screen">
      <Services />
    </main>
  )
}
