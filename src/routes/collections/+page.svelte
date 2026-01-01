<script lang="ts">
	import { BookOpen, Star, ChevronLeft, Search, Sparkles, BookMarked, Users, Calendar } from 'lucide-svelte';
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	let searchQuery = $state('');
	let activeFilter = $state('all');
	
	const collections = [
		{ slug: 'bukhari', arabicName: 'صحيح البخاري', arabicAuthor: 'الإمام محمد بن إسماعيل البخاري', hadithCount: 7563, grade: 'صحيح', year: '256 هـ', description: 'أصح كتاب بعد كتاب الله، جمع فيه الإمام البخاري الأحاديث الصحيحة المسندة', color: 'emerald', books: 97, chapters: 3450 },
		{ slug: 'muslim', arabicName: 'صحيح مسلم', arabicAuthor: 'الإمام مسلم بن الحجاج النيسابوري', hadithCount: 7500, grade: 'صحيح', year: '261 هـ', description: 'ثاني أصح كتاب بعد صحيح البخاري، اشترط فيه الإمام مسلم الصحة', color: 'blue', books: 56, chapters: 1400 },
		{ slug: 'tirmidhi', arabicName: 'جامع الترمذي', arabicAuthor: 'الإمام محمد بن عيسى الترمذي', hadithCount: 3956, grade: 'حسن', year: '279 هـ', description: 'من أهم كتب السنن، يتميز ببيان درجة الحديث وذكر مذاهب الفقهاء', color: 'amber', books: 50, chapters: 2000 },
		{ slug: 'abudawud', arabicName: 'سنن أبي داود', arabicAuthor: 'الإمام سليمان بن الأشعث السجستاني', hadithCount: 5274, grade: 'حسن', year: '275 هـ', description: 'من أمهات كتب الحديث، يركز على أحاديث الأحكام الفقهية', color: 'purple', books: 43, chapters: 1871 },
		{ slug: 'nasai', arabicName: 'سنن النسائي', arabicAuthor: 'الإمام أحمد بن شعيب النسائي', hadithCount: 5761, grade: 'حسن', year: '303 هـ', description: 'أقل الكتب الستة ضعفاً بعد الصحيحين، يتميز بدقة التبويب', color: 'rose', books: 51, chapters: 2400 },
		{ slug: 'ibnmajah', arabicName: 'سنن ابن ماجه', arabicAuthor: 'الإمام محمد بن يزيد ابن ماجه', hadithCount: 4341, grade: 'حسن', year: '273 هـ', description: 'سادس الكتب الستة، يحتوي على أحاديث انفرد بها عن بقية الكتب', color: 'cyan', books: 37, chapters: 1500 },
	];
	
	const filters = [
		{ id: 'all', label: 'الكل' },
		{ id: 'sahih', label: 'الصحيحان' },
		{ id: 'sunan', label: 'السنن' },
	];
	
	let filteredCollections = $derived(
		activeFilter === 'all' ? collections :
		activeFilter === 'sahih' ? collections.filter(c => c.grade === 'صحيح') :
		collections.filter(c => c.grade === 'حسن')
	);
	
	let totalHadith = $derived(collections.reduce((sum, c) => sum + c.hadithCount, 0));
	
	const colorMap: Record<string, { gradient: string; light: string; border: string }> = {
		emerald: { gradient: 'from-emerald-500 to-teal-600', light: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' },
		blue: { gradient: 'from-blue-500 to-indigo-600', light: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)' },
		amber: { gradient: 'from-amber-500 to-orange-600', light: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)' },
		purple: { gradient: 'from-purple-500 to-violet-600', light: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.2)' },
		rose: { gradient: 'from-rose-500 to-pink-600', light: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 0.2)' },
		cyan: { gradient: 'from-cyan-500 to-blue-600', light: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.2)' },
	};
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	$effect(() => {
		// Filter logic can be added here
	});
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<!-- SEO: Primary Meta Tags -->
	<title>كتب الحديث الستة - صحيح البخاري ومسلم والسنن | sunnah.one</title>
	<meta name="title" content="كتب الحديث الستة - صحيح البخاري ومسلم والسنن | sunnah.one" />
	<meta name="description" content="تصفح أصح كتب الحديث النبوي الشريف: صحيح البخاري، صحيح مسلم، جامع الترمذي، سنن أبي داود، سنن النسائي، سنن ابن ماجه. أكثر من 34,000 حديث." />
	<meta name="keywords" content="كتب الحديث, الكتب الستة, صحيح البخاري, صحيح مسلم, السنن الأربعة, hadith books" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="كتب الحديث الستة - الباحث الحديثي" />
	<meta property="og:description" content="تصفح أصح كتب الحديث النبوي الشريف - الكتب الستة الصحيحة" />
	<meta property="og:image" content="https://sunnah.one/og-collections.png" />
	
	<!-- Twitter -->
	<meta name="twitter:title" content="كتب الحديث الستة" />
	<meta name="twitter:description" content="تصفح أصح كتب الحديث النبوي الشريف" />
	
	<!-- Schema.org for Collections -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"name": "كتب الحديث الستة",
		"description": "أصح كتب الحديث النبوي الشريف التي اعتمدها العلماء",
		"url": "https://sunnah.one/collections",
		"mainEntity": {
			"@type": "ItemList",
			"name": "الكتب الستة",
			"numberOfItems": 6,
			"itemListElement": [
				{"@type": "ListItem", "position": 1, "name": "صحيح البخاري", "url": "https://sunnah.one/collections/bukhari"},
				{"@type": "ListItem", "position": 2, "name": "صحيح مسلم", "url": "https://sunnah.one/collections/muslim"},
				{"@type": "ListItem", "position": 3, "name": "جامع الترمذي", "url": "https://sunnah.one/collections/tirmidhi"},
				{"@type": "ListItem", "position": 4, "name": "سنن أبي داود", "url": "https://sunnah.one/collections/abudawud"},
				{"@type": "ListItem", "position": 5, "name": "سنن النسائي", "url": "https://sunnah.one/collections/nasai"},
				{"@type": "ListItem", "position": 6, "name": "سنن ابن ماجه", "url": "https://sunnah.one/collections/ibnmajah"}
			]
		}
	}
	</script>`}
</svelte:head>

<div class="page-wrapper">
	<!-- Hero Section -->
	<section class="hero">
		<div class="pattern-layer pattern-1"></div>
		<div class="pattern-layer pattern-2"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<div class="hero-badge">
					<Sparkles class="w-4 h-4" />
					<span>الكتب الستة</span>
				</div>
				<h1 class="hero-title">كتب الحديث الشريف</h1>
				<p class="hero-subtitle">أصح كتب الحديث النبوي الشريف التي اعتمدها العلماء عبر القرون</p>
				
				<!-- Search -->
				<div class="search-box">
					<Search class="search-icon" />
					<input 
						type="search" 
						bind:value={searchQuery}
						placeholder="ابحث في الكتب..."
						class="search-input"
					/>
				</div>
				
				<!-- Filter Tabs -->
				<div class="filter-tabs">
					{#each filters as filter}
						<button 
							class="filter-tab" 
							class:active={activeFilter === filter.id}
							onclick={() => activeFilter = filter.id}
						>
							{filter.label}
						</button>
					{/each}
				</div>
				
				<!-- Stats Row -->
				<div class="hero-stats">
					<div class="hero-stat">
						<BookMarked class="w-5 h-5 text-amber-400" />
						<span class="hero-stat-value">٦</span>
						<span class="hero-stat-label">كتب</span>
					</div>
					<div class="hero-stat-divider"></div>
					<div class="hero-stat">
						<Users class="w-5 h-5 text-emerald-400" />
						<span class="hero-stat-value">+٣٤ ألف</span>
						<span class="hero-stat-label">حديث</span>
					</div>
					<div class="hero-stat-divider"></div>
					<div class="hero-stat">
						<Calendar class="w-5 h-5 text-blue-400" />
						<span class="hero-stat-value">٣ هـ</span>
						<span class="hero-stat-label">القرن</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
</div>

	<!-- Collections Grid -->
	<section class="collections-section">
		<div class="container">
			<!-- Section Header -->
			<div class="section-header fade-in" class:visible={mounted}>
				<h2 class="section-title">الكتب الستة</h2>
				<p class="section-desc">أصح كتب الحديث النبوي التي اعتمدها أهل العلم</p>
			</div>
			
			<div class="collections-grid">
				{#each filteredCollections as book, i}
					{@const colors = colorMap[book.color]}
					<a 
						href="/collections/{book.slug}" 
						class="collection-card fade-in" 
						class:visible={mounted}
						style="transition-delay: {0.1 + i * 0.08}s; --card-light: {colors.light}; --card-border: {colors.border}"
					>
						<!-- Decorative Corner -->
						<div class="card-corner"></div>
						
						<!-- Rank Badge -->
						<div class="rank-badge">{i + 1}</div>
						
						<!-- Header -->
						<div class="card-header">
							<div class="card-icon bg-gradient-to-br {colors.gradient}">
								<BookOpen class="w-7 h-7 text-white" />
							</div>
							{#if book.grade === 'صحيح'}
								<div class="grade-badge premium">
									<Star class="w-3.5 h-3.5" />
									<span>{book.grade}</span>
								</div>
							{:else}
								<div class="grade-badge">
									<span>{book.grade}</span>
								</div>
							{/if}
						</div>
						
						<!-- Content -->
						<div class="card-body">
							<h2 class="card-title">{book.arabicName}</h2>
							<p class="card-author">{book.arabicAuthor}</p>
							<p class="card-desc">{book.description}</p>
						</div>
						
						<!-- Mini Stats -->
						<div class="mini-stats">
							<div class="mini-stat">
								<span class="mini-stat-value">{book.books}</span>
								<span class="mini-stat-label">كتاب</span>
							</div>
							<div class="mini-stat">
								<span class="mini-stat-value">{book.chapters}</span>
								<span class="mini-stat-label">باب</span>
							</div>
						</div>
						
						<!-- Footer -->
						<div class="card-footer">
							<div class="card-stats">
								<div class="stat">
									<span class="stat-value">{formatNum(book.hadithCount)}</span>
									<span class="stat-label">حديث</span>
								</div>
								<div class="stat-divider"></div>
								<div class="stat">
									<span class="stat-value">{book.year}</span>
									<span class="stat-label">التأليف</span>
								</div>
							</div>
							<div class="card-action">
								<span>تصفح</span>
								<ChevronLeft class="w-4 h-4" />
							</div>
						</div>
						
						<!-- Hover Glow -->
						<div class="card-glow bg-gradient-to-br {colors.gradient}"></div>
					</a>
				{/each}
			</div>
		</div>
	</section>

<style>
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(180deg, #f8faf9 0%, #ffffff 100%);
	}
	
	/* Hero */
	.hero {
		position: relative;
		padding: 160px 0 100px;
		background: linear-gradient(165deg, #0a2e25 0%, #1a5f4f 40%, #0d3d32 100%);
		overflow: hidden;
	}
	
	.pattern-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	.pattern-1 {
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	.pattern-2 {
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='white' stroke-width='0.3'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 60px 60px;
	}
	
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
	}
	.orb-1 {
		width: 400px;
		height: 400px;
		background: rgba(212, 175, 55, 0.15);
		top: -100px;
		right: -50px;
	}
	.orb-2 {
		width: 300px;
		height: 300px;
		background: rgba(255, 255, 255, 0.08);
		bottom: -50px;
		left: 10%;
	}
	
	.hero-content {
		max-width: 700px;
		margin: 0 auto;
		text-align: center;
	}
	
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(212, 175, 55, 0.15);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: 50px;
		color: #d4af37;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	
	.hero-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: white;
		margin-bottom: 16px;
		text-shadow: 0 4px 20px rgba(0,0,0,0.3);
	}
	@media (min-width: 768px) {
		.hero-title { font-size: 3.5rem; }
	}
	
	.hero-subtitle {
		font-size: 1.125rem;
		color: rgba(255,255,255,0.7);
		margin-bottom: 32px;
		line-height: 1.8;
	}
	
	.search-box {
		max-width: 500px;
		margin: 0 auto 24px;
		position: relative;
	}
	
	.search-icon {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		color: #9ca3af;
	}
	
	.search-input {
		width: 100%;
		padding: 18px 56px 18px 24px;
		background: rgba(255,255,255,0.1);
		border: 1px solid rgba(255,255,255,0.2);
		border-radius: 60px;
		font-size: 16px;
		color: white;
		outline: none;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	.search-input::placeholder { color: rgba(255,255,255,0.5); }
	.search-input:focus {
		background: rgba(255,255,255,0.15);
		border-color: rgba(212, 175, 55, 0.5);
		box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
	}
	
	/* Filter Tabs */
	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 12px;
		margin-bottom: 32px;
	}
	
	.filter-tab {
		padding: 12px 28px;
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.15);
		border-radius: 50px;
		font-size: 15px;
		font-weight: 600;
		color: rgba(255,255,255,0.7);
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.filter-tab:hover {
		background: rgba(255,255,255,0.12);
		color: white;
	}
	.filter-tab.active {
		background: linear-gradient(135deg, #d4af37, #c9a432);
		border-color: transparent;
		color: #1a1a1a;
		box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
	}
	
	/* Hero Stats */
	.hero-stats {
		display: inline-flex;
		align-items: center;
		gap: 24px;
		padding: 16px 32px;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 60px;
		backdrop-filter: blur(10px);
	}
	
	.hero-stat {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.hero-stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
	}
	.hero-stat-label {
		font-size: 13px;
		color: rgba(255,255,255,0.6);
	}
	.hero-stat-divider {
		width: 1px;
		height: 32px;
		background: rgba(255,255,255,0.15);
	}
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 6px;
		background: linear-gradient(90deg, #1a5f4f, #d4af37, #1a5f4f, #d4af37, #1a5f4f);
		background-size: 200% 100%;
		animation: borderFlow 8s linear infinite;
	}
	@keyframes borderFlow {
		0% { background-position: 0% 0%; }
		100% { background-position: 200% 0%; }
	}
	
	/* Section Header */
	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 8px;
	}
	.section-desc {
		font-size: 1rem;
		color: #6b7280;
	}
	
	/* Collections Section */
	.collections-section {
		padding: 80px 0 120px;
	}
	
	.collections-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}
	@media (min-width: 768px) {
		.collections-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.collections-grid { grid-template-columns: repeat(3, 1fr); }
	}
	
	.collection-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 28px;
		background: white;
		border: 1px solid #f3f4f6;
		border-radius: 28px;
		text-decoration: none;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.collection-card:hover {
		transform: translateY(-12px);
		box-shadow: 0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px var(--card-border);
	}
	
	/* Rank Badge */
	.rank-badge {
		position: absolute;
		top: 20px;
		left: 20px;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f4f6;
		border-radius: 50%;
		font-size: 14px;
		font-weight: 700;
		color: #9ca3af;
		transition: all 0.3s ease;
	}
	.collection-card:hover .rank-badge {
		background: var(--card-light);
		color: #1a5f4f;
	}
	
	.card-corner {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		background: var(--card-light);
		border-radius: 0 0 100% 0;
		transition: all 0.4s ease;
	}
	.collection-card:hover .card-corner {
		width: 150px;
		height: 150px;
	}
	
	.card-glow {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 0;
	}
	.collection-card:hover .card-glow {
		opacity: 0.03;
	}
	
	.card-header {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 20px;
		z-index: 1;
	}
	
	.card-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.15);
		transition: all 0.4s ease;
	}
	.collection-card:hover .card-icon {
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 12px 32px rgba(0,0,0,0.2);
	}
	
	.grade-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 14px;
		background: #f3f4f6;
		border-radius: 50px;
		font-size: 12px;
		font-weight: 600;
		color: #6b7280;
	}
	.grade-badge.premium {
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		color: #92400e;
	}
	
	.card-body {
		position: relative;
		flex: 1;
		z-index: 1;
	}
	
	.card-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 6px;
		transition: color 0.3s ease;
	}
	.collection-card:hover .card-title {
		color: #1a5f4f;
	}
	
	.card-author {
		font-size: 14px;
		color: #9ca3af;
		margin-bottom: 12px;
	}
	
	.card-desc {
		font-size: 14px;
		color: #6b7280;
		line-height: 1.7;
	}
	
	/* Mini Stats */
	.mini-stats {
		display: flex;
		gap: 16px;
		margin-top: 16px;
		padding: 12px 16px;
		background: #f9fafb;
		border-radius: 12px;
		position: relative;
		z-index: 1;
	}
	.mini-stat {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.mini-stat-value {
		font-size: 14px;
		font-weight: 700;
		color: #374151;
	}
	.mini-stat-label {
		font-size: 13px;
		color: #9ca3af;
	}
	
	.card-footer {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid #f3f4f6;
		z-index: 1;
	}
	
	.card-stats {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	
	.stat {
		text-align: center;
	}
	.stat-value {
		display: block;
		font-size: 1.125rem;
		font-weight: 700;
		color: #1a5f4f;
	}
	.stat-label {
		font-size: 12px;
		color: #9ca3af;
	}
	
	.stat-divider {
		width: 1px;
		height: 32px;
		background: #e5e7eb;
	}
	
	.card-action {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 18px;
		background: #f9fafb;
		border-radius: 50px;
		font-size: 14px;
		font-weight: 600;
		color: #6b7280;
		transition: all 0.3s ease;
		flex-direction: row-reverse;
	}
	.collection-card:hover .card-action {
		background: #1a5f4f;
		color: white;
		transform: translateX(4px);
	}
	
	/* Animations */
	.fade-in {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.fade-in.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
