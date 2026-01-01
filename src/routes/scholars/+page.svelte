<script lang="ts">
	import { onMount } from 'svelte';
	import { BookOpen, ChevronLeft, Star, Calendar, MapPin, Sparkles } from 'lucide-svelte';
	import { getAllScholars } from '$lib/data/scholars';
	
	let mounted = $state(false);
	
	const scholars = getAllScholars();
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>علماء الحديث - أئمة الكتب الستة | sunnah.one</title>
	<meta name="title" content="علماء الحديث - أئمة الكتب الستة | sunnah.one" />
	<meta name="description" content="تعرف على أئمة الحديث الستة: الإمام البخاري، الإمام مسلم، الإمام الترمذي، الإمام أبو داود، الإمام النسائي، الإمام ابن ماجه. سيرهم ومؤلفاتهم وإنجازاتهم." />
	<meta name="keywords" content="علماء الحديث, أئمة الحديث, البخاري, مسلم, الترمذي, أبو داود, النسائي, ابن ماجه" />
	
	<meta property="og:title" content="علماء الحديث - أئمة الكتب الستة" />
	<meta property="og:description" content="تعرف على أئمة الحديث الستة وسيرهم ومؤلفاتهم" />
	
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"name": "علماء الحديث",
		"description": "أئمة الحديث الستة",
		"url": "https://sunnah.one/scholars",
		"mainEntity": {
			"@type": "ItemList",
			"numberOfItems": 6,
			"itemListElement": [
				{"@type": "ListItem", "position": 1, "name": "الإمام البخاري", "url": "https://sunnah.one/scholars/bukhari"},
				{"@type": "ListItem", "position": 2, "name": "الإمام مسلم", "url": "https://sunnah.one/scholars/muslim"},
				{"@type": "ListItem", "position": 3, "name": "الإمام الترمذي", "url": "https://sunnah.one/scholars/tirmidhi"},
				{"@type": "ListItem", "position": 4, "name": "الإمام أبو داود", "url": "https://sunnah.one/scholars/abudawud"},
				{"@type": "ListItem", "position": 5, "name": "الإمام النسائي", "url": "https://sunnah.one/scholars/nasai"},
				{"@type": "ListItem", "position": 6, "name": "الإمام ابن ماجه", "url": "https://sunnah.one/scholars/ibnmajah"}
			]
		}
	}
	</script>`}
</svelte:head>

<div class="page-wrapper">
	<!-- Hero Section -->
	<section class="hero">
		<div class="pattern-layer"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<div class="hero-badge">
					<Sparkles class="w-4 h-4" />
					<span>أئمة الحديث</span>
				</div>
				<h1 class="hero-title">علماء الحديث</h1>
				<p class="hero-subtitle">تعرف على أئمة الحديث الستة الذين حفظوا لنا السنة النبوية الشريفة</p>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
	
	<!-- Scholars Grid -->
	<section class="scholars-section">
		<div class="container">
			<div class="scholars-grid">
				{#each scholars as scholar, i}
					<a 
						href="/scholars/{scholar.slug}" 
						class="scholar-card fade-in" 
						class:visible={mounted}
						style="transition-delay: {0.1 + i * 0.08}s"
					>
						<div class="card-avatar">
							<span>{scholar.name.charAt(0)}</span>
						</div>
						
						<div class="card-content">
							<div class="card-badge">
								<Star class="w-3.5 h-3.5" />
								<span>{scholar.title}</span>
							</div>
							
							<h2 class="card-name">{scholar.name}</h2>
							<p class="card-fullname">{scholar.fullName}</p>
							
							<div class="card-meta">
								<div class="meta-item">
									<Calendar class="w-4 h-4" />
									<span>{scholar.birthYear} - {scholar.deathYear}</span>
								</div>
								<div class="meta-item">
									<MapPin class="w-4 h-4" />
									<span>{scholar.birthPlace}</span>
								</div>
							</div>
							
							<p class="card-bio">{scholar.bio.slice(0, 120)}...</p>
						</div>
						
						<div class="card-footer">
							<span class="works-count">{scholar.works.length} مؤلفات</span>
							<div class="card-action">
								<span>عرض السيرة</span>
								<ChevronLeft class="w-4 h-4" />
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.page-wrapper { min-height: 100vh; background: #fafafa; }
	
	.hero {
		position: relative;
		padding: 160px 0 80px;
		background: linear-gradient(165deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
		overflow: hidden;
	}
	
	.pattern-layer {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
	}
	.orb-1 { width: 400px; height: 400px; background: rgba(212,175,55,0.15); top: -100px; right: -50px; }
	.orb-2 { width: 300px; height: 300px; background: rgba(255,255,255,0.08); bottom: -50px; left: 10%; }
	
	.hero-content { max-width: 700px; margin: 0 auto; text-align: center; }
	
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(212,175,55,0.15);
		border: 1px solid rgba(212,175,55,0.3);
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
	}
	@media (min-width: 768px) { .hero-title { font-size: 3.5rem; } }
	
	.hero-subtitle {
		font-size: 1.125rem;
		color: rgba(255,255,255,0.7);
		line-height: 1.8;
	}
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #16213e, #d4af37, #16213e);
	}
	
	.scholars-section { padding: 80px 0 120px; }
	
	.scholars-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}
	@media (min-width: 768px) { .scholars-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (min-width: 1024px) { .scholars-grid { grid-template-columns: repeat(3, 1fr); } }
	
	.scholar-card {
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: 24px;
		padding: 28px;
		text-decoration: none;
		transition: all 0.4s ease;
		box-shadow: 0 4px 24px rgba(0,0,0,0.04);
	}
	.scholar-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 48px rgba(0,0,0,0.1);
	}
	
	.card-avatar {
		width: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		border-radius: 20px;
		margin-bottom: 20px;
	}
	
	.card-avatar span {
		font-size: 32px;
		font-weight: 700;
		color: #d4af37;
	}
	
	.card-content { flex: 1; }
	
	.card-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 12px;
		background: #fef3c7;
		border-radius: 50px;
		color: #92400e;
		font-size: 11px;
		font-weight: 600;
		margin-bottom: 12px;
	}
	
	.card-name {
		font-size: 1.375rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 4px;
	}
	
	.card-fullname {
		font-size: 13px;
		color: #9ca3af;
		margin-bottom: 16px;
	}
	
	.card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-bottom: 16px;
	}
	
	.meta-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #6b7280;
	}
	
	.card-bio {
		font-size: 14px;
		color: #6b7280;
		line-height: 1.7;
	}
	
	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid #f3f4f6;
	}
	
	.works-count {
		font-size: 13px;
		color: #1B4D3E;
		font-weight: 600;
	}
	
	.card-action {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
		color: #6b7280;
		transition: all 0.3s ease;
		flex-direction: row-reverse;
	}
	.scholar-card:hover .card-action { color: #1B4D3E; transform: translateX(4px); }
	
	.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
	.fade-in.visible { opacity: 1; transform: translateY(0); }
</style>
