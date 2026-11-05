import { defaultLang, supportedLanguages } from '$lib/languages';
import { pageUrl } from '$lib/seo';

export const prerender = true;

/** One <url> per locale, each listing every translation plus x-default. */
export function GET() {
	const lastmod = new Date().toISOString().slice(0, 10);
	const alternates = [
		...supportedLanguages.map(
			(l) => `<xhtml:link rel="alternate" hreflang="${l.code}" href="${pageUrl(l.code)}"/>`
		),
		`<xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(defaultLang)}"/>`
	].join('');

	const urls = supportedLanguages
		.map(
			(l) =>
				`<url><loc>${pageUrl(l.code)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${l.code === defaultLang ? '1.0' : '0.9'}</priority>${alternates}</url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
