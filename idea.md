Build the *frontend only* (React.js) for a cinematic, fully scroll-animated company website for *Msynthos* — an AI software development company.

This is a *frontend-only build*. No real backend, no database, no API integration, no server. However, the contact form should still feel fully functional from a user's perspective:
- On submit, validate fields client-side (required fields, basic email format check)
- Show a loading/submitting animation state on the button
- Show a success state/message after "submitting" (simulate with a setTimeout and local React state — no actual network request)
- Store the submission only in local component state (or console.log it) — nothing persists, nothing is sent anywhere
- This is purely to make the demo feel complete and interactive. I will wire up a real backend later — do not add any backend code, API routes, or server logic now.

---

## TECH STACK (Required)

- *React.js* (Vite, not Create React App)
- *Framer Motion* — for scroll-triggered animations, page transitions, hover micro-interactions
- *GSAP + ScrollTrigger* — for cinematic scroll sequences (parallax, pinning, scrubbing) where Framer Motion isn't enough
- *Tailwind CSS* — utility-first styling
- *React Router* — for routing (even if single-page, structure it for future scalability)
- *Lenis* (or similar smooth-scroll library) — for buttery smooth scrolling, required for the cinematic feel

---

## BRAND IDENTITY

- *Company Name:* Msynthos
- *Motto:* "Solving World Problems for the Benefit of Humanity"
- *Industry:* AI software development — building client apps/web apps now, building proprietary AI SaaS products long-term
- *Tone:* Premium, futuristic, confident, minimal-but-bold — think Anthropic / OpenAI / Linear / Apple product pages, NOT a generic startup template

### Design Direction (follow this, don't default to generic AI-template look)
- Dark, near-black base (NOT pure #000 — use a deep charcoal/graphite like #0A0A0C) with ONE bold accent color used sparingly and deliberately (deep electric blue or a warm signal color — pick one and commit, don't mix multiple accents)
- Typography: a strong, modern display typeface for headlines (geometric sans, confident weight) paired with a clean readable body face. Type should feel architectural, not default system font.
- Avoid: generic gradient blobs, cookie-cutter glassmorphism cards, stock "AI brain" or circuit-board imagery, numbered "01/02/03" markers unless they encode real sequence
- Motion should feel orchestrated, not scattered — every animation should have a clear purpose tied to revealing content, not decoration for its own sake
- Respect prefers-reduced-motion — provide a non-animated fallback

---

## PAGE STRUCTURE & SECTIONS

### 1. Hero Section (Full viewport, cinematic entrance)
- Page-load animation sequence: Msynthos logo/wordmark animates in (e.g., letter-by-letter reveal, or mask-wipe reveal), followed by the motto fading/sliding in
- Subtle ambient background motion (e.g., slow-moving gradient mesh, particle field, or animated grid — pick ONE, keep it restrained)
- Scroll-down indicator with micro-animation (e.g., pulsing chevron or animated line)
- As user scrolls past hero, content should transition out with a parallax/fade effect, not just disappear

### 2. About Us Section
- Scroll-triggered reveal: text and visuals animate in as they enter viewport (staggered fade+slide, using Framer Motion's whileInView)
- Content: Msynthos's story — a company built to develop AI-powered software solutions that solve real-world problems, starting with client app/web development and building toward proprietary AI products
- Consider a scroll-pinned section (GSAP ScrollTrigger pin) where text changes while a visual element stays fixed, for a cinematic "chapter" feel

### 3. Services Section
- Two core offerings, presented as animated cards or panels that reveal on scroll:
  1. *App & Web App Development* — custom software built for clients
  2. *AI Product Development* — proprietary AI-powered SaaS (future-facing)
- Each card/panel should have a hover micro-interaction (subtle lift, glow, or icon animation)

### 4. Team Section (Detailed Spec — Important)
Two animated cards, side by side on desktop (stacked on mobile):

*Card 1 — Mudasir*
- Profile image (use a placeholder image component — I will replace with the real photo)
- Role: Co-Founder & CEO / CTO
- Short "About" bio (placeholder text I can edit later, e.g., "Leads product development and engineering at Msynthos, building the technology that powers the company's vision.")
- Direct contact element: an email/contact button or icon-link (e.g., mail icon + LinkedIn icon) that's clearly clickable

*Card 2 — Saifullah Abbasi*
- Same structure: profile image placeholder, Role: Co-Founder & CMO, short bio placeholder (e.g., "Drives marketing, brand strategy, and client relationships at Msynthos."), direct contact element

*Animation requirements for both cards:*
- Cards animate in on scroll (e.g., slide up + fade, slight stagger between the two cards so they don't appear simultaneously)
- Hover state: card should respond with a tactile micro-interaction — subtle tilt (3D perspective tilt following cursor is a nice touch if feasible), scale-up, or image zoom/reveal effect
- Contact button/icon should have its own hover animation (color shift, underline draw, or icon bounce)

### 5. Portfolio / Work Section
- Placeholder section for future client projects — design it as an animated grid or horizontal scroll-snap gallery
- Use 3-4 placeholder project cards with "Coming Soon" or sample placeholder content I can swap later
- Scroll-triggered reveal consistent with rest of site

### 6. Contact / Footer Section
- Clear call-to-action: "Let's build something" or similar (write final copy yourself, keep it confident and short)
- Contact form (frontend only — fields: Name, Email, Message). On submit: client-side validation → loading state on button → simulated delay (setTimeout) → success message animation (e.g., form fades out, checkmark + "Message sent" fades in). No real network request — purely local state, ready to be wired to a real backend later.
- Footer: Msynthos logo, motto, social links (placeholder icons), copyright line

---

## ANIMATION PRINCIPLES TO FOLLOW THROUGHOUT

- Every section should reveal progressively as the user scrolls — nothing should just "appear" with no transition
- Use staggered animations for grouped elements (e.g., multiple text lines, multiple cards) rather than animating everything at once
- Maintain a consistent easing curve across the site (e.g., a custom cubic-bezier) so motion feels cohesive, not random
- Keep performance in mind: use will-change, transform/opacity-based animations (avoid animating layout properties like width/height directly), and lazy-load below-the-fold assets

---

## FILE STRUCTURE EXPECTATIONS

Organize as a clean, scalable React project:

src/
  components/
    Hero.jsx
    About.jsx
    Services.jsx
    Team.jsx
    TeamCard.jsx
    Portfolio.jsx
    Contact.jsx
    Footer.jsx
    Navbar.jsx
  assets/
  hooks/        (e.g., useSmoothScroll, useScrollAnimation)
  App.jsx
  main.jsx
index.html
tailwind.config.js


---

## DELIVERABLE

A fully responsive (mobile, tablet, desktop), fully animated, single-page React frontend for Msynthos that feels premium and cinematic — comparable in polish to Anthropic.com or Linear.app — using placeholder content and images where real assets aren't available yet, structured so I can plug in real content, images, and a backend later.