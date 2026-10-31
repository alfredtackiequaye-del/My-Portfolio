# Alfred Portfolio — Cobalt

An independent comparison version of Alfred Tackie-Quaye’s portfolio, based on the selected Cobalt Showcase design. The original portfolio remains at `../alfred-portfolio` and is not modified by this project.

## Local comparison

- Original portfolio: its own Next.js project on port 3001.
- Cobalt version: `npm run dev -- --port 3002 --strictPort`.
- Cobalt production build: `npm run build`.
- Hosting runtime tests: `npm run test:sites`.

## What works

Responsive navigation with active-section feedback, concept-project dialogs, black-and-white portraits that reveal colour on hover or tap, expandable services with inquiry preselection, book previews, and direct email, phone, LinkedIn, GitHub, and WhatsApp links. Reduced-motion preferences are respected.

The inquiry form prepares a draft in the visitor’s email application. It does not send messages automatically or claim that delivery succeeded. No email API or secret is needed for this comparison prototype.

Work is clearly marked as concept studies. No client outcomes, years of experience, or independently verified credentials have been invented.

## Design and verification

The selected visual reference is stored in `design/selected-reference.png`. Browser evidence and test output are stored in `qa/`; the current visual review is in `design-qa.md`.

The Product Design starter’s hosting files remain intact. This project has not been published.
