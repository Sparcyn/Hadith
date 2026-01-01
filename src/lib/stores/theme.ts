import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'sepia';

function createThemeStore() {
	const defaultTheme: Theme = browser 
		? (localStorage.getItem('theme') as Theme) || 
		  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		: 'light';
	
	const { subscribe, set, update } = writable<Theme>(defaultTheme);
	
	function applyTheme(theme: Theme) {
		if (browser) {
			document.documentElement.classList.remove('dark', 'sepia');
			if (theme !== 'light') {
				document.documentElement.classList.add(theme);
			}
		}
	}
	
	return {
		subscribe,
		cycle: () => {
			update(current => {
				const themes: Theme[] = ['light', 'sepia', 'dark'];
				const nextIndex = (themes.indexOf(current) + 1) % themes.length;
				const newTheme = themes[nextIndex];
				if (browser) {
					localStorage.setItem('theme', newTheme);
				}
				applyTheme(newTheme);
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
			}
			applyTheme(theme);
			set(theme);
		}
	};
}

export const theme = createThemeStore();
