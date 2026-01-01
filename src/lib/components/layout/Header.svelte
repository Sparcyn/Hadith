<script lang="ts">
	import { Menu, X, Search, History } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	
	let menuOpen = $state(false);
	let scrolled = $state(false);
	let showHistory = $state(false);
	let historyItems = $state<any[]>([]);
	
	const links = [
		{ href: '/', label: 'الرئيسية' },
		{ href: '/collections', label: 'الكتب' },
		{ href: '/topics', label: 'المواضيع' },
		{ href: '/about', label: 'عن الموقع' },
	];
	
	onMount(() => {
		const handleScroll = () => { scrolled = window.scrollY > 20; };
		window.addEventListener('scroll', handleScroll);
		
		// Subscribe to recently viewed
		const unsubscribe = recentlyViewed.subscribe(items => {
			historyItems = items;
		});
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			unsubscribe();
		};
	});
</script>

<header class="header" class:scrolled>
	<div class="header-inner">
		<!-- Right: Logo & Search (RTL - appears on right) -->
		<div class="flex items-center gap-3">
			<button onclick={() => menuOpen = !menuOpen} class="menu-toggle" aria-label="القائمة">
				{#if menuOpen}<X class="w-5 h-5" />{:else}<Menu class="w-5 h-5" />{/if}
			</button>
			<a href="/" class="logo">
				<div class="logo-icon">
					<span>ح</span>
				</div>
				<span class="logo-text">الباحث الحديثي</span>
			</a>
			<button onclick={() => goto('/search')} class="icon-btn" aria-label="بحث">
				<Search class="w-5 h-5" />
			</button>
		</div>
		
		<!-- Center: Nav -->
		<nav class="nav-links">
			{#each links as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</nav>
		
		<!-- Left: History Button (RTL - appears on left) -->
		<div class="relative">
			<button onclick={() => showHistory = !showHistory} class="icon-btn" aria-label="السجل">
				<History class="w-5 h-5" />
				{#if historyItems.length > 0}
					<span class="history-badge">{historyItems.length}</span>
				{/if}
			</button>
			
			{#if showHistory}
				<div class="history-dropdown">
					<div class="history-header">
						<span>آخر الأحاديث المشاهدة</span>
						{#if historyItems.length > 0}
							<button onclick={() => recentlyViewed.clear()} class="clear-btn">مسح</button>
						{/if}
					</div>
					{#if historyItems.length === 0}
						<p class="history-empty">لا توجد أحاديث مشاهدة</p>
					{:else}
						<div class="history-list">
							{#each historyItems.slice(0, 5) as item}
								<a href="/hadith/{item.id}" class="history-item" onclick={() => showHistory = false}>
									<p class="history-text">{item.text.slice(0, 60)}...</p>
									<span class="history-source">{item.collection}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	
	{#if menuOpen}
		<div class="container">
			<nav class="mobile-nav">
				{#each links as link}
					<a href={link.href} onclick={() => menuOpen = false} class="mobile-link">{link.label}</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 16px 24px;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.header::before {
		content: '';
		position: absolute;
		inset: 0;
		background: transparent;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.header.scrolled::before {
		background: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 4px 30px rgba(27, 77, 62, 0.08);
		border-bottom: 1px solid rgba(212, 175, 55, 0.1);
	}
	
	.header-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1200px;
		margin: 0 auto;
		padding: 14px 24px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 20px;
		box-shadow: 0 8px 32px rgba(27, 77, 62, 0.08), 0 2px 8px rgba(27, 77, 62, 0.04);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.header.scrolled .header-inner {
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 12px 40px rgba(27, 77, 62, 0.1), 0 4px 12px rgba(27, 77, 62, 0.05);
	}
	
	.icon-btn {
		position: relative;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;
		background: transparent;
		border: none;
		border-radius: 14px;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.icon-btn:hover {
		background: rgba(27, 77, 62, 0.08);
		color: #1B4D3E;
	}
	
	.history-badge {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #D4AF37, #f4d03f);
		color: #1a1a1a;
		font-size: 10px;
		font-weight: 700;
		border-radius: 50%;
	}
	
	.history-dropdown {
		position: absolute;
		top: calc(100% + 12px);
		left: 0;
		width: 320px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 24px 48px rgba(0,0,0,0.15);
		overflow: hidden;
		animation: dropIn 0.25s ease;
		z-index: 100;
	}
	@keyframes dropIn {
		from { opacity: 0; transform: translateY(-12px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
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
	.clear-btn {
		font-size: 12px;
		color: #ef4444;
		background: none;
		border: none;
		cursor: pointer;
	}
	.clear-btn:hover { text-decoration: underline; }
	
	.history-empty {
		padding: 32px 20px;
		text-align: center;
		font-size: 14px;
		color: #9ca3af;
	}
	
	.history-list {
		max-height: 300px;
		overflow-y: auto;
	}
	
	.history-item {
		display: block;
		padding: 14px 20px;
		text-decoration: none;
		border-bottom: 1px solid #f9fafb;
		transition: background 0.15s ease;
	}
	.history-item:hover { background: #f9fafb; }
	.history-item:last-child { border-bottom: none; }
	
	.history-text {
		font-family: 'Amiri', serif;
		font-size: 14px;
		color: #374151;
		line-height: 1.8;
		margin-bottom: 4px;
	}
	.history-source {
		font-size: 11px;
		color: #9ca3af;
	}
	
	.nav-links {
		display: none;
		align-items: center;
		gap: 4px;
	}
	@media (min-width: 768px) {
		.nav-links { display: flex; }
	}
	
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
	
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
	}
	.logo-text {
		display: none;
		font-size: 18px;
		font-weight: 700;
		color: #1B4D3E;
	}
	@media (min-width: 640px) {
		.logo-text { display: block; }
	}
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
	.logo:hover .logo-icon {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(27, 77, 62, 0.3);
	}
	
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
	@media (min-width: 768px) {
		.menu-toggle { display: none; }
	}
	
	.mobile-nav {
		position: relative;
		padding: 16px 0 8px;
		border-top: 1px solid #f3f4f6;
		margin-top: 12px;
		animation: slideDown 0.3s ease;
	}
	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
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
