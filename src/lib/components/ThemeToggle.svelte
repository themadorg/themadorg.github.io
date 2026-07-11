<script lang="ts">
	import { onMount } from 'svelte';
	import { getI18n } from '$lib/i18n.svelte';
	import { theme } from '$lib/theme.svelte';

	const i18n = getI18n();

	onMount(() => theme.syncFromStorage());
</script>

<button
	type="button"
	class="toggle"
	onclick={() => theme.toggle()}
	aria-label={theme.light ? i18n.t('theme_dark') : i18n.t('theme_light')}
	title={theme.light ? i18n.t('theme_dark') : i18n.t('theme_light')}
>
	{#if theme.light}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
				stroke="currentColor"
				stroke-width="1.75"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{:else}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
				stroke="currentColor"
				stroke-width="1.75"
				stroke-linecap="round"
			/>
		</svg>
	{/if}
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}

	.toggle:hover {
		color: var(--color-text);
		border-color: var(--color-hover-border);
		background: var(--color-hover);
	}
</style>
