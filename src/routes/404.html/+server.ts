import { org } from '$lib/data/projects';
import en from '$lib/i18n/en.json';
import { supportedLanguages } from '$lib/languages';

export const prerender = true;

/**
 * GitHub Pages serves /404.html for any unknown path. It is a self-contained
 * "return to sender" slip: no app bundle, no JS, so it can never boot into
 * the wrong locale or render a half-hydrated page. Its only download is
 * the self-hosted display face (static/fonts) for the headline; body text is
 * set in system faces.
 */
export function GET() {
	const langs = supportedLanguages
		.map((l) => `<a href="/${l.code}/" lang="${l.code}" hreflang="${l.code}">${l.name}</a>`)
		.join('');

	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<title>${en.notfound_title} · ${org.name}</title>
<link rel="icon" href="/favicon.png" type="image/png">
<style>
@font-face{font-family:"Sofia Sans Extra Condensed Variable";src:url(/fonts/sofia-sans-extra-condensed-latin-wght-normal.woff2) format("woff2");font-weight:100 1000;font-display:swap}
:root{color-scheme:light dark;--sheet:#fff;--paper:light-dark(#fff,#14161b);--ink:light-dark(#121418,#eef0f3);--ink-2:light-dark(#474c55,#aab0bb);--red:light-dark(#d7262e,#ff4d55);--on-red:light-dark(#fff,#14161b);--focus:light-dark(#1d3a8a,#8ea8f0);--airmail:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='%23d7262e' d='M0 0h10L0 10zM0 40L40 0v10L10 40z'/%3E%3Cpath fill='%231d3a8a' d='M0 20L20 0h10L0 30zM20 40l20-20v10L30 40z'/%3E%3C/svg%3E")}
@media (prefers-color-scheme:dark){:root{--sheet:#e7e9ec}}
*{box-sizing:border-box}
body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:1.5rem;background:var(--paper);color:var(--ink);font:1.125rem/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
/* The slip is paper: the desk darkens, paper stays light (same rule as .sheet in app.css). */
.edge{color-scheme:light;width:min(100%,40rem);padding:12px;background:var(--airmail)}
.slip{position:relative;padding:clamp(1.5rem,5vw,3rem);background:var(--sheet);color:var(--ink)}
.stamp{position:absolute;top:1.25rem;inset-inline-end:1.25rem;rotate:-8deg;padding:.35rem .7rem;border:3px solid var(--red);color:var(--red);font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:.9375rem}
h1{margin:2.5rem 0 .75rem;font-family:"Sofia Sans Extra Condensed Variable",system-ui,sans-serif;font-weight:800;font-size:clamp(3.25rem,1.6rem + 6.4vw,6rem);line-height:.9;text-transform:uppercase}
p{margin:0 0 1.75rem;max-width:32rem}
.home{display:inline-flex;align-items:center;min-height:3rem;padding:.75rem 1.25rem;background:var(--red);color:var(--on-red);font-weight:700;text-decoration:none}
.home:focus-visible,nav a:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
nav{display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;margin-top:1.75rem;font-size:.9375rem}
nav a{color:var(--ink-2)}
</style>
</head>
<body>
<div class="edge"><main class="slip">
<span class="stamp" aria-hidden="true">404</span>
<h1>${en.notfound_title}</h1>
<p>${en.notfound_body}</p>
<a class="home" href="/en/">${en.notfound_home}</a>
<nav aria-label="Languages">${langs}</nav>
</main></div>
</body>
</html>
`;

	return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
