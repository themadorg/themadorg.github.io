const STORAGE_KEY = 'madorg-light';

function readLight(): boolean {
	if (typeof localStorage === 'undefined') return false;
	try {
		return localStorage.getItem(STORAGE_KEY) === 'true';
	} catch {
		return false;
	}
}

function apply(light: boolean) {
	if (typeof document === 'undefined') return;
	if (light) {
		document.documentElement.dataset.light = '';
	} else {
		delete document.documentElement.dataset.light;
	}
	try {
		localStorage.setItem(STORAGE_KEY, light ? 'true' : 'false');
	} catch {
		/* ignore */
	}
}

class Theme {
	/** Prefer matching SSR (dark) until the client hydrates. */
	light = $state(false);

	/** Call once on the client (e.g. from ThemeToggle). */
	syncFromStorage() {
		if (typeof document === 'undefined') return;
		this.light = readLight();
		apply(this.light);
	}

	toggle() {
		this.light = !this.light;
		apply(this.light);
	}
}

export const theme = new Theme();
