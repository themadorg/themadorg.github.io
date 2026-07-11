<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';

	let { project }: { project: Project } = $props();

	const i18n = getI18n();
	const externalSite = $derived(project.href !== project.repo);
</script>

<article class="card" class:featured={project.featured}>
	<div class="top">
		<div class="title-row">
			{#if project.logo}
				<img
					class="logo"
					src={project.logo}
					alt=""
					width="40"
					height="40"
					decoding="async"
					loading="lazy"
				/>
			{/if}
			<h3>
				<a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a>
			</h3>
		</div>
		<div class="meta">
			<span class="lang">{project.language}</span>
			{#if project.status === 'wip'}
				<span class="wip">{i18n.t('status_wip')}</span>
			{/if}
		</div>
	</div>
	<p>{i18n.t(project.blurbKey)}</p>
	<div class="links">
		<a href={project.href} target="_blank" rel="noopener noreferrer">
			{externalSite ? i18n.t('link_website') : i18n.t('link_repository')}
			<span aria-hidden="true">→</span>
		</a>
		{#if externalSite}
			<a class="secondary" href={project.repo} target="_blank" rel="noopener noreferrer">
				{i18n.t('link_source')}
			</a>
		{/if}
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.25rem 1.3rem;
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		background: var(--color-surface);
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.card:hover {
		border-color: var(--color-border-strong);
		background: var(--color-surface-raised);
	}

	.card.featured {
		border-color: var(--color-border-strong);
	}

	.top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
	}

	.logo {
		display: block;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		object-fit: contain;
		flex-shrink: 0;
		background: #0a0a0a;
	}

	h3 {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	h3 a {
		text-decoration: none;
		color: var(--color-text);
	}

	h3 a:hover {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.meta {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.4rem;
		padding-top: 0.2rem;
	}

	.lang {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--color-text-faint);
	}

	.wip {
		padding: 0.12rem 0.4rem;
		border-radius: 999px;
		background: var(--color-accent-soft);
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	p {
		margin: 0;
		flex: 1;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-text-muted);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
		margin-top: 0.15rem;
	}

	.links a {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text);
		text-decoration: none;
	}

	.links a:hover {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.links a.secondary {
		color: var(--color-text-subtle);
		font-weight: 400;
	}

	:global([dir='rtl']) .links a span {
		display: inline-block;
		transform: scaleX(-1);
	}
</style>
