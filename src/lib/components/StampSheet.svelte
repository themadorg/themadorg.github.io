<script lang="ts">
	import { projectGroups } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import Stamp from './Stamp.svelte';

	const i18n = getI18n();

	/*
	 * The plate: every stamp's place on the sheet, in reading order (row by row at
	 * the widest layout), so tab order follows the eye. Featured stamps take a
	 * double block; the CSS grid areas below set the composition per width.
	 */
	const plate: ReadonlyArray<{ id: string; area: string; tone: 'red' | 'blue'; wide?: boolean }> = [
		{ id: 'madmail', area: 'madmail', tone: 'red' },
		{ id: 'madexchanger', area: 'mx', tone: 'blue' },
		{ id: 'madexchanger-php', area: 'mxphp', tone: 'red' },
		{ id: 'relay-ping', area: 'ping', tone: 'red' },
		{ id: 'madcore', area: 'core', tone: 'blue' },
		{ id: 'madmail-admin', area: 'admin', tone: 'blue', wide: true },
		{ id: 'deltachat-wiki', area: 'wiki', tone: 'red', wide: true },
		{ id: 'bedrud', area: 'bedrud', tone: 'blue' }
	];

	const all = projectGroups.flatMap((g) => g.projects.map((project) => ({ project, group: g })));
	const placed = plate.flatMap((slot) => {
		const hit = all.find((s) => s.project.id === slot.id);
		return hit ? [{ ...hit, ...slot }] : [];
	});

	/* One entrance for the section: each stamp settles onto the sheet as it comes
	   into view. Stamps arriving together are laid down one after another. */
	function settle(node: HTMLElement) {
		const stamps = Array.from(node.children) as HTMLElement[];
		const lay = (el: HTMLElement) => (el.dataset.settled = '');

		if (typeof IntersectionObserver === 'undefined') {
			stamps.forEach(lay);
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				let n = 0;
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const el = entry.target as HTMLElement;
					el.style.setProperty('--settle-delay', `${n++ * 70}ms`);
					lay(el);
					io.unobserve(el);
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
		);
		stamps.forEach((el) => io.observe(el));

		return {
			destroy() {
				io.disconnect();
			}
		};
	}
</script>

<section class="projects" id="projects" aria-labelledby="projects-title">
	<div class="wrap">
		<header class="head">
			<h2 id="projects-title">{i18n.t('projects_title')}</h2>
			<p>{i18n.t('projects_lede')}</p>
		</header>

		<div class="selvage sheet">
			<!-- Margin marks: plate numbers, colour checks, registration targets and the
			     centre-line arrows a printer leaves on a sheet. Decorative, Latin everywhere. -->
			<div class="marks" aria-hidden="true" lang="en">
				<span class="mark plate-no top">
					TMO 1
					<span class="check red"></span>
					<span class="check blue"></span>
				</span>
				<span class="mark plate-no bottom">TMO 1</span>
				<svg class="mark target top" viewBox="0 0 20 20">
					<circle cx="10" cy="10" r="5.5" />
					<path d="M10 0V20M0 10H20" />
				</svg>
				<svg class="mark target bottom" viewBox="0 0 20 20">
					<circle cx="10" cy="10" r="5.5" />
					<path d="M10 0V20M0 10H20" />
				</svg>
				<svg class="mark arrow top" viewBox="0 0 16 10"><path d="M0 0H16L8 10Z" /></svg>
				<svg class="mark arrow bottom" viewBox="0 0 16 10"><path d="M0 10H16L8 0Z" /></svg>
			</div>

			<div class="plate" use:settle>
				{#each placed as s (s.project.id)}
					<Stamp project={s.project} groupKey={s.group.labelKey} tone={s.tone} area={s.area} wide={s.wide} />
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.projects {
		padding-block: var(--section-gap) 0;
	}

	.head {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 1.5rem clamp(2.5rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: clamp(2rem, 4vw, 3.5rem);
	}

	h2 {
		font-size: var(--step-h2);
	}

	.head p {
		max-width: 36rem;
		font-size: var(--step-lead);
	}

	/*
	 * One sheet of stamps. The selvage is the sheet's margin in the second paper
	 * tone; the perforation holes are punched in that same tone, so they read as
	 * holes through to the margin's ground in both themes.
	 */
	.selvage {
		--selvage: clamp(1.75rem, 3.2vw, 3rem);
		position: relative;
		padding: var(--selvage);
		background: var(--paper-2);
	}

	.plate {
		--hole: var(--paper-2);
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-areas:
			'madmail madmail mx    mxphp'
			'madmail madmail ping  core'
			'admin   admin   bedrud bedrud'
			'wiki    wiki    bedrud bedrud';
		gap: 0;
	}

	/* The sheet punches the outer end edges; stamps punch their own start edges. */
	.plate::after {
		content: '';
		position: absolute;
		inset-block: 0 -5px;
		inset-inline: 0 -5px;
		z-index: 4;
		border-block-end: 10px dotted var(--hole);
		border-inline-end: 10px dotted var(--hole);
		pointer-events: none;
	}

	@media (max-width: 1179px) {
		.plate {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-areas:
				'madmail madmail'
				'mx      mxphp'
				'ping    core'
				'admin   wiki'
				'bedrud  bedrud';
		}

		.head {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 699px) {
		.plate {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'madmail' 'mx' 'mxphp' 'ping' 'core' 'admin' 'wiki' 'bedrud';
		}
	}

	/* Margin marks, all sitting centred in the selvage band. */
	.mark {
		position: absolute;
		color: var(--ink-2);
	}

	.plate-no {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		block-size: var(--selvage);
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		line-height: 1;
		white-space: nowrap;
	}

	.plate-no.top {
		inset-block-start: 0;
		inset-inline-start: var(--selvage);
	}

	.plate-no.bottom {
		inset-block-end: 0;
		inset-inline-end: var(--selvage);
	}

	.check {
		inline-size: 0.6rem;
		block-size: 0.6rem;
	}

	.check.red {
		margin-inline-start: 0.35rem;
		background: var(--red-field);
	}

	.check.blue {
		background: var(--blue-field);
	}

	.target {
		inline-size: 1rem;
		block-size: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.25;
	}

	.target.top {
		inset-block-start: calc((var(--selvage) - 1rem) / 2);
		inset-inline-end: var(--selvage);
	}

	.target.bottom {
		inset-block-end: calc((var(--selvage) - 1rem) / 2);
		inset-inline-start: var(--selvage);
	}

	/* Centre-line arrows: they point at the sheet's middle gutter. */
	.arrow {
		inset-inline: 0;
		inline-size: 0.75rem;
		block-size: 0.5rem;
		margin-inline: auto;
		fill: currentColor;
	}

	.arrow.top {
		inset-block-start: calc(var(--selvage) - 0.5rem - 6px);
	}

	.arrow.bottom {
		inset-block-end: calc(var(--selvage) - 0.5rem - 6px);
	}

	@media (max-width: 699px) {
		.arrow {
			display: none;
		}
	}

	/* Entrance: stamps settle onto the sheet. Visible by default; only scripted,
	   motion-tolerant screens start them lifted (never in print). */
	@media screen and (prefers-reduced-motion: no-preference) {
		:global(.js) .plate > :global(.stamp:not([data-settled])) {
			opacity: 0;
			translate: 0 -14px;
			scale: 1.03;
			rotate: -1.2deg;
		}

		:global(.js) .plate > :global(.stamp:not([data-settled]):dir(rtl)) {
			rotate: 1.2deg;
		}
	}
</style>
