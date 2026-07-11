<script lang="ts">
	import { org } from '$lib/data/projects';
	import { getI18n, type TranslationKey } from '$lib/i18n.svelte';

	const i18n = getI18n();
	const year = new Date().getFullYear();

	type FooterLink =
		| { href: string; label: string }
		| { href: string; labelKey: TranslationKey };

	const links: FooterLink[] = [
		{ labelKey: 'nav_github', href: org.github },
		{ label: 'Madmail', href: 'https://madmail.chat' },
		{ label: 'Bedrud', href: 'https://bedrud.org' },
		{ label: 'Delta Chat Wiki', href: 'https://deltachat.wiki' }
	];

	function linkText(link: FooterLink): string {
		return 'labelKey' in link ? i18n.t(link.labelKey) : link.label;
	}
</script>

<footer class="footer">
	<div class="inner">
		<div class="brand-block">
			<p class="name">{i18n.t('org_name')}</p>
			<p class="tag">{i18n.t('tagline')}</p>
		</div>

		<nav class="links" aria-label="Footer">
			{#each links as link (link.href)}
				<a href={link.href} target="_blank" rel="noopener noreferrer">{linkText(link)}</a>
			{/each}
		</nav>

		<p class="note">{i18n.t('footer_note', { year })}</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
		padding: 2.5rem 0 2.75rem;
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0 var(--section-pad-x);
	}

	.name {
		margin: 0 0 0.25rem;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.tag {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem 1.25rem;
	}

	.links a {
		font-size: 0.875rem;
		color: var(--color-text-subtle);
		text-decoration: none;
	}

	.links a:hover {
		color: var(--color-text);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.note {
		margin: 0.25rem 0 0;
		font-size: 0.78rem;
		color: var(--color-text-faint);
	}
</style>
