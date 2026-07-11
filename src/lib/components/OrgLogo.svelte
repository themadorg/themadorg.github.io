<script lang="ts">
	type Props = {
		size?: number | string;
		class?: string;
		alt?: string;
	};

	let { size = 28, class: className = '', alt = 'TheMadOrg' }: Props = $props();

	const dim = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<img
	class={['logo', className]}
	src="/logo.png"
	{alt}
	width={typeof size === 'number' ? size : undefined}
	height={typeof size === 'number' ? size : undefined}
	decoding="async"
	style:--logo-size={dim}
/>

<style>
	.logo {
		display: block;
		width: var(--logo-size, 1.75rem);
		height: var(--logo-size, 1.75rem);
		border-radius: 0.4rem;
		object-fit: cover;
		flex-shrink: 0;
	}
</style>
