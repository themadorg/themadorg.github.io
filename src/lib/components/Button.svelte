<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		href: string;
		variant?: 'primary' | 'default';
		external?: boolean;
		children: Snippet;
	} & Omit<HTMLAnchorAttributes, 'href' | 'children'>;

	let { href, variant = 'default', external = false, children, class: className, ...rest }: Props =
		$props();
</script>

<a
	class={['btn', variant === 'primary' && 'primary', className]}
	{href}
	{...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
	{...rest}
>
	{@render children()}
</a>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.65rem 1.35rem;
		border: 1px solid var(--color-btn-border);
		border-radius: 0.5rem;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-btn-fg);
		text-decoration: none;
		transition:
			border-color 0.15s,
			background 0.15s,
			color 0.15s;
	}

	.btn:hover {
		border-color: var(--color-hover-border);
		background: var(--color-hover);
	}

	.btn.primary {
		border-color: var(--color-btn-primary-bg);
		background: var(--color-btn-primary-bg);
		color: var(--color-btn-primary-fg);
	}

	.btn.primary:hover {
		background: var(--color-btn-primary-hover-bg);
		border-color: var(--color-btn-primary-hover-bg);
	}
</style>
