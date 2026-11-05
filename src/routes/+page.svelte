<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { preferLangClient } from '$lib/i18n.svelte';
	import { defaultLang, supportedLanguages } from '$lib/languages';
	import { pageUrl } from '$lib/seo';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			goto(`/${preferLangClient()}/`, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>TheMadOrg</title>
	<meta name="description" content="TheMadOrg builds open-source, self-hosted communication infrastructure." />
	<meta name="robots" content="noindex, follow" />
	<noscript><meta http-equiv="refresh" content="0;url=/en/" /></noscript>
	<link rel="canonical" href={pageUrl(defaultLang)} />
	{#each supportedLanguages as lang (lang.code)}
		<link rel="alternate" hreflang={lang.code} href={pageUrl(lang.code)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl(defaultLang)} />
</svelte:head>

<main class="fallback">
	<p>TheMadOrg</p>
	<nav aria-label="Languages">
		{#each supportedLanguages as lang (lang.code)}
			<a href={`/${lang.code}/`} lang={lang.code} hreflang={lang.code}>{lang.name}</a>
		{/each}
	</nav>
</main>

<style>
	.fallback {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		min-height: 100dvh;
		padding: 2rem;
		background: var(--paper);
		color: var(--ink);
	}

	p {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--step-h3);
		font-weight: 800;
		text-transform: uppercase;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1.25rem;
	}

	a {
		color: var(--ink-2);
		font-size: var(--step-small);
	}
</style>
