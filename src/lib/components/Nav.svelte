<script lang="ts">
	import { org } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import OrgLogo from './OrgLogo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const i18n = getI18n();

	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 8;
	}
</script>

<svelte:window onscroll={onScroll} />

<header class="nav" class:scrolled>
	<div class="inner">
		<a href="#top" class="brand">
			<OrgLogo size={28} class="brand-logo" alt="" />
			<span class="name">{i18n.t('org_name')}</span>
		</a>

		<nav class="links" aria-label="Primary">
			<a href="#projects">{i18n.t('nav_projects')}</a>
			<a href="#principles">{i18n.t('nav_about')}</a>
			<a href={org.github} target="_blank" rel="noopener noreferrer">{i18n.t('nav_github')}</a>
			<LangSwitch />
			<ThemeToggle />
		</nav>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 40;
		border-bottom: 1px solid transparent;
		background: transparent;
		backdrop-filter: none;
		transition:
			background 0.2s,
			border-color 0.2s,
			backdrop-filter 0.2s;
	}

	.nav.scrolled {
		background: var(--color-nav-bg);
		border-bottom-color: var(--color-border);
		backdrop-filter: blur(12px);
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0.85rem var(--section-pad-x);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--color-text);
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.name {
		font-size: 0.95rem;
		letter-spacing: -0.02em;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.35rem 0.85rem;
	}

	.links a {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.15s;
	}

	.links a:hover {
		color: var(--color-text);
	}

	@media (max-width: 640px) {
		.name {
			display: none;
		}

		.links > a:not([href*='github']) {
			display: none;
		}
	}
</style>
