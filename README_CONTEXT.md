# Project Context: Msynthos

## 1. Project Overview
**Msynthos** is a high-performance, cinematic single-page website for a web development agency. The site showcases the company's motto ("Solving World Problems for the Benefit of Humanity"), core service offerings (Website Development for Businesses and Web App Development), upcoming project pipeline, and an interactive contact interface for potential clients.

---

## 2. Tech Stack
*(Sourced directly from `package.json`)*

* **Core & Build:** React (`v19.2.6`), React DOM (`v19.2.6`), Vite (`v8.0.12`)
* **Styling & Design System:** Tailwind CSS (`v4.3.1`) via `@tailwindcss/vite`, Vanilla CSS (`src/index.css`) for custom glassmorphism and keyframe animations, Google Fonts (Inter & Outfit)
* **Animation & Smooth Scroll:** Framer Motion (`v12.40.0`), GSAP + ScrollTrigger (`v3.15.0`), Lenis (`v1.3.23`)
* **Icons:** Lucide React (`v1.21.0`)
* **Routing:** `react-router-dom` (`v7.18.0`)
* **Tooling:** ESLint (`v10.3.0`)

---

## 3. Folder & File Structure

```
msynthos11/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── idea.md
├── README.md
├── README_CONTEXT.md
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── assets/
    │   ├── logo.jpeg
    │   ├── mudasir.png
    │   ├── saif.png
    │   ├── hammad.png
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Services.jsx
    │   ├── Portfolio.jsx
    │   ├── Contact.jsx
    │   └── Footer.jsx
    └── hooks/
        └── useSmoothScroll.js
```

---

## 4. Component & Hook Summaries

* **`App.jsx`**: Root application component that initializes smooth scrolling and orchestrates layout sections.
* **`Navbar.jsx`**: Sticky glassmorphism header featuring responsive navigation links, a mobile drawer menu, and smooth-scroll anchors.
* **`Hero.jsx`**: Full-screen entrance section with interactive mouse-follow ambient glow, letter-reveal text animations, company motto, and scroll indicator.
* **`About.jsx`**: Chapter-based pinning section (GSAP ScrollTrigger) detailing company origin, business website solutions, and web application capabilities alongside an animated brand visual card.
* **`Services.jsx`**: Dual service layout highlighting "Website Development" and "Web Application Development" with hover glow effects and tech feature lists.
* **`Portfolio.jsx`**: Project showcase featuring horizontal scroll pinning on desktop for upcoming business websites and web application teasers.
* **`Contact.jsx`**: Direct contact section featuring email and WhatsApp communication cards.
* **`Footer.jsx`**: Bottom navigation bar with social media links, copyright notice, and back-to-top smooth scrolling.
* **`useSmoothScroll.js`**: Custom hook initializing Lenis smooth scroll physics and binding its ticker with GSAP's `ScrollTrigger`.

---

## 5. External Services & APIs

* **External Links**: WhatsApp direct messaging (`wa.me`), Gmail compose (`mail.google.com`), and social channels configured in `Contact.jsx` and `Footer.jsx`.

---

## 6. Environment Variables

* *None currently required.* All active configurations and API endpoints operate client-side. (Optional future variables: `VITE_WEB3FORMS_KEY`).

---

## 7. Deployment Setup

* **Build Command:** `npm run build`
* **Development Command:** `npm run dev`
* **Output Directory:** `dist/`
* **Deployment Target:** Static web hosts (Netlify, Vercel, or GitHub Pages).

---

## 8. Known Issues & Pending Tasks

* **Single-Page Anchors:** `react-router-dom` is included in `package.json`, but routing currently relies on hash anchors (`#home`, `#about`, `#services`, `#contact`). Sub-pages can be introduced if multi-page routing is needed.
* **Portfolio Placeholders:** Projects inside [`Portfolio.jsx`](file:///f:/all%20apps/msynthos11/src/components/Portfolio.jsx) are marked as "COMING SOON" teasers.
* **Inline API Key:** Web3Forms access key is currently inline in `Contact.jsx`; could be extracted to a `.env` file for cleaner environment management.

---

## 9. Routing Structure

* **Current Model:** Hash-based single-page scroll sections (`#home`, `#about`, `#services`, `#contact`).
* **Router Package:** `react-router-dom` v7 is installed for future path-based route additions (e.g., `/portfolio`, `/case-studies`).
