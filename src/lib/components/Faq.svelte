<script lang="ts">
	import { faqKeys } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';

	const i18n = getI18n();
</script>

<section class="faq" id="faq" aria-labelledby="faq-title">
	<div class="wrap grid">
		<h2 id="faq-title">{i18n.t('faq_title')}</h2>

		<div class="list">
			{#each faqKeys as item, i (item.q)}
				<details open={i === 0}>
					<summary>
						<h3>{i18n.t(item.q)}</h3>
						<svg class="mark" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
							<path d="M3 11h16M11 3v16" stroke="currentColor" stroke-width="3" />
						</svg>
					</summary>
					<p>{i18n.t(item.a)}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq {
		padding-block: var(--section-gap) 0;
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 2rem clamp(2.5rem, 6vw, 6rem);
		align-items: start;
	}

	h2 {
		font-size: var(--step-h2);
	}

	.list {
		display: grid;
		gap: 0.75rem;
	}

	/* Each answer is a filing card: paper in both themes. */
	details {
		color-scheme: light;
		--red: var(--sheet-red);
		background: var(--sheet-2);
		color: var(--ink);
	}

	details::details-content {
		block-size: 0;
		overflow: clip;
		transition:
			block-size var(--dur-ui) var(--ease-out),
			content-visibility var(--dur-ui) allow-discrete;
	}

	details[open]::details-content {
		block-size: auto;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.25rem clamp(1.25rem, 2.5vw, 1.75rem);
		cursor: pointer;
		list-style: none;
	}

	/* The ring sits on the card, not out on the desk: on the dark desk the
	   card's own blue focus colour would barely show against near-black. */
	summary:focus-visible {
		outline-offset: -6px;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary h3 {
		font-family: var(--font-text);
		font-size: var(--step-lead);
		font-weight: 700;
		line-height: 1.3;
		text-transform: none;
		letter-spacing: 0;
	}

	.mark {
		flex-shrink: 0;
		color: var(--red);
		transition: rotate var(--dur-ui) var(--ease-out);
	}

	details[open] .mark {
		rotate: 45deg;
	}

	summary:active .mark {
		scale: 0.9;
	}

	details p {
		max-width: 44rem;
		padding: 0 clamp(1.25rem, 2.5vw, 1.75rem) 1.5rem;
		font-size: var(--step-body);
		line-height: 1.6;
	}

	@media (hover: hover) and (pointer: fine) {
		summary:hover h3 {
			color: var(--red);
		}
	}

	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
		}

		h2 {
			position: static;
		}
	}
</style>
