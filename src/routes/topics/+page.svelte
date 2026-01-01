<script lang="ts">
	import { ChevronLeft, Search, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	let searchQuery = $state('');
	let hoveredTopic = $state<string | null>(null);
	
	const topics = [
		{ 
			slug: 'worship', 
			icon: '🕌', 
			title: 'العبادات', 
			desc: 'الصلاة، الصيام، الزكاة، الحج', 
			count: 12847, 
			gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
			subtopics: ['الصلاة', 'الصيام', 'الزكاة', 'الحج', 'الطهارة', 'الذكر']
		},
		{ 
			slug: 'transactions', 
			icon: '🤝', 
			title: 'المعاملات', 
			desc: 'البيع، الزواج، الميراث، العقود', 
			count: 8234, 
			gradient: 'from-blue-400 via-indigo-500 to-violet-600',
			subtopics: ['البيع والشراء', 'الزواج', 'الميراث', 'الإجارة', 'الوقف']
		},
		{ 
			slug: 'ethics', 
			icon: '💎', 
			title: 'الأخلاق', 
			desc: 'الصدق، الصبر، الإحسان، التواضع', 
			count: 6891, 
			gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
			subtopics: ['الصدق', 'الصبر', 'الإحسان', 'التواضع', 'الكرم', 'العفو']
		},
		{ 
			slug: 'softening', 
			icon: '❤️', 
			title: 'الرقائق', 
			desc: 'الموت، الجنة، النار، القيامة', 
			count: 4523, 
			gradient: 'from-rose-400 via-pink-500 to-red-600',
			subtopics: ['الموت', 'الجنة', 'النار', 'القيامة', 'التوبة', 'الخشوع']
		},
		{ 
			slug: 'rulings', 
			icon: '⚖️', 
			title: 'الأحكام', 
			desc: 'الحلال، الحرام، الفتاوى الشرعية', 
			count: 5167, 
			gradient: 'from-amber-400 via-orange-500 to-red-500',
			subtopics: ['الحلال والحرام', 'القضاء', 'الحدود', 'الجهاد', 'الأيمان']
		},
		{ 
			slug: 'virtues', 
			icon: '✨', 
			title: 'الفضائل', 
			desc: 'فضائل الأعمال والأوقات والأماكن', 
			count: 7234, 
			gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
			subtopics: ['فضل الصلاة', 'فضل الصيام', 'فضل القرآن', 'فضل الذكر', 'فضل الجمعة']
		},
	];
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>المواضيع - الباحث الحديثي | sunnah.one</title>
	<meta name="description" content="تصفح الأحاديث النبوية مصنفة حسب المواضيع" />
</svelte:head>

<div class="page-wrapper">
	<!-- Hero Section -->
	<section class="hero">
		<div class="pattern-layer pattern-1"></div>
		<div class="pattern-layer pattern-2"></div>
		<div class="pattern-layer pattern-3"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<div class="hero-badge">
					<Sparkles class="w-4 h-4" />
					<span>تصنيف موضوعي</span>
				</div>
				<h1 class="hero-title">تصفح حسب الموضوع</h1>
				<p class="hero-subtitle">استكشف الأحاديث النبوية الشريفة مصنفة حسب مواضيع الحياة المختلفة</p>
				
				<!-- Search -->
				<div class="search-box">
					<Search class="search-icon" />
					<input 
						type="search" 
						bind:value={searchQuery}
						placeholder="ابحث في المواضيع..."
						class="search-input"
					/>
				</div>
				
				<!-- Stats -->
				<div class="hero-stats">
					<div class="hero-stat">
						<span class="hero-stat-value">٦</span>
						<span class="hero-stat-label">أقسام رئيسية</span>
					</div>
					<div class="hero-stat-divider"></div>
					<div class="hero-stat">
						<span class="hero-stat-value">+٤٤ ألف</span>
						<span class="hero-stat-label">حديث مصنف</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
</div>

	<!-- Topics Grid -->
	<section class="topics-section">
		<div class="container">
			<div class="topics-grid">
				{#each topics as topic, i}
					<a 
						href="/topics/{topic.slug}" 
						class="topic-card fade-in" 
						class:visible={mounted}
						style="transition-delay: {0.1 + i * 0.1}s"
						onmouseenter={() => hoveredTopic = topic.slug}
						onmouseleave={() => hoveredTopic = null}
					>
						<!-- Background Gradient -->
						<div class="card-bg bg-gradient-to-br {topic.gradient}"></div>
						
						<!-- Floating Particles -->
						<div class="particles">
							<div class="particle"></div>
							<div class="particle"></div>
							<div class="particle"></div>
						</div>
						
						<!-- Content -->
						<div class="card-content">
							<!-- Icon -->
							<div class="topic-icon-wrapper">
								<div class="topic-icon">
									<span>{topic.icon}</span>
								</div>
								<div class="icon-ring"></div>
							</div>
							
							<!-- Text -->
							<h2 class="topic-title">{topic.title}</h2>
							<p class="topic-desc">{topic.desc}</p>
							
							<!-- Subtopics Preview -->
							<div class="subtopics">
								{#each topic.subtopics.slice(0, 4) as sub}
									<span class="subtopic-tag">{sub}</span>
								{/each}
								{#if topic.subtopics.length > 4}
									<span class="subtopic-more">+{topic.subtopics.length - 4}</span>
								{/if}
							</div>
							
							<!-- Footer -->
							<div class="card-footer">
								<div class="topic-count">
									<span class="count-value">{formatNum(topic.count)}</span>
									<span class="count-label">حديث</span>
								</div>
								<div class="topic-action">
									<span>استكشف</span>
									<ChevronLeft class="w-4 h-4" />
								</div>
							</div>
						</div>
						
						<!-- Decorative Elements -->
						<div class="card-shine"></div>
					</a>
				{/each}
			</div>
		</div>
	</section>

<style>
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(180deg, #faf8f5 0%, #ffffff 50%, #f8faf9 100%);
	}
	
	/* Hero */
	.hero {
		position: relative;
		padding: 160px 0 100px;
		background: linear-gradient(165deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
		overflow: hidden;
	}
	
	.pattern-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	.pattern-1 {
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.5'%3E%3Cpolygon points='50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5'/%3E%3Cpolygon points='50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 100px 100px;
	}
	
	.pattern-2 {
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='white' stroke-width='0.3'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
		animation: patternMove 60s linear infinite;
	}
	
	.pattern-3 {
		opacity: 0.02;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23e94560' stroke-width='0.3'%3E%3Ccircle cx='60' cy='60' r='40'/%3E%3Ccircle cx='60' cy='60' r='25'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 120px 120px;
	}
	
	@keyframes patternMove {
		0% { transform: translate(0, 0); }
		100% { transform: translate(80px, 80px); }
	}
	
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		animation: orbFloat 20s ease-in-out infinite;
	}
	.orb-1 {
		width: 500px;
		height: 500px;
		background: rgba(233, 69, 96, 0.15);
		top: -150px;
		right: -100px;
	}
	.orb-2 {
		width: 400px;
		height: 400px;
		background: rgba(212, 175, 55, 0.12);
		bottom: -100px;
		left: -50px;
		animation-delay: -10s;
	}
	.orb-3 {
		width: 300px;
		height: 300px;
		background: rgba(79, 172, 254, 0.1);
		top: 50%;
		left: 30%;
		animation-delay: -5s;
	}
	
	@keyframes orbFloat {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(30px, -30px) scale(1.1); }
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
		background: rgba(233, 69, 96, 0.15);
		border: 1px solid rgba(233, 69, 96, 0.3);
		border-radius: 50px;
		color: #e94560;
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
		margin: 0 auto 32px;
		position: relative;
	}
	
	.search-icon {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		color: rgba(255,255,255,0.5);
	}
	
	.search-input {
		width: 100%;
		padding: 18px 56px 18px 24px;
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.15);
		border-radius: 60px;
		font-size: 16px;
		color: white;
		outline: none;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	.search-input::placeholder { color: rgba(255,255,255,0.4); }
	.search-input:focus {
		background: rgba(255,255,255,0.12);
		border-color: rgba(233, 69, 96, 0.5);
		box-shadow: 0 0 0 4px rgba(233, 69, 96, 0.1);
	}
	
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
		text-align: center;
	}
	.hero-stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #d4af37;
	}
	.hero-stat-label {
		font-size: 13px;
		color: rgba(255,255,255,0.6);
	}
	.hero-stat-divider {
		width: 1px;
		height: 40px;
		background: rgba(255,255,255,0.15);
	}
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 6px;
		background: linear-gradient(90deg, #e94560, #d4af37, #4facfe, #e94560);
		background-size: 300% 100%;
		animation: borderFlow 10s linear infinite;
	}
	@keyframes borderFlow {
		0% { background-position: 0% 0%; }
		100% { background-position: 300% 0%; }
	}
	
	/* Topics Section */
	.topics-section {
		padding: 80px 0 120px;
	}
	
	.topics-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}
	@media (min-width: 768px) {
		.topics-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.topics-grid { grid-template-columns: repeat(3, 1fr); }
	}
	
	.topic-card {
		position: relative;
		display: block;
		padding: 32px;
		background: white;
		border-radius: 32px;
		text-decoration: none;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 24px rgba(0,0,0,0.04);
	}
	.topic-card:hover {
		transform: translateY(-16px) scale(1.02);
		box-shadow: 0 40px 80px rgba(0,0,0,0.15);
	}
	
	.card-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.5s ease;
	}
	.topic-card:hover .card-bg {
		opacity: 1;
	}
	
	.card-shine {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			45deg,
			transparent 40%,
			rgba(255,255,255,0.1) 50%,
			transparent 60%
		);
		transform: translateX(-100%);
		transition: transform 0.8s ease;
	}
	.topic-card:hover .card-shine {
		transform: translateX(100%);
	}
	
	.particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.topic-card:hover .particles {
		opacity: 1;
	}
	
	.particle {
		position: absolute;
		width: 6px;
		height: 6px;
		background: rgba(255,255,255,0.6);
		border-radius: 50%;
		animation: particleFloat 3s ease-in-out infinite;
	}
	.particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
	.particle:nth-child(2) { top: 60%; right: 15%; animation-delay: 1s; }
	.particle:nth-child(3) { bottom: 20%; left: 30%; animation-delay: 2s; }
	
	@keyframes particleFloat {
		0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
		50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
	}
	
	.card-content {
		position: relative;
		z-index: 1;
	}
	
	.topic-icon-wrapper {
		position: relative;
		width: 80px;
		height: 80px;
		margin-bottom: 24px;
	}
	
	.topic-icon {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		border-radius: 24px;
		font-size: 40px;
		transition: all 0.4s ease;
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
	}
	.topic-card:hover .topic-icon {
		background: rgba(255,255,255,0.2);
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 12px 32px rgba(0,0,0,0.2);
	}
	
	.icon-ring {
		position: absolute;
		inset: -8px;
		border: 2px dashed #e5e7eb;
		border-radius: 32px;
		opacity: 0;
		transition: all 0.4s ease;
	}
	.topic-card:hover .icon-ring {
		opacity: 1;
		border-color: rgba(255,255,255,0.3);
		animation: ringRotate 10s linear infinite;
	}
	
	@keyframes ringRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.topic-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 8px;
		transition: color 0.3s ease;
	}
	.topic-card:hover .topic-title {
		color: white;
	}
	
	.topic-desc {
		font-size: 15px;
		color: #6b7280;
		margin-bottom: 20px;
		transition: color 0.3s ease;
	}
	.topic-card:hover .topic-desc {
		color: rgba(255,255,255,0.8);
	}
	
	.subtopics {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 24px;
	}
	
	.subtopic-tag {
		padding: 6px 14px;
		background: #f3f4f6;
		border-radius: 50px;
		font-size: 13px;
		color: #6b7280;
		transition: all 0.3s ease;
	}
	.topic-card:hover .subtopic-tag {
		background: rgba(255,255,255,0.2);
		color: white;
	}
	
	.subtopic-more {
		padding: 6px 14px;
		background: #e5e7eb;
		border-radius: 50px;
		font-size: 13px;
		font-weight: 600;
		color: #9ca3af;
		transition: all 0.3s ease;
	}
	.topic-card:hover .subtopic-more {
		background: rgba(255,255,255,0.3);
		color: white;
	}
	
	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 20px;
		border-top: 1px solid #f3f4f6;
		transition: border-color 0.3s ease;
	}
	.topic-card:hover .card-footer {
		border-color: rgba(255,255,255,0.2);
	}
	
	.topic-count {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}
	.count-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1a5f4f;
		transition: color 0.3s ease;
	}
	.topic-card:hover .count-value {
		color: white;
	}
	.count-label {
		font-size: 14px;
		color: #9ca3af;
		transition: color 0.3s ease;
	}
	.topic-card:hover .count-label {
		color: rgba(255,255,255,0.7);
	}
	
	.topic-action {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		background: #f3f4f6;
		border-radius: 50px;
		font-size: 14px;
		font-weight: 600;
		color: #6b7280;
		transition: all 0.3s ease;
		flex-direction: row-reverse;
	}
	.topic-card:hover .topic-action {
		background: rgba(255,255,255,0.2);
		color: white;
		transform: translateX(6px);
	}
	
	/* Animations */
	.fade-in {
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}
	.fade-in.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
