<script lang="ts">
	import { projectGroups } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import ProjectCard from './ProjectCard.svelte';

	const i18n = getI18n();
</script>

<section class="projects" id="projects" aria-labelledby="projects-title">
	<div class="inner">
		<header class="section-head">
			<p class="eyebrow">{i18n.t('projects_eyebrow')}</p>
			<h2 id="projects-title">{i18n.t('projects_title')}</h2>
			<p class="lede">{i18n.t('projects_lede')}</p>
		</header>

		{#each projectGroups as group (group.id)}
			<div class="group" id={group.id}>
				<div class="group-head">
					<h3>{i18n.t(group.labelKey)}</h3>
					<p>{i18n.t(group.descKey)}</p>
				</div>
				<div class="grid" class:single={group.projects.length === 1}>
					{#each group.projects as project (project.name)}
						<ProjectCard {project} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.projects {
		border-top: 1px solid var(--color-border);
		padding: var(--section-pad-y) 0;
	}

	.inner {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0 var(--section-pad-x);
	}

	.section-head {
		max-width: 36rem;
		margin-bottom: 2.75rem;
	}

	.eyebrow {
		margin: 0 0 0.65rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--color-text-faint);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: clamp(1.6rem, 3.5vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.lede {
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text-muted);
	}

	.group {
		margin-bottom: 2.5rem;
	}

	.group:last-child {
		margin-bottom: 0;
	}

	.group-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem 1rem;
		margin-bottom: 1rem;
	}

	.group-head h3 {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-text);
	}

	.group-head p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-text-faint);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr));
		gap: 0.85rem;
	}

	.grid.single {
		grid-template-columns: 1fr;
		max-width: 36rem;
	}

	:global([dir='rtl']) h2 {
		letter-spacing: 0;
	}
</style>
