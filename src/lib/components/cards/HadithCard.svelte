<script lang="ts">
	import { BookOpen, Share2 } from 'lucide-svelte';
	import Card from '$components/ui/Card.svelte';
	
	interface Props {
		id: string;
		arabicText: string;
		englishText: string;
		narrator: string;
		collection: string;
		bookNumber?: number;
		hadithNumber?: number;
	}
	
	let { id, arabicText, englishText, narrator, collection, bookNumber, hadithNumber }: Props = $props();
</script>

<Card hoverable href="/hadith/{id}">
	<div class="p-6">
		<!-- Header -->
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
				<BookOpen class="w-4 h-4" />
				<span>{collection}</span>
				{#if bookNumber && hadithNumber}
					<span>• Book {bookNumber}, Hadith {hadithNumber}</span>
				{/if}
			</div>
			<button onclick={(e) => { e.preventDefault(); }} class="p-1.5 rounded hover:bg-[var(--color-border)] transition-colors" aria-label="Share">
				<Share2 class="w-4 h-4" />
			</button>
		</div>
		
		<!-- Arabic Text -->
		<p class="arabic text-lg mb-4 text-[var(--color-text)] leading-relaxed">
			{arabicText}
		</p>
		
		<!-- English Translation -->
		<p class="text-[var(--color-text-muted)] mb-4 line-clamp-3">
			{englishText}
		</p>
		
		<!-- Narrator -->
		<p class="text-sm text-[var(--color-primary)] font-medium">
			Narrated by: {narrator}
		</p>
	</div>
</Card>
