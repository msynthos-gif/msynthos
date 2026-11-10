import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Courses from './pages/Courses'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ChatWidget from './components/ChatWidget'
import MinijobRechner from './tools/minijob-rechner/MinijobRechner'

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Contact />
    </main>
  )
}

// Layout wrapper for main website pages (renders global Navbar, Footer, and ChatWidget)
function MainSiteLayout() {
  return (
    <div className="bg-bg-dark text-gray-300 min-h-screen overflow-x-hidden selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Outlet />
      <Footer />
      <ChatWidget />
    </div>
  )
}

function App() {
  // Initialize Lenis smooth scroll and GSAP integration
  useSmoothScroll()

  return (
    <Routes>
      {/* 1. Standalone isolated German utility tool & SEO blog article routes */}
      <Route path="/de/minijob-rechner" element={<MinijobRechner />} />
      <Route path="/de/minijob-rechner/:slug" element={<MinijobRechner />} />
      <Route path="/ratgeber/:slug" element={<MinijobRechner />} />

      {/* 2. Main website layout routes (renders main site layout with Navbar, Footer & ChatWidget) */}
      <Route element={<MainSiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<Courses />} />
        {/* Wildcard catch-all fallback */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App

