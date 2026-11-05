<script lang="ts">
	import { org, principleKeys } from '$lib/data/projects';
	import { getI18n } from '$lib/i18n.svelte';
	import OrgLogo from './OrgLogo.svelte';

	const i18n = getI18n();
</script>

<!--
	An aerogramme: one airmail sheet edged with chevrons on all four sides,
	as the printed form is, with a letterhead.
	The section heading is the letter's own subject line, so the section needs
	no separate header.
-->
<section class="letter" id="why" aria-labelledby="letter-title">
	<div class="wrap">
		<article class="aerogramme sheet">
			<div class="leaf">
				<header class="letterhead">
					<OrgLogo size={52} alt="" />
					<div class="lh-text">
						<span class="lh-name">{i18n.t('org_name')}</span>
						<span class="lh-meta">
							{i18n.t('tagline')} · <a href={`mailto:${org.email}`} dir="ltr">{org.email}</a>
						</span>
					</div>
				</header>

				<h2 id="letter-title">{i18n.t('letter_title')}</h2>

				<div class="body">
					<p class="greeting">{i18n.t('letter_greeting')}</p>
					<p class="intro">{i18n.t('letter_intro')}</p>
					{#each principleKeys as p (p.titleKey)}
						<p class="para">
							<strong>{i18n.t(p.titleKey)}.</strong>
							{i18n.t(p.bodyKey)}
						</p>
					{/each}
					<div class="sign">
						<p>{i18n.t('letter_signoff')}</p>
						<p class="sign-name">{i18n.t('org_name')}</p>
					</div>
				</div>
			</div>
		</article>
	</div>
</section>

<style>
	.letter {
		padding-block: var(--section-gap) 0;
	}

	.aerogramme {
		max-width: 58rem;
		margin-inline: auto;
		/* The chevron edge: the airmail tile shows through as a border on all
		   four sides, built the same way as the envelope frame. */
		padding: clamp(8px, 1vw, 12px);
		background: var(--paper) var(--airmail);
		background-size: 24px 24px;
		font-size: var(--step-body);
		line-height: 1.6;
	}

	.leaf {
		padding: clamp(1.75rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 4.5rem) clamp(2rem, 4vw, 3.5rem);
		background: var(--paper);
	}

	.letterhead {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-bottom: 1.25rem;
		border-bottom: 2px solid var(--ink);
	}

	.lh-text {
		display: grid;
		line-height: 1.25;
	}

	.lh-name {
		font-family: var(--font-display);
		font-size: var(--step-h3);
		font-weight: 800;
		text-transform: uppercase;
	}

	.lh-meta {
		color: var(--ink-2);
		font-size: var(--step-small);
	}

	.lh-meta a {
		color: inherit;
	}

	h2 {
		margin-top: clamp(1.75rem, 4vw, 3rem);
		font-size: var(--step-h2);
	}

	.body {
		max-width: 44rem;
		margin-top: clamp(1.25rem, 3vw, 2rem);
	}

	.body > * + * {
		margin-top: 1.15em;
	}

	.greeting {
		font-weight: 700;
	}

	.intro {
		font-size: var(--step-lead);
		line-height: 1.5;
	}

	.para strong {
		color: var(--red);
	}

	.sign {
		margin-top: 2.25em;
	}

	.sign-name {
		margin-top: 0.5rem;
		font-family: var(--font-display);
		font-size: var(--step-h3);
		font-weight: 800;
		text-transform: uppercase;
		rotate: -2deg;
		transform-origin: left center;
	}

	:dir(rtl) .sign-name {
		rotate: 2deg;
		transform-origin: right center;
	}
</style>
