import { error } from '@sveltejs/kit';
import { defaultLang, isLangCode, type LangCode } from '$lib/languages';
import type { LayoutLoad } from './$types';

function langFromPath(pathname: string): LangCode | null {
	const seg = pathname.split('/').filter(Boolean)[0];
	// Tolerate leftover index.html segments from WebXDC file URLs
	if (isLangCode(seg)) return seg;
	return null;
}

export const load: LayoutLoad = ({ params, url }) => {
	let lang: string | undefined = params.lang;

	if (!isLangCode(lang)) {
		lang = langFromPath(url.pathname) ?? undefined;
	}

	// Last resort: do not hard-crash offline clients with a bare 404
	if (!isLangCode(lang)) {
		if (import.meta.env.SSR) {
			error(404, 'Unknown language');
		}
		lang = defaultLang;
	}

	return { lang };
};
