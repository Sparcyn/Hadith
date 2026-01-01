import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils'
		},
		
		// SEO: Prerender static pages
		prerender: {
			// Crawl links to find pages
			crawl: true,
			// Handle errors gracefully
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			// Prerender these entries
			entries: [
				'/',
				'/about',
				'/collections',
				'/collections/bukhari',
				'/collections/muslim',
				'/collections/tirmidhi',
				'/collections/abudawud',
				'/collections/nasai',
				'/collections/ibnmajah',
				'/topics',
				'/topics/worship',
				'/topics/transactions',
				'/topics/ethics',
				'/topics/softening',
				'/topics/rulings',
				'/topics/virtues',
				'/sitemap.xml',
				'/rss.xml',
			],
		},
		
		// Performance: CSP headers
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'https:'],
				'connect-src': ['self'],
			},
		},
		
		// SEO: Version for cache busting
		version: {
			name: Date.now().toString(),
		},
	},
	
	// Performance: Compile options
	compilerOptions: {
		// Enable hydration optimization
		hydratable: true,
		// CSS injection mode
		css: 'injected',
	},
};

export default config;
