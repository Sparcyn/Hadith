import type { RequestHandler } from './$types';

const site = 'https://sunnah.one';

// Static pages with their priorities and change frequencies
const staticPages = [
	{ url: '', priority: 1.0, changefreq: 'daily' },
	{ url: '/collections', priority: 0.9, changefreq: 'weekly' },
	{ url: '/scholars', priority: 0.85, changefreq: 'monthly' },
	{ url: '/topics', priority: 0.9, changefreq: 'weekly' },
	{ url: '/search', priority: 0.8, changefreq: 'weekly' },
	{ url: '/about', priority: 0.6, changefreq: 'monthly' },
];

// Collection pages (high priority - main content)
const collections = [
	{ slug: 'bukhari', priority: 0.95 },
	{ slug: 'muslim', priority: 0.95 },
	{ slug: 'tirmidhi', priority: 0.9 },
	{ slug: 'abudawud', priority: 0.9 },
	{ slug: 'nasai', priority: 0.9 },
	{ slug: 'ibnmajah', priority: 0.9 },
];

// Scholar pages
const scholars = ['bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah'];

// Topic pages
const topics = [
	{ slug: 'worship', priority: 0.85 },
	{ slug: 'transactions', priority: 0.85 },
	{ slug: 'ethics', priority: 0.85 },
	{ slug: 'softening', priority: 0.85 },
	{ slug: 'rulings', priority: 0.85 },
	{ slug: 'virtues', priority: 0.85 },
];

// Sample hadith pages (in production, fetch from database)
const sampleHadiths = [
	'bukhari-1', 'bukhari-2', 'bukhari-3', 'bukhari-4', 'bukhari-5',
	'muslim-1', 'muslim-671',
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];
	
	const urls: string[] = [];
	
	// Static pages
	staticPages.forEach(page => {
		urls.push(`
	<url>
		<loc>${site}${page.url}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`);
	});
	
	// Collection pages
	collections.forEach(col => {
		urls.push(`
	<url>
		<loc>${site}/collections/${col.slug}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>${col.priority}</priority>
	</url>`);
	});
	
	// Scholar pages
	scholars.forEach(slug => {
		urls.push(`
	<url>
		<loc>${site}/scholars/${slug}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>`);
	});
	
	// Topic pages
	topics.forEach(topic => {
		urls.push(`
	<url>
		<loc>${site}/topics/${topic.slug}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>${topic.priority}</priority>
	</url>`);
	});
	
	// Hadith pages (sample - in production, generate from database)
	sampleHadiths.forEach(id => {
		urls.push(`
	<url>
		<loc>${site}/hadith/${id}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`);
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			'X-Robots-Tag': 'noindex',
		},
	});
};
