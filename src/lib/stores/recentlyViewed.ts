import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface RecentHadith {
	id: string;
	text: string;
	collection: string;
	narrator?: string;
	viewedAt: number;
}

const STORAGE_KEY = 'hadith_history';
const MAX_ITEMS = 10;

function createRecentlyViewedStore() {
	// Load from localStorage on init
	const getInitial = (): RecentHadith[] => {
		if (!browser) return [];
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	};
	
	const { subscribe, set, update } = writable<RecentHadith[]>(getInitial());
	
	// Persist to localStorage
	const persist = (items: RecentHadith[]) => {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
			} catch (e) {
				console.warn('Failed to save history:', e);
			}
		}
	};
	
	return {
		subscribe,
		
		add: (hadith: Omit<RecentHadith, 'viewedAt'>) => {
			update(items => {
				// Remove duplicate if exists
				const filtered = items.filter(h => h.id !== hadith.id);
				// Add to beginning with timestamp
				const newItems = [
					{ ...hadith, viewedAt: Date.now() },
					...filtered
				].slice(0, MAX_ITEMS);
				persist(newItems);
				return newItems;
			});
		},
		
		remove: (id: string) => {
			update(items => {
				const newItems = items.filter(h => h.id !== id);
				persist(newItems);
				return newItems;
			});
		},
		
		clear: () => {
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
			set([]);
		},
		
		// Initialize from localStorage (call on mount)
		init: () => {
			if (browser) {
				const items = getInitial();
				set(items);
			}
		}
	};
}

export const recentlyViewed = createRecentlyViewedStore();
