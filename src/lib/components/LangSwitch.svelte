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
		aria-haspopup="true"
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
		<ul class="menu" aria-label={i18n.t('select_language')}>
			{#each supportedLanguages as lang (lang.code)}
				<li>
					<button
						type="button"
						class="option"
						class:active={i18n.lang === lang.code}
						aria-current={i18n.lang === lang.code ? 'true' : undefined}
						lang={lang.code}
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
		height: 2.5rem;
		padding: 0 0.7rem;
		border: 0;
		background: var(--paper-2);
		color: var(--ink);
		font-size: var(--step-small);
		font-weight: 700;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background-color var(--dur-ui) var(--ease-out),
			transform var(--dur-press) var(--ease-out);
	}

	.trigger:active {
		transform: scale(0.96);
	}

	.trigger svg {
		transition: rotate var(--dur-ui) var(--ease-out);
	}

	.trigger[aria-expanded='true'] svg {
		rotate: 180deg;
	}

	@media (hover: hover) and (pointer: fine) {
		.trigger:hover {
			background: var(--paper-3);
		}
	}

	/* A real floating menu: the one place elevation is earned. taste-skill-ignore */
	.menu {
		position: absolute;
		top: calc(100% + 0.4rem);
		inset-inline-end: 0;
		z-index: 50;
		min-width: 11rem;
		margin: 0;
		padding: 0.35rem;
		list-style: none;
		background: var(--paper);
		box-shadow: /* taste-skill-ignore: real overlay */
			0 1px 2px rgb(0 0 0 / 0.12),
			0 12px 32px rgb(0 0 0 / 0.18);
		transform-origin: top right;
		animation: menu-in 180ms var(--ease-out);
	}

	:dir(rtl) .menu {
		transform-origin: top left;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(-4px);
		}
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.55rem 0.7rem;
		border: none;
		background: transparent;
		color: var(--ink);
		font-size: var(--step-small);
		text-align: start;
		cursor: pointer;
		transition: background-color 120ms var(--ease-out);
	}

	.option:hover,
	.option:focus-visible {
		background: var(--paper-2);
	}

	.option.active {
		background: var(--paper-2);
	}

	.opt-code {
		min-width: 1.6rem;
		color: var(--ink-2);
		font-size: var(--step-small);
		font-weight: 700;
		text-transform: uppercase;
	}

	.option.active .opt-code {
		color: var(--red);
	}

	.opt-name {
		font-weight: 600;
	}
</style>
