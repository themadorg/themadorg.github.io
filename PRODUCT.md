# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences land on themadorg.net, in this priority order (confirmed 2026-11-05):

1. **Funders** — foundations, grant programs, and individuals deciding whether TheMadOrg is worth supporting. Job: understand what the org ships, that it is real and maintained, and how to get in touch.
2. **Self-hosters** — operators who want to run a chatmail relay (Madmail) or self-hosted meetings (Bedrud) on their own hardware. Job: find the right project and get to its install path.
3. **Developers** — people building clients or tooling on the chatmail protocol (Madcore, relay tooling). Job: find the repo and the SDK.
4. **Contributors** — people who want to help with code, docs, or translations. Job: find the GitHub org and a project to join.

## Product Purpose

TheMadOrg is an open-source organization building communication infrastructure: chatmail relays for Delta Chat, self-hosted video meetings, SDKs, ops tooling, and documentation. The site is the org's front door: it explains the mission ("We care about communication"), shows every project, and routes each audience to its next step. Success = a funder reaches out, a self-hoster reaches a project's install path, a developer reaches a repo.

## Positioning

Private communication you can run yourself, shipped as single binaries that small teams can operate without a platform squad. The org builds both ends of the Delta Chat / chatmail ecosystem (relay server, inter-relay exchange, client SDK, admin panel, docs), not a single app.

## Operating Context

- Static site, SvelteKit + adapter-static, deployed to GitHub Pages at https://themadorg.net.
- Four URL-prefixed locales: `/en`, `/fa` (RTL), `/es`, `/ru`. Every string lives in `src/lib/i18n/*.json`.
- Also packaged as a WebXDC mini-app for Delta Chat (`bun run build:xdc`): must work offline, no network fonts or remote assets.
- Project catalog is hand-maintained in `src/lib/data/projects.ts`.

## Capabilities and Constraints

- Projects: Bedrud (Go, AGPL-3.0, bedrud.org), Madmail (Rust, AGPL-3.0, madmail.chat), Madexchanger (Go, GPL-3.0, WIP), Madexchanger-php (PHP), Madcore (TypeScript, LGPL-3.0-or-later, WIP), Madmail Admin (TypeScript, GPL-3.0, admin.madmail.chat), Relay Ping (Go), Delta Chat Wiki (Svelte, GPL-3.0, deltachat.wiki).
- Contact: hello@themadorg.net (confirmed by the user 2026-11-05) for funders and partners.
- No donation platform, sponsor page, or payment flow exists. Do not invent one.

## Brand Commitments

- The red graffiti **TMO** mark (`static/logo.png`) stays.
- **Red** stays the brand color.
- Name is written **TheMadOrg**. Tagline: "We care about communication".
- Identity is what we make (Madmail, Bedrud, Madcore and the rest) and that we care about communication, nothing else. Copy, the return address, the postmark, stamp faces, structured data and metadata describe the org only by its work.

## Evidence on Hand

- Real projects, real live sites, real repos, real licenses (above).
- Madmail install is a real one-binary flow (`madmail install --simple`), documented in its README.
- Stamp screenshots of the projects' own live sites: `static/stamps/{madmail,bedrud,madmail-admin,deltachat-wiki}.webp`, each with a `.webp.json` sidecar recording its origin. Projects without a live site get a drawn vignette (`StampFace.svelte`), never a fabricated screenshot.
- Absent and never to be fabricated: testimonials, user counts, funders, partners, press, benchmarks, deployment numbers.

## Product Principles

1. Show the work, not adjectives: every claim points at a project that exists.
2. Funders first, but never at the expense of the self-hoster's path to install.
3. Every language is first-class, including RTL Persian.
4. Works offline (WebXDC) and without JavaScript for reading.

## Accessibility & Inclusion

WCAG AA contrast, keyboard navigation, visible focus, `prefers-reduced-motion` respected, correct `dir`/`lang` per locale.
