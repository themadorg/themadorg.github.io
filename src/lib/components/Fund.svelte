<script lang="ts">
	import { org } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';

	const i18n = getI18n();
	const mailto = $derived(`mailto:${org.email}?subject=${encodeURIComponent(i18n.t('fund_subject'))}`);
	const [local, domain] = org.email.split('@');
</script>

<section class="fund" id="fund" aria-labelledby="fund-title">
	<div class="wrap grid">
		<div class="main">
			<h2 id="fund-title">{i18n.t('fund_title')}</h2>
			<p class="body">{i18n.t('fund_body')}</p>
			<a class="address" href={mailto} dir="ltr">
				<span>{local}</span><wbr /><span>@{domain}</span>
			</a>
		</div>

		<aside class="slip sheet" aria-labelledby="fund-review-title">
			<p class="registered" aria-hidden="true">
				<span class="r">R</span>
				<span class="r-text">{i18n.t('fund_registered')}</span>
			</p>
			<h3 id="fund-review-title">{i18n.t('fund_review_title')}</h3>
			<ul>
				<li>{i18n.t('fund_review_code')}</li>
				<li>{i18n.t('fund_review_licenses')}</li>
				<li>{i18n.t('fund_review_live')}</li>
			</ul>
			<a class="gh" href={org.github} target="_blank" rel="noopener noreferrer">
				{i18n.t('fund_github')}
			</a>
		</aside>
	</div>
</section>

<style>
	/* The one fully committed field: registered mail, in brand red, edge to edge. */
	.fund {
		margin-top: var(--section-gap);
		padding-block: clamp(4.5rem, 3rem + 6vw, 8.5rem);
		background: var(--red-field);
		color: var(--red-field-ink);
	}

	.fund ::selection {
		background: var(--red-field-ink);
		color: var(--red-field);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
		gap: clamp(2.5rem, 6vw, 6rem);
		align-items: end;
	}

	/* The column sets the measure; balance keeps long Spanish and Russian
	   words from stranding one per line. */
	h2 {
		font-size: var(--step-display);
		text-wrap: balance;
	}

	@media (max-width: 640px) {
		h2 {
			font-size: var(--step-h2);
		}
	}

	.body {
		max-width: 38rem;
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		font-size: var(--step-lead);
		line-height: 1.5;
	}

	.address {
		display: inline-block;
		margin-top: clamp(2rem, 4vw, 3.25rem);
		font-family: var(--font-display);
		font-size: var(--step-h2);
		font-weight: 800;
		line-height: 0.95;
		text-decoration: underline;
		text-decoration-thickness: 0.06em;
		text-underline-offset: 0.12em;
		overflow-wrap: anywhere;
		transition: text-underline-offset var(--dur-ui) var(--ease-out);
	}

	.address:focus-visible {
		outline-color: var(--red-field-ink);
	}

	@media (hover: hover) and (pointer: fine) {
		.address:hover {
			text-underline-offset: 0.2em;
		}
	}

	/* The registered-mail slip. */
	.slip {
		padding: clamp(1.5rem, 3vw, 2.25rem);
		background: var(--slip-paper);
		color: var(--slip-ink);
		rotate: 1.5deg;
	}

	:dir(rtl) .slip {
		rotate: -1.5deg;
	}

	.registered {
		display: flex;
		align-items: stretch;
		margin-bottom: 1.25rem;
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		line-height: 1;
	}

	.r {
		display: grid;
		place-items: center;
		width: 2.75rem;
		background: var(--red-field);
		color: var(--red-field-ink);
		font-size: var(--step-h3);
	}

	.r-text {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.9rem;
		background: var(--slip-paper-2);
		font-size: var(--step-h3);
	}

	h3 {
		font-size: var(--step-h3);
	}

	ul {
		display: grid;
		gap: 0.75rem;
		margin: 1rem 0 1.5rem;
		padding: 0;
		list-style: none;
		font-size: var(--step-small);
		line-height: 1.45;
	}

	li {
		position: relative;
		padding-inline-start: 1.25rem;
	}

	li::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		top: 0.5em;
		width: 0.55rem;
		height: 0.55rem;
		background: var(--red-field);
	}

	.gh {
		font-weight: 700;
		color: var(--slip-ink);
		text-decoration-color: var(--red-field);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.3em;
	}

	.gh:focus-visible {
		outline-color: var(--blue-field);
	}

	@media (max-width: 960px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.slip {
			max-width: 28rem;
		}
	}
</style>
