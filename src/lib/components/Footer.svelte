<script lang="ts">
	import { allProjects, org } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import { supportedLanguages } from '$lib/languages';

	const i18n = getI18n();
	const year = new Date().getFullYear();
	const sites = allProjects.filter((p) => p.href !== p.repo);
	const githubLabel = org.github.replace(/^https?:\/\//, '');
	// Keep "(AGPL / GPL / LGPL)" on one line: a break inside it scatters the
	// brackets, worst of all in an RTL paragraph.
	const note = $derived(i18n.t('footer_note', { year }).replace(/ \/ /g, '\u00a0/\u00a0'));
</script>

<!--
	The back of the envelope. The page closes the way a letter does: turned
	over on the desk, the sender's address printed on the flap.
-->
<footer class="footer">
	<div class="wrap">
		<div class="desk">
			<div class="back sheet">
				<div class="paper">
					<span class="fold fold-bottom" aria-hidden="true"></span>
					<span class="fold fold-top" aria-hidden="true"></span>

					<div class="return">
						<h2 class="return-title" id="footer-return">{i18n.t('footer_return')}</h2>
						<address aria-labelledby="footer-return">
							<strong class="return-name">{i18n.t('org_name')}</strong>
							<a class="return-link" href="mailto:{org.email}" dir="ltr">{org.email}</a>
							<a class="return-link" href={org.github} target="_blank" rel="noopener noreferrer" dir="ltr"
								>{githubLabel}</a
							>
							<span class="return-motto">{i18n.t('tagline')}</span>
						</address>
					</div>
				</div>
			</div>

			<div class="lists">
				<nav class="list" aria-labelledby="footer-projects">
					<h2 class="list-title" id="footer-projects">{i18n.t('footer_projects')}</h2>
					<ul>
						{#each sites as p (p.id)}
							<li><a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a></li>
						{/each}
					</ul>
				</nav>

				<nav class="list" aria-labelledby="footer-org">
					<h2 class="list-title" id="footer-org">{i18n.t('footer_org')}</h2>
					<ul>
						<li><a href="#fund">{i18n.t('nav_fund')}</a></li>
						<li><a href="#faq">{i18n.t('nav_faq')}</a></li>
						<li>
							<a href={org.siteRepo} target="_blank" rel="noopener noreferrer">{i18n.t('link_source')}</a>
						</li>
					</ul>
				</nav>

				<nav class="list list-lang" aria-labelledby="footer-lang">
					<h2 class="list-title" id="footer-lang">{i18n.t('footer_languages')}</h2>
					<ul>
						{#each supportedLanguages as lang (lang.code)}
							<li>
								<a
									href="/{lang.code}/"
									hreflang={lang.code}
									lang={lang.code}
									aria-current={lang.code === i18n.lang ? 'page' : undefined}
									data-sveltekit-reload
								>
									{lang.name}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>

		<div class="notes">
			<p>{note}</p>
			<p>{i18n.t('footer_screens')}</p>
			<a href="#top" class="top">
				<svg class="top-arrow" viewBox="0 0 12 14" width="12" height="14" aria-hidden="true">
					<path d="M6 13V2M1.5 6.5 6 2l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" />
				</svg>
				{i18n.t('footer_top')}
			</a>
		</div>
	</div>
</footer>

<style>
	/* The desk the envelope is turned over on: near-black in both themes.
	   A dark scheme makes every light-dark() token inside resolve dark;
	   the envelope itself is .sheet, so its paper stays paper. */
	.footer {
		color-scheme: dark;
		padding-block: clamp(4rem, 3rem + 4vw, 6.5rem) 2rem;
		background: #0c0e12;
		color: var(--ink);
	}

	.desk {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: clamp(2.5rem, 5vw, 5rem);
		align-items: center;
	}

	/* ---- The envelope back -------------------------------------------- */

	/* The airmail band runs round the back just as it does round the face. */
	.back {
		container-type: inline-size;
		padding: clamp(8px, 1vw, 14px);
		background: var(--paper) var(--airmail);
		background-size: 40px 40px;
		rotate: -0.8deg;
	}

	:dir(rtl) .back {
		rotate: 0.8deg;
	}

	/* Three folds in three paper tones, no lines and no shading: the side
	   flaps (deepest), the bottom flap over them, the top flap over all. */
	.paper {
		--shoulder: 9%;
		--tip: 68%;
		position: relative;
		display: grid;
		justify-items: center;
		aspect-ratio: 2 / 1;
		background: var(--paper-3);
	}

	.fold {
		position: absolute;
		inset: 0;
	}

	.fold-bottom {
		background: var(--paper-2);
		clip-path: polygon(0 100%, 50% 40%, 100% 100%);
	}

	.fold-top {
		background: var(--paper);
		clip-path: polygon(0 0, 100% 0, 100% var(--shoulder), 50% var(--tip), 0 var(--shoulder));
	}

	/* The flap is shaped by the envelope's own width, not the window's: a
	   narrower envelope gets a deeper flap with longer shoulders, so the
	   address always stays printed on the flap and never runs over a fold. */
	@container (max-width: 720px) {
		.paper {
			--shoulder: 18%;
			--tip: 76%;
			aspect-ratio: 8 / 5;
		}
	}

	@container (max-width: 480px) {
		.paper {
			--shoulder: 34%;
			--tip: 84%;
			aspect-ratio: 6 / 5;
		}
	}

	/* Printed on the flap, centred, the way a sender's address is. The lines
	   step in as the flap narrows, the motto last in capitals. */
	.return {
		position: relative;
		align-self: start;
		display: grid;
		align-content: start;
		justify-items: center;
		padding-block: clamp(1.5rem, 3.4vw, 3.25rem) 0;
		padding-inline: 1rem;
		text-align: center;
	}

	.return-title {
		font-size: var(--step-lead);
		color: var(--red);
	}

	address {
		display: grid;
		justify-items: center;
		gap: 0.3rem;
		margin-block-start: 0.7rem;
		font-style: normal;
		line-height: 1.4;
	}

	.return-name {
		font-size: var(--step-lead);
		font-weight: 700;
	}

	.return-link {
		font-weight: 600;
		text-decoration-color: var(--red);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.22em;
	}

	.return-motto {
		margin-block-start: 0.2rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:lang(fa) .return-motto {
		letter-spacing: 0;
	}

	@media (hover: hover) and (pointer: fine) {
		.return-link:hover {
			text-underline-offset: 0.36em;
		}
	}

	/* ---- Lists on the desk -------------------------------------------- */

	.lists {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, auto));
		justify-content: space-between;
		gap: 2.5rem 2rem;
		align-self: center;
	}

	.list-title {
		margin-block-end: 1rem;
		font-size: var(--step-lead);
		color: var(--red);
	}

	ul {
		display: grid;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.list a {
		text-decoration-color: transparent;
	}

	.list a[aria-current='page'] {
		text-decoration-color: var(--red);
	}

	@media (hover: hover) and (pointer: fine) {
		.list a:hover {
			text-decoration-color: var(--red);
		}
	}

	/* ---- Notes -------------------------------------------------------- */

	.notes {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		margin-block-start: clamp(3.5rem, 6vw, 5.5rem);
		padding-block-start: 1.5rem;
		border-block-start: 1px solid color-mix(in oklab, var(--ink) 16%, transparent);
		font-size: var(--step-small);
	}

	.notes p {
		color: var(--ink-2);
	}

	.top {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-weight: 700;
		text-decoration-color: var(--red);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.3em;
		transition: scale var(--dur-press) var(--ease-out);
	}

	.top-arrow {
		color: var(--red);
		transition: transform var(--dur-ui) var(--ease-out);
	}

	.top:active {
		scale: 0.97;
	}

	@media (hover: hover) and (pointer: fine) {
		.top:hover .top-arrow {
			transform: translateY(-3px);
		}
	}

	/* ---- Narrower desks ----------------------------------------------- */

	@media (max-width: 1100px) {
		.desk {
			grid-template-columns: minmax(0, 1fr);
		}

		.back {
			justify-self: center;
			width: min(100%, 50rem);
		}

		.lists {
			justify-content: start;
			column-gap: clamp(2rem, 8vw, 6rem);
		}
	}

	@media (max-width: 640px) {
		.lists {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			column-gap: 1.5rem;
		}

		/* Four languages read as one row rather than an orphaned column. */
		.list-lang {
			grid-column: 1 / -1;
		}

		.list-lang ul {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem 1.5rem;
		}

		.notes {
			flex-direction: column;
			align-items: start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.top,
		.top-arrow {
			transition: none;
		}

		.top:active {
			scale: none;
		}

		.top:hover .top-arrow {
			transform: none;
		}
	}
</style>
