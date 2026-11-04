<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { org } from '$lib/data/projects';
	import { langDir, supportedLanguages, type LangCode } from '$lib/languages';
	import { setI18n } from '$lib/i18n.svelte';
	import { jsonLd, ogImage, ogLocales, pageUrl, structuredData } from '$lib/seo';
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
			document.documentElement.lang = current;
			document.documentElement.dir = langDir(current);
		}
	});

	const dir = $derived(langDir(i18n.lang));
	const title = $derived(i18n.t('meta_title'));
	const description = $derived(i18n.t('meta_description'));
	const canonical = $derived(pageUrl(i18n.lang));
	const ogLocale = $derived(ogLocales[i18n.lang as LangCode]);
	const ldGraph = $derived(jsonLd(structuredData(i18n)));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	<meta name="author" content={org.name} />
	<link rel="canonical" href={canonical} />
	{#each supportedLanguages as lang (lang.code)}
		<link rel="alternate" hreflang={lang.code} href={pageUrl(lang.code)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl('en')} />
	<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content={org.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={ogLocale} />
	{#each supportedLanguages.filter((l) => l.code !== i18n.lang) as lang (lang.code)}
		<meta property="og:locale:alternate" content={ogLocales[lang.code]} />
	{/each}
	<meta property="og:image" content={ogImage.url} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(ogImage.width)} />
	<meta property="og:image:height" content={String(ogImage.height)} />
	<meta property="og:image:alt" content={`${org.name}: ${i18n.t('tagline')}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage.url} />
	<meta name="twitter:image:alt" content={`${org.name}: ${i18n.t('tagline')}`} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static, escaped JSON-LD built from our own data -->
	{@html ldGraph}
</svelte:head>

<div class="shell" {dir}>
	{@render children()}
</div>

<style>
	.shell {
		min-height: 100dvh;
	}
</style>
