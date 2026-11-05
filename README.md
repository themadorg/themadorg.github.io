# TheMadOrg — landing

Public landing page for [TheMadOrg](https://github.com/themadorg).

> We care about communication

Built with **SvelteKit** + **adapter-static**. The design is **airmail**: chatmail is mail, so the page is a piece of post. The envelope is addressed to its readers (funders, self-hosters, developers, contributors); every project is a stamp on one perforated sheet; the letter is an aerogramme; the route map shows how a message travels across our relays; install commands are CN 22 customs slips; funding is a registered-mail slip; the footer is the back of the envelope with our return address. Light and dark themes (dark mode darkens the desk, the paper stays paper), four languages, Persian in RTL.

Design system and rationale: [`DESIGN.md`](DESIGN.md) (machine-readable twin: [`.impeccable/design.json`](.impeccable/design.json)) · product context: [`PRODUCT.md`](PRODUCT.md).

Type: Sofia Sans Extra Condensed (display), Sofia Sans (text), Vazirmatn (Persian), all self-hosted via `@fontsource-variable` so the WebXDC build stays offline. The standalone `/404.html` loads no app bundle, so it carries its own copy of the display face in `static/fonts/` (web-only, excluded from the WebXDC package).

## Develop

```sh
bun install
bun run dev
```

```sh
bun run build
bun run preview
```

```sh
bun run check
```

Output: `build/` (fully prerendered static site).

## Deploy (GitHub Pages)

This repo is **[themadorg.github.io](https://github.com/themadorg/themadorg.github.io)** — public site **https://themadorg.net**.

1. Repo **Settings → Pages → Source: GitHub Actions**
2. **Settings → Pages → Custom domain:** `themadorg.net` (DNS per GitHub docs)
3. Merge to `main` (or run **Deploy to GitHub Pages** via workflow_dispatch)
4. Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds with Bun and publishes `build/`

`static/CNAME` is set to `themadorg.net`. No `paths.base` (served at domain root).

## Content

Project catalog lives in [`src/lib/data/projects.ts`](src/lib/data/projects.ts): projects, roles, FAQ and install commands. Edit there to add or update stamps — no CMS or runtime GitHub API. A new stamp also needs a place on the sheet: the `plate` list in [`src/lib/components/StampSheet.svelte`](src/lib/components/StampSheet.svelte) and its grid areas.

Projects with a live site (Madmail, Bedrud, Madmail Admin, Delta Chat Wiki) carry a screenshot of that site, in `static/stamps/*.webp`. Each has a `.webp.json` sidecar in `provenance/stamps/` recording where it came from; the sidecars live outside `static/` so they are not published. The other stamps carry an engraved two-colour vignette drawn in [`src/lib/components/StampFace.svelte`](src/lib/components/StampFace.svelte).

## Search, answer engines and LLMs (SEO / AEO / GEO)

Everything below is generated from the same data the page renders, so it cannot drift:

| File | What |
|------|------|
| `/{lang}/` head | Localized title/description, canonical, `hreflang` alternates + `x-default`, Open Graph (`og:locale` + alternates), Twitter `summary_large_image` |
| JSON-LD (`src/lib/seo.ts`) | One `@graph` per locale: `Organization`, `WebSite`, `WebPage`, `ItemList` of `SoftwareSourceCode` (repo, language, SPDX license, stamp screenshot, WIP as `Draft`), `FAQPage` mirroring the visible FAQ |
| [`/sitemap.xml`](https://themadorg.net/sitemap.xml) | All locales with `xhtml:link` hreflang alternates |
| [`/robots.txt`](https://themadorg.net/robots.txt) | Open to all crawlers, explicit allow for AI search/answer bots, sitemap link |
| [`/llms.txt`](https://themadorg.net/llms.txt), [`/llms-full.txt`](https://themadorg.net/llms-full.txt) | [llms.txt](https://llmstxt.org) map and the full page as Markdown (`src/lib/llms.ts`) |
| `/og.png` | 1200×630 share card |
| `/site.webmanifest`, `/.well-known/security.txt` | Manifest and security contact (renew `Expires` yearly) |
| `/404.html` | Static "Return to sender" slip served by GitHub Pages for unknown paths: no JS, `noindex`, its display face self-hosted from `static/fonts/` |
| `/_headers` | Security and cache headers, for hosts that read the file (GitHub Pages itself ignores it) |

Web-only files (`robots.txt`, `sitemap.xml`, `llms*.txt`, `.well-known/`, `site.webmanifest`, `og.png`, `404.html`, `fonts/`, `_headers`, `CNAME`) are excluded from the WebXDC package (`scripts/build-xdc.js`).

## WebXDC (Delta Chat)

Offline package for sending the landing as a WebXDC mini-app:

```sh
bun run build:xdc
```

Produces `dist/themadorg.xdc`.

```sh
npx @webxdc/webxdc-dev run dist/themadorg.xdc
```

Uses `manifest.toml` + `icon.png` (org logo). Packaging rewrites absolute paths so the static site works inside the Delta Chat sandbox (no network; external project links open outside the app).

## Languages

URL-prefixed locales (same idea as deltachat-wiki):

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English  | LTR |
| `fa` | فارسی   | RTL |
| `es` | Español  | LTR |
| `ru` | Русский  | LTR |

- Routes: `/en`, `/fa`, `/es`, `/ru`
- Root `/` redirects on the client using `localStorage` + `navigator.language` (no-JS: meta refresh to `/en/`; the root is `noindex`)
- Strings: `src/lib/i18n/{en,fa,es,ru}.json`
- Switcher in the nav updates the URL prefix and persists the choice

## License

Site source: same as you ship the repo under. Individual themadorg products keep their own licenses (AGPL / GPL / LGPL).
