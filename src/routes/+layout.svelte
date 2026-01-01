<script lang="ts">
	import '../app.css';
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import { theme } from '$stores';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let { children } = $props();
	
	// Derive canonical URL (remove trailing slashes and query params for canonical)
	let canonicalUrl = $derived(`https://sunnah.one${$page.url.pathname}`.replace(/\/$/, '') || 'https://sunnah.one');
	let currentPath = $derived($page.url.pathname);
	
	onMount(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'sepia' | null;
		if (stored) theme.set(stored);
	});
</script>

<svelte:head>
	<!-- SEO: Canonical URL (prevents duplicate content) -->
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- SEO: Language alternates for international SEO -->
	<link rel="alternate" hreflang="ar" href={canonicalUrl} />
	<link rel="alternate" hreflang="ar-SA" href={canonicalUrl} />
	<link rel="alternate" hreflang="ar-EG" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
	
	<!-- Open Graph (Facebook, LinkedIn, WhatsApp, etc.) -->
	<meta property="og:site_name" content="الباحث الحديثي - sunnah.one" />
	<meta property="og:locale" content="ar_SA" />
	<meta property="og:locale:alternate" content="ar_EG" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sunnahone" />
	<meta name="twitter:creator" content="@sunnahone" />
	<meta name="twitter:domain" content="sunnah.one" />
	
	<!-- Dublin Core Metadata (for academic/library indexing) -->
	<meta name="DC.title" content="الباحث الحديثي - موسوعة الأحاديث النبوية" />
	<meta name="DC.creator" content="الباحث الحديثي" />
	<meta name="DC.subject" content="الحديث النبوي, السنة النبوية, الإسلام" />
	<meta name="DC.description" content="موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة" />
	<meta name="DC.publisher" content="sunnah.one" />
	<meta name="DC.type" content="Text" />
	<meta name="DC.format" content="text/html" />
	<meta name="DC.language" content="ar" />
	
	<!-- Schema.org JSON-LD for WebSite -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "https://sunnah.one/#website",
		"name": "الباحث الحديثي",
		"alternateName": ["sunnah.one", "Hadith Search", "موسوعة الحديث"],
		"url": "https://sunnah.one",
		"description": "موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة - ابحث في أكثر من 50,000 حديث",
		"inLanguage": "ar",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://sunnah.one/search?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		},
		"publisher": {
			"@type": "Organization",
			"@id": "https://sunnah.one/#organization",
			"name": "الباحث الحديثي",
			"url": "https://sunnah.one",
			"logo": {
				"@type": "ImageObject",
				"url": "https://sunnah.one/logo.png",
				"width": 512,
				"height": 512
			},
			"sameAs": [
				"https://twitter.com/sunnahone",
				"https://t.me/nuqayah",
				"https://fb.me/nuqayah"
			]
		}
	}
	</script>`}
	
	<!-- Schema.org JSON-LD for Organization -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": "https://sunnah.one/#organization",
		"name": "الباحث الحديثي",
		"url": "https://sunnah.one",
		"logo": "https://sunnah.one/logo.png",
		"description": "موسوعة شاملة للأحاديث النبوية",
		"foundingDate": "2024",
		"sameAs": [
			"https://twitter.com/sunnahone",
			"https://t.me/nuqayah"
		],
		"contactPoint": {
			"@type": "ContactPoint",
			"contactType": "customer service",
			"availableLanguage": ["Arabic", "English"]
		}
	}
	</script>`}
	
	<!-- Schema.org JSON-LD for SoftwareApplication (for app stores) -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "الباحث الحديثي",
		"operatingSystem": "Web, Android",
		"applicationCategory": "ReferenceApplication",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.8",
			"ratingCount": "1000"
		}
	}
	</script>`}
</svelte:head>

<div class="min-h-screen flex flex-col" dir="rtl">
	<!-- Accessibility: Skip to main content link -->
	<a href="#main-content" class="skip-link">تخطي إلى المحتوى الرئيسي</a>
	
	<Header />
	<main id="main-content" class="flex-1" role="main">
		{@render children()}
	</main>
	<Footer />
</div>
