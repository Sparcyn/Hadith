<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { 
		BookOpen, Star, ChevronRight, Copy, Share2, Check, 
		Image, Bookmark, BookmarkCheck, Heart, MessageCircle,
		ChevronLeft, Volume2, ExternalLink
	} from 'lucide-svelte';
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	import { ImageGeneratorModal } from '$lib/components/ui';
	
	let mounted = $state(false);
	let copied = $state(false);
	let bookmarked = $state(false);
	let showImageModal = $state(false);
	
	// Parse the hadith ID (format: collection-number)
	let hadithId = $derived($page.params.id || 'bukhari-1');
	let [collectionSlug, hadithNum] = $derived(hadithId.split('-'));
	
	// Collections data
	const collectionsData: Record<string, any> = {
		bukhari: { 
			arabicName: 'صحيح البخاري', 
			arabicAuthor: 'الإمام محمد بن إسماعيل البخاري', 
			grade: 'صحيح',
			color: 'emerald'
		},
		muslim: { 
			arabicName: 'صحيح مسلم', 
			arabicAuthor: 'الإمام مسلم بن الحجاج النيسابوري', 
			grade: 'صحيح',
			color: 'blue'
		},
		tirmidhi: { 
			arabicName: 'جامع الترمذي', 
			arabicAuthor: 'الإمام محمد بن عيسى الترمذي', 
			grade: 'حسن',
			color: 'amber'
		},
		abudawud: { 
			arabicName: 'سنن أبي داود', 
			arabicAuthor: 'الإمام سليمان بن الأشعث السجستاني', 
			grade: 'حسن',
			color: 'purple'
		},
		nasai: { 
			arabicName: 'سنن النسائي', 
			arabicAuthor: 'الإمام أحمد بن شعيب النسائي', 
			grade: 'حسن',
			color: 'rose'
		},
		ibnmajah: { 
			arabicName: 'سنن ابن ماجه', 
			arabicAuthor: 'الإمام محمد بن يزيد ابن ماجه', 
			grade: 'حسن',
			color: 'cyan'
		},
	};
	
	// Sample hadiths database (in real app, this would come from API)
	const hadithsDatabase: Record<string, any> = {
		'bukhari-1': {
			arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
			narrator: 'عمر بن الخطاب رضي الله عنه',
			chapter: 'بدء الوحي',
			book: 'كتاب بدء الوحي',
			number: 1,
			topics: ['النية', 'الإخلاص', 'الهجرة'],
			explanation: 'هذا الحديث أصل عظيم من أصول الإسلام، وهو ميزان الأعمال الباطنة، فإن الأعمال تصلح وتفسد بحسب النية.',
			relatedVerses: ['وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ']
		},
		'bukhari-2': {
			arabicText: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ',
			narrator: 'عبد الله بن عمر رضي الله عنهما',
			chapter: 'الإيمان',
			book: 'كتاب الإيمان',
			number: 8,
			topics: ['أركان الإسلام', 'الإيمان', 'العبادات'],
			explanation: 'هذا الحديث يبين أركان الإسلام الخمسة التي يقوم عليها الدين.',
			relatedVerses: []
		},
		'bukhari-3': {
			arabicText: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ',
			narrator: 'عبد الله بن عمرو رضي الله عنهما',
			chapter: 'الإيمان',
			book: 'كتاب الإيمان',
			number: 10,
			topics: ['الأخلاق', 'حقوق المسلم', 'الهجرة'],
			explanation: 'يبين هذا الحديث حقيقة الإسلام وأنه يتضمن سلامة المسلمين من أذى اللسان واليد.',
			relatedVerses: []
		},
		'bukhari-4': {
			arabicText: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
			narrator: 'أنس بن مالك رضي الله عنه',
			chapter: 'الإيمان',
			book: 'كتاب الإيمان',
			number: 13,
			topics: ['الإيمان', 'الأخوة', 'المحبة'],
			explanation: 'هذا الحديث من جوامع الكلم، يدل على كمال الإيمان بمحبة الخير للمسلمين.',
			relatedVerses: []
		},
		'bukhari-5': {
			arabicText: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
			narrator: 'أبو هريرة رضي الله عنه',
			chapter: 'الإيمان',
			book: 'كتاب الإيمان',
			number: 15,
			topics: ['الإيمان', 'الأخلاق', 'حق الجار', 'الضيافة'],
			explanation: 'يربط هذا الحديث بين الإيمان والأخلاق الحسنة من حفظ اللسان وإكرام الجار والضيف.',
			relatedVerses: []
		},
		'muslim-671': {
			arabicText: 'إِنَّ أَحَبَّ بِلَادِ اللَّهِ إِلَى اللَّهِ مَسَاجِدُهَا، وَأَبْغَضَ بِلَادِ اللَّهِ إِلَى اللَّهِ أَسْوَاقُهَا',
			narrator: 'أبو هريرة رضي الله عنه',
			chapter: 'المساجد',
			book: 'كتاب المساجد ومواضع الصلاة',
			number: 671,
			topics: ['المساجد', 'الأسواق', 'فضل المساجد'],
			explanation: 'يبين هذا الحديث فضل المساجد وأنها أحب البقاع إلى الله لأنها بيوت الله ومواضع ذكره وعبادته.',
			relatedVerses: ['فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ']
		}
	};
	
	let collection = $derived(collectionsData[collectionSlug] || collectionsData.bukhari);
	let hadith = $derived(hadithsDatabase[hadithId] || hadithsDatabase['bukhari-1']);
	
	// Related hadiths (same topic)
	let relatedHadiths = $derived(
		Object.entries(hadithsDatabase)
			.filter(([id, h]) => id !== hadithId && h.topics?.some((t: string) => hadith.topics?.includes(t)))
			.slice(0, 3)
			.map(([id, h]) => ({ id, ...h }))
	);

	async function copyText() {
		await navigator.clipboard.writeText(hadith.arabicText);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
	
	function toggleBookmark() {
		bookmarked = !bookmarked;
	}
	
	function openImageGenerator() {
		showImageModal = true;
	}
	
	function closeImageGenerator() {
		showImageModal = false;
	}
	
	onMount(() => {
		mounted = true;
		// Add to recently viewed
		recentlyViewed.add({
			id: hadithId,
			text: hadith.arabicText,
			collection: collection.arabicName,
			narrator: hadith.narrator
		});
	});
</script>

<svelte:head>
	<title>حديث {hadith.number} - {collection.arabicName} | الباحث الحديثي</title>
	<meta name="description" content="{hadith.arabicText.slice(0, 150)}..." />
</svelte:head>

<div class="page-wrapper">
	<!-- Hero Section -->
	<section class="hero">
		<div class="pattern-layer"></div>
		<div class="pattern-layer-2"></div>
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		
		<div class="container relative z-10">
			<div class="hero-content fade-in" class:visible={mounted}>
				<!-- Breadcrumb -->
				<nav class="breadcrumb">
					<a href="/" class="breadcrumb-link">الرئيسية</a>
					<ChevronLeft class="w-4 h-4 text-white/40" />
					<a href="/collections" class="breadcrumb-link">الكتب</a>
					<ChevronLeft class="w-4 h-4 text-white/40" />
					<a href="/collections/{collectionSlug}" class="breadcrumb-link">{collection.arabicName}</a>
					<ChevronLeft class="w-4 h-4 text-white/40" />
					<span class="breadcrumb-current">حديث {hadith.number}</span>
				</nav>
				
				<!-- Collection Badge -->
				<div class="collection-badge">
					<BookOpen class="w-5 h-5" />
					<span>{collection.arabicName}</span>
					<span class="badge-divider">•</span>
					<span>{hadith.book}</span>
				</div>
				
				<!-- Hadith Number -->
				<div class="hadith-number-badge">
					<span class="number-label">حديث رقم</span>
					<span class="number-value">{hadith.number}</span>
				</div>
				
				<!-- Grade Badge -->
				<div class="grade-badge">
					{#if collection.grade === 'صحيح'}
						<Star class="w-4 h-4" />
					{/if}
					<span>{collection.grade}</span>
				</div>
			</div>
		</div>
		
		<div class="hero-border"></div>
	</section>
	
	<!-- Main Content -->
	<section class="content-section">
		<div class="container">
			<div class="content-grid">
				<!-- Main Hadith Card -->
				<div class="main-content">
					<div class="hadith-card fade-in" class:visible={mounted} style="transition-delay: 0.1s">
						<!-- Decorative Corners -->
						<div class="card-corner top-right"></div>
						<div class="card-corner top-left"></div>
						<div class="card-corner bottom-right"></div>
						<div class="card-corner bottom-left"></div>
						
						<!-- Opening Bismillah -->
						<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
						
						<!-- Opening Quote -->
						<div class="quote-mark">❝</div>
						
						<!-- Arabic Text -->
						<p class="hadith-text">
							{hadith.arabicText}
						</p>
						
						<!-- Closing Quote -->
						<div class="quote-mark closing">❞</div>
						
						<!-- Ornamental Divider -->
						<div class="ornament-divider">
							<span class="ornament">✦</span>
							<span class="ornament-line"></span>
							<span class="ornament">❖</span>
							<span class="ornament-line"></span>
							<span class="ornament">✦</span>
						</div>
						
						<!-- Narrator Info -->
						<div class="narrator-section">
							<div class="narrator-avatar">
								<span>ر</span>
							</div>
							<div class="narrator-info">
								<p class="narrator-label">الراوي</p>
								<p class="narrator-name">{hadith.narrator}</p>
							</div>
						</div>
						
						<!-- Reference -->
						<div class="reference-section">
							<div class="reference-item">
								<span class="ref-label">المصدر</span>
								<span class="ref-value">{collection.arabicName}</span>
							</div>
							<div class="reference-item">
								<span class="ref-label">الكتاب</span>
								<span class="ref-value">{hadith.book}</span>
							</div>
							<div class="reference-item">
								<span class="ref-label">الباب</span>
								<span class="ref-value">{hadith.chapter}</span>
							</div>
							<div class="reference-item">
								<span class="ref-label">رقم الحديث</span>
								<span class="ref-value">{hadith.number}</span>
							</div>
						</div>
					</div>
					
					<!-- Actions Bar -->
					<div class="actions-bar fade-in" class:visible={mounted} style="transition-delay: 0.2s">
						<button class="action-btn" onclick={copyText}>
							{#if copied}
								<Check class="w-5 h-5" />
								<span>تم النسخ</span>
							{:else}
								<Copy class="w-5 h-5" />
								<span>نسخ</span>
							{/if}
						</button>
						<button class="action-btn">
							<Share2 class="w-5 h-5" />
							<span>مشاركة</span>
						</button>
						<button class="action-btn" onclick={toggleBookmark}>
							{#if bookmarked}
								<BookmarkCheck class="w-5 h-5 text-amber-500" />
								<span>تم الحفظ</span>
							{:else}
								<Bookmark class="w-5 h-5" />
								<span>حفظ</span>
							{/if}
						</button>
						<button class="action-btn gold" onclick={openImageGenerator}>
							<Image class="w-5 h-5" />
							<span>إنشاء صورة</span>
						</button>
					</div>

					<!-- Explanation Section -->
					{#if hadith.explanation}
						<div class="explanation-card fade-in" class:visible={mounted} style="transition-delay: 0.3s">
							<div class="explanation-header">
								<div class="explanation-icon">
									<MessageCircle class="w-5 h-5" />
								</div>
								<h3 class="explanation-title">شرح الحديث</h3>
							</div>
							<p class="explanation-text">{hadith.explanation}</p>
						</div>
					{/if}
					
					<!-- Topics Tags -->
					{#if hadith.topics?.length}
						<div class="topics-section fade-in" class:visible={mounted} style="transition-delay: 0.35s">
							<h3 class="topics-title">المواضيع</h3>
							<div class="topics-list">
								{#each hadith.topics as topic}
									<a href="/topics/{topic}" class="topic-tag">{topic}</a>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Related Verses -->
					{#if hadith.relatedVerses?.length}
						<div class="verses-card fade-in" class:visible={mounted} style="transition-delay: 0.4s">
							<h3 class="verses-title">آيات ذات صلة</h3>
							{#each hadith.relatedVerses as verse}
								<div class="verse-item">
									<span class="verse-mark">﴿</span>
									<span class="verse-text">{verse}</span>
									<span class="verse-mark">﴾</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
				
				<!-- Sidebar -->
				<aside class="sidebar">
					<!-- Quick Navigation -->
					<div class="sidebar-card fade-in" class:visible={mounted} style="transition-delay: 0.25s">
						<h3 class="sidebar-title">التنقل السريع</h3>
						<div class="nav-buttons">
							<a href="/hadith/{collectionSlug}-{Math.max(1, hadith.number - 1)}" class="nav-btn">
								<ChevronRight class="w-5 h-5" />
								<span>الحديث السابق</span>
							</a>
							<a href="/hadith/{collectionSlug}-{hadith.number + 1}" class="nav-btn">
								<span>الحديث التالي</span>
								<ChevronLeft class="w-5 h-5" />
							</a>
						</div>
					</div>
					
					<!-- Collection Info -->
					<div class="sidebar-card collection-info fade-in" class:visible={mounted} style="transition-delay: 0.3s">
						<div class="collection-header">
							<div class="collection-icon">
								<BookOpen class="w-6 h-6" />
							</div>
							<div>
								<h3 class="collection-name">{collection.arabicName}</h3>
								<p class="collection-author">{collection.arabicAuthor}</p>
							</div>
						</div>
						<a href="/collections/{collectionSlug}" class="view-collection-btn">
							<span>تصفح الكتاب</span>
							<ExternalLink class="w-4 h-4" />
						</a>
					</div>
					
					<!-- Related Hadiths -->
					{#if relatedHadiths.length > 0}
						<div class="sidebar-card fade-in" class:visible={mounted} style="transition-delay: 0.35s">
							<h3 class="sidebar-title">أحاديث ذات صلة</h3>
							<div class="related-list">
								{#each relatedHadiths as related}
									<a href="/hadith/{related.id}" class="related-item">
										<p class="related-text">{related.arabicText.slice(0, 80)}...</p>
										<span class="related-narrator">{related.narrator}</span>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</aside>
			</div>
		</div>
	</section>
</div>

<!-- Image Generator Modal -->
<ImageGeneratorModal 
	bind:isOpen={showImageModal}
	hadith={{
		arabicText: hadith.arabicText,
		narrator: hadith.narrator,
		collection: collection.arabicName,
		reference: `${hadith.book}، حديث ${hadith.number}`
	}}
	onClose={closeImageGenerator}
/>


<style>
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(180deg, #f8fafb 0%, #f0f4f5 100%);
	}
	
	/* Hero Section */
	.hero {
		position: relative;
		padding: 140px 0 80px;
		background: linear-gradient(165deg, #0a2e25 0%, #1a5f4f 40%, #1B4D3E 70%, #0d3d32 100%);
		overflow: hidden;
	}
	
	.pattern-layer {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3Ccircle cx='40' cy='40' r='12'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	.pattern-layer-2 {
		position: absolute;
		inset: 0;
		opacity: 0.02;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='white' stroke-width='0.3'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 60px 60px;
	}
	
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}
	.orb-1 { width: 500px; height: 500px; background: rgba(212,175,55,0.12); top: -150px; right: -100px; }
	.orb-2 { width: 400px; height: 400px; background: rgba(255,255,255,0.06); bottom: -100px; left: 5%; }
	.orb-3 { width: 300px; height: 300px; background: rgba(212,175,55,0.08); top: 50%; left: 50%; transform: translate(-50%, -50%); }
	
	.hero-content {
		text-align: center;
	}
	
	.breadcrumb {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-bottom: 32px;
		flex-wrap: wrap;
	}
	
	.breadcrumb-link {
		color: rgba(255,255,255,0.6);
		text-decoration: none;
		font-size: 14px;
		transition: color 0.2s;
	}
	.breadcrumb-link:hover { color: white; }
	.breadcrumb-current { color: #d4af37; font-size: 14px; font-weight: 500; }
	
	.collection-badge {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 12px 24px;
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 50px;
		color: rgba(255,255,255,0.9);
		font-size: 15px;
		margin-bottom: 24px;
	}
	.badge-divider { color: rgba(255,255,255,0.3); }
	
	.hadith-number-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		margin-bottom: 20px;
	}
	.number-label { font-size: 14px; color: rgba(255,255,255,0.5); }
	.number-value {
		font-size: 4rem;
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #d4af37 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
	}
	
	.grade-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 20px;
		background: rgba(212,175,55,0.2);
		border: 1px solid rgba(212,175,55,0.3);
		border-radius: 50px;
		color: #d4af37;
		font-size: 14px;
		font-weight: 600;
	}
	
	.hero-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		background: linear-gradient(90deg, #1a5f4f, #d4af37, #1a5f4f);
	}
	
	/* Content Section */
	.content-section {
		padding: 48px 0 80px;
		margin-top: -40px;
	}
	
	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}
	
	@media (min-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr 340px;
		}
	}
	
	/* Main Hadith Card */
	.hadith-card {
		position: relative;
		background: white;
		border-radius: 28px;
		padding: 48px;
		box-shadow: 0 8px 40px rgba(27, 77, 62, 0.08), 0 2px 8px rgba(27, 77, 62, 0.04);
		border: 1px solid rgba(0,0,0,0.04);
		overflow: hidden;
	}
	
	@media (max-width: 768px) {
		.hadith-card { padding: 32px 24px; border-radius: 20px; }
	}
	
	.card-corner {
		position: absolute;
		width: 80px;
		height: 80px;
		opacity: 0.08;
		background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80' fill='none' stroke='%231B4D3E' stroke-width='1'/%3E%3Cpath d='M0 40Q20 20 40 40T80 40' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E");
	}
	.card-corner.top-right { top: 0; right: 0; }
	.card-corner.top-left { top: 0; left: 0; transform: scaleX(-1); }
	.card-corner.bottom-right { bottom: 0; right: 0; transform: scaleY(-1); }
	.card-corner.bottom-left { bottom: 0; left: 0; transform: scale(-1); }
	
	.bismillah {
		text-align: center;
		font-family: 'Amiri', serif;
		font-size: 1.5rem;
		color: #d4af37;
		margin-bottom: 32px;
		opacity: 0.8;
	}
	
	.quote-mark {
		font-size: 56px;
		line-height: 1;
		background: linear-gradient(135deg, #D4AF37 0%, #f4d03f 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-align: right;
		margin-bottom: 16px;
	}
	.quote-mark.closing {
		text-align: left;
		margin-bottom: 0;
		margin-top: 16px;
	}
	
	.hadith-text {
		font-family: 'Amiri', serif;
		font-size: 1.75rem;
		line-height: 2.4;
		text-align: center;
		color: #1f2937;
		padding: 0 16px;
	}
	
	@media (min-width: 768px) {
		.hadith-text { font-size: 2rem; padding: 0 32px; }
	}

	/* Ornament Divider */
	.ornament-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		margin: 40px 0;
	}
	.ornament { color: #d4af37; font-size: 16px; }
	.ornament-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #e5e7eb, transparent); }
	
	/* Narrator Section */
	.narrator-section {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		padding: 24px;
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-radius: 16px;
		margin-bottom: 24px;
	}
	
	.narrator-avatar {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		border-radius: 50%;
		color: white;
		font-size: 1.25rem;
		font-weight: 700;
	}
	
	.narrator-info { text-align: right; }
	.narrator-label { font-size: 13px; color: #6b7280; margin-bottom: 2px; }
	.narrator-name { font-size: 1.125rem; font-weight: 700; color: #1B4D3E; }
	
	/* Reference Section */
	.reference-section {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
	
	@media (min-width: 640px) {
		.reference-section { grid-template-columns: repeat(4, 1fr); }
	}
	
	.reference-item {
		text-align: center;
		padding: 16px;
		background: #f9fafb;
		border-radius: 12px;
	}
	.ref-label { display: block; font-size: 12px; color: #9ca3af; margin-bottom: 4px; }
	.ref-value { display: block; font-size: 14px; font-weight: 600; color: #374151; }
	
	/* Actions Bar */
	.actions-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 24px;
		background: white;
		border-radius: 20px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.04);
		margin-top: 24px;
	}
	
	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 14px 24px;
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 14px;
		font-weight: 500;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.action-btn:hover {
		border-color: #1B4D3E;
		color: #1B4D3E;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(27, 77, 62, 0.1);
	}
	.action-btn.gold {
		background: linear-gradient(135deg, #D4AF37 0%, #f4d03f 100%);
		border: none;
		color: #1a1a1a;
		font-weight: 600;
	}
	.action-btn.gold:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
	}
	
	/* Explanation Card */
	.explanation-card {
		background: white;
		border-radius: 20px;
		padding: 28px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.04);
		margin-top: 24px;
		border-right: 4px solid #1B4D3E;
	}
	
	.explanation-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}
	
	.explanation-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-radius: 12px;
		color: #1B4D3E;
	}
	
	.explanation-title { font-size: 1.125rem; font-weight: 700; color: #1f2937; }
	.explanation-text { font-size: 15px; line-height: 1.9; color: #4b5563; }
	
	/* Topics Section */
	.topics-section {
		margin-top: 24px;
	}
	.topics-title { font-size: 15px; font-weight: 600; color: #6b7280; margin-bottom: 12px; }
	.topics-list { display: flex; flex-wrap: wrap; gap: 10px; }
	.topic-tag {
		padding: 10px 20px;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 14px;
		color: #1B4D3E;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.topic-tag:hover {
		background: #1B4D3E;
		color: white;
		border-color: #1B4D3E;
	}
	
	/* Verses Card */
	.verses-card {
		background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
		border-radius: 20px;
		padding: 28px;
		margin-top: 24px;
		border: 1px solid rgba(212, 175, 55, 0.2);
	}
	.verses-title { font-size: 1rem; font-weight: 700; color: #92400e; margin-bottom: 16px; }
	.verse-item {
		font-family: 'Amiri', serif;
		font-size: 1.25rem;
		line-height: 2;
		color: #78350f;
		text-align: center;
	}
	.verse-mark { color: #d4af37; font-size: 1.5rem; }
	
	/* Sidebar */
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	
	.sidebar-card {
		background: white;
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.04);
	}
	
	.sidebar-title {
		font-size: 1rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid #f3f4f6;
	}
	
	.nav-buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	
	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px;
		background: #f9fafb;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 500;
		color: #374151;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.nav-btn:hover {
		background: #1B4D3E;
		color: white;
	}
	
	/* Collection Info */
	.collection-info {
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border: 1px solid rgba(27, 77, 62, 0.1);
	}
	
	.collection-header {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 16px;
	}
	
	.collection-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		border-radius: 14px;
		color: white;
	}
	
	.collection-name { font-size: 1rem; font-weight: 700; color: #1B4D3E; margin-bottom: 2px; }
	.collection-author { font-size: 13px; color: #6b7280; }
	
	.view-collection-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 12px;
		background: white;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 600;
		color: #1B4D3E;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.view-collection-btn:hover {
		background: #1B4D3E;
		color: white;
	}
	
	/* Related Hadiths */
	.related-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.related-item {
		display: block;
		padding: 16px;
		background: #f9fafb;
		border-radius: 12px;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.related-item:hover {
		background: #f0fdf4;
		transform: translateX(4px);
	}
	
	.related-text {
		font-family: 'Amiri', serif;
		font-size: 14px;
		line-height: 1.8;
		color: #374151;
		margin-bottom: 8px;
	}
	.related-narrator { font-size: 12px; color: #1B4D3E; font-weight: 500; }
	
	/* Animations */
	.fade-in {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}
	.fade-in.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
