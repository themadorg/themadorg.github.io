<script lang="ts">
	import { org, roles, type Role } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import en from '$lib/i18n/en.json';
	import { cubicOut } from 'svelte/easing';
	import OrgLogo from './OrgLogo.svelte';
	import Postmark from './Postmark.svelte';

	const i18n = getI18n();

	let active = $state<Role>('funders');
	const current = $derived(roles.find((r) => r.id === active) ?? roles[0]);
	/** The funding subject line follows the page language, as in Nav and Fund. */
	const actionHref = $derived(
		current.id === 'funders'
			? `mailto:${org.email}?subject=${encodeURIComponent(i18n.t('fund_subject'))}`
			: current.actionHref
	);

	/**
	 * The cancellation names the org and what it ships. It is always struck in
	 * Latin letters: RTL text on a circular path does not shape reliably, and the
	 * mark is decorative (aria-hidden).
	 */
	const date = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date());
	const ringText = `${en.org_name} · ${org.makes.slice(0, 2).join(' · ')} · `;

	const tabs: HTMLButtonElement[] = [];

	function onTabKey(e: KeyboardEvent, index: number) {
		const rtl = i18n.dir === 'rtl';
		const next = rtl ? 'ArrowLeft' : 'ArrowRight';
		const prev = rtl ? 'ArrowRight' : 'ArrowLeft';
		let target = -1;
		if (e.key === next) target = (index + 1) % roles.length;
		else if (e.key === prev) target = (index - 1 + roles.length) % roles.length;
		else if (e.key === 'Home') target = 0;
		else if (e.key === 'End') target = roles.length - 1;
		if (target < 0) return;
		e.preventDefault();
		active = roles[target].id;
		tabs[target]?.focus();
	}

	/** Re-addressing: the new line settles in from a slight blur, never from nothing. */
	function readdress(_node: Element) {
		const reduce =
			typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
		return {
			duration: reduce ? 0 : 260,
			easing: cubicOut,
			css: (t: number) =>
				`opacity:${t};transform:translateY(${(1 - t) * 6}px);filter:blur(${(1 - t) * 3}px)`
		};
	}
</script>

<section class="envelope" id="top" aria-labelledby="hero-title">
	<div class="frame sheet">
		<div class="face">
			<p class="from">
				<span class="label">{i18n.t('env_from')}</span>
				<OrgLogo size={40} alt="" class="from-logo" />
				<span class="from-lines">
					<strong>{i18n.t('org_name')}</strong>
					<span dir="ltr">{org.makes.join(' · ')}</span>
				</span>
			</p>

			<div class="stamp-corner">
				<div class="stamp">
					<img src="/logo.png" alt={i18n.t('env_stamp_alt')} width="512" height="512" />
				</div>
				<Postmark class="postmark" top={ringText} {date} mirrored={i18n.dir === 'rtl'} />
			</div>

			<div class="address">
				<h1 id="hero-title">{i18n.t('tagline')}</h1>
				<p class="pitch">{i18n.t('pitch')}</p>

				<div class="to">
					<p class="to-head">
						<span class="label">{i18n.t('env_to')}</span>
						<span class="sr-only">{i18n.t('env_choose')}</span>
					</p>
					<div class="tabs" role="tablist" aria-label={i18n.t('env_choose')}>
						{#each roles as role, i (role.id)}
							<button
								bind:this={tabs[i]}
								type="button"
								role="tab"
								id="role-tab-{role.id}"
								aria-selected={active === role.id}
								aria-controls="role-panel"
								tabindex={active === role.id ? 0 : -1}
								onclick={() => (active = role.id)}
								onkeydown={(e) => onTabKey(e, i)}
							>
								{i18n.t(role.labelKey)}
							</button>
						{/each}
					</div>

					<div
						class="panel"
						id="role-panel"
						role="tabpanel"
						aria-labelledby="role-tab-{current.id}"
					>
						{#key current.id}
							<div class="panel-inner" in:readdress>
								<p class="line">{i18n.t(current.lineKey)}</p>
								<div class="actions">
									<a class="action" href={actionHref}>
										{i18n.t(current.actionKey)}
										<svg class="arrow" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
											<path
												d="M3 9h11M10 4.5 14.5 9 10 13.5"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="square"
											/>
										</svg>
									</a>
									<a
										class="textlink"
										href={current.altHref}
										{...current.altHref.startsWith('http')
											? { target: '_blank', rel: 'noopener noreferrer' }
											: {}}
									>
										{i18n.t(current.altKey)}
									</a>
								</div>
							</div>
						{/key}
					</div>
				</div>
			</div>

			<p class="par-avion" aria-hidden="true">
				<span class="pa-main">{i18n.t('env_airmail')}</span>
				<span class="pa-sub">{i18n.t('env_airmail_sub')}</span>
			</p>
		</div>
	</div>
</section>

<style>
	.envelope {
		padding: 0 var(--margin) var(--margin);
	}

	/* The airmail border: diagonal red and blue bands on every edge. */
	.frame {
		max-width: var(--content-max);
		margin-inline: auto;
		padding: clamp(10px, 1.2vw, 16px);
		background: var(--paper) var(--airmail);
		background-size: 40px 40px;
	}

	.face {
		position: relative;
		display: grid;
		/* Laid out like a real envelope: sender and airmail label top-left, stamp
		   top-right, the message large on the left, the delivery address
		   (who this is to) lower right. Even halves: the headline runs across
		   both (its own 12ch cap sets the measure), and the address needs the
		   room for four role tabs on one line in Persian and Russian. */
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: auto auto 1fr auto;
		grid-template-areas:
			'from  stamp'
			'par   stamp'
			'h1    h1'
			'pitch to';
		gap: 1.5rem clamp(1.5rem, 4vw, 4rem);
		min-height: min(calc(100svh - 5.25rem), 58rem);
		padding: clamp(1.25rem, 3vw, 2.75rem);
		background: var(--paper);
	}

	.label {
		display: block;
		font-family: var(--font-display);
		font-size: var(--step-lead);
		font-weight: 800;
		text-transform: uppercase;
		color: var(--red);
	}

	.from {
		grid-area: from;
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		align-content: start;
		justify-content: start;
		column-gap: 0.75rem;
		font-size: var(--step-small);
		line-height: 1.3;
	}

	.from .label {
		grid-column: 1 / -1;
		margin-bottom: 0.4rem;
	}

	.from-lines {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.from-lines strong {
		font-size: var(--step-body);
	}

	.from-lines span {
		color: var(--ink-2);
	}

	/* Stamp: perforated by a dotted border in the envelope's own colour. */
	.stamp-corner {
		grid-area: stamp;
		position: relative;
		align-self: start;
		justify-self: end;
		width: clamp(9rem, 15vw, 14rem);
		margin-block-start: 0.5rem;
		margin-inline-end: 0.75rem;
	}

	.stamp {
		position: relative;
		padding: clamp(10px, 1.2vw, 16px);
		background: var(--paper-2);
		rotate: 4deg;
	}

	.stamp::before {
		content: '';
		position: absolute;
		inset: -5px;
		border: 10px dotted var(--paper);
		pointer-events: none;
	}

	/* The printed frame inside the perforation gives the stamp its edge on white paper. */
	.stamp img {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		padding: 6%;
		border: 3px solid var(--red-field);
		background: var(--slip-paper);
	}

	.stamp-corner :global(.postmark) {
		position: absolute;
		top: 58%;
		/* Physical, not logical: the SVG is forced LTR so its Latin text reads right. */
		right: 42%;
		width: 150%;
		color: var(--ink);
		opacity: 0.82;
		pointer-events: none;
		rotate: -8deg;
		mix-blend-mode: multiply;
	}

	:dir(rtl) .stamp-corner :global(.postmark) {
		right: auto;
		left: 42%;
		rotate: 8deg;
	}

	@media (prefers-reduced-motion: no-preference) {
		:global(.js) .stamp {
			animation: stamp-in 700ms var(--ease-out) 120ms both;
		}

		:global(.js) .stamp-corner :global(.postmark) {
			animation: cancel 520ms var(--ease-out) 620ms both;
		}
	}

	@keyframes stamp-in {
		from {
			opacity: 0;
			transform: translateY(-14px) rotate(-6deg);
		}
	}

	@keyframes cancel {
		from {
			opacity: 0;
			transform: scale(1.18);
		}
	}

	/* The address wrapper hands its parts straight to the envelope grid. */
	.address {
		display: contents;
	}

	h1 {
		grid-area: h1;
		align-self: end;
		margin-top: clamp(1.5rem, 4vw, 3rem);
	}

	h1 {
		font-size: var(--step-display);
		max-width: 12ch;
	}

	/* ch is measured on the Latin display face, far narrower than Persian letters. */
	:lang(fa) h1 {
		max-width: 8em;
	}

	.pitch {
		grid-area: pitch;
		align-self: start;
		max-width: 40rem;
		font-size: var(--step-lead);
		line-height: 1.5;
	}

	.to {
		grid-area: to;
		align-self: end;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.75rem 1.5rem;
		align-items: baseline;
		max-width: 44rem;
		padding-top: 1.25rem;
		border-top: 3px solid var(--ink);
	}

	.to-head {
		grid-row: 1 / span 2;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.1rem;
	}

	[role='tab'] {
		position: relative;
		padding: 0.35rem 0 0.45rem;
		border: 0;
		background: none;
		color: var(--ink-2);
		font-size: var(--step-body);
		font-weight: 700;
		cursor: pointer;
		transition: color var(--dur-ui) var(--ease-out);
	}

	[role='tab']::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		height: 3px;
		background: var(--red);
		transform: scaleX(0);
		transform-origin: var(--origin, left);
		transition: transform var(--dur-ui) var(--ease-out);
	}

	:dir(rtl) [role='tab']::after {
		--origin: right;
	}

	[role='tab'][aria-selected='true'] {
		color: var(--ink);
	}

	[role='tab'][aria-selected='true']::after {
		transform: scaleX(1);
	}

	[role='tab']:active {
		transform: scale(0.97);
	}

	@media (hover: hover) and (pointer: fine) {
		[role='tab']:hover {
			color: var(--ink);
		}
	}

	.panel {
		grid-column: 2;
		display: grid;
		min-height: 7.25rem;
	}

	.panel-inner {
		grid-area: 1 / 1;
	}

	.line {
		max-width: 34rem;
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem 1.75rem;
	}

	/* The blue airmail label, stuck on slightly crooked. */
	.par-avion {
		grid-area: par;
		justify-self: start;
		align-self: start;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.55rem 1rem 0.6rem;
		background: var(--blue-field);
		color: var(--blue-field-ink);
		line-height: 1;
		rotate: -2deg;
	}

	.pa-main {
		font-family: var(--font-display);
		font-size: var(--step-h3);
		font-weight: 800;
		text-transform: uppercase;
	}

	.pa-sub {
		margin-top: 0.2rem;
		font-size: var(--step-small);
		font-weight: 600;
	}

	/* Laptop widths: the address label moves above the role tabs so all four
	   fit on one line in every language; when even that is too narrow they set
	   as a tidy two-by-two instead of stranding one tab on a second line. */
	@media (max-width: 1360px) and (min-width: 901px) {
		.to {
			grid-template-columns: minmax(0, 1fr);
		}

		.to-head {
			grid-row: auto;
		}

		.panel {
			grid-column: 1;
		}
	}

	@media (max-width: 1140px) and (min-width: 901px) {
		.tabs {
			display: grid;
			grid-template-columns: repeat(2, max-content);
		}
	}

	@media (max-width: 900px) {
		.face {
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-rows: auto;
			grid-template-areas:
				'from  stamp'
				'par   par'
				'h1    h1'
				'pitch pitch'
				'to    to';
			min-height: auto;
		}

		.stamp-corner {
			width: clamp(6.5rem, 26vw, 9rem);
			align-self: start;
			margin-block-start: 0;
			margin-inline-end: 0.5rem;
		}
	}

	@media (max-width: 640px) {
		/* Return address up top, delivery address well below it, as on a real envelope. */
		.face {
			gap: 3.5rem 1rem;
		}

		.from {
			grid-template-columns: auto;
		}

		.from :global(.from-logo) {
			display: none;
		}

		/* A smaller strike that stays on the stamp's side, and a return address
		   that wraps short of it, so the two never overprint. */
		.stamp-corner :global(.postmark) {
			top: 62%;
			right: 30%;
			width: 112%;
		}

		:dir(rtl) .stamp-corner :global(.postmark) {
			right: auto;
			left: 30%;
		}

		.from-lines span {
			max-width: 8.5rem;
		}

		.to {
			grid-template-columns: 1fr;
		}

		.to-head {
			grid-row: auto;
		}

		.panel {
			grid-column: 1;
			min-height: 10rem;
		}
	}
</style>
