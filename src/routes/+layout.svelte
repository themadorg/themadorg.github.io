<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" type="image/png" sizes="48x48" />
	<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
	<link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#14161b" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
</svelte:head>

{@render children()}
