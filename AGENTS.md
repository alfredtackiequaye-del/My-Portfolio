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

- Everyday toolkit should stand out beneath the portrait: navy panel, readable heading/tool names, restrained coloured abbreviation tiles, subtle hover lift and reduced-motion support. Keep tools as informational items rather than fake buttons or skill ratings.

- Approved mobile About order: portrait, introduction/benefits/actions, then toolkit. Keep one toolkit in the document and retain its position under the portrait on desktop.

- Approved Services refinement: preserve numbered expandable rows; show deliverable previews while collapsed, use the explicit Power BI dashboards & data storytelling title, label expanded deliverables What you receive, enlarge mobile text, and add a Help me choose inquiry that clears prior project references. Keep data study service matching the updated form option.

- Certificate visibility: use prominent readable cards for PL-300, DP-700, SC-900 and ITIL. Add the four-colour Microsoft mark to the three Microsoft entries only. Retain professional-learning context; do not invent verification links, award dates, or badge evidence.

- Process refinement approved: explain the agreed brief, scope/review points, design decisions, feedback/refinement, and file/report handover. Use a single-column numbered mobile sequence with 16px descriptions and a contact action. Preserve certificate cards.

- Approved Books refinement: display existing short descriptions beneath titles; use single-column covers on small phones (600px and below); increase detail text to 16px and label book inquiries Ask about availability. Preserve actual covers and book-specific mailto subjects; no prices, formats, purchase links, or availability claims invented.

- Approved Contact refinements: readable form labels/instructions; explain draft preparation above fields; add Copy inquiry using the same validated, current payload as email preparation, with selectable text on clipboard failure. Preserve project reference and typed message. Make WhatsApp more visible on mobile. No message is sent by the form itself.

- Return-home navigation: include Home explicitly in the desktop/mobile menus, plus an always-visible Home link beside the mobile menu toggle. Preserve the logo home link and active-section indication.

- Final polish and publishing readiness: verified all assets and code, added social preview meta tags (Open Graph and Twitter cards) to `index.html`, validated build artifacts (`dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`), and confirmed all Sites worker packaging tests pass.
