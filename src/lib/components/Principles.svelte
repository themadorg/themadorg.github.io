<script lang="ts">
	import { principleKeys } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';

	const i18n = getI18n();
</script>

<section class="principles" id="principles" aria-labelledby="principles-title">
	<div class="inner">
		<header class="section-head">
			<p class="eyebrow">{i18n.t('principles_eyebrow')}</p>
			<h2 id="principles-title">{i18n.t('principles_title')}</h2>
			<p class="lede">{i18n.t('principles_lede')}</p>
		</header>

		<ul class="grid">
			{#each principleKeys as item (item.titleKey)}
				<li>
					<h3>{i18n.t(item.titleKey)}</h3>
					<p>{i18n.t(item.bodyKey)}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.principles {
		border-top: 1px solid var(--color-border);
		padding: var(--section-pad-y) 0;
	}

	.inner {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0 var(--section-pad-x);
	}

	.section-head {
		max-width: 36rem;
		margin-bottom: 2.25rem;
	}

	.eyebrow {
		margin: 0 0 0.65rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--color-text-faint);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: clamp(1.6rem, 3.5vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.lede {
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text-muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 1.25rem 1.3rem;
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		background: transparent;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	p {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-text-muted);
	}

	:global([dir='rtl']) h2 {
		letter-spacing: 0;
	}
</style>
