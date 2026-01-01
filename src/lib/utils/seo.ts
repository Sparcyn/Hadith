/**
 * SEO Utilities for sunnah.one
 * Provides consistent meta tag generation across pages
 */

export const SITE_NAME = 'الباحث الحديثي';
export const SITE_URL = 'https://sunnah.one';
export const SITE_DESCRIPTION = 'موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة';
export const TWITTER_HANDLE = '@sunnahone';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SEOConfig {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	type?: 'website' | 'article' | 'book';
	noindex?: boolean;
	canonical?: string;
}

/**
 * Generate full page title with site name
 */
export function getPageTitle(title: string): string {
	if (title === SITE_NAME) return `${title} | sunnah.one`;
	return `${title} | ${SITE_NAME}`;
}

/**
 * Truncate description to optimal length for SEO (155-160 chars)
 */
export function truncateDescription(text: string, maxLength = 155): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Generate keywords string from array
 */
export function generateKeywords(keywords: string[]): string {
	return keywords.join(', ');
}

/**
 * Clean text for use in meta tags (remove special chars, normalize whitespace)
 */
export function cleanMetaText(text: string): string {
	return text
		.replace(/[\n\r\t]/g, ' ')
		.replace(/\s+/g, ' ')
		.replace(/"/g, '&quot;')
		.trim();
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
	const cleanPath = path.replace(/\/$/, '') || '/';
	return `${SITE_URL}${cleanPath}`;
}

/**
 * Collection names in Arabic for SEO
 */
export const COLLECTION_NAMES: Record<string, { ar: string; en: string; author: string }> = {
	bukhari: { ar: 'صحيح البخاري', en: 'Sahih al-Bukhari', author: 'الإمام البخاري' },
	muslim: { ar: 'صحيح مسلم', en: 'Sahih Muslim', author: 'الإمام مسلم' },
	tirmidhi: { ar: 'جامع الترمذي', en: 'Jami at-Tirmidhi', author: 'الإمام الترمذي' },
	abudawud: { ar: 'سنن أبي داود', en: 'Sunan Abu Dawud', author: 'الإمام أبو داود' },
	nasai: { ar: 'سنن النسائي', en: "Sunan an-Nasa'i", author: 'الإمام النسائي' },
	ibnmajah: { ar: 'سنن ابن ماجه', en: 'Sunan Ibn Majah', author: 'الإمام ابن ماجه' },
};

/**
 * Topic names in Arabic for SEO
 */
export const TOPIC_NAMES: Record<string, { ar: string; en: string }> = {
	worship: { ar: 'العبادات', en: 'Worship' },
	transactions: { ar: 'المعاملات', en: 'Transactions' },
	ethics: { ar: 'الأخلاق', en: 'Ethics' },
	softening: { ar: 'الرقائق', en: 'Heart Softeners' },
	rulings: { ar: 'الأحكام', en: 'Rulings' },
	virtues: { ar: 'الفضائل', en: 'Virtues' },
};

/**
 * Default keywords for the site
 */
export const DEFAULT_KEYWORDS = [
	'حديث',
	'أحاديث',
	'السنة النبوية',
	'صحيح البخاري',
	'صحيح مسلم',
	'الكتب الستة',
	'hadith',
	'sunnah',
	'bukhari',
	'muslim',
	'islamic',
	'الإسلام',
	'النبي محمد',
];
