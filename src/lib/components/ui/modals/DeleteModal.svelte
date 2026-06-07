<script lang="ts">
	import Icon from '@iconify/svelte';
	import Spinner from '../shared/Spinner.svelte'; // Using your existing Spinner
	import type { DeleteModalProps } from '$lib/types/app';

	// Svelte 5 Runes for properties
	let {
		isOpen = false,
		isDeleting = false,
		title = 'Delete Item',
		description = 'Are you sure you want to delete this item? This action cannot be undone.',
		onClose,
		onConfirm
	}: DeleteModalProps = $props();

	// Close modal on hitting 'Escape' key natively
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen && !isDeleting) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[80px]"
		></div>

		<div
			class="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur-xl duration-150"
		>
			<div class="flex items-start gap-4">
				<div class="shrink-0 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5">
					<Icon icon="mdi:alert-octagon-outline" class="h-6 w-6 text-red-400" />
				</div>
				<div class="space-y-1">
					<h3 class="text-lg font-semibold tracking-wide text-neutral-200">
						{title}
					</h3>
					<p class="text-sm leading-relaxed text-neutral-400">
						{description}
					</p>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-3 border-t border-neutral-800/60 pt-4">
				<button
					type="button"
					disabled={isDeleting}
					onclick={onClose}
					class="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Cancel
				</button>

				<button
					type="button"
					disabled={isDeleting}
					onclick={onConfirm}
					class="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/10 transition-opacity hover:opacity-95 disabled:cursor-not-allowed"
				>
					{#if isDeleting}
						<Spinner />
						Deleting...
					{:else}
						Confirm Delete
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
