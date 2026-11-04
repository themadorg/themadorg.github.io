<script lang="ts">
	import Envelope from '$lib/components/Envelope.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Fund from '$lib/components/Fund.svelte';
	import Install from '$lib/components/Install.svelte';
	import Letter from '$lib/components/Letter.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Route from '$lib/components/Route.svelte';
	import StampSheet from '$lib/components/StampSheet.svelte';
	import { getI18n } from '$lib/i18n.svelte';

	const i18n = getI18n();
</script>

<a class="skip" href="#main">{i18n.t('skip_to_content')}</a>

<Nav />

<main id="main">
	<Envelope />
	<StampSheet />
	<Letter />
	<Route />
	<Install />
	<Fund />
	<Faq />
	<div class="end" aria-hidden="true"></div>
</main>

<Footer />

<style>
	.skip {
		position: absolute;
		inset-inline-start: -9999px;
		top: 0.75rem;
		z-index: 100;
		padding: 0.6rem 1rem;
		background: var(--red);
		color: var(--on-red);
		font-weight: 700;
		text-decoration: none;
	}

	.skip:focus {
		inset-inline-start: 0.75rem;
	}

	.end {
		height: var(--section-gap);
	}
</style>
