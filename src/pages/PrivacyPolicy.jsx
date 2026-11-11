import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowLeft, Cookie, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Privacy Policy | MSynthos'
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
            <Shield className="w-3.5 h-3.5 text-accent-bright" />
            <span>Data Protection & GDPR / DSGVO</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-silver-muted leading-relaxed">
            Last Updated: November 2026 • Valid for <span className="text-white font-medium">https://msynthos.online</span> and all associated digital products and utilities.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm leading-relaxed text-gray-300">

          {/* Section 1: Overview */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Overview & Data Controller</span>
            </h2>
            <p className="mb-4">
              At <strong>MSynthos</strong>, accessible from <Link to="/" className="text-white underline hover:text-accent-bright">https://msynthos.online</Link>, the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of personal data that is collected and recorded by MSynthos and how we use, process, and safeguard it in compliance with the <strong>European General Data Protection Regulation (GDPR / DSGVO)</strong> and applicable global data protection laws.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs space-y-1">
              <p className="font-bold text-white">Responsible Data Controller:</p>
              <p>MSynthos Digital Solutions Operations</p>
              <p>Contact Email: <a href="mailto:msynthos@gmail.com" className="text-accent-bright hover:underline">msynthos@gmail.com</a></p>
              <p>Website: <a href="https://msynthos.online" className="text-accent-bright hover:underline">https://msynthos.online</a></p>
            </div>
          </section>

          {/* Section 2: Google AdSense & Cookies (Critical for AdSense Compliance) */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-amber-400" />
              <span>Google AdSense & Third-Party Advertising Cookies</span>
            </h2>
            <p className="mb-4">
              We may utilize <strong>Google AdSense</strong> to display advertisements on our website and tools. To provide transparency and ensure full compliance with Google Publisher Policies, please note the following:
            </p>
            <ul className="space-y-3 mb-4 list-disc pl-5 text-gray-300">
              <li>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites across the Internet.
              </li>
              <li>
                <strong>Google Advertising Cookies:</strong> Google's use of advertising cookies (such as the DoubleClick DART cookie) enables it and its partners to serve personalized and contextual ads to our users based on their browsing activity.
              </li>
              <li>
                <strong>User Opt-Out Rights:</strong> Users may opt out of personalized advertising by visiting the official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent-bright underline hover:text-white">Google Ads Settings</a>. Alternatively, users can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-accent-bright underline hover:text-white">www.aboutads.info</a> or the <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-accent-bright underline hover:text-white">European Interactive Digital Advertising Alliance (EDAA)</a>.
              </li>
              <li>
                <strong>Third-Party Ad Networks:</strong> Ad servers or ad networks use technology in their respective advertisements and links that appear on MSynthos, sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize advertising content.
              </li>
            </ul>
            <p className="text-xs text-silver-muted italic border-l-2 border-accent pl-3">
              Note: MSynthos has no access to or control over cookies that are used by third-party advertisers. Please consult the respective privacy policies of these third-party ad servers for more detailed information.
            </p>
          </section>

          {/* Section 3: Web Utilities & Calculators (e.g. Minijob Rechner) */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Free Web Utilities & Calculation Tools (e.g., Minijob-Rechner)</span>
            </h2>
            <p className="mb-3">
              Our website provides free, public interactive utilities such as the <Link to="/de/minijob-rechner" className="text-white underline hover:text-accent-bright">German Minijob-Rechner 2026</Link>.
            </p>
            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 mb-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Client-Side In-Browser Calculation Guarantee</span>
              </div>
              <p className="text-emerald-200/80">
                All numbers entered into our calculation forms (such as gross wage amounts, year selections, or tax exemption toggles) are processed strictly in real-time within your local web browser session using client-side JavaScript. None of your entered personal wage numbers are stored in our databases or sent to external servers.
              </p>
            </div>
          </section>

          {/* Section 4: Log Files & Technical Data */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Server Log Files & Hosting Telemetry</span>
            </h2>
            <p className="mb-4">
              MSynthos follows standard hosting procedures for logging visitors when they visit web pages. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information to maintain infrastructure security (Legal basis: Art. 6(1)(f) GDPR).
            </p>
          </section>

          {/* Section 5: GDPR Rights */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-accent-bright" />
              <span>Your Data Protection Rights Under GDPR (Articles 15–22 DSGVO)</span>
            </h2>
            <p className="mb-4">
              Under European Union data privacy laws, every user is entitled to the following rights:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Access (Art. 15 GDPR)</strong>
                <span>You have the right to request copies of your personal data held by us.</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Rectification (Art. 16 GDPR)</strong>
                <span>You have the right to request that we correct any information you believe is inaccurate.</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Erasure (Art. 17 GDPR)</strong>
                <span>You have the right to request that we erase your personal data under certain conditions.</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Restrict Processing (Art. 18 GDPR)</strong>
                <span>You have the right to request restriction of the processing of your personal data.</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Data Portability (Art. 20 GDPR)</strong>
                <span>You have the right to request transfer of your data to another organization.</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Right to Object (Art. 21 GDPR)</strong>
                <span>You have the right to object to our processing of your personal data at any time.</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-silver-muted">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <a href="mailto:msynthos@gmail.com" className="text-accent-bright underline">msynthos@gmail.com</a>.
            </p>
          </section>

          {/* Section 6: Security & Contact */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-accent-bright" />
              <span>SSL / TLS Encryption & Direct Contact</span>
            </h2>
            <p className="mb-4">
              This site uses end-to-end SSL / TLS encryption for security reasons and for the protection of the transmission of confidential content. You can recognize an encrypted connection in your browser's address line when it changes from "http://" to "https://" and the lock icon is displayed.
            </p>
            <p>
              If you have any questions or require additional details about our Privacy Policy, do not hesitate to contact us at{' '}
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

