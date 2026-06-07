<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	import type { ToastStateType } from '$lib/types/app';

	type Props = {
		toast: ToastStateType;
		onClose: (id: string) => void;
	};

	let { toast, onClose }: Props = $props();

	// Map your toast types to cohesive, premium translucent dark-mode color configurations
	const typeConfig = $derived.by(() => {
		switch (toast.type) {
			case 'success':
				return {
					border: 'border-emerald-500/20 bg-emerald-950/40 text-emerald-400',
					icon: 'mdi:check-circle-outline',
					iconColor: 'text-emerald-400'
				};
			case 'error':
				return {
					border: 'border-red-500/20 bg-red-950/40 text-red-400',
					icon: 'mdi:alert-circle-outline',
					iconColor: 'text-red-400'
				};
			case 'warning':
				return {
					border: 'border-amber-500/20 bg-amber-950/40 text-amber-400',
					icon: 'mdi:alert-outline',
					iconColor: 'text-amber-400'
				};
			default:
				return {
					border: 'border-neutral-800 bg-neutral-900/80 text-neutral-200',
					icon: 'mdi:information-outline',
					iconColor: 'text-neutral-400'
				};
		}
	});
</script>

<div
	in:fly={{ y: -50, duration: 300 }}
	out:fly={{ y: -20, duration: 200 }}
	class={[
		'relative flex w-80 items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md select-none',
		typeConfig.border
	]}
	role="alert"
>
	<div class={['mt-0.5 flex shrink-0 items-center justify-center', typeConfig.iconColor]}>
		<Icon icon={typeConfig.icon} class="h-5 w-5" />
	</div>

	<div class="flex min-w-0 flex-col gap-0.5 pr-6">
		<h4 class="truncate text-sm font-semibold tracking-wide text-white">
			{toast.title}
		</h4>
		<p class="text-xs leading-relaxed font-medium wrap-break-word text-neutral-400">
			{toast.message}
		</p>
	</div>

	<button
		onclick={() => onClose(toast.id)}
		class="absolute top-3.5 right-3.5 rounded-lg p-1 text-neutral-500 outline-hidden transition-all hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-500/50"
	>
		<span class="sr-only">Close notification</span>
		<Icon icon="mdi:close" class="h-4 w-4" />
	</button>
</div>
