import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		// Transform HTML for better performance
		transformPageChunk: ({ html }) => html,
	});

	// Security & SEO headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	
	// Performance headers
	response.headers.set('X-DNS-Prefetch-Control', 'on');
	
	// Cache static assets aggressively
	const url = event.url.pathname;
	if (url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}
	
	// Cache HTML pages with revalidation
	if (response.headers.get('content-type')?.includes('text/html')) {
		response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
	}

	return response;
};
