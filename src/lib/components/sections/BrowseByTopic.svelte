<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	
	// Premium SVG icons as components
	const icons: Record<string, string> = {
		worship: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/><circle cx="12" cy="12" r="3"/></svg>`,
		dealings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H18C19.1 4 20 4.9 20 6V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6C4 4.9 4.9 4 6 4H8"/><path d="M15 2H9C8.4 2 8 2.4 8 3V5C8 5.6 8.4 6 9 6H15C15.6 6 16 5.6 16 5V3C16 2.4 15.6 2 15 2Z"/><path d="M8 12H16M8 16H12"/></svg>`,
		ethics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"/><path d="M12 6V12L16 14"/><circle cx="12" cy="12" r="2"/></svg>`,
		heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"/></svg>`,
		scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3V21"/><path d="M5 6L12 3L19 6"/><path d="M5 6V10C5 11.1 5.9 12 7 12H3C4.1 12 5 11.1 5 10Z"/><path d="M19 6V10C19 11.1 18.1 12 17 12H21C19.9 12 19 11.1 19 10Z"/><circle cx="5" cy="10" r="3"/><circle cx="19" cy="10" r="3"/></svg>`,
		star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
	};
	
	const topics = [
		{ icon: 'worship', title: 'العبادات', desc: 'الصلاة، الصيام، الزكاة', count: 12847, color: '#1B4D3E' },
		{ icon: 'dealings', title: 'المعاملات', desc: 'البيع، الزواج، الميراث', count: 8234, color: '#2563eb' },
		{ icon: 'ethics', title: 'الأخلاق', desc: 'الصدق، الصبر، الإحسان', count: 6891, color: '#7c3aed' },
		{ icon: 'heart', title: 'الرقائق', desc: 'الموت، الجنة، النار', count: 4523, color: '#dc2626' },
		{ icon: 'scale', title: 'الأحكام', desc: 'الحلال، الحرام، الفتاوى', count: 5167, color: '#D4AF37' },
		{ icon: 'star', title: 'الفضائل', desc: 'فضائل الأعمال والأوقات', count: 7234, color: '#0891b2' },
	];
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
</script>

<section class="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
	<div class="container">
		<!-- Section Header -->
		<div class="text-center mb-14">
			<h2 class="section-title">تصفح حسب الموضوع</h2>
			<p class="section-subtitle">استكشف الأحاديث النبوية مصنفة حسب مواضيع الحياة المختلفة</p>
		</div>
		
		<!-- Topics Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each topics as topic}
				<a href="/topics/{topic.title}" class="topic-card group">
					<!-- Content -->
					<div class="card-inner">
						<!-- Icon -->
						<div class="topic-icon" style="--icon-color: {topic.color}">
							{@html icons[topic.icon]}
						</div>
						
						<!-- Text -->
						<div class="topic-content">
							<h3 class="topic-title">{topic.title}</h3>
							<p class="topic-desc">{topic.desc}</p>
							<span class="topic-count">{formatNum(topic.count)} حديث</span>
						</div>
						
						<!-- Arrow -->
						<div class="topic-arrow">
							<ChevronLeft class="w-5 h-5" />
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 10px;
	}
	.section-subtitle {
		font-size: 17px;
		color: #6b7280;
		max-width: 550px;
		margin: 0 auto;
	}
	
	.topic-card {
		position: relative;
		display: block;
		padding: 28px;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 20px;
		text-decoration: none;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 20px rgba(27, 77, 62, 0.04), 0 1px 4px rgba(27, 77, 62, 0.02);
	}
	.topic-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 40px rgba(27, 77, 62, 0.1), 0 8px 16px rgba(27, 77, 62, 0.05);
		border-color: rgba(27, 77, 62, 0.1);
	}
	
	.card-inner {
		position: relative;
		display: flex;
		align-items: center;
		gap: 20px;
		z-index: 1;
	}
	
	.topic-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(27, 77, 62, 0.08) 0%, rgba(212, 175, 55, 0.05) 100%);
		border-radius: 16px;
		flex-shrink: 0;
		transition: all 0.3s ease;
		color: var(--icon-color, #1B4D3E);
	}
	.topic-icon :global(svg) {
		width: 30px;
		height: 30px;
	}
	.topic-card:hover .topic-icon {
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		color: white;
		transform: scale(1.05);
		box-shadow: 0 8px 20px rgba(27, 77, 62, 0.25);
	}
	
	.topic-content {
		flex: 1;
		min-width: 0;
	}
	
	.topic-title {
		font-size: 19px;
		font-weight: 700;
		color: #111827;
		margin-bottom: 4px;
		transition: color 0.2s ease;
	}
	.topic-card:hover .topic-title {
		color: #1B4D3E;
	}
	
	.topic-desc {
		font-size: 15px;
		color: #9ca3af;
		margin-bottom: 8px;
	}
	
	.topic-count {
		font-size: 15px;
		font-weight: 600;
		color: #1B4D3E;
	}
	
	.topic-arrow {
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
	.topic-card:hover .topic-arrow {
		background: #1B4D3E;
		color: white;
		transform: translateX(4px);
	}
</style>
