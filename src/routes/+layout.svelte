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
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cairo:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col" dir="rtl">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
