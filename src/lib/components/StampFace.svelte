<script lang="ts">
	/**
	 * An engraved-style stamp face for projects without a screenshot: a flat
	 * two-colour vignette (field + ink) of what the project does, framed like a
	 * definitive stamp with its denomination (the project's language) and the
	 * issuer line, where a definitive stamp prints its issuer. The project name is never repeated here; the stamp's h3 carries it.
	 */
	import { org } from '$lib/data/projects';

	type Props = { id: string; language: string; tone: 'red' | 'blue' };
	let { id, language, tone }: Props = $props();

	const uid = $props.id();

	/* Relay Ping: a symmetric latency matrix. 0 solid, 1 hatched, 2 open, -1 self. */
	const matrix = [
		[-1, 0, 1, 2, 1],
		[0, -1, 2, 1, 0],
		[1, 2, -1, 0, 2],
		[2, 1, 0, -1, 1],
		[1, 0, 2, 1, -1]
	];
</script>

<div class={['face', tone]} aria-hidden="true">
	<span class="value" lang="en" dir="ltr">{language}</span>

	<div class="window">
		<svg class="hatch" width="100%" height="100%">
			<defs>
				<pattern id="lines-{uid}" width="8" height="4" patternUnits="userSpaceOnUse">
					<path d="M0 0.5H8" stroke="currentColor" stroke-width="0.75" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#lines-{uid})" />
		</svg>

		<svg class="vignette" viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
			<defs>
				<pattern id="dense-{uid}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
					<path d="M0 0.5H3" stroke="currentColor" stroke-width="1.2" />
				</pattern>
			</defs>

			<g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="miter" stroke-linecap="square">
				{#if id === 'madexchanger'}
					<!-- Two relay masts and the HTTPS route a sealed letter takes between them. -->
					<path class="ko" d="M0 118H200V130H0Z" stroke="none" />
					<path d="M0 118H200" />
					{#each [40, 160] as x (x)}
						<path class="ko" d="M{x - 13} 118L{x} 40L{x + 13} 118Z" />
						<path
							stroke-width="1.5"
							d="M{x - 13} 118L{x + 9.9} 98M{x + 13} 118L{x - 9.9} 98M{x - 9.9} 98L{x + 6.7} 78M{x + 9.9} 98L{x - 6.7} 78M{x - 6.7} 78L{x + 3.4} 58M{x + 6.7} 78L{x - 3.4} 58M{x - 9.9} 98H{x + 9.9}M{x - 6.7} 78H{x + 6.7}M{x - 3.4} 58H{x + 3.4}"
						/>
						<path d="M{x} 40V30" />
						<circle class="ink" cx={x} cy="27" r="3.5" stroke="none" />
					{/each}
					<path stroke-width="1.5" d="M27 19a14 14 0 0 0 0 16M21 14a21 21 0 0 0 0 26" />
					<path stroke-width="1.5" d="M173 19a14 14 0 0 1 0 16M179 14a21 21 0 0 1 0 26" />
					<path d="M50 34Q100 -6 150 34" stroke-dasharray="5 4" />
					<path d="M146.7 25.7L150 34L141.1 32.7" />
					<rect class="ko" x="88" y="6" width="24" height="16" />
					<path d="M88 6L100 15L112 6" />
					<circle class="ink" cx="100" cy="15" r="3" stroke="none" />
				{:else if id === 'madexchanger-php'}
					<!-- Pull, not push: the receiving server hauls the letter out of the box. -->
					<path class="ko" d="M0 120H200V130H0Z" stroke="none" />
					<path d="M0 120H200" />
					<path class="ko" d="M16 40H70V120H16Z" />
					<path d="M16 66H70M16 93H70" />
					{#each [53, 79, 106] as y (y)}
						<path stroke-width="1.5" d="M24 {y}H48" />
						<circle class="ink" cx="60" cy={y} r="2.6" stroke="none" />
					{/each}
					<path d="M43 40V12H160M43 28L59 12" />
					<path stroke-width="1.75" d="M112 7L105 12L112 17M124 7L117 12L124 17" />
					<circle class="ko" cx="154" cy="12" r="5" />
					<path d="M154 17V28" />
					<path d="M154 28v5a3.5 3.5 0 1 1 -3.5 -3.5" stroke-width="1.75" />
					<rect class="ko" x="142" y="37" width="24" height="15" />
					<path d="M142 37L154 46L166 37" />
					<path stroke-width="1.75" d="M176 52V34M171.5 38.5L176 34L180.5 38.5" />
					<path class="ko" d="M132 120V80A22 22 0 0 1 176 80V120Z" />
					<rect class="ko" x="127" y="76" width="54" height="7" />
					<rect class="ink" x="142" y="90" width="24" height="4" stroke="none" />
					<rect x="141" y="100" width="26" height="14" stroke-width="1.5" />
				{:else if id === 'relay-ping'}
					<!-- A ping going out, and the latency matrix it fills in between relays. -->
					<circle class="ink" cx="30" cy="62" r="6" stroke="none" />
					<path stroke-width="1.75" d="M38 50a14 14 0 0 1 0 24M44 42a24 24 0 0 1 0 40M50 34a34 34 0 0 1 0 56" />
					{#each matrix as row, r (r)}
						<circle class="ko" cx="76" cy={40 + r * 18} r="3.5" stroke-width="1.5" />
						<circle class="ko" cx={94 + r * 18} cy="22" r="3.5" stroke-width="1.5" />
						{#each row as level, c (c)}
							{@const x = 87 + c * 18}
							{@const y = 33 + r * 18}
							{#if level === -1}
								<rect class="ko" {x} {y} width="14" height="14" stroke-width="1" />
								<path stroke-width="1" d="M{x} {y}L{x + 14} {y + 14}" />
							{:else if level === 0}
								<rect class="ink" {x} {y} width="14" height="14" stroke="none" />
							{:else if level === 1}
								<rect class="ko" {x} {y} width="14" height="14" stroke="none" />
								<rect {x} {y} width="14" height="14" fill="url(#dense-{uid})" stroke-width="1" />
							{:else}
								<rect class="ko" {x} {y} width="14" height="14" stroke-width="1" />
							{/if}
						{/each}
					{/each}
					<rect x="84" y="30" width="92" height="92" stroke-width="1.5" />
				{:else if id === 'madcore'}
					<!-- JSON braces around a plug meeting its socket: a library you connect to. -->
					<path class="ko" d="M20 30H180V100H20Z" stroke="none" />
					<path
						stroke-width="4"
						d="M44 20C30 20 33 32 33 45C33 58 30 64 20 65C30 66 33 72 33 85C33 98 30 110 44 110"
					/>
					<path
						stroke-width="4"
						d="M156 20C170 20 167 32 167 45C167 58 170 64 180 65C170 66 167 72 167 85C167 98 170 110 156 110"
					/>
					<rect class="ko" x="52" y="48" width="34" height="34" />
					<path stroke-width="1.5" d="M60 56V74M66 56V74" />
					<rect class="ink" x="86" y="55" width="14" height="5" stroke="none" />
					<rect class="ink" x="86" y="70" width="14" height="5" stroke="none" />
					<path stroke-width="1.75" d="M104 50L108 46M105 65H110M104 80L108 84" />
					<rect class="ko" x="114" y="44" width="34" height="42" />
					<rect class="ink" x="114" y="55" width="7" height="5" stroke="none" />
					<rect class="ink" x="114" y="70" width="7" height="5" stroke="none" />
					<path stroke-width="1.5" d="M134 52V78M140 52V78" />
					<path d="M69 82V94C69 104 60 106 52 112" />
					<path d="M131 86V94C131 104 140 106 148 112" />
				{/if}
			</g>
		</svg>
	</div>

	<span class="issuer" dir="ltr" lang="en">{org.name}</span>
</div>

<style>
	.face {
		position: absolute;
		inset: 0;
		container-type: size;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: clamp(0.3rem, 3cqi, 0.75rem);
		padding: clamp(0.6rem, 5cqi, 1.1rem);
		background: var(--field);
		color: var(--field-ink);
	}

	.face.red {
		--field: var(--red-field);
		--field-ink: var(--red-field-ink);
	}

	.face.blue {
		--field: var(--blue-field);
		--field-ink: var(--blue-field-ink);
	}

	.value,
	.issuer {
		font-family: var(--font-display);
		font-weight: 800;
		line-height: 0.85;
		text-transform: uppercase;
	}

	/* Denomination: the stamp's value, printed in the top inline-end corner. */
	.value {
		justify-self: end;
		font-size: clamp(1.25rem, 11cqi, 2.5rem);
	}

	.issuer {
		justify-self: center;
		font-size: clamp(0.8125rem, 5.5cqi, 1.125rem);
		letter-spacing: 0.24em;
		/* Balance the trailing tracking so the line sits optically centred. */
		margin-inline-end: -0.24em;
	}

	/* The engraved vignette window: a hairline frame with an inner keyline. */
	.window {
		position: relative;
		overflow: hidden;
		border: 1.5px solid currentColor;
		outline: 1px solid currentColor;
		outline-offset: 3px;
		margin: 4px;
	}

	.hatch {
		position: absolute;
		inset: 0;
	}

	.vignette {
		position: absolute;
		inset: 5% 4% 0;
		width: 92%;
		height: 95%;
		transition: scale var(--dur-ui) var(--ease-out);
		transform-origin: 50% 100%;
	}

	.ko {
		fill: var(--field);
	}

	.ink {
		fill: currentColor;
	}

	@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
		:global(.stamp:hover) .vignette {
			scale: 1.04;
		}
	}
</style>
