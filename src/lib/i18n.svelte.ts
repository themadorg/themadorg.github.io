import { goto } from '$app/navigation';
import { getContext, setContext } from 'svelte';
import {
	defaultLang,
	isLangCode,
	langDir,
	supportedLangCodes,
	supportedLanguages,
	type LangCode
} from './languages';
import en from './i18n/en.json';
import es from './i18n/es.json';
import fa from './i18n/fa.json';
import ru from './i18n/ru.json';

export { supportedLangCodes, supportedLanguages, type LangCode };

export type TranslationKey = keyof typeof en;

const translationMap: Record<LangCode, Record<string, string>> = {
	en,
	fa,
	es,
	ru
};

const STORAGE_KEY = 'madorg-lang';
const I18N_KEY = Symbol('i18n');

export class I18n {
	lang = $state<LangCode>(defaultLang);
	translations = $derived(translationMap[this.lang] ?? translationMap.en);
	dir = $derived(langDir(this.lang));

	constructor(initialLang: string) {
		this.lang = isLangCode(initialLang) ? initialLang : defaultLang;
	}

	/** Passive update from URL — does not navigate. */
	syncFromUrl(urlLang: string) {
		if (isLangCode(urlLang) && this.lang !== urlLang) {
			this.lang = urlLang;
			this.persist(urlLang);
		}
	}

	/**
	 * Navigate to the same path under a new language prefix.
	 * URL is the source of truth (like deltachat-wiki).
	 */
	setLang(newLang: string) {
		if (!isLangCode(newLang) || newLang === this.lang) return;

		this.persist(newLang);

		const hash = typeof window !== 'undefined' ? window.location.hash : '';

		// WebXDC: hard-navigate to the prerendered locale folder (reliable offline).
		if (typeof window !== 'undefined' && (window as Window & { __WEBXDC__?: boolean }).__WEBXDC__) {
			const target = new URL(`../${newLang}/`, window.location.href);
			target.hash = hash.replace(/^#/, '');
			window.location.replace(target.href);
			return;
		}

		const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
		const pathParts = pathname.split('/');

		if (isLangCode(pathParts[1])) {
			pathParts[1] = newLang;
		} else {
			pathParts.splice(1, 0, newLang);
		}

		// trailingSlash: always
		let newPath = pathParts.join('/') || `/${newLang}`;
		if (!newPath.endsWith('/')) newPath += '/';
		goto(newPath + hash, { replaceState: true, noScroll: true });
	}

	t(key: TranslationKey | string, vars?: Record<string, string | number>): string {
		let value = this.translations[key] ?? translationMap.en[key] ?? key;
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				value = value.replaceAll(`{${k}}`, String(v));
			}
		}
		return value;
	}

	persist(lang: LangCode) {
		if (typeof localStorage === 'undefined') return;
		try {
			localStorage.setItem(STORAGE_KEY, lang);
		} catch {
			/* ignore */
		}
	}
}

export function setI18n(initialLang: string) {
	const i18n = new I18n(initialLang);
	return setContext(I18N_KEY, i18n);
}

export function getI18n() {
	return getContext<I18n>(I18N_KEY);
}

/** Resolve preferred language on the client (root redirect). */
export function preferLangClient(): LangCode {
	if (typeof localStorage !== 'undefined') {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (isLangCode(stored)) return stored;
		} catch {
			/* ignore */
		}
	}
	if (typeof navigator !== 'undefined') {
		const nav = navigator.language?.slice(0, 2).toLowerCase();
		if (isLangCode(nav)) return nav;
	}
	return defaultLang;
}
