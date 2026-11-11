import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowLeft, AlertCircle, Scale, ShieldCheck, CheckCircle } from 'lucide-react'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Terms of Service | MSynthos'
  }, [])

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-navy-dark text-gray-300 min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-silver-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="border-b border-navy-border pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-silver-light mb-4">
            <Scale className="w-3.5 h-3.5 text-accent-bright" />
            <span>Terms of Use & Service</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-silver-muted leading-relaxed">
            Effective Date: November 2026 • Applicable to all visits, tools, and contracts on <span className="text-white font-medium">https://msynthos.online</span>.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm leading-relaxed text-gray-300">

          {/* Section 1: Acceptance */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p className="mb-4">
              By accessing or using the website <strong>https://msynthos.online</strong> ("MSynthos", "we", "our", or "us"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our services, software, or digital utility tools.
            </p>
          </section>

          {/* Section 2: Free Calculators & Legal Disclaimer (Crucial for AdSense & StBerG) */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Free Online Calculators & Legal/Tax Disclaimer</span>
            </h2>
            <p className="mb-3">
              MSynthos provides free public online calculators, including the <Link to="/de/minijob-rechner" className="text-white underline hover:text-accent-bright">German Minijob-Rechner 2026</Link> (Brutto-Netto & Abgabenrechner).
            </p>
            <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-5 mb-4 text-xs space-y-2.5 text-amber-200/90">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Statutory Disclaimer (Rechtlicher Hinweis nach StBerG & RDG)</span>
              </div>
              <p>
                All calculations, threshold verifications (e.g. 603 € Geringfügigkeitsgrenze, 13,90 € Mindestlohn, Übergangsbereich bis 2.000 €), pension exemption deductions, and employer contributions are computed for <strong>general informational and non-binding orientation purposes only</strong>.
              </p>
              <p>
                Calculations are provided without warranty of completeness or legal accuracy. Use of these calculations does <strong>NOT constitute legal, tax, or payroll consulting</strong> under the German Tax Advisory Act (<em>Steuerberatungsgesetz - StBerG</em>) or Legal Services Act (<em>Rechtsdienstleistungsgesetz - RDG</em>). For binding determinations in individual employment cases, users must consult a licensed tax advisor (Steuerberater) or labor law attorney.
              </p>
            </div>
          </section>

          {/* Section 3: Agency Services */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Agency Engineering Services & Academy Offerings</span>
            </h2>
            <p className="mb-3">
              MSynthos provides full-service digital agency services, including custom software and web application development, AI automation workflows, performance ad creation, and educational training modules (Msynthos Academy).
            </p>
            <p>
              Individual commercial engagements, milestones, pricing structures, and deliverables are governed by customized Service Level Agreements (SLAs) or written statements of work agreed upon between MSynthos and the client.
            </p>
          </section>

          {/* Section 4: Intellectual Property */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-accent-bright" />
              <span>Intellectual Property Rights</span>
            </h2>
            <p className="mb-4">
              Unless otherwise indicated, all code, user interface designs, mathematical algorithms, software logic, text, graphics, logos, brand elements, and educational assets on this site are the proprietary intellectual property of MSynthos and are protected by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p>
              You are granted a limited, revocable, non-exclusive license to access and view the site and to use public calculator tools strictly for personal or internal operational reference.
            </p>
          </section>

          {/* Section 5: Acceptable Use */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">5</span>
              <span>Prohibited Activities & System Security</span>
            </h2>
            <p className="mb-3">When using MSynthos, you agree not to:</p>
            <ul className="space-y-2 list-disc pl-5 text-xs text-gray-300">
              <li>Engage in unauthorized automated scraping, bot crawling, or data extraction without express written consent.</li>
              <li>Attempt to bypass, disable, or tamper with security-related features or access controls.</li>
              <li>Introduce viruses, worms, malicious scripts, or perform denial-of-service (DoS) attacks on our servers.</li>
              <li>Reverse-engineer, decompile, or disassemble any aspect of the site's proprietary software engine.</li>
            </ul>
          </section>

          {/* Section 6: Third-Party Links & Ads */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">6</span>
              <span>Third-Party Advertisements & External Links</span>
            </h2>
            <p className="mb-4">
              Our website may display advertisements served by third-party ad networks (such as Google AdSense) and links to external third-party websites or services that are not owned or controlled by MSynthos. We assume no responsibility for the content, privacy policies, or practices of any third-party websites or advertisers.
            </p>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">7</span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, MSynthos and its operators, affiliates, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or business interruption arising out of your access to or use of (or inability to use) the website or calculation tools.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">8</span>
              <span>Contact Information</span>
            </h2>
            <p>
              For legal inquiries, contract clarification, or questions regarding these Terms of Service, please contact us at:{' '}
              <a href="mailto:msynthos@gmail.com" className="text-white font-bold underline hover:text-accent-bright">
                msynthos@gmail.com
              </a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}

