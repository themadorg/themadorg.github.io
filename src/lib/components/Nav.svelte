<script lang="ts">
	import { org } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import OrgLogo from './OrgLogo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const i18n = getI18n();
	const mailto = $derived(`mailto:${org.email}?subject=${encodeURIComponent(i18n.t('fund_subject'))}`);
</script>

<header class="nav">
	<div class="inner">
		<a href="#top" class="brand" aria-label={i18n.t('nav_home')}>
			<OrgLogo size={34} alt="" class="brand-logo" />
			<span class="name">{i18n.t('org_name')}</span>
		</a>

		<nav class="links" aria-label="Primary">
			<a href="#projects">{i18n.t('nav_projects')}</a>
			<a href="#route">{i18n.t('nav_route')}</a>
			<a href="#fund">{i18n.t('nav_fund')}</a>
			<a href="#faq">{i18n.t('nav_faq')}</a>
			<a href={org.github} target="_blank" rel="noopener noreferrer">{i18n.t('nav_github')}</a>
		</nav>

		<div class="tools">
			<LangSwitch />
			<ThemeToggle />
			<a class="action write" href={mailto}>{i18n.t('nav_write')}</a>
		</div>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 40;
		background: var(--paper);
	}

	.inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		max-width: calc(var(--content-max) + 2 * var(--margin));
		margin-inline: auto;
		padding: 0.75rem var(--margin);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--ink);
		text-decoration: none;
	}

	.name {
		font-family: var(--font-display);
		font-size: var(--step-h3);
		font-weight: 800;
		line-height: 1;
		text-transform: uppercase;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.25rem 1.5rem;
		margin-inline-start: auto;
	}

	.links a {
		color: var(--ink);
		font-size: var(--step-small);
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.35em;
		transition: text-decoration-color var(--dur-ui) var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.links a:hover {
			text-decoration-color: var(--red);
		}
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.write {
		min-height: 2.5rem;
		padding: 0.5rem 1rem;
		font-size: var(--step-small);
	}

	@media (max-width: 1020px) {
		.links {
			display: none;
		}

		.tools {
			margin-inline-start: auto;
		}
	}

	@media (max-width: 480px) {
		.name {
			display: none;
		}

		.write {
			padding-inline: 0.75rem;
		}
	}
</style>
