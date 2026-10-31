Act as a Senior React Engineer. I need to add an isolated, standalone German utility tool to my existing React project. 

CRITICAL PROJECT RULES:
1. Do NOT modify, refactor, or delete any existing project files, styles, components, or the main homepage.
2. All work for this tool must be strictly isolated inside a brand-new folder: `src/tools/minijob-rechner/`.
3. Do not add any navigation links to the main website header or footer. This page must only be accessible via direct URL route: `/de/minijob-rechner`.

FOLDER STRUCTURE TO CREATE:
src/tools/minijob-rechner/
├── MinijobRechner.jsx       (Main interactive UI component)
├── minijobLogic.js          (Pure JS calculation logic)
└── styles.module.css        (Scoped CSS or use Tailwind CSS classes so global CSS isn't affected)

TASK REQUIREMENTS:

1. Calculation Logic (`minijobLogic.js`):
   - Calculate German Minijob (up to 538 €) & Midijob / Übergangsbereich (538.01 € to 2,000 €).
   - Inputs: Gross income (`brutto`), Pension Insurance exemption toggle (`rvBefreit`).
   - Default state: 538 € gross, not exempted (`rvBefreit: false`).
   - Logic:
     * If gross <= 538 €:
       - If `rvBefreit` is false: deduct 3.6% employee pension contribution.
       - If `rvBefreit` is true: 0% deduction (Netto = Brutto).
     * If gross between 538.01 € and 2,000 € (Midijob):
       - Apply standard sliding scale deduction formula (~11% to 20%).
     * Return: Gross amount, Net payout, Pension contribution, and Employment Status string in German.

2. UI & Design (`MinijobRechner.jsx`):
   - Language: Pure German (`de`).
   - Clean, modern, distraction-free layout (Card-based UI).
   - Numeric input slider / field for gross income (€).
   - Checkbox toggle for "Befreiung von der Rentenversicherungspflicht".
   - Clear result card displaying the Net payout (`Netto-Auszahlung`), along with a breakdown of deductions.
   - Clean independent header and footer solely for this tool (do NOT import the main site's header/footer).
   - Leave a clean placeholder container at the bottom (`<section id="seo-content-placeholder">`) where we will inject research-based SEO articles, guides, and FAQs later.

3. Integration Instruction:
   - Provide the single snippet to mount this route in my `App.jsx` / `App.js` using `react-router-dom`:
     Path: `/de/minijob-rechner` -> Component: `MinijobRechner`.

Generate the complete, error-free code for `minijobLogic.js` and `MinijobRechner.jsx`.