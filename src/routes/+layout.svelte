<script lang="ts">
	import '../app.css';
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import { theme } from '$stores';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	
	onMount(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'sepia' | null;
		if (stored) theme.set(stored);
	});
</script>

<svelte:head>
	<!-- Performance: Optimized font loading with display=swap -->
	<link rel="preload" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700&display=swap" as="style" />
	<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
	<noscript>
		<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
	</noscript>
	
	<!-- SEO: Default page title -->
	<title>الباحث الحديثي - موسوعة الأحاديث النبوية</title>
</svelte:head>

<div class="min-h-screen flex flex-col" dir="rtl">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
