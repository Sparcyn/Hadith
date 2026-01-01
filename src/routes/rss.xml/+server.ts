import type { RequestHandler } from './$types';

const site = 'https://sunnah.one';

// Sample featured hadiths for RSS feed
const featuredHadiths = [
	{
		id: 'bukhari-1',
		title: 'حديث النية',
		text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
		narrator: 'عمر بن الخطاب رضي الله عنه',
		collection: 'صحيح البخاري',
	},
	{
		id: 'bukhari-2',
		title: 'أركان الإسلام',
		text: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ',
		narrator: 'عبد الله بن عمر رضي الله عنهما',
		collection: 'صحيح البخاري',
	},
	{
		id: 'muslim-671',
		title: 'فضل المساجد',
		text: 'إِنَّ أَحَبَّ بِلَادِ اللَّهِ إِلَى اللَّهِ مَسَاجِدُهَا',
		narrator: 'أبو هريرة رضي الله عنه',
		collection: 'صحيح مسلم',
	},
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString();
	
	const items = featuredHadiths.map(hadith => `
		<item>
			<title>${hadith.title} - ${hadith.collection}</title>
			<link>${site}/hadith/${hadith.id}</link>
			<description><![CDATA[${hadith.text}<br/><br/>الراوي: ${hadith.narrator}<br/>المصدر: ${hadith.collection}]]></description>
			<guid isPermaLink="true">${site}/hadith/${hadith.id}</guid>
			<pubDate>${today}</pubDate>
		</item>`).join('');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>الباحث الحديثي - sunnah.one</title>
		<link>${site}</link>
		<description>موسوعة شاملة للأحاديث النبوية من الكتب الستة الصحيحة</description>
		<language>ar</language>
		<lastBuildDate>${today}</lastBuildDate>
		<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
		<image>
			<url>${site}/logo.png</url>
			<title>الباحث الحديثي</title>
			<link>${site}</link>
		</image>
		${items}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600, s-maxage=86400',
		},
	});
};
