<script lang="ts">
	import { page } from '$app/stores';
	import { BookOpen, Star, ChevronRight, ChevronLeft, Search, Filter, Grid, List, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	
	let mounted = $state(false);
	let viewMode = $state<'grid' | 'list'>('list');
	let searchQuery = $state('');
	
	const collectionsData: Record<string, any> = {
		bukhari: { 
			arabicName: 'صحيح البخاري', 
			arabicAuthor: 'الإمام محمد بن إسماعيل البخاري', 
			hadithCount: 7563, 
			grade: 'صحيح',
			year: '256 هـ',
			color: 'emerald',
			description: 'أصح كتاب بعد كتاب الله تعالى، جمع فيه الإمام البخاري الأحاديث الصحيحة المسندة إلى رسول الله ﷺ'
		},
		muslim: { 
			arabicName: 'صحيح مسلم', 
			arabicAuthor: 'الإمام مسلم بن الحجاج النيسابوري', 
			hadithCount: 7500, 
			grade: 'صحيح',
			year: '261 هـ',
			color: 'blue',
			description: 'ثاني أصح كتاب بعد صحيح البخاري، اشترط فيه الإمام مسلم الصحة في جميع أحاديثه'
		},
		tirmidhi: { 
			arabicName: 'جامع الترمذي', 
			arabicAuthor: 'الإمام محمد بن عيسى الترمذي', 
			hadithCount: 3956, 
			grade: 'حسن',
			year: '279 هـ',
			color: 'amber',
			description: 'من أهم كتب السنن، يتميز ببيان درجة الحديث وذكر مذاهب الفقهاء'
		},
		abudawud: { 
			arabicName: 'سنن أبي داود', 
			arabicAuthor: 'الإمام سليمان بن الأشعث السجستاني', 
			hadithCount: 5274, 
			grade: 'حسن',
			year: '275 هـ',
			color: 'purple',
			description: 'من أمهات كتب الحديث، يركز على أحاديث الأحكام الفقهية'
		},
		nasai: { 
			arabicName: 'سنن النسائي', 
			arabicAuthor: 'الإمام أحمد بن شعيب النسائي', 
			hadithCount: 5761, 
			grade: 'حسن',
			year: '303 هـ',
			color: 'rose',
			description: 'أقل الكتب الستة ضعفاً بعد الصحيحين، يتميز بدقة التبويب'
		},
		ibnmajah: { 
			arabicName: 'سنن ابن ماجه', 
			arabicAuthor: 'الإمام محمد بن يزيد ابن ماجه', 
			hadithCount: 4341, 
			grade: 'حسن',
			year: '273 هـ',
			color: 'cyan',
			description: 'سادس الكتب الستة، يحتوي على أحاديث انفرد بها عن بقية الكتب'
		},
	};
	
	// Sample hadiths for demo
	const sampleHadiths = [
		{ id: '1', text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', narrator: 'عمر بن الخطاب رضي الله عنه', chapter: 'بدء الوحي', number: 1 },
		{ id: '2', text: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', narrator: 'عبد الله بن عمر رضي الله عنهما', chapter: 'الإيمان', number: 8 },
		{ id: '3', text: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', narrator: 'عبد الله بن عمرو رضي الله عنهما', chapter: 'الإيمان', number: 10 },
		{ id: '4', text: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', narrator: 'أنس بن مالك رضي الله عنه', chapter: 'الإيمان', number: 13 },
		{ id: '5', text: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', narrator: 'أبو هريرة رضي الله عنه', chapter: 'الإيمان', number: 15 },
	];
	
	let slug = $derived($page.params.slug);
	let collection = $derived(collectionsData[slug] || collectionsData.bukhari);
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	function handleHadithClick(hadith: any) {
		recentlyViewed.add({
			id: `${slug}-${hadith.id}`,
			text: hadith.text,
			collection: collection.arabicName,
			narrator: hadith.narrator
		});
	}
	
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>{collection.arabicName} - الباحث الحديثي | sunnah.one</title>
</svelte:head>

<div class="page-wrapper">
	<!-- Hero -->
	<section class="hero">
		<div class="pattern-layer"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<a href="/collections" class="back-link">
					<ChevronRight class="w-4 h-4" />
					<span>العودة للكتب</span>
				</a>
				
				<div class="book-header">
					<div class="book-icon">
						<BookOpen class="w-8 h-8 text-white" />
					</div>
					<div class="book-info">
						<div class="book-badge">
							{#if collection.grade === 'صحيح'}
								<Star class="w-4 h-4" />
							{/if}
							<span>{collection.grade}</span>
						</div>
						<h1 class="book-title">{collection.arabicName}</h1>
						<p class="book-author">{collection.arabicAuthor} • {collection.year}</p>
					</div>
				</div>
				
				<p class="book-desc">{collection.description}</p>
				
				<div class="book-stats">
					<div class="stat">
						<span class="stat-value">{formatNum(collection.hadithCount)}</span>
						<span class="stat-label">حديث</span>
					</div>
					<div class="stat-divider"></div>
					<div class="stat">
						<span class="stat-value">٩٧</span>
						<span class="stat-label">كتاب</span>
					</div>
					<div class="stat-divider"></div>
					<div class="stat">
						<span class="stat-value">٣٤٥٠</span>
						<span class="stat-label">باب</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
	
	<!-- Content -->
	<section class="content-section">
		<div class="container">
			<!-- Toolbar -->
			<div class="toolbar fade-in" class:visible={mounted} style="transition-delay: 0.2s">
				<div class="search-box">
					<Search class="search-icon" />
					<input type="search" bind:value={searchQuery} placeholder="ابحث في الأحاديث..." class="search-input" />
				</div>
				<div class="toolbar-actions">
					<button class="filter-btn">
						<Filter class="w-4 h-4" />
						<span>تصفية</span>
					</button>
					<div class="view-toggle">
						<button class="view-btn" class:active={viewMode === 'list'} onclick={() => viewMode = 'list'}>
							<List class="w-4 h-4" />
						</button>
						<button class="view-btn" class:active={viewMode === 'grid'} onclick={() => viewMode = 'grid'}>
							<Grid class="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
			
			<!-- Hadiths List -->
			<div class="hadiths-list">
				{#each sampleHadiths as hadith, i}
					<a 
						href="/hadith/{slug}-{hadith.id}" 
						class="hadith-card fade-in" 
						class:visible={mounted}
						style="transition-delay: {0.3 + i * 0.05}s"
						onclick={() => handleHadithClick(hadith)}
					>
						<div class="hadith-number">{hadith.number}</div>
						<div class="hadith-content">
							<p class="hadith-text">{hadith.text}</p>
							<div class="hadith-meta">
								<span class="hadith-narrator">{hadith.narrator}</span>
								<span class="hadith-chapter">{hadith.chapter}</span>
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
	.page-wrapper {
		min-height: 100vh;
		background: #fafafa;
	}
	
	.hero {
		position: relative;
		padding: 140px 0 60px;
		background: linear-gradient(165deg, #0a2e25 0%, #1a5f4f 50%, #0d3d32 100%);
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
		margin-bottom: 24px;
		transition: all 0.2s ease;
		flex-direction: row-reverse;
	}
	.back-link:hover { background: rgba(255,255,255,0.15); color: white; }
	
	.book-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; }
	
	.book-icon {
		width: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 100%);
		border: 1px solid rgba(212,175,55,0.3);
		border-radius: 20px;
		flex-shrink: 0;
	}
	
	.book-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 12px;
		background: rgba(212,175,55,0.2);
		border-radius: 50px;
		color: #d4af37;
		font-size: 12px;
		font-weight: 600;
		margin-bottom: 8px;
	}
	
	.book-title { font-size: 2rem; font-weight: 800; color: white; margin-bottom: 4px; }
	.book-author { font-size: 15px; color: rgba(255,255,255,0.6); }
	.book-desc { font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 24px; max-width: 600px; }
	
	.book-stats {
		display: inline-flex;
		align-items: center;
		gap: 24px;
		padding: 16px 32px;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 60px;
	}
	.stat { text-align: center; }
	.stat-value { display: block; font-size: 1.25rem; font-weight: 700; color: #d4af37; }
	.stat-label { font-size: 13px; color: rgba(255,255,255,0.5); }
	.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #1a5f4f, #d4af37, #1a5f4f);
	}
	
	.content-section { padding: 40px 0 80px; }
	
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}
	
	.search-box { position: relative; flex: 1; max-width: 400px; }
	.search-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #9ca3af; }
	.search-input {
		width: 100%;
		padding: 14px 48px 14px 16px;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 15px;
		outline: none;
		transition: all 0.2s ease;
	}
	.search-input:focus { border-color: #1a5f4f; box-shadow: 0 0 0 3px rgba(26,95,79,0.1); }
	
	.toolbar-actions { display: flex; align-items: center; gap: 12px; }
	
	.filter-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 12px 20px;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 14px;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.filter-btn:hover { border-color: #1a5f4f; color: #1a5f4f; }
	
	.view-toggle { display: flex; background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
	.view-btn {
		padding: 10px 14px;
		background: transparent;
		border: none;
		color: #9ca3af;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.view-btn.active { background: #1a5f4f; color: white; }
	
	.hadiths-list { display: flex; flex-direction: column; gap: 12px; }
	
	.hadith-card {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 24px;
		background: white;
		border: 1px solid #f3f4f6;
		border-radius: 20px;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	.hadith-card:hover {
		transform: translateX(8px);
		box-shadow: 0 12px 32px rgba(0,0,0,0.08);
		border-color: rgba(26,95,79,0.2);
	}
	
	.hadith-number {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-radius: 14px;
		font-size: 16px;
		font-weight: 700;
		color: #1a5f4f;
		flex-shrink: 0;
	}
	
	.hadith-content { flex: 1; min-width: 0; }
	
	.hadith-text {
		font-family: 'Amiri', serif;
		font-size: 18px;
		color: #1f2937;
		line-height: 2;
		margin-bottom: 8px;
	}
	
	.hadith-meta { display: flex; flex-wrap: wrap; gap: 16px; }
	.hadith-narrator { font-size: 13px; color: #1a5f4f; font-weight: 500; }
	.hadith-chapter { font-size: 13px; color: #9ca3af; }
	
	.hadith-arrow {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f9fafb;
		border-radius: 12px;
		color: #9ca3af;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}
	.hadith-card:hover .hadith-arrow { background: #1a5f4f; color: white; transform: translateX(4px); }
	
	.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
	.fade-in.visible { opacity: 1; transform: translateY(0); }
</style>
