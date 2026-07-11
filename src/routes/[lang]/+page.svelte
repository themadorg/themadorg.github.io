<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Principles from '$lib/components/Principles.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import { getI18n } from '$lib/i18n.svelte';

	const i18n = getI18n();
</script>

<a class="skip" href="#main">{i18n.t('skip_to_content')}</a>

<Nav />

<main id="main">
	<Hero />
	<ProjectGrid />
	<Principles />
</main>

<Footer />

<style>
	.skip {
		position: absolute;
		inset-inline-start: -9999px;
		top: 0.75rem;
		z-index: 100;
		padding: 0.5rem 0.85rem;
		border-radius: 0.4rem;
		background: var(--color-btn-primary-bg);
		color: var(--color-btn-primary-fg);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
	}

	.skip:focus {
		inset-inline-start: 0.75rem;
	}
</style>
