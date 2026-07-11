# TheMadOrg — landing

Public landing page for [TheMadOrg](https://github.com/themadorg).

> We care about communication

Built with **SvelteKit** + **adapter-static**. Dark-first design aligned with [madmail.chat](https://madmail.chat).

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

This repo is **[themadorg.github.io](https://github.com/themadorg/themadorg.github.io)** — the org site at https://themadorg.github.io/.

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Merge to `main` (or run **Deploy to GitHub Pages** via workflow_dispatch).
3. Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds with Bun and publishes `build/`.

No `paths.base` is required (site is served at the domain root). Custom domain: add `static/CNAME` with the hostname.

The static `build/` output also works on Cloudflare Pages if needed later (`bun install && bun run build`, output `build`).

## Content

Project catalog lives in [`src/lib/data/projects.ts`](src/lib/data/projects.ts). Edit there to add or update cards — no CMS or runtime GitHub API.

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
- Root `/` redirects on the client using `localStorage` + `navigator.language` (fallback links + meta refresh to `/en`)
- Strings: `src/lib/i18n/{en,fa,es,ru}.json`
- Switcher in the nav updates the URL prefix and persists the choice

## License

Site source: same as you ship the repo under. Individual themadorg products keep their own licenses (AGPL / Apache / GPL).
