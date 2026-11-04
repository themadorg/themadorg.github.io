<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { getI18n, type TranslationKey } from '$lib/i18n.svelte';
	import StampFace from './StampFace.svelte';

	type Props = {
		project: Project;
		groupKey: TranslationKey;
		tone: 'red' | 'blue';
		/** Named area on the stamp sheet's grid. */
		area?: string;
		/** Printed landscape on the widest sheet: picture beside the text. */
		wide?: boolean;
	};
	let { project, groupKey, tone, area, wide = false }: Props = $props();

	const i18n = getI18n();
	const hasSite = $derived(project.href !== project.repo);
</script>

<article class={['stamp', project.featured && 'featured', wide && 'wide']} id={project.id} style:grid-area={area}>
	<div class="paper sheet">
		<div class="picture">
			{#if project.shot}
				<img
					src={project.shot}
					alt={i18n.t('shot_alt', { name: project.name })}
					width="880"
					height="660"
					loading="lazy"
					decoding="async"
				/>
				<span class="denomination">{project.language}</span>
			{:else}
				<StampFace id={project.id} language={project.language} {tone} />
			{/if}
		</div>

		<div class="body">
			<h3>
				<a class="main" href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a>
			</h3>
			<p class="blurb">{i18n.t(project.blurbKey)}</p>
			<p class="meta">
				<span class="issue">{i18n.t(groupKey)}</span>
				{#if project.license}<span>{project.license}</span>{/if}
				{#if project.status === 'wip'}<span class="wip">{i18n.t('status_wip')}</span>{/if}
			</p>
			<p class="links">
				<span class="go">{hasSite ? i18n.t('link_website') : i18n.t('link_repository')}</span>
				{#if hasSite}
					<a class="source" href={project.repo} target="_blank" rel="noopener noreferrer">
						{i18n.t('link_source')}
					</a>
				{/if}
			</p>
		</div>
	</div>
</article>

<style>
	/*
	 * One stamp on the sheet. Stamps butt together with no gap: the perforation
	 * is the gutter. Each stamp punches only its block-start row and inline-start
	 * column of holes; the sheet punches the outer end edges. In a complete tiling
	 * every shared edge is the start edge of exactly one stamp, so each gutter
	 * carries exactly one row of holes.
	 */
	.stamp {
		--hole: var(--paper-2);
		--pad: clamp(14px, 1.4vw, 18px);
		position: relative;
		z-index: 0;
		display: flex;
		min-width: 0;
		container-type: inline-size;
		transition:
			transform var(--dur-ui) var(--ease-out),
			opacity var(--dur-enter) var(--ease-out) var(--settle-delay, 0ms),
			translate var(--dur-enter) var(--ease-out) var(--settle-delay, 0ms),
			scale var(--dur-enter) var(--ease-out) var(--settle-delay, 0ms),
			rotate var(--dur-enter) var(--ease-out) var(--settle-delay, 0ms);
	}

	.paper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: var(--pad);
	}

	/* Perforation: round holes in the sheet's ground colour, centred on the edge. */
	.paper::before,
	.paper::after {
		content: '';
		position: absolute;
		z-index: 2;
		pointer-events: none;
	}

	.paper::before {
		inset-block-start: -5px;
		inset-inline: -5px 0;
		border-block-start: 10px dotted var(--hole);
	}

	.paper::after {
		inset-block: -5px 0;
		inset-inline-start: -5px;
		border-inline-start: 10px dotted var(--hole);
	}

	.picture {
		position: relative;
		flex: 0 0 auto;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--picture-backdrop);
	}

	.picture img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		/* Contain, never crop: the sites are dark, so a taller frame letterboxes
		   into the screen backdrop instead of cutting off their headlines. */
		object-fit: contain;
		object-position: center;
		transition: scale var(--dur-ui) var(--ease-out);
	}

	.denomination {
		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 0;
		padding: 0.3rem 0.6rem 0.35rem;
		background: var(--paper);
		color: var(--ink);
		font-family: var(--font-display);
		font-size: var(--step-lead);
		font-weight: 800;
		line-height: 1;
		text-transform: uppercase;
	}

	.body {
		display: flex;
		flex-direction: column;
		padding: 1rem 0.2rem 0.1rem;
	}

	.issue {
		color: var(--red);
		font-weight: 700;
	}

	h3 {
		font-size: var(--step-h3);
	}

	.featured h3 {
		font-size: var(--step-h2);
	}

	.main {
		text-decoration: none;
	}

	/* The whole stamp is the link; the source link sits above it. */
	.main::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	/* A featured stamp is stretched by its row of smaller neighbours: the picture
	   takes the slack. Small stamps let the text column take it, so names line up. */
	.featured .picture {
		flex-grow: 1;
	}

	/* The featured sites centre their content on a dark page, so a stretched
	   frame crops only empty sides. */
	.featured .picture img {
		object-fit: cover;
		object-position: top center;
	}

	.body {
		flex: 1 0 auto;
	}

	.featured .body {
		flex-grow: 0;
	}

	.blurb {
		flex: 1;
		margin-top: 0.6rem;
		font-size: var(--step-small);
		line-height: 1.5;
	}

	.featured .blurb {
		max-width: 34rem;
		font-size: var(--step-body);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.9rem;
		margin-top: 0.9rem;
		color: var(--ink-2);
		font-size: var(--step-small);
	}

	.wip {
		color: var(--blue);
		font-weight: 700;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		margin-top: 0.75rem;
		font-size: var(--step-small);
		font-weight: 700;
	}

	.go {
		text-decoration: underline;
		text-decoration-color: var(--red);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.3em;
	}

	.source {
		position: relative;
		z-index: 3;
		color: var(--ink-2);
	}

	/* A featured stamp printed wide (tablet): landscape, picture beside the text. */
	@container (min-width: 760px) {
		.featured .paper {
			flex-direction: row;
			gap: clamp(1.25rem, 3cqi, 2rem);
		}

		.featured .picture {
			flex: 0 0 56%;
		}

		.featured .body {
			flex: 1;
			justify-content: flex-end;
			padding-block: 0.2rem;
		}
	}

	@media (min-width: 1180px) {
		.wide .paper {
			flex-direction: row;
			gap: 1.25rem;
		}

		.wide .picture {
			flex: 0 0 58%;
		}

		.wide .body {
			flex: 1;
			padding-block: 0.1rem;
		}

		.wide .blurb {
			font-size: var(--step-body);
		}
	}

	.main:focus-visible {
		outline: none;
	}

	.stamp:has(.main:focus-visible) {
		z-index: 3;
	}

	.stamp:has(.main:focus-visible) .paper {
		outline: 3px solid var(--focus);
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.stamp:active {
			transform: scale(0.985);
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.source:hover {
			color: var(--ink);
		}
	}

	@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
		.stamp:hover {
			z-index: 3;
			transform: translateY(-4px) rotate(-0.6deg);
		}

		.stamp:hover:dir(rtl) {
			transform: translateY(-4px) rotate(0.6deg);
		}

		.stamp:hover .picture img {
			scale: 1.04;
		}
	}
</style>
