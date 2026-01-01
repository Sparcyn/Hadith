<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		type?: 'text' | 'search' | 'email' | 'password';
		placeholder?: string;
		value?: string;
		icon?: Snippet;
		oninput?: (e: Event) => void;
	}
	
	let { type = 'text', placeholder = '', value = $bindable(''), icon, oninput }: Props = $props();
</script>

<div class="relative">
	{#if icon}
		<div class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
			{@render icon()}
		</div>
	{/if}
	<input
		{type}
		{placeholder}
		bind:value
		{oninput}
		class="w-full px-4 py-2 {icon ? 'pl-10' : ''} bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
	/>
</div>
