<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		disabled?: boolean;
		children: Snippet;
		onclick?: () => void;
	}
	
	let { variant = 'primary', size = 'md', href, disabled = false, children, onclick }: Props = $props();
	
	const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
	
	const variants = {
		primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]',
		secondary: 'bg-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-text-muted)] hover:text-white',
		ghost: 'hover:bg-[var(--color-border)]'
	};
	
	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};
	
	const classes = $derived(`${baseClasses} ${variants[variant]} ${sizes[size]}`);
</script>

{#if href}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<button {disabled} {onclick} class={classes}>
		{@render children()}
	</button>
{/if}
