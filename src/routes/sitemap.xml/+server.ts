import type { RequestHandler } from './$types';

const site = 'https://sunnah.one';

// Static pages with their priorities and change frequencies
const staticPages = [
	{ url: '', priority: 1.0, changefreq: 'daily' },
	{ url: '/collections', priority: 0.9, changefreq: 'weekly' },
	{ url: '/topics', priority: 0.9, changefreq: 'weekly' },
	{ url: '/about', priority: 0.7, changefreq: 'monthly' },
	{ url: '/search', priority: 0.8, changefreq: 'weekly' },
];

// Collection pages
const collections = [
	'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah'
];

// Topic pages
const topics = [
	'worship', 'transactions', 'ethics', 'softening', 'rulings', 'virtues'
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];
	
	const urls = [
		// Static pages
		...staticPages.map(page => `
	<url>
		<loc>${site}${page.url}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`),
		
		// Collection pages
		...collections.map(slug => `
	<url>
		<loc>${site}/collections/${slug}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`),
		
		// Topic pages
		...topics.map(slug => `
	<url>
		<loc>${site}/topics/${slug}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600, s-maxage=86400',
		},
	});
};
