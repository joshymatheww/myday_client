<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';

	type Props = {
		isDrawerOpen: boolean;
		children: Snippet;
	};

	let { isDrawerOpen = $bindable(false), children }: Props = $props();
</script>

<div class="fixed inset-0 z-50 flex justify-end">
	<button
		onclick={() => (isDrawerOpen = false)}
		class="absolute inset-0 h-full w-full cursor-default border-0 bg-black/60 p-0 backdrop-blur-xs"
		aria-label="Close sidebar"
	></button>

	<div
		transition:fly={{ x: 450, duration: 250, easing: cubicOut }}
		class="relative flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-neutral-800 bg-neutral-900 p-6 shadow-2xl"
	>
		{@render children()}
	</div>
</div>
