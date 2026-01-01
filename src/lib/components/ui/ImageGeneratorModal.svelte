<script lang="ts">
	import { X, Download, Share2, ToggleLeft, ToggleRight } from 'lucide-svelte';
	
	interface Props {
		isOpen: boolean;
		hadith: { arabicText: string; narrator: string; collection: string; reference: string; };
		onClose: () => void;
	}
	
	let { isOpen = $bindable(), hadith, onClose }: Props = $props();
	
	let title = $state('حديث اليوم');
	let selectedBackground = $state(0);
	let showBranding = $state(true);
	let isGenerating = $state(false);
	
	const backgrounds = [
		{ id: 0, name: 'أخضر زمردي', type: 'gradient', colors: ['#1B4D3E', '#0d3d32'] },
		{ id: 1, name: 'أزرق ليلي', type: 'gradient', colors: ['#1e3a5f', '#0f1f33'] },
		{ id: 2, name: 'كريمي رملي', type: 'solid', colors: ['#f5f0e6'] },
		{ id: 3, name: 'ذهبي دافئ', type: 'gradient', colors: ['#8b7355', '#5c4d3d'] },
	];
	
	function closeModal() { isOpen = false; onClose(); }
	function handleKeydown(e: KeyboardEvent) { if (e.key === 'Escape') closeModal(); }
	function handleBackdropClick(e: MouseEvent) { if (e.target === e.currentTarget) closeModal(); }
	
	async function generateImage(): Promise<string> {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;
		const width = 1080, height = 1080;
		canvas.width = width;
		canvas.height = height;
		
		const bg = backgrounds[selectedBackground];
		if (bg.type === 'gradient') {
			const gradient = ctx.createLinearGradient(0, 0, width, height);
			gradient.addColorStop(0, bg.colors[0]);
			gradient.addColorStop(1, bg.colors[1] || bg.colors[0]);
			ctx.fillStyle = gradient;
		} else {
			ctx.fillStyle = bg.colors[0];
		}
		ctx.fillRect(0, 0, width, height);
		
		const cardMargin = 60, cardWidth = width - 120, cardHeight = height - 120;
		ctx.shadowColor = 'rgba(0,0,0,0.15)';
		ctx.shadowBlur = 40;
		ctx.shadowOffsetY = 10;
		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.roundRect(cardMargin, cardMargin, cardWidth, cardHeight, 32);
		ctx.fill();
		ctx.shadowColor = 'transparent';
		
		let y = cardMargin + 80;
		if (title.trim()) {
			ctx.font = 'bold 36px sans-serif';
			ctx.fillStyle = '#D4AF37';
			ctx.textAlign = 'center';
			ctx.fillText(title, width / 2, y);
			y += 60;
		}
		
		ctx.font = '42px Amiri, serif';
		ctx.fillStyle = '#1f2937';
		ctx.textAlign = 'center';
		const words = hadith.arabicText.split(' ');
		let lines: string[] = [], line = '';
		for (const word of words) {
			const test = line ? line + ' ' + word : word;
			if (ctx.measureText(test).width > cardWidth - 120 && line) { lines.push(line); line = word; }
			else line = test;
		}
		if (line) lines.push(line);
		
		y += 40;
		lines.forEach((l, i) => ctx.fillText(l, width / 2, y + i * 80));
		
		const infoY = y + lines.length * 80 + 60;
		ctx.font = 'bold 28px sans-serif';
		ctx.fillStyle = '#1B4D3E';
		ctx.fillText(hadith.narrator, width / 2, infoY);
		ctx.font = '24px sans-serif';
		ctx.fillStyle = '#6b7280';
		ctx.fillText(`${hadith.collection} • ${hadith.reference}`, width / 2, infoY + 40);
		
		if (showBranding) {
			ctx.font = '20px sans-serif';
			ctx.fillStyle = '#9ca3af';
			ctx.fillText('الباحث الحديثي | sunnah.one', width / 2, cardMargin + cardHeight - 40);
		}
		return canvas.toDataURL('image/png');
	}
	
	async function downloadImage() {
		isGenerating = true;
		try {
			const url = await generateImage();
			const a = document.createElement('a');
			a.download = `hadith-${Date.now()}.png`;
			a.href = url;
			a.click();
		} finally { isGenerating = false; }
	}
	
	async function shareImage() {
		isGenerating = true;
		try {
			const url = await generateImage();
			const blob = await (await fetch(url)).blob();
			const file = new File([blob], 'hadith.png', { type: 'image/png' });
			if (navigator.share && navigator.canShare({ files: [file] })) {
				await navigator.share({ files: [file], title: title || 'حديث شريف' });
			} else await downloadImage();
		} finally { isGenerating = false; }
	}
</script>

{#if isOpen}
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div class="modal-overlay" role="dialog" aria-modal="true" onclick={handleBackdropClick} onkeydown={handleKeydown}>
	<div class="modal-container">
		<div class="modal-header">
			<h2 class="modal-title">إنشاء صورة للحديث</h2>
			<button class="close-btn" onclick={closeModal} aria-label="إغلاق"><X class="w-5 h-5" /></button>
		</div>
		<div class="modal-content">
			<div class="preview-section">
				<div class="preview-container" style="background: {backgrounds[selectedBackground].type === 'gradient' 
					? `linear-gradient(135deg, ${backgrounds[selectedBackground].colors[0]}, ${backgrounds[selectedBackground].colors[1]})`
					: backgrounds[selectedBackground].colors[0]}">
					<div class="preview-card">
						{#if title.trim()}<div class="preview-title">{title}</div>{/if}
						<p class="preview-text">{hadith.arabicText}</p>
						<div class="preview-info">
							<p class="preview-narrator">{hadith.narrator}</p>
							<p class="preview-source">{hadith.collection} • {hadith.reference}</p>
						</div>
						{#if showBranding}<div class="preview-branding">الباحث الحديثي | sunnah.one</div>{/if}
					</div>
				</div>
			</div>
			<div class="controls-section">
				<div class="control-group">
					<label for="title-input" class="control-label">عنوان البطاقة</label>
					<input id="title-input" type="text" bind:value={title} placeholder="حديث اليوم..." class="control-input" />
				</div>
				<div class="control-group">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="control-label">اختر الخلفية</label>
					<div class="backgrounds-grid">
						{#each backgrounds as bg, i}
							<button class="bg-option" class:selected={selectedBackground === i} onclick={() => selectedBackground = i}
								style="background: {bg.type === 'gradient' ? `linear-gradient(135deg, ${bg.colors[0]}, ${bg.colors[1]})` : bg.colors[0]}">
								{#if selectedBackground === i}<span class="check-mark">✓</span>{/if}
							</button>
						{/each}
					</div>
				</div>
				<div class="control-group">
					<div class="toggle-row">
						<span class="control-label">إظهار العلامة المائية</span>
						<button class="toggle-btn" class:active={showBranding} onclick={() => showBranding = !showBranding}>
							{#if showBranding}<ToggleRight class="w-8 h-8" />{:else}<ToggleLeft class="w-8 h-8" />{/if}
						</button>
					</div>
				</div>
				<div class="action-buttons">
					<button class="download-btn" onclick={downloadImage} disabled={isGenerating}>
						<Download class="w-5 h-5" /><span>{isGenerating ? 'جاري...' : 'تحميل الصورة'}</span>
					</button>
					<button class="share-btn" onclick={shareImage} disabled={isGenerating}>
						<Share2 class="w-5 h-5" /><span>مشاركة</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
{/if}

<style>
	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
	.modal-container { background: white; border-radius: 24px; width: 100%; max-width: 900px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #f3f4f6; }
	.modal-title { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin: 0; }
	.close-btn { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; border: none; background: #f3f4f6; color: #6b7280; cursor: pointer; }
	.modal-content { display: grid; grid-template-columns: 1fr; gap: 24px; padding: 24px; max-height: calc(90vh - 80px); overflow-y: auto; }
	@media (min-width: 768px) { .modal-content { grid-template-columns: 1fr 320px; } }
	.preview-section { display: flex; align-items: center; justify-content: center; }
	.preview-container { width: 100%; max-width: 400px; aspect-ratio: 1; border-radius: 16px; padding: 16px; display: flex; align-items: center; justify-content: center; }
	.preview-card { background: white; border-radius: 16px; padding: 24px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; }
	.preview-title { text-align: center; font-size: 14px; font-weight: 700; color: #D4AF37; margin-bottom: 12px; }
	.preview-text { font-family: 'Amiri', serif; font-size: 14px; line-height: 2; text-align: center; color: #1f2937; margin: 8px 0; }
	.preview-info { text-align: center; margin-top: 16px; }
	.preview-narrator { font-size: 11px; font-weight: 700; color: #1B4D3E; margin: 0 0 2px; }
	.preview-source { font-size: 9px; color: #6b7280; margin: 0; }
	.preview-branding { text-align: center; font-size: 8px; color: #9ca3af; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f3f4f6; }
	.controls-section { display: flex; flex-direction: column; gap: 24px; }
	.control-group { display: flex; flex-direction: column; gap: 8px; }
	.control-label { font-size: 14px; font-weight: 600; color: #374151; }
	.control-input { width: 100%; height: 48px; padding: 0 16px; font-size: 15px; border: 2px solid #e5e7eb; border-radius: 12px; background: #f9fafb; color: #1f2937; }
	.control-input:focus { outline: none; border-color: #1B4D3E; background: white; }
	.backgrounds-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
	.bg-option { aspect-ratio: 1; border-radius: 12px; border: 3px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; }
	.bg-option.selected { border-color: #D4AF37; }
	.check-mark { color: white; font-size: 18px; font-weight: bold; }
	.toggle-row { display: flex; align-items: center; justify-content: space-between; }
	.toggle-btn { background: none; border: none; cursor: pointer; color: #d1d5db; padding: 0; }
	.toggle-btn.active { color: #1B4D3E; }
	.action-buttons { display: flex; flex-direction: column; gap: 12px; margin-top: auto; }
	.download-btn { display: flex; align-items: center; justify-content: center; gap: 10px; height: 52px; background: linear-gradient(135deg, #D4AF37, #c9a432); color: #1a1a1a; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; }
	.download-btn:disabled { opacity: 0.7; cursor: not-allowed; }
	.share-btn { display: flex; align-items: center; justify-content: center; gap: 10px; height: 48px; background: white; color: #374151; border: 2px solid #e5e7eb; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; }
	.share-btn:disabled { opacity: 0.7; cursor: not-allowed; }
</style>
