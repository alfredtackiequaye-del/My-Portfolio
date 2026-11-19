# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## User design decisions

- This is a separate comparison project. Never change the original alfred-portfolio project from here.
- Match the third displayed Cobalt Showcase design stored at design/selected-reference.png.
- Keep the cobalt hero, ivory gallery, staggered project compositions, bold geometric type, and restrained brass accents.
- Preserve Alfred’s real portrait and black-and-white to colour interaction, client-focused About copy, books, and contact options.
- Label work as concept studies; do not invent client results, experience, or credential verification.
- The user approved automated browser checks in this chat.
- Keep this local; publishing has not been requested.

- Home refinement: the user found the opening crowded. Prioritize clear hierarchy, generous but purposeful spacing, alignment, contrast, and one primary action. Keep the portrait and its colour interaction in About; remove the duplicate hero portrait/signature. Contain the hero artwork separately from the text instead of overlapping it. This approved simplification supersedes the crowded opening composition in the initial concept.

- Latest hero decision: the user explicitly requested their photo restored as the main hero image. Use a clean headline-left/portrait-right composition, retain monochrome-to-colour hover and tap, and keep laptop/stationery imagery in Selected Work rather than the hero. This supersedes the earlier instruction to keep the portrait exclusive to About.

- Latest hero adjustment: keep both the real portrait and laptop artwork in the right-side composition, with the laptop beside the portrait. Preserve the clean left-hand copy and one primary action.

- Current hero choice: restore the earlier large laptop/stationery artwork in the separate right-hand visual field, without the hero portrait. Keep the real portrait in About. This supersedes the portrait-plus-laptop arrangement.

- Current hero composition: extend the laptop still life to the bottom boundary and blend its top/left edges into cobalt. Position the real portrait in the space between the headline/copy and the artwork. Keep the face and all live copy unobscured; preserve portrait colour reveal. This supersedes the laptop-only hero.

- Portrait emphasis: enlarge the central portrait to occupy the space above the previous small cutout, so the face and headline are the strongest focal points. Keep the laptop as supporting background imagery and all copy readable.

- Desktop layering should match the mobile composition: portrait foreground aligned within the same scene, with the book and laptop directly behind, rather than a portrait pulled left away from the still life. Use proportional scene sizing across desktop and tablet.

- Portrait hover must never enlarge/crop the image: use colour-only transition plus the existing sweep, with 14px top headroom in both hero and About.
- Add restrained background orbital paths with very slow dots on the hero. Keep decoration behind content, pointer-inert and aria-hidden, and hide it for reduced-motion users.

- Orbital background refinement: use six softly repeated orbital paths/twelve moving dots as a background pattern, with overall opacity reduced to 0.65. Keep the varied slow cycles and reduced-motion support.

- Move the desktop hero portrait slightly left (36px; 24px at tablet widths) while preserving the mobile composition. Increase hero orbit visibility modestly (overall opacity 0.8).
- Use the shared orbital component in all main content sections. On ivory/grey sections use muted ink-blue/brass; on navy/cobalt use pale blue/brass. Keep content on top, alternate orientation, pause off-screen animations, and hide all patterns for reduced motion.

- Page-by-page client review: finish Home before moving on. Home refinements approved: make the supporting copy explain recognisable brands, useful experiences, and actionable Power BI dashboards; enlarge the mobile identity line and supporting text; provide a quiet direct project-inquiry link beside/below the work CTA.
- Hero dashboard palette: keep blue dominant, adding restrained teal, warm gold, and soft lavender accents inside the screen. Use `cobalt-hero-colour.png`; preserve the original asset as a reference. Other sections are outside this review pass.

- Selected Work review approved: named, clearly labelled concept studies; explain visible design decisions, study format/scope, and what is shown. Do not invent tool use, research, client outcomes, or completed production deliverables.
- Keep the project close control sticky and mobile detail copy readable. Project inquiries must preselect the matching service and carry the project title into a visible, removable reference and the email draft, without overwriting a visitor’s message. Remove the unfinished/case-studies-coming-later footer.

- Section identification: use clear, consistently visible section names (Selected Work, About Me, Services, My Process, Books, Contact), separate from the larger editorial headlines. Keep active navigation prominent.

- Approved About refinement: retain portrait/headline, use a concise introduction and three client benefits (brand recognition, clear digital journeys, actionable data). Keep supporting mobile copy at least 16px and provide contact plus Selected Work actions. Do not invent results or credentials.

- Everyday toolkit should stand out beneath the portrait in a premium white/light-grey panel with readable heading/tool names, brand-style tool icons (Design and Data groups), subtle hover lift and reduced-motion support. Keep tools as informational items rather than fake buttons or skill ratings. On desktop/tablet keep the panel compact (side-by-side groups, no role lines) so it does not outgrow the About copy column; mobile keeps role lines.

- Approved mobile About order: portrait, introduction/benefits/actions, then toolkit. Keep one toolkit in the document and retain its position under the portrait on desktop.

- Approved Services refinement: preserve numbered expandable rows; show deliverable previews while collapsed, use the explicit Power BI dashboards & data storytelling title, label expanded deliverables What you receive, enlarge mobile text, and add a Help me choose inquiry that clears prior project references. Keep data study service matching the updated form option.

- Certificate visibility: use prominent readable cards for PL-300, DP-700, SC-900 and ITIL. Add the four-colour Microsoft mark to the three Microsoft entries only. Retain professional-learning context; do not invent verification links, award dates, or badge evidence.

- Process refinement approved: explain the agreed brief, scope/review points, design decisions, feedback/refinement, and file/report handover. Use a single-column numbered mobile sequence with 16px descriptions and a contact action. Preserve certificate cards.

- Approved Books refinement: display existing short descriptions beneath titles; use single-column covers on small phones (600px and below); increase detail text to 16px and label book inquiries Ask about availability. Preserve actual covers and book-specific mailto subjects; no prices, formats, purchase links, or availability claims invented.

- Approved Contact refinements: readable form labels/instructions; explain draft preparation above fields; add Copy inquiry using the same validated, current payload as email preparation, with selectable text on clipboard failure. Preserve project reference and typed message. Make WhatsApp more visible on mobile. Update: the form now sends via Formspree (https://formspree.io/f/mwllwnpz) with a Send message button; on failure it falls back to the email draft and Copy inquiry.

- Return-home navigation: include Home explicitly in the desktop/mobile menus, plus an always-visible Home link beside the mobile menu toggle. Preserve the logo home link and active-section indication.

- Final polish and publishing readiness: verified all assets and code, added social preview meta tags (Open Graph and Twitter cards) to `index.html`, validated build artifacts (`dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`), and confirmed all Sites worker packaging tests pass.

- Real book store links added: integrated direct purchase links and platform badges (Amazon for Generational Assignment and AI Knowledge-to-Income Blueprint; Selar for AI Productivity Mastery and AI Prompt Engineering Mastery) while preserving custom email availability inquiries.

- Publishing requested on 2 November 2026: create and publish this Cobalt portfolio through Sites. This supersedes the earlier local-only instruction for this publication. Preserve the original alfred-portfolio project.

- Interactive but light: use WebP images with phone-sized versions, and keep all motion in `src/interactions.js` plus CSS (transform/opacity only, no animation libraries). Pointer effects (tilt, magnetic buttons, hero spotlight/parallax) run only on mouse devices; everything switches off for reduced motion.
- Dark mode: follows the visitor's system setting, with a sun/moon switch in the header (saved per visitor). Hero stays cobalt in both themes. Dark colours live in one `:root[data-theme='dark']` block at the end of styles.css. Theme change uses a circular reveal; opening a project morphs the image into the project view (View Transitions, skipped for reduced motion).
- Persuasion copy pass (approved: "fix everything"): hero headline "Brands people remember. Dashboards people actually use." with a problem-first supporting line, CTAs "See how I work" / "Tell me what you need", and a proof strip (PL-300 · DP-700, author of 4 books, Ghana/worldwide) under the hero. About leads with the design + data combination. Services open with the client's problem/outcome. Work keeps "Concept study" labels plus one honest "Studio projects" line; modal notes shortened to one line. Contact: "Tell me what isn't working…" with a three-step "What happens when you get in touch". Confirmed: free first call offered (feature it); no fixed prices up front (never say "fixed"); all four certifications current. Reply time confirmed: within 24 hours. This supersedes earlier hero/About/Services/Contact wording.
- UX pass: phones get a fixed "Book a free first call" + WhatsApp bar shown only between the hero and Contact; hero orbit lines removed (aurora stays) and floating chips hidden on phones; small round portrait beside the kicker on phones; minimum 14px for readable text and 12px for labels; book cards use a real "Details" button (no nested interactive elements), whole card still clickable by mouse.

- Home intro animation (from the user's reference video, Nov 2026): on load the navigation settles in, the headline focuses in line by line from a blurred white outline that then fills with colour, supporting copy rises, the laptop artwork fades up, and the portrait rises from below pale and soft before sharpening; chips follow. Implemented as a CSS block at the end of `src/styles.css`; disabled for reduced motion.
- Video scroll effects (Nov 2026): section headings focus in word by word from a blur (`useScrollFocus` in `src/interactions.js`, words stay real text); section labels use a gold "/" prefix and blur in; closed service rows fill with cobalt on mouse hover, title rolls up and the plus turns; a giant faint outlined "PROCESS" sits behind My Process; a large "Have a project in mind?" band with a Let's talk button sits before Contact. Kept the approved hero (no outlined-name hero), added no Experience section (no real dates), no showreel button. All disabled for reduced motion.
