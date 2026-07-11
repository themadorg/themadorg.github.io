<script lang="ts">
	import { getI18n, supportedLanguages } from '$lib/i18n.svelte';

	const i18n = getI18n();

	let open = $state(false);
	let rootEl: HTMLDivElement | undefined = $state();

	function select(code: string) {
		i18n.setLang(code);
		open = false;
	}

	function onWindowClick(e: MouseEvent) {
		if (!open || !rootEl) return;
		if (!rootEl.contains(e.target as Node)) open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}

	const current = $derived(
		supportedLanguages.find((l) => l.code === i18n.lang) ?? supportedLanguages[0]
	);
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

<div class="lang" bind:this={rootEl}>
	<button
		type="button"
		class="trigger"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label={i18n.t('select_language')}
		onclick={() => (open = !open)}
	>
		<span class="code">{current.code}</span>
		<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
			<path
				d="M3 4.5 6 7.5 9 4.5"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	{#if open}
		<ul class="menu" role="listbox" aria-label={i18n.t('select_language')}>
			{#each supportedLanguages as lang (lang.code)}
				<li role="option" aria-selected={i18n.lang === lang.code}>
					<button
						type="button"
						class="option"
						class:active={i18n.lang === lang.code}
						onclick={() => select(lang.code)}
					>
						<span class="opt-code">{lang.code}</span>
						<span class="opt-name">{lang.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.lang {
		position: relative;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		height: 2.25rem;
		padding: 0 0.65rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}

	.trigger:hover {
		color: var(--color-text);
		border-color: var(--color-hover-border);
		background: var(--color-hover);
	}

	.code {
		letter-spacing: 0.02em;
	}

	.menu {
		position: absolute;
		top: calc(100% + 0.4rem);
		inset-inline-end: 0;
		z-index: 50;
		min-width: 10.5rem;
		margin: 0;
		padding: 0.35rem;
		list-style: none;
		border: 1px solid var(--color-border);
		border-radius: 0.65rem;
		background: var(--color-surface-raised);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.35);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		padding: 0.5rem 0.65rem;
		border: none;
		border-radius: 0.4rem;
		background: transparent;
		color: var(--color-text-muted);
		font-size: 0.875rem;
		text-align: start;
		cursor: pointer;
		transition:
			background 0.12s,
			color 0.12s;
	}

	.option:hover {
		background: var(--color-hover);
		color: var(--color-text);
	}

	.option.active {
		color: var(--color-text);
		background: var(--color-surface);
	}

	.opt-code {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-text-faint);
		min-width: 1.4rem;
	}

	.option.active .opt-code {
		color: var(--color-accent);
	}

	.opt-name {
		font-weight: 500;
	}
</style>
