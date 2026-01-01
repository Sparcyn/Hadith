<script lang="ts">
	import { Search, ChevronDown } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	
	let searchQuery = $state('');
	let searchType = $state('all');
	let showFilters = $state(false);
	
	const searchTypes = [
		{ value: 'all', label: 'بحث في الموقع' },
		{ value: 'text', label: 'نص الحديث' },
		{ value: 'narrator', label: 'الراوي' },
		{ value: 'topic', label: 'الموضوع' },
		{ value: 'number', label: 'رقم الحديث' }
	];
	
	const quickSearches = [
		'الصلاة', 'الصيام', 'الزكاة', 'الصبر', 'الأخلاق', 'الصدق'
	];
	
	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`);
		}
	}
</script>

<section class="hero-section relative overflow-hidden">
	<!-- Moroccan/Islamic Geometric Pattern Background -->
	<div class="pattern-layer pattern-zellige"></div>
	<div class="pattern-layer pattern-arabesque"></div>
	<div class="pattern-layer pattern-stars"></div>
	
	<div class="container relative pt-32 pb-20 md:pt-40 md:pb-28">
		<div class="max-w-4xl mx-auto text-center">
			<!-- Subtitle -->
			<p class="text-base md:text-lg text-[#1B4D3E] mb-3 font-medium">بسم الله الرحمن الرحيم</p>
			
			<!-- Title -->
			<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-[#1B4D3E] mb-4">
				الباحث الحديثي
			</h1>
			<p class="text-lg md:text-xl text-gray-600 mb-10">
				ابحث واكتشف في أكبر كتب الحديث النبوي
			</p>
			
			<!-- Search Box -->
			<form onsubmit={handleSearch} class="mb-8">
				<div class="search-box">
					<!-- Submit -->
					<button type="submit" class="search-btn">
						بحث
					</button>
					
					<!-- Search Input -->
					<div class="flex-1 relative">
						<input
							type="search"
							bind:value={searchQuery}
							placeholder="ابحث عن حديث، راوٍ، أو موضوع..."
							class="w-full h-11 px-4 bg-transparent border-0 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
						/>
					</div>
					
					<!-- Filter Dropdown -->
					<div class="relative flex-shrink-0">
						<button
							type="button"
							onclick={() => showFilters = !showFilters}
							class="h-11 px-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
						>
							<span>{searchTypes.find(t => t.value === searchType)?.label}</span>
							<ChevronDown class="w-4 h-4" />
						</button>
						
						{#if showFilters}
							<div class="filter-dropdown">
								{#each searchTypes as type}
									<button
										type="button"
										onclick={() => { searchType = type.value; showFilters = false; }}
										class="w-full px-4 py-2.5 text-right text-sm hover:bg-gray-50 transition-colors {searchType === type.value ? 'text-[#1B4D3E] font-medium' : 'text-gray-600'}"
									>
										{type.label}
									</button>
								{/each}
							</div>
						{/if}
					</div>
					
					<Search class="w-5 h-5 text-gray-400 ml-3" />
				</div>
			</form>
			
			<!-- Quick Searches -->
			<div class="flex flex-wrap items-center justify-center gap-3">
				<span class="text-base text-gray-500">بحث سريع:</span>
				{#each quickSearches as term}
					<button
						onclick={() => { searchQuery = term; }}
						class="quick-tag"
					>
						{term}
					</button>
				{/each}
			</div>
		</div>
		
		<!-- Stats Row -->
		<div class="flex items-center justify-center gap-5 md:gap-8 mt-12">
			{#each [
				{ value: '٢', label: 'لغات' },
				{ value: '+١٠٠', label: 'موضوع' },
				{ value: '+٥٠ ألف', label: 'حديث' },
				{ value: '٩', label: 'كتب' },
			] as stat}
				<div class="stat-card">
					<p class="font-display text-2xl md:text-3xl text-[#1B4D3E] mb-1">{stat.value}</p>
					<p class="text-sm text-gray-500">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero-section {
		background: linear-gradient(180deg, #f5f0e6 0%, #ebe4d6 100%);
		min-height: auto;
	}
	
	/* Islamic Pattern Layers */
	.pattern-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	/* Moroccan Zellige-inspired geometric pattern */
	.pattern-zellige {
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%231B4D3E' stroke-width='0.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 10L70 40L40 70L10 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3Cpath d='M0 0L40 40M80 0L40 40M0 80L40 40M80 80L40 40'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	/* Arabesque flowing curves */
	.pattern-arabesque {
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.4'%3E%3Cpath d='M60 0C60 33.137 33.137 60 0 60C33.137 60 60 86.863 60 120C60 86.863 86.863 60 120 60C86.863 60 60 33.137 60 0Z'/%3E%3Ccircle cx='60' cy='60' r='20'/%3E%3Ccircle cx='60' cy='60' r='35'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 120px 120px;
	}
	
	/* 8-pointed Islamic stars */
	.pattern-stars {
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%231B4D3E' stroke-width='0.3'%3E%3Cpath d='M30 0L37.5 22.5L60 30L37.5 37.5L30 60L22.5 37.5L0 30L22.5 22.5Z'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 60px 60px;
	}
	
	.search-box {
		background: white;
		border-radius: 50px;
		padding: 8px;
		box-shadow: 0 8px 32px rgba(27, 77, 62, 0.1), 0 2px 8px rgba(27, 77, 62, 0.05);
		display: flex;
		align-items: center;
		gap: 10px;
		max-width: 720px;
		margin: 0 auto;
		border: 1px solid rgba(27, 77, 62, 0.08);
	}
	
	.search-btn {
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		color: white;
		height: 52px;
		padding: 0 32px;
		border-radius: 50px;
		font-size: 16px;
		font-weight: 600;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: all 0.2s ease;
	}
	.search-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(27, 77, 62, 0.3);
	}
	
	.filter-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 8px;
		width: 180px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 12px 32px rgba(0,0,0,0.12);
		z-index: 10;
		padding: 4px 0;
		animation: fadeIn 0.2s ease;
		border: 1px solid rgba(0,0,0,0.05);
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-8px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	.quick-tag {
		padding: 10px 20px;
		font-size: 15px;
		background: rgba(255, 255, 255, 0.7);
		color: #4b5563;
		border-radius: 50px;
		border: 1px solid rgba(27, 77, 62, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.quick-tag:hover {
		background: white;
		color: #1B4D3E;
		border-color: #1B4D3E;
		box-shadow: 0 2px 8px rgba(27, 77, 62, 0.1);
	}
	
	.stat-card {
		background: white;
		border-radius: 16px;
		padding: 20px 32px;
		text-align: center;
		box-shadow: 0 4px 16px rgba(27, 77, 62, 0.06);
		border: 1px solid rgba(27, 77, 62, 0.06);
		min-width: 110px;
	}
</style>
