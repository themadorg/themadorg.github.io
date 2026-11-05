import type { Handle } from '@sveltejs/kit';
import { isLangCode, langDir } from '$lib/languages';

/**
 * Prerendered pages must carry their own language on <html> before hydration,
 * so crawlers and no-JS readers see /fa/ as Persian and right-to-left.
 * Paths without a language segment (/, /404.html) keep app.html's en/ltr.
 */
export const handle: Handle = ({ event, resolve }) => {
	const seg = event.url.pathname.split('/').filter(Boolean)[0];
	const lang = isLangCode(seg) ? seg : 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="en" dir="ltr">', `<html lang="${lang}" dir="${langDir(lang)}">`)
	});
};
