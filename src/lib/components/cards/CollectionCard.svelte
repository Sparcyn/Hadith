<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import Card from '$components/ui/Card.svelte';
	
	interface Props {
		slug: string;
		name: string;
		arabicName: string;
		author: string;
		hadithCount: number;
		description?: string;
	}
	
	let { slug, name, arabicName, author, hadithCount, description }: Props = $props();
</script>

<Card hoverable href="/collections/{slug}">
	<div class="p-6">
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<h3 class="arabic text-xl text-[var(--color-primary)] mb-1">{arabicName}</h3>
				<h4 class="font-semibold text-lg mb-2">{name}</h4>
				<p class="text-sm text-[var(--color-text-muted)] mb-3">by {author}</p>
				{#if description}
					<p class="text-sm text-[var(--color-text-muted)] line-clamp-2">{description}</p>
				{/if}
			</div>
			<ChevronRight class="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
		</div>
		<div class="mt-4 pt-4 border-t border-[var(--color-border)]">
			<span class="text-sm text-[var(--color-text-muted)]">{hadithCount.toLocaleString()} hadiths</span>
		</div>
	</div>
</Card>
