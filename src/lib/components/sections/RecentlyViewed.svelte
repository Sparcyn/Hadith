<script lang="ts">
	import { History, X, ChevronLeft, Trash2 } from 'lucide-svelte';
	import { recentlyViewed, type RecentHadith } from '$stores';
	
	let items: RecentHadith[] = $state([]);
	let isOpen = $state(false);
	
	recentlyViewed.subscribe(value => {
		items = value;
	});
	
	function formatTime(timestamp: number): string {
		const diff = Date.now() - timestamp;
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);
		
		if (minutes < 1) return 'الآن';
		if (minutes < 60) return `منذ ${minutes} دقيقة`;
		if (hours < 24) return `منذ ${hours} ساعة`;
		return `منذ ${days} يوم`;
	}
	
	function truncate(text: string, length: number): string {
		return text.length > length ? text.slice(0, length) + '...' : text;
	}
</script>

{#if items.length > 0}
	<!-- Mobile Toggle Button -->
	<button
		onclick={() => isOpen = !isOpen}
		class="lg:hidden fixed bottom-6 left-6 z-40 w-14 h-14 gradient-primary text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
		aria-label="المشاهدات الأخيرة"
	>
		<History class="w-6 h-6" />
		<span class="absolute -top-1 -right-1 w-5 h-5 gradient-gold text-xs text-[#1c1917] rounded-full flex items-center justify-center font-bold">
			{items.length}
		</span>
	</button>
	
	<!-- Sidebar / Drawer -->
	<aside 
		class="fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-full lg:h-auto lg:top-24 w-80 max-w-full bg-[var(--color-surface)] border-r lg:border border-[var(--color-border)] lg:rounded-2xl shadow-xl lg:shadow-md transform transition-transform duration-300 {isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
	>
		<!-- Header -->
		<div class="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
					<History class="w-5 h-5 text-[var(--color-primary)]" />
				</div>
				<div>
					<h3 class="font-bold">المشاهدات الأخيرة</h3>
					<p class="text-xs text-[var(--color-text-muted)]">{items.length} أحاديث</p>
				</div>
			</div>
			<button
				onclick={() => isOpen = false}
				class="lg:hidden p-2 hover:bg-[var(--color-border-light)] rounded-lg transition-colors"
				aria-label="إغلاق"
			>
				<X class="w-5 h-5" />
			</button>
		</div>
		
		<!-- Items -->
		<div class="p-3 max-h-[60vh] lg:max-h-96 overflow-y-auto">
			{#each items as item, i}
				<a
					href="/hadith/{item.id}"
					onclick={() => isOpen = false}
					class="block p-4 rounded-xl hover:bg-[var(--color-border-light)] transition-all group mb-2"
					style="animation-delay: {i * 0.05}s"
				>
					<p class="font-quran text-sm leading-relaxed line-clamp-2 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
						{truncate(item.arabicText, 80)}
					</p>
					<div class="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
						<span>{item.collection}</span>
						<span>{formatTime(item.viewedAt)}</span>
					</div>
				</a>
			{/each}
		</div>
		
		<!-- Clear Button -->
		<div class="p-4 border-t border-[var(--color-border)]">
			<button
				onclick={() => recentlyViewed.clear()}
				class="w-full py-3 flex items-center justify-center gap-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-xl transition-colors"
			>
				<Trash2 class="w-4 h-4" />
				<span>مسح السجل</span>
			</button>
		</div>
	</aside>
	
	<!-- Backdrop for mobile -->
	{#if isOpen}
		<button
			onclick={() => isOpen = false}
			class="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
			aria-label="إغلاق"
		></button>
	{/if}
{/if}
