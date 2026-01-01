<script lang="ts">
	import HeroSearch from '$components/sections/HeroSearch.svelte';
	import HadithOfTheHour from '$components/sections/HadithOfTheHour.svelte';
	import CollectionsGrid from '$components/sections/CollectionsGrid.svelte';
	import BrowseByTopic from '$components/sections/BrowseByTopic.svelte';
	
	const collections = [
		{ slug: 'bukhari', arabicName: 'صحيح البخاري', arabicAuthor: 'الإمام البخاري', hadithCount: 7563, grade: 'صحيح' },
		{ slug: 'muslim', arabicName: 'صحيح مسلم', arabicAuthor: 'الإمام مسلم', hadithCount: 7500, grade: 'صحيح' },
		{ slug: 'tirmidhi', arabicName: 'جامع الترمذي', arabicAuthor: 'الإمام الترمذي', hadithCount: 3956, grade: 'حسن' },
		{ slug: 'abudawud', arabicName: 'سنن أبي داود', arabicAuthor: 'الإمام أبو داود', hadithCount: 5274, grade: 'حسن' },
		{ slug: 'nasai', arabicName: 'سنن النسائي', arabicAuthor: 'الإمام النسائي', hadithCount: 5761, grade: 'حسن' },
		{ slug: 'ibnmajah', arabicName: 'سنن ابن ماجه', arabicAuthor: 'الإمام ابن ماجه', hadithCount: 4341, grade: 'حسن' },
	];
	
	const featuredHadith = {
		id: 'muslim-671',
		arabicText: 'إِنَّ أَحَبَّ بِلَادِ اللَّهِ إِلَى اللَّهِ مَسَاجِدُهَا، وَأَبْغَضَ بِلَادِ اللَّهِ إِلَى اللَّهِ أَسْوَاقُهَا',
		narrator: 'أبو هريرة رضي الله عنه',
		collection: 'صحيح مسلم',
		reference: 'كتاب المساجد، حديث ٦٧١'
	};
</script>

<svelte:head>
	<!-- SEO: Primary Meta Tags -->
	<title>الباحث الحديثي - ابحث في السنة النبوية | sunnah.one</title>
	<meta name="title" content="الباحث الحديثي - ابحث في السنة النبوية | sunnah.one" />
	<meta name="description" content="الباحث الحديثي - موسوعة شاملة للأحاديث النبوية الشريفة من الكتب الستة الصحيحة: البخاري، مسلم، الترمذي، أبو داود، النسائي، ابن ماجه. ابحث في أكثر من 50,000 حديث." />
	<meta name="keywords" content="حديث, أحاديث, السنة النبوية, صحيح البخاري, صحيح مسلم, الكتب الستة, hadith, sunnah, bukhari, muslim, الإسلام, النبي محمد, أحاديث نبوية, موسوعة الحديث" />
	<meta name="author" content="الباحث الحديثي" />
	
	<!-- Open Graph / Facebook / WhatsApp -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="الباحث الحديثي - ابحث في السنة النبوية" />
	<meta property="og:description" content="موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة. ابحث في أكثر من 50,000 حديث نبوي شريف." />
	<meta property="og:image" content="https://sunnah.one/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="الباحث الحديثي - موسوعة الأحاديث النبوية" />
	<meta property="og:image:type" content="image/png" />
	
	<!-- Twitter -->
	<meta name="twitter:title" content="الباحث الحديثي - ابحث في السنة النبوية" />
	<meta name="twitter:description" content="موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة" />
	<meta name="twitter:image" content="https://sunnah.one/og-image.png" />
	<meta name="twitter:image:alt" content="الباحث الحديثي" />
	
	<!-- Schema.org for Homepage (WebPage) -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": "https://sunnah.one/#webpage",
		"name": "الباحث الحديثي - الصفحة الرئيسية",
		"description": "موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة - ابحث في أكثر من 50,000 حديث",
		"url": "https://sunnah.one",
		"isPartOf": {"@id": "https://sunnah.one/#website"},
		"about": {
			"@type": "Thing",
			"name": "الحديث النبوي الشريف"
		},
		"primaryImageOfPage": {
			"@type": "ImageObject",
			"url": "https://sunnah.one/og-image.png"
		},
		"breadcrumb": {
			"@type": "BreadcrumbList",
			"itemListElement": [
				{"@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://sunnah.one"}
			]
		}
	}
	</script>`}
	
	<!-- Schema.org for ItemList (Collections) -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "كتب الحديث الستة",
		"description": "أصح كتب الحديث النبوي الشريف",
		"numberOfItems": 6,
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"item": {
					"@type": "Book",
					"name": "صحيح البخاري",
					"author": {"@type": "Person", "name": "الإمام محمد بن إسماعيل البخاري"},
					"url": "https://sunnah.one/collections/bukhari",
					"numberOfPages": 7563,
					"inLanguage": "ar"
				}
			},
			{
				"@type": "ListItem",
				"position": 2,
				"item": {
					"@type": "Book",
					"name": "صحيح مسلم",
					"author": {"@type": "Person", "name": "الإمام مسلم بن الحجاج"},
					"url": "https://sunnah.one/collections/muslim",
					"numberOfPages": 7500,
					"inLanguage": "ar"
				}
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
					"@type": "Book",
					"name": "جامع الترمذي",
					"author": {"@type": "Person", "name": "الإمام الترمذي"},
					"url": "https://sunnah.one/collections/tirmidhi",
					"numberOfPages": 3956,
					"inLanguage": "ar"
				}
			},
			{
				"@type": "ListItem",
				"position": 4,
				"item": {
					"@type": "Book",
					"name": "سنن أبي داود",
					"author": {"@type": "Person", "name": "الإمام أبو داود"},
					"url": "https://sunnah.one/collections/abudawud",
					"numberOfPages": 5274,
					"inLanguage": "ar"
				}
			},
			{
				"@type": "ListItem",
				"position": 5,
				"item": {
					"@type": "Book",
					"name": "سنن النسائي",
					"author": {"@type": "Person", "name": "الإمام النسائي"},
					"url": "https://sunnah.one/collections/nasai",
					"numberOfPages": 5761,
					"inLanguage": "ar"
				}
			},
			{
				"@type": "ListItem",
				"position": 6,
				"item": {
					"@type": "Book",
					"name": "سنن ابن ماجه",
					"author": {"@type": "Person", "name": "الإمام ابن ماجه"},
					"url": "https://sunnah.one/collections/ibnmajah",
					"numberOfPages": 4341,
					"inLanguage": "ar"
				}
			}
		]
	}
	</script>`}
	
	<!-- Schema.org for FAQPage (helps with rich snippets) -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "ما هو الباحث الحديثي؟",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "الباحث الحديثي هو موسوعة شاملة للأحاديث النبوية الشريفة من الكتب الستة الصحيحة، يتيح البحث في أكثر من 50,000 حديث نبوي."
				}
			},
			{
				"@type": "Question",
				"name": "ما هي الكتب الستة؟",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "الكتب الستة هي: صحيح البخاري، صحيح مسلم، جامع الترمذي، سنن أبي داود، سنن النسائي، وسنن ابن ماجه. وهي أصح كتب الحديث النبوي."
				}
			},
			{
				"@type": "Question",
				"name": "كيف أبحث عن حديث؟",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "يمكنك البحث عن أي حديث من خلال كتابة كلمات من نص الحديث أو اسم الراوي أو الموضوع في صندوق البحث."
				}
			}
		]
	}
	</script>`}
</svelte:head>

<HeroSearch />
<HadithOfTheHour hadith={featuredHadith} />
<CollectionsGrid {collections} />
<BrowseByTopic />

<!-- Stats Banner -->
<section class="stats-banner">
	<!-- Animated Background Layers -->
	<div class="stats-bg-gradient"></div>
	<div class="stats-pattern pattern-stars"></div>
	<div class="stats-pattern pattern-geometric"></div>
	<div class="stats-glow stats-glow-1"></div>
	<div class="stats-glow stats-glow-2"></div>
	
	<div class="container relative z-10">
		<!-- Header with decorative elements -->
		<div class="stats-header">
			<div class="stats-ornament">✦</div>
			<h2 class="stats-title">أكبر موسوعة للحديث النبوي</h2>
			<p class="stats-subtitle">نسعى لتقديم أفضل تجربة للبحث والتصفح في كتب الحديث الشريف</p>
			<div class="stats-divider">
				<span class="divider-line"></span>
				<span class="divider-star">۞</span>
				<span class="divider-line"></span>
			</div>
		</div>
		
		<!-- Stats Cards -->
		<div class="stats-grid">
			{#each [
				{ value: '٩', label: 'كتب', icon: 'book', desc: 'من أمهات الكتب' },
				{ value: '+٥٠ ألف', label: 'حديث', icon: 'scroll', desc: 'حديث نبوي شريف' },
				{ value: '+١٠٠', label: 'موضوع', icon: 'tag', desc: 'موضوع مصنف' },
			] as stat, i}
				<div class="stats-card" style="--delay: {i * 0.1}s">
					<div class="card-glow"></div>
					<div class="card-border"></div>
					<div class="card-content">
						<span class="stats-icon">
							{#if stat.icon === 'book'}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
									<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
									<path d="M8 7h8M8 11h6"/>
								</svg>
							{:else if stat.icon === 'scroll'}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/>
									<path d="M19 17V5a2 2 0 0 0-2-2H4"/>
									<path d="M9 7h6M9 11h4"/>
								</svg>
							{:else if stat.icon === 'tag'}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
									<line x1="7" y1="7" x2="7.01" y2="7"/>
								</svg>
							{/if}
						</span>
						<p class="stats-value">{stat.value}</p>
						<p class="stats-label">{stat.label}</p>
						<p class="stats-desc">{stat.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Decorative Borders -->
	<div class="stats-border-top"></div>
	<div class="stats-border-bottom"></div>
</section>

<style>
	.stats-banner {
		position: relative;
		padding: 100px 0 120px;
		overflow: hidden;
		background: #0a1f1a;
	}
	
	.stats-bg-gradient {
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(ellipse 80% 50% at 50% 0%, rgba(27, 77, 62, 0.4) 0%, transparent 50%),
			radial-gradient(ellipse 60% 40% at 20% 100%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
			radial-gradient(ellipse 60% 40% at 80% 100%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
			linear-gradient(180deg, #0d2920 0%, #0a1f1a 50%, #071512 100%);
	}
	
	.stats-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}
	
	.stats-glow-1 {
		width: 400px;
		height: 400px;
		background: rgba(212, 175, 55, 0.08);
		top: -100px;
		right: 10%;
		animation: float 8s ease-in-out infinite;
	}
	
	.stats-glow-2 {
		width: 300px;
		height: 300px;
		background: rgba(27, 77, 62, 0.15);
		bottom: -50px;
		left: 15%;
		animation: float 10s ease-in-out infinite reverse;
	}
	
	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-30px) scale(1.1); }
	}
	
	.stats-pattern {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	.pattern-stars {
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpath d='M50 10L55 40L85 50L55 60L50 90L45 60L15 50L45 40Z'/%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='50' cy='50' r='15' stroke-dasharray='4 4'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 100px 100px;
		animation: patternRotate 120s linear infinite;
	}
	
	.pattern-geometric {
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='white' stroke-width='0.3'%3E%3Cpolygon points='40,5 75,40 40,75 5,40'/%3E%3Cpolygon points='40,15 65,40 40,65 15,40'/%3E%3Cpolygon points='40,25 55,40 40,55 25,40'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	@keyframes patternRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.stats-border-top, .stats-border-bottom {
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
	}
	
	.stats-border-top {
		top: 0;
		background: linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 20%, rgba(212, 175, 55, 0.6) 50%, rgba(212, 175, 55, 0.3) 80%, transparent 100%);
	}
	
	.stats-border-bottom {
		bottom: 0;
		background: linear-gradient(90deg, transparent 0%, rgba(27, 77, 62, 0.4) 20%, rgba(212, 175, 55, 0.4) 50%, rgba(27, 77, 62, 0.4) 80%, transparent 100%);
	}
	
	.stats-header {
		text-align: center;
		margin-bottom: 60px;
	}
	
	.stats-ornament {
		font-size: 1.5rem;
		color: #D4AF37;
		margin-bottom: 16px;
		animation: pulse 3s ease-in-out infinite;
	}
	
	@keyframes pulse {
		0%, 100% { opacity: 0.6; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.1); }
	}
	
	.stats-title {
		font-size: clamp(1.75rem, 5vw, 2.75rem);
		font-weight: 700;
		color: white;
		margin-bottom: 16px;
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	
	.stats-subtitle {
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		color: rgba(255, 255, 255, 0.55);
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.7;
	}
	
	.stats-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-top: 32px;
	}
	
	.divider-line {
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
	}
	
	.divider-star {
		color: #D4AF37;
		font-size: 1.25rem;
		opacity: 0.8;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 20px;
		max-width: 900px;
		margin: 0 auto;
	}
	
	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 24px;
		}
	}
	
	.stats-card {
		position: relative;
		text-align: center;
		padding: 40px 24px 36px;
		border-radius: 24px;
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
		backdrop-filter: blur(20px);
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		animation: cardAppear 0.6s ease-out backwards;
		animation-delay: var(--delay);
		overflow: hidden;
	}
	
	@keyframes cardAppear {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.card-border {
		position: absolute;
		inset: 0;
		border-radius: 24px;
		padding: 1px;
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(27, 77, 62, 0.2) 100%);
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
	}
	
	.card-glow {
		position: absolute;
		top: -50%;
		left: 50%;
		transform: translateX(-50%);
		width: 150%;
		height: 100%;
		background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.5s;
		pointer-events: none;
	}
	
	.stats-card:hover {
		transform: translateY(-12px);
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
	}
	
	.stats-card:hover .card-glow {
		opacity: 1;
	}
	
	.stats-card:hover .card-border {
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.2) 50%, rgba(27, 77, 62, 0.3) 100%);
	}
	
	.card-content {
		position: relative;
		z-index: 1;
	}
	
	.stats-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		margin: 0 auto 20px;
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%);
		border-radius: 20px;
		border: 1px solid rgba(212, 175, 55, 0.2);
		color: #D4AF37;
		transition: all 0.4s;
	}
	
	.stats-card:hover .stats-icon {
		transform: scale(1.1) rotate(-5deg);
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.1) 100%);
		box-shadow: 0 8px 32px rgba(212, 175, 55, 0.2);
	}
	
	.stats-icon :global(svg) {
		width: 32px;
		height: 32px;
	}
	
	.stats-value {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		background: linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #ffffff 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 8px;
		animation: shimmer 3s linear infinite;
	}
	
	@keyframes shimmer {
		0% { background-position: 200% center; }
		100% { background-position: -200% center; }
	}
	
	.stats-label {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 600;
		margin-bottom: 8px;
	}
	
	.stats-desc {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.4);
		font-weight: 400;
	}
</style>
