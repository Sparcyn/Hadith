import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	
	// Performance optimizations
	build: {
		// Enable minification
		minify: 'esbuild',
		
		// CSS code splitting
		cssCodeSplit: true,
		
		// Chunk size warnings
		chunkSizeWarningLimit: 500,
		
		// Rollup options for better chunking
		rollupOptions: {
			output: {
				// Manual chunks for better caching
				manualChunks: {
					// Vendor chunk for external dependencies
					vendor: ['lucide-svelte'],
				},
			},
		},
		
		// Target modern browsers for smaller bundles
		target: 'es2020',
		
		// Source maps for production debugging
		sourcemap: false,
	},
	
	// Optimize dependencies
	optimizeDeps: {
		include: ['lucide-svelte'],
	},
	
	// Server options
	server: {
		// Enable compression
		middlewareMode: false,
	},
	
	// CSS options
	css: {
		devSourcemap: true,
	},
});

