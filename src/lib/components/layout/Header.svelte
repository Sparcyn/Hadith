<!--
	============================================================================
	ملف: Header.svelte
	الوصف: مكون الرأس (الهيدر) الرئيسي للموقع
	============================================================================
	
	هذا المكون يعرض شريط التنقل العلوي الثابت
	يحتوي على الشعار، روابط التنقل، البحث، وسجل المشاهدة
	
	المميزات:
	- تصميم متجاوب (موبايل وديسكتوب)
	- تأثير الشفافية عند التمرير
	- قائمة منسدلة للسجل
	- قائمة موبايل قابلة للطي
	============================================================================
-->

<script lang="ts">
	// =========================================================================
	// الاستيرادات
	// =========================================================================
	
	// أيقونات من مكتبة Lucide
	// Menu: أيقونة القائمة | X: أيقونة الإغلاق
	// Search: أيقونة البحث | History: أيقونة السجل
	import { Menu, X, Search, History } from 'lucide-svelte';
	
	// دالة التنقل البرمجي بين الصفحات
	import { goto } from '$app/navigation';
	
	// دالة onMount تُنفذ عند تحميل المكون
	import { onMount } from 'svelte';
	
	// مخزن الأحاديث المشاهدة مؤخراً
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	
	// =========================================================================
	// متغيرات الحالة (State)
	// =========================================================================
	
	// حالة فتح/إغلاق قائمة الموبايل
	let menuOpen = $state(false);
	
	// حالة التمرير - true عند التمرير لأسفل
	let scrolled = $state(false);
	
	// حالة إظهار قائمة السجل المنسدلة
	let showHistory = $state(false);
	
	// مصفوفة الأحاديث المشاهدة مؤخراً
	let historyItems = $state<any[]>([]);
	
	// =========================================================================
	// بيانات روابط التنقل
	// =========================================================================
	
	// مصفوفة روابط القائمة الرئيسية
	const links = [
		{ href: '/', label: 'الرئيسية' },        // الصفحة الرئيسية
		{ href: '/collections', label: 'الكتب' }, // صفحة الكتب
		{ href: '/scholars', label: 'العلماء' },  // صفحة العلماء
		{ href: '/topics', label: 'المواضيع' },   // صفحة المواضيع
		{ href: '/about', label: 'عن الموقع' },   // صفحة عن الموقع
	];
	
	// =========================================================================
	// دورة حياة المكون
	// =========================================================================
	
	onMount(() => {
		// دالة معالجة حدث التمرير
		// تُحدث حالة scrolled حسب موضع التمرير
		const handleScroll = () => { 
			scrolled = window.scrollY > 20; 
		};
		
		// إضافة مستمع لحدث التمرير
		window.addEventListener('scroll', handleScroll);
		
		// الاشتراك في مخزن السجل لتحديث القائمة
		const unsubscribe = recentlyViewed.subscribe(items => {
			historyItems = items;
		});
		
		// دالة التنظيف - تُنفذ عند إزالة المكون
		return () => {
			// إزالة مستمع التمرير
			window.removeEventListener('scroll', handleScroll);
			// إلغاء الاشتراك في المخزن
			unsubscribe();
		};
	});
</script>

<!-- =========================================================================
	قسم القالب (Template)
	========================================================================= -->

<!-- 
	عنصر الهيدر الرئيسي
	- position: fixed للثبات أعلى الصفحة
	- class:scrolled يُضيف تأثيرات عند التمرير
-->
<header class="header" class:scrolled>
	
	<!-- الحاوية الداخلية للهيدر -->
	<div class="header-inner">
		
		<!-- ===============================================================
			القسم الأيمن: الشعار والبحث وزر القائمة
			(يظهر على اليمين بسبب RTL)
		=============================================================== -->
		<div class="flex items-center gap-3">
			
			<!-- زر فتح/إغلاق قائمة الموبايل -->
			<button onclick={() => menuOpen = !menuOpen} class="menu-toggle" aria-label="القائمة">
				<!-- تبديل الأيقونة حسب حالة القائمة -->
				{#if menuOpen}
					<X class="w-5 h-5" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
			
			<!-- رابط الشعار - يعود للصفحة الرئيسية -->
			<a href="/" class="logo">
				<!-- أيقونة الشعار -->
				<div class="logo-icon">
					<span>ح</span>
				</div>
				<!-- نص الشعار (مخفي على الموبايل) -->
				<span class="logo-text">الباحث الحديثي</span>
			</a>
			
			<!-- زر البحث - ينتقل لصفحة البحث -->
			<button onclick={() => goto('/search')} class="icon-btn" aria-label="بحث">
				<Search class="w-5 h-5" />
			</button>
		</div>
		
		<!-- ===============================================================
			القسم الأوسط: روابط التنقل (مخفية على الموبايل)
		=============================================================== -->
		<nav class="nav-links">
			{#each links as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</nav>
		
		<!-- ===============================================================
			القسم الأيسر: زر السجل مع القائمة المنسدلة
		=============================================================== -->
		<div class="relative">
			
			<!-- زر فتح قائمة السجل -->
			<button onclick={() => showHistory = !showHistory} class="icon-btn" aria-label="السجل">
				<History class="w-5 h-5" />
				
				<!-- شارة عدد العناصر (تظهر إذا كان هناك عناصر) -->
				{#if historyItems.length > 0}
					<span class="history-badge">{historyItems.length}</span>
				{/if}
			</button>
			
			<!-- القائمة المنسدلة للسجل -->
			{#if showHistory}
				<div class="history-dropdown">
					
					<!-- رأس القائمة -->
					<div class="history-header">
						<span>آخر الأحاديث المشاهدة</span>
						
						<!-- زر مسح السجل -->
						{#if historyItems.length > 0}
							<button onclick={() => recentlyViewed.clear()} class="clear-btn">
								مسح
							</button>
						{/if}
					</div>
					
					<!-- محتوى القائمة -->
					{#if historyItems.length === 0}
						<!-- رسالة عند عدم وجود عناصر -->
						<p class="history-empty">لا توجد أحاديث مشاهدة</p>
					{:else}
						<!-- قائمة الأحاديث -->
						<div class="history-list">
							{#each historyItems.slice(0, 5) as item}
								<a 
									href="/hadith/{item.id}" 
									class="history-item" 
									onclick={() => showHistory = false}
								>
									<!-- نص الحديث (مقتطع) -->
									<p class="history-text">{item.text.slice(0, 60)}...</p>
									<!-- المصدر -->
									<span class="history-source">{item.collection}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	
	<!-- ===================================================================
		قائمة الموبايل (تظهر عند فتح القائمة)
	=================================================================== -->
	{#if menuOpen}
		<div class="container">
			<nav class="mobile-nav">
				{#each links as link}
					<a 
						href={link.href} 
						onclick={() => menuOpen = false} 
						class="mobile-link"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<!-- =========================================================================
	قسم التنسيقات (CSS)
	========================================================================= -->
<style>
	/* =========================================================================
	   الهيدر الرئيسي
	   ثابت أعلى الصفحة مع تأثيرات انتقالية
	   ========================================================================= */
	.header {
		position: fixed;           /* ثابت في مكانه */
		top: 0;                    /* أعلى الصفحة */
		left: 0;                   /* من اليسار */
		right: 0;                  /* إلى اليمين */
		z-index: 100;              /* فوق جميع العناصر */
		padding: 16px 24px;        /* حشوة داخلية */
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	/* =========================================================================
	   خلفية الهيدر (pseudo-element)
	   تُستخدم لتأثير الشفافية عند التمرير
	   ========================================================================= */
	.header::before {
		content: '';
		position: absolute;
		inset: 0;                  /* تغطية كاملة */
		background: transparent;   /* شفاف افتراضياً */
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	/* =========================================================================
	   تأثير التمرير على الهيدر
	   يُضيف خلفية ضبابية وظل
	   ========================================================================= */
	.header.scrolled::before {
		background: rgba(255, 255, 255, 0.75);  /* خلفية بيضاء شفافة */
		backdrop-filter: blur(20px);             /* تأثير الضبابية */
		-webkit-backdrop-filter: blur(20px);     /* دعم Safari */
		box-shadow: 0 4px 30px rgba(27, 77, 62, 0.08);
		border-bottom: 1px solid rgba(212, 175, 55, 0.1);
	}
	
	/* =========================================================================
	   الحاوية الداخلية للهيدر
	   تحتوي على جميع عناصر التنقل
	   ========================================================================= */
	.header-inner {
		position: relative;
		display: flex;             /* تخطيط مرن */
		align-items: center;       /* محاذاة عمودية */
		justify-content: space-between;  /* توزيع متباعد */
		max-width: 1200px;         /* عرض أقصى */
		margin: 0 auto;            /* توسيط */
		padding: 14px 24px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 20px;       /* حواف دائرية */
		box-shadow: 0 8px 32px rgba(27, 77, 62, 0.08), 
		            0 2px 8px rgba(27, 77, 62, 0.04);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	/* تأثير التمرير على الحاوية الداخلية */
	.header.scrolled .header-inner {
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 12px 40px rgba(27, 77, 62, 0.1), 
		            0 4px 12px rgba(27, 77, 62, 0.05);
	}
	
	/* =========================================================================
	   أزرار الأيقونات (البحث والسجل)
	   ========================================================================= */
	.icon-btn {
		position: relative;
		width: 48px;               /* عرض ثابت */
		height: 48px;              /* ارتفاع ثابت */
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;            /* لون رمادي */
		background: transparent;
		border: none;
		border-radius: 14px;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	/* تأثير التمرير على أزرار الأيقونات */
	.icon-btn:hover {
		background: rgba(27, 77, 62, 0.08);
		color: #1B4D3E;
	}
	
	/* =========================================================================
	   شارة عدد عناصر السجل
	   دائرة صغيرة تظهر عدد الأحاديث
	   ========================================================================= */
	.history-badge {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #D4AF37, #f4d03f);  /* تدرج ذهبي */
		color: #1a1a1a;
		font-size: 10px;
		font-weight: 700;
		border-radius: 50%;        /* دائرة كاملة */
	}
	
	/* =========================================================================
	   القائمة المنسدلة للسجل
	   ========================================================================= */
	.history-dropdown {
		position: absolute;
		top: calc(100% + 12px);    /* أسفل الزر */
		left: 0;
		width: 320px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 24px 48px rgba(0,0,0,0.15);
		overflow: hidden;
		animation: dropIn 0.25s ease;  /* تأثير الظهور */
		z-index: 100;
	}
	
	/* تأثير ظهور القائمة */
	@keyframes dropIn {
		from { opacity: 0; transform: translateY(-12px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	/* =========================================================================
	   رأس قائمة السجل
	   ========================================================================= */
	.history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid #f3f4f6;
		font-size: 14px;
		font-weight: 600;
		color: #374151;
	}
	
	/* زر مسح السجل */
	.clear-btn {
		font-size: 12px;
		color: #ef4444;            /* أحمر */
		background: none;
		border: none;
		cursor: pointer;
	}
	.clear-btn:hover { text-decoration: underline; }
	
	/* =========================================================================
	   رسالة السجل الفارغ
	   ========================================================================= */
	.history-empty {
		padding: 32px 20px;
		text-align: center;
		font-size: 14px;
		color: #9ca3af;
	}
	
	/* =========================================================================
	   قائمة عناصر السجل
	   ========================================================================= */
	.history-list {
		max-height: 300px;
		overflow-y: auto;          /* تمرير عمودي */
	}
	
	/* عنصر واحد في السجل */
	.history-item {
		display: block;
		padding: 14px 20px;
		text-decoration: none;
		border-bottom: 1px solid #f9fafb;
		transition: background 0.15s ease;
	}
	.history-item:hover { background: #f9fafb; }
	.history-item:last-child { border-bottom: none; }
	
	/* نص الحديث في السجل */
	.history-text {
		font-family: 'Amiri', serif;
		font-size: 14px;
		color: #374151;
		line-height: 1.8;
		margin-bottom: 4px;
	}
	
	/* مصدر الحديث في السجل */
	.history-source {
		font-size: 11px;
		color: #9ca3af;
	}
	
	/* =========================================================================
	   روابط التنقل (الديسكتوب)
	   مخفية على الموبايل
	   ========================================================================= */
	.nav-links {
		display: none;             /* مخفية افتراضياً */
		align-items: center;
		gap: 4px;
	}
	
	/* إظهار على الشاشات الكبيرة */
	@media (min-width: 768px) {
		.nav-links { display: flex; }
	}
	
	/* رابط تنقل واحد */
	.nav-link {
		position: relative;
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 500;
		color: #4b5563;
		text-decoration: none;
		border-radius: 14px;
		transition: all 0.2s ease;
	}
	
	/* خط تحت الرابط عند التمرير */
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 50%;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #1B4D3E, #D4AF37);
		border-radius: 2px;
		transition: all 0.3s ease;
		transform: translateX(-50%);
	}
	.nav-link:hover { color: #1B4D3E; }
	.nav-link:hover::after { width: 20px; }
	
	/* =========================================================================
	   الشعار
	   ========================================================================= */
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
	}
	
	/* نص الشعار (مخفي على الموبايل) */
	.logo-text {
		display: none;
		font-size: 18px;
		font-weight: 700;
		color: #1B4D3E;
	}
	@media (min-width: 640px) {
		.logo-text { display: block; }
	}
	
	/* أيقونة الشعار */
	.logo-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		border-radius: 14px;
		transition: all 0.3s ease;
	}
	.logo-icon span {
		color: white;
		font-size: 20px;
		font-weight: 700;
	}
	
	/* تأثير التمرير على الشعار */
	.logo:hover .logo-icon {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(27, 77, 62, 0.3);
	}
	
	/* =========================================================================
	   زر قائمة الموبايل
	   ========================================================================= */
	.menu-toggle {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;
		background: transparent;
		border: none;
		border-radius: 12px;
		cursor: pointer;
	}
	
	/* إخفاء على الشاشات الكبيرة */
	@media (min-width: 768px) {
		.menu-toggle { display: none; }
	}
	
	/* =========================================================================
	   قائمة الموبايل
	   ========================================================================= */
	.mobile-nav {
		position: relative;
		padding: 16px 0 8px;
		border-top: 1px solid #f3f4f6;
		margin-top: 12px;
		animation: slideDown 0.3s ease;
	}
	
	/* تأثير ظهور القائمة */
	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	/* رابط في قائمة الموبايل */
	.mobile-link {
		display: block;
		padding: 12px 16px;
		font-size: 15px;
		color: #4b5563;
		text-decoration: none;
		border-radius: 12px;
		transition: all 0.2s ease;
	}
	.mobile-link:hover {
		background: #f3f4f6;
		color: #1B4D3E;
	}
</style>
