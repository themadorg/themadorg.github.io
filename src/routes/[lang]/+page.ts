import { supportedLangCodes } from '$lib/languages';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => supportedLangCodes.map((lang) => ({ lang }));
