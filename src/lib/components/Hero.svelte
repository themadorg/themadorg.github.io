<script lang="ts">
	import { org } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import Button from './Button.svelte';
	import OrgLogo from './OrgLogo.svelte';

	const i18n = getI18n();
</script>

<section class="hero" id="top" aria-labelledby="hero-title">
	<OrgLogo size={72} class="hero-logo" alt="" />
	<p class="eyebrow">{i18n.t('hero_eyebrow')}</p>
	<h1 id="hero-title">{i18n.t('org_name')}</h1>
	<p class="tagline">{i18n.t('tagline')}</p>
	<p class="pitch">{i18n.t('pitch')}</p>
	<div class="actions">
		<Button href="#projects" variant="primary">{i18n.t('hero_cta_projects')}</Button>
		<Button href={org.github} external>{i18n.t('hero_cta_github')}</Button>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		min-height: min(78dvh, 42rem);
		max-width: var(--content-max);
		margin: 0 auto;
		padding: calc(var(--section-pad-y) * 0.6) var(--section-pad-x) var(--section-pad-y);
	}

	:global(.hero-logo) {
		margin-bottom: 1.25rem;
		border-radius: 0.85rem;
		box-shadow: 0 8px 28px rgb(0 0 0 / 0.35);
	}

	.eyebrow {
		margin: 0 0 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--color-text-faint);
	}

	h1 {
		margin: 0 0 0.75rem;
		font-size: clamp(2.4rem, 7vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--color-text);
	}

	.tagline {
		margin: 0 0 1.25rem;
		font-size: clamp(1.15rem, 2.5vw, 1.35rem);
		font-weight: 500;
		line-height: 1.4;
		color: var(--color-text);
	}

	.pitch {
		max-width: 36rem;
		margin: 0 0 2rem;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-text-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	:global([dir='rtl']) h1 {
		letter-spacing: 0;
	}
</style>
