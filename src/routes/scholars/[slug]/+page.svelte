<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BookOpen, Calendar, MapPin, Award, Users, Quote, ChevronRight, Star, Scroll, GraduationCap } from 'lucide-svelte';
	import { scholars, type Scholar } from '$lib/data/scholars';
	
	let mounted = $state(false);
	
	let slug = $derived($page.params.slug);
	let scholar = $derived(scholars[slug] || scholars.bukhari);
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>{scholar.name} - سيرة ومؤلفات | sunnah.one</title>
	<meta name="title" content="{scholar.name} - سيرة ومؤلفات | sunnah.one" />
	<meta name="description" content="السيرة الذاتية للإمام {scholar.fullName}، {scholar.title}. ولد في {scholar.birthPlace} سنة {scholar.birthYear} وتوفي سنة {scholar.deathYear}." />
	<meta name="keywords" content="{scholar.name}, {scholar.fullName}, {scholar.title}, علماء الحديث, أئمة الحديث" />
	
	<meta property="og:title" content="{scholar.name} - سيرة ومؤلفات" />
	<meta property="og:description" content="السيرة الذاتية للإمام {scholar.fullName}" />
	<meta property="og:image" content="https://sunnah.one/og-scholar-{slug}.png" />
	
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "${scholar.fullName}",
		"alternateName": "${scholar.name}",
		"description": "${scholar.bio.slice(0, 200)}...",
		"birthPlace": "${scholar.birthPlace}",
		"deathPlace": "${scholar.deathPlace}",
		"jobTitle": "${scholar.title}",
		"url": "https://sunnah.one/scholars/${slug}",
		"sameAs": [],
		"knowsAbout": ["الحديث النبوي", "علوم الحديث", "الفقه الإسلامي"]
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
				<a href="/collections/{slug}" class="back-link">
					<ChevronRight class="w-4 h-4" />
					<span>العودة للكتاب</span>
				</a>
				
				<div class="scholar-header">
					<div class="scholar-avatar">
						<span class="avatar-letter">{scholar.name.charAt(0)}</span>
					</div>
					<div class="scholar-info">
						<div class="scholar-badge">
							<Star class="w-4 h-4" />
							<span>{scholar.title}</span>
						</div>
						<h1 class="scholar-name">{scholar.name}</h1>
						<p class="scholar-fullname">{scholar.fullName}</p>
					</div>
				</div>
				
				<div class="scholar-meta">
					<div class="meta-item">
						<Calendar class="w-5 h-5" />
						<span>{scholar.birthYear} - {scholar.deathYear}</span>
					</div>
					<div class="meta-divider"></div>
					<div class="meta-item">
						<MapPin class="w-5 h-5" />
						<span>{scholar.birthPlace}</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
	
	<!-- Biography Section -->
	<section class="content-section">
		<div class="container">
			<div class="content-grid">
				<!-- Main Content -->
				<div class="main-content">
					<!-- Bio Card -->
					<div class="content-card fade-in" class:visible={mounted} style="transition-delay: 0.1s">
						<div class="card-header">
							<BookOpen class="w-5 h-5 text-emerald-600" />
							<h2>السيرة الذاتية</h2>
						</div>
						<p class="bio-text">{scholar.bio}</p>
					</div>
					
					<!-- Achievements -->
					<div class="content-card fade-in" class:visible={mounted} style="transition-delay: 0.2s">
						<div class="card-header">
							<Award class="w-5 h-5 text-amber-600" />
							<h2>أبرز الإنجازات</h2>
						</div>
						<ul class="achievements-list">
							{#each scholar.achievements as achievement}
								<li>
									<span class="achievement-bullet">✦</span>
									<span>{achievement}</span>
								</li>
							{/each}
						</ul>
					</div>
					
					<!-- Works -->
					<div class="content-card fade-in" class:visible={mounted} style="transition-delay: 0.3s">
						<div class="card-header">
							<Scroll class="w-5 h-5 text-blue-600" />
							<h2>المؤلفات</h2>
						</div>
						<div class="works-grid">
							{#each scholar.works as work}
								<div class="work-item">
									<h3 class="work-name">{work.name}</h3>
									<p class="work-desc">{work.description}</p>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Quotes -->
					{#if scholar.quotes && scholar.quotes.length > 0}
						<div class="content-card fade-in" class:visible={mounted} style="transition-delay: 0.4s">
							<div class="card-header">
								<Quote class="w-5 h-5 text-purple-600" />
								<h2>من أقواله</h2>
							</div>
							<div class="quotes-list">
								{#each scholar.quotes as quote}
									<blockquote class="quote-item">
										<span class="quote-mark">"</span>
										{quote}
										<span class="quote-mark">"</span>
									</blockquote>
								{/each}
							</div>
						</div>
					{/if}
				</div>
				
				<!-- Sidebar -->
				<aside class="sidebar">
					<!-- Teachers -->
					<div class="sidebar-card fade-in" class:visible={mounted} style="transition-delay: 0.2s">
						<div class="sidebar-header">
							<GraduationCap class="w-5 h-5" />
							<h3>شيوخه</h3>
						</div>
						<ul class="people-list">
							{#each scholar.teachers as teacher}
								<li>{teacher}</li>
							{/each}
						</ul>
					</div>
					
					<!-- Students -->
					<div class="sidebar-card fade-in" class:visible={mounted} style="transition-delay: 0.3s">
						<div class="sidebar-header">
							<Users class="w-5 h-5" />
							<h3>تلاميذه</h3>
						</div>
						<ul class="people-list">
							{#each scholar.students as student}
								<li>{student}</li>
							{/each}
						</ul>
					</div>
					
					<!-- Quick Link to Collection -->
					<a href="/collections/{slug}" class="collection-link fade-in" class:visible={mounted} style="transition-delay: 0.4s">
						<BookOpen class="w-6 h-6" />
						<span>تصفح كتابه</span>
					</a>
				</aside>
			</div>
		</div>
	</section>
</div>

<style>
	.page-wrapper { min-height: 100vh; background: #fafafa; }
	
	.hero {
		position: relative;
		padding: 140px 0 60px;
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
	
	.hero-content { max-width: 800px; }
	
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: rgba(255,255,255,0.1);
		border-radius: 50px;
		color: rgba(255,255,255,0.8);
		font-size: 14px;
		text-decoration: none;
		margin-bottom: 32px;
		transition: all 0.2s ease;
		flex-direction: row-reverse;
	}
	.back-link:hover { background: rgba(255,255,255,0.15); color: white; }
	
	.scholar-header { display: flex; align-items: center; gap: 24px; margin-bottom: 24px; }
	
	.scholar-avatar {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 100%);
		border: 2px solid rgba(212,175,55,0.4);
		border-radius: 28px;
		flex-shrink: 0;
	}
	
	.avatar-letter {
		font-size: 48px;
		font-weight: 700;
		color: #d4af37;
	}
	
	.scholar-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		background: rgba(212,175,55,0.2);
		border-radius: 50px;
		color: #d4af37;
		font-size: 13px;
		font-weight: 600;
		margin-bottom: 8px;
	}
	
	.scholar-name { font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 8px; }
	.scholar-fullname { font-size: 16px; color: rgba(255,255,255,0.6); }
	
	.scholar-meta {
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}
	
	.meta-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: rgba(255,255,255,0.7);
		font-size: 15px;
	}
	
	.meta-divider { width: 1px; height: 24px; background: rgba(255,255,255,0.2); }
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #16213e, #d4af37, #16213e);
	}
	
	.content-section { padding: 60px 0 100px; }
	
	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}
	@media (min-width: 1024px) {
		.content-grid { grid-template-columns: 1fr 320px; }
	}
	
	.main-content { display: flex; flex-direction: column; gap: 24px; }
	
	.content-card {
		background: white;
		border-radius: 24px;
		padding: 32px;
		box-shadow: 0 4px 24px rgba(0,0,0,0.04);
	}
	
	.card-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}
	
	.card-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}
	
	.bio-text {
		font-size: 16px;
		color: #4b5563;
		line-height: 2;
		text-align: justify;
	}
	
	.achievements-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.achievements-list li {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		font-size: 15px;
		color: #4b5563;
		line-height: 1.7;
	}
	
	.achievement-bullet { color: #d4af37; font-size: 12px; margin-top: 4px; }
	
	.works-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	@media (min-width: 640px) {
		.works-grid { grid-template-columns: repeat(2, 1fr); }
	}
	
	.work-item {
		padding: 20px;
		background: #f9fafb;
		border-radius: 16px;
		border: 1px solid #f3f4f6;
	}
	
	.work-name {
		font-size: 15px;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 6px;
	}
	
	.work-desc {
		font-size: 13px;
		color: #6b7280;
		line-height: 1.6;
	}
	
	.quotes-list { display: flex; flex-direction: column; gap: 16px; }
	
	.quote-item {
		font-family: 'Amiri', serif;
		font-size: 18px;
		color: #374151;
		line-height: 2;
		padding: 20px 24px;
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-radius: 16px;
		border-right: 4px solid #d4af37;
		margin: 0;
	}
	
	.quote-mark { color: #d4af37; font-size: 24px; }
	
	.sidebar { display: flex; flex-direction: column; gap: 20px; }
	
	.sidebar-card {
		background: white;
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 4px 24px rgba(0,0,0,0.04);
	}
	
	.sidebar-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 16px;
		color: #1B4D3E;
	}
	
	.sidebar-header h3 {
		font-size: 16px;
		font-weight: 700;
		color: #1f2937;
	}
	
	.people-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.people-list li {
		padding: 10px 0;
		font-size: 14px;
		color: #4b5563;
		border-bottom: 1px solid #f3f4f6;
	}
	.people-list li:last-child { border-bottom: none; }
	
	.collection-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 20px;
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		border-radius: 16px;
		color: white;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	.collection-link:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(27,77,62,0.3);
	}
	
	.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
	.fade-in.visible { opacity: 1; transform: translateY(0); }
	
	@media (max-width: 768px) {
		.scholar-header { flex-direction: column; text-align: center; }
		.scholar-name { font-size: 1.75rem; }
		.scholar-meta { justify-content: center; }
	}
</style>
