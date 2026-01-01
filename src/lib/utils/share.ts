export interface ShareData {
	title: string;
	text: string;
	url: string;
}

export function shareOnTwitter(data: ShareData): void {
	const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`;
	window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareOnFacebook(data: ShareData): void {
	const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
	window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareOnWhatsApp(data: ShareData): void {
	const url = `https://wa.me/?text=${encodeURIComponent(`${data.text} ${data.url}`)}`;
	window.open(url, '_blank', 'noopener,noreferrer');
}

export async function shareNative(data: ShareData): Promise<boolean> {
	if (navigator.share) {
		try {
			await navigator.share(data);
			return true;
		} catch {
			return false;
		}
	}
	return false;
}
