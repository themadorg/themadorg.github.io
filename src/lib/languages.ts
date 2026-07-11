export const supportedLanguages = [
	{ code: 'en', name: 'English', dir: 'ltr' },
	{ code: 'fa', name: 'فارسی', dir: 'rtl' },
	{ code: 'es', name: 'Español', dir: 'ltr' },
	{ code: 'ru', name: 'Русский', dir: 'ltr' }
] as const;

export type LangCode = (typeof supportedLanguages)[number]['code'];

export const supportedLangCodes = supportedLanguages.map((l) => l.code) as LangCode[];

export const defaultLang: LangCode = 'en';

export function isLangCode(value: string | undefined | null): value is LangCode {
	return !!value && (supportedLangCodes as string[]).includes(value);
}

export function langDir(code: string): 'ltr' | 'rtl' {
	return supportedLanguages.find((l) => l.code === code)?.dir ?? 'ltr';
}
