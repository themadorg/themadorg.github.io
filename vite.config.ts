import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		lightningcss: {
			// Keep native light-dark(). The minifier's polyfill resolves it once on
			// :root, so tokens inherited into a `.sheet` (color-scheme: light) keep
			// their dark values and text vanishes on paper. Supported since
			// Chrome 123, Safari 17.5, Firefox 120.
			exclude: Features.LightDark
		}
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Root-absolute asset URLs so CF Pages / GH Pages never nest /_app paths.
			paths: {
				relative: false
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: true,
				strict: true
			}),
			prerender: {
				handleHttpError: 'warn',
				handleMissingId: 'warn',
				entries: ['*', '/en', '/fa', '/es', '/ru']
			}
		})
	]
});
