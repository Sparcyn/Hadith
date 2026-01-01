<!--
	============================================================================
	ملف: Footer.svelte
	الوصف: مكون التذييل (الفوتر) الرئيسي للموقع
	============================================================================
-->

<script lang="ts">
	// الحصول على السنة الحالية لحقوق النشر
	const year = new Date().getFullYear();
	
	// الروابط السريعة - صفحات الموقع الرئيسية
	const quickLinks = [
		{ href: '/collections', label: 'كتب الحديث' },
		{ href: '/topics', label: 'المواضيع' },
		{ href: '/search', label: 'البحث' },
		{ href: '/about', label: 'عن الموقع' },
	];
	
	// روابط كتب الحديث الرئيسية
	const collections = [
		{ href: '/collections/bukhari', label: 'صحيح البخاري' },
		{ href: '/collections/muslim', label: 'صحيح مسلم' },
		{ href: '/collections/tirmidhi', label: 'جامع الترمذي' },
		{ href: '/collections/abudawud', label: 'سنن أبي داود' },
	];
	
	// الروابط القانونية والتواصل
	const legal = [
		{ href: '/privacy', label: 'سياسة الخصوصية' },
		{ href: '/terms', label: 'الشروط والأحكام' },
		{ href: '/contact', label: 'تواصل معنا' },
	];
	
	// روابط التواصل الاجتماعي
	const socialLinks = [
		{ href: 'https://t.me/nuqayah', label: 'تيليجرام', icon: 'telegram' },
		{ href: 'https://twitter.com/nuqayah', label: 'تويتر', icon: 'twitter' },
		{ href: 'https://fb.me/nuqayah', label: 'فيسبوك', icon: 'facebook' },
	];
</script>

<!-- الفوتر الرئيسي مع الأنماط الزخرفية -->
<footer class="footer">
	<!-- نمط النجوم الإسلامية -->
	<div class="footer-pattern pattern-stars"></div>
	<!-- نمط الأشكال الهندسية -->
	<div class="footer-pattern pattern-geometric"></div>
	<!-- خط التدرج العلوي -->
	<div class="footer-gradient"></div>
	
	<!-- محتوى الفوتر -->
	<div class="container py-16 relative z-10">
		<!-- شبكة الأعمدة -->
		<div class="footer-grid">
			<!-- قسم العلامة التجارية -->
			<div class="footer-brand">
				<div class="brand-header">
					<div class="logo-icon"><span>ح</span></div>
					<span class="brand-name">الباحث الحديثي</span>
				</div>
				<p class="brand-desc">موسوعة شاملة للأحاديث النبوية الشريفة من أصح الكتب، مع إمكانية البحث والتصفح والمشاركة.</p>
				<p class="brand-copyright">sunnah.one | جميع الحقوق محفوظة © {year}</p>
				<!-- روابط التواصل الاجتماعي -->
				<div class="social-links">
					{#each socialLinks as social}
						<a href={social.href} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={social.label}>
							{#if social.icon === 'telegram'}
								<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
							{:else if social.icon === 'twitter'}
								<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
							{:else if social.icon === 'facebook'}
								<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
							{/if}
						</a>
					{/each}
				</div>
			</div>
			<!-- عمود الروابط السريعة -->
			<div class="footer-col">
				<h4 class="footer-heading">روابط سريعة</h4>
				<ul class="footer-links">
					{#each quickLinks as link}<li><a href={link.href}>{link.label}</a></li>{/each}
				</ul>
			</div>
			<!-- عمود كتب الحديث -->
			<div class="footer-col">
				<h4 class="footer-heading">المجموعات</h4>
				<ul class="footer-links">
					{#each collections as link}<li><a href={link.href}>{link.label}</a></li>{/each}
				</ul>
			</div>
			<!-- عمود الروابط القانونية -->
			<div class="footer-col">
				<h4 class="footer-heading">المزيد</h4>
				<ul class="footer-links">
					{#each legal as link}<li><a href={link.href}>{link.label}</a></li>{/each}
				</ul>
			</div>
		</div>
		<!-- قسم الرعاية -->
		<div class="credits-section">
			<a href="https://nuqayah.com" target="_blank" rel="noopener noreferrer" class="credit-item">
				<span class="credit-label">طُوِّر بواسطة</span>
				<div class="credit-brand">
					<img src="https://nuqayah.com/nuqayah.svg" alt="نقية" class="nuqayah-logo" />
					<span class="credit-name">نقية</span>
				</div>
			</a>
			<a href="https://ayatt.org.kw" target="_blank" rel="noopener noreferrer" class="credit-item">
				<span class="credit-label">برعاية</span>
				<div class="sponsor-brand">
					<img src="https://ayatt.org.kw/portal/ayatt/images/logo.png" alt="جمعية آيات الخيرية" class="ayatt-logo" />
					<span class="sponsor-name">جمعية آيات الخيرية</span>
				</div>
			</a>
		</div>
		<!-- الشريط السفلي -->
		<div class="footer-bottom">
			<p>© {year} الباحث الحديثي | sunnah.one</p>
			<p class="flex items-center gap-2">صُنع بـ <svg class="heart-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"/></svg> لخدمة السنة النبوية</p>
		</div>
	</div>
</footer>

<style>
	/* الفوتر الرئيسي - خلفية خضراء داكنة */
	.footer { position: relative; background: linear-gradient(135deg, #0d3d32 0%, #1B4D3E 50%, #0d3d32 100%); overflow: hidden; }
	/* طبقات الأنماط الزخرفية */
	.footer-pattern { position: absolute; inset: 0; pointer-events: none; }
	/* نمط النجوم الإسلامية */
	.pattern-stars { opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3Ccircle cx='40' cy='40' r='12'/%3E%3C/g%3E%3C/svg%3E"); background-size: 80px 80px; }
	/* نمط الأشكال الهندسية */
	.pattern-geometric { opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%2326a67a' stroke-width='0.4'%3E%3Crect x='10' y='10' width='40' height='40' transform='rotate(45 30 30)'/%3E%3Crect x='20' y='20' width='20' height='20' transform='rotate(45 30 30)'/%3E%3C/g%3E%3C/svg%3E"); background-size: 60px 60px; }
	/* خط التدرج العلوي */
	.footer-gradient { height: 4px; background: linear-gradient(90deg, #1B4D3E, #D4AF37, #1B4D3E); }
	/* شبكة الأعمدة */
	.footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }
	@media (min-width: 768px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; } }
	/* قسم العلامة التجارية */
	.footer-brand { grid-column: span 2; text-align: right; }
	@media (min-width: 768px) { .footer-brand { grid-column: span 1; order: 4; } }
	.brand-header { display: flex; align-items: center; gap: 12px; justify-content: flex-end; margin-bottom: 16px; }
	.brand-name { font-size: 18px; font-weight: 700; color: white; }
	.logo-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; }
	.logo-icon span { color: white; font-size: 20px; font-weight: 700; }
	.brand-desc { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 12px; }
	.brand-copyright { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 16px; }
	/* روابط التواصل الاجتماعي */
	.social-links { display: flex; gap: 10px; justify-content: flex-end; }
	.social-link { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.6); transition: all 0.2s ease; }
	.social-link:hover { background: rgba(212, 175, 55, 0.2); border-color: rgba(212, 175, 55, 0.3); color: #D4AF37; transform: translateY(-2px); }
	.social-link svg { width: 18px; height: 18px; }
	/* أعمدة الروابط */
	.footer-col { text-align: right; }
	@media (min-width: 768px) { .footer-col:nth-child(2) { order: 3; } .footer-col:nth-child(3) { order: 2; } .footer-col:nth-child(4) { order: 1; } }
	.footer-heading { font-size: 14px; font-weight: 700; color: white; margin-bottom: 16px; }
	.footer-links { list-style: none; padding: 0; margin: 0; }
	.footer-links li { margin-bottom: 10px; }
	.footer-links a { font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none; transition: all 0.2s ease; }
	.footer-links a:hover { color: #D4AF37; }
	/* قسم الرعاية */
	.credits-section { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 32px 0; margin-bottom: 24px; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
	@media (min-width: 640px) { .credits-section { flex-direction: row; gap: 48px; } }
	.credit-item { display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; transition: all 0.3s ease; }
	a.credit-item:hover { transform: translateY(-2px); }
	.credit-label { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500; }
	.credit-brand { display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: all 0.3s ease; }
	a.credit-item:hover .credit-brand { background: rgba(255,255,255,0.12); border-color: rgba(212, 175, 55, 0.3); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
	.nuqayah-logo { width: 28px; height: 28px; object-fit: contain; }
	.credit-name { font-size: 16px; font-weight: 700; color: white; }
	.sponsor-brand { display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; transition: all 0.3s ease; }
	a.credit-item:hover .sponsor-brand { background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.4); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
	.ayatt-logo { width: 36px; height: 36px; object-fit: contain; border-radius: 6px; }
	.sponsor-name { font-size: 16px; font-weight: 700; color: #D4AF37; }
	/* الشريط السفلي */
	.footer-bottom { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 12px; padding-top: 24px; font-size: 13px; color: rgba(255,255,255,0.4); }
	@media (min-width: 640px) { .footer-bottom { flex-direction: row; } }
	/* أيقونة القلب المتحركة */
	.heart-icon { width: 16px; height: 16px; color: #D4AF37; animation: heartbeat 1.5s ease-in-out infinite; }
	@keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
</style>
