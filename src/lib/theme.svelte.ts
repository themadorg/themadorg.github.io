const STORAGE_KEY = 'madorg-theme';

export type ThemeName = 'light' | 'dark';

function systemTheme(): ThemeName {
	if (typeof matchMedia === 'undefined') return 'light';
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedTheme(): ThemeName | null {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : null;
	} catch {
		return null;
	}
}

class Theme {
	/** Resolved scheme on screen. SSR assumes light until the client syncs. */
	current = $state<ThemeName>('light');

	/** Call once on the client: an explicit choice wins, otherwise follow the OS. */
	syncFromStorage() {
		if (typeof document === 'undefined') return;
		this.current = storedTheme() ?? systemTheme();
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = this.current;
		try {
			localStorage.setItem(STORAGE_KEY, this.current);
		} catch {
			/* storage blocked: the choice still applies for this visit */
		}
	}
}

export const theme = new Theme();
