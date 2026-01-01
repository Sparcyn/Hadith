<script lang="ts">
	import { BookOpen, ChevronLeft, Star } from 'lucide-svelte';
	
	interface Collection {
		slug: string;
		arabicName: string;
		arabicAuthor: string;
		hadithCount: number;
		grade: string;
	}
	
	interface Props {
		collections: Collection[];
	}
	
	let { collections }: Props = $props();
	
	function formatNum(n: number): string {
		return n.toLocaleString('ar-EG');
	}
	
	const colors = [
		{ bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50' },
		{ bg: 'from-blue-500 to-indigo-600', light: 'bg-blue-50' },
		{ bg: 'from-amber-500 to-orange-600', light: 'bg-amber-50' },
		{ bg: 'from-purple-500 to-violet-600', light: 'bg-purple-50' },
		{ bg: 'from-rose-500 to-pink-600', light: 'bg-rose-50' },
		{ bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50' },
	];
</script>

<section class="py-20 md:py-28 bg-white">
	<div class="container">
		<!-- Section Header -->
		<div class="flex items-center justify-between mb-14">
			<a href="/collections" class="view-all-link">
				<span>عرض الكل</span>
				<ChevronLeft class="w-5 h-5" />
			</a>
			<div class="text-right">
				<h2 class="section-title">كتب الحديث</h2>
				<p class="section-subtitle">أصح كتب الحديث النبوي الشريف</p>
			</div>
		</div>
		
		<!-- Premium Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
			{#each collections as book, i}
				{@const color = colors[i % colors.length]}
				<a href="/collections/{book.slug}" class="collection-card group">
					<!-- Icon -->
					<div class="card-icon bg-gradient-to-br {color.bg}">
						<BookOpen class="w-6 h-6 text-white" />
					</div>
					
					<!-- Content -->
					<div class="card-content">
						<h3 class="card-title">{book.arabicName}</h3>
						<p class="card-author">{book.arabicAuthor}</p>
						<div class="card-meta">
							<span class="hadith-count">{formatNum(book.hadithCount)} حديث</span>
							{#if book.grade === 'صحيح'}
								<span class="grade-badge">
									<Star class="w-3 h-3" />
									<span>{book.grade}</span>
								</span>
							{/if}
						</div>
					</div>
					
					<!-- Arrow -->
					<div class="card-arrow">
						<ChevronLeft class="w-5 h-5" />
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
		margin-bottom: 6px;
	}
	.section-subtitle {
		font-size: 17px;
		color: #6b7280;
	}
	
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
		flex-direction: row-reverse;
	}
	.view-all-link:hover {
		color: #1B4D3E;
		background: #f0fdf4;
	}
	
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
		box-shadow: 0 4px 20px rgba(27, 77, 62, 0.04), 0 1px 4px rgba(27, 77, 62, 0.02);
	}
	.collection-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 40px rgba(27, 77, 62, 0.1), 0 8px 16px rgba(27, 77, 62, 0.05);
		border-color: rgba(27, 77, 62, 0.1);
	}
	
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
	.collection-card:hover .card-icon {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(0,0,0,0.15);
	}
	
	.card-content {
		flex: 1;
		min-width: 0;
	}
	
	.card-title {
		font-size: 18px;
		font-weight: 700;
		color: #111827;
		margin-bottom: 4px;
		transition: color 0.2s ease;
	}
	.collection-card:hover .card-title {
		color: #1B4D3E;
	}
	
	.card-author {
		font-size: 15px;
		color: #9ca3af;
		margin-bottom: 10px;
	}
	
	.card-meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	.hadith-count {
		font-size: 15px;
		font-weight: 600;
		color: #1B4D3E;
	}
	
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
	.collection-card:hover .card-arrow {
		background: #1B4D3E;
		color: white;
		transform: translateX(4px);
	}
</style>
