<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronRight, ChevronLeft, Search, Filter, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	
	let mounted = $state(false);
	let searchQuery = $state('');
	
	const topicsData: Record<string, any> = {
		worship: { 
			icon: '🕌', 
			title: 'العبادات', 
			desc: 'أحاديث الصلاة والصيام والزكاة والحج والطهارة', 
			count: 12847,
			gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
			subtopics: [
				{ name: 'الصلاة', count: 3245 },
				{ name: 'الصيام', count: 1876 },
				{ name: 'الزكاة', count: 1234 },
				{ name: 'الحج', count: 2156 },
				{ name: 'الطهارة', count: 2890 },
				{ name: 'الذكر والدعاء', count: 1446 },
			]
		},
		transactions: { 
			icon: '🤝', 
			title: 'المعاملات', 
			desc: 'أحاديث البيع والشراء والزواج والميراث والعقود', 
			count: 8234,
			gradient: 'from-blue-400 via-indigo-500 to-violet-600',
			subtopics: [
				{ name: 'البيع والشراء', count: 2134 },
				{ name: 'الزواج', count: 1876 },
				{ name: 'الميراث', count: 987 },
				{ name: 'الإجارة', count: 1234 },
				{ name: 'الوقف', count: 876 },
				{ name: 'الهبة', count: 1127 },
			]
		},
		ethics: { 
			icon: '💎', 
			title: 'الأخلاق', 
			desc: 'أحاديث الصدق والصبر والإحسان والتواضع', 
			count: 6891,
			gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
			subtopics: [
				{ name: 'الصدق', count: 1234 },
				{ name: 'الصبر', count: 1456 },
				{ name: 'الإحسان', count: 987 },
				{ name: 'التواضع', count: 876 },
				{ name: 'الكرم', count: 1123 },
				{ name: 'العفو', count: 1215 },
			]
		},
		softening: { 
			icon: '❤️', 
			title: 'الرقائق', 
			desc: 'أحاديث الموت والجنة والنار والقيامة', 
			count: 4523,
			gradient: 'from-rose-400 via-pink-500 to-red-600',
			subtopics: [
				{ name: 'الموت', count: 876 },
				{ name: 'الجنة', count: 1234 },
				{ name: 'النار', count: 654 },
				{ name: 'القيامة', count: 987 },
				{ name: 'التوبة', count: 456 },
				{ name: 'الخشوع', count: 316 },
			]
		},
		rulings: { 
			icon: '⚖️', 
			title: 'الأحكام', 
			desc: 'أحاديث الحلال والحرام والفتاوى الشرعية', 
			count: 5167,
			gradient: 'from-amber-400 via-orange-500 to-red-500',
			subtopics: [
				{ name: 'الحلال والحرام', count: 1567 },
				{ name: 'القضاء', count: 987 },
				{ name: 'الحدود', count: 654 },
				{ name: 'الجهاد', count: 1234 },
				{ name: 'الأيمان والنذور', count: 725 },
			]
		},
		virtues: { 
			icon: '✨', 
			title: 'الفضائل', 
			desc: 'أحاديث فضائل الأعمال والأوقات والأماكن', 
			count: 7234,
			gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
			subtopics: [
				{ name: 'فضل الصلاة', count: 1876 },
				{ name: 'فضل الصيام', count: 1234 },
				{ name: 'فضل القرآن', count: 1567 },
				{ name: 'فضل الذكر', count: 1345 },
				{ name: 'فضل الجمعة', count: 1212 },
			]
		},
	};
	
	const sampleHadiths = [
		{ id: '1', text: 'الصَّلَوَاتُ الْخَمْسُ وَالْجُمُعَةُ إِلَى الْجُمُعَةِ كَفَّارَةٌ لِمَا بَيْنَهُنَّ مَا لَمْ تُغْشَ الْكَبَائِرُ', narrator: 'أبو هريرة رضي الله عنه', source: 'صحيح مسلم' },
		{ id: '2', text: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ', narrator: 'أبو هريرة رضي الله عنه', source: 'صحيح البخاري' },
		{ id: '3', text: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا', narrator: 'أبو هريرة رضي الله عنه', source: 'صحيح مسلم' },
		{ id: '4', text: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ', narrator: 'أبو مالك الأشعري رضي الله عنه', source: 'صحيح مسلم' },
	];
	
	let slug = $derived($page.params.slug);
	let topic = $derived(topicsData[slug] || topicsData.worship);
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	function handleHadithClick(hadith: any) {
		recentlyViewed.add({
			id: `topic-${slug}-${hadith.id}`,
			text: hadith.text,
			collection: hadith.source,
			narrator: hadith.narrator
		});
	}
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>{topic.title} - الباحث الحديثي | sunnah.one</title>
</svelte:head>

<div class="page-wrapper">
	<!-- Hero -->
	<section class="hero bg-gradient-to-br {topic.gradient}">
		<div class="pattern-layer"></div>
		<div class="particles">
			<div class="particle"></div>
			<div class="particle"></div>
			<div class="particle"></div>
			<div class="particle"></div>
		</div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<a href="/topics" class="back-link">
					<ChevronRight class="w-4 h-4" />
					<span>العودة للمواضيع</span>
				</a>
				
				<div class="topic-header">
					<div class="topic-icon">
						<span>{topic.icon}</span>
					</div>
					<h1 class="topic-title">{topic.title}</h1>
				</div>
				
				<p class="topic-desc">{topic.desc}</p>
				
				<div class="topic-stats">
					<div class="stat">
						<span class="stat-value">{formatNum(topic.count)}</span>
						<span class="stat-label">حديث</span>
					</div>
					<div class="stat-divider"></div>
					<div class="stat">
						<span class="stat-value">{topic.subtopics.length}</span>
						<span class="stat-label">قسم فرعي</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="hero-wave">
			<svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafafa"/>
			</svg>
		</div>
	</section>
	
	<!-- Subtopics -->
	<section class="subtopics-section">
		<div class="container">
			<h2 class="section-title fade-in" class:visible={mounted} style="transition-delay: 0.2s">الأقسام الفرعية</h2>
			<div class="subtopics-grid">
				{#each topic.subtopics as sub, i}
					<a href="/topics/{slug}/{sub.name}" class="subtopic-card fade-in" class:visible={mounted} style="transition-delay: {0.25 + i * 0.05}s">
						<span class="subtopic-name">{sub.name}</span>
						<span class="subtopic-count">{formatNum(sub.count)}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Hadiths -->
	<section class="hadiths-section">
		<div class="container">
			<div class="section-header fade-in" class:visible={mounted} style="transition-delay: 0.4s">
				<h2 class="section-title">أحاديث مختارة</h2>
				<div class="search-box">
					<Search class="search-icon" />
					<input type="search" bind:value={searchQuery} placeholder="ابحث..." class="search-input" />
				</div>
			</div>
			
			<div class="hadiths-list">
				{#each sampleHadiths as hadith, i}
					<a 
						href="/hadith/topic-{slug}-{hadith.id}" 
						class="hadith-card fade-in" 
						class:visible={mounted}
						style="transition-delay: {0.5 + i * 0.08}s"
						onclick={() => handleHadithClick(hadith)}
					>
						<div class="hadith-content">
							<p class="hadith-text">{hadith.text}</p>
							<div class="hadith-meta">
								<span class="hadith-narrator">{hadith.narrator}</span>
								<span class="hadith-source">{hadith.source}</span>
							</div>
						</div>
						<div class="hadith-arrow">
							<ChevronLeft class="w-5 h-5" />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.page-wrapper { min-height: 100vh; background: #fafafa; }
	
	.hero { position: relative; padding: 140px 0 80px; overflow: hidden; }
	
	.pattern-layer {
		position: absolute;
		inset: 0;
		opacity: 0.1;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 60px 60px;
	}
	
	.particles { position: absolute; inset: 0; pointer-events: none; }
	.particle {
		position: absolute;
		width: 8px;
		height: 8px;
		background: rgba(255,255,255,0.4);
		border-radius: 50%;
		animation: float 6s ease-in-out infinite;
	}
	.particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
	.particle:nth-child(2) { top: 40%; right: 15%; animation-delay: 1.5s; }
	.particle:nth-child(3) { bottom: 30%; left: 25%; animation-delay: 3s; }
	.particle:nth-child(4) { top: 60%; right: 30%; animation-delay: 4.5s; }
	
	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
		50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
	}
	
	.hero-content { max-width: 600px; text-align: center; margin: 0 auto; }
	
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: rgba(255,255,255,0.15);
		border-radius: 50px;
		color: white;
		font-size: 14px;
		text-decoration: none;
		margin-bottom: 32px;
		transition: all 0.2s ease;
		flex-direction: row-reverse;
	}
	.back-link:hover { background: rgba(255,255,255,0.25); }
	
	.topic-header { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 16px; }
	
	.topic-icon {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.2);
		border-radius: 32px;
		font-size: 56px;
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0,0,0,0.1);
	}
	
	.topic-title { font-size: 2.5rem; font-weight: 800; color: white; text-shadow: 0 4px 20px rgba(0,0,0,0.2); }
	.topic-desc { font-size: 1.125rem; color: rgba(255,255,255,0.9); margin-bottom: 32px; }
	
	.topic-stats {
		display: inline-flex;
		align-items: center;
		gap: 24px;
		padding: 16px 32px;
		background: rgba(255,255,255,0.15);
		border-radius: 60px;
		backdrop-filter: blur(10px);
	}
	.stat { text-align: center; }
	.stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: white; }
	.stat-label { font-size: 13px; color: rgba(255,255,255,0.8); }
	.stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.3); }
	
	.hero-wave { position: absolute; bottom: -1px; left: 0; right: 0; }
	.hero-wave svg { display: block; width: 100%; height: auto; }
	
	.subtopics-section { padding: 60px 0; }
	.section-title { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 24px; }
	
	.subtopics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}
	@media (min-width: 768px) { .subtopics-grid { grid-template-columns: repeat(3, 1fr); } }
	@media (min-width: 1024px) { .subtopics-grid { grid-template-columns: repeat(6, 1fr); } }
	
	.subtopic-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 24px 16px;
		background: white;
		border: 1px solid #f3f4f6;
		border-radius: 20px;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	.subtopic-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 16px 32px rgba(0,0,0,0.08);
		border-color: #1a5f4f;
	}
	.subtopic-name { font-size: 15px; font-weight: 600; color: #111827; }
	.subtopic-count { font-size: 13px; color: #1a5f4f; font-weight: 500; }
	
	.hadiths-section { padding: 0 0 80px; }
	
	.section-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}
	
	.search-box { position: relative; width: 280px; }
	.search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #9ca3af; }
	.search-input {
		width: 100%;
		padding: 12px 44px 12px 16px;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 14px;
		outline: none;
	}
	.search-input:focus { border-color: #1a5f4f; }
	
	.hadiths-list { display: flex; flex-direction: column; gap: 16px; }
	
	.hadith-card {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 28px;
		background: white;
		border: 1px solid #f3f4f6;
		border-radius: 24px;
		text-decoration: none;
		transition: all 0.4s ease;
	}
	.hadith-card:hover {
		transform: translateX(8px);
		box-shadow: 0 16px 40px rgba(0,0,0,0.08);
	}
	
	.hadith-content { flex: 1; }
	.hadith-text {
		font-family: 'Amiri', serif;
		font-size: 20px;
		color: #1f2937;
		line-height: 2.2;
		margin-bottom: 12px;
	}
	.hadith-meta { display: flex; flex-wrap: wrap; gap: 16px; }
	.hadith-narrator { font-size: 14px; color: #1a5f4f; font-weight: 500; }
	.hadith-source { font-size: 14px; color: #9ca3af; }
	
	.hadith-arrow {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f4f6;
		border-radius: 14px;
		color: #9ca3af;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}
	.hadith-card:hover .hadith-arrow { background: #1a5f4f; color: white; }
	
	.fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
	.fade-in.visible { opacity: 1; transform: translateY(0); }
</style>
