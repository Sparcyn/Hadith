<script lang="ts">
	import { ExternalLink, Smartphone, Search, BookOpen, Mic, Filter, Share2, MessageCircle, Mail, Users, Zap, Shield, Globe } from 'lucide-svelte';
</script>

<svelte:head>
	<!-- SEO: Primary Meta Tags -->
	<title>عن الباحث الحديثي - موسوعة الأحاديث النبوية | sunnah.one</title>
	<meta name="title" content="عن الباحث الحديثي - موسوعة الأحاديث النبوية | sunnah.one" />
	<meta name="description" content="تعرف على الباحث الحديثي - باحث فوري بنصوص الأحاديث بجميع رواياتها مع درجة صحتها. يضم أكثر من 50,000 حديث من الكتب الستة الصحيحة." />
	<meta name="keywords" content="عن الباحث الحديثي, موسوعة الحديث, البحث في الأحاديث, الدرر السنية" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="عن الباحث الحديثي - موسوعة الأحاديث النبوية" />
	<meta property="og:description" content="باحث فوري بنصوص الأحاديث بجميع رواياتها مع درجة صحتها في الموسوعة الحديثية" />
	<meta property="og:image" content="https://sunnah.one/og-about.png" />
	
	<!-- Twitter -->
	<meta name="twitter:title" content="عن الباحث الحديثي" />
	<meta name="twitter:description" content="باحث فوري بنصوص الأحاديث بجميع رواياتها مع درجة صحتها" />
	
	<!-- Schema.org for About Page -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "AboutPage",
		"name": "عن الباحث الحديثي",
		"description": "باحث فوري بنصوص الأحاديث بجميع رواياتها مع درجة صحتها",
		"url": "https://sunnah.one/about",
		"mainEntity": {
			"@type": "SoftwareApplication",
			"name": "الباحث الحديثي",
			"applicationCategory": "ReferenceApplication",
			"operatingSystem": "Web, Android",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			}
		}
	}
	</script>`}
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-pattern"></div>
	<div class="hero-glow"></div>
	<div class="container relative z-10">
		<div class="hero-content">
			<div class="hero-badge">
				<BookOpen class="w-4 h-4" />
				<span>الموسوعة الحديثية</span>
			</div>
			<h1 class="hero-title">الباحث الحديثي</h1>
			<p class="hero-subtitle">
				باحث فوري بنصوص الأحاديث بجميع رواياتها مع درجة صحتها في الموسوعة الحديثية بالدرر السنية
			</p>
			<div class="hero-actions">
				<a href="/" class="btn btn-primary">
					<Search class="w-5 h-5" />
					ابدأ البحث
				</a>
				<a href="https://play.google.com/store/apps/details?id=com.thedawah.hadith" target="_blank" rel="noopener" class="btn btn-secondary">
					<Smartphone class="w-5 h-5" />
					تطبيق الأندرويد
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">خصائص البرنامج</h2>
			<p class="section-desc">مميزات فريدة تجعل البحث في الأحاديث النبوية أسهل وأدق</p>
		</div>
		
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<BookOpen class="w-6 h-6" />
				</div>
				<h3>جميع الروايات</h3>
				<p>إظهار جميع روايات الأحاديث مع درجة صحتها من المصادر المعتمدة</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<MessageCircle class="w-6 h-6" />
				</div>
				<h3>شرح الأحاديث</h3>
				<p>شرح مفصل لجميع روايات الأحاديث لفهم أعمق للمعاني</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<Mic class="w-6 h-6" />
				</div>
				<h3>البحث الصوتي</h3>
				<p>إمكانية البحث باستخدام الصوت لتجربة أسهل وأسرع</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<Filter class="w-6 h-6" />
				</div>
				<h3>تصفية النتائج</h3>
				<p>تحديد نتائج البحث طبقاً للكتاب، المحدث، أو الراوي</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<Smartphone class="w-6 h-6" />
				</div>
				<h3>تطبيق الأندرويد</h3>
				<p>متاح على أجهزة الأندرويد للوصول السريع في أي وقت</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<Share2 class="w-6 h-6" />
				</div>
				<h3>سهولة المشاركة</h3>
				<p>مشاركة الأحاديث عبر وسائل التواصل الاجتماعي بسهولة</p>
			</div>
		</div>
	</div>
</section>

<!-- How to Use Section -->
<section class="section bg-alt">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">كيفية الاستخدام</h2>
			<p class="section-desc">دليل سريع لاستخدام الباحث الحديثي</p>
		</div>
		
		<div class="usage-grid">
			<div class="usage-card">
				<div class="usage-number">١</div>
				<h3>البحث</h3>
				<ul class="usage-list">
					<li>أدخل كلمات مفتاحية في صندوق البحث</li>
					<li>استخدم أيقونة المايك للبحث الصوتي</li>
					<li>اضغط على (×) لتفريغ صندوق البحث</li>
				</ul>
			</div>
			
			<div class="usage-card">
				<div class="usage-number">٢</div>
				<h3>القيود والتصفية</h3>
				<ul class="usage-list">
					<li>حكم الحديث (صحيح، حسن، ضعيف)</li>
					<li>الكتاب والمحدث والراوي</li>
					<li>القيود الشائعة للوصول السريع</li>
				</ul>
			</div>
			
			<div class="usage-card">
				<div class="usage-number">٣</div>
				<h3>النتائج</h3>
				<ul class="usage-list">
					<li>اضغط على اسم المحدث لعرض ترجمته</li>
					<li>اضغط على اسم الكتاب لفتح المصدر</li>
					<li>اضغط على "شرح الحديث" للتفاصيل</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="stats-section">
	<div class="stats-pattern pattern-stars"></div>
	<div class="stats-pattern pattern-geometric"></div>
	<div class="container relative z-10">
		<div class="stats-grid">
			<div class="stat-card">
				<Zap class="stat-icon" />
				<span class="stat-value">فوري</span>
				<span class="stat-label">سرعة البحث</span>
			</div>
			<div class="stat-card">
				<Shield class="stat-icon" />
				<span class="stat-value">موثق</span>
				<span class="stat-label">درجة الصحة</span>
			</div>
			<div class="stat-card">
				<Globe class="stat-icon" />
				<span class="stat-value">شامل</span>
				<span class="stat-label">جميع الروايات</span>
			</div>
			<div class="stat-card">
				<Users class="stat-icon" />
				<span class="stat-value">سهل</span>
				<span class="stat-label">للجميع</span>
			</div>
		</div>
	</div>
</section>

<!-- Related Projects -->
<section class="section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">مشاريع ذات صلة</h2>
			<p class="section-desc">اكتشف المزيد من المشاريع المفيدة</p>
		</div>
		
		<div class="projects-grid">
			<a href="#" class="project-card">
				<div class="project-icon">📖</div>
				<h3>نقاية</h3>
				<p>منصة متكاملة للمحتوى الإسلامي</p>
				<span class="project-link">
					زيارة
					<ExternalLink class="w-4 h-4" />
				</span>
			</a>
			
			<a href="#" class="project-card">
				<div class="project-icon">🎧</div>
				<h3>مقرئ المتون</h3>
				<p>استماع وحفظ المتون العلمية</p>
				<span class="project-link">
					زيارة
					<ExternalLink class="w-4 h-4" />
				</span>
			</a>
			
			<a href="#" class="project-card">
				<div class="project-icon">🕌</div>
				<h3>جمعية آيات</h3>
				<p>جمعية خيرية للقرآن الكريم</p>
				<span class="project-link">
					زيارة
					<ExternalLink class="w-4 h-4" />
				</span>
			</a>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section class="section bg-alt">
	<div class="container">
		<div class="contact-card">
			<div class="contact-content">
				<h2>ساهم معنا</h2>
				<p>نرحب بمشاركتكم واقتراحاتكم لتطوير الباحث الحديثي</p>
				<div class="contact-actions">
					<a href="mailto:contact@example.com" class="btn btn-primary">
						<Mail class="w-5 h-5" />
						تواصل معنا
					</a>
					<a href="#" class="btn btn-secondary">
						التنبيه على خطأ
					</a>
				</div>
			</div>
			<div class="contact-decoration">
				<div class="decoration-circle"></div>
				<div class="decoration-circle"></div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero Section */
	.hero {
		position: relative;
		padding: 140px 0 80px;
		background: linear-gradient(135deg, #f8fafb 0%, #e6f4f1 100%);
		overflow: hidden;
	}
	
	.hero-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%231B4D3E' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3Ccircle cx='40' cy='40' r='12'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	.hero-glow {
		position: absolute;
		top: -200px;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(27, 77, 62, 0.1) 0%, transparent 70%);
		pointer-events: none;
	}
	
	.hero-content {
		text-align: center;
		max-width: 700px;
		margin: 0 auto;
	}
	
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: rgba(27, 77, 62, 0.1);
		color: var(--color-primary);
		border-radius: 100px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	
	.hero-title {
		font-size: 3rem;
		font-weight: 800;
		color: var(--color-primary);
		margin-bottom: 16px;
		line-height: 1.2;
	}
	
	.hero-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		line-height: 1.8;
		margin-bottom: 32px;
	}
	
	.hero-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	/* Section Styles */
	.section {
		padding: 80px 0;
	}
	
	.bg-alt {
		background: var(--color-bg-alt);
	}
	
	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	
	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 12px;
	}
	
	.section-desc {
		font-size: 1.1rem;
		color: var(--color-text-secondary);
	}
	
	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 20px;
	}
	
	@media (min-width: 640px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	@media (min-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	
	.feature-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-lg);
		padding: 32px 24px;
		text-align: center;
		transition: all 0.3s ease;
	}
	
	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary);
	}
	
	.feature-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary-light) 0%, rgba(212, 175, 55, 0.1) 100%);
		color: var(--color-primary);
		border-radius: 16px;
		margin: 0 auto 20px;
	}
	
	.feature-card h3 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 8px;
	}
	
	.feature-card p {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}
	
	/* Usage Grid */
	.usage-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 24px;
	}
	
	@media (min-width: 768px) {
		.usage-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	
	.usage-card {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		padding: 32px;
		box-shadow: var(--shadow-sm);
	}
	
	.usage-number {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
		color: white;
		font-size: 1.25rem;
		font-weight: 700;
		border-radius: 12px;
		margin-bottom: 16px;
	}
	
	.usage-card h3 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 16px;
	}
	
	.usage-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.usage-list li {
		position: relative;
		padding-right: 20px;
		margin-bottom: 10px;
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}
	
	.usage-list li::before {
		content: '•';
		position: absolute;
		right: 0;
		color: var(--color-accent);
		font-weight: bold;
	}
	
	/* Stats Section */
	.stats-section {
		position: relative;
		padding: 60px 0;
		background: linear-gradient(135deg, #0a2e25 0%, #1B4D3E 50%, #0d3d32 100%);
		overflow: hidden;
	}
	
	.stats-pattern {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	.pattern-stars {
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3Ccircle cx='40' cy='40' r='12'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 80px 80px;
	}
	
	.pattern-geometric {
		opacity: 0.02;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='white' stroke-width='0.4'%3E%3Crect x='10' y='10' width='40' height='40' transform='rotate(45 30 30)'/%3E%3Crect x='20' y='20' width='20' height='20' transform='rotate(45 30 30)'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 60px 60px;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
	
	@media (min-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 24px;
		}
	}
	
	.stat-card {
		text-align: center;
		padding: 32px 20px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(212, 175, 55, 0.15);
		border-radius: 16px;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	
	.stat-card:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(212, 175, 55, 0.3);
	}
	
	.stat-icon {
		width: 32px;
		height: 32px;
		color: #D4AF37;
		margin: 0 auto 12px;
	}
	
	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 4px;
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
	}
	
	/* Projects Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 20px;
	}
	
	@media (min-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	
	.project-card {
		display: block;
		background: var(--color-surface);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-lg);
		padding: 32px;
		text-decoration: none;
		text-align: center;
		transition: all 0.3s ease;
	}
	
	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary);
	}
	
	.project-icon {
		font-size: 2.5rem;
		margin-bottom: 16px;
	}
	
	.project-card h3 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 8px;
	}
	
	.project-card p {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		margin-bottom: 16px;
	}
	
	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-primary);
	}
	
	/* Contact Card */
	.contact-card {
		position: relative;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
		border-radius: var(--radius-xl);
		padding: 48px;
		overflow: hidden;
	}
	
	.contact-content {
		position: relative;
		z-index: 1;
		text-align: center;
	}
	
	.contact-card h2 {
		font-size: 1.75rem;
		font-weight: 700;
		color: white;
		margin-bottom: 12px;
	}
	
	.contact-card p {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 24px;
	}
	
	.contact-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.contact-actions .btn-primary {
		background: white;
		color: var(--color-primary);
	}
	
	.contact-actions .btn-secondary {
		background: transparent;
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
	}
	
	.contact-actions .btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: white;
	}
	
	.contact-decoration {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	
	.decoration-circle {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(212, 175, 55, 0.2);
	}
	
	.decoration-circle:first-child {
		width: 300px;
		height: 300px;
		top: -100px;
		right: -100px;
	}
	
	.decoration-circle:last-child {
		width: 200px;
		height: 200px;
		bottom: -50px;
		left: -50px;
	}
	
	@media (max-width: 768px) {
		.hero {
			padding: 120px 0 60px;
		}
		
		.hero-title {
			font-size: 2rem;
		}
		
		.hero-subtitle {
			font-size: 1.1rem;
		}
		
		.section {
			padding: 60px 0;
		}
		
		.section-title {
			font-size: 1.5rem;
		}
		
		.contact-card {
			padding: 32px 24px;
		}
	}
</style>
