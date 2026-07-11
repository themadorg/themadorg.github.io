<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { preferLangClient } from '$lib/i18n.svelte';
	import { supportedLanguages } from '$lib/languages';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			goto(`/${preferLangClient()}`, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>TheMadOrg</title>
	<meta name="description" content="We care about communication" />
	<meta http-equiv="refresh" content="0;url=/en/" />
	<link rel="canonical" href="/en/" />
	{#each supportedLanguages as lang (lang.code)}
		<link rel="alternate" hreflang={lang.code} href={`/${lang.code}/`} />
	{/each}
</svelte:head>

<main class="fallback">
	<p>TheMadOrg</p>
	<nav aria-label="Languages">
		{#each supportedLanguages as lang (lang.code)}
			<a href={`/${lang.code}/`}>{lang.name}</a>
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
		font-family: var(--font-sans);
		color: var(--color-text);
		background: var(--color-bg);
	}

	p {
		margin: 0;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1.25rem;
	}

	a {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: 0.95rem;
	}

	a:hover {
		color: var(--color-text);
		text-decoration: underline;
	}
</style>
