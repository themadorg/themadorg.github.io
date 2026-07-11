<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { org } from '$lib/data/projects';
	import { langDir, supportedLanguages } from '$lib/languages';
	import { setI18n } from '$lib/i18n.svelte';
	import { untrack } from 'svelte';

	let { children, data } = $props();

	const initialLang = untrack(() => data.lang);
	const i18n = setI18n(initialLang);

	$effect(() => {
		const urlLang = page.params.lang;
		if (urlLang) {
			i18n.syncFromUrl(urlLang);
		}

		if (browser) {
			const current = urlLang || i18n.lang;
			const dir = langDir(current);
			document.documentElement.lang = current;
			document.documentElement.dir = dir;
		}
	});

	const dir = $derived(langDir(i18n.lang));
	const title = $derived(`${i18n.t('org_name')} · ${i18n.t('tagline')}`);
	const description = $derived(i18n.t('pitch'));
	const canonical = $derived(`${org.site}/${i18n.lang}/`);
	const ogLocale = $derived(
		i18n.lang === 'fa' ? 'fa_IR' : i18n.lang === 'es' ? 'es_ES' : i18n.lang === 'ru' ? 'ru_RU' : 'en_US'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content={i18n.t('org_name')} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:image" content={`${org.site}/logo.png`} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${org.site}/logo.png`} />
	{#each supportedLanguages as lang (lang.code)}
		<link rel="alternate" hreflang={lang.code} href={`${org.site}/${lang.code}/`} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${org.site}/en/`} />
</svelte:head>

<div class="shell" {dir}>
	{@render children()}
</div>

<style>
	.shell {
		min-height: 100dvh;
		background: var(--color-bg);
		color: var(--color-text);
		transition: var(--transition-theme);
	}
</style>
