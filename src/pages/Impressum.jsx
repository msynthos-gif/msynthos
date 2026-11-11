import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, ArrowLeft, Mail, Phone, Globe, ShieldAlert, Scale } from 'lucide-react'

export default function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Impressum / Legal Notice | MSynthos'
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
            <Landmark className="w-3.5 h-3.5 text-accent-bright" />
            <span>Rechtliche Anbieterkennzeichnung / Legal Notice</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Impressum
          </h1>
          <p className="text-sm text-silver-muted leading-relaxed">
            Angaben gemäß § 5 Telemediengesetz (TMG) und § 18 Abs. 2 Medienstaatsvertrag (MStV).
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm leading-relaxed text-gray-300">

          {/* Section 1: Provider Details */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Diensteanbieter & Seitenbetreiber</span>
            </h2>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-white text-base">MSynthos Digital Solutions</p>
              <p className="text-silver-muted">Full-Service Digital Agency, Web Engineering & Software Solutions</p>
              <p className="pt-2"><strong className="text-white">Vertreten durch:</strong> MSynthos Management Operations Team</p>
            </div>
          </section>

          {/* Section 2: Contact Information */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-accent-bright" />
              <span>Kontaktaufnahme / Contact Details</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-bright shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">E-Mail-Support:</strong>
                  <a href="mailto:msynthos@gmail.com" className="text-silver-light hover:underline font-mono">
                    msynthos@gmail.com
                  </a>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">WhatsApp / Phone:</strong>
                  <a href="https://wa.me/923460541850" target="_blank" rel="noopener noreferrer" className="text-silver-light hover:underline font-mono">
                    +92 346 0541850
                  </a>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 sm:col-span-2">
                <Globe className="w-5 h-5 text-accent-bright shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Offizielle Webpräsenz:</strong>
                  <a href="https://msynthos.online" className="text-silver-light hover:underline font-mono">
                    https://msynthos.online
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Redaktionelle Verantwortlichkeit */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-accent-bright" />
              <span>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</span>
            </h2>
            <p className="mb-2">
              Verantwortlich für die redaktionell-journalistischen Angebote und die redaktionelle Betreuung der Informationsbereiche (einschließlich Ratgeber und Fachartikel auf <Link to="/de/minijob-rechner" className="text-white underline hover:text-accent-bright">https://msynthos.online/de/minijob-rechner</Link>):
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs space-y-1">
              <p className="text-white font-bold">MSynthos Redaktionsleitung</p>
              <p>Kontakt: <a href="mailto:msynthos@gmail.com" className="text-accent-bright hover:underline">msynthos@gmail.com</a></p>
            </div>
          </section>

          {/* Section 4: Dispute Resolution */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>EU-Streitschlichtung / Verbraucherstreitbeilegung</span>
            </h2>
            <p className="mb-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter folgendem Link finden:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent-bright">
                https://ec.europa.eu/consumers/odr/
              </a>.
            </p>
            <p className="text-xs text-silver-muted">
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Section 5: Haftung für Inhalte & Rechner */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Haftungsausschluss (Disclaimer) & Rechner-Hinweis</span>
            </h2>
            <div className="space-y-4 text-xs text-gray-300">
              <div>
                <strong className="text-white block mb-1">Haftung für Inhalte (§ 7 Abs. 1 TMG):</strong>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">Haftung für externe Links:</strong>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <strong className="text-white block mb-1">Hinweis zu Online-Rechnern & Werkzeugen:</strong>
                <p>
                  Die auf unserer Webseite kostenfrei bereitgestellten Berechnungswerkzeuge (wie der Minijob-Rechner 2026) wurden mit größtmöglicher Sorgfalt programmiert. Sie dienen ausschließlich der unverbindlichen Orientierung und stellen <strong>keine Rechtsberatung gemäß Rechtsdienstleistungsgesetz (RDG)</strong> sowie <strong>keine Steuerberatung gemäß Steuerberatungsgesetz (StBerG)</strong> dar. Eine Haftung für materielle oder immaterielle Schäden aus der Nutzung der Rechnerergebnisse ist ausgeschlossen.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Urheberrecht */}
          <section className="bg-navy-card/60 border border-navy-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 text-white flex items-center justify-center text-xs font-bold">6</span>
              <span>Urheberrecht (Copyright Notice)</span>
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte, Software-Codes, Grafiken und Werke auf diesen Seiten unterliegen dem deutschen und internationalen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}

