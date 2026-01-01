<!--
	============================================================================
	ملف: CollectionsGrid.svelte
	الوصف: مكون شبكة كتب الحديث
	============================================================================
	
	هذا المكون يعرض شبكة من كتب الحديث الرئيسية
	كل كتاب يحتوي على أيقونة، اسم، مؤلف، وعدد الأحاديث
	
	المميزات:
	- ألوان متدرجة مختلفة لكل كتاب
	- شارة "صحيح" للكتب الصحيحة
	- تأثيرات تفاعلية عند التمرير
	- تصميم متجاوب (1-3 أعمدة)
	============================================================================
-->

<script lang="ts">
	// =========================================================================
	// الاستيرادات
	// =========================================================================
	
	// أيقونات من مكتبة Lucide
	// BookOpen: أيقونة كتاب | ChevronLeft: سهم | Star: نجمة
	import { BookOpen, ChevronLeft, Star } from 'lucide-svelte';
	
	// =========================================================================
	// تعريف الأنواع (TypeScript)
	// =========================================================================
	
	// واجهة بيانات الكتاب الواحد
	interface Collection {
		slug: string;           // المعرف في الرابط (مثل: bukhari)
		arabicName: string;     // الاسم بالعربية
		arabicAuthor: string;   // اسم المؤلف بالعربية
		hadithCount: number;    // عدد الأحاديث
		grade: string;          // درجة الكتاب (صحيح، حسن، إلخ)
	}
	
	// واجهة خصائص المكون
	interface Props {
		collections: Collection[];  // مصفوفة الكتب
	}
	
	// =========================================================================
	// الخصائص (Props)
	// =========================================================================
	
	// استقبال مصفوفة الكتب من المكون الأب
	let { collections }: Props = $props();
	
	// =========================================================================
	// الدوال المساعدة
	// =========================================================================
	
	/**
	 * تنسيق الأرقام بالصيغة العربية
	 * مثال: 7563 -> ٧٬٥٦٣
	 */
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	// =========================================================================
	// ألوان البطاقات
	// =========================================================================
	
	// مصفوفة الألوان المتدرجة لكل بطاقة
	// bg: تدرج الخلفية | light: خلفية فاتحة
	const colors = [
		{ bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50' },   // أخضر زمردي
		{ bg: 'from-blue-500 to-indigo-600', light: 'bg-blue-50' },       // أزرق
		{ bg: 'from-amber-500 to-orange-600', light: 'bg-amber-50' },     // برتقالي
		{ bg: 'from-purple-500 to-violet-600', light: 'bg-purple-50' },   // بنفسجي
		{ bg: 'from-rose-500 to-pink-600', light: 'bg-rose-50' },         // وردي
		{ bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50' },         // سماوي
	];
</script>

<!-- =========================================================================
	قسم القالب (Template)
	========================================================================= -->

<!-- قسم كتب الحديث -->
<section class="py-20 md:py-28 bg-white">
	<div class="container">
		
		<!-- =================================================================
			رأس القسم مع رابط "عرض الكل"
		================================================================= -->
		<div class="flex items-center justify-between mb-14">
			
			<!-- رابط عرض جميع الكتب -->
			<a href="/collections" class="view-all-link">
				<span>عرض الكل</span>
				<ChevronLeft class="w-5 h-5" />
			</a>
			
			<!-- العناوين (على اليمين بسبب RTL) -->
			<div class="text-right">
				<h2 class="section-title">كتب الحديث</h2>
				<p class="section-subtitle">أصح كتب الحديث النبوي الشريف</p>
			</div>
		</div>
		
		<!-- =================================================================
			شبكة الكتب
		================================================================= -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
			{#each collections as book, i}
				<!-- الحصول على اللون حسب الفهرس -->
				{@const color = colors[i % colors.length]}
				
				<!-- بطاقة كتاب واحد -->
				<a href="/collections/{book.slug}" class="collection-card group">
					
					<!-- أيقونة الكتاب مع التدرج اللوني -->
					<div class="card-icon bg-gradient-to-br {color.bg}">
						<BookOpen class="w-6 h-6 text-white" />
					</div>
					
					<!-- محتوى البطاقة -->
					<div class="card-content">
						<!-- اسم الكتاب -->
						<h3 class="card-title">{book.arabicName}</h3>
						<!-- اسم المؤلف -->
						<p class="card-author">{book.arabicAuthor}</p>
						
						<!-- معلومات إضافية -->
						<div class="card-meta">
							<!-- عدد الأحاديث -->
							<span class="hadith-count">{formatNum(book.hadithCount)} حديث</span>
							
							<!-- شارة "صحيح" إذا كان الكتاب صحيحاً -->
							{#if book.grade === 'صحيح'}
								<span class="grade-badge">
									<Star class="w-3 h-3" />
									<span>{book.grade}</span>
								</span>
							{/if}
						</div>
					</div>
					
					<!-- سهم الانتقال -->
					<div class="card-arrow">
						<ChevronLeft class="w-5 h-5" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- =========================================================================
	قسم التنسيقات (CSS)
	========================================================================= -->
<style>
	/* =========================================================================
	   عناوين القسم
	   ========================================================================= */
	
	/* العنوان الرئيسي */
	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 6px;
	}
	
	/* الوصف الفرعي */
	.section-subtitle {
		font-size: 17px;
		color: #6b7280;
	}
	
	/* =========================================================================
	   رابط "عرض الكل"
	   ========================================================================= */
	.view-all-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 16px;
		font-weight: 500;
		color: #6b7280;
		text-decoration: none;
		padding: 10px 20px;
		border-radius: 50px;
		transition: all 0.2s ease;
		flex-direction: row-reverse;  /* عكس الاتجاه للعربية */
	}
	
	/* تأثير التمرير */
	.view-all-link:hover {
		color: #1B4D3E;
		background: #f0fdf4;
	}
	
	/* =========================================================================
	   بطاقة الكتاب
	   ========================================================================= */
	.collection-card {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 26px 30px;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 20px;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 20px rgba(27, 77, 62, 0.04), 
		            0 1px 4px rgba(27, 77, 62, 0.02);
	}
	
	/* تأثير التمرير على البطاقة */
	.collection-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 40px rgba(27, 77, 62, 0.1), 
		            0 8px 16px rgba(27, 77, 62, 0.05);
		border-color: rgba(27, 77, 62, 0.1);
	}
	
	/* =========================================================================
	   أيقونة الكتاب
	   ========================================================================= */
	.card-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16px;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}
	
	/* تأثير التمرير على الأيقونة */
	.collection-card:hover .card-icon {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(0,0,0,0.15);
	}
	
	/* =========================================================================
	   محتوى البطاقة
	   ========================================================================= */
	.card-content {
		flex: 1;
		min-width: 0;
	}
	
	/* اسم الكتاب */
	.card-title {
		font-size: 18px;
		font-weight: 700;
		color: #111827;
		margin-bottom: 4px;
		transition: color 0.2s ease;
	}
	
	/* تغيير لون الاسم عند التمرير */
	.collection-card:hover .card-title {
		color: #1B4D3E;
	}
	
	/* اسم المؤلف */
	.card-author {
		font-size: 15px;
		color: #9ca3af;
		margin-bottom: 10px;
	}
	
	/* =========================================================================
	   معلومات إضافية (عدد الأحاديث والشارة)
	   ========================================================================= */
	.card-meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	/* عدد الأحاديث */
	.hadith-count {
		font-size: 15px;
		font-weight: 600;
		color: #1B4D3E;
	}
	
	/* شارة "صحيح" */
	.grade-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 12px;
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-radius: 50px;
		font-size: 13px;
		font-weight: 600;
		color: #166534;
	}
	
	/* =========================================================================
	   سهم الانتقال
	   ========================================================================= */
	.card-arrow {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f9fafb;
		border-radius: 12px;
		color: #9ca3af;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}
	
	/* تأثير التمرير على السهم */
	.collection-card:hover .card-arrow {
		background: #1B4D3E;
		color: white;
		transform: translateX(4px);
	}
</style>
