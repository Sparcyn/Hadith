<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Button from '$components/ui/Button.svelte';
	import Input from '$components/ui/Input.svelte';
	
	let searchQuery = $state('');
</script>

<section class="relative py-20 px-4 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="arabic text-5xl md:text-6xl mb-4">حديث</h1>
		<h2 class="text-2xl md:text-3xl font-light mb-6">Hadith Collection</h2>
		<p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
			Explore authentic Islamic hadith from the most trusted collections. Search, read, and share the wisdom of the Prophet ﷺ.
		</p>
		
		<!-- Search Bar -->
		<div class="max-w-xl mx-auto">
			<form action="/search" method="GET" class="flex gap-2">
				<div class="flex-1">
					<Input 
						type="search" 
						placeholder="Search hadiths..." 
						bind:value={searchQuery}
					>
						{#snippet icon()}
							<Search class="w-5 h-5" />
						{/snippet}
					</Input>
				</div>
				<Button variant="secondary">Search</Button>
			</form>
		</div>
		
		<!-- Stats -->
		<div class="mt-12 flex justify-center gap-8 md:gap-16">
			<div>
				<p class="text-3xl font-bold">9</p>
				<p class="text-sm opacity-80">Collections</p>
			</div>
			<div>
				<p class="text-3xl font-bold">50K+</p>
				<p class="text-sm opacity-80">Hadiths</p>
			</div>
			<div>
				<p class="text-3xl font-bold">2</p>
				<p class="text-sm opacity-80">Languages</p>
			</div>
		</div>
	</div>
</section>
