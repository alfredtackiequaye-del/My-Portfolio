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
