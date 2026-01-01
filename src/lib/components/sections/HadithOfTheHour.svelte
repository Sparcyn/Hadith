<!--
	============================================================================
	HadithOfTheHour.svelte
	============================================================================
	
	A featured section component that displays a rotating "Hadith of the Hour"
	with elegant Islamic-inspired styling. This component serves as a focal
	point on the homepage, showcasing prophetic traditions with beautiful
	typography and interactive features.
	
	Features:
	- Displays Arabic hadith text with proper RTL formatting
	- Shows narrator attribution and source reference
	- Copy to clipboard functionality with visual feedback
	- Share capability for social distribution
	- Image generation modal for creating shareable graphics
	- Tracks viewed hadiths in recently viewed store
	- Responsive design with mobile-first approach
	
	Usage:
	<HadithOfTheHour hadith={hadithData} />
	
	Props:
	- hadith: Optional hadith object with id, arabicText, narrator, 
	          collection, and reference fields. Falls back to default if not provided.
	
	Dependencies:
	- lucide-svelte: Icon components (Copy, Share2, Check, Image, Clock)
	- recentlyViewed store: Tracks user's hadith viewing history
	- ImageGeneratorModal: Modal for creating shareable hadith images
	============================================================================
-->

<script lang="ts">
	// =========================================================================
	// IMPORTS
	// =========================================================================
	
	// Icon components from Lucide for action buttons and visual indicators
	import { Copy, Share2, Check, Image, Clock } from 'lucide-svelte';
	
	// Store for tracking user's recently viewed hadiths (persists across sessions)
	import { recentlyViewed } from '$lib/stores/recentlyViewed';
	
	// Modal component for generating shareable hadith images
	import { ImageGeneratorModal } from '$lib/components/ui';
	
	// =========================================================================
	// TYPE DEFINITIONS
	// =========================================================================
	
	/**
	 * Component props interface
	 * Defines the structure of the hadith data passed to this component
	 */
	interface Props {
		hadith?: {
			id: string;          // Unique identifier for the hadith
			arabicText: string;  // The hadith text in Arabic
			narrator: string;    // Name of the hadith narrator (e.g., Abu Hurairah)
			collection: string;  // Source collection (e.g., Sahih Muslim)
			reference: string;   // Specific reference within the collection
		};
	}
	
	// =========================================================================
	// PROPS & STATE
	// =========================================================================
	
	/**
	 * Destructure props with default hadith data
	 * Default hadith is displayed when no prop is provided
	 * This ensures the component always has content to display
	 */
	let { hadith = {
		id: '1',
		arabicText: 'إِنَّ أَحَبَّ بِلَادِ اللَّهِ إِلَى اللَّهِ مَسَاجِدُهَا، وَأَبْغَضَ بِلَادِ اللَّهِ إِلَى اللَّهِ أَسْوَاقُهَا',
		narrator: 'أبو هريرة رضي الله عنه',
		collection: 'صحيح مسلم',
		reference: 'كتاب المساجد، حديث ٦٧١'
	} }: Props = $props();
	
	/**
	 * Reactive state for copy button feedback
	 * Shows checkmark icon when true, resets after 2 seconds
	 */
	let copied = $state(false);
	
	/**
	 * Controls visibility of the image generator modal
	 * Toggled by the "Create Image" button
	 */
	let showImageModal = $state(false);
	
	// =========================================================================
	// EVENT HANDLERS
	// =========================================================================
	
	/**
	 * Copies the hadith Arabic text to the user's clipboard
	 * Uses the modern Clipboard API for secure, async clipboard access
	 * Provides visual feedback by temporarily showing a checkmark icon
	 */
	async function copyText(): Promise<void> {
		await navigator.clipboard.writeText(hadith.arabicText);
		copied = true;
		// Reset the copied state after 2 seconds to restore original button
		setTimeout(() => copied = false, 2000);
	}
	
	/**
	 * Handles the "Read More" link click
	 * Adds the current hadith to the user's viewing history
	 * This enables the "Recently Viewed" feature across the app
	 */
	function handleReadMore(): void {
		recentlyViewed.add({
			id: hadith.id,
			text: hadith.arabicText,
			collection: hadith.collection,
			narrator: hadith.narrator
		});
	}
	
	/**
	 * Opens the image generator modal
	 * Allows users to create shareable graphics from the hadith
	 */
	function openImageGenerator(): void {
		showImageModal = true;
	}
	
	/**
	 * Closes the image generator modal
	 * Called when user dismisses the modal or completes image generation
	 */
	function closeImageGenerator(): void {
		showImageModal = false;
	}
</script>

<!-- ==========================================================================
	TEMPLATE SECTION
	========================================================================== -->

<!-- 
	Main Section Container
	- Vertical padding responsive: 16 units on mobile, 24 on desktop
	- Subtle gradient background for visual depth
-->
<section class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50/50">
	<div class="container">
		<!-- Content wrapper with max-width for optimal reading experience -->
		<div class="max-w-4xl mx-auto">
			
			<!-- ============================================================
				SECTION HEADER
				Badge-style header with clock icon indicating hourly refresh
			============================================================ -->
			<div class="flex items-center justify-center gap-4 mb-10">
				<div class="header-badge">
					<!-- Clock icon indicates time-based content rotation -->
					<Clock class="w-5 h-5 text-amber-600" />
					<div class="text-right">
						<!-- Arabic: "Hadith of the Hour" -->
						<h2 class="text-lg font-bold text-gray-800">حديث الساعة</h2>
						<!-- Arabic: "Refreshes every hour" -->
						<p class="text-xs text-gray-500">يتجدد كل ساعة</p>
					</div>
				</div>
			</div>
			
			<!-- ============================================================
				PREMIUM HADITH CARD
				Main content card with decorative Islamic-inspired elements
			============================================================ -->
			<div class="hadith-card">
				
				<!-- Decorative SVG corners for Islamic geometric aesthetic -->
				<div class="card-corner top-right"></div>
				<div class="card-corner bottom-left"></div>
				
				<!-- Card Content Area -->
				<div class="p-8 md:p-12">
					
					<!-- Opening Arabic quotation mark (decorative) -->
					<div class="quote-mark">❝</div>
					
					<!-- 
						Hadith Arabic Text
						Uses Amiri font for authentic Arabic typography
						Centered with generous line-height for readability
					-->
					<p class="hadith-text">
						{hadith.arabicText}
					</p>
					
					<!-- Closing Arabic quotation mark (decorative) -->
					<div class="quote-mark closing">❞</div>
					
					<!-- 
						Decorative Divider
						Separates hadith text from attribution
						Features gradient lines with centered ornament
					-->
					<div class="divider">
						<span class="divider-ornament">✦</span>
					</div>
					
					<!-- 
						Attribution Section
						Contains read more CTA and narrator information
						Flexbox layout with space-between alignment
					-->
					<div class="attribution">
						<!-- 
							Read More Button
							Links to full hadith detail page
							Triggers history tracking on click
						-->
						<a href="/hadith/{hadith.id}" onclick={handleReadMore} class="read-more-btn">
							<!-- Arabic: "Read More" -->
							<span>قراءة المزيد</span>
							<!-- Animated arrow indicator -->
							<span class="arrow">←</span>
						</a>
						
						<!-- Narrator and Source Information -->
						<div class="narrator-info">
							<!-- Narrator name (e.g., Abu Hurairah) -->
							<p class="narrator-name">{hadith.narrator}</p>
							<!-- Collection and reference (e.g., Sahih Muslim • Book of Mosques, Hadith 671) -->
							<p class="narrator-source">{hadith.collection} • {hadith.reference}</p>
						</div>
					</div>
				</div>
				
				<!-- ============================================================
					ACTIONS BAR
					Bottom toolbar with copy, share, and image generation buttons
				============================================================ -->
				<div class="actions-bar">
					
					<!-- 
						Copy Button
						Copies hadith text to clipboard
						Shows checkmark feedback when copied
					-->
					<button onclick={copyText} class="action-btn">
						{#if copied}
							<!-- Success state: checkmark icon -->
							<Check class="w-4 h-4" />
							<!-- Arabic: "Copied" -->
							<span>تم النسخ</span>
						{:else}
							<!-- Default state: copy icon -->
							<Copy class="w-4 h-4" />
							<!-- Arabic: "Copy" -->
							<span>نسخ</span>
						{/if}
					</button>
					
					<!-- 
						Share Button
						TODO: Implement native share functionality
					-->
					<button class="action-btn">
						<Share2 class="w-4 h-4" />
						<!-- Arabic: "Share" -->
						<span>مشاركة</span>
					</button>
					
					<!-- 
						Image Generator Button (Gold/Premium styling)
						Opens modal for creating shareable hadith graphics
					-->
					<button class="action-btn gold" onclick={openImageGenerator}>
						<Image class="w-4 h-4" />
						<!-- Arabic: "Create Image" -->
						<span>إنشاء صورة</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ==========================================================================
	IMAGE GENERATOR MODAL
	Modal component for creating shareable hadith images
	- bind:isOpen: Two-way binding for modal visibility state
	- hadith: Pass current hadith data for image generation
	- onClose: Callback when modal is dismissed
========================================================================== -->
<ImageGeneratorModal 
	bind:isOpen={showImageModal}
	{hadith}
	onClose={closeImageGenerator}
/>

<style>
	.header-badge {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 12px 24px;
		background: white;
		border-radius: 60px;
		box-shadow: 0 4px 24px rgba(27, 77, 62, 0.06);
		border: 1px solid rgba(212, 175, 55, 0.2);
	}
	
	.hadith-card {
		position: relative;
		background: white;
		border-radius: 24px;
		box-shadow: 0 8px 40px rgba(27, 77, 62, 0.06), 0 1px 3px rgba(27, 77, 62, 0.04);
		overflow: hidden;
		border: 1px solid rgba(0,0,0,0.04);
	}
	
	.card-corner {
		position: absolute;
		width: 120px;
		height: 120px;
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h120v120H0z' fill='none'/%3E%3Cpath d='M60 0v60H0M120 60v60H60' stroke='%231B4D3E' stroke-width='1' fill='none'/%3E%3Ccircle cx='60' cy='60' r='30' stroke='%231B4D3E' stroke-width='1' fill='none'/%3E%3C/svg%3E");
	}
	.card-corner.top-right { top: 0; right: 0; }
	.card-corner.bottom-left { bottom: 0; left: 0; transform: rotate(180deg); }
	
	.quote-mark {
		font-size: 48px;
		line-height: 1;
		background: linear-gradient(135deg, #D4AF37 0%, #f4d03f 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-align: left;
		margin-bottom: 16px;
	}
	.quote-mark.closing {
		text-align: right;
		margin-bottom: 0;
		margin-top: 16px;
	}
	
	.hadith-text {
		font-family: 'Amiri', serif;
		font-size: 1.5rem;
		line-height: 2.4;
		text-align: center;
		color: #1f2937;
		padding: 0 16px;
	}
	@media (min-width: 768px) {
		.hadith-text { font-size: 1.75rem; padding: 0 32px; }
	}
	
	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 32px 0;
	}
	.divider::before, .divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
	}
	.divider-ornament {
		padding: 0 16px;
		color: #D4AF37;
		font-size: 14px;
	}
	
	.attribution {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px;
	}
	
	.read-more-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 14px 28px;
		background: linear-gradient(135deg, #1B4D3E 0%, #0d3d32 100%);
		color: white;
		border-radius: 50px;
		font-size: 15px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.read-more-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 32px rgba(27, 77, 62, 0.3);
	}
	.read-more-btn .arrow {
		transition: transform 0.3s ease;
	}
	.read-more-btn:hover .arrow {
		transform: translateX(4px);
	}
	
	.narrator-info { text-align: left; }
	.narrator-name {
		font-size: 15px;
		font-weight: 700;
		color: #1B4D3E;
		margin-bottom: 2px;
	}
	.narrator-source {
		font-size: 13px;
		color: #6b7280;
	}
	
	.actions-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px 24px;
		background: #f9fafb;
		border-top: 1px solid #f3f4f6;
	}
	@media (min-width: 768px) {
		.actions-bar { padding: 20px 32px; }
	}
	
	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 18px;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 50px;
		font-size: 13px;
		font-weight: 500;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.action-btn:hover {
		border-color: #1B4D3E;
		color: #1B4D3E;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(27, 77, 62, 0.06);
	}
	.action-btn.gold {
		background: linear-gradient(135deg, #D4AF37 0%, #f4d03f 100%);
		border: none;
		color: #1a1a1a;
		font-weight: 600;
	}
	.action-btn.gold:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
	}
</style>
