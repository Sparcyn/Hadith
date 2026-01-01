<script lang="ts">
	import { Search, X, BookOpen, User } from 'lucide-svelte';
	import { page } from '$app/stores';
	
	let query = $state('');
	let book = $state('all');
	
	$effect(() => {
		const q = $page.url.searchParams.get('q');
		if (q) query = q;
	});
	
	const books = [
		{ value: 'all', label: 'جميع الكتب' },
		{ value: 'bukhari', label: 'صحيح البخاري' },
		{ value: 'muslim', label: 'صحيح مسلم' },
		{ value: 'tirmidhi', label: 'جامع الترمذي' },
		{ value: 'abudawud', label: 'سنن أبي داود' },
	];
	
	const results = [
		{
			id: '1',
			text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
			narrator: 'عمر بن الخطاب رضي الله عنه',
			book: 'صحيح البخاري',
			ref: 'حديث ١'
		},
		{
			id: '2',
			text: 'الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ',
			narrator: 'تميم الداري رضي الله عنه',
			book: 'صحيح مسلم',
			ref: 'حديث ٥٥'
		},
	];
</script>

<svelte:head>
	<!-- SEO: Dynamic Meta Tags -->
	<title>{query ? `نتائج البحث: ${query}` : 'البحث في الأحاديث'} | sunnah.one</title>
	<meta name="title" content="{query ? `نتائج البحث: ${query}` : 'البحث في الأحاديث'} | sunnah.one" />
	<meta name="description" content="ابحث في أكثر من 50,000 حديث نبوي شريف من الكتب الستة الصحيحة. بحث فوري ودقيق في نصوص الأحاديث." />
	<meta name="keywords" content="بحث الأحاديث, البحث في السنة, search hadith, hadith search" />
	
	<!-- Prevent indexing of search results pages -->
	{#if query}
		<meta name="robots" content="noindex, follow" />
	{/if}
	
	<!-- Open Graph -->
	<meta property="og:title" content="البحث في الأحاديث - الباحث الحديثي" />
	<meta property="og:description" content="ابحث في أكثر من 50,000 حديث نبوي شريف" />
</svelte:head>

<section class="section">
	<div class="container">
		<div class="max-w-3xl mx-auto">
			
			<h1 class="font-display text-2xl text-[var(--color-text)] mb-6 text-center">البحث في الأحاديث</h1>
			
			<!-- Search -->
			<div class="card p-4 mb-8">
				<div class="flex gap-2 mb-3">
					<div class="flex-1 relative">
						<input type="search" bind:value={query} placeholder="ابحث هنا..." class="input pr-10" />
						<Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
					</div>
					<button class="btn btn-primary">بحث</button>
				</div>
				<select bind:value={book} class="input h-10 w-auto">
					{#each books as b}
						<option value={b.value}>{b.label}</option>
					{/each}
				</select>
			</div>
			
			<!-- Results -->
			{#if query}
				<p class="text-sm text-[var(--color-text-muted)] mb-4">نتائج البحث عن "{query}"</p>
				<div class="space-y-3">
					{#each results as h}
						<a href="/hadith/{h.id}" class="card card-hover block p-5">
							<p class="font-arabic text-lg text-[var(--color-text)] leading-[2] mb-3">{h.text}</p>
							<div class="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
								<span class="flex items-center gap-1"><User class="w-3 h-3" />{h.narrator}</span>
								<span class="flex items-center gap-1"><BookOpen class="w-3 h-3" />{h.book} • {h.ref}</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-center py-12">
					<Search class="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
					<p class="text-[var(--color-text-muted)]">أدخل كلمة للبحث</p>
				</div>
			{/if}
			
		</div>
	</div>
</section>
