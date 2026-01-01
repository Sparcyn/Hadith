<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		href?: string;
		hoverable?: boolean;
		children: Snippet;
	}
	
	let { href, hoverable = false, children }: Props = $props();
	
	const baseClasses = 'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm overflow-hidden';
	const hoverClasses = $derived(hoverable ? 'hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer' : '');
	const classes = $derived(`${baseClasses} ${hoverClasses}`);
</script>

{#if href}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<div class={classes}>
		{@render children()}
	</div>
{/if}
